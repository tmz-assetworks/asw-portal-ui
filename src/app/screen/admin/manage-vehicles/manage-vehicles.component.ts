import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/service/storage.service';
import { AdminService } from '../admin.service';
// import { VehicleService } from './vehicle.service';

@Component({
  selector: 'app-manage-vehicles',
  templateUrl: './manage-vehicles.component.html',
  styleUrls: ['./manage-vehicles.component.scss'],
})
export class ManageVehiclesComponent implements OnInit {
  vehicleList = [];
  AllVechicleList = [];
  isTableHasData: any;
  totalCount: any;
  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: any;
  pageSizeOptions = [10, 20, 100];
  searchParam = '';
  statusData = [];
  dataSource = new MatTableDataSource<any>(this.AllVechicleList);
  displayedColumns: string[] = [
    'VIN',
    'ModelYear',
    'Name',
    'Modal',
    'LicencePlate',
    'Department',
    'DomicileLocation',
    'VehicleMacAddress',
    'RFIDCardAssigned',
    'Status',
    'Action',
  ];
  statusDataValue: any;
  statusDataKey: any;
  statusDataValue1: any;
  statusDataValue2: any;
  UserId: string | null;

  constructor(
    //private _vehicleService: VehicleService,
    private _router: Router,
    private _storageService: StorageService,
    public _adminService: AdminService,
    private __toastr:ToastrService
  ) {
    this.UserId = this._storageService.getLocalData('user_id')

    let VehicleData = this._storageService.getSessionData('VehicleData');
    this._storageService.getSessionData('IsSaveBtn');
    if (VehicleData) {
      this._storageService.removeSessionData('VehicleData');
      this._storageService.removeSessionData('IsSaveBtn');
    }
  }

  ngOnInit() {
    this.GetVechicleList();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  searchKey: any;

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Rows per page';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchParam = filterValue;
    this.GetVechicleList();
  }

  /**
   * view Location
   */
  viewLocation(data: any) {
    this._storageService.setSessionData('VehicleData', data);
    this._storageService.setSessionData('IsSaveBtn', false);
    let viewLocationURL = `admin/vehicles/view-vehicle`;
    this._router.navigateByUrl(viewLocationURL);
  }

  /**
   * Edit Location
   */
  // editLocation(data: any) {
  //   this._storageService.setSessionData('VehicleData', data);
  //   this._storageService.setSessionData('IsSaveBtn', true);
  //   // let editLocationURl=`admin/locations/edit-location/${locationId}`
  //   let editLocationURl = `admin/vehicles/edit-vehicle`;
  //   this._router.navigateByUrl(editLocationURl);
  // }

  /**
   * Edit Vehicle
   * @param id
   */
  editVehicle(id: number) {
    this._router.navigateByUrl(`admin/vehicles/edit-vehicle?id=${id}`);
  }

  viewVehicle(id: number) {
    this._router.navigateByUrl(`admin/vehicles/view-vehicle?id=${id}`);
  }

  /**
   * Get Vehicle List
   */
  GetVechicleList() {
    const body = {
      pageNumber: this.currentPage,
      searchParam: this.searchParam,
      pageSize: this.pageSize,
      orderBy: '',
      opratorid: '',
    };
    this._adminService.GetVechicleList(body).subscribe((res) => {
      if (res.data !== undefined && res.data != null && res.data.length > 0) {
        this.statusData = res.statusData;
        this.statusDataValue = res.statusData[0];

        this.statusDataValue1 = res.statusData[1];

        this.statusDataValue2 = res.statusData[2];

        this.totalCount = res.paginationResponse.totalCount;
        this.totalPages = res.paginationResponse.totalPages;
        this.pageSize = res.paginationResponse.pageSize;

        this.AllVechicleList = res.data;
        this.dataSource.data = res.data;
        this.isTableHasData = false;
      } else {
        this.dataSource.data = [];
        this.isTableHasData = true;
      }


    });
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

    this.GetVechicleList();
  }

   IsActiveVehicleById(id:any,status:any){
    const pbody={
      "id": id,
      "isActive": status,
      "modifiedBy":this.UserId
    }

    this._adminService.IsActiveVehicleById(pbody).subscribe(res=>{
      if (res) {
        if (status == false) {
          this.__toastr.success('Record inactive successfully')

         
    this.GetVechicleList();
        } else {
          this.__toastr.success('Record active successfully')
         
    this.GetVechicleList();
        }
      }

    })
  }

}
