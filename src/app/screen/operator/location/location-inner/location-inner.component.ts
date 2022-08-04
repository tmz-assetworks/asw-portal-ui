import { Component, OnInit, ViewChild } from '@angular/core'
import { FormControl } from '@angular/forms'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from 'src/app/service/auth/auth.service'
import { EChartsOption } from 'echarts'
import { LocationService } from '../location.service'
import { StorageService } from 'src/app/service/storage.service'

@Component({
  selector: 'app-location-inner',
  templateUrl: './location-inner.component.html',
  styleUrls: ['./location-inner.component.scss'],
})
export class LocationInnerComponent implements OnInit {
  // showLocationNav: boolean = false
  // summaryStatus = []
  showLoader = false
  data = []
  dataSet: any
  chartOption: any
  isTableHasData = false

  selectedTime: number = 1
  @ViewChild(MatPaginator) paginator!: MatPaginator
  locationStatusData: any = ''
  locationPerformingData = ''
  displayedColumns: string[] = [
    'locationName',
    'address',
    'contactPersonName',
    'contactNumber',
    'locationStatus',
    'noOfPorts',
    'available',
    'connected',
    'faulty',
    'action',
  ]
  dataSource = new MatTableDataSource<any>()
  private _dashboardService: any
  locationList: any
  ELEMENT_DATA: any
  UserId: string | null
  toggleValue: number = 1

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    this.paginator._intl.itemsPerPageLabel = 'Rows per page'
  }

  viewLocation(data: any) {
    // console.log(data, 'data on location click')
    this._storageService.setSessionData('locationId', data.locationId)
    this._storageService.setSessionData('locationName', data.locationName)

    this._router.navigate(['operator/location/analytics'])
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
      position: ['15%', '20%'],
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
      // data: (function () {
      //   let list = [];
      //   for (let i = 1; i <= 11; i++) {
      //     list.push('Nov ' + i);
      //   }
      //   return list;
      // })()
      // axisLabel: {
      //   rotate: 30,
      // },
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

  locationPerform = 'locationPerform'
  basicStatus = 'basicStatus'
  // bar = 'bar'
  locationStatusTitle = 'Location Status'
  locationPerormTitle = 'Location  Performing '
  filterToggle = new FormControl('1')

  // data = [
  //   {
  //     Type: 'Locations',
  //     Count: 50,
  //     StatusData: [
  //       {
  //         Key: 'Commissioned',
  //         Color: '#757575',
  //         value: 20,
  //       },
  //       {
  //         Key: 'Under Maintenance',
  //         Color: '#E97300',
  //         value: 25,
  //       },
  //       {
  //         Key: 'Upcoming',
  //         Color: '#0062A6',
  //         value: 5,
  //       },
  //     ],
  //   },
  //   {
  //     Type: 'Chargers',
  //     Count: 35,
  //     StatusData: [
  //       {
  //         Key: 'Available',
  //         Color: '#90993F',
  //         value: 10,
  //       },
  //       {
  //         Key: 'Connected',
  //         Color: '#E97300',
  //         value: 6,
  //       },
  //       {
  //         Key: 'Offline',
  //         Color: '#757575',
  //         value: 10,
  //       },
  //     ],
  //   },
  //   {
  //     Type: 'Charging Sessions',
  //     Count: 26,
  //     StatusData: [
  //       {
  //         Key: 'Cancelled',
  //         Color: '#EA002A',
  //         value: 15,
  //       },
  //       {
  //         Key: 'Interrupted',
  //         Color: '#E97300',
  //         value: 15,
  //       },
  //       {
  //         Key: 'Completed',
  //         Color: '#90993F',
  //         value: 5,
  //       },
  //     ],
  //   },
  //   {
  //     Type: 'Alerts',
  //     Count: 10,
  //     StatusData: [
  //       {
  //         Key: 'Critical',
  //         Color: '#E97300',
  //         value: 5,
  //       },
  //       {
  //         Key: 'High',
  //         Color: '#EA002A',
  //         value: 3,
  //       },
  //       {
  //         Key: 'Medium',
  //         Color: '#0062A6',
  //         value: 2,
  //       },
  //     ],
  //   },
  // ]
  constructor(
    private _router: Router,
    private _locationService: LocationService,
    private _route: ActivatedRoute,
    private _storageService: StorageService,
  ) {
    this.UserId = this._storageService.getLocalData('user_id')
  }

  ngOnInit(): void {
    this.getSummaryStatus()
    // this.locationStatus()
    this.getlocationTableData()
    this.locationStatus('', this.selectedTime, this.UserId)

    if (this._storageService.getSessionData('locationId')) {
      this._storageService.removeSessionData('locationName')
      this._storageService.removeSessionData('locationId')
    }

    /**
     * Call location Performing
     */
    this.getLocationPerforming(
      '',
      this.selectedTime,
      this.UserId,
      this.toggleValue,
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
    if (this.dataSource.filteredData.length > 0) {
      this.isTableHasData = false
    } else {
      this.isTableHasData = true
    }
  }

  /**
   * Get Summary Status
   */
  getSummaryStatus() {
    this._locationService.GetSummaryStatus().subscribe((res) => {
      this.data = res.data
    })
  }

  /**
   * Get Location Status
   */

  locationStatus(locationIds: any, duration: any, operatorId: any) {
    const body = {
      locationIds: [],
      duration: duration.toString(),
      // duration: "90",
      opratorid: operatorId,
    }

    this._locationService.GetLocationStatus(body).subscribe({
      next: (response) => {
        // console.log('location status' + locationIds, response.data.length)

        this.locationStatusData = response.data
      },
      error: (err) => {
        console.log('no response for location status graph')
      },
    })
  }

  openDetailPage(event: any, graphHeading: string, pageHeading: string) {
    sessionStorage.setItem('graphHeading', graphHeading)
    sessionStorage.setItem('pageHeading', pageHeading)
    this._router.navigate(['detail'], {
      relativeTo: this._route,
      queryParams: { id: event },
    })
  }

  /**
   * Get Location performing data
   */

  getLocationPerforming(
    locationIds: any,
    duration: any,
    operatorId: any,
    orderBy: any,
  ) {
    const body = {
      locationIds: [],
      duration: duration.toString(),
      opratorid: operatorId,
      orderby: orderBy,
    }

    this._locationService.GetLocationPerforming(body).subscribe((res) => {
      //  console.log ('location performing api' + locationIds, res.data.length)
      this.locationPerformingData = res.data
    })
  }

  /* location dashboard table data  */

  getlocationTableData() {
    const body = {
      locationIds: [],
      opratorid: this.UserId,
    }
    this._locationService.getLocationTableData(body).subscribe((res: any) => {
      this.dataSource.data = res.data
    })
  }
  /**
   * Emit Toggle event
   */
  changeToggleValue(event: any) {
    // console.log(event, 'emitted value')

    this.toggleValue = event

    this.getLocationPerforming(
      '',
      this.selectedTime,
      this.UserId,
      this.toggleValue,
    )
  }

  /**
   * Set time to show
   */

  setTime(event: any) {
    if (event.value) {
      this.selectedTime = event.value
      this.locationStatus('', this.selectedTime, this.UserId)
      this.getLocationPerforming(
        '',
        this.selectedTime,
        this.UserId,
        this.toggleValue,
      )
    }
  }
}

export interface PeriodicElement {
  locationName: string
  address: string
  contactPersonName: string
  contactNumber: string
  locationStatus: string
  noOfPorts: string
  available: string
  connected: string
  faulty: string
}
