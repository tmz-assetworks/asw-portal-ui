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
  // DECLARE VARIABLES

  vehicle = '../../../../../assets/Operator/Diagnostics-Icon/vehicle.svg'
  vehicleList = []
  totalCount: any
  pageSize: number = 10
  currentPage: number = 1
  totalPages: any
  pageSizeOptions = [10, 20, 100]
  searchParam = ''
  UserId: string | null
  statusList: any
  isTableHasData = false

  @ViewChild(MatPaginator) paginator!: MatPaginator

  dataSource = new MatTableDataSource<any>(this.vehicleList)

  /**
   * DEFINE TABLE COLUMNS
   */

  displayedColumns = [
    'VIN',
    'ModelYear',
    'Name',
    'Modal',
    'LicencePlate',
    'Department',
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
    //API CALL
    this.getAllVehicle()
  }

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Rows per page'
  }

  /**
   * SEARCH FILTER
   * @param event
   */

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.searchParam = filterValue
    this.getAllVehicle()
  }

  // VIEW VEHCILE DETAILS
  viewVehicleDetails(data: any) {
    this._storageService.setSessionData('vehicleId', data.id)

    this._router.navigate(['operator/vehicles/vehicle-details'])
  }

  // GET ALL VEHCILE
  getAllVehicle() {
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
        this.totalCount = res.paginationResponse.totalCount
        this.totalPages = res.paginationResponse.totalPages
        this.pageSize = res.paginationResponse.pageSize

        this.dataSource.data = res.data
        this.statusList = res.statusList
        this.isTableHasData = false
      } else {
        this.dataSource.data = []
        this.isTableHasData = true
      }
    })
  }

  /**
   * @param event
   * Page Event
   */

  pageChange(event: any) {
    if (event.pageSize !== this.pageSize) {
      this.currentPage = 1
      this.pageSize = event.pageSize
      this.paginator.pageIndex = 0
    } else {
      this.currentPage =
        event.previousPageIndex < event.pageIndex
          ? this.currentPage + 1
          : this.currentPage - 1
    }
    // CALL LIST API
    this.getAllVehicle()
  }
}
