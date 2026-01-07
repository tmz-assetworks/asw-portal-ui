import { Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { Router, RouterModule } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { StorageService } from 'src/app/service/storage.service'
import { AdminService } from '../admin.service'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'
import { CommonModule } from '@angular/common'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-manage-vehicles',
  templateUrl: './manage-vehicles.component.html',
  styleUrls: ['./manage-vehicles.component.scss'],
  imports:[
    CommonModule,
    SharedMaterialModule,
    RouterModule
  ]
})
export class ManageVehiclesComponent implements OnInit {
  /**
   * Declare variables
   */
  allVehicleList:string[] = []
  isTableHasData: any
  // totalCount: any
  // pageSize: number = 10
  // currentPage: number = 1
  // totalPages: any
  // pageSizeOptions = [10, 20, 100]
  totalCount: any
  pageSize: number = 10
  currentPage: number = 1
  totalPages: any
  pageSizeOptions = [10, 20, 100]
  searchParam = ''

  dataSource = new MatTableDataSource<any>(this.allVehicleList)

  @ViewChild(MatPaginator) paginator!: MatPaginator

  /**
   * Define columns
   */
  displayedColumns: string[] = [
    'UnitNumber',
    'VIN',
    'ModelYear',
    'Name',
    'Modal',
    'LicencePlate',
    'RFIDCardAssigned',
    'Status',
    'Action',
  ]

  UserId: string | null

  statusDataValue1: any
  statusDataValue: any
  statusDataValue2: any

  constructor(
    private _router: Router,
    private _storageService: StorageService,
    public _adminService: AdminService,
    private __toastr: ToastrService,
  ) {
    this.UserId = this._storageService.getLocalData('user_id')
  }

  ngOnInit() {
    /**
     * Api Call
     */
    this.getVehicleList()
  }

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Rows per page'
  }

  filterVehicle(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.searchParam = filterValue
    this.currentPage = 1
    this.paginator.pageIndex = 0

    this.getVehicleList()
  }

  /**
   * Edit vehicle
   * @param id
   */
  editVehicle(id: number) {
    this._router.navigateByUrl(`admin/vehicles/edit-vehicle?id=${id}`)
  }
  /**
   *
   * @param id
   * View vehicle
   */

  viewVehicle(id: number) {
    this._router.navigateByUrl(`admin/vehicles/view-vehicle?id=${id}`)
  }

  /**
   * Get Vehicle List
   */
  getVehicleList() {
    const body = {
      pageNumber: this.currentPage,
      searchParam: this.searchParam,
      pageSize: this.pageSize,
      orderBy: '',
      opratorid: '',
    }
    this._adminService.GetVechicleList(body).subscribe((res) => {
      if (res.data !== undefined && res.data != null && res.data.length > 0) {
        this.statusDataValue = res.statusData[0]
        this.statusDataValue1 = res.statusData[1]
        this.statusDataValue2 = res.statusData[2]
        this.totalCount = res.paginationResponse.totalCount
        this.totalPages = res.paginationResponse.totalPages
        this.pageSize = res.paginationResponse.pageSize
        this.allVehicleList = res.data
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

    this.getVehicleList()
  }

  /**
   * Make vehicle active/ inactive
   * @param id
   * @param status
   */

  IsActiveVehicleById(id: any, status: any) {
    const pbody = {
      id: id,
      isActive: status,
      modifiedBy: this.UserId,
    }

    this._adminService.IsActiveVehicleById(pbody).subscribe((res) => {
      if (res) {
        if (status == false) {
          this.__toastr.success('Record inactive successfully')

          this.getVehicleList()
        } else {
          this.__toastr.success('Record active successfully')

          this.getVehicleList()
        }
      }
    })
  }

  /**
   * Make vehicle delete from database
   * @param id
   */
    confirmDeleteVehicle(id: any): void {
    Swal.fire({
            title: '<strong>Are you sure you want to delete this vehicle? This action cannot be undone.</strong>',
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
              this._adminService.DeleteVehicleById(id).subscribe({
                next: (res) => {
                  if (res.statusCode === 200) {
                    this.__toastr.success(res.statusMessage);
                    this.getVehicleList();
                  } else {
                    this.__toastr.error(res.statusMessage);
                  }
                },
                error: (error) => {
                  if (error.status == 400) {
                    let errorMsg = error.error.errors;
                    this.__toastr.error(errorMsg);
                  }
                },
              });
            }
          });

  }





}
