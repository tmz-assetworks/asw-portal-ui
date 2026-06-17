import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ReportService } from '../reports.service';
import { StorageService } from 'src/app/service/storage.service';
import { BarChartComponent } from 'src/app/component/dashboard/bar-chart/bar-chart.component';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module';

type DurationType = | 'Last24Hours' | 'Last7Days' | 'Last30Days' | 'Last90Days';

interface ApiResponse<T> {
  data: T;
  startDate?: any;
  endDate?: any;
}
@Component({
  selector: 'app-report-exceptions',
  templateUrl: './report-exceptions.component.html',
  styleUrls: ['./report-exceptions.component.scss'],
  standalone: true,
  imports: [
    BarChartComponent,
    RouterModule,
    ReactiveFormsModule,
    SharedMaterialModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportExceptionsComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  readonly filterToggle = new FormControl<DurationType>('Last90Days', { nonNullable: true });

  basePath: string;
  role: string;
  selectedDuration: DurationType = 'Last90Days';
  userId: string;
  startDate?: any;
  endDate?:any;
  reportUpcomingSessionData = '';
  reportInvalidBootNotification: unknown[] = [];
  reportInvalidSessionData: unknown[] = [];
  report24AlertChartData: unknown[] = [];
  reportZeroCostTransactionsData: unknown[] = [];

  constructor(
    private readonly router: Router,
    private readonly reportService: ReportService,
    private readonly storageService: StorageService,
    private readonly cdr: ChangeDetectorRef, // <-- needed for OnPush
  ) {
    this.userId = this.storageService.getLocalData('user_id') ?? '';
    this.role = this.storageService.getLocalData('role') ?? '';
    this.basePath = this.role === 'Admin'
      ? '/admin/reports/detail'
      : '/operator/reports/detail';
  }

  ngOnInit(): void {
    this.clearStoredDuration();

    // Subscribe to toggle changes
    this.filterToggle.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((duration: DurationType) => {
        this.selectedDuration = duration;
        this.loadAllReports(duration);
        this.get24HoursChartData(duration);
      });

    // Trigger initial load for default tab
    this.selectedDuration = this.filterToggle.value;
    this.loadAllReports(this.selectedDuration);
    this.get24HoursChartData(this.selectedDuration);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openDetailPage(eventId: string | number, graphHeading: string, pageHeading: string, duration: DurationType): void {
    sessionStorage.setItem('graphHeading', graphHeading);
    sessionStorage.setItem('pageHeading', pageHeading);
    sessionStorage.setItem('duration', duration);
    console.log("test")
    this.router.navigate(['/operator/reports/report-exception-details'], { queryParams: { id: eventId } });
  }

  private loadAllReports(duration: DurationType): void {
    this.getUpcomingSession(this.userId);
    this.getInvalidBootNotification(duration);
    this.getInvalidSession(duration);
    this.getZeroCostTransactions(duration);
  }

  private clearStoredDuration(): void {
    const duration = this.storageService.getSessionData('duration');
    if (duration) this.storageService.removeSessionData('duration');
  }

  private getUpcomingSession(operatorId: string): void {
    const requestBody = { locationIds: [] as number[], operatorId };

    this.reportService.GetUpComingSession(requestBody)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: ApiResponse<string>) => {
        this.reportUpcomingSessionData = response?.data ?? '';
        this.cdr.markForCheck(); // <-- ensure OnPush detects change
      });
  }

private getInvalidBootNotification(duration: DurationType): void {

    const requestBody = {
    Duration: duration
  };
  this.reportService
    .GetInvalidRequestsChartData(requestBody)
    .pipe(takeUntil(this.destroy$))
    .subscribe(({ data = [], startDate, endDate }: ApiResponse<unknown[]>) => {
      if (startDate) {
        sessionStorage.setItem('StartDate', startDate);
      }
      if (endDate) {
        sessionStorage.setItem('EndDate', endDate);
      }
      this.reportInvalidBootNotification = Array.isArray(data) ? [...data] : [];
      this.cdr.markForCheck();
    });
}

  private getInvalidSession(duration: DurationType): void {
    const requestBody = { duration };

    this.reportService.InvalidSessionChartData(requestBody)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: ApiResponse<unknown[]>) => {
        this.reportInvalidSessionData = [...(response?.data ?? [])];
        this.cdr.markForCheck();
      });
  }

  private get24HoursChartData(duration: DurationType): void {
    const requestBody = { duration };

    this.reportService.GetCommandAlerts(requestBody)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: ApiResponse<unknown[]>) => {
        this.report24AlertChartData = [...(response?.data ?? [])];
        this.cdr.markForCheck();
      });
  }

  private getZeroCostTransactions(duration: DurationType): void {

    console.log('rgrgerger');
  const requestBody = {
    duration: duration
  };

  this.reportService
    .GetZeroCostTransactionsChartData(requestBody)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response: ApiResponse<unknown[]>) => {

      this.reportZeroCostTransactionsData =
        [...(response?.data ?? [])];

      this.cdr.markForCheck();
    });
}



  refreshDuration(duration: DurationType): void {
    this.selectedDuration = duration;
    this.loadAllReports(duration);
    this.get24HoursChartData(duration);
    this.filterToggle.setValue(duration, { emitEvent: false });
  }
}