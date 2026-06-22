  import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
  import { MatPaginator,PageEvent } from '@angular/material/paginator';
  import { MatTableDataSource } from '@angular/material/table';
  import { Location, DatePipe, CommonModule } from '@angular/common';
  import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
  import { ToastrService } from 'ngx-toastr';
  import { StorageService } from 'src/app/service/storage.service';
  import { ReportService } from '../reports.service';
  import { AdminService } from 'src/app/screen/admin/admin.service';
  import { SharedMaterialModule } from 'src/app/shared/shared-material.module';
  import * as fs from 'file-saver';

  interface ReportItem {
    deviceId: string;
    requestType: string;
    createdOn: string;
    requestPayload:string;
    responsePayload: string;
    errorCode?: string;
    requestId?: string;
  }

  interface ZeroCostTransactionItem {
  chargeBoxId: string;
  sessionId: number;
  locationName: string;
  rfid: string;
  startTime: string;
  endTime: string;
  billingCost: number;
}

  @Component({
    selector: 'app-report-exception-details',
    templateUrl: './report-exception-details.component.html',
    styleUrls: ['./report-exception-details.component.scss'],
    standalone: true,
    imports: [SharedMaterialModule, CommonModule, ReactiveFormsModule],
  })
  export class ReportExceptionDetailsComponent implements OnInit, AfterViewInit {

    displayedColumnsTransaction: string[] = [
    'deviceId',
    'createdOn',
    'status',
    'expand'
    ];

    displayedColumnsZeroCost: string[] = [
  'chargeBoxId',
  'sessionId',
  'locationName',
  'rfid',
  'startTime',
  'endTime',
  'billingCost'
];

isZeroCostTransaction = false;
  expandedElement: any | null = null;
  startDateSession: string | null = null;
  endDateSession: string | null = null;

  toggleRow(element: any): void {
    this.expandedElement =
      this.expandedElement === element ? null : element;
  }

    dataSource = new MatTableDataSource<ReportItem>();

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    graphHeading: string = '';
    pageHeading: string = '';
    duration: string = '';
    currentPage: number = 1;
    isLoading = false;
    pageSize = 10;
    totalCount = 0;
    pageSizeOptions = [10, 20, 100];

    searchFilter = this._fb.group({
      fromDate: new FormControl('', Validators.required),
      toDate: new FormControl('', Validators.required),
      locationId: new FormControl<number[]>([])
    });

    locationList: any[] = [];
    selectedLocationIds: number[] = [];

    userId = this._storageService.getLocalData('user_id');
    userTimeZone = this._storageService.getLocalData('time_zone');

    isTableEmpty = false;
    submitted = false;

    private readonly  datePipe = new DatePipe('en-US');

    constructor(
      private readonly _storageService: StorageService,
      private readonly _location: Location,
      private readonly _reportService: ReportService,
      private readonly _fb: FormBuilder,
      private readonly _toastr: ToastrService,
      private readonly _adminService: AdminService
    ) {
      this.graphHeading = this._storageService.getSessionData('graphHeading') || '';
      this.pageHeading = this._storageService.getSessionData('pageHeading') || '';
      this.duration = this._storageService.getSessionData('duration') || 'Last24Hours';
      this.startDateSession = this._storageService.getSessionData('StartDate')|| '';
      this.endDateSession = this._storageService.getSessionData('EndDate')|| '';;
    }

    ngOnInit(): void {

      this.isZeroCostTransaction =
      this.graphHeading === 'Transactions With No Billing Cost';
      
      this.loadLocations();

      this.setDefaultDates();

      this.loadData();
    }

    ngAfterViewInit(): void {
      this.paginator._intl.itemsPerPageLabel = 'Rows per page';
      this.dataSource.paginator = this.paginator;
    }

private setDefaultDates(): void {

  // For Alert page, default to last 24 hours
  if (this.graphHeading === 'Alerts') {
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - (24 * 60 * 60 * 1000));

    this.searchFilter.patchValue({
      fromDate: startDate as any,
      toDate: endDate as any
    });

    return;
  }

  // Existing session date logic
  if (!this.startDateSession || !this.endDateSession) {
    return;
  }

  this.searchFilter.patchValue({
    fromDate: new Date(this.startDateSession) as any,
    toDate: new Date(this.endDateSession) as any
  });
}


 private loadData(): void {
  this.isLoading = true;

  const payload = this.buildPayload();

  this._reportService.InvalidOcppCommandData(payload).subscribe({
    next: (res) => {
      this.handleResponse(res);
      this.isLoading = false;
    },
    error: () => {
      this.isLoading = false;
      this._toastr.error('Failed to load data');
    }
  });
}

  private buildPayload(): any {
    const formValue = this.searchFilter.value;

    const hasCustomDate = formValue.fromDate && formValue.toDate;

    return {

      requestType: this.graphHeading,
      duration: hasCustomDate ? null : this.duration,

      locationIds: formValue.locationId || [],

      startDate: hasCustomDate
        ? new Date(formValue.fromDate).toISOString()
        : null,

      endDate: hasCustomDate
        ? new Date(formValue.toDate).toISOString()
        : null,

      page: this.currentPage,
      pageSize: this.pageSize
    };
  }


