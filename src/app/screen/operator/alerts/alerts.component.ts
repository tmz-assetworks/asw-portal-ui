import { Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { animate, state, style, transition, trigger } from '@angular/animations'
import { AlertsService } from './alerts.service'
import { StorageService } from 'src/app/service/storage.service'
import { UserProfileService } from '../../user-profile/user-profile.service'

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'),
      ),
    ]),
  ],
})
export class AlertsComponent implements OnInit {
  // DECLARE VARIABLES
  UserId: string | null
  totalCount: any
  pageSize: number = 10
  currentPage: number = 1
  totalPages: any
  pageSizeOptions = [10, 20, 100]
  alertList = []
  isTableHasData = false
  expandedElement: any
  searchParam = ''

  constructor(
    public _alertsService: AlertsService,
    private _storageService: StorageService,
    private _userProfileService: UserProfileService,
  ) {
    this.UserId = this._storageService.getLocalData('user_id')
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator

  ngOnInit(): void {
    // API Call
    this.GetOperatorAlerts()
  }

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Rows per page'
  }

  dataSource = new MatTableDataSource<any>(this.alertList)

  // TABLE COLUMNS

  displayedColumns = [
    'ChargeBoxId',
    'Category',
    'MessageType',
    'Datetime',
    'IpAddress',
    'LocationName',
    'Action',
  ]

  /**
   * FILTER ALERTS
   * @param event
   */

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.searchParam = filterValue
    this.GetOperatorAlerts()
  }
  // GET OPERATOR ALERT

  GetOperatorAlerts() {
    const pBody = {
      pageNumber: this.currentPage,
      searchParam: this.searchParam,
      pageSize: this.pageSize,
      orderBy: '',
      locationIds: [],
      operatorId: '',

      chargerBoxIds: [],
      opratorid: this.UserId,
    }
    this._alertsService.GetOperatorAlerts(pBody).subscribe((res: any) => {
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
   * Page event
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

    this.GetOperatorAlerts()
  }

  /**
   * UPDATE NOTIFICATION IS READ
   * @param data
   */
  UpdateNotificationIsRead(data: any) {
    if (data.isRead) {
      return
    }
    const body = {
      id: data.eventLogId,
      flag: data.flag,
    }
    this._alertsService.UpdateNotificationIsRead(body).subscribe((res: any) => {
      let obj1 = this.dataSource.data.find(
        (o) => o.eventLogId == data.eventLogId,
      )
      let index = this.dataSource.data.indexOf(obj1)
      this.dataSource.data.fill((obj1.isRead = true), index, index++)
      this._userProfileService.alertSubject.next('Notication is read')
    })
  }
}
