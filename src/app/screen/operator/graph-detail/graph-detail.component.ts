import { Component, OnInit, ViewChild } from '@angular/core'

import { Location } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router'
import { DashboardService } from '../dashboard/dashboard.service'
import { StorageService } from 'src/app/service/storage.service'
import { MatTableDataSource } from '@angular/material/table'

import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { MatPaginator } from '@angular/material/paginator'
import { FormBuilder, FormControl } from '@angular/forms'

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
  isCharger: any
  displayedColumns: string[] = []
  displayedColumnsLocation: string[] = []

  statusList = [
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
          'uid',
          'chargerType',
          'faultSince',
          'faultDescription',
          'timeReported',
          'locationId',
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
          'uid',
          'chargerType',
          'faultSince',
          'faultDescription',
          'timeReported',
          'locationId',
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
      searchParam: this.url ? this.chargeBoxId : '',
      pageSize: this.pageSize,
      orderBy: '',
      duration: this.duration.toString(),
      opratorid: this.UserId,
      locationIds: this.locationId ? [this.locationId] : [],
      flag: flag,
      fromdate: searchValue ? searchValue.fromDate : '',
      todate: searchValue ? searchValue.toDate : '',
      status: searchValue ? searchValue.status : [],
    }
    this._dashboardService.GetChartDetailsList(pBody).subscribe((res) => {
      if (res.data !== undefined && res.data != null && res.data.length > 0) {
        this.totalCount = res.paginationResponse.totalCount
        this.totalPages = res.paginationResponse.totalPages
        this.pageSize = res.paginationResponse.pageSize
        this.chartList = res.data
        this.dataSource.data = this.chartList
        this.isTableHasData = false
      } else {
        this.chartList = res.data
        this.dataSource.data = []
        this.isTableHasData = true
      }
    })
  }
  public downloadAsPDF() {
    if (this.flag == 'chargerSession') {
      var prepare: any = []
      this.chartList.forEach((e: any) => {
        var tempObj = []
        tempObj.push(e.chargerName)
        tempObj.push(e.uid)
        tempObj.push(e.chargerType)
        tempObj.push(e.faultSince)
        tempObj.push(e.faultDescription)
        tempObj.push(e.timeReported)
        tempObj.push(e.locationId)
        tempObj.push(e.locationName)
        tempObj.push(e.startTime)
        tempObj.push(e.endTime)
        tempObj.push(e.startmetervalue)
        tempObj.push(e.endmetervalue)
        tempObj.push(e.reasoneForStop)
        prepare.push(tempObj)
      })
      let doc: any = new jsPDF()
      doc.autoTable({
        head: [
          [
            'ChargerName',

            'UID',

            'ChargerType',

            'FaultSince',

            'FaultDescription',

            'TimeReported',

            'LocationId',

            'LocationName',

            'StartTime',

            'EndTime',

            'StartMeterValue',

            'EndMeterValue',

            'ReasonForStop',
          ],
        ],
        body: prepare,
      })
      doc.save('download' + '.pdf')
    } else {
      var prepare: any = []
      this.chartList.forEach((e: any) => {
        var tempObj = []
        tempObj.push(e.chargerName)
        tempObj.push(e.uid)
        tempObj.push(e.chargerType)
        tempObj.push(e.faultSince)
        tempObj.push(e.faultDescription)
        tempObj.push(e.timeReported)
        tempObj.push(e.locationId)
        tempObj.push(e.locationName)
        prepare.push(tempObj)
      })
      let doc: any = new jsPDF()
      doc.autoTable({
        head: [
          [
            'ChargerName',

            'UID',

            'ChargerType',

            'FaultSince',

            'FaultDescription',

            'TimeReported',

            'LocationId',

            'LocationName',
          ],
        ],
        body: prepare,
      })
      doc.save('download' + '.pdf')
    }
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

    this.GetChartDetailsList(this.flag)
  }

  /**
   * filter record
   */

  filter() {
    this.GetChartDetailsList(this.flag, this.searchFilter.value)
  }
  resetFilter() {
    this.searchFilter.reset()
    this.GetChartDetailsList(this.flag)
  }
}
