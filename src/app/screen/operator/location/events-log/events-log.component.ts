import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { LocationService } from './../location.service'
import { animate, state, style, transition, trigger } from '@angular/animations'
import { StorageService } from 'src/app/service/storage.service'
import { ChargerService } from '../../charger/charger.service'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { MatDialog } from '@angular/material/dialog'
import * as fs from 'file-saver'
import { DatePipe } from '@angular/common'
import { TransactionDialogComponent } from 'src/app/component/dashboard/transaction-dialog/transaction-dialog.component'

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
  eventLogList: any[] = []

  @ViewChild(MatPaginator) paginator: any
  @ViewChild('pdfTable', { static: false })
  pdfTable!: ElementRef

  datePipe = new DatePipe('en-US')

  constructor(
    public _locationService: LocationService,
    private _storageService: StorageService,
    private _chargerService: ChargerService,
    public dialog: MatDialog,
  ) {
    this.locationName = this._storageService.getSessionData('locationName')
    this.locationId = this._storageService.getSessionData('locationId')

    this.UserId = this._storageService.getLocalData('user_id')
  }

  displayedColumns = ['Type', 'DateTime', 'SerialNumber', 'action']

  dataSource = new MatTableDataSource<any>(this.eventLogList)

  ngOnInit(): void {
    if (this.locationName && this.locationId) {
      this.GetEventLogByLocation()
    }
    this.getCommandList()
  }

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Rows per page'
  }

  /**
   * Filter command type
   * @param event
   */
  selectOption(event: any) {
    this.searchParam = event.target.value
    this.GetEventLogByLocation()
  }

  /**
   * Get event log by location
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
        //this.pageSize = 10
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

  downloadFile() {
    let newObjArr: any = []

    this.eventLogList = this.dataSource.data

    for (var i = 0; i < this.eventLogList.length; i++) {
      let newObj = {
        'REQUEST TYPE': this.eventLogList[i]['requestType'],
        'DATE/TIME': this.datePipe.transform(
          this.eventLogList[i]['modifiedAt'],
          'dd-MM-yyyy h:mm',
        ),
        'DEVICE ID': this.eventLogList[i]['deviceId'],
        'REQUEST PAYLOAD': this.eventLogList[i]['requestPayload'],
        'RESPONSE PAYLOAD': this.eventLogList[i]['responsePayload'],
      }

      //PUSH INTO NEW ARRAY

      newObjArr.push(newObj)
    }

    const replacer = (key: any, value: any) => (value === null ? '' : value) // specify how you want to handle null values here
    const header = Object.keys(newObjArr[0])

    let csv = newObjArr.map((row: any) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(','),
    )

    csv.unshift(header.join(','))
    let csvArray = csv.join('\r\n')

    var blob = new Blob([csvArray], { type: 'text/csv' })
    fs.saveAs(
      blob,
      new Date().toDateString() + '_Location-EventLog_AssetWorks.csv',
    )
  }

  public downloadAsPDF() {
    var prepare: any = []
    this.eventLogList = this.dataSource.data
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
   * Get command list dropdown
   */
  getCommandList() {
    this._chargerService.GetCommandList().subscribe((res) => {
      this.arrKeys.push(...res.data)
    })
  }

  /**
   *
   * @param id
   * Upate ocpp eventlog details
   */
  UpdateOcppEventLogIsRead(id: any) {
    this._locationService.UpdateOcppEventLogIsRead(id).subscribe((res) => {
      let obj1 = this.dataSource.data.find((o) => o.id == id)
      let index = this.dataSource.data.indexOf(obj1)
      this.dataSource.data.fill((obj1.isRead = true), index, index++)
    })
  }
  /**
   *
   * @param id
   * Make payment request
   */

  openMakePaymentDialog(id: any) {
    const dialogRef = this.dialog.open(TransactionDialogComponent, {
      // width: '40%',
      autoFocus: false,
      // height: '750px',
      panelClass: 'my-dialog-container-class2',
      data: { id: id },
    })
    dialogRef.afterClosed().subscribe((result) => {})
  }
}
