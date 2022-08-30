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
  selecteChargerIds: string | null
  jsPDF: any
  locationId: any
  searchParam = 'All'
  dataSource = new MatTableDataSource<any>()
  displayedColumns: any
  isTableHasData = false
  expandedElement: any

  arrKeys: any = [{ id: '0', value: 'All' }]
  currentPage = 1
  totalRecords: any
  pageSize = 10
  totalPages = 0
  chargerBoxId: any
  eventLogList: any
  constructor(
    public _alertsService: AlertsService,
    private _storageService: StorageService,
    private _locationService: LocationService,
    private _chargerService: ChargerService,
  ) {
    this.UserId = this._storageService.getLocalData('user_id')
    this.selecteChargerIds = this._storageService.getSessionData('chargerBoxId')

    this.chargerName = this._storageService.getSessionData('chargerName')
  }
  ngOnInit(): void {
    // this.getAlertsList()
    this.getChargerEventLogTable('', this.currentPage, this.totalRecords)

    this.getCommandList()
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator

  @ViewChild('pdfTable', { static: false })
  pdfTable!: ElementRef

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator
    this.paginator._intl.itemsPerPageLabel = 'Rows per page'
  }

  // dataSource = new MatTableDataSource<any>(this.AlertList)
  columnsToDisplay = ['Reset', 'Datetime', 'action']

  //displayedColumns = ['Reset', 'Datetime', 'action']
  // expandedElement!: any | null

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  /**
   * Get Alerts List
   */

  getAlertsList() {
    this._alertsService.getAlertsList().subscribe((res) => {
      // console.log(res)
    })
  }

  selectOption(event: any) {
    //getted from event
    // console.log(id);
    //getted from binding
    this.searchParam = event.target.value
    // console.log(this.searchParam)

    this.getChargerEventLogTable('', this.currentPage, this.totalRecords)
  }
  // getChargerEventLogTable(){

  //   this._locationService.getEventLogTableData().subscribe((res) => {
  //      console.log(res)
  //   })
  // }

  getChargerEventLogTable(event: any, currentPage: number, totalPage: number) {
    // alert(this.selecteChargerIds)
    this.pageSize = event !== undefined && event !== '' ? event.pageSize : 10
    this.displayedColumns = ['Reset', 'Datetime', 'action']
    this.currentPage =
      event !== undefined && event !== ''
        ? event.previousPageIndex < event.pageIndex
          ? currentPage + 1
          : currentPage - 1
        : 1
    if (this.currentPage == 0) {
      this.currentPage = this.currentPage + 1
    }

    const body = {
      pageNumber: this.currentPage,
      searchParam: this.searchParam == 'All' ? '' : this.searchParam,
      // searchParam: '',
      pageSize: this.pageSize,
      orderBy: '',
      // locationIds: [],
      locationIds: this.locationId ? [this.locationId] : [],
      opratorid: '',
      chargerBoxIds: [
        this.selecteChargerIds,
        //  "CH01"
      ],
    }

    this._locationService.getEventLogTableData(body).subscribe((res: any) => {
      if (res.data !== undefined && res.data != null && res.data.length > 0) {
        // for (let i = 0; i < res.data.length; i++) {
        //   if (this.arrKeys.indexOf(res.data[i].requestType) == -1) {
        //     this.arrKeys.push(res.data[i].requestType)
        //   }
        // }
        this.eventLogList = res.data
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

  /****Download Function***** ****/
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
   * Get Command List
   */
  getCommandList() {
    this._chargerService.GetCommandList().subscribe((res) => {
      this.arrKeys.push(...res.data)
    })
  }
}
