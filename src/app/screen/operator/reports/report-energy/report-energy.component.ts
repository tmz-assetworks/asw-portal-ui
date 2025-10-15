import { Component, OnInit } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { ActivatedRoute } from '@angular/router'
import { StorageService } from 'src/app/service/storage.service'
import { ReportService } from '../reports.service'
import { LineChartComponent } from 'src/app/component/dashboard/line-chart/line-chart.component'
import { AreaChartComponent } from 'src/app/component/dashboard/area-chart/area-chart.component'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'

@Component({
  selector: 'app-report-energy',
  templateUrl: './report-energy.component.html',
  styleUrls: ['./report-energy.component.scss'],
  imports:[LineChartComponent,AreaChartComponent,ReactiveFormsModule,SharedMaterialModule,RouterModule]
})
export class ReportEnergyComponent implements OnInit {
  reportEnergyUsedData = ''
  reportEnergyMilesAddedData = ''
  reportEnegyMTCo2SavedData = ''
  reportEnergyGasolineGallonData = ''
  UserId: any
  selectedDuration = '1'
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _storageService: StorageService,
    private _reportService: ReportService,
  ) {
    this.UserId = this._storageService.getLocalData('user_id')
  }

  filterToggle = new FormControl('1')
  ngOnInit(): void {
    let isDuration = this._storageService.getSessionData('duration')
    if (isDuration) {
      this._storageService.removeSessionData('duration')
    }
    this.getEnergyUsed(this.UserId, this.selectedDuration)
    this.GetMilesAddedByLocation(this.UserId, this.selectedDuration)
    this.GetMTCoSavedEnergy(this.UserId, this.selectedDuration)
    this.Getgasolinegallon(this.UserId, this.selectedDuration)
  }
  setTime(event: any) {
    if (event.value) {
      this.selectedDuration = event.value
      this.getEnergyUsed(this.UserId, this.selectedDuration)
      this.GetMilesAddedByLocation(this.UserId, this.selectedDuration)
      this.GetMTCoSavedEnergy(this.UserId, this.selectedDuration)
      this.Getgasolinegallon(this.UserId, this.selectedDuration)
    }
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

    this._router.navigate(['detail'], {
      relativeTo: this._route,
      queryParams: { id: event },
    })
  }

  /**
   * Get Energy Used Chart Data
   * @param operatorId
   * @param duration
   */

  getEnergyUsed(operatorId: string, duration: any) {
    const pBody = {
      locationIds: [] as number[],
      chargerBoxId: '',
      duration: duration,
      operatorId: operatorId,
    }
    this._reportService.GetEnergyUsed(pBody).subscribe((res) => {
      if (res.data) {
        this.reportEnergyUsedData = res.data
      }
    })
  }

  /**
   * GEt MT CO2 Saved
   * @param operatorId
   * @param duration
   */

  GetMTCoSavedEnergy(operatorId: string, duration: any) {
    const body = {
      duration: duration,
      operatorId: operatorId,
      locationIds: [] as number[],
    }

    this._reportService.GetMTCoSavedEnergy(body).subscribe((res) => {
      if (res.data) {
        this.reportEnegyMTCo2SavedData = res.data
      }
    })
  }
  /**
   * Get Miles Added
   * @param operatorId
   * @param duration
   */
  GetMilesAddedByLocation(operatorId: string, duration: any) {
    const pBody = {
      locationIds: [] as number[],
      duration: duration,
      chargerBoxId: '',
      opratorid: operatorId,
    }

    this._reportService.GetMilesAddedByLocation(pBody).subscribe((res) => {
      if (res.data) {
        this.reportEnergyMilesAddedData = res.data
      }
    })
  }
  /**
   * Get Gasoline Gallon
   * @param operatorId
   * @param duration
   */
  Getgasolinegallon(operatorId: string, duration: any) {
    const pBody = {
      locationIds:[] as number[],
      chargerBoxId: '',
      duration: duration,
      operatorId: operatorId,
    }

    this._reportService.Getgasolinegallon(pBody).subscribe((res) => {
      if (res.data) {
        this.reportEnergyGasolineGallonData = res.data
      }
    })
  }
}
