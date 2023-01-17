import { Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { ActivatedRoute } from '@angular/router'
import { StorageService } from 'src/app/service/storage.service'
import { DatePipe, Location } from '@angular/common'
import { ReportService } from '../reports.service'
import jsPDF from 'jspdf'

import * as fs from 'file-saver'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss'],
})
export class ReportDetailComponent implements OnInit {
  graphHeading: any
  pageHeading: any
  duration: any
  UserId: any
  totalCount: any
  pageSize: number = 10
  currentPage: number = 1
  totalPages: any
  pageSizeOptions = [10, 20, 100]
  isTableHasData = false
  graphId: any
  displayedColumnsSubscription: string[] = []
  displayedColumnsTransaction: string[] = []
  transactionList: any
  subscriptionList: any
  isSubscription: boolean = false
  datePipe = new DatePipe('en-US')
  chartList: any
  submitted = false
  constructor(
    private _storageService: StorageService,
    private _activatedRoute: ActivatedRoute,
    private _location: Location,
    private __reportService: ReportService,
    public _fb: FormBuilder,
    private _toastr: ToastrService,
  ) {
    this.graphHeading = this._storageService.getSessionData('graphHeading')
    this.pageHeading = this._storageService.getSessionData('pageHeading')
    this.duration = this._storageService.getSessionData('duration')
    this.UserId = this._storageService.getLocalData('user_id')
  }

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe((params) => {
      this.graphId = JSON.parse(params['id'])
    })

