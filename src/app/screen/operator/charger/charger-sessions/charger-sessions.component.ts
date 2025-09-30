import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { Router, RouterModule } from '@angular/router'
import { AuthService } from 'src/app/service/auth/auth.service'
import { StorageService } from 'src/app/service/storage.service'
import { ChargerService } from '../charger.service'
// import jsPDF from 'jspdf'
// import 'jspdf-autotable'
import { MatDialog } from '@angular/material/dialog'
import { MeterDialogComponent } from './meter-dialog/meter-dialog.component'
import * as fs from 'file-saver'
import { CommonModule, DatePipe } from '@angular/common'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'

export interface PeriodicElement {
  sessionid: number
  duration: number
  usage: number
  starttime: number
  endtime: number
}

@Component({
  selector: 'app-charger-sessions',
  templateUrl: './charger-sessions.component.html',
  styleUrls: ['./charger-sessions.component.scss'],
  imports:[
    CommonModule,
    RouterModule,
    SharedMaterialModule
  ]
})
export class ChargerSessionsComponent implements OnInit {
  currentPage = 1
  totalRecords = 30
  pageSize = 10
  totalPages = 0
  searchParam = 'All'
  locationId: any
  arrKeys: any = ['All']
  searchKey: string = ''
  isTableHasData = false
  eventLogList: any

  showLocationNav: boolean = false

  @ViewChild(MatPaginator) paginator!: MatPaginator

  displayedColumns: string[] = [
    'assetId',
    'sessionid',
    'duration',
    'usage',
    'starttime',
    'endtime',
  ]

  dataSource = new MatTableDataSource<PeriodicElement>()

  UserId: string | null
  chargerName: string | null
  selecteChargerIds: string | null
  chargerBoxId: any
  datePipe = new DatePipe('en-US')
  userTimeZone:any;

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Rows per page'
  }

  constructor(
    private _router: Router,
    private _auth: AuthService,
    public dialog: MatDialog,
    private _storageService: StorageService,
    private _chargerService: ChargerService,
  ) {
    this.UserId = this._storageService.getLocalData('user_id')
    this.selecteChargerIds = this._storageService.getSessionData('chargerBoxId')

    this.chargerName = this._storageService.getSessionData('chargerName')
    this.userTimeZone = this._storageService.getLocalData('time_zone');
  }

  ngOnInit(): void {
    this.GetChargerSessionDetailsList('', this.currentPage, this.totalRecords)
  }

  @ViewChild('pdfTable', { static: false })
  pdfTable!: ElementRef

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  GetChargerSessionDetailsList(
    event: any,
    currentPage: number,
    totalPage: number,
  ) {
    this.pageSize = event !== undefined && event !== '' ? event.pageSize : 10
    this.displayedColumns = [
      'assetId',
      'sessionid',
      'duration',
      'usage',
      'starttime',
      'endtime',
    ]
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
      // searchParam: this.searchParam == 'All' ? '' : this.searchParam,
      searchParam: this.searchKey,
      pageSize: this.pageSize,
      orderBy: '',
      // locationIds: [],
      // locationIds: this.locationId ? [this.locationId] : [],
      // opratorid: '',
      chargerboxid: [this.selecteChargerIds],
      status: [] as string[],
    }

    this._chargerService
      .GetChargerSessionDetailsList(body)
      .subscribe((res: any) => {
        if (res.data !== undefined && res.data != null && res.data.length > 0) {
          for (let i = 0; i < res.data.length; i++) {
            if (this.arrKeys.indexOf(res.data[i].requestType) == -1) {
              this.arrKeys.push(res.data[i].requestType)
            }
          }
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

  /**
   *
   * @param obj
   * download as csv file
   */
  downloadFile() {
    let newObjArr: any = []

    for (var i = 0; i < this.eventLogList.length; i++) {
      let newObj = {
        'ASSET ID': this.eventLogList[i]['assetId'],
        'SESSION ID': this.eventLogList[i]['sessionid'],
        'DURATION (HH:MM:SS)': this.eventLogList[i]['duration'],
        'USAGE (kWh)': this.eventLogList[i]['usage'],
        'START TIME': this.eventLogList[i]['startTime'],
        'END TIME': this.datePipe.transform(
          this.eventLogList[i]['endTime'],
          'dd-MM-yyyy h:mm',this.userTimeZone
        ),
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
    fs.saveAs(blob, new Date().toDateString() + '_AssetWorks.csv')
  }

  // public downloadAsPDF() {
  //   var prepare: any = []
  //   this.eventLogList.forEach((e: any) => {
  //     var tempObj = []
  //     tempObj.push(e.sessionid)
  //     tempObj.push(e.duration)
  //     tempObj.push(e.usage)
  //     tempObj.push(e.startTime)
  //     tempObj.push(e.endTime)
  //     // tempObj.push(e.requestPayload)
  //     // tempObj.push(e.responsePayload)
  //     prepare.push(tempObj)
  //   })
  //   let doc: any = new jsPDF()
  //   doc.autoTable({
  //     head: [
  //       [
  //         'SESSION ID',
  //         'DURATION (HH:MM:SS)',
  //         'USAGE (KWH)',
  //         'START TIME',
  //         'END TIME',
  //         // 'RequestPayload',
  //         // 'ResponsePayload',
  //       ],
  //     ],
  //     body: prepare,
  //   })
  //   doc.save('download' + '.pdf')
  // }

  showMeterPopup(value: any) {
    const dialogRef = this.dialog.open(MeterDialogComponent, {
      width: '30%',
      autoFocus: false,
      // panelClass: 'my-dialog-container-class2',
      data: { usage: value },
    })
    dialogRef.afterClosed().subscribe((result) => {})
  }
}
