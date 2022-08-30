import { Component, OnInit, ViewChild } from '@angular/core'
import { FormControl } from '@angular/forms'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from 'src/app/service/auth/auth.service'
import { EChartsOption } from 'echarts'
import { LocationService } from '../location.service'
import { StorageService } from 'src/app/service/storage.service'
import { MatSort } from '@angular/material/sort'
import { isDataSource } from '@angular/cdk/collections'

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
  locationId: any
  searchParam: string = ''
  isTableHasData = false

  currentPage = 1
  totalRecords = 30
  pageSize = 10
  totalPages = 0

  selectedTime: number = 1
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort)
  sort!: MatSort
  locationStatusData: any = ''
  locationPerformingData = ''

  dataSource = new MatTableDataSource<any>()

  locationList: any

  UserId: string | null
  toggleValue: number = 1
  displayedColumns = [
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

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator
    this.paginator._intl.itemsPerPageLabel = 'Rows per page'
  }

  viewLocation(data: any) {
    // console.log(data, 'data on location click')
    this._storageService.setSessionData('locationId', data.locationId)
    this._storageService.setSessionData('locationName', data.locationName)
    this._router.navigate(['operator/location/analytics'])
  }

  locations = '../../../assets/widget-icon/location.png'
  chargers = '../../../assets/widget-icon/chargers.png'
  charging_session = '../../../assets/widget-icon/charging-sessions.png'
  errors = '../../../assets/widget-icon/erorrs.png'

  locationPerform = 'locationPerform'
  basicStatus = 'basicStatus'

  locationStatusTitle = 'Location Status'
  locationPerormTitle = 'Location  Performing '
  filterToggle = new FormControl('1')

  constructor(
    private _router: Router,
    private _locationService: LocationService,
    private _route: ActivatedRoute,
    private _storageService: StorageService,
  ) {
    this.UserId = this._storageService.getLocalData('user_id')
  }

  ngOnInit(): void {
    this.getlocationTableData('', this.currentPage, this.totalRecords)
    this.getSummaryStatus()
    // this.locationStatus()

    this.locationStatus('', this.selectedTime, this.UserId)

    if (this._storageService.getSessionData('locationId')) {
      this._storageService.removeSessionData('locationName')
      this._storageService.removeSessionData('locationId')
    }
    let isDuration = this._storageService.getSessionData('duration')

    if (isDuration) {
      this._storageService.removeSessionData('duration')
      this._storageService.removeSessionData('graphHeading')
      this._storageService.removeSessionData('pageHeading')
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
    this.searchParam = filterValue
    this.getlocationTableData('', this.currentPage, this.totalRecords)
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

      opratorid: operatorId,
    }

    this._locationService.GetLocationStatus(body).subscribe({
      next: (response) => {
        this.locationStatusData = response.data
      },
      error: (err) => {
        console.log('no response for location status graph')
      },
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
      this.locationPerformingData = res.data
    })
  }

  getlocationTableData(event: any, currentPage: number, totalPage: number) {
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
    const body = {
      pageNumber: this.currentPage,
      searchParam: this.searchParam,
      pageSize: this.pageSize,
      orderBy: '',
      locationIds: [],
      opratorid: this.UserId,
    }
    this._locationService.getLocationTableData(body).subscribe((res: any) => {
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
  /**
   * Emit Toggle event
   */
  changeToggleValue(event: any) {
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
