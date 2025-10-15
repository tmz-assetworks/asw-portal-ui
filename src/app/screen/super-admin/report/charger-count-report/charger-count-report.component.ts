import { Component, OnInit } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { StorageService } from 'src/app/service/storage.service'
import { ReportService } from '../report.service'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'
import { BarChartComponent } from 'src/app/component/dashboard/bar-chart/bar-chart.component'

@Component({
  selector: 'app-charger-count-report',
  templateUrl: './charger-count-report.component.html',
  styleUrls: ['./charger-count-report.component.scss'],
  imports:[SharedMaterialModule,RouterModule,BarChartComponent,ReactiveFormsModule]
})
export class ChargerCountReportComponent implements OnInit {
  filterToggle = new FormControl('12')
  selectedDuration: number = 12
  reportUpcomingSessionData = ''
  UserId: string | null
  reportSessionLengthData = ''
  reportAvailableChargerCountData = ''

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,

    private reportService: ReportService,
    private _storageService: StorageService,
  ) {
    this.UserId = this._storageService.getLocalData('user_id')
  }

  ngOnInit(): void {
    let isDuration = this._storageService.getSessionData('duration')
    if (isDuration) {
      this._storageService.removeSessionData('duration')
    }
    this.getChargerAvailableCount(this.UserId, '', this.selectedDuration)
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
      this.getChargerAvailableCount(this.UserId, '', this.selectedDuration)
     
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
 
  /**
   *
   * @param operatorId
   * @param locationId
   * @param duration
   *
   * Get Charging Session Length
   */
  getChargerAvailableCount(operatorId: any, locationId: any, duration: any) {
    const pBody = {
      // locationIds: [],
      // chargerBoxId: '',
      lastDurationMonth: duration,
      // operatorId: operatorId,
    }
    this.reportService.getChargerAvailableCount(pBody).subscribe((res:any) => {
      if (res.data) { 
        this.reportAvailableChargerCountData = res.data
      }
    })
  }

  /**
   * Get Charging Session Data
   * @param operatorId
   * @param locationId
   * @param duration
   */

 

  openDetailPage(
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
}
