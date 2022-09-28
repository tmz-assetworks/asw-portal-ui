import { animate, state, style, transition, trigger } from '@angular/animations'
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { AlertsService } from '../../alerts/alerts.service'
import { StorageService } from 'src/app/service/storage.service'
import { LocationService } from '../../location/location.service'
import { ChargerService } from '../charger.service'

import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { number } from 'echarts'

@Component({
  selector: 'app-charger-event',
  templateUrl: './charger-event.component.html',
  styleUrls: ['./charger-event.component.scss'],
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
export class ChargerEventComponent implements OnInit {
  UserId: string | null
  chargerName: string | null
  selectedChargerIds: string | null
  jsPDF: any

  searchParam = 'All'
  dataSource = new MatTableDataSource<any>()

  displayedColumns = ['Type', 'DateTime', 'Action']
  isTableHasData = false
  expandedElement: any

  arrKeys: any = [{ id: '0', value: 'All' }]
  totalCount: any
  pageSize: number = 10
  currentPage: number = 1
  totalPages: any
  pageSizeOptions = [10, 20, 100]
  chargerBoxId: any
  eventLogList: any
  constructor(
    public _alertsService: AlertsService,
    private _storageService: StorageService,
    private _locationService: LocationService,
    private _chargerService: ChargerService,
  ) {
    this.UserId = this._storageService.getLocalData('user_id')
    this.selectedChargerIds = this._storageService.getSessionData(
      'chargerBoxId',
    )
    this.chargerName = this._storageService.getSessionData('chargerName')
  }
  ngOnInit(): void {
    this.GetEventLogByLocation()
    this.getCommandList()
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator

  @ViewChild('pdfTable', { static: false })
  pdfTable!: ElementRef

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Rows per page'
  }

  /**
   *
   * @param event
   * Select charger
   */

  selectOption(event: any) {
    this.searchParam = event.target.value
    this.GetEventLogByLocation()
  }

  /**
   * Get EventLogByLocation
   */

  GetEventLogByLocation() {
    const body = {
      pageNumber: this.currentPage,
      searchParam: this.searchParam == 'All' ? '' : this.searchParam,
      pageSize: this.pageSize,
      orderBy: '',
      locationIds: [],
      opratorid: '',
      chargerBoxIds: [this.selectedChargerIds],
    }

    this._locationService.GetEventLogByLocation(body).subscribe((res: any) => {
      if (res.data !== undefined && res.data != null && res.data.length > 0) {
        this.eventLogList = res.data
        this.totalCount = res.paginationResponse.totalCount
        this.totalPages = res.paginationResponse.totalPages
        this.pageSize = res.paginationResponse.pageSize
        this.dataSource.data = this.eventLogList
        this.isTableHasData = false
      } else {
        this.dataSource.data = []
        this.isTableHasData = true
      }
    })
  }
  /**
   * Download Pdf
   */

  public downloadAsPDF() {
    var prepare: any = []
    this.eventLogList.forEach((e: any) => {
      var tempObj = []
      tempObj.push(e.requestType)
      tempObj.push(e.modifiedAt)
      tempObj.push(e.requestPayload)
      tempObj.push(e.responsePayload)
      prepare.push(tempObj)
    })
    let doc: any = new jsPDF()
    doc.autoTable({
      head: [['Type', 'Date/Time', 'RequestPayload', 'ResponsePayload']],
      body: prepare,
    })
    doc.save('download' + '.pdf')
  }

  /**
   * Get command list
   */
  getCommandList() {
    this._chargerService.GetCommandList().subscribe((res) => {
      this.arrKeys.push(...res.data)
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

    this.GetEventLogByLocation()
  }
}
