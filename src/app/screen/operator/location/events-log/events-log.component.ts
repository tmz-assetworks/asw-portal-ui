import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { LocationService } from './../location.service'
import { animate, state, style, transition, trigger } from '@angular/animations'
import { StorageService } from 'src/app/service/storage.service'

import { ChargerService } from '../../charger/charger.service'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

@Component({
  selector: 'app-events-log',
  templateUrl: './events-log.component.html',
  styleUrls: ['./events-log.component.scss'],
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
export class EventsLogComponent implements OnInit {
  locationName: string | null
  UserId: string | null
  locationId: any

  isTableHasData = false
  expandedElement: any
  arrKeys: any = [{ id: '0', value: 'All' }]
  searchParam = 'All'

  totalCount: any
  pageSize: number = 10
  currentPage: number = 1
  totalPages: any
  pageSizeOptions = [10, 20, 100]
  eventLogList: any

  @ViewChild(MatPaginator) paginator: any
  @ViewChild('pdfTable', { static: false })
  pdfTable!: ElementRef

  constructor(
    public _locationService: LocationService,
    private _storageService: StorageService,
    private _chargerService: ChargerService,
  ) {
    this.locationName = this._storageService.getSessionData('locationName')
    this.locationId = this._storageService.getSessionData('locationId')
    // this.locationId = JSON.parse(this.locationId)
    this.UserId = this._storageService.getLocalData('user_id')
  }

  dataSource = new MatTableDataSource<any>()

  displayedColumns = ['Type', 'DateTime', 'SerialNumber', 'action']

  ngOnInit(): void {
    if (this.locationName && this.locationId) {
      this.GetEventLogByLocation()
    }
    // this.GetEventLogByLocation()

    this.getCommandList()
  }

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Rows per page'
  }

  /**
   * Filter Operation type
   * @param event
   */
  selectOption(event: any) {
    this.searchParam = event.target.value
    this.GetEventLogByLocation()
  }

  /* 
  Get Location Event Log List
  */

  GetEventLogByLocation() {
    const body = {
      pageNumber: this.currentPage,
      searchParam: this.searchParam == 'All' ? '' : this.searchParam,
      pageSize: this.pageSize,
      orderBy: '',
      locationIds: this.locationId ? [this.locationId] : [],
      opratorid: this.UserId,
      chargerBoxIds: [],
    }

    this._locationService.GetEventLogByLocation(body).subscribe((res: any) => {
      if (res.data !== undefined && res.data != null && res.data.length > 0) {
        this.totalCount = res.paginationResponse.totalCount
        this.totalPages = res.paginationResponse.totalPages
        this.pageSize = res.paginationResponse.pageSize

        this.dataSource.data = res.data

        this.isTableHasData = false
      } else {
        this.dataSource.data = []
        this.isTableHasData = true
        this.pageSize = 10
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
    this.GetEventLogByLocation()
  }

  public downloadAsPDF() {
    var prepare: any = []
    this.eventLogList.forEach((e: any) => {
      var tempObj = []
      tempObj.push(e.requestType)
      tempObj.push(e.modifiedAt)
      tempObj.push(e.deviceId)
      tempObj.push(e.requestPayload)
      tempObj.push(e.responsePayload)
      prepare.push(tempObj)
    })
    let doc: any = new jsPDF()
    doc.autoTable({
      head: [
        [
          'Type',

          'Date/Time',

          'SerialNumber',

          'RequestPayload',

          'ResponsePayload',
        ],
      ],
      body: prepare,
    })
    doc.save('download' + '.pdf')
  }

  /**
   * Get Command List
   */
  getCommandList() {
    this._chargerService.GetCommandList().subscribe((res) => {
      this.arrKeys.push(...res.data)
    })
  }

  UpdateOcppEventLogIsRead(data: any) {
    this._locationService.UpdateOcppEventLogIsRead(data).subscribe((res) => {
      this.GetEventLogByLocation()
    })
  }
}
