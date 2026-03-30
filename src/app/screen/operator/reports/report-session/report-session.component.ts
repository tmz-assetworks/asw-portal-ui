import { Component, OnInit, ViewChild } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'

import { AuthService } from 'src/app/service/auth/auth.service'
import { StorageService } from 'src/app/service/storage.service'
import { ReportService } from '../reports.service'
import { LineChartComponent } from 'src/app/component/dashboard/line-chart/line-chart.component'
import { BarChartComponent } from 'src/app/component/dashboard/bar-chart/bar-chart.component'
import { AreaChartComponent } from 'src/app/component/dashboard/area-chart/area-chart.component'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'

@Component({
  selector: 'app-report-session',
  templateUrl: './report-session.component.html',
  styleUrls: ['./report-session.component.scss'],
  imports:[AreaChartComponent,BarChartComponent,LineChartComponent,RouterModule,ReactiveFormsModule,SharedMaterialModule]
})
export class ReportSessionComponent implements OnInit {
  basePath: string | null
  role: string | null
  filterToggle = new FormControl('1')
  selectedDuration: string = '1'
  reportUpcomingSessionData = ''
  UserId: string | null
  reportSessionLengthData = ''
  reportSessionData = ''

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,

    private __reportService: ReportService,
    private _storageService: StorageService,
  ) {
    this.UserId = this._storageService.getLocalData('user_id')
    this.role = this._storageService.getLocalData('role')
    this.basePath =
    this.role == 'Admin'
      ? '/admin/reports/detail'
      : '/operator/reports/detail';
  }

  ngOnInit(): void {
    let isDuration = this._storageService.getSessionData('duration')
    if (isDuration) {
      this._storageService.removeSessionData('duration')
    }
    this.GetUpComingSession(this.UserId, '', this.selectedDuration)
    this.GetChargingSessionlength(this.UserId, '', this.selectedDuration)
    this.GetChargingSessionData(this.UserId, '', this.selectedDuration)
  }

  /**
   *
   * @param event
   *
   * Select Duration
   */
  setTime(event: any) {
    if (event.value) {
      this.selectedDuration = event.value
      this.GetUpComingSession(this.UserId, '', this.selectedDuration)
      this.GetChargingSessionlength(this.UserId, '', this.selectedDuration)
      this.GetChargingSessionData(this.UserId, '', this.selectedDuration)
    }
  }

  /**
   *
   * @param operatorId
   * @param locationId
   * @param duration
   *
   * Get upcoming session
   */
  GetUpComingSession(operatorId: any, locationId: any, duration: any) {
    const pBody = {
      locationIds: [] as number[],
      operatorId: operatorId,
      // duration: duration,
    }

    this.__reportService.GetUpComingSession(pBody).subscribe((res) => {
      if (res.data) {
        console.log(res.data);
        this.reportUpcomingSessionData = res.data
      }
    })
  }
  /**
   *
   * @param operatorId
   * @param locationId
   * @param duration
   *
   * Get Charging Session Length
   */
  GetChargingSessionlength(operatorId: any, locationId: any, duration: any) {
    const pBody = {
      locationIds: [] as number[],
      chargerBoxId: '',
      duration: duration,
      operatorId: operatorId,
    }
    
    this.__reportService.ChargingSessionlength(pBody).subscribe((res) => {
      if (res.data) {
        this.reportSessionLengthData = res.data
      }
    })
  }

  /**
   * Get Charging Session Data
   * @param operatorId
   * @param locationId
   * @param duration
   */

  GetChargingSessionData(operatorId: any, locationId: any, duration: any) {
    const pBody = {
      locationIds: [] as number[],
      chargerBoxId: '',
      duration: duration,
      operatorId: operatorId,
    }

    this.__reportService.ChargingSession(pBody).subscribe((res) => {
      if (res.data) {
        this.reportSessionData = res.data
      }
    })
  }

  openDetailPage(
    event: any,
    graphHeading: string,
    pageHeading: string,
    duration: any,
  ) {
    sessionStorage.setItem('graphHeading', graphHeading)
    sessionStorage.setItem('pageHeading', pageHeading)
    sessionStorage.setItem('duration', duration)
    
    this._router.navigate([this.basePath], {
      queryParams: { id: event },
    })
  }
}
