import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { StorageService } from 'src/app/service/storage.service';
import { environment } from 'src/environments/environment';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';


interface ReportData {
  chargerType: string;
  month: string;
  totalCollection?: string;
  
  avialableChargerCount?: number;
}

interface ProcessedReportData {
  month: string;
  acCount?: number;
  dcCount?: number;
  acCollection?: string;
  dcCollection?: string;
  [key: string]: any;
}

type ReportDisplayType = 'billing Report' | 'Charger Count Information';
type ApiEndpointKey = 'payment' | 'charger';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.scss'],
  imports:[
    CommonModule,
    SharedMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatTimepickerModule

  ]
})
export class ReportDetailComponent implements OnInit {
  displayedColumns: string[] = [];
  graphHeading: any;
  pageHeading: any;
  duration: any;
  isLoading = false;

  apiData: any = {};
  processedData: ProcessedReportData[] = [];
  visibleData: ProcessedReportData[] = [];

  pageSize = 10;
  currentPage = 0;

  chargerTypeFilter: string = 'ALL';
  durationFilter: number = 1; 
  customStartDate?: Date;
  customEndDate?: Date;

  chargerTypeOptions = ['ALL', 'AC', 'DC'];
 durationOptions = [
    {label : 'All',value:0},
    { label: '1 Year', value: 12 },
    { label: '2 Years', value: 24 },
    { label: '3 Years', value: 36 },
   //  { label: 'Last 12 months', value: 12 }
  ];

  reportType: ReportDisplayType = 'billing Report';

  private readonly reportTypeMap: Record<ReportDisplayType, ApiEndpointKey> = {
    'billing Report': 'payment',
    'Charger Count Information': 'charger'
  };

  apiEndpoints = {
    payment: `${environment.REPORT_API_URL}v1/Reports/GetPaymentReportMonthWise`,
    charger: `${environment.REPORT_API_URL}v1/Reports/GetAvialableChargerCountMonthWise`
  };

  constructor(
       private readonly _location: Location,
       private readonly http: HttpClient,
       private readonly _storageService: StorageService
  ) {
    this.graphHeading = this._storageService.getSessionData('graphHeading');
    this.pageHeading = this._storageService.getSessionData('pageHeading');
    this.duration = this._storageService.getSessionData('duration');
    const storedDuration = this._storageService.getSessionData('duration');
    if (storedDuration && [0,12,24,36].includes(Number(storedDuration))) {
      this.durationFilter = Number(storedDuration);
    }

  }

  ngOnInit(): void {
    const storedReportType = this._storageService.getSessionData('graphHeading');
    this.reportType = (storedReportType === 'billing Report' || storedReportType === 'Charger Count Information')
      ? storedReportType
      : 'billing Report';

    this.setupColumns();
    this.loadData();
  }

  ngOnDestroy(): void {
    sessionStorage.clear();
  }

  setupColumns(): void {
    this.displayedColumns = ['month'];
    if (this.reportType === 'billing Report') {
      this.displayedColumns.push('acCollection', 'dcCollection');
    } else {
      this.displayedColumns.push('acCount', 'dcCount');
    }
  }

    getFilterParams(): any {
    return {
      chargerType: this.chargerTypeFilter === 'ALL' ? undefined : this.chargerTypeFilter,
      lastDurationMonth: this.durationFilter
    };
  }

  loadData(): void {
    this.isLoading = true;
    const endpointKey = this.reportTypeMap[this.reportType];
    const filterParams = this.getFilterParams();

    this.http.post<any>(this.apiEndpoints[endpointKey], filterParams).subscribe({
      next: (response) => {
        if (response.statusCode === 200) {
          this.apiData = response;
          this.processData();
        }
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  processData(): void {
    const monthGroups: { [key: string]: ProcessedReportData } = {};

    this.apiData?.data?.forEach((item: any) => {
      if (!monthGroups[item.month]) {
        monthGroups[item.month] = { month: item.month };
      }

      if (this.reportType === 'billing Report') {
        monthGroups[item.month][item.chargerType.toLowerCase() + 'Collection'] = item.totalCollection;
      } else {
        monthGroups[item.month][item.chargerType.toLowerCase() + 'Count'] = item.avialableChargerCount;
      }
    });

    this.processedData = Object.values(monthGroups);
    this.currentPage = 1;
    this.visibleData = this.processedData.slice(0, this.pageSize);
  }


   onDurationChange(): void {
    this._storageService.setSessionData('duration', this.durationFilter.toString());
    this.loadData();
  }

  getDurationLabel(value: number): string {
    const option = this.durationOptions.find(opt => opt.value === value);
    return option ? option.label : '';
  }
  loadNextPage(): void {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;

    if (start >= this.processedData.length) return;

    this.visibleData = [...this.visibleData, ...this.processedData.slice(start, end)];
    this.currentPage++;
  }

  onScroll(event: any): void {
    const threshold = 100;
    const position = event.target.scrollTop + event.target.offsetHeight;
    const height = event.target.scrollHeight;

    if (position > height - threshold) {
      this.loadNextPage();
    }
  }

  getTotal(chargerType?: string): number {
    if (!this.apiData?.data) return 0;

    if (this.reportType === 'billing Report') {
      if (!chargerType) {
        return this.apiData.data.reduce((sum: number, item: any) => sum + (parseFloat(item.totalCollection) || 0), 0);
      }
      return this.apiData.data
        .filter((item: any) => item.chargerType === chargerType)
        .reduce((sum: number, item: any) => sum + (parseFloat(item.totalCollection) || 0), 0);
    } else {
      if (!chargerType) {
        return this.apiData.data.reduce((sum: number, item: any) => sum + (item.avialableChargerCount || 0), 0);
      }
      return this.apiData.data
        .filter((item: any) => item.chargerType === chargerType)
        .reduce((sum: number, item: any) => sum + (item.avialableChargerCount || 0), 0);
    }
  }

  goback(): void {
    this._location.back();
    sessionStorage.clear();
  }

downloadAsCSV(): void {
  let csvContent = "data:text/csv;charset=utf-8,";
  const headers = [
    'Month',
    'AC ' + (this.reportType === 'billing Report' ? 'Amount' : 'Count'),
    'DC ' + (this.reportType === 'billing Report' ? 'Amount' : 'Count')
  ].join(',');

  const rows = this.processedData.map(item => {
    return [
      item.month,
      this.reportType === 'billing Report' ? this.formatValue(item.acCollection) : item.acCount,
      this.reportType === 'billing Report' ? this.formatValue(item.dcCollection) : item.dcCount
    ].join(',');
  }).join('\n');

  csvContent += headers + '\n' + rows;

  // 🔁 Generate the filename conditionally
  let filename = this.reportType === 'billing Report'
    ? 'cost_information_report.csv'
    : `${this.reportType.replace(/ /g, '_').toLowerCase()}_report.csv`;

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


  formatValue(value: any): string {
    return this.reportType === 'billing Report' ? parseFloat(value).toFixed(2) : value;
  }

  onChargerTypeChange(): void {
    this.loadData();
  }

  

  toggleReportType(type: ReportDisplayType): void {
    this.reportType = type;
    this.setupColumns();
    this.loadData();
  }


  handleKeyDown(event: KeyboardEvent): void {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault(); 
    this.goback();
  }
}

handleExportKeydown(event: KeyboardEvent): void {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault(); 
    this.downloadAsCSV();
  }
}
}
