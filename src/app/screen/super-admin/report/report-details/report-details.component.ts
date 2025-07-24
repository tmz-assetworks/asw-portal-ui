import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { StorageService } from 'src/app/service/storage.service';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';

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

type ReportDisplayType = 'payment Report' | 'Available Charger Count';
type ApiEndpointKey = 'payment' | 'charger';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.scss']
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
    { label: 'Current month', value: 1 },
    { label: 'Last 3 months', value: 3 },
    { label: 'Last 6 months', value: 6 },
    { label: 'Last 12 months', value: 12 }
  ];

  reportType: ReportDisplayType = 'payment Report';

  private readonly reportTypeMap: Record<ReportDisplayType, ApiEndpointKey> = {
    'payment Report': 'payment',
    'Available Charger Count': 'charger'
  };

  apiEndpoints = {
    payment: `${environment.REPORT_API_URL}v1/Reports/GetPaymentReportMonthWise`,
    charger: `${environment.REPORT_API_URL}v1/Reports/GetAvialableChargerCountMonthWise`
  };

  constructor(
    private _location: Location,
    private http: HttpClient,
    private _storageService: StorageService,
    private dialog: MatDialog
  ) {
    this.graphHeading = this._storageService.getSessionData('graphHeading');
    this.pageHeading = this._storageService.getSessionData('pageHeading');
    this.duration = this._storageService.getSessionData('duration');
     // Initialize durationFilter from session storage if available
    const storedDuration = this._storageService.getSessionData('duration');
    if (storedDuration && [1, 3, 6, 12].includes(Number(storedDuration))) {
      this.durationFilter = Number(storedDuration);
    }

  }

  ngOnInit(): void {
    const storedReportType = this._storageService.getSessionData('graphHeading');
    this.reportType = (storedReportType === 'payment Report' || storedReportType === 'Available Charger Count')
      ? storedReportType
      : 'payment Report';

    this.setupColumns();
    this.loadData();
  }

  ngOnDestroy(): void {
    sessionStorage.clear();
  }

  setupColumns(): void {
    this.displayedColumns = ['month'];
    if (this.reportType === 'payment Report') {
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

      if (this.reportType === 'payment Report') {
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
    // Save the selected duration to session storage
    this._storageService.setSessionData('duration', this.durationFilter.toString());
    this.loadData();
  }

  // Update the template binding for the duration filter to use durationOptions.label
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

    if (this.reportType === 'payment Report') {
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
    const headers = ['Month', 'AC ' + (this.reportType === 'payment Report' ? 'Amount' : 'Count'),
      'DC ' + (this.reportType === 'payment Report' ? 'Amount' : 'Count')].join(',');

    const rows = this.processedData.map(item => {
      return [
        item.month,
        this.reportType === 'payment Report' ? this.formatValue(item.acCollection) : item.acCount,
        this.reportType === 'payment Report' ? this.formatValue(item.dcCollection) : item.dcCount
      ].join(',');
    }).join('\n');

    csvContent += headers + '\n' + rows;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${this.reportType.replace(' ', '_')}_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  formatValue(value: any): string {
    return this.reportType === 'payment Report' ? parseFloat(value).toFixed(2) : value;
  }

  onChargerTypeChange(): void {
    this.loadData();
  }

  

  toggleReportType(type: ReportDisplayType): void {
    this.reportType = type;
    this.setupColumns();
    this.loadData();
  }
}
