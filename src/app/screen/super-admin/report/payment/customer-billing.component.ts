

import { Component, OnInit } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { StorageService } from 'src/app/service/storage.service'
import { ReportService } from '../report.service'
import { DateRangeDialogComponent } from '../report-details/date-range-dialog.component'
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common'
import { BarChartComponent } from 'src/app/component/dashboard/bar-chart/bar-chart.component'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'
// import { ReportService } from '../reports.service'

@Component({
  selector: 'app-customer-billing',
  templateUrl: './customer-billing.component.html',
  styleUrls: ['./customer-billing.component.scss'],
  imports:[CommonModule,ReactiveFormsModule,BarChartComponent,RouterModule,SharedMaterialModule]
})
export class CustomerBillingComponent implements OnInit {
  filterToggle = new FormControl('12')
   selectedDuration: string = '12'
  reportPaymentDetailsData = ''

  barChargersTitle = 'Transaction Amount'
  UserId: string | null
  reportTransactionMonthlyData = ''
  reportTransactionYearlyData = ''

  constructor(
     private readonly _router: Router,
     private readonly _route: ActivatedRoute,
     private readonly reportService: ReportService,
     private readonly _storageService: StorageService,
      private readonly dialog: MatDialog
  ) {
    this.UserId = this._storageService.getLocalData('user_id')
  }

  ngOnInit(): void {
    this.getPaymentDetailsData(this.UserId, '', this.selectedDuration)
  }
  setTime(event: any) {
   if (event.value) {
      this.selectedDuration = event.value
      this.getPaymentDetailsData(this.UserId, '', this.selectedDuration)
    }
  }

  openReportDetailPage(
    event: any,
    graphHeading: string,
    pageHeading: string,
    duration: any,
  ) {
    sessionStorage.setItem('graphHeading', graphHeading)
    sessionStorage.setItem('pageHeading', pageHeading)
    sessionStorage.setItem('duration', duration)
    this._router.navigate(['detail'], {
      relativeTo: this._route,
      // queryParams: { id: event },
    })
  }

  /**
   * Get Report Transaction
   * @param userId
   * @param locationId
   * @param duration
   */

  getPaymentDetailsData(userId: any, locationId: any, duration: any) {
    const pBbody = {
      // operatorId: userId,
      // locationId: locationId,
      lastDurationMonth: duration,
    }
    this.reportService.getPaymentDetailsData(pBbody).subscribe((res: any) => {
      if (res.data) {
        this.reportPaymentDetailsData = res.data
      //   this.reportPaymentData = res.data[0].yearlydata
      }
    })
  }

  openDateRangeDialog(): void {
  const dialogRef = this.dialog.open(DateRangeDialogComponent, {
    width: '400px'
  });

  dialogRef.afterClosed().subscribe((result:any) => {
    if (result) {
      console.log('Selected date range:', result);
      this.selectedDuration=result?.months
      this.getPaymentDetailsData(this.UserId, '', this.selectedDuration);
      
    }
  });
}
}
