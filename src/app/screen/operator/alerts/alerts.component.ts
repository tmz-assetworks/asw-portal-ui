import { Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { animate, state, style, transition, trigger } from '@angular/animations'
import { AlertsService } from './alerts.service'
import { StorageService } from 'src/app/service/storage.service'

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
  alertList = []
  isTableHasData = false
  expandedElement: any
  arrKeys: any = ['All']

  currentPage = 1
  totalRecords = 30
  pageSize = 10
  totalPages = 0
  searchParam = ''
  duration: any = 1

  displayedColumns = [
    'ChargeBoxId',
    'Category',
    'MessageType',
    'Datetime',
    'IpAddress',
    'LocationName',
    'Action',
  ]
  UserId: string | null
  constructor(
    public _alertsService: AlertsService,
    private _storageService: StorageService,
  ) {
    this.UserId = this._storageService.getLocalData('user_id')
    // this.duration = this._storageService.getSessionData('duration')
  }

  ngOnInit(): void {
    this.GetOperatorAlerts('', this.currentPage, this.totalRecords)
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator
    this.paginator._intl.itemsPerPageLabel = 'Rows per page'
  }

  dataSource = new MatTableDataSource<any>(this.alertList)

  // expandedElement!: any | null

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.searchParam = filterValue
    this.GetOperatorAlerts('', this.currentPage, this.totalRecords)
  }

  /**
   * Get Operator Alerts
   */
  selectOption(event: any) {
    //getted from event
    // console.log(id);
    //getted from binding
    this.searchParam = event.target.value
    // console.log(this.searchParam)

    this.GetOperatorAlerts('', this.currentPage, this.totalRecords)
  }

  GetOperatorAlerts(event: any, currentPage: number, totalPage: number) {
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

    const pBody = {
      pageNumber: this.currentPage,
      searchParam: this.searchParam,
      pageSize: this.pageSize,
      orderBy: '',
      locationIds: [],
      operatorId: '',
      // duration: this.duration.toString(),
      chargerBoxIds: [],
      opratorid: this.UserId,
    }
    this._alertsService.GetOperatorAlerts(pBody).subscribe((res: any) => {
      if (res.data !== undefined && res.data != null && res.data.length > 0) {
        this.totalRecords = res.paginationResponse.totalCount
        this.totalPages = res.paginationResponse.totalPages
        this.pageSize = res.pageSize
        this.currentPage = res.currentPage
        this.dataSource.data = res.data

        this.isTableHasData = false
      } else {
        this.dataSource.data = []
        this.isTableHasData = true
      }
      // this.dataSource.sort = this.sort;
    })
  }
}
