import { Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { ActivatedRoute } from '@angular/router'
import { StorageService } from 'src/app/service/storage.service'
import { CommonModule, DatePipe, Location } from '@angular/common'
import { ReportService } from '../reports.service'
import { AdminService } from 'src/app/screen/admin/admin.service'
import * as fs from 'file-saver'
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss'],
  imports:[SharedMaterialModule,CommonModule,ReactiveFormsModule]
})
export class ReportDetailComponent implements OnInit {
  locationList: any
  locationIdResponse: any = []
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
  userTimeZone:any;
  
  constructor(
    private _storageService: StorageService,
    private _activatedRoute: ActivatedRoute,
    private _location: Location,
    private __reportService: ReportService,
    public _fb: FormBuilder,
    private _toastr: ToastrService,
    private readonly _AdminService: AdminService,
  ) {
    this.loadUserSettings();
  }
  
  private loadUserSettings(): void {
    this.graphHeading = this._storageService.getSessionData('graphHeading')
    this.pageHeading = this._storageService.getSessionData('pageHeading')
    this.duration = this._storageService.getSessionData('duration')
    this.UserId = this._storageService.getLocalData('user_id')
    this.userTimeZone=this._storageService.getLocalData('time_zone');
  }

  ngOnInit(): void {
    this.GetLocationName()
    this._activatedRoute.queryParams.subscribe((params) => {
      this.graphId = JSON.parse(params['id'])
    })

    if ([1, 2, 3].includes(this.graphId)) {
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
        'chargerAssetId',
        'assetId',
        'locationName',
        'rfid',
        'startTime',
        'endTime',
        'duration',
        'totalAmount',
        'depCost',
        'consumedEnergy',
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
    if ([1, 2, 3].includes(this.graphId)) {
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
            const newObjArr = this.chartList.map((item: any) => ({
              'SUBSCRIPTION PLAN': item.subscriptionPlan,
              'CONSUMED ENERGY': item.consumedEnergy,
              'CONSUMED TIME': item.consumedTime,
              'LOCATION NAME': item.locationName,
              REMARK: item.remark,
              'SALES TAX': item.salesTax,
              'TRANSACTION FEE': item.transactionFee,
              'PARKING FEE': item.parkingFee,
              RFID: item.rfid,
              TAX: item.tax,
              'TOTAL AMOUNT': item.totalAmount,
              VIN: item.vin,
              'CREATED ON': this.datePipe.transform(
                item.createdOn,
                'dd-MM-yyyy h:mm'
              )
            }));

            this.convertToCSV(newObjArr);
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
            const newObjArr = this.chartList.map((item: any) => ({
                  'ASSET ID': item.assetId,
                  'CHARGE BOX ID': item.chargeBoxID,
                  'DEPARTMENT': item.department,
                  'LOCATION NAME': item.locationName,
                  'CONSUMED ENERGY': item.consumedEnergy,
                  'CONSUMED TIME': item.consumedTime,
                  REMARK: item.remark,
                  'SALES TAX': item.salesTax,
                  'TRANSACTION FEE': item.transactionFee,
                  'PARKING FEE': item.parkingFee,
                  RFID: item.rfid,
                  'START TIME': this.datePipe.transform(
                    item.startTime,
                    'dd-MM-yyyy h:mm'
                  ),
                  'END TIME': this.datePipe.transform(
                    item.endTime,
                    'dd-MM-yyyy h:mm'
                  ),
                  DURATION: item.duration,
                  'UNIT COST': item.unitCost,
                  TAX: item.tax,
                  'TOTAL AMOUNT': item.totalAmount,
                  DepCost: item.depCost,
                  VIN: item.vin,
                  'CREATED ON': this.datePipe.transform(
                    item.createdOn,
                    'dd-MM-yyyy h:mm'
                  ),
		 'Peak Kw':item.PeakKw

                }));

            this.convertToCSV(newObjArr)
          }
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

    let blob = new Blob([csvArray], { type: 'text/csv' })
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

    if ([1, 2, 3].includes(this.graphId)) {
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
      locationId: this.locationIdResponse,
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
    locationId: new FormControl(''),
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
  resetFilter() {
    this.locationIdResponse=[]
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
    let fromDate:any = this.searchFilter.value.fromDate
    return d >= fromDate
  }

  getModifiedDate() {
    let date = new Date()
    let time = this.datePipe.transform(date, 'HH:mm:ss')
    return time
  }
   GetLocationName() {
    this._AdminService.GetLocationName().subscribe((res: any) => {
      this.locationList = res.data
    })
  }
    onSelectLocation(event: any, id: any) {
    if (event.isUserInput) {
      const index = this.locationIdResponse.indexOf(id)
      if (index === -1) {
        this.locationIdResponse.push(id)
      } else {
        this.locationIdResponse.splice(index, 1)
      }
    }
  }
}
