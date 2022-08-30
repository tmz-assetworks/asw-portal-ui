import { LocationService } from './../location.service'
import { Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { StorageService } from 'src/app/service/storage.service'
import { MatDialog } from '@angular/material/dialog'
import { CommandDialogComponent } from './command-dialog/command-dialog.component'
import { DiagnosticsService } from '../../diagnostics/diagnostics.service'
import { interval } from 'rxjs'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-location-chargers',
  templateUrl: './location-chargers.component.html',
  styleUrls: ['./location-chargers.component.scss'],
})
export class LocationChargersComponent implements OnInit {
  UserId: any
  selectedLocationId: any
  locationName: string | null
  isTableHasData = false

  displayedColumns: any
  expandedElement: any
  searchParam = 'All'
  arrKeys: any = ['All']
  currentPage = 1
  totalRecords = 30
  pageSize = 10
  totalPages = 0
  showLoader: boolean = false
  constructor(
    public _locationService: LocationService,
    private _storageService: StorageService,
    public dialog: MatDialog,
    public _toastr: ToastrService,
    private _diagnosticsService: DiagnosticsService,
  ) {
    this.UserId = this._storageService.getLocalData('user_id')
    this.selectedLocationId = this._storageService.getSessionData('locationId')
    this.locationName = this._storageService.getSessionData('locationName')
    this.UserId = this._storageService.getLocalData('user_id')
  }
  locationId(locationId: any): any {
    throw new Error('Method not implemented.')
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator

  ngOnInit() {
    this.locationChargerList(
      '',
      this.currentPage,
      this.totalRecords,
      this.selectedLocationId,
    )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    this.paginator._intl.itemsPerPageLabel = 'Rows per page'
  }

  selectOption(event: any) {
    this.searchParam = event.target.value
    this.locationChargerList(
      '',
      this.currentPage,
      this.totalRecords,
      this.selectedLocationId,
    )
  }

  locationChargerList(
    event: any,
    currentPage: number,
    totalPage: number,
    locationIds: any,
  ) {
    this.pageSize = event !== undefined && event !== '' ? event.pageSize : 10
    this.displayedColumns = [
      'chargeBoxId',
      'dispenserName',
      'dispenserMake',
      'dispenserModel',
      'connectorType',
      'protocolName',
      'chargerStatus',
      'noofPort',
      'action',
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
      searchParam: this.searchParam == 'All' ? '' : this.searchParam,
      pageSize: this.pageSize,
      orderBy: '',
      locationIds: [],
      selectedLocationId: [],
      // locationIds: this.locationId ? [this.locationId] : [],
      opratorid: '',
      chargerBoxIds: [],
    }
    this._locationService
      .GetlocationChargerList([locationIds])
      .subscribe((data: any) => {
        this.dataSource.data = data.data
      })
  }

  dataSource = new MatTableDataSource()

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
    if (this.dataSource.filteredData.length > 0) {
      this.isTableHasData = false
    } else {
      this.isTableHasData = true
    }
  }

  /**
   *
   *View Command Dialog
   */

  openCommandDialog(command: any, chargeBoxId: any) {
    const dialogRef = this.dialog.open(CommandDialogComponent, {
      width: '30%',
      autoFocus: false,
      // height: "600px",
      // panelClass: 'my-dialog-container-class2',
      data: { commandType: command, chargeBoxId: chargeBoxId },
    })
    dialogRef.afterClosed().subscribe((result) => {})
  }

  remoteStopTransaction(chargerId: any) {
    const pBody = {}

    this._diagnosticsService
      .RemoteStopTransaction(chargerId, pBody)
      .subscribe((res: any) => {
        if (res) {
          this.showLoader = true
          let cmsRequestPayload = res
          setTimeout(() => {
            this.cmsReply(cmsRequestPayload)
          }, 3000)
        }
      })
  }

  /***
   *
   *
   */
  cmsReply(cmsRequestPayload: any) {
    const source = interval(3000)
    const subscribe = source.subscribe((val) => {
      if (val <= 2) {
        this._diagnosticsService
          .CmsReply(cmsRequestPayload)
          .subscribe((res) => {
            if (res == 404) {
              this._toastr.error('Error Connecting...')
            } else if (res.status == 'Accepted') {
              let msg = JSON.stringify(res.status)
              subscribe.unsubscribe()
              this.showLoader = false
              this._toastr.success(msg)
            } else {
              subscribe.unsubscribe()
              this.showLoader = false
              let msg = JSON.stringify(res)
              this._toastr.error(msg)
            }
          })
      } else {
        this.showLoader = false
        subscribe.unsubscribe()
        this._toastr.error('Error Connecting Charger...')
      }
    })
  }
}
