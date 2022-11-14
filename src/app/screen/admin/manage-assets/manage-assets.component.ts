import { Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { StorageService } from 'src/app/service/storage.service'
import { AdminService } from '../admin.service'

@Component({
  selector: 'app-manage-assets',
  templateUrl: './manage-assets.component.html',
  styleUrls: ['./manage-assets.component.scss'],
})
export class ManageAssetsComponent implements OnInit {
  vehicleList = []

  totalCount: any
  pageSize: number = 10
  currentPage: number = 1
  totalPages: any
  pageSizeOptions = [10, 20, 100]
  isTableHasData: boolean = true
  searchParam = ''

  displayedColumns: string[] = [
    'type',
    'serialNumber',
    'location',
    'locationStatus',
    'Status',
    'Action',
  ]

  dataSource = new MatTableDataSource<any>(this.vehicleList)
  statusData: any
  UserId: string | null

  constructor(
    private _router: Router,
    private _storageService: StorageService,
    private _adminService: AdminService,
    private _toastr: ToastrService,
  ) {
    this.UserId = this._storageService.getLocalData('user_id')
  }

  ngOnInit() {
    this.getAssetList()
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Rows per page'
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.searchParam = filterValue
    this.getAssetList()
  }

  /**
   * Edit assets
   * @param id
   */
  editAssets(id: any, type: string) {
    this._router.navigateByUrl(`admin/assets/edit-assets?id=${id}&type=${type}`)
  }

  viewAssets(id: any, type: string) {
    this._router.navigateByUrl(`admin/assets/view-assets?id=${id}&type=${type}`)
  }
  /**
   * Get Asset List
   */
  getAssetList() {
    const pBody = {
      pageNumber: this.currentPage,
      searchParam: this.searchParam,
      pageSize: this.pageSize,
      orderBy: '',
    }

    this._adminService.GetCombineAssetList(pBody).subscribe((res) => {
      if (res.data !== undefined && res.data != null && res.data.length > 0) {
        this.statusData = res.statusData
        this.totalCount = res.paginationResponse.totalCount
        this.totalPages = res.paginationResponse.totalPages
        this.pageSize = res.paginationResponse.pageSize

        this.dataSource.data = res.data
        this.isTableHasData = false
      } else {
        this.dataSource.data = []
        this.isTableHasData = true
      }
    })
  }

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

    this.getAssetList()
  }

  IsActiveAsset(id: any, type: any, status: any) {
    const pbody = {
      id: id,
      name: type,
      isActive: status,
      modifiedBy: this.UserId,
    }

    this._adminService.IsActiveAsset(pbody).subscribe((res) => {
      if (res) {
        if (status == false) {
          this._toastr.success('Record inactive successfully')

          this.getAssetList()
        } else {
          this._toastr.success('Record active successfully')
          this.getAssetList()
        }
      }
    })
  }
}
