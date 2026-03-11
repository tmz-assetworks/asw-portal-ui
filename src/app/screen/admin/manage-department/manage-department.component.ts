import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module';
import { AdminService } from '../admin.service';
import { StorageService } from 'src/app/service/storage.service';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-department',
  imports: [CommonModule, SharedMaterialModule, RouterModule],
  templateUrl: './manage-department.component.html',
  styleUrl: './manage-department.component.scss',
})
export class ManageDepartmentComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  UserId: string | null;
  userTimeZone: any;

  totalCount: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: number = 0;

  pageSizeOptions = [10, 20, 100];
  searchParam = '';

  displayedColumns: string[] = [
    'DeparmentName',
    'DeptkWhRate',
    'CreatedBy',
    'CreatedOn',
    'Action',
  ];

  isTableHasData = false;
  statusData: any;

  dataSource = new MatTableDataSource<any>([]);

  constructor(
    private readonly _adminService: AdminService,
    private readonly _router: Router,
    private readonly _storageService: StorageService,
    private readonly _toastr: ToastrService
  ) {
    this.UserId = this._storageService.getLocalData('user_id');
    this.userTimeZone = this._storageService.getLocalData('time_zone');
  }

  ngOnInit(): void {
    this.loadDepartments();
  }

  /**
   * Search Filter
   */
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchParam = filterValue;
    this.loadDepartments();
  }

  /**
   * Load Department List
   */
  loadDepartments(): void {

    const pBody = {
      pageNumber: this.currentPage,
      searchParam: this.searchParam,
      pageSize: this.pageSize,
      orderBy: '',
      opratorid: this.UserId,
    };

    this._adminService.GetAllDepartMentName(pBody).subscribe({
      next: (res) => this.handleDepartmentResponse(res),
      error: (err) => this.handleError(err)
    });
  }

  /**
   * Handle Department API Response
   */
  private handleDepartmentResponse(res: any): void {

    if (res?.data?.length > 0) {

      this.statusData = res.statusData;
      this.totalCount = res.paginationResponse.totalCount;
      this.totalPages = res.paginationResponse.totalPages;
      this.pageSize = res.paginationResponse.pageSize;

      this.dataSource.data = res.data;
      this.isTableHasData = false;

    } else {

      this.dataSource.data = [];
      this.isTableHasData = true;

    }
  }

  /**
   * Pagination Change
   */
  pageChange(event: any): void {

    if (event.pageSize === this.pageSize) {

      this.currentPage =
        event.previousPageIndex < event.pageIndex
          ? this.currentPage + 1
          : this.currentPage - 1;

    } else {

      this.currentPage = 1;
      this.pageSize = event.pageSize;
      this.paginator.pageIndex = 0;

    }

    this.loadDepartments();
  }

  /**
   * Navigate to Edit
   */
  editDepartment(data: any): void {
    this._router.navigateByUrl(`admin/department/edit-department?id=${data.id}`);
  }

  /**
   * Confirm Delete Department
   */
  confirmDeleteDepartment(id: number): void {

    Swal.fire({
      title: '<strong>Are you sure you want to delete this Department? This action cannot be undone.</strong>',
      icon: 'success',
      focusConfirm: true,
      confirmButtonText: ' <span style="color:#0062A6">CANCEL<span>',
      confirmButtonColor: '#E6E8E9',
      cancelButtonColor: '#0062A6',
      cancelButtonText: ' CONFIRM',
      showCancelButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((result) => {

      if (result.isDismissed) {
        this.deleteDepartment(id);
      }

    });
  }

  /**
   * Delete Department
   */
  private deleteDepartment(id: number): void {

    this._adminService.DeleteDepartmentById(id).subscribe({

      next: (res) => {

        if (res.statusCode === 200) {

          this._toastr.success(res.statusMessage);
          this.loadDepartments();

        } else {

          this._toastr.error(res.statusMessage);

        }

      },

      error: (error) => this.handleError(error)

    });

  }

  /**
   * Common Error Handler
   */
  private handleError(error: any): void {

    if (error?.status === 400) {

      const errorMsg = error?.error?.errors;
      this._toastr.error(errorMsg);

    }

  }

}