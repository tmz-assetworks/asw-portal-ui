import { Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { ActivatedRoute } from '@angular/router'
import { StorageService } from 'src/app/service/storage.service'
import { DatePipe, Location } from '@angular/common'
import { ReportService } from '../reports.service'
import jsPDF from 'jspdf'

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
  constructor(
    private _storageService: StorageService,
    private _activatedRoute: ActivatedRoute,
    private _location: Location,
    private __reportService: ReportService,
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
      this.isSubscription = false
      this.GetSubscriptionDetails(false)
      this.displayedColumnsSubscription = [
        'customerName',
        'pricingPlanName',
        'price',
        'createdOn',
      ]
    } else {
      this.isSubscription = true
      this.GetTransactionDetails(false)
      this.displayedColumnsTransaction = ['customerName', 'price', 'createdOn']
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

  downloadAsPDF() {
    if (this.graphId == 1 || this.graphId == 2 || this.graphId == 3) {
      const pBody = {
        pageNumber: 0,
        searchParam: '',
        pageSize: 0,
        operatorId: this.UserId,
        isExport: true,
        locationId: [0],
        duration: '',
      }

      this.__reportService
        .GetSubscriptionDetails(pBody)
        .subscribe((res: any) => {
          var prepare: any = []

          setTimeout(() => {
            res.data.forEach((e: any) => {
              var tempObj = []
              tempObj.push(e.customerName)
              tempObj.push(e.pricingPlanName)
              tempObj.push(e.price)
              tempObj.push(e.createdOn)

              tempObj.push(
                this.datePipe.transform(e.timeReported, 'dd-MM-yyyy h:mm'),
              )

              prepare.push(tempObj)
            })
            let doc: any = new jsPDF()
            doc.autoTable({
              head: [
                ['Customer Name', 'Pricing Plan Name', 'Price', 'Created On'],
              ],
              columnStyles: {},
              body: prepare,
            })

            doc.save('download' + '.pdf')
          }, 5000)
        })
    } else {
      const pBody = {
        pageNumber: 0,
        searchParam: '',
        pageSize: 0,
        operatorId: this.UserId,
        isExport: true,
        locationId: [0],
        duration: '',
      }

      this.__reportService
        .GetTransactionDetails(pBody)
        .subscribe((res: any) => {
          var prepare: any = []

          setTimeout(() => {
            res.data.forEach((e: any) => {
              var tempObj = []
              tempObj.push(e.customerName)
              tempObj.push(e.price)

              tempObj.push(e.createdOn)

              tempObj.push(
                this.datePipe.transform(e.timeReported, 'dd-MM-yyyy h:mm'),
              )

              prepare.push(tempObj)
            })
            let doc: any = new jsPDF()
            doc.autoTable({
              head: [['Customer Name', 'Price', 'Created On']],
              columnStyles: {},
              body: prepare,
            })

            doc.save('download' + '.pdf')
          }, 5000)
        })
    }
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

  GetSubscriptionDetails(isExport: boolean) {
    const pBody = {
      pageNumber: this.currentPage,
      searchParam: '',
      pageSize: this.pageSize,
      operatorId: this.UserId,
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

  GetTransactionDetails(isExport: boolean) {
    const pBody = {
      pageNumber: this.currentPage,
      searchParam: '',
      pageSize: this.pageSize,
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
}
