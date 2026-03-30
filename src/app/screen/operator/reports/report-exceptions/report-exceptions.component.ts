import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { ReportService } from '../reports.service';
import { StorageService } from 'src/app/service/storage.service';
import { AreaChartComponent } from 'src/app/component/dashboard/area-chart/area-chart.component';
import { LineChartComponent } from 'src/app/component/dashboard/line-chart/line-chart.component';
import { BarChartComponent } from 'src/app/component/dashboard/bar-chart/bar-chart.component';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module';

type DurationType = 'Last24Hours' | 'Last7Days' | 'Last30Days' | string;

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

  readonly filterToggle = new FormControl<string>('1', { nonNullable: true });

  basePath: string;
  role: string;
  selectedDuration: DurationType = 'Last24Hours';
  userId: string;

  reportUpcomingSessionData = '';
  reportInvalidBootNotification: unknown[] = [];
  reportInvalidSessionData: unknown[] = [];
  report24AlertChartData: unknown[] = [];

  constructor(
    private readonly router: Router,
    private readonly reportService: ReportService,
    private readonly storageService: StorageService,
  ) {
    this.userId = this.storageService.getLocalData('user_id') ?? '';
    this.role = this.storageService.getLocalData('role') ?? '';
    this.basePath =
      this.role === 'Admin'
        ? '/admin/reports/detail'
        : '/operator/reports/detail';
  }

  ngOnInit(): void {
    this.clearStoredDuration();
    this.loadAllReports();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setTime(event: { value: DurationType }): void {
    if (!event?.value) {
      return;
    }

    this.selectedDuration = event.value;
    this.loadAllReports();
    this.get24HoursChartData(this.selectedDuration);
  }

  openDetailPage(
    eventId: string | number,
    graphHeading: string,
    pageHeading: string,
    duration: DurationType,
  ): void {
    sessionStorage.setItem('graphHeading', graphHeading);
    sessionStorage.setItem('pageHeading', pageHeading);
    sessionStorage.setItem('duration', duration);

    this.router.navigate(['/operator/reports/report-exception-details'], {
      queryParams: { id: eventId },
    });
  }

  private loadAllReports(): void {
    this.getUpcomingSession(this.userId);
    this.getInvalidBootNotification(this.selectedDuration);
    this.getInvalidSession(this.selectedDuration);
  }

  private clearStoredDuration(): void {
    const duration = this.storageService.getSessionData('duration');
    if (duration) {
      this.storageService.removeSessionData('duration');
    }
  }

  private getUpcomingSession(operatorId: string): void {
    const requestBody = {
      locationIds: [] as number[],
      operatorId,
    };

    this.reportService
      .GetUpComingSession(requestBody)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: ApiResponse<string>) => {
        this.reportUpcomingSessionData = response?.data ?? '';
      });
  }

  private getInvalidBootNotification(duration: DurationType): void {
    const requestBody = { Duration: duration };

    this.reportService
      .GetInvalidRequestsChartData(requestBody)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: ApiResponse<unknown[]>) => {
        this.reportInvalidBootNotification = Array.isArray(response?.data)
          ? response.data
          : [];
      });
  }

  private getInvalidSession(duration: DurationType): void {
    const requestBody = { duration };

    this.reportService
      .InvalidSessionChartData(requestBody)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: ApiResponse<unknown[]>) => {
        this.reportInvalidSessionData = response?.data ?? [];
      });
  }

  private get24HoursChartData(duration: DurationType): void {
    const requestBody = { duration };

    this.reportService
      .GetLast24HoursAlertData(requestBody)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: ApiResponse<unknown[]>) => {
        this.report24AlertChartData = response?.data ?? [];
      });
  }
}
