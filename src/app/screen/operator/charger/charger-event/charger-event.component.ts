import { animate, state, style, transition, trigger } from '@angular/animations'
import { Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { AlertsService } from '../../alerts/alerts.service'
import { StorageService } from 'src/app/service/storage.service'
import { LocationService } from '../../location/location.service'
import { ChargerService } from '../charger.service'
import { CommonModule, DatePipe } from '@angular/common'
import { RouterModule } from '@angular/router'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'
import 'jspdf-autotable'
import { TransactionDialogComponent } from 'src/app/component/dashboard/transaction-dialog/transaction-dialog.component'
import { MatDialog } from '@angular/material/dialog'


import * as fs from 'file-saver'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-charger-event',
  templateUrl: './charger-event.component.html',
  styleUrls: ['./charger-event.component.scss'],
  imports:[
    CommonModule,
    RouterModule,
    SharedMaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
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
  // jsPDF: any

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
  userTimeZone:any
  assetId:string | null

  constructor(
    public _alertsService: AlertsService,
    private _storageService: StorageService,
    private _locationService: LocationService,
    private _chargerService: ChargerService,
    public dialog: MatDialog,
  ) {
    this.UserId = this._storageService.getLocalData('user_id')
    this.selectedChargerIds = this._storageService.getSessionData(
      'chargerBoxId',
    )
    this.assetId = this._storageService.getSessionData('assetId') ?? 'N/A';
    this.chargerName = this._storageService.getSessionData('chargerName')
    this.userTimeZone=this._storageService.getLocalData('time_zone');
  }
  ngOnInit(): void {
    this.GetEventLogByLocation()
    this.getCommandList()
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator

  datePipe = new DatePipe('en-US')

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
      locationIds: [] as number[],
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
   * Download file using custom CSV generation
   */
  downloadFile() {
    let newObjArr: any = []

    for (let i = 0; i < this.eventLogList?.length; i++) {
      let newObj = {
        'REQUEST TYPE': this.eventLogList[i]['requestType'],
        DATE: this.datePipe.transform(
          this.eventLogList[i]['modifiedAt'],
          'dd-MM-yyyy h:mm',
        ),
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

    const blob = new Blob([csvArray], { type: 'text/csv' })
    fs.saveAs(
      blob,
      new Date().toDateString() + 'Charger-EventLog_AssetWorks.csv',
    )
  }

  // public downloadAsCSV() {
  //   var prepare: any = []
  //   this.eventLogList.forEach((e: any) => {
  //     var tempObj = []
  //     tempObj.push(e.requestType)
  //     tempObj.push(e.modifiedAt)
  //     tempObj.push(e.requestPayload)
  //     tempObj.push(e.responsePayload)
  //     prepare.push(tempObj)
  //   })
  //   let doc: any = new jsPDF()
  //   doc.autoTable({
  //     head: [['Type', 'Date/Time', 'RequestPayload', 'ResponsePayload']],
  //     body: prepare,
  //   })
  //   doc.save('download' + '.csv')
  // }

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
    if (event.pageSize == this.pageSize) {
      this.currentPage =
        event.previousPageIndex < event.pageIndex
          ? this.currentPage + 1
          : this.currentPage - 1
    } else {
      this.currentPage = 1
      this.pageSize = event.pageSize
      this.paginator.pageIndex = 0
    }

    this.GetEventLogByLocation()
  }

  openMakePaymentDialog(id: any) {
    const dialogRef = this.dialog.open(TransactionDialogComponent, {
     // width: '50%',
      autoFocus: false,
     // height: '600px',
      // panelClass: 'my-dialog-container-class2',
      data: { id: id },
    })
    dialogRef.afterClosed().subscribe((result) => {})
  }
}
export interface prepare {
  head: [['Type', 'Date/Time', 'RequestPayload', 'ResponsePayload']]
  body: prepare
}
