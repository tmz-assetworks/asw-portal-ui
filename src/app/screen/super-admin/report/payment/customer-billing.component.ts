

import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { StorageService } from 'src/app/service/storage.service'
import { ReportService } from '../report.service'
// import { ReportService } from '../reports.service'

@Component({
  selector: 'app-customer-billing',
  templateUrl: './customer-billing.component.html',
  styleUrls: ['./customer-billing.component.scss']
})
export class CustomerBillingComponent implements OnInit {
  filterToggle = new FormControl('1')
   selectedDuration: string = '1'
  // basic = 'basic'
  // basicStatus = 'basicStatus'
  // bar = 'chargerBar'
  // barChargers = 'reportTransactionYearly'
  // lineChargers = 'reportTransaction'
  // lineChargersTitle = 'reportTransaction'
  reportPaymentDetailsData = ''

  barChargersTitle = 'Transaction Amount'
  UserId: string | null
  reportTransactionMonthlyData = ''
  reportTransactionYearlyData = ''

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private reportService: ReportService,
    private _storageService: StorageService,
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
}