    if (this.graphId == 1 || this.graphId == 2 || this.graphId == 3) {
      this.isSubscription = true
      this.GetSubscriptionDetails(false)
      this.displayedColumnsSubscription = [
        'subscriptionPlan',
        'consumedEnergy',
        'consumedTime',
        'locationName',
        'vin',
        'rfid',
        'totalAmount',
        'createdOn',
      ]
    } else {
      this.isSubscription = false
      this.GetTransactionDetails(false)
      this.displayedColumnsTransaction = [
        'locationName',
        'vin',
        'rfid',
        'startTime',
        'endTime',
        'duration',
        'totalAmount',
        'consumedEnergy',
        'consumedTime',
        'createdOn',
      ]
    }
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Rows per page'
  }
  dataSource = new MatTableDataSource<any>()

  /**
   * Download pdf
   */

  downloadAsCSV() {
    if (this.graphId == 1 || this.graphId == 2 || this.graphId == 3) {
      const pBody = {
        pageNumber: 0,
        searchParam: '',
        pageSize: 0,
        operatorId: this.UserId,
        fromdate: this.searchFilter.value.fromDate,
        todate: this.searchFilter.value.toDate,
        isExport: true,
        locationId: [0],
        duration: '',
      }

      this.__reportService
        .GetSubscriptionDetails(pBody)
        .subscribe((res: any) => {
          if (
            res.data !== undefined &&
            res.data != null &&
            res.data.length > 0
          ) {
            this.chartList = res.data

            let newObjArr: any = []
            // if (this.flag == 'chargerSession') {
            for (var i = 0; i < this.chartList.length; i++) {
              let newObj = {
                'SUBSCRIPTION PLAN': this.chartList[i]['subscriptionPlan'],
                'CONSUMED ENERGY': this.chartList[i]['consumedEnergy'],
                'CONSUMED TIME': this.chartList[i]['consumedTime'],
                'LOCATION NAME': this.chartList[i]['locationName'],
                REMARK: this.chartList[i]['remark'],
                'SALES TAX': this.chartList[i]['salesTax'],
                'TRANSACTION FEE': this.chartList[i]['transactionFee'],
                'PARKING FEE': this.chartList[i]['parkingFee'],
                RFID: this.chartList[i]['rfid'],
                TAX: this.chartList[i]['tax'],
                'TOTAL AMOUNT': this.chartList[i]['totalAmount'],
                VIN: this.chartList[i]['vin'],
                'CREATED ON': this.datePipe.transform(
                  this.chartList[i]['createdOn'],
                  'dd-MM-yyyy h:mm',
                ),
              }

              //PUSH INTO NEW ARRAY

              newObjArr.push(newObj)
            }

            this.convertToCSV(newObjArr)

            // }

            // var prepare: any = []

            // setTimeout(() => {
            //   res.data.forEach((e: any) => {
            //     var tempObj = []
            //     tempObj.push(e.customerName)
            //     tempObj.push(e.pricingPlanName)
            //     tempObj.push(e.price)
            //     tempObj.push(e.createdOn)

            //     tempObj.push(
            //       this.datePipe.transform(e.timeReported, 'dd-MM-yyyy h:mm'),
            //     )

            //     prepare.push(tempObj)
            //   })
            //   let doc: any = new jsPDF()
            //   doc.autoTable({
            //     head: [
            //       ['Customer Name', 'Pricing Plan Name', 'Price', 'Created On'],
            //     ],
            //     columnStyles: {},
            //     body: prepare,
            //   })

            //   doc.save('download' + '.pdf')
            // }, 5000)
          }
        })
    } else {
      const pBody = {
        pageNumber: 0,
        searchParam: '',
        pageSize: 0,
        operatorId: this.UserId,
        fromdate: this.searchFilter.value.fromDate,
        todate: this.searchFilter.value.toDate,
        isExport: true,
        locationId: [0],
        duration: '',
      }

      this.__reportService
        .GetTransactionDetails(pBody)
        .subscribe((res: any) => {
          if (
            res.data !== undefined &&
            res.data != null &&
            res.data.length > 0
          ) {
            this.chartList = res.data

            let newObjArr: any = []
            // if (this.flag == 'chargerSession') {
            for (var i = 0; i < this.chartList.length; i++) {
              let newObj = {
                'LOCATION NAME': this.chartList[i]['locationName'],
                'CONSUMED ENERGY': this.chartList[i]['consumedEnergy'],
                'CONSUMED TIME': this.chartList[i]['consumedTime'],
                REMARK: this.chartList[i]['remark'],
                'SALES TAX': this.chartList[i]['salesTax'],
                'TRANSACTION FEE': this.chartList[i]['transactionFee'],
                'PARKING FEE': this.chartList[i]['parkingFee'],
                RFID: this.chartList[i]['rfid'],
                'START TIME': this.datePipe.transform(
                  this.chartList[i]['startTime'],
                  'dd-MM-yyyy h:mm',
                ),
                'END TIME': this.datePipe.transform(
                  this.chartList[i]['endTime'],
                  'dd-MM-yyyy h:mm',
                ),
                DURATION: this.chartList[i]['duration'],
                'UNIT COST': this.chartList[i]['unitCost'],
                TAX: this.chartList[i]['tax'],
                'TOTAL AMOUNT': this.chartList[i]['totalAmount'],
                VIN: this.chartList[i]['vin'],
                'CREATED ON': this.datePipe.transform(
                  this.chartList[i]['createdOn'],
                  'dd-MM-yyyy h:mm',
                ),
              }

              //PUSH INTO NEW ARRAY

              newObjArr.push(newObj)
            }

            this.convertToCSV(newObjArr)
          }

          // var prepare: any = []
          // setTimeout(() => {
          //   res.data.forEach((e: any) => {
          //     var tempObj = []
          //     tempObj.push(e.customerName)
          //     tempObj.push(e.price)
          //     tempObj.push(e.createdOn)
          //     tempObj.push(
          //       this.datePipe.transform(e.timeReported, 'dd-MM-yyyy h:mm'),
          //     )
          //     prepare.push(tempObj)
          //   })
          //   let doc: any = new jsPDF()
          //   doc.autoTable({
          //     head: [['Customer Name', 'Price', 'Created On']],
          //     columnStyles: {},
          //     body: prepare,
          //   })
          //   doc.save('download' + '.pdf')
          // }, 5000)
        })
    }
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
    fs.saveAs(blob, 'REPORTS_' + new Date().toDateString() + '_AssetWorks.csv')
  }

  goback() {
    this._location.back()
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

    if (this.graphId == 1 || this.graphId == 2 || this.graphId == 3) {
      this.GetSubscriptionDetails(false)
    } else {
      this.GetTransactionDetails(false)
    }
  }

  /**
   * Get Subscription Details List
   * @param isExport
   */

  GetSubscriptionDetails(isExport: boolean, searchValue?: any) {
    const pBody = {
      pageNumber: this.currentPage,
      searchParam: '',
      pageSize: this.pageSize,
      operatorId: this.UserId,
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
      isExport: isExport,
      locationId: [0],
      duration: '',
    }

    this.__reportService.GetSubscriptionDetails(pBody).subscribe((res: any) => {
      if (res.data !== undefined && res.data != null && res.data.length > 0) {
        this.totalCount = res.paginationResponse.totalCount
        this.totalPages = res.paginationResponse.totalPages
        this.pageSize = res.paginationResponse.pageSize
        this.subscriptionList = res.data
        this.dataSource.data = this.subscriptionList
        this.isTableHasData = false
      } else {
        this.subscriptionList = res.data
        this.dataSource.data = []
        this.isTableHasData = true
      }
    })
  }

  /**
   * Get Transaction Details List
   * @param isExport
   */

  GetTransactionDetails(isExport: boolean, searchValue?: any) {
    const pBody = {
      pageNumber: this.currentPage,
      searchParam: '',
      pageSize: this.pageSize,
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
      operatorId: this.UserId,
      isExport: isExport,
      locationId: [0],
      duration: '',
    }

    this.__reportService.GetTransactionDetails(pBody).subscribe((res: any) => {
      if (res.data !== undefined && res.data != null && res.data.length > 0) {
        this.totalCount = res.paginationResponse.totalCount
        this.totalPages = res.paginationResponse.totalPages
        this.pageSize = res.paginationResponse.pageSize
        this.transactionList = res.data
        this.dataSource.data = this.transactionList
        this.isTableHasData = false
      } else {
        this.transactionList = res.data
        this.dataSource.data = []
        this.isTableHasData = true
      }
    })
  }

  searchFilter = this._fb.group({
    fromDate: new FormControl('', [Validators.required]),
    toDate: new FormControl('', [Validators.required]),
    // status: new FormControl(),
  })

  checkValidFrom(event: any) {
    let fromDate = this.searchFilter.value.fromDate
    if (!fromDate) {
      this._toastr.error('Please select valid start date first.')
      this.searchFilter.patchValue({ toDate: '' })
      return
    }
  }
  checkStartDate() {}

  resetFilter() {
    this.submitted = false
    this.searchFilter.reset()

    if (this.graphId == 1 || this.graphId == 2 || this.graphId == 3) {
      this.GetSubscriptionDetails(false, this.searchFilter.value)
    } else {
      this.GetTransactionDetails(false, this.searchFilter.value)
    }
  }

  filter() {
    this.submitted = true
    if (this.searchFilter.invalid) {
      this._toastr.error('Please fill mandatory fields.')
      return
    }

    if (this.graphId == 1 || this.graphId == 2 || this.graphId == 3) {
      this.GetSubscriptionDetails(false, this.searchFilter.value)
    } else {
      this.GetTransactionDetails(false, this.searchFilter.value)
    }
  }

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
}
