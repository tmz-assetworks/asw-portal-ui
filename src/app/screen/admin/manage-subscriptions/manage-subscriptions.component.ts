import { Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { StorageService } from 'src/app/service/storage.service'
import { AdminService } from '../admin.service'

@Component({
  selector: 'app-manage-subscriptions',
  templateUrl: './manage-subscriptions.component.html',
  styleUrls: ['./manage-subscriptions.component.scss'],
})
export class ManageSubscriptionsComponent implements OnInit {
  UserId: string | null
  totalCount: any
  pageSize: number = 10
  currentPage: number = 1
  totalPages: any
  pageSizeOptions = [10, 20, 100]
  searchParam = ''
  
  isTableHasData: any
  statusData: any

  SubscriptionPlan=[]

  displayedColumns: string[] = [
    'CustomerName',
    'SubscriptionPlanName',
    'Currency',
    'ValidFrom',
    'ValidTo',
    'Status',
    'Action',
  ]

  dataSource = new MatTableDataSource<any>(this.SubscriptionPlan)
  

  constructor(
    private _adminService: AdminService,
    private _router: Router,
    private _storageService: StorageService,
    private _toastr: ToastrService,
  ) {
    this.UserId = this._storageService.getLocalData('user_id')
  }

  ngOnInit() {
    this.GetSubscriptionPlanList()
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Rows per page';
       
   
  }
  /**
   * Get Subscription List
   */

  GetSubscriptionPlanList() {
    const pBody = {
      pageNumber: this.currentPage,
      searchParam: this.searchParam,
      pageSize: this.pageSize,
      orderBy: '',
      opratorid: this.UserId,
    }

    this._adminService.GetAllSubscriptionPlan(pBody).subscribe((res) => {
      if (res.data !== undefined && res.data != null && res.data.length > 0) {
        this.statusData = res.cardData
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
   *
   * @param data
   * View Subscription
   */
  viewSubscriptionPan(data: any) {
    this._router.navigateByUrl(
      `admin/subscriptions-plans/view-subscription?id=${data.id}`,
    )
  }
  /**
   *
   * @param data
   * Edit Subscription
   */
  editSubscriptionPan(data: any) {
    this._router.navigateByUrl(
      `admin/subscriptions-plans/edit-subscription?id=${data.id}`,
    )
  }

  /**
   *
   * @param event
   * Search Filter
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.searchParam = filterValue
    this.GetSubscriptionPlanList()
  }

  /**
   *
   * @param event
   * Page Event
   */

  pageChange(event: any) {
    if (event.pageSize !== this.pageSize) {
      this.currentPage = 1;
      this.pageSize = event.pageSize;
      this.paginator.pageIndex = 0;
    } else {
      this.currentPage =
        event.previousPageIndex < event.pageIndex
          ? this.currentPage + 1
          : this.currentPage - 1;
    }

    this.GetSubscriptionPlanList()
  }

  changeStatusById(id: any, status: any) {
    const pbody = {
      id: id,
      isActive: status,
      modifiedBy: this.UserId,
    }

    this._adminService.IsActiveSubscription(pbody).subscribe((res) => {
      if (res) {
        if (status == false) {
          this._toastr.success('Record inactive successfully')

          this.GetSubscriptionPlanList()
        } else {
          this._toastr.success('Record active successfully')

          this.GetSubscriptionPlanList()
        }
      }
    })
  }
}
