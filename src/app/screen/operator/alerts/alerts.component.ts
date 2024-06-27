import { Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { animate, state, style, transition, trigger } from '@angular/animations'
import { AlertsService } from './alerts.service'
import { StorageService } from 'src/app/service/storage.service'
import { UserProfileService } from '../../user-profile/user-profile.service'
import { ActivatedRoute, Router } from '@angular/router'

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
  eventlogIdList: any
  isRead = false

  constructor(
    public _alertsService: AlertsService,
    private _storageService: StorageService,
    private _userProfileService: UserProfileService,
    private _activatedRoute: ActivatedRoute,
  ) {
    this.UserId = this._storageService.getLocalData('user_id')

    this._activatedRoute.queryParams.subscribe(params => {
      const pageurl = params['type'];
      if (pageurl == "notification")
        this.isRead = false
      else
        this.isRead = true
      this.GetOperatorAlerts()
    });
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
    'assetId',
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
      isRead: this.isRead
    }
    this._alertsService.GetOperatorAlerts(pBody).subscribe((res: any) => {
      if (res.data !== undefined && res.data != null && res.data.length > 0) {
        this.totalCount = res.paginationResponse.totalCount
        this.totalPages = res.paginationResponse.totalPages
        this.pageSize = res.paginationResponse.pageSize

        this.dataSource.data = res.data
        this.isTableHasData = false
        // API will be call after load operator alerts
        this.eventlogIdList = res.data
          .filter((item: any) => !item.isRead) // Filter items where isRead is false
          .map((item: any) => ({
            eventLogId: item.eventLogId,
            category: item.category
          }));

        if (this.eventlogIdList.length > 0) {
          this.UpdateOcppEventLogAndTaskNotification(this.eventlogIdList)
        }
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
  * UPDATE Ocpp event
  */
  /**
 * Updates the read status of OCPP event logs to 'read' for the given list of IDs and categories.
 * @param {string[]} data
 */
  UpdateOcppEventLogAndTaskNotification(data: []) {
    // Create the request body with the event log IDs and categories
    const body = {
      ocppIds: data
    };

    // Call the alerts service to update the read status of the event logs
    this._alertsService.UpdateOcppEventLogAndTaskNotification(data).subscribe((res: any) => {
      // Notify the user profile service that the notification is read
      this._userProfileService.alertSubject.next('Notification is read');
    });
  }
}
