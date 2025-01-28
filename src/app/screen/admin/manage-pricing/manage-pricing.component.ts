import { Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { StorageService } from 'src/app/service/storage.service'
import { AdminService } from '../admin.service'

@Component({
  selector: 'app-manage-pricing',
  templateUrl: './manage-pricing.component.html',
  styleUrls: ['./manage-pricing.component.scss'],
})
export class ManagePricingComponent implements OnInit {
  pricingPlanList = []

  UserId: string | null
  totalCount: any
  pageSize: number = 10
  currentPage: number = 1
  totalPages: any
  pageSizeOptions = [10, 20, 100]
  searchParam = ''
  displayedColumns: string[] = [
    'CustomerName',
    'PricePlanName',
    'Currency',
    // 'Location',
    'ValidFrom',
    'ValidTo',
    'Level',
    'Status',
    'Action',
  ]

  dataSource = new MatTableDataSource<any>(this.pricingPlanList)
  isTableHasData: any
  statusData: any
  adminService: any
  userTimeZone:any;

  constructor(
    private _adminService: AdminService,
    private _router: Router,
    private _storageService: StorageService,
    private _toastr:ToastrService
  ) {
    this.UserId = this._storageService.getLocalData('user_id')
    this.userTimeZone=this._storageService.getLocalData('time_zone');  
  }

  ngOnInit() {
    this.GetAllPricePlan()
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator

  searchKey: any

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Rows per page'
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    // this.dataSource.filter = filterValue.trim().toLowerCase()
    this.searchParam = filterValue
    this.GetAllPricePlan()
  }

  /**
   * Get All Pricing Plan  List
   */
  GetAllPricePlan(): void {
    const pBody = {
      pageNumber: this.currentPage,
      searchParam: this.searchParam,
      pageSize: this.pageSize,
      orderBy: '',
      opratorid: this.UserId,
    }
    this._adminService.GetAllPricePlan(pBody).subscribe((res) => {
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

  /**
   * view Pricing Plan
   */
  viewPricingPlan(data: any) {
    this._router.navigateByUrl(`admin/pricing/view-pricing?id=${data.id}`)
  }

  /**
   * Edit Pricing Plan'
   */
  editPricingPlan(data: any) {
    this._router.navigateByUrl(`admin/pricing/edit-pricing?id=${data.id}`)
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

    this.GetAllPricePlan()
  }

  IsActivePricePlanById(id: any, status: any) {
    const pbody = {
      id: id,
      isActive: status,
      modifiedBy: this.UserId,
    }

    this._adminService.IsActivePricePlan(pbody).subscribe((res) => {
      if (res) {
        if (status == false) {
          this._toastr.success('Record inactive successfully')

          this.GetAllPricePlan()
        } else {
          this._toastr.success('Record active successfully')

          this.GetAllPricePlan()
        }
      }
    })
  }
}
