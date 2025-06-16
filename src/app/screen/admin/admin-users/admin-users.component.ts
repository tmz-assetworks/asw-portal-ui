import { ActivatedRoute, Router } from '@angular/router';
import {Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../admin.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent {
  tableHasData: any;
  totalCount: any;
  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: any;
  pageSizeOptions = [10, 20, 100];
  statusData: any;
  adminName = '';
  userId: any;
  showAdminList: boolean = true;
  showCreateAdmin: boolean = false;
  searchKey: any;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'CustomerName',
    'AdminName',
    'EmailId',
    'Country',
    'Status',
    'Action',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('input') inputValue: any;
  constructor(
    public readonly adminService: AdminService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly storageService: StorageService
  ) {
    this.userId = this.storageService.getLocalData('user_id');
  }

  ngOnInit() {
    sessionStorage.removeItem('orgUserId');
    this.getAdminsList();
  }

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Rows per page';
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
    this.getAdminsList();
  }

  /**
   * Get Admin list
   */
  getAdminsList() {
    const body = {
      pageNumber: this.currentPage,
      searchParam: this.adminName !== '' ? this.adminName : '',
      pageSize: this.pageSize,
      opratorid: this.userId,
      customerID: 0,
      roleid: [3],
    };
    this.adminService.GetAllUsers(body).subscribe((res) => {
      if (res.data !== undefined && res.data != null && res.data.length > 0) {
        this.statusData = res.statusData;
        this.totalCount = res.paginationResponse.totalCount;
        this.totalPages = res.paginationResponse.totalPages;
        this.pageSize = res.paginationResponse.pageSize;

        this.dataSource.data = res.data;
        this.tableHasData = false;
      } else {
        this.dataSource.data = [];
        this.tableHasData = true;
      }
    });
  }

  /**
   *
   * @param event
   * Apply Filter for Admin list
   */
  applyFilters(event: Event) {
    const filterValue = this.inputValue.nativeElement.value.toLowerCase();
    this.adminName = filterValue;
    this.getAdminsList();
  }

  /**
   *
   * @param type, data
   * perform Action
   */
  performActions(type: string, data?: any) {
    sessionStorage.removeItem('adminData');
    sessionStorage.removeItem('saveBtn');
    let path = 'create-admin';
    if (type == 'view') {
      path = 'view-admin';
      console.log(data);
      sessionStorage.setItem('adminData', JSON.stringify(data));
      sessionStorage.setItem('saveBtn', JSON.stringify(false));
    } else if (type == 'edit') {
      path = 'edit-admin';
      sessionStorage.setItem('adminData', JSON.stringify(data));
      sessionStorage.setItem('saveBtn', JSON.stringify(true));
    } else {
      sessionStorage.removeItem('adminData');
      sessionStorage.removeItem('saveBtn');
    }

    this.router.navigate([path], { relativeTo: this.route });
  }

  /**
   *
   * @param id, state
   * Change State
   */
  changeStates(id: number, state: boolean) {
    let isActive = !state;
    const body = { id: id, isActive: isActive };
    this.adminService.ChangeState(body).subscribe({
      next: (res) => {
        if (res.statusMessage !== undefined) {
          this.getAdminsList();
        }
      },
      error: (error) => {},
    });
  }
}
