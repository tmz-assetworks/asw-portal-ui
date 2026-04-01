import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { ReportService } from '../reports.service';
import { StorageService } from 'src/app/service/storage.service';
import { AreaChartComponent } from 'src/app/component/dashboard/area-chart/area-chart.component';
import { LineChartComponent } from 'src/app/component/dashboard/line-chart/line-chart.component';
import { BarChartComponent } from 'src/app/component/dashboard/bar-chart/bar-chart.component';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module';

type DurationType = 'Last24Hours' | 'Last7Days' | 'Last30Days' | 'Last90Days' | string;

interface ApiResponse<T> {
  data: T;
}

@Component({
  selector: 'app-report-exceptions',
  templateUrl: './report-exceptions.component.html',
  styleUrls: ['./report-exceptions.component.scss'],
  standalone: true,
  imports: [
    AreaChartComponent,
    LineChartComponent,
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

  reportUpcomingSessionData = '';
  reportInvalidBootNotification: unknown[] = [];
  reportInvalidSessionData: unknown[] = [];
  report24AlertChartData: unknown[] = [];

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

    this.router.navigate(['/operator/reports/report-exception-details'], { queryParams: { id: eventId } });
  }

  private loadAllReports(duration: DurationType): void {
    this.getUpcomingSession(this.userId);
    this.getInvalidBootNotification(duration);
    this.getInvalidSession(duration);
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
    const requestBody = { Duration: duration };

    this.reportService.GetInvalidRequestsChartData(requestBody)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: ApiResponse<unknown[]>) => {
        console.log('API Response:', response); // full response
      console.log('Response Data:', response?.data); // only data array

        this.reportInvalidBootNotification = [...(Array.isArray(response?.data) ? response.data : [])];
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

  refreshDuration(duration: DurationType): void {
    this.selectedDuration = duration;
    this.loadAllReports(duration);
    this.get24HoursChartData(duration);
    this.filterToggle.setValue(duration, { emitEvent: false });
  }
}