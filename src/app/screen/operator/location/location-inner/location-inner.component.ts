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
  isTableHasData = false
  UserId: string | null
  statusList: any

  selectedTime: number = 1
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort)
  locationStatusData: any = ''
  locationPerformingData = ''

  dataSource = new MatTableDataSource<any>()

  /**
   * Paginator variable declare
   *
   */

  totalCount: any
  pageSize: number = 10
  currentPage: number = 1
  totalPages: any
  pageSizeOptions = [10, 20, 100]
  searchParam = ''

  locationList: any
  toggleValue: number = 1
  displayedColumns = [
    'locationId',
    'locationName',
    'address',
    'contactPersonName',
    'contactNumber',
    'locationStatus',
    'noOfPorts',
    'available',
    'faulty',
    'action',
  ]

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator
    this.paginator._intl.itemsPerPageLabel = 'Rows per page'
  }

  viewLocation(data: any) {
    this._storageService.setSessionData('locationId', data.id)
    this._storageService.setSessionData('locationName', data.locationName)
    let userRole=this._storageService.getLocalData('role')?.toLowerCase();
    if(userRole){
      this._router.navigate([`${userRole}/location/analytics`]);
    }   
  }

  locations = '../../../../../assets/Operator/Location-Icons.svg'
  chargers = '../../../../../assets/Operator//Chargers.svg'
  charging_session = '../../../../../assets/Operator/Charger-Seesion.svg'
  errors = '../../../../../assets/Operator/Error.svg'

  locationPerform = 'locationPerform'
  basicStatus = 'basicStatus'

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
    this.getlocationsdispenserdetails()
    this.getSummaryStatus()

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
    this.getlocationsdispenserdetails()
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

  getlocationsdispenserdetails() {
    const pBody = {
      pageNumber: this.currentPage,
      searchParam: this.searchParam,
      pageSize: this.pageSize,
      orderBy: '',
      locationIds: [],
      operatorid: this.UserId,
    }
    this._locationService
      .getlocationsdispenserdetails(pBody)
      .subscribe((res) => {
        if (res.data !== undefined && res.data != null && res.data.length > 0) {
          this.totalCount = res.paginationResponse.totalCount
          this.totalPages = res.paginationResponse.totalPages
          this.pageSize = res.paginationResponse.pageSize

          this.dataSource.data = res.data
          this.statusList = res.statusList
          this.isTableHasData = false
        } else {
          this.dataSource.data = []
          this.isTableHasData = true
        }
      })
  }

  pageChange(event: any) {
    if (event.pageSize !== this.pageSize) {
      this.currentPage = 1
      this.pageSize = event.pageSize
      this.paginator.pageIndex = 0
    } else {
      this.currentPage =
        event.previousPageIndex < event.pageIndex
          ? this.currentPage + 1
          : this.currentPage - 1
    }

    this.getlocationsdispenserdetails()
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
