import { Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { Router } from '@angular/router'
import { StorageService } from 'src/app/service/storage.service'
import { ManageChargerService } from './manage-charger-service'
import { AdminService } from '../admin.service'
@Component({
  selector: 'app-manage-chargers',
  templateUrl: './manage-chargers.component.html',
  styleUrls: ['./manage-chargers.component.scss'],
})
export class ManageChargersComponent implements OnInit {
  vehicleList = []

  totalCount: any
  pageSize: number = 10
  currentPage: number = 1
  totalPages: any
  pageSizeOptions = [10, 20, 100]
  searchParam = ''
  UserId: string | null

  isTableHasData = false

  displayedColumns: string[] = [
    'assetId',
    'chargeBoxId',
    'locationName',
    'make',
    'model',
    'status',
    'protocol',
    'simCardMSIDN',
    'Action',
  ]

  dataSource = new MatTableDataSource<any>(this.vehicleList)

  portType: any

  constructor(
    public _storageService: StorageService,
    private _router: Router,
    private _adminService: AdminService,
  ) {
    this.UserId = this._storageService.getLocalData('user_id')

    let addChargerLocation = this._storageService.getSessionData(
      'addChargerLocation',
    )

    if (addChargerLocation) {
      this._storageService.removeSessionData('addChargerLocation')
    }
  }

  ngOnInit() {
    this.GetDispensersWithPagination()
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator

  searchKey: string = ''

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Rows per page'
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.searchParam = filterValue
    this.GetDispensersWithPagination()
  }

  /**
   * view Charger
   */
  viewCharger(id: string) {
    this._router.navigateByUrl(`/admin/chargers/view-chargers?id=${id}`)
  }

  /**
   * Edit Charger
   */
  editCharger(id: string) {
    this._router.navigateByUrl(`/admin/chargers/edit-chargers?id=${id}`)
  }

  /**
   * Get Charger List
   */
  GetDispensersWithPagination() {
    const pBody = {
      pageNumber: this.currentPage,
      searchParam: this.searchParam,
      pageSize: this.pageSize,
      orderBy: '',
      operatorId: this.UserId,
    }
    this._adminService.GetDispensersWithPagination(pBody).subscribe((res) => {
      if (res.data !== undefined && res.data != null && res.data.length > 0) {
        this.totalCount = res.paginationResponse.totalCount
        this.totalPages = res.paginationResponse.totalPages
        this.pageSize = res.paginationResponse.pageSize

        this.dataSource.data = res.data;
       // console.log(this.dataSource.data,"HOORYYEE");

        this.portType = res.portType

        this.isTableHasData = false
      } else {
        this.dataSource.data = []
        this.isTableHasData = true
      }
    })
  }

  /**
   *
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

    this.GetDispensersWithPagination()
  }
}
