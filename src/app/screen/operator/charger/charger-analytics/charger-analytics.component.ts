import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { EChartsOption } from 'echarts'
import { AuthService } from 'src/app/service/auth/auth.service'
import { StorageService } from 'src/app/service/storage.service'
import { DashboardService } from '../../dashboard/dashboard.service'
import { LocationService } from '../../location/location.service'

@Component({
  selector: 'app-charger-analytics',
  templateUrl: './charger-analytics.component.html',
  styleUrls: ['./charger-analytics.component.scss'],
})
export class ChargerAnalyticsComponent implements OnInit {
  isAnalytics = true
  analyticsArea = 'analyticsArea'
  chargingSessionData = ''
  filterToggle = new FormControl('1')
  selectedTime: number = 1
  UserId: any

  selecteLocationIds: any
  energyAnalyticsUsedData = ''
  energyAnalyticsUsedTitle = 'Energy Used'
  energyAnalyticsUsed = 'energyAnalyticsUsed'

  chargersChartData = ''

  locationAnalyticsMilesAdd = 'locationAnalyticsMilesAdd'
  locationAnalyticsMilesAddTitle = 'Miles Added'
  locationAnalyticsMilesAddData: any

  chargingSessionTitle = 'Charging Session'
  chargingSession = 'chargingSession'
  chargerName: string | null
  chargerboxid: any

  constructor(
    private _auth: AuthService,
    private _dashboardService: DashboardService,
    private _locationService: LocationService,
    private _storageService: StorageService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
    this.UserId = this._storageService.getLocalData('user_id')
    this.chargerboxid = this._storageService.getSessionData('chargerBoxId')

    this.chargerName = this._storageService.getSessionData('chargerName')

    // this.selecteLocationIds = this._storageService.getSessionData('locationId')

    //this.locationName = this._storageService.getSessionData('locationName')
  }

