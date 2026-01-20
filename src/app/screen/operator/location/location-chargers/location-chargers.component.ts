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
import { Router, RouterModule } from '@angular/router'
import { LocationStatusPanelComponent } from '../location-status-panel/location-status-panel.component'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'

@Component({
  selector: 'app-location-chargers',
  templateUrl: './location-chargers.component.html',
  styleUrls: ['./location-chargers.component.scss'],
  imports:[LocationStatusPanelComponent,SharedMaterialModule,RouterModule]
})
export class LocationChargersComponent implements OnInit {
  UserId: any
  selectedLocationId: any
  locationName: string | null

  expandedElement: any

  arrKeys: any = ['All']

  // totalRecords = 30
  totalCount: any
  pageSize: number = 10
  currentPage: number = 1
  totalPages: any
  pageSizeOptions = [10, 20, 100]
  searchParam = ''
  showLoader: boolean = false
  statusList: any
  pageNumber: any
  isTableHasData: any

  constructor(
    private readonly _router: Router,
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

  displayedColumns = [
    'assetId',
    'chargeBoxId',
    'dispenserMake',
    'dispenserModel',
    'connectorType',
    'chargerStatus',
    'noofPort',
    'diagnostic',
    'action',
  ]
  dataSource = new MatTableDataSource<any>()

  @ViewChild(MatPaginator) paginatorCharger: any
  // @ViewChild('input') inputValue: any
  ngOnInit() {
    this.GetDispenserByLocation(this.selectedLocationId)
  }

  ngAfterViewInit() {
    this.paginatorCharger._intl.itemsPerPageLabel = 'Rows per page'
  }

  selectOption(event: any) {
    this.searchParam = event.target.value
    this.GetDispenserByLocation(this.selectedLocationId)
  }

  onStatusChange(status: number): void {
      if (!this.selectedLocationId) {
        return;
      }
      this.currentPage = 1;
      this.GetDispenserByLocation(this.selectedLocationId, status);
  }

  GetDispenserByLocation(locationId: number, status?: number ) {
    const pBody = {
      pageNumber: this.currentPage,
      searchParam: this.searchParam,
      pageSize: this.pageSize,
      orderBy: '',
      locationIds: [locationId],
      activationStatus: status ?? null
    }

    this._locationService
      .GetDispenserByLocation(pBody)
      .subscribe((res: any) => {
        if (res.data !== undefined && res.data != null && res.data.length > 0) {
          this.totalCount = res.paginationResponse.totalCount
          this.totalPages = res.paginationResponse.totalPages
          this.pageSize = res.paginationResponse.pageSize

          this.dataSource.data = res.data

          this.statusList = res.statusList
          this.isTableHasData = false
        } else {
          this.dataSource.data = []
          this.isTableHasData = true
        }
      })
  }

  pageChange(event: any) {
    if (event.pageSize == this.pageSize) {
      this.currentPage =
        event.previousPageIndex < event.pageIndex
          ? this.currentPage + 1
          : this.currentPage - 1
    } else {
      this.currentPage = 1
      this.pageSize = event.pageSize
      this.paginatorCharger.pageIndex = 0
    }

    this.GetDispenserByLocation(this.selectedLocationId)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
    this.searchParam = filterValue

    //const filterValue = this.inputValue.nativeElement.value.toLowerCase()
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
      width: '25%',
      autoFocus: false,
      // height: "600px",
      // panelClass: 'my-dialog-container-class2',
      data: { commandType: command, chargeBoxId: chargeBoxId },
    })
    dialogRef.afterClosed().subscribe((result) => {})
  }

  redirectToDiagnostic(command: any, chargeBoxId: string) {
    this._storageService.setSessionData('chargerBoxId', chargeBoxId)
          this._storageService.setSessionData('chargerName', chargeBoxId);
          let userRole=this._storageService.getLocalData('role')?.toLowerCase();
          if(userRole){
            this._router.navigate([`${userRole}/charger/chargers-diagnostic`]);
          }
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
