

import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { ClientBilling } from '../client-billing.model';
import { ClientBillingService } from '../client-billing.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-client-billing-list',
  templateUrl: './client-billing-list.component.html',
  styleUrls: ['./client-billing-list.component.scss']
})
export class ClientBillingListComponent implements OnInit {
  adminList = [];
  isTableHasData: any;
  totalCount: any;
  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: any;
  pageSizeOptions = [10, 20, 100];
  statusData: any;
  @Output() editBilling = new EventEmitter<ClientBilling>();
  @Output() billingDeleted = new EventEmitter<void>();
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'customer',
    'chargerType',
    'planName',
    'price',
    'startPeriod',
    'endPeriod',
    'description',
    'Status',
    'Action',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('input') inputValue: any;
  clientBillings: ClientBilling[] = [];

  constructor(private clientBillingService: ClientBillingService,
   private _router: Router,
   private _route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.loadClientBillings();
  }

  loadClientBillings(): void {
    const body = {
      pageNumber: this.currentPage,
      searchParam:  '',
      pageSize: this.pageSize,
      orderBy:''
      
    };
    this.clientBillingService.getAllClientBillings(body).subscribe(res => {
       if (res.data !== undefined && res.data != null && res.data.length > 0) {
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
    
    });
  }

  onEdit(billing: ClientBilling): void {
    // Emit the selected billing to the parent component
    this.editBilling.emit(billing);
  }




    /**
   *
   * @param event
   * Apply Filter for Admin list
   */
    applyFilter(event: Event) {
      const filterValue = this.inputValue.nativeElement.value.toLowerCase();
     
    }

      /**
   *
   * @param type, data
   * perform Action
   */
  performAction(type: string, data?: any) {
   sessionStorage.removeItem('adminData');
   sessionStorage.removeItem('saveBtn');
   let path = 'create-client-billing';
   if (type == 'view') {
     path = 'view-client-billing';
     sessionStorage.setItem('adminData', JSON.stringify(data));
     sessionStorage.setItem('saveBtn', JSON.stringify(false));
   } else if (type == 'edit') {
     path = 'edit-client-billing';
     sessionStorage.setItem('adminData', JSON.stringify(data));
     sessionStorage.setItem('saveBtn', JSON.stringify(true));
   } else {
     sessionStorage.removeItem('adminData');
     sessionStorage.removeItem('saveBtn');
   }

   this._router.navigate([path], { relativeTo: this._route });
 }


  /**
   *
   * @param id, state
   * Change State
   */
  changeState(id: number, state: boolean) {
    let isActive = !state;
    const body = { id: id, isActive: isActive };
   //  this._superAdminService.ChangeState(body).subscribe({
   //    next: (res) => {
   //      if (res.statusMessage !== undefined) {
   //        this.getAdminList();
   //      }
   //    },
   //    error: (error) => {},
   //  });
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
    this.loadClientBillings();
  }
}