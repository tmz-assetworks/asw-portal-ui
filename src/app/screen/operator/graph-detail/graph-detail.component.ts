import { Component, OnInit, ViewChild } from '@angular/core'
import { DatePipe, Location } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router'
import { DashboardService } from '../dashboard/dashboard.service'
import { StorageService } from 'src/app/service/storage.service'
import { MatTableDataSource } from '@angular/material/table'
import { ToastrService } from 'ngx-toastr'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { MatPaginator } from '@angular/material/paginator'
import { FormBuilder, FormControl } from '@angular/forms'
import * as fs from 'file-saver'

@Component({
  selector: 'app-graph-detail',
  templateUrl: './graph-detail.component.html',
  styleUrls: ['./graph-detail.component.scss'],
})
export class GraphDetailComponent implements OnInit {
  totalCount: any
  pageSize: number = 10
  currentPage: number = 1
  totalPages: any
  pageSizeOptions = [10, 20, 100]
  searchParam = ''

  graphId = 0

  graphHeading: any

  summaryData: any

  duration: any = 1

  UserId: string | null

  isTableHasData = false
  flag: any
  pageHeading: string | null
  locationId: any
  chargeBoxId: any
  url: any
  chartList = []
  chartListFilter = []
  isCharger: any
  displayedColumns: string[] = []
  displayedColumnsLocation: string[] = []

  datePipe = new DatePipe('en-US')

  statusListForOthers = [
    {
      name: 'Cancelled',
    },
    {
      name: 'Completed',
    },
    {
      name: 'Interrupted',
    },
    {
      name: 'Charging',
    },
  ]
  statusListForChargerInUse = [
    {
      name: 'Available',
    },
    {
      name: 'Unavailable',
    },
  ]
  statusList: any = []

  searchFilter = this._fb.group({
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    status: new FormControl(),
  })

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _location: Location,
    private _dashboardService: DashboardService,
    public _storageService: StorageService,
    public _fb: FormBuilder,
    private _toastr: ToastrService,
  ) {
    this.graphHeading = this._storageService.getSessionData('graphHeading')
    this.pageHeading = this._storageService.getSessionData('pageHeading')
    this.duration = this._storageService.getSessionData('duration')
    this.UserId = this._storageService.getLocalData('user_id')
  }

  ngOnInit(): void {
    this.chargeBoxId = this._storageService.getSessionData('chargerBoxId')
    this.locationId = this._storageService.getSessionData('locationId')

    this._activatedRoute.queryParams.subscribe((params) => {
      this.graphId = JSON.parse(params['id'])

      if (this.graphId == 5 || this.graphId == 1) {
        this.statusList = this.statusListForChargerInUse
      } else {
        this.statusList = this.statusListForOthers
      }
      if (
        this.graphId == 1 ||
        this.graphId == 2 ||
        this.graphId == 3 ||
        this.graphId == 5 ||
        this.graphId == 6 ||
        this.graphId == 7 ||
        this.graphId == 8
      ) {
        this.flag = 'chargerSession'
        this.isCharger = true
        this.displayedColumns = [
          'chargerName',
          'chargerType',
          'faultSince',
          'timeReported',
          //'locationId',
          'locationName',
          'chargingStatus',
          'startTime',
          'endTime',
          'startmetervalue',
          'endmetervalue',
          'reasoneForStop',
        ]
        this.GetChartDetailsList(this.flag)
      } else if (this.graphId == 4) {
        this.flag = 'locationStatus'
        this.isCharger = false
        this.displayedColumnsLocation = [
          'chargerName',
          // 'uid',
          'chargerType',
          'faultSince',
          // 'faultDescription',
          'timeReported',
          // 'locationId',
          'locationName',
        ]
        this.GetChartDetailsList(this.flag)
      }
    })
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Rows per page'
  }
  dataSource = new MatTableDataSource<any>()
  goback() {
    this._location.back()
  }
  /**
   * Get Chart Details
   */
  GetChartDetailsList(flag: any, searchValue?: any) {
    const pBody = {
      pageNumber: this.currentPage,
      searchParam: '',
      pageSize: this.pageSize,
      orderBy: '',
      chargeBoxId: this.chargeBoxId ? this.chargeBoxId : '',
      duration: this.duration.toString(),
      opratorid: this.UserId,
      locationIds: this.locationId ? [this.locationId] : [],
      flag: flag,
      fromdate: searchValue
        ? this.datePipe.transform(
            searchValue.fromDate,
            'yyyy-MM-ddT' + this.getModifiedDate(),
          )
        : '',
      todate: searchValue
        ? this.datePipe.transform(
            searchValue.toDate,
            'yyyy-MM-ddT' + this.getModifiedDate(),
          )
        : '',
      status: searchValue && searchValue.status ? searchValue.status : [],
      chartType: this.graphId == 5 || this.graphId == 1 ? 'chargerinuse' : '',
    }
    this._dashboardService.GetChartDetailsList(pBody).subscribe((res) => {
      if (res.data !== undefined && res.data != null && res.data.length > 0) {
        this.totalCount = res.paginationResponse.totalCount
        this.totalPages = res.paginationResponse.totalPages
        this.pageSize = res.paginationResponse.pageSize
        this.chartList = res.data
        this.chartListFilter = this.chartList
        this.dataSource.data = this.chartList
        this.isTableHasData = false
      } else {
        this.chartList = res.data
        this.chartListFilter = this.chartList

        this.dataSource.data = []
        this.isTableHasData = true
      }
    })
  }

  /**
   * export pdf
  //  */
  // public downloadAsPDF() {
  //   const pBody = {
  //     pageNumber: 1,
  //     searchParam: this.chargeBoxId ? this.chargeBoxId : '',
  //     pageSize: 0,
  //     orderBy: '',
  //     duration: this.duration.toString(),
  //     chargeBoxId: this.chargeBoxId ? this.chargeBoxId : '',
  //     opratorid: this.UserId,
  //     locationIds: this.locationId ? [this.locationId] : [],
  //     flag: this.flag,
  //     fromdate: this.searchFilter.value.fromDate,
  //     todate: this.searchFilter.value.toDate,
  //     status: [],
  //     isExport: true,
  //     chartType: this.graphId == 5 || this.graphId == 1 ? 'chargerinuse' : '',
  //   }
  //   this._dashboardService.GetChartDetailsList(pBody).subscribe((res) => {
  //     if (res.data !== undefined && res.data != null && res.data.length > 0) {
  //       this.chartListFilter = res.data
  //       if (this.flag != 'locationStatus') {
  //         // this.dataSource.data = this.chartListFilter
  //         //this.isTableHasData = false
  //       }
  //     } else {
  //       this.chartListFilter = res.data
  //       // this.dataSource.data = []
  //       // this.isTableHasData = true
  //     }
  //   })

  //   if (this.flag == 'chargerSession') {
  //     var prepare: any = []

  //     setTimeout(() => {
  //       this.chartListFilter.forEach((e: any) => {
  //         var tempObj = []
  //         tempObj.push(e.chargerName)

  //         tempObj.push(e.chargerType)

  //         tempObj.push(e.faultSince)

  //         tempObj.push(
  //           this.datePipe.transform(e.timeReported, 'dd-MM-yyyy h:mm'),
  //         )
  //         tempObj.push(e.locationId)
  //         tempObj.push(e.locationName)
  //         tempObj.push(e.chargingStatus)
  //         tempObj.push(this.datePipe.transform(e.startTime, 'dd-MM-yyyy h:mm'))
  //         tempObj.push(this.datePipe.transform(e.endTime, 'dd-MM-yyyy h:mm'))
  //         tempObj.push(e.startmetervalue)
  //         tempObj.push(e.endmetervalue)
  //         tempObj.push(e.reasoneForStop)
  //         prepare.push(tempObj)
  //       })
  //       let doc: any = new jsPDF()
  //       doc.autoTable({
  //         head: [
  //           [
  //             'ChargerName',

  //             'ChargerType',

  //             'FaultSince',

  //             'TimeReported',

  //             'LocationId',

  //             'LocationName',

  //             'ChargingStatus',

  //             'StartTime',

  //             'EndTime',

  //             'StartMeterValue',

  //             'EndMeterValue',

  //             'ReasonForStop',
  //           ],
  //         ],
  //         columnStyles: {
  //           // 10: { cellWidth: 20 },
  //           1: { cellWidth: 10 },
  //           4: { cellWidth: 10, columnWidth: 'auto' },
  //           5: { cellWidth: 20, columnWidth: 'auto' },
  //           3: { cellWidth: 20, columnWidth: 'auto' },
  //           8: { cellWidth: 20, columnWidth: 'auto' },
  //           9: { cellWidth: 20, columnWidth: 'auto' },
  //           10: { cellWidth: 20, columnWidth: 'auto' },

  //           // 2: {cellWidth: 80},
  //           // etc
  //         },
  //         body: prepare,
  //       })

  //       doc.save('download' + '.pdf')
  //     }, 5000)
  //   } else {
  //     var prepare: any = []
  //     setTimeout(() => {
  //       this.chartListFilter.forEach((e: any) => {
  //         var tempObj = []
  //         tempObj.push(e.chargerName)
  //         tempObj.push(e.uid)
  //         tempObj.push(e.chargerType)
  //         tempObj.push(e.faultSince)
  //         tempObj.push(e.faultDescription)
  //         tempObj.push(
  //           this.datePipe.transform(e.timeReported, 'dd-MM-yyyy h:mm'),
  //         )
  //         tempObj.push(e.locationId)
  //         tempObj.push(e.locationName)
  //         prepare.push(tempObj)
  //       })
  //       let doc: any = new jsPDF()
  //       doc.autoTable({
  //         head: [
  //           [
  //             'ChargerName',

  //             'UID',

  //             'ChargerType',

  //             'FaultSince',

  //             'FaultDescription',

  //             'TimeReported',

  //             'LocationId',

  //             'LocationName',
  //           ],
  //         ],
  //         columnStyles: {
  //           // 10: { cellWidth: 20 },

  //           5: { cellWidth: 20, columnWidth: 'auto' },

  //           // 2: {cellWidth: 80},
  //           // etc
  //         },
  //         body: prepare,
  //       })
  //       doc.save('download' + '.pdf')
  //     }, 5000)
  //   }
  // }

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

    this.GetChartDetailsList(this.flag, this.searchFilter.value)
  }

  /**
   * filter record on submit
   */

  filter() {
    if (this.searchFilter.value.fromDate && this.searchFilter.value.toDate) {
      this.GetChartDetailsList(this.flag, this.searchFilter.value)
    } else if (this.searchFilter.value.status) {
      this.GetChartDetailsList(this.flag, this.searchFilter.value)
    } else {
      this._toastr.error('Please select Start/End Date first.')
    }
  }

  /**
   * check start date validation
   */
  checkStartDate() {
    if (this.searchFilter.value.fromDate > this.searchFilter.value.toDate) {
      this.searchFilter.patchValue({ toDate: '' })
    }
  }
  /**
   * reset filter
   */
  resetFilter() {
    this.searchFilter.reset()
    this.GetChartDetailsList(this.flag)
  }
  /**
   * Check valid from date
   * @param e
   * @returns
   */

  checkValidFrom(e: any) {
    let fromDate = this.searchFilter.value.fromDate
    if (!fromDate) {
      this._toastr.error('Please select valid start date first.')
      this.searchFilter.patchValue({ toDate: '' })
      return
    }
    if (fromDate) {
    }
  }
  /**
   * date filter for valid to date
   * @param d
   * @returns
   */

  dateFilterForStart = (d: any | null) => {
    let todayDate = new Date()
    return d <= todayDate
  }
  dateFilterForEnd = (d: any | null) => {
    let fromDate = this.searchFilter.value.fromDate
    return d >= fromDate
  }

  getModifiedDate() {
    let date = new Date()
    let time = this.datePipe.transform(date, 'HH:mm:ss')
    return time
  }

  /**
   * download as csv
   * @param data
   */

  downloadFile() {
    const pBody = {
      pageNumber: 1,
      searchParam: this.chargeBoxId ? this.chargeBoxId : '',
      pageSize: 0,
      orderBy: '',
      duration: this.duration.toString(),
      chargeBoxId: this.chargeBoxId ? this.chargeBoxId : '',
      opratorid: this.UserId,
      locationIds: this.locationId ? [this.locationId] : [],
      flag: this.flag,
      fromdate: this.searchFilter.value.fromDate,
      todate: this.searchFilter.value.toDate,
      status: [],
      isExport: true,
      chartType: this.graphId == 5 || this.graphId == 1 ? 'chargerinuse' : '',
    }

    this._dashboardService.GetChartDetailsList(pBody).subscribe((res) => {
      if (res.data !== undefined && res.data != null && res.data.length > 0) {
        this.chartListFilter = res.data
        // if (this.flag != 'locationStatus') {
        // this.dataSource.data = this.chartListFilter
        //this.isTableHasData = false
      }
      // } else {
      //   this.chartListFilter = res.data
      //   // this.dataSource.data = []
      //   // this.isTableHasData = true
      // }
      let newObjArr: any = []
      if (this.flag == 'chargerSession') {
        for (var i = 0; i < this.chartListFilter.length; i++) {
          let newObj = {
            'CHARGER NAME': this.chartListFilter[i]['chargerName'],
            'CHARGER TYPE': this.chartListFilter[i]['chargerType'],
            'FAULT SINCE': this.chartListFilter[i]['faultSince'],
            'TIME REPORTED': this.datePipe.transform(
              this.chartListFilter[i]['timeReported'],
              'dd-MM-yyyy h:mm',
            ),
            'LOCATION NAME': this.chartListFilter[i]['locationName'],
            'CHARGING STATUS': this.chartListFilter[i]['chargingStatus'],
            'START TIME': this.datePipe.transform(
              this.chartListFilter[i]['startTime'],
              'dd-MM-yyyy h:mm',
            ),
            'END TIME': this.datePipe.transform(
              this.chartListFilter[i]['endTime'],
              'dd-MM-yyyy h:mm',
            ),
            'START METER VALUE': this.chartListFilter[i]['startmetervalue'],
            'END METER VALUE': this.chartListFilter[i]['endmetervalue'],
            'REASON FOR STOP': this.chartListFilter[i]['reasoneForStop'],
          }

          //PUSH INTO NEW ARRAY

          newObjArr.push(newObj)
        }

        this.convertToCSV(newObjArr)
      } else {
        for (var i = 0; i < this.chartListFilter.length; i++) {
          let newObj = {
            'CHARGER NAME': this.chartListFilter[i]['chargerName'],
            UID: this.chartListFilter[i]['chargerType'],
            'CHARGER TYPE': this.chartListFilter[i]['chargerType'],
            'FAULT SINCE': this.chartListFilter[i]['faultSince'],
            'FAULT DESCRIPTION': this.chartListFilter[i]['faultDescription'],
            'TIME REPORTED': this.datePipe.transform(
              this.chartListFilter[i]['timeReported'],
              'dd-MM-yyyy h:mm',
            ),
            'LOCATION NAME': this.chartListFilter[i]['locationName'],
          }
          //PUSH INTO NEW ARRAY
          newObjArr.push(newObj)
        }

        this.convertToCSV(newObjArr)
      }
    })
  }
  /**
   *
   * @param obj
   * download as csv file
   */
  convertToCSV(obj: any) {
    const replacer = (key: any, value: any) => (value === null ? '' : value) // specify how you want to handle null values here
    const header = Object.keys(obj[0])

    let csv = obj.map((row: any) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(','),
    )

    csv.unshift(header.join(','))
    let csvArray = csv.join('\r\n')

    var blob = new Blob([csvArray], { type: 'text/csv' })
    fs.saveAs(blob, new Date().toDateString() + '_AssetWorks.csv')
  }
}
