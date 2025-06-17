import { ActivatedRoute, Router } from '@angular/router';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../admin.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit, AfterViewInit {
  tableHasData = false;
  totalCount = 0;
  pageSize = 10;
  currentPage = 1;
  totalPages = 0;
  pageSizeOptions = [10, 20, 100];
  statusData: any;
  adminName = '';
  userId: any;
  showAdminList = true;
  showCreateAdmin = false;
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
    private readonly adminService: AdminService,
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

  private clearAdminSession() {
    sessionStorage.removeItem('adminData');
    sessionStorage.removeItem('saveBtn');
  }

  private setAdminSession(data: any, saveBtn: boolean) {
    sessionStorage.setItem('adminData', JSON.stringify(data));
    sessionStorage.setItem('saveBtn', JSON.stringify(saveBtn));
  }

  private get searchParam(): string {
    return this.adminName.trim() || '';
  }

  private updateCurrentPage(event: any) {
    if (event.pageSize !== this.pageSize) {
      this.currentPage = 1;
      this.pageSize = event.pageSize;
      this.paginator.pageIndex = 0;
    } else {
      this.currentPage = event.previousPageIndex < event.pageIndex
        ? this.currentPage + 1
        : this.currentPage - 1;
    }
  }

  pageChange(event: any) {
    this.updateCurrentPage(event);
    this.getAdminsList();
  }

  getAdminsList() {
    const body = {
      pageNumber: this.currentPage,
      searchParam: this.searchParam,
      pageSize: this.pageSize,
      opratorid: this.userId,
      customerID: 0,
      roleid: [3],
    };
    this.adminService.GetAllUsers(body).subscribe(res => {
      if (res.data?.length) {
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

  applyFilters(event: Event) {
    this.adminName = this.inputValue.nativeElement.value.toLowerCase();
    this.getAdminsList();
  }

  performActions(type: string, data?: any) {
    this.clearAdminSession();

    let path = 'create-admin';
    if (type === 'view' && data) {
      path = 'view-admin';
      this.setAdminSession(data, false);
    } else if (type === 'edit' && data) {
      path = 'edit-admin';
      this.setAdminSession(data, true);
    }

    this.router.navigate([path], { relativeTo: this.route });
  }

  changeStates(id: number, state: boolean) {
    const body = { id, isActive: !state };
    this.adminService.ChangeState(body).subscribe({
      next: (res) => {
        if (res.statusMessage) {
          this.getAdminsList();
        }
      },
      error: () => { /* handle error if needed */ },
    });
  }
}