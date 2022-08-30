import { Component, OnInit, ViewChild } from '@angular/core'
import { FormControl } from '@angular/forms'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { ActivatedRoute, Router } from '@angular/router'
import { EChartsOption } from 'echarts'
import { AuthService } from 'src/app/service/auth/auth.service'
import { StorageService } from 'src/app/service/storage.service'
import { DashboardService } from '../../dashboard/dashboard.service'
import { ChargerService } from '../charger.service'

@Component({
  selector: 'app-charger-inner',
  templateUrl: './charger-inner.component.html',
  styleUrls: ['./charger-inner.component.scss'],
})
export class ChargerInnerComponent implements OnInit {
  filterToggle = new FormControl('1')
  isTableHasData = false
  selectedTime: number = 1
  UserId: string | null
  chargersChartData = ''
  selecteLocationIds = ''
  chargingSessionData = ''
  dashboardChargingSession = 'dashboardChargingSession'
  dashboardChargingSessionTitle = 'Charging Session'

  currentPage = 1
  totalRecords = 30
  pageSize = 10
  totalPages = 0
  searchParam = ''
  locationId: any

  @ViewChild(MatPaginator) paginator!: MatPaginator
  data = []

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator
    this.paginator._intl.itemsPerPageLabel = 'Rows per page'
  }

  viewCharger(data: any) {
    this._storageService.setSessionData('chargerBoxId', data.chargerBoxId)
    this._storageService.setSessionData('chargerName', data.chargerName)
    this._router.navigate(['operator/charger/chargers-analytics'])
  }

  /**
   * Displayed Columns
   */
  displayedColumns: string[] = [
    'chargerName',
    'chargerBoxId',
    'chargertype',
    'faultisince',
    'locationcontactname',
    'timereported',
    'locationid',
    'state',
    'locationcontactnumber',
    'action',
  ]

  /**
   * Data source
   */
  dataSource = new MatTableDataSource<any>()

  setTime(event: any) {
    if (event.value) {
      this.selectedTime = event.value
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
    }
  }

  chargers = '../../../assets/widget-icon/chargers.png'
  charging_session = '../../../assets/widget-icon/charging-sessions.png'
  errors = '../../../assets/widget-icon/erorrs.png'

  constructor(
    private _router: Router,
    private _dashboardService: DashboardService,
    private _chargerService: ChargerService,
    private _storageService: StorageService,
    private _route: ActivatedRoute,
  ) {
    this.UserId = this._storageService.getLocalData('user_id')
  }

  ngOnInit(): void {
    let isDuration = this._storageService.getSessionData('duration')
    let isLocation = this._storageService.getSessionData('locationId')

    if (isLocation) {
      this._storageService.removeSessionData('locationId')
    }

    if (isDuration) {
      this._storageService.removeSessionData('duration')
      this._storageService.removeSessionData('graphHeading')
      this._storageService.removeSessionData('pageHeading')
    }
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
    this.getSummaryStatus()
    this.getDispensersDetail('', this.currentPage, this.totalRecords)
  }
  /**
   *
   * @param event
   * Search Filter
   */

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.searchParam = filterValue
    this.getDispensersDetail('', this.currentPage, this.totalRecords)
  }

  /**
   * Summary Status
   */
  getSummaryStatus() {
    this._chargerService.GetSummaryStatus().subscribe((res) => {
      this.data = res.data
      //console.log(this.data, 'Hi Rehanulh');
    })
  }

  /**
   * Charger in Use
   */

  getChargerGraph(locationIds: any, duration: any, operatorId: any) {
    const body = {
      locationIds: locationIds ? locationIds : [],
      duration: duration.toString(),
      opratorid: operatorId,
    }
    this._dashboardService.getChargerChartData(body).subscribe({
      next: (response) => {
        this.chargersChartData = response
      },
      error: (err) => {
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
   * Charging Session
   */
  getChargingSessionChartData(
    locationIds: any,
    duration: any,
    operatorId: any,
  ) {
    const body = {
      locationIds: locationIds ? locationIds : [],
      duration: duration.toString(),
      opratorid: operatorId,
    }
    this._dashboardService.GetAreachartdataData(body).subscribe((res) => {
      // console.log(
      //   'charging session graph on dashboard for location' + locationIds,
      //   res.data.length,
      // )
      this.chargingSessionData = res.data
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
    //this._router.navigate(['detail'],{relativeTo: this._route});
  }

  /***********************************Get Charger landing page table Data************************************************ */

  // GetChargerTableData(){
  //   const body = {
  //     pageNumber: 1,
  //     searchParam: '',
  //     pageSize: 10,
  //     orderBy: 'chargerBoxId',
  //     locationIds: [],
  //     opratorid: this.UserId,
  //   }
  //   this._chargerService.GetChargerTableData(body).subscribe((res: any) => {

  //    this.dataSource.data = res.data

  //   })
  // }

  getDispensersDetail(event: any, currentPage: number, totalPage: number) {
    if (this.pageSize !== event.pageSize) {
      this.currentPage = 1
    } else {
      this.currentPage =
        event !== undefined && event !== ''
          ? event.previousPageIndex < event.pageIndex
            ? currentPage + 1
            : currentPage - 1
          : 1
      if (this.currentPage == 0) {
        this.currentPage = this.currentPage + 1
      }
    }
    this.pageSize = event !== undefined && event !== '' ? event.pageSize : 10

    // this.currentPage = event !== undefined && event !== '' ? event.pageIndex : 1

    const body = {
      pageNumber: this.currentPage,
      searchParam: this.searchParam,
      pageSize: this.pageSize,
      orderBy: '',
      operatorId: this.UserId,
    }

    this._chargerService.GetDispensersDetail(body).subscribe((res: any) => {
      if (res.data !== undefined && res.data != null && res.data.length > 0) {
        this.totalRecords = res.paginationResponse.totalCount
        this.totalPages = res.paginationResponse.totalPages
        this.dataSource.data = res.data
        this.isTableHasData = false
      } else {
        this.dataSource.data = []
        this.isTableHasData = true
      }
    })
  }
}