  option: EChartsOption = {
    // legend: {
    //   data: ['Total Revenue', 'Daily Revenue', 'Today Revenue'],
    // },
    // xAxis: {
    //   type: 'category',
    //   data: ['990.71', '412.14', '408.07'],
    // },

    // yAxis: {
    //   type: 'value',
    //   show: false,
    // },
    // series: [
    //   {
    //     data: [
    //       {
    //         name: 'Total Revenue',
    //         value: 200,
    //         itemStyle: {
    //           color: '#90993F',
    //         },
    //       },
    //       {
    //         name: 'Daily Revenue',
    //         value: 150,
    //         itemStyle: {
    //           color: '#E97300',
    //         },
    //       },
    //       {
    //         name: 'Today Revenue',
    //         value: 100,
    //         itemStyle: {
    //           color: '#0062A6',
    //         },
    //       },
    //     ],
    //     type: 'bar',
    //   },
    // ],
    // series: [
    //   { name: 'Total Revenue', data: [990.71], type: 'bar' },
    //   { name: 'Daily Revenue', data: [412.14], type: 'bar' },
    //   { name: 'Today Revenue', data: [408.07], type: 'bar' },
    // ],

    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: ['Total Revenue', 'Daily Revenue', "Today's Revenue"],
      icon: 'circle',
      right: 10,
      top: 'bottom',
    },
    grid: {
      left: '0%',
      right: '8%',
      bottom: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: ['990.71', '412.14', '408.07'],
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        name: 'Placeholder',
        type: 'bar',
        stack: 'Total',
        itemStyle: {
          borderColor: 'transparent',
          color: 'transparent',
        },
        emphasis: {
          itemStyle: {
            borderColor: 'transparent',
            color: 'transparent',
          },
        },
        // data: [0, 900, 1245, 1530, 1376, 1376, 1511, 1689, 1856, 1495, 1292]
      },
      {
        name: 'Total Revenue',
        type: 'bar',
        stack: 'Total',
        itemStyle: {
          color: '#90993F',
        },
        data: [990.71, '-', '-'],
      },
      {
        name: 'Daily Revenue',
        type: 'bar',
        stack: 'Total',
        itemStyle: {
          color: '#E97300',
        },
        data: ['-', 412.14, '-'],
      },
      {
        name: "Today's Revenue",
        type: 'bar',
        stack: 'Total',
        itemStyle: {
          color: '#0062A6',
        },
        data: ['-', '-', 408.07],
      },
    ],
  }
  locations = '../../../assets/widget-icon/location.png'
  chargers = '../../../assets/widget-icon/chargers.png'
  charging_session = '../../../assets/widget-icon/charging-sessions.png'
  errors = '../../../assets/widget-icon/erorrs.png'

  basic = 'basic'
  bar = 'barAnalytics'
  chargerAnalytics = 'chargerAnalytics'
  stackedArea = 'stackedArea'
  chargerAnalyticsTitle = 'Energy Used'
  chargerEnergyUsedData = []
  barTitle = 'Chargers'
  basicTitle = 'Locations Performing '

  type_list: any

  type_lists = new FormControl('')

  data = [
    /* {
        Type: 'Locations',
        Count: 50,
        StatusData: [
          {
            Key: 'Commissioned',
            value: 20,
          },
          {
            Key: 'UnderMaintenance',
            value: 25,
          },
          {
            Key: 'Upcoming',
            value: 5,
          },
        ],
      }, */
    {
      Type: 'Chargers',
      Count: 26,
      StatusData: [
        {
          Key: 'Available',
          value: 10,
          Color: '#90993F',
        },
        {
          Key: 'Connected',
          value: 6,
          Color: '#E97300',
        },
        {
          Key: 'Offline',
          value: 10,
          Color: '#757575',
        },
      ],
    },
    {
      Type: 'Charging Sessions',
      Count: 35,
      StatusData: [
        {
          Key: 'Cancelled',
          value: 15,
          Color: '#EA002A',
        },
        {
          Key: 'Interrupted',
          value: 15,
          Color: '#E97300',
        },
        {
          Key: 'Completed',
          value: 5,
          Color: '#90993F',
        },
      ],
    },
    {
      Type: 'Alerts',
      Count: 10,
      StatusData: [
        {
          Key: 'Critical',
          value: 5,
          Color: '#E97300',
        },
        {
          Key: 'High',
          value: 3,
          Color: '#EA002A',
        },
        {
          Key: 'Medium',
          value: 2,
          Color: '#0062A6',
        },
      ],
    },
  ]

  ngOnInit(): void {
    let isDuration = this._storageService.getSessionData('duration')
    if (isDuration) {
      this._storageService.removeSessionData('duration')
      this._storageService.removeSessionData('graphHeading')
      this._storageService.removeSessionData('pageHeading')
    }
    // this.GetSummaryDataByLocationId(this.selecteLocationIds)
    this.getEnergyUsedByLocationId(
      this.selecteLocationIds,
      this.selectedTime,
      this.UserId,
      this.chargerboxid,
    )
    this.getChargerGraph(
      this.selecteLocationIds,
      this.selectedTime,
      this.UserId,
      this.chargerboxid,
    )
    this.getChargingSessionChartData(
      this.selecteLocationIds,
      this.selectedTime,
      this.UserId,
      this.chargerboxid,
    )

    this.GetLocationMilesAddedChartdata(
      this.selecteLocationIds,
      this.selectedTime,
      this.UserId,
      this.chargerboxid,
    )
  }

  // GetSummaryDataByLocationId(locationId: any) {
  //   this._locationService
  //     .GetSummaryStatuByLocationId(locationId)
  //     .subscribe((res) => {
  //       //   this.summaryData = res.data
  //     })
  // }

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
    //this._router.navigate(['detail'],{relativeTo: this._route});
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
        this.chargerboxid,
      )

      this.getChargerGraph(
        this.selecteLocationIds,
        this.selectedTime,
        this.UserId,
        this.chargerboxid,
      )
      this.getChargingSessionChartData(
        this.selecteLocationIds,
        this.selectedTime,
        this.UserId,
        this.chargerboxid,
      )
      this.GetLocationMilesAddedChartdata(
        this.selecteLocationIds,
        this.selectedTime,
        this.UserId,
        this.chargerboxid,
      )
    }
  }

  /**
   *
   * @param locationIds
   * @param duration
   * @param operatorId
   * @param chargerBoxId
   *
   * Get Energy Used data
   */

  getEnergyUsedByLocationId(
    locationIds: any,
    duration: any,
    operatorId: any,
    chargerBoxId: any,
  ) {
    const body = {
      locationIds: locationIds ? [locationIds] : [],
      duration: duration.toString(),
      opratorid: operatorId,
      chargerboxid: chargerBoxId,
    }

    this._dashboardService.GetEnergyUsedByLocationID(body).subscribe((res) => {
      this.energyAnalyticsUsedData = res.data
    })
  }

  /**
   * Get Charger Graph
   */

  getChargerGraph(
    locationIds: any,
    duration: any,
    operatorId: any,
    chargerBoxId: any,
  ) {
    //alert('remove hardcode');
    // this.chargersChartData = ''
    //alert(duration);
    const body = {
      //locationIds: [locationIds],
      locationIds: locationIds ? [locationIds] : [],
      duration: duration.toString(),
      opratorid: operatorId,
      chargerboxid: chargerBoxId,
    }
    this._locationService.getChargerChartData(body).subscribe({
      next: (response) => {
        this.chargersChartData = response
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
    chargerBoxId: any,
  ) {
    const body = {
      locationIds: locationIds ? [locationIds] : [],
      duration: duration.toString(),
      opratorid: operatorId,
      chargerboxid: chargerBoxId,
    }
    this._dashboardService.GetAreachartdataData(body).subscribe((res) => {
      this.chargingSessionData = res.data
      console.log(this.chargingSessionData, 'hello session chart')
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
    chargerBoxId: any,
  ) {
    const body = {
      locationIds: locationIds ? [locationIds] : [],
      duration: duration.toString(),
      opratorid: operatorId,
      chargerboxid: chargerBoxId,
    }
    this._locationService
      .GetLocationMilesAddedChartdata(body)
      .subscribe((res) => {
        this.locationAnalyticsMilesAddData = res.data
      })
  }
}
