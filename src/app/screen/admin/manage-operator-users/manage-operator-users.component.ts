import { Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { StorageService } from 'src/app/service/storage.service'
import { ActivatedRoute, Router } from '@angular/router'
import { AdminService } from '../admin.service'
@Component({
  selector: 'app-manage-operator-users',
  templateUrl: './manage-operator-users.component.html',
  styleUrls: ['./manage-operator-users.component.scss'],
})
export class ManageOperatorUsersComponent implements OnInit {
  customerList = []
  displayedColumns: string[] = [
    'name',
    'email',
    'status',
    'associatedSite',
    'action',
  ]

  adminList = []
  isTableHasData: any
  totalCount: any
  pageSize: number = 10
  currentPage: number = 1
  totalPages: any
  pageSizeOptions = [10, 20, 100]
  statusData: any
  adminName = ''
  userId: any
  dataSource = new MatTableDataSource<any>()
  /*  displayedColumns: string[] = [
    'CustomerName',
    'AdminName',
    'EmailId',
    'Country',
    'Status',
    'Action',
  ] */
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild('input') inputValue: any
  constructor(
    public _adminService: AdminService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _storageService: StorageService,
  ) {
    this.userId = this._storageService.getLocalData('user_id')
  }

  ngOnInit() {
    this.getUserList()
  }

  searchKey: any

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Rows per page'
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
    this.getUserList()
  }

  getUserList() {
    const body = {
      pageNumber: this.currentPage,
      searchParam: this.adminName !== '' ? this.adminName : '',
      pageSize: this.pageSize,
      opratorid: this.userId,
      customerID: 0,
      roleid: [4], // 3
    }
    this._adminService.GetAllUsers(body).subscribe((res) => {
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

  applyFilter(event: Event) {
    //
    // const filterValue = (event.target as HTMLInputElement).value
    // this.dataSource.filter = filterValue.trim().toLowerCase()
    const filterValue = this.inputValue.nativeElement.value.toLowerCase()
    this.adminName = filterValue
    this.getUserList()
  }
  showAdminList: boolean = true
  showCreateAdmin: boolean = false

  performAction(type: string, data?: any) {
    sessionStorage.removeItem('operatorData')
    sessionStorage.removeItem('saveBtn')
    let path = 'add-operator'
    if (type == 'view') {
      path = 'view-operator'
      sessionStorage.setItem('operatorData', JSON.stringify(data))
      sessionStorage.setItem('saveBtn', JSON.stringify(false))
    } else if (type == 'edit') {
      path = 'edit-operator'
      sessionStorage.setItem('operatorData', JSON.stringify(data))
      sessionStorage.setItem('saveBtn', JSON.stringify(true))
    } else {
      sessionStorage.removeItem('operatorData')
      sessionStorage.removeItem('saveBtn')
    }

    this._router.navigate([path], { relativeTo: this._route })
  }

  changeState(id: number, state: boolean) {
    // alert(state); // , userId: this.userId
    let isActive = !state
    //
    const body = { id: id, isActive: isActive }
    this._adminService.ChangeState(body).subscribe({
      next: (res) => {
        if (res.statusMessage !== undefined) {
          this.getUserList()
        }
      },
      error: (error) => {
        // console.log('error in api');
      },
    })
  }
}
