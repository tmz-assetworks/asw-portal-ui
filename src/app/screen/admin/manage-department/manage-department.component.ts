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
  imports: [CommonModule,SharedMaterialModule,RouterModule],
  templateUrl: './manage-department.component.html',
  styleUrl: './manage-department.component.scss',
})
export class ManageDepartmentComponent implements OnInit {
  UserId: string | null
  totalCount: any
  pageSize: number = 10
  currentPage: number = 1
  totalPages: any
  pageSizeOptions = [10, 20, 100]
  searchParam = ''
  displayedColumns: string[] = [
    'DeparmentName',
    'Active',
    'CreatedBy',
    'CreatedOn',    
    'Action',
  ]
  isTableHasData: any
  dataSource = new MatTableDataSource<any>([])
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
  
applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    //this.dataSource.filter = filterValue.trim().toLowerCase()
    this.searchParam = filterValue
    this.GetAllDepartMentName()
  }
  ngOnInit() {
    this.GetAllDepartMentName()
  }
   @ViewChild(MatPaginator) paginator!: MatPaginator

  /**
   * Get All Pricing Plan  List
   */
  GetAllDepartMentName(): void {
    const pBody = {
      pageNumber: this.currentPage,
      searchParam: this.searchParam,
      pageSize: this.pageSize,
      orderBy: '',
      opratorid: this.UserId,
    }
    this._adminService.GetAllDepartMentName(pBody).subscribe((res) => {
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
   *
   * @param event
   * Page Event
   */

  pageChange(event: any) {
    if (event.pageSize == this.pageSize) {
      this.currentPage =
        event.previousPageIndex < event.pageIndex
          ? this.currentPage + 1
          : this.currentPage - 1
    } else {
      this.currentPage = 1
      this.pageSize = event.pageSize
      this.paginator.pageIndex = 0
    }

    this.GetAllDepartMentName()
  }
  /**
   * Edit Pricing Plan'
   */
  editDepartment(data: any) {
    this._router.navigateByUrl(`admin/department/edit-department?id=${data.id}`)
  }

  /**
     * Make Department delete from database
     * @param id
     */
      confirmDeleteDepartment(id: any): void {
      Swal.fire({
              title: '<strong>Are you sure you want to delete this Department? This action cannot be undone.</strong>',
              icon: 'success',
              focusConfirm: true,
              confirmButtonText: ' <span style="color:#0062A6">CANCEL<span>',
              confirmButtonColor: '#E6E8E9',
              cancelButtonColor: '#0062A6',
              cancelButtonText: ' CONFIRM',
              showCancelButton: true,
              allowOutsideClick: false, // 🔒 Prevent close on outside click
              allowEscapeKey: false     // 🔒 Prevent close with Esc
            }).then((result) => {
              if (result.isDismissed) {
                //Do your stuffs...
                this._adminService.DeleteDepartmentById(id).subscribe({
                  next: (res) => {
                    if (res.statusCode === 200) {
                      this._toastr.success(res.statusMessage);
                      this.GetAllDepartMentName();
                    } else {
                      this._toastr.error(res.statusMessage);
                    }
                  },
                  error: (error) => {
                    if (error.status == 400) {
                      let errorMsg = error.error.errors;
                      this._toastr.error(errorMsg);
                    }
                  },
                });
              }
            });
  
    }
}
