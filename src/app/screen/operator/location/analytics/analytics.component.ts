import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'

import { LocationService } from '../location.service'
import { DashboardService } from '../../dashboard/dashboard.service'
import { StorageService } from 'src/app/service/storage.service'
import { ActivatedRoute, Router } from '@angular/router'
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
})
export class AnalyticsComponent implements OnInit {
  isAnalytics = true
  filterToggle = new FormControl('1')
  selectedTime: number = 1
  UserId: any
  selecteLocationIds: any
  energyAnalyticsUsedData = ''
  chargersChartData = ''
  chargingSessionData = ''
  locationAnalyticsMilesAddData = ''
  summaryData: any
  locationName: string | null

  constructor(
    private _locationService: LocationService,
    private _dashboardService: DashboardService,
    private _storageService: StorageService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
    this.UserId = this._storageService.getLocalData('user_id')
    this.selecteLocationIds = this._storageService.getSessionData('locationId')

    this.locationName = this._storageService.getSessionData('locationName')
  }

  ngOnInit(): void {
    this.GetSummaryDataByLocationId(this.selecteLocationIds)
    this.getEnergyUsedByLocationId(
      this.selecteLocationIds,
      this.selectedTime,
      this.UserId,
    )
    this.getChargerGraph(
      this.selecteLocationIds,
      this.selectedTime,
      this.UserId,
    )
    this.getChargingSessionChartData(
      this.selecteLocationIds,
      this.selectedTime,
      this.UserId,
    )

    this.GetLocationMilesAddedChartdata(
      this.selecteLocationIds,
      this.selectedTime,
      this.UserId,
    )
    let isDuration = this._storageService.getSessionData('duration')

    if (isDuration) {
      this._storageService.removeSessionData('duration')
      this._storageService.removeSessionData('graphHeading')
      this._storageService.removeSessionData('pageHeading')
    }
  }

  locations = '../../../assets/widget-icon/location.png'
  chargers = '../../../assets/widget-icon/chargers.png'
  charging_session = '../../../assets/widget-icon/charging-sessions.png'
  errors = '../../../assets/widget-icon/erorrs.png'

  basic = 'basic'
  line = 'lineAnalytics'
  lineTitle = 'Energy Used'

  basicTitle = 'Locations Performing '

  // summaryData = [
  //   /* {
  //     Type: 'Locations',
  //     Count: 50,
  //     StatusData: [
  //       {
  //         Key: 'Commissioned',
  //         value: 20,
  //       },
  //       {
  //         Key: 'UnderMaintenance',
  //         value: 25,
  //       },
  //       {
  //         Key: 'Upcoming',
  //         value: 5,
  //       },
  //     ],
  //   }, */
  //   {
  //     type: 'Chargers',
  //     count: 26,
  //     statusData: [
  //       {
  //         key: 'Available',
  //         value: 10,
  //         color: '#90993F',
  //       },
  //       {
  //         key: 'Connected',
  //         value: 6,
  //         color: '#E97300',
  //       },
  //       {
  //         key: 'Offline',
  //         value: 10,
  //         color: '#757575',
  //       },
  //     ],
  //   },
  //   {
  //     type: 'Charging Sessions',
  //     count: 35,
  //     statusData: [
  //       {
  //         key: 'Cancelled',
  //         value: 15,
  //         color: '#EA002A',
  //       },
  //       {
  //         key: 'Interrupted',
  //         value: 15,
  //         color: '#E97300',
  //       },
  //       {
  //         key: 'Completed',
  //         value: 5,
  //         color: '#90993F',
  //       },
  //     ],
  //   },
  //   {
  //     type: 'Alerts',
  //     count: 10,
  //     statusData: [
  //       {
  //         key: 'Critical',
  //         value: 5,
  //         color: '#E97300',
  //       },
  //       {
  //         key: 'High',
  //         value: 3,
  //         color: '#EA002A',
  //       },
  //       {
  //         key: 'Medium',
  //         value: 2,
  //         color: '#0062A6',
  //       },
  //     ],
  //   },
  // ]

  /**
   * Get summary data by location id
   */

  GetSummaryDataByLocationId(locationId: any) {
    this._locationService
      .GetSummaryStatuByLocationId(locationId)
      .subscribe((res) => {
        this.summaryData = res.data
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

    this._router.navigate(['detail'], {
      relativeTo: this._route,
      queryParams: { id: event },
    })
  }
  /**
   * Set time to show
   */

  setTime(event: any) {
    if (event.value) {
      this.selectedTime = event.value
      this.getEnergyUsedByLocationId(
        this.selecteLocationIds,
        this.selectedTime,
        this.UserId,
      )

      this.getChargerGraph(
        this.selecteLocationIds,
        this.selectedTime,
        this.UserId,
      )
      this.getChargingSessionChartData(
        this.selecteLocationIds,
        this.selectedTime,
        this.UserId,
      )
      this.GetLocationMilesAddedChartdata(
        this.selecteLocationIds,
        this.selectedTime,
        this.UserId,
      )
    }
  }

  /**
   *
   * @param locationIds
   * @param duration
   * @param operatorId
   *
   * Get Energy Used data
   */

  getEnergyUsedByLocationId(locationIds: any, duration: any, operatorId: any) {
    const body = {
      locationIds: locationIds ? [locationIds] : [],
      duration: duration.toString(),
      opratorid: operatorId,
    }

    this._dashboardService.GetEnergyUsedByLocationID(body).subscribe((res) => {
      this.energyAnalyticsUsedData = res.data
    })
  }

  /**
   * Get Charger Graph
   */

  getChargerGraph(locationIds: any, duration: any, operatorId: any) {
    const body = {
      //locationIds: [locationIds],
      locationIds: locationIds ? [locationIds] : [],
      duration: duration.toString(),
      opratorid: operatorId,
    }
    this._locationService.getChargerChartData(body).subscribe({
      next: (response) => {
        this.chargersChartData = response.data
      },
      error: (_err) => {
        console.log('no response for chargers graph')
      },
    })
  }
  /**
   *
   * @param locationIds
   * @param duration
   * @param operatorId
   *
   * Get charging session data
   */
  getChargingSessionChartData(
    locationIds: any,
    duration: any,
    operatorId: any,
  ) {
    const body = {
      locationIds: locationIds ? [locationIds] : [],
      duration: duration.toString(),
      opratorid: operatorId,
    }
    this._dashboardService.GetAreachartdataData(body).subscribe((res) => {
      this.chargingSessionData = res.data
    })
  }

  /**
   *
   *
   *
   * Get Location Analytics Miles Added chart data
   */

  GetLocationMilesAddedChartdata(
    locationIds: any,
    duration: any,
    operatorId: any,
  ) {
    const body = {
      locationIds: locationIds ? [locationIds] : [],
      duration: duration.toString(),
      opratorid: operatorId,
    }
    this._locationService
      .GetLocationMilesAddedChartdata(body)
      .subscribe((res) => {
        this.locationAnalyticsMilesAddData = res.data
      })
  }
}
