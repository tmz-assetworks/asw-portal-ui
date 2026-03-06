import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { Router, RouterModule } from '@angular/router'
import { AuthService } from 'src/app/service/auth/auth.service'
import { StorageService } from 'src/app/service/storage.service'
import { ChargerService } from '../charger.service'
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog'
import { MeterDialogComponent } from './meter-dialog/meter-dialog.component'
import * as fs from 'file-saver'
import { CommonModule, DatePipe } from '@angular/common'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'
import { CustomPaginationComponent } from 'src/app/shared/custom-pagination/custom-pagination.component';

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
    SharedMaterialModule,
    FormsModule,
    CustomPaginationComponent
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
  eventLogList: any;
  jumpPageNumber: number = 1;
  assetId:string | null
  showLocationNav: boolean = false
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

  constructor(
    private _router: Router,
    private _auth: AuthService,
    public dialog: MatDialog,
    private _storageService: StorageService,
    private _chargerService: ChargerService,
  ) {
    this.UserId = this._storageService.getLocalData('user_id')
    this.selecteChargerIds = this._storageService.getSessionData('chargerBoxId')
    this.assetId = this._storageService.getSessionData('assetId') ?? 'N/A';
    this.chargerName = this._storageService.getSessionData('chargerName')
    this.userTimeZone = this._storageService.getLocalData('time_zone');
  }

  ngOnInit(): void {
     this.loadSessions()

  }

  @ViewChild('pdfTable', { static: false })
  pdfTable!: ElementRef

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  navLinks = [
  { label: 'CHARGER INFORMATION', route: '../chargers-info', active: false },
  { label: 'CHARGE SESSIONS', route: '../chargers-session', active: true },
  { label: 'DIAGNOSTIC', route: '../chargers-diagnostic', active: false },
  { label: 'EVENT LOGS', route: '../chargers-event', active: false }
];

  onPageSizeChange(size: number): void {
  this.pageSize = size
  this.currentPage = 1;
  this.jumpPageNumber = 1;
  this.loadSessions();
}

public updatePage(page: number): void {

  if (page < 1 || page > this.totalPages) return;

  if (page === this.currentPage) return;

  this.currentPage = page;
  this.jumpPageNumber = page;

  this.loadSessions();
}

 isLoading = false;

loadSessions(): void {

  const body = {
    pageNumber: this.currentPage,
    searchParam: this.searchKey,
    pageSize: this.pageSize,
    orderBy: '',
    chargerboxid: this.selecteChargerIds ? [this.selecteChargerIds] : [],
    status: [] as string[],
  };

  this.isLoading = true;

  this._chargerService
    .GetChargerSessionDetailsList(body)
    .subscribe({
      next: (res: any) => {

        if (res?.data?.length) {

          this.eventLogList = res.data;
          this.dataSource.data = res.data;

          this.totalRecords = res.paginationResponse?.totalCount ?? 0;
          this.totalPages = res.paginationResponse?.totalPages ?? 0;

          this.jumpPageNumber = this.currentPage;
          this.isTableHasData = false;

        } else {

          this.dataSource.data = [];
          this.totalRecords = 0;
          this.totalPages = 0;
          this.isTableHasData = true;
        }
      },
      error: (err) => {
        console.error('Session API Error:', err);
        this.dataSource.data = [];
        this.isTableHasData = true;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
}

  /**
   *
   * @param obj
   * download as csv file
   */
  downloadFile() {
    let newObjArr: any = []

    for (let i = 0; i < this.eventLogList.length; i++) {
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

    let blob = new Blob([csvArray], { type: 'text/csv' })
    fs.saveAs(blob, new Date().toDateString() + '_AssetWorks.csv')
  }

  

  showMeterPopup(value: any) {
    const dialogRef = this.dialog.open(MeterDialogComponent, {
      width: '30%',
      autoFocus: false,
      data: { usage: value },
    })
    dialogRef.afterClosed().subscribe((result) => {})
  }
}
