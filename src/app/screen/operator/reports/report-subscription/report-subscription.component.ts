import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { StorageService } from 'src/app/service/storage.service'
import { ReportService } from '../reports.service'

@Component({
  selector: 'app-report-subscription',
  templateUrl: './report-subscription.component.html',
  styleUrls: ['./report-subscription.component.scss'],
})
export class ReportSubscriptionComponent implements OnInit {
  filterToggle = new FormControl('1')
  UserId: string | null
  selectedDuration: number = 1
  reportSubscribeMonthlyData = ''
  reportSubscribeYearlyData = ''
  reportSubscribeTypeData = ''

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _reportService: ReportService,
    private _storageService: StorageService,
  ) {
    this.UserId = this._storageService.getLocalData('user_id')
  }

  ngOnInit(): void {
    this.getSubscriptions(this.UserId, [], 1)
  }

  setTime(event: any) {
    if (event.value) {
      this.selectedDuration = event.value
      this.getSubscriptions(this.UserId, [], this.selectedDuration)
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
    this._router.navigate(['report-detail'], {
      relativeTo: this._route,
      queryParams: { id: event },
    })
  }

  /**
   * Get Subscription
   * @param data
   */
  getSubscriptions(operatorId: any, locationId: any, duration: any) {
    const pBbody = {
      operatorId: this.UserId,
      locationId: locationId,
      duration: '',
    }
    this._reportService.Subscription(pBbody).subscribe((res) => {
      if (res.data) {
        this.reportSubscribeMonthlyData = res.data[0].monthlydata
        this.reportSubscribeYearlyData = res.data[0].yearlydata
        this.reportSubscribeTypeData = res.data[0].datatype
      }
    })
  }
}