get displayedColumns(): string[] {

  return this.isZeroCostTransaction
    ? this.displayedColumnsZeroCost
    : this.displayedColumnsTransaction;
}

 private handleResponse(res: any): void {

  const data =
    this.isZeroCostTransaction
      ? (res?.dataModel ?? [])
      : (res?.data ?? []);

  console.log(data);    

  this.dataSource.data = data;

  this.totalCount = data.length;

  this.isTableEmpty = !data.length;
}

  filter(): void {
    this.submitted = true;

    if (this.searchFilter.invalid) {
      this._toastr.error('Please fill mandatory fields.');
      return;
    }

    this.currentPage = 1; 
    this.loadData();
  }

    resetFilter(): void {
      this.searchFilter.reset();
      this.selectedLocationIds = [];
      this.submitted = false;
      this.loadData();
    }

    private loadLocations(): void {
      this._reportService.GetLocationName().subscribe(res => {
        this.locationList = res?.data || [];
      });
    }

    onSelectLocation(event: any, id: number): void {
      if (!event.isUserInput) return;

      const index = this.selectedLocationIds.indexOf(id);

      if (index === -1) {
        this.selectedLocationIds.push(id);
      } else {
        this.selectedLocationIds.splice(index, 1);
      }
    }
    
downloadAsCSV(): void {

  const payload = this.buildPayload();

  this._reportService.InvalidOcppCommandData(payload).subscribe(res => {

    const data = this.isZeroCostTransaction
      ? (res?.dataModel ?? [])
      : (res?.data ?? []);

    if (!data.length) {
      this._toastr.warning('No data to export');
      return;
    }

    let formatted: any[];

    if (this.isZeroCostTransaction) { 

      formatted = data.map((x: any) => ({
        'CHARGE BOX ID': x.chargeBoxId,
        'SESSION ID': x.sessionId,
        'LOCATION': x.locationName,
        'RFID': x.rfid,
        'START TIME': this.formatDate(x.startTime),
        'END TIME': this.formatDate(x.endTime),
        'BILLING COST': x.billingCost
      }));

    } else {

      formatted = data.map((x: any) => ({
        'DEVICE ID': x.deviceId,
        'REQUEST ID': x.requestId || '-',
        'TIME': this.formatDate(x.createdOn),
        'STATUS': x.errorCode,
        'REQUEST PAYLOAD': x.requestPayload,
        'RESPONSE PAYLOAD': x.responsePayload
      }));

    }

    this.exportCSV(formatted);
  });
}

    private formatDate(date: string): string {
      return this.datePipe.transform(date, 'dd-MM-yyyy HH:mm') || '';
    }

    private exportCSV(data: Record<string, unknown>[]): void {
      const headers = Object.keys(data[0]);

      const csvRows = data.map(row =>
        headers.map(field => JSON.stringify(row[field] ?? '')).join(',')
      );

      csvRows.unshift(headers.join(','));

     

      const blob = new Blob([csvRows.join('\r\n')], { type: 'text/csv' });
      fs.saveAs(blob, this.graphHeading + '.csv');
    }

    


    checkValidFrom(event: any) {
      let fromDate = this.searchFilter.value.fromDate
      if (!fromDate) {
        this._toastr.error('Please select valid start date first.')
        this.searchFilter.patchValue({ toDate: '' })
        return
      }
    } 
    
  checkStartDate(): void {
    const { fromDate, toDate } = this.searchFilter.value;

    if (fromDate && toDate && new Date(toDate) < new Date(fromDate)) {
      this.searchFilter.patchValue({ toDate: '' });
    }
  }




  dateFilterForStart = (d: any | null) => {
      let todayDate = new Date()
      return d <= todayDate
    }
    dateFilterForEnd = (d: any | null) => {
      let fromDate:any = this.searchFilter.value.fromDate
      return d >= fromDate
    }

    getModifiedDate() {
      let date = new Date()
      let time = this.datePipe.transform(date, 'HH:mm:ss')
      return time
    }


    pageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.loadData();
  }

  isExpansionDetailRow = (index: number, row: any) => {
    return this.expandedElement === row;
  };


    goback(): void {
      this._location.back();
    }
  }