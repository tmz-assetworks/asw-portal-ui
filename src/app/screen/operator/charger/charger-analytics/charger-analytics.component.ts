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
  locationAnalyticsMilesAddData: any = ''

  chargingSessionTitle = 'Charging Session'
  chargingSession = 'chargingSession'
  chargerName: string | null
  chargerboxid: any

  navigationLinks = [
  { path: '../chargers-info', label: 'CHARGER INFORMATION' },
  { path: '../chargers-session', label: 'CHARGE SESSIONS' },
  { path: '../chargers-diagnostic', label: 'DIAGNOSTIC' },
  { path: '../chargers-event', label: 'EVENT LOGS' }
  ];

  timeOptions = [
  { value: '1', label: 'Last 24 Hours', classSuffix: '-item1', classSuffixDiv: '35' },
  { value: '7', label: 'One Week', classSuffix: '-item2', classSuffixDiv: '36' },
  { value: '30', label: 'Current Month', classSuffix: '-item3', classSuffixDiv: '37' },
  { value: '90', label: 'Last 3 Months', classSuffix: '-item4', classSuffixDiv: '38' },
];

  constructor(
    private readonly _auth: AuthService,
    private readonly _dashboardService: DashboardService,
    private readonly _locationService: LocationService,
    private readonly _storageService: StorageService,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
  ) {
    this.UserId = this._storageService.getLocalData('user_id')
    this.chargerboxid = this._storageService.getSessionData('chargerBoxId')

    this.chargerName = this._storageService.getSessionData('chargerName')
  }

  option: EChartsOption = {
 
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

  chargerAnalytics = 'chargerAnalytics'
  stackedArea = 'stackedArea'
  chargerAnalyticsTitle = 'Energy Used'
  chargerEnergyUsedData = []

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
    const body = {
      locationIds: locationIds ? [locationIds] : [],
      duration: duration.toString(),
      opratorid: operatorId,
      chargerboxid: chargerBoxId,
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

  trackByPath(index: number, item: any): string {
  return item.path;
}

}
