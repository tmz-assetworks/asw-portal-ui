import { Component, DebugEventListener, OnInit, ViewChild } from '@angular/core'
import { EChartsOption } from 'echarts'
import { Location } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router'
import { DashboardService } from '../dashboard/dashboard.service'
import { StorageService } from 'src/app/service/storage.service'
import { MatTableDataSource } from '@angular/material/table'

import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { MatPaginator } from '@angular/material/paginator'

@Component({
  selector: 'app-graph-detail',
  templateUrl: './graph-detail.component.html',
  styleUrls: ['./graph-detail.component.scss'],
})
export class GraphDetailComponent implements OnInit {
  graphId = 0

  graphHeading: any

  infra: any
  infrakey: any
  infraValue: any
  charger: any
  chargerkey: any
  chargervalue: any
  energyUsedkey0: any
  energyUsed: any
  energyUsedvalue0: any
  energyUsedkey1: any
  energyUsedvalue1: any
  energyUsedkey2: any
  energyUsedvalue2: any
  energyPointskey0: any
  energyPointsvalue0: any
  energyPointskey1: any
  energyPointsvalue1: any
  key: any
  revenue: any
  revenueValue0: any
  revenuekey0: any
  energyPoints: any
  dataSet: any
  chartOption: any
  summaryData: any

  duration: any = 1

  UserId: string | null
  chartList = []
  displayedColumns: string[] = [
    'chargerName',
    'uid',
    'chargerType',
    'faultSince',
    'faultDescription',
    'timeReported',
    'locationId',
    'locationName',
  ]

  isTableHasData: any
  flag: any

  currentPage = 1
  totalRecords = 30
  pageSize = 10
  totalPages = 0
  pageHeading: string | null
  searchParam: any
  locationId: any
  chargeBoxId: any
  url: any

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _location: Location,
    private _dashboardService: DashboardService,
    public _storageService: StorageService,
  ) {
    this.graphHeading = this._storageService.getSessionData('graphHeading')
    this.pageHeading = this._storageService.getSessionData('pageHeading')
    this.duration = this._storageService.getSessionData('duration')

    this.UserId = this._storageService.getLocalData('user_id')
  }

  ngOnInit(): void {
    this.chargeBoxId = this._storageService.getSessionData('chargerBoxId')
    this.url = window.location.href.toLowerCase().includes('chargers')

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
        this.GetChartDetailsList(
          '',
          this.currentPage,
          this.totalRecords,
          this.flag,
        )
      } else if (this.graphId == 4) {
        this.flag = 'locationStatus'
        this.GetChartDetailsList(
          '',
          this.currentPage,
          this.totalRecords,
          this.flag,
        )
      }
    })
    this.getSummaryData()
  }

  /**
   * Get summary data
   */

  getSummaryData() {
    this._dashboardService.GetSummaryData(0).subscribe((res) => {
      this.summaryData = res.data[0]

      this.infra = this.summaryData.chargingInfustructure[0]
      this.infrakey = this.infra.key
      this.infraValue = this.infra.value

      this.charger = this.summaryData.chargingInfustructure[1]

      this.chargerkey = this.charger.key
      this.chargervalue = this.charger.value

      //revenue chart
      this.dataSet = this.summaryData.revenue
      this.chartOption = this.setRevenueOptions(this.dataSet) as EChartsOption

      // EnergyUsed
      this.energyUsed = this.summaryData.energyUsed[0]
      this.energyUsedkey0 = this.energyUsed.key
      this.energyUsedvalue0 = this.energyUsed.value

      this.energyUsed = this.summaryData.energyUsed[1]
      this.energyUsedkey1 = this.energyUsed.key
      this.energyUsedvalue1 = this.energyUsed.value

      this.energyUsed = this.summaryData.energyUsed[2]
      this.energyUsedkey2 = this.energyUsed.key
      this.energyUsedvalue2 = this.energyUsed.value

      //EnergyPoints
      this.energyPoints = this.summaryData.energyPoints[0]
      this.energyPointskey0 = this.energyPoints.key.replace('MT', 'Metric Tons')
      this.energyPointsvalue0 = this.energyPoints.value

      this.energyPoints = this.summaryData.energyPoints[1]
      this.energyPointskey1 = this.energyPoints.key
      this.energyPointsvalue1 = this.energyPoints.value
    })
  }

  setRevenueOptions(data: any) {
    const legends = data.map((acc: any) => `${acc.key}`)
    const values = data.map((acc: any) => `${acc.value}`)
    return {
      tooltip: {
        trigger: 'axis',
        position: ['15%', '20%'],
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: legends,
        icon: 'circle',
        right: 10,
        top: 'bottom',
      },
      grid: {
        left: '0%',
        right: '8%',
        bottom: '20%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        // name: 'USD',
        // nameLocation: 'middle',
        // nameGap: 50,
        data: values,
        axisLabel: {
          rotate: 30,
          formatter: '${value}',
        },
      },
      yAxis: {
        type: 'value',
        show: false,
      },
      series: [
        {
          name: 'Placeholder',
          type: 'bar',
          stack: 'Total',
          itemStyle: {
            borderColor: 'transparent',
            color: 'transparent',
          },
          emphasis: {
            itemStyle: {
              borderColor: 'transparent',
              color: 'transparent',
            },
          },
        },
        {
          name: 'Total Revenue',
          type: 'bar',
          stack: 'Total',
          itemStyle: {
            color: '#90993F',
          },
          data: [values[0], '-', '-'],
        },
        {
          name: 'Daily Revenue',
          type: 'bar',
          stack: 'Total',
          itemStyle: {
            color: '#E97300',
          },
          data: ['-', values[1], '-'],
        },
        {
          name: "Today's Revenue",
          type: 'bar',
          stack: 'Total',
          itemStyle: {
            color: '#0062A6',
          },
          data: ['-', '-', values[2]],
        },
      ],
    }
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator
    this.paginator._intl.itemsPerPageLabel = 'Rows per page'
  }
  dataSource = new MatTableDataSource<any>(this.chartList)
  goback() {
    this._location.back()
  }
  /**
   * Get Chart Details
   */
  GetChartDetailsList(
    event: any,
    currentPage: number,
    totalRecords: number,
    flag: any,
  ) {
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
      searchParam: this.url ? this.chargeBoxId : '',
      pageSize: this.pageSize,
      orderBy: '',
      duration: this.duration.toString(),
      opratorid: this.UserId,
      locationIds: this.locationId ? [this.locationId] : [],
      flag: flag,
    }
    this._dashboardService.GetChartDetailsList(pBody).subscribe((res) => {
      if (res.data !== undefined && res.data != null && res.data.length > 0) {
        this.totalRecords = res.paginationResponse.totalCount
        this.totalPages = res.paginationResponse.totalPages
        this.chartList = res.data
        this.dataSource.data = this.chartList
        this.isTableHasData = false
      } else {
        this.dataSource.data = []
        this.isTableHasData = true
      }
    })
  }
  public downloadAsPDF() {
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
