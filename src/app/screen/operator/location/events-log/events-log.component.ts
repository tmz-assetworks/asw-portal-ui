import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { EChartsOption } from 'echarts'
import { LocationService } from './../location.service'
import { animate, state, style, transition, trigger } from '@angular/animations'
import { StorageService } from 'src/app/service/storage.service'

import { ChargerService } from '../../charger/charger.service'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

export interface PeriodicElement {
  categorybox_id: string
  category: string
  message_type: string
  date_time: string
  ip_address: string
  location_time: string
  action: string
  position: number
  weight: number
  symbol: string
  description: string
}
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
  searchParam = 'All'
  dataSource = new MatTableDataSource<any>()
  displayedColumns: any
  isTableHasData = false
  expandedElement: any
  arrKeys: any = [{ id: '0', value: 'All' }]
  currentPage = 1
  totalRecords = 30
  pageSize = 10
  totalPages = 0
  requestType: any
  @ViewChild(MatPaginator) paginator!: MatPaginator
  eventLogList: any
  constructor(
    public _locationService: LocationService,
    private _storageService: StorageService,
    private _chargerService: ChargerService,
  ) {
    this.locationName = this._storageService.getSessionData('locationName')
    this.locationId = this._storageService.getSessionData('locationId')
    this.locationId = JSON.parse(this.locationId)
    this.UserId = this._storageService.getLocalData('user_id')
  }
  ngOnInit(): void {
    this.getLocationEventLogTableData('', this.currentPage, this.totalRecords)
    this.getCommandList()
  }

  @ViewChild('pdfTable', { static: false })
  pdfTable!: ElementRef

  // option: EChartsOption = {
  //   tooltip: {
  //     trigger: 'axis',
  //     axisPointer: {
  //       type: 'shadow',
  //     },
  //   },
  //   legend: {
  //     data: ['Total Revenue', 'Daily Revenue', "Today's Revenue"],
  //     icon: 'circle',
  //     right: 10,
  //     top: 'bottom',
  //   },
  //   grid: {
  //     left: '0%',
  //     right: '8%',
  //     bottom: '15%',
  //     containLabel: true,
  //   },
  //   xAxis: {
  //     type: 'category',
  //     data: ['990.71', '412.14', '408.07'],
  //     // data: (function () {
  //     //   let list = [];
  //     //   for (let i = 1; i <= 11; i++) {
  //     //     list.push('Nov ' + i);
  //     //   }
  //     //   return list;
  //     // })()
  //     // axisLabel: {
  //     //   rotate: 30,
  //     // },
  //   },
  //   yAxis: {
  //     type: 'value',
  //     show: false,
  //   },
  //   series: [
  //     {
  //       name: 'Placeholder',
  //       type: 'bar',
  //       stack: 'Total',
  //       itemStyle: {
  //         borderColor: 'transparent',
  //         color: 'transparent',
  //       },
  //       emphasis: {
  //         itemStyle: {
  //           borderColor: 'transparent',
  //           color: 'transparent',
  //         },
  //       },
  //       // data: [0, 900, 1245, 1530, 1376, 1376, 1511, 1689, 1856, 1495, 1292]
  //     },
  //     {
  //       name: 'Total Revenue',
  //       type: 'bar',
  //       stack: 'Total',
  //       itemStyle: {
  //         color: '#90993F',
  //       },
  //       data: [990.71, '-', '-'],
  //     },
  //     {
  //       name: 'Daily Revenue',
  //       type: 'bar',
  //       stack: 'Total',
  //       itemStyle: {
  //         color: '#E97300',
  //       },
  //       data: ['-', 412.14, '-'],
  //     },
  //     {
  //       name: "Today's Revenue",
  //       type: 'bar',
  //       stack: 'Total',
  //       itemStyle: {
  //         color: '#0062A6',
  //       },
  //       data: ['-', '-', 408.07],
  //     },
  //   ],
  // }

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Rows per page'
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value
  //   // this.dataSource.filter = filterValue.trim().toLowerCase()
  // }

  /**
   * Filter Operation type
   * @param event
   */
  selectOption(event: any) {
    //getted from event
    // console.log(id);
    //getted from binding
    this.searchParam = event.target.value
    // console.log(this.searchParam)

    this.getLocationEventLogTableData('', this.currentPage, this.totalRecords)
  }

  /* 
  Get Location Event Log List
  */

  getLocationEventLogTableData(
    event: any,
    currentPage: number,
    totalPage: number,
  ) {
    this.pageSize = event !== undefined && event !== '' ? event.pageSize : 10
    this.displayedColumns = ['Type', 'DateTime', 'SerialNumber', 'action']
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
      pageSize: this.pageSize,
      orderBy: '',
      // locationIds: [],
      locationIds: this.locationId ? [this.locationId] : [],
      opratorid: this.UserId,
      chargerBoxIds: [],
    }

    this._locationService.getEventLogTableData(body).subscribe((res: any) => {
      if (res.data !== undefined && res.data != null && res.data.length > 0) {
        this.eventLogList = res.data
        this.totalRecords = res.paginationResponse.totalCount
        this.totalPages = res.paginationResponse.totalPages
        this.dataSource.data = this.eventLogList
        this.isTableHasData = false
      } else {
        this.dataSource.data = []
        this.isTableHasData = true
      }
    })
  }

  public downloadAsPDF() {
    // const doc = new jsPDF()
    // const specialElementHandlers = {
    //   '#editor': function (element: any, renderer: any) {
    //     return true
    //   },
    // }
    // const pdfTable = this.pdfTable.nativeElement
    // doc.fromHTML(pdfTable.innerHTML, 15, 15, {
    //   width: 190,
    //   elementHandlers: specialElementHandlers,
    // })
    // doc.save('download.pdf')

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
      this.getLocationEventLogTableData('', this.currentPage, this.totalRecords)
    })
  }
}
