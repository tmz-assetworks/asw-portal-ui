import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { StorageService } from 'src/app/service/storage.service'
import { ReportService } from '../reports.service'
import { NgxEchartsModule } from 'ngx-echarts'
import { LineChartComponent } from 'src/app/component/dashboard/line-chart/line-chart.component'
import { BarChartComponent } from 'src/app/component/dashboard/bar-chart/bar-chart.component'

@Component({
  selector: 'app-report-transaction',
  templateUrl: './report-transaction.component.html',
  styleUrls: ['./report-transaction.component.scss'],
  imports:[NgxEchartsModule,RouterModule,LineChartComponent,BarChartComponent]
})
export class ReportTransactionComponent implements OnInit {
  filterToggle = new FormControl('1')
  // basic = 'basic'
  // basicStatus = 'basicStatus'
  // bar = 'chargerBar'
  // barChargers = 'reportTransactionYearly'
  // lineChargers = 'reportTransaction'
  // lineChargersTitle = 'reportTransaction'

  barChargersTitle = 'Transaction Amount'
  UserId: string | null
  reportTransactionMonthlyData = ''
  reportTransactionYearlyData = ''

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _reportService: ReportService,
    private _storageService: StorageService,
  ) {
    this.UserId = this._storageService.getLocalData('user_id')
  }

  ngOnInit(): void {
    this.getReportTransaction(this.UserId, [], '1')
  }
  setTime(event: any) {}

  openReportDetailPage(
    event: any,
    graphHeading: string,
    pageHeading: string,
    duration: any,
  ) {
    sessionStorage.setItem('graphHeading', graphHeading)
    sessionStorage.setItem('pageHeading', pageHeading)
    sessionStorage.setItem('duration', duration)
    this._router.navigate(['report-detail'], {
      relativeTo: this._route,
      queryParams: { id: event },
    })
  }

  /**
   * Get Report Transaction
   * @param userId
   * @param locationId
   * @param duration
   */

  getReportTransaction(userId: any, locationId: any, duration: any) {
    const pBbody = {
      operatorId: userId,
      locationId: locationId,
      duration: duration,
    }
    this._reportService.GetTransaction(pBbody).subscribe((res: any) => {
      if (res.data) {
        this.reportTransactionMonthlyData = res.data[0].monthlydata
        this.reportTransactionYearlyData = res.data[0].yearlydata
      }
    })
  }
}
