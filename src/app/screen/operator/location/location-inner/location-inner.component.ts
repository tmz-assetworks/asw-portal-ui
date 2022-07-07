import { Component, OnInit, ViewChild } from '@angular/core'
import { FormControl } from '@angular/forms'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/service/auth/auth.service'
import { EChartsOption } from 'echarts'

@Component({
  selector: 'app-location-inner',
  templateUrl: './location-inner.component.html',
  styleUrls: ['./location-inner.component.scss'],
})
export class LocationInnerComponent implements OnInit {
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
    this.paginator._intl.itemsPerPageLabel = 'Rows per page'
  }

  viewLocation() {
    this.showLocationNav = true
    this._router.navigate(['operator/location/analytics'])
  }

  option: EChartsOption = {
    // legend: {
    //   data: ['Total Revenue', 'Daily Revenue', 'Today Revenue'],
    // },
    // xAxis: {
    //   type: 'category',
    //   data: ['990.71', '412.14', '408.07'],
    // },

    // yAxis: {
    //   type: 'value',
    //   show: false,
    // },
    // series: [
    //   {
    //     data: [
    //       {
    //         name: 'Total Revenue',
    //         value: 200,
    //         itemStyle: {
    //           color: '#90993F',
    //         },
    //       },
    //       {
    //         name: 'Daily Revenue',
    //         value: 150,
    //         itemStyle: {
    //           color: '#E97300',
    //         },
    //       },
    //       {
    //         name: 'Today Revenue',
    //         value: 100,
    //         itemStyle: {
    //           color: '#0062A6',
    //         },
    //       },
    //     ],
    //     type: 'bar',
    //   },
    // ],
    // series: [
    //   { name: 'Total Revenue', data: [990.71], type: 'bar' },
    //   { name: 'Daily Revenue', data: [412.14], type: 'bar' },
    //   { name: 'Today Revenue', data: [408.07], type: 'bar' },
    // ],

    tooltip: {
      trigger: 'axis',
      position: ['15%', '20%'],
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: ['Total Revenue', 'Daily Revenue', 'Today Revenue'],
      icon: 'circle',
      right: 10,
      top: 'bottom',
    },
    grid: {
      left: '0%',
      right: '8%',
      bottom: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: ['990.71', '412.14', '408.07'],
      // data: (function () {
      //   let list = [];
      //   for (let i = 1; i <= 11; i++) {
      //     list.push('Nov ' + i);
      //   }
      //   return list;
      // })()
      // axisLabel: {
      //   rotate: 30,
      // },
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        name: 'Placeholder',
        type: 'bar',
        stack: 'Total',
        itemStyle: {
          borderColor: 'transparent',
          color: 'transparent',
        },
        emphasis: {
          itemStyle: {
            borderColor: 'transparent',
            color: 'transparent',
          },
        },
        // data: [0, 900, 1245, 1530, 1376, 1376, 1511, 1689, 1856, 1495, 1292]
      },
      {
        name: 'Total Revenue',
        type: 'bar',
        stack: 'Total',
        itemStyle: {
          color: '#90993F',
        },
        data: [990.71, '-', '-'],
      },
      {
        name: 'Daily Revenue',
        type: 'bar',
        stack: 'Total',
        itemStyle: {
          color: '#E97300',
        },
        data: ['-', 412.14, '-'],
      },
      {
        name: 'Today Revenue',
        type: 'bar',
        stack: 'Total',
        itemStyle: {
          color: '#0062A6',
        },
        data: ['-', '-', 408.07],
      },
    ],
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

  data = [
    {
      Type: 'Locations',
      Count: 50,
      StatusData: [
        {
          Key: 'Commissioned',
          Color: '#757575',
          value: 20,
        },
        {
          Key: 'Under Maintenance',
          Color: '#E97300',
          value: 25,
        },
        {
          Key: 'Upcoming',
          Color: '#0062A6',
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
          Color: '#90993F',
          value: 10,
        },
        {
          Key: 'Connected',
          Color: '#E97300',
          value: 6,
        },
        {
          Key: 'Offline',
          Color: '#757575',
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
          Color: '#EA002A',
          value: 15,
        },
        {
          Key: 'Interrupted',
          Color: '#E97300',
          value: 15,
        },
        {
          Key: 'Completed',
          Color: '#90993F',
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
          Color: '#E97300',
          value: 5,
        },
        {
          Key: 'High',
          Color: '#EA002A',
          value: 3,
        },
        {
          Key: 'Medium',
          Color: '#0062A6',
          value: 2,
        },
      ],
    },
  ]
  constructor(private _router: Router, private _auth: AuthService) {}

  ngOnInit(): void {
    // this._auth.tokenExpired()
  }

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
