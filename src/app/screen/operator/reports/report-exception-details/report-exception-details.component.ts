import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Location, DatePipe, CommonModule } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/service/storage.service';
import { ReportService } from '../reports.service';
import { AdminService } from 'src/app/screen/admin/admin.service';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module';
import * as fs from 'file-saver';
import { PageEvent } from '@angular/material/paginator';

interface ReportItem {
  deviceId: string;
  requestType: string;
  createdOn: string;
  responsePayload: string;
  errorCode?: string;
  requestId?: string;
}

@Component({
  selector: 'app-report-exception-details',
  templateUrl: './report-exception-details.component.html',
  styleUrls: ['./report-exception-details.component.scss'],
  standalone: true,
  imports: [SharedMaterialModule, CommonModule, ReactiveFormsModule],
})
export class ReportExceptionDetailsComponent implements OnInit, AfterViewInit {

  // =========================
  // 🔹 TABLE CONFIG
  // =========================
  displayedColumnsTransaction: string[] = [
    'deviceId',
    'createdOn',
    'status',
    'responsePayload'
  ];

  dataSource = new MatTableDataSource<ReportItem>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // =========================
  // 🔹 HEADER DATA
  // =========================
  graphHeading: string = '';
  pageHeading: string = '';
  duration: string = '';
  currentPage: number = 1;

  // =========================
  // 🔹 PAGINATION
  // =========================
  pageSize = 10;
  totalCount = 0;
  pageSizeOptions = [10, 20, 100];

  // =========================
  // 🔹 FILTER FORM
  // =========================
  searchFilter = this._fb.group({
    fromDate: new FormControl('', Validators.required),
    toDate: new FormControl('', Validators.required),
    locationId: new FormControl<number[]>([])
  });

  locationList: any[] = [];
  selectedLocationIds: number[] = [];

  // =========================
  // 🔹 USER DATA
  // =========================
  userId = this._storageService.getLocalData('user_id');
  userTimeZone = this._storageService.getLocalData('time_zone');

  // =========================
  // 🔹 STATE
  // =========================
  isTableEmpty = false;
  submitted = false;

  private datePipe = new DatePipe('en-US');

  constructor(
    private _storageService: StorageService,
    private _location: Location,
    private _reportService: ReportService,
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _adminService: AdminService
  ) {
    this.graphHeading = this._storageService.getSessionData('graphHeading') || '';
    console.log(this.graphHeading);
    this.pageHeading = this._storageService.getSessionData('pageHeading') || '';
    this.duration = this._storageService.getSessionData('duration') || 'Last24Hours';
  }

  // =========================
  // 🔹 INIT
  // =========================
  ngOnInit(): void {
    this.loadLocations();
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Rows per page';
    this.dataSource.paginator = this.paginator;
  }

  // =========================
  // 🔹 API CALL
  // =========================
  private loadData(): void {
    const payload = this.buildPayload();
    console.log(payload);
    this._reportService.InvalidOcppCommandData(payload).subscribe({
      next: (res) => this.handleResponse(res),
      error: () => this._toastr.error('Failed to load data')
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

  private handleResponse(res: any): void {
    const data: ReportItem[] = Array.isArray(res?.data) ? res.data : [];
    this.dataSource.data = data;
    this.totalCount = data.length;
    this.isTableEmpty = !data.length;
  }

  // =========================
  // 🔹 FILTER
  // =========================
filter(): void {
  this.submitted = true;

  if (this.searchFilter.invalid) {
    this._toastr.error('Please fill mandatory fields.');
    return;
  }

  this.currentPage = 1; // ✅ reset page on new search
  this.loadData();
}

  resetFilter(): void {
    this.searchFilter.reset();
    this.selectedLocationIds = [];
    this.submitted = false;
    this.loadData();
  }

  // =========================
  // 🔹 LOCATION
  // =========================
  private loadLocations(): void {
    this._adminService.GetLocationName().subscribe(res => {
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

  // =========================
  // 🔹 EXPORT CSV
  // =========================
  downloadAsCSV(): void {
    const payload = this.buildPayload();

    this._reportService.InvalidOcppCommandData(payload).subscribe(res => {
      const data: ReportItem[] = res?.data;

      if (!data?.length) {
        this._toastr.warning('No data to export');
        return;
      }

      const formatted = data.map((x) => ({
        'DEVICE ID': x.deviceId,
        'REQUEST ID': x.requestId || '-',
        'TIME': this.formatDate(x.createdOn),
        'STATUS': this.getStatus(x.responsePayload),
        'ERROR': x.errorCode || '-',
        'RESPONSE': x.responsePayload
      }));

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
    fs.saveAs(blob, 'InvalidBootNotification_Report.csv');
  }

  // =========================
  // 🔹 STATUS HELPER
  // =========================
  getStatus(payload: string): string {
    if (!payload) return 'Unknown';

    if (payload.includes('Rejected')) return 'Rejected';
    if (payload.includes('Invalid')) return 'Invalid';
    if (payload.includes('NotSupported')) return 'NotSupported';

    return 'Unknown';
  }

   checkValidFrom(event: any) {
    let fromDate = this.searchFilter.value.fromDate
    if (!fromDate) {
      this._toastr.error('Please select valid start date first.')
      this.searchFilter.patchValue({ toDate: '' })
      return
    }
  } 
  checkStartDate() {}
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


  // =========================
  // 🔹 NAVIGATION
  // =========================
  goback(): void {
    this._location.back();
  }
}