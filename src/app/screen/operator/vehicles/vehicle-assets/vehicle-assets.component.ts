import { Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { Router } from '@angular/router'
import { StorageService } from 'src/app/service/storage.service'
import { VehicleService } from '../vehicle.service'

@Component({
  selector: 'app-vehicle-assets',
  templateUrl: './vehicle-assets.component.html',
  styleUrls: ['./vehicle-assets.component.scss'],
})
export class VehicleAssetsComponent implements OnInit {
  vehicle = '../../../../../assets/widget-icon/Vehicle.png'

  vehicleList = []

  searchParam: string = ''
  //isTableHasData = false
  expandedElement: any
  currentPage = 1
  totalRecords = 30
  pageSize = 10
  totalPages = 0

  @ViewChild(MatPaginator) paginator!: MatPaginator
  dataSource = new MatTableDataSource<Element>(this.vehicleList)
  UserId: string | null
  statusList: any
  isTableHasData = false
  displayedColumns = [
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
  constructor(
    public _vehicleService: VehicleService,
    private _router: Router,
    private _storageService: StorageService,
  ) {
    this.UserId = this._storageService.getLocalData('user_id')
    let vehicleId = this._storageService.getSessionData('vehicleId')
    if (vehicleId) {
      this._storageService.removeSessionData('vehicleId')
    }
  }

  ngOnInit(): void {
    this.getAllVehicle('', this.currentPage, this.totalRecords)
  }

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator
    this.paginator._intl.itemsPerPageLabel = 'Rows per page'
  }
  // data = [
  //   {
  //     Type: 'Vehicles',
  //     Count: 26,
  //     StatusData: [
  //       {
  //         Key: 'Active',
  //         value: 10,
  //         Color: '#90993F',
  //       },
  //       {
  //         Key: 'Inactive',
  //         value: 15,
  //         Color: '#775577',
  //       },
  //     ],
  //   },
  // ]

  /**
   * Search Vehicle
   * @param event
   */

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.searchParam = filterValue
    this.getAllVehicle('', this.currentPage, this.totalRecords)
  }

  /**
   * View Vehicle Details
   */
  viewVehicleDetails(data: any) {
    console.log(data)
    this._storageService.setSessionData('vehicleId', data.id)

    this._router.navigate(['operator/vehicles/vehicle-details'])
  }

  /**
   * Get Vehicle List
   */
  getAllVehicle(event: any, currentPage: number, totalPage: number) {
    if (this.pageSize !== event.pageSize) {
      this.currentPage = 1
    } else {
      this.currentPage =
        event !== undefined && event !== ''
          ? event.previousPageIndex < event.pageIndex
            ? currentPage + 1
            : currentPage - 1
          : 1
      if (this.currentPage == 0) {
        this.currentPage = this.currentPage + 1
      }
    }
    this.pageSize = event !== undefined && event !== '' ? event.pageSize : 10
    const pBody = {
      pageNumber: this.currentPage,
      searchParam: this.searchParam,
      pageSize: this.pageSize,
      orderBy: '',
      locationIds: [],
      opratorid: this.UserId,
    }
    this._vehicleService.getAllVehicle(pBody).subscribe((res) => {
      if (res.data !== undefined && res.data != null && res.data.length > 0) {
        this.statusList = res.statusList
        this.totalRecords = res.paginationResponse.totalCount
        this.totalPages = res.paginationResponse.totalPages
        this.vehicleList = res.data
        this.dataSource.data = this.vehicleList
        this.isTableHasData = false
      } else {
        this.dataSource.data = []
        this.isTableHasData = true
      }
    })
  }
}
