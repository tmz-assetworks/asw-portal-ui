import { Component, OnInit, ViewChild } from '@angular/core'
import { FormControl } from '@angular/forms'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { Router, RouterModule } from '@angular/router'

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  imports:[RouterModule]
})
export class LocationComponent implements OnInit {
  showLocationNav: boolean = false

  @ViewChild(MatPaginator) paginator!: MatPaginator

  displayedColumns: string[] = [
    'locationName',
    'address',
    'contactPersonName',
    'contactNumber',
    'locationStatus',
    'noOfPorts',
    'available',
    'connected',
    'faulty',
    'action',
  ]
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA)

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  viewLocation() {
    this.showLocationNav = true
    this._router.navigate(['operator/location/analytics'])
  }

  locations = '../../../assets/widget-icon/location.png'
  chargers = '../../../assets/widget-icon/chargers.png'
  charging_session = '../../../assets/widget-icon/charging-sessions.png'
  errors = '../../../assets/widget-icon/erorrs.png'

  basic = 'basic'
  basicStatus = 'basicStatus'
  // bar = 'bar'
  locationStatusTitle = 'Location Status'
  locationPerormTitle = 'Location  Performing '

  alteration_types = [
    'Location A',
    'Location B',
    'Location C',
    'Location D',
    'Location E',
    'Location F',
  ]
  type_list: any

  type_lists = new FormControl('')

  data = [
    {
      Type: 'Locations',
      Count: 50,
      StatusData: [
        {
          Key: 'Commissioned',
          value: 20,
        },
        {
          Key: 'UnderMaintenance',
          value: 25,
        },
        {
          Key: 'Upcoming',
          value: 5,
        },
      ],
    },
    {
      Type: 'Chargers',
      Count: 35,
      StatusData: [
        {
          Key: 'Available',
          value: 10,
        },
        {
          Key: 'Connected',
          value: 6,
        },
        {
          Key: 'Offline',
          value: 10,
        },
      ],
    },
    {
      Type: 'Charging Sessions',
      Count: 26,
      StatusData: [
        {
          Key: 'Cancelled',
          value: 15,
        },
        {
          Key: 'Interrupted',
          value: 15,
        },
        {
          Key: 'Completed',
          value: 5,
        },
      ],
    },
    {
      Type: 'Alerts',
      Count: 10,
      StatusData: [
        {
          Key: 'Critical',
          value: 5,
        },
        {
          Key: 'High',
          value: 3,
        },
        {
          Key: 'Medium',
          value: 2,
        },
      ],
    },
  ]
  constructor(private _router: Router) {}

  ngOnInit(): void {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }
}

export interface PeriodicElement {
  locationName: string
  address: string
  contactPersonName: string
  contactNumber: string
  locationStatus: string
  noOfPorts: string
  available: string
  connected: string
  faulty: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    locationName: 'Location A',
    address: 'Hydrogen',
    contactPersonName: 'Tom',
    contactNumber: '9876543210',
    locationStatus: 'Upcoming',
    noOfPorts: '62',
    available: '18',
    connected: '20',
    faulty: '40',
  },
  {
    locationName: 'Location B',
    address: 'Hydrogen',
    contactPersonName: 'Tom',
    contactNumber: '9876543210',
    locationStatus: 'Upcoming',
    noOfPorts: '62',
    available: '18',
    connected: '20',
    faulty: '40',
  },
  {
    locationName: 'Location C',
    address: 'Hydrogen',
    contactPersonName: 'Tom',
    contactNumber: '9876543210',
    locationStatus: 'Upcoming',
    noOfPorts: '62',
    available: '18',
    connected: '20',
    faulty: '40',
  },
  {
    locationName: 'Location D',
    address: 'Hydrogen',
    contactPersonName: 'Tom',
    contactNumber: '9876543210',
    locationStatus: 'Upcoming',
    noOfPorts: '62',
    available: '18',
    connected: '20',
    faulty: '40',
  },
  {
    locationName: 'Location E',
    address: 'Hydrogen',
    contactPersonName: 'Tom',
    contactNumber: '9876543210',
    locationStatus: 'Upcoming',
    noOfPorts: '62',
    available: '18',
    connected: '20',
    faulty: '40',
  },
  {
    locationName: 'Location F',
    address: 'Hydrogen',
    contactPersonName: 'Tom',
    contactNumber: '9876543210',
    locationStatus: 'Upcoming',
    noOfPorts: '62',
    available: '18',
    connected: '20',
    faulty: '40',
  },
  {
    locationName: 'Location G',
    address: 'Hydrogen',
    contactPersonName: 'Tom',
    contactNumber: '9876543210',
    locationStatus: 'Upcoming',
    noOfPorts: '62',
    available: '18',
    connected: '20',
    faulty: '40',
  },
  {
    locationName: 'Location H',
    address: 'Hydrogen',
    contactPersonName: 'Tom',
    contactNumber: '9876543210',
    locationStatus: 'Upcoming',
    noOfPorts: '62',
    available: '18',
    connected: '20',
    faulty: '40',
  },
]
