import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SuperAdminService } from '../super-admin.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/service/storage.service';


@Component({
  selector: 'app-manage-customers',
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.scss'],
})
export class ManageCustomersComponent implements OnInit {
  customerList = [];
  showCustomersList: boolean = true;
  showAddCustomer: boolean = false;
  isTableHasData: any;
  totalCount: any;
  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: any;
  pageSizeOptions = [10, 20, 100];
  searchParam = '';

  allCustomerlist=[];
  statusData: any;
  statusDataValue: any;
  

  dataSource = new MatTableDataSource<any>(this.allCustomerlist);
  displayedColumns: string[] = [
    'OrganisationName',
    'OrganisationId',
    'PointOfContact',
    'CustomerEmail',
    'PhoneNumber',
    'Status',
    'NumberOfEvChargers',
    'Assets',
    'User',
    'action',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  

  constructor(
    public _superAdminService: SuperAdminService,
    public _router: Router,
    private _route: ActivatedRoute,
    private _storageService: StorageService,
  ) {
    let customerData = this._storageService.getSessionData('customerData');
    this._storageService.getSessionData('IsSaveBtn');
    if (customerData) {
      this._storageService.removeSessionData('customerData');
      this._storageService.removeSessionData('IsSaveBtn');
    }
  }

  ngOnInit() {
    this.GetAllCustomer();
    
  }

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Rows per page';
  }

  viewLocation(data: any) {
    this._storageService.setSessionData('customerData', data);
    this._storageService.setSessionData('IsSaveBtn', false);
    let viewLocationURL = `superadmin/customer/view-customer`;
    this._router.navigateByUrl(viewLocationURL);
  }

  /**
   * Edit Customer
   * @param id
   */
   editCusotmer(id: number) {
    this._router.navigateByUrl(`superadmin/customer/edit-customer?id=${id}`);
  }
/**
   * View Customer
   * @param id
   */
  viewCustomer(id: number) {
    this._router.navigateByUrl(`superadmin/customer/view-customer?id=${id}`);
  }

/**
   * Add Customer
   * @param 
   */
  AddCustomer() {
    this._router.navigateByUrl('superadmin/admin/createadmin');
  }

  /**
   *
   * @param event
   * Search Filter
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  

 /**
   * Get Customer list
   * @param id
   */

    GetAllCustomer(){
     const body={
      pageNumber: this.currentPage,
      searchParam: this.searchParam,
      pageSize: this.pageSize,
      orderBy: '',
      opratorid: '',

  
     }
  this._superAdminService.GetAllCustomer(body).subscribe((res: any) => {
    if (res.data !== undefined && res.data != null && res.data.length > 0) {
      this.statusData = res.statusData;
      

      this.totalCount = res.paginationResponse.totalCount;
      this.totalPages = res.paginationResponse.totalPages;
      this.pageSize = res.paginationResponse.pageSize;

      this.allCustomerlist = res.data;
      this.dataSource.data = res.data;
      
      this.isTableHasData = false;
    } else {
      this.dataSource.data = [];
      this.isTableHasData = true;
    }
   
  
  })

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

    this.GetAllCustomer();
  }


}
