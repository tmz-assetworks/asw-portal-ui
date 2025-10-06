import { Component, OnInit, ViewChild } from '@angular/core'
import { FormControl } from '@angular/forms'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { StorageService } from 'src/app/service/storage.service'
import { DashboardService } from '../../dashboard/dashboard.service'
import { ChargerService } from '../charger.service'
import { CommonModule, Location } from '@angular/common'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'

@Component({
  selector: 'app-charger-inner',
  templateUrl: './charger-inner.component.html',
  styleUrls: ['./charger-inner.component.scss'],
  imports:[
    CommonModule,
    RouterModule,
    SharedMaterialModule
  ]
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
  locationId: any
  totalCount: any
  pageSize: number = 10
  currentPage: number = 1
  totalPages: any
  pageSizeOptions = [10, 20, 100]
  searchParam = ''

  @ViewChild(MatPaginator) paginator!: MatPaginator
  data:string[] = []

  viewCharger(data: any) {
    this._storageService.setSessionData('chargerBoxId', data.chargerBoxId)
    this._storageService.setSessionData('chargerName', data.chargerName)
    let userRole=this._storageService.getLocalData('role')?.toLowerCase();
    if(userRole){
      this._router.navigate([`${userRole}/charger/chargers-info`])
    }
  }

  /**
   * Displayed Columns
   */
  displayedColumns: string[] = [
    'assetId',
    'chargerBoxId',
    'locationcontactname',
    'makeName',
    'modelName',
    'chargertype',
    'chargerStatus',    
    'chargerPorts',    
    'simCardMSIDN',
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

  chargers = '../../../../../assets/Operator/Chargers.svg'
  charging_session = '../../../../../assets/Operator/Charger-Seesion.svg'
  errors = '../../../../../assets/Operator/Error.svg'

  constructor(
    private _router: Router,
    private _dashboardService: DashboardService,
    private _chargerService: ChargerService,
    private _storageService: StorageService,
    private _route: ActivatedRoute,
    private readonly _location: Location,
  ) {
    this.UserId = this._storageService.getLocalData('user_id')
  }

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Rows per page'
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
      this._storageService.removeSessionData('chargerBoxId')
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
    this.getDispensersDetail()
  }
  /**
   *
   * @param event
   * Search Filter
   */

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.searchParam = filterValue
    this.getDispensersDetail()
  }

  /**
   * Summary Status
   */
  getSummaryStatus() {
    this._chargerService.GetSummaryStatus().subscribe((res) => {
      this.data = res.data
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
        this.chargersChartData = response.data
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
  }

  /**
   * Get Dispenser Details
   */
  getDispensersDetail() {
    const body = {
      pageNumber: this.currentPage,
      searchParam: this.searchParam,
      pageSize: this.pageSize,
      orderBy: '',
      operatorid: this.UserId,
    }

    this._chargerService.GetDispensersDetail(body).subscribe((res: any) => {
      if (res.data !== undefined && res.data != null && res.data.length > 0) {
        this.totalCount = res.paginationResponse.totalCount
        this.totalPages = res.paginationResponse.totalPages
        this.pageSize = res.paginationResponse.pageSize

        this.dataSource.data = res.data
        this.isTableHasData = false
      } else {
        this.dataSource.data = []
        this.isTableHasData = true
      }
    })
  }

  /**
   *
   * @param event
   * Page Event
   */

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

    this.getDispensersDetail()
  }
  handleKeyDown(event: KeyboardEvent): void {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault(); 
    this.goback();
  }
}
 goback(): void {
    this._location.back();
    sessionStorage.clear();
  }
downloadAsCSV(): void {
  const body = {
      pageNumber: 1,
      searchParam: '',
      pageSize: 9999,
      orderBy: '',
      operatorid: this.UserId,
  };

  this._chargerService.GetDispensersDetail(body).subscribe((res: any) => {
    if (!res.data || res.data.length === 0) {
      return;
    }

    const headers = [
      'ASSET ID',
      'CHARGER ID',
      'LOCATION',
      'CHARGER MAKE',
      'CHARGER MODEL',
      'CONNECTOR TYPE',
      'CHARGER STATUS',
      'CHARGER PORTS',
      'SIM ICCID',
      'LOCATION CONTACT NUMBER'
    ];

    const escapeCsv = (value: any) => {
      if (value == null) return '""';
      let str = String(value).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = res?.data?.map((item: any) => [
      escapeCsv(item.assetId),
      escapeCsv(item.chargerBoxId),
      escapeCsv(item.locationContactName),
      escapeCsv(item.makeName),
      escapeCsv(item.modelName),
      escapeCsv(item.chargerType),
      escapeCsv(item.chargerStatus),
      escapeCsv(item.noofPort),
      escapeCsv(item.simCardMSIDN),
      escapeCsv(item.locationContactNumber)
    ].join(',')).join('\n');

    const csvContent =
      'data:text/csv;charset=utf-8,' + headers.join(',') + '\n' + rows;

    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', 'charger_detail_report.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
  });
 }
}
