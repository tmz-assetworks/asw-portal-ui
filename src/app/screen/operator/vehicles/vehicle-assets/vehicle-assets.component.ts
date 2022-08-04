import { Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { Router } from '@angular/router'
import { VehicleService } from '../vehicle.service'

@Component({
  selector: 'app-vehicle-assets',
  templateUrl: './vehicle-assets.component.html',
  styleUrls: ['./vehicle-assets.component.scss'],
})
export class VehicleAssetsComponent implements OnInit {
  vehicle = '../../../../../assets/widget-icon/Vehicle.png'

  vehicleList = []

  displayedColumns: string[] = [
    'VIN',
    'ModelYear',
    'Name',
    'Modal',
    'LicencePlate',
    'Department',
    'DomicileLocation',
    'VehicleMacAddress',
    'RFIDCardAssigned',
    'Status',
    'Action',
  ]
  @ViewChild(MatPaginator) paginator!: MatPaginator
  dataSource = new MatTableDataSource<Element>(this.vehicleList)

  constructor(
    public _vehicleService: VehicleService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.getVehicleList()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    this.paginator._intl.itemsPerPageLabel = 'Rows per page'
  }
  data = [
    {
      Type: 'Vehicles',
      Count: 26,
      StatusData: [
        {
          Key: 'Active',
          value: 10,
          Color: '#90993F',
        },
        {
          Key: 'Inactive',
          value: 15,
          Color: '#775577',
        },
      ],
    },
  ]

  /**
   * Search Vehicle
   * @param event
   */

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  /**
   * View Vehicle Details
   */
  viewVehicleDetails() {
    this._router.navigate(['operator/vehicles/vehicle-details'])
  }

  /**
   * Get Vehicle List
   */
  getVehicleList() {
    this._vehicleService.getVehicleList().subscribe((res) => {
      this.vehicleList = res.Data

      this.dataSource.data = this.vehicleList
    })
  }
}
