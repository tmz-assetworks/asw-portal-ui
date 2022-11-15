import { ActivatedRoute, Router } from '@angular/router'
import { MatFormFieldControl } from '@angular/material/form-field'
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { SuperAdminService } from '../super-admin.service'
import { StorageService } from 'src/app/service/storage.service'

@Component({
  selector: 'app-manage-admin-users',
  templateUrl: './manage-admin-users.component.html',
  styleUrls: ['./manage-admin-users.component.scss'],
})
export class ManageAdminUsersComponent implements OnInit {
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
  displayedColumns: string[] = [
    'CustomerName',
    'AdminName',
    'EmailId',
    'Country',
    'Status',
    'Action',
  ]
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild('input') inputValue: any
  constructor(
    public _superAdminService: SuperAdminService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _storageService: StorageService,
  ) {
    this.userId = this._storageService.getLocalData('user_id')
  }

  ngOnInit() {
    this.getAdminList()
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
    this.getAdminList()
  }

  getAdminList() {
    const body = {
      pageNumber: this.currentPage,
      searchParam: this.adminName !== '' ? this.adminName : '',
      pageSize: this.pageSize,
      opratorid: this.userId,
      customerID: 0,
      roleid: [3],
    }
    this._superAdminService.GetAllUsers(body).subscribe((res) => {
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
    // const filterValue = (event.target as HTMLInputElement).value
    // this.dataSource.filter = filterValue.trim().toLowerCase()
    const filterValue = this.inputValue.nativeElement.value.toLowerCase()
    this.adminName = filterValue
    this.getAdminList()
  }
  
  showAdminList: boolean = true
  showCreateAdmin: boolean = false

  performAction(type: string, data?: any) {
    sessionStorage.removeItem('adminData')
    sessionStorage.removeItem('saveBtn')
    let path = 'create-admin'
    if (type == 'view') {
      path = 'view-admin'
      sessionStorage.setItem('adminData', JSON.stringify(data))
      sessionStorage.setItem('saveBtn', JSON.stringify(false))
    } else if (type == 'edit') {
      path = 'edit-admin'
      sessionStorage.setItem('adminData', JSON.stringify(data))
      sessionStorage.setItem('saveBtn', JSON.stringify(true))
    } else {
      sessionStorage.removeItem('adminData')
      sessionStorage.removeItem('saveBtn')
    }

    this._router.navigate([path], { relativeTo: this._route })
  }
  changeState(id: number, state: boolean) {
    let isActive = !state
    //
    const body = { id: id, isActive: isActive }
    this._superAdminService.ChangeState(body).subscribe({
      next: (res) => {
        if (res.statusMessage !== undefined) {
          this.getAdminList()
        }
      },
      error: (error) => {
        // console.log('error in api');
      },
    })
  }
}
