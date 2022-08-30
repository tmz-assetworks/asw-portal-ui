import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { StorageService } from 'src/app/service/storage.service';
import { ChargerService } from '../charger.service';
import jsPDF from 'jspdf'
import 'jspdf-autotable'

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
  styleUrls: ['./charger-sessions.component.scss']
})
export class ChargerSessionsComponent implements OnInit {

  currentPage = 1;
  totalRecords = 30;
  pageSize = 10;
  totalPages =0;
  searchParam = 'All'
  locationId: any
  arrKeys: any = ['All']
  searchKey: string=""
  isTableHasData = false
  eventLogList: any

  showLocationNav: boolean = false
    
    @ViewChild(MatPaginator) paginator!: MatPaginator
  
    displayedColumns: string[] = [
      'sessionid',
      'duration',
      'usage',
      'starttime',
      'endtime',
      'meterreading',
    ]

    dataSource = new MatTableDataSource<PeriodicElement>()


  UserId: string | null;
  chargerName: string | null;
  selecteChargerIds: string | null;
  chargerBoxId: any;
  
  ngAfterViewInit() {
   // this.dataSource.paginator = this.paginator
    this.paginator._intl.itemsPerPageLabel = 'Rows per page'
  }
  
    // viewCharger() {
    //   this.showLocationNav = true
    //   this._router.navigate(['operator/charger/chargers-analytics'])
    // }
  
    constructor(private _router: Router, private _auth: AuthService, private _storageService: StorageService,private _chargerService: ChargerService) {
      this.UserId = this._storageService.getLocalData('user_id')
      this.selecteChargerIds = this._storageService.getSessionData('chargerBoxId')

      this.chargerName = this._storageService.getSessionData('chargerName')
      
    }
  
    ngOnInit(): void {
      // this._auth.tokenExpired()
      this.GetChargerSessionDetailsList('',this.currentPage,this.totalRecords)
    }

    @ViewChild('pdfTable', { static: false })
    pdfTable!: ElementRef
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value
      this.dataSource.filter = filterValue.trim().toLowerCase()
    }


  /*******************************************charger session table data***************************************************** */
  //   GetChargerSessionDetailsList(chargerBoxId:any){
  //    const body={
  //     "pageNumber": 1,
  //     "searchParam": "",
  //     "pageSize": 10,
  //     "orderBy": "",
  //     "chargerboxid": [
  //       this.selecteChargerIds
  //     ]
  //   }
  //   this._chargerService.GetChargerSessionDetailsList(body).subscribe((res) => {
  //     console.log(res ,"chargerboxiddetails");
  //     this.dataSource = res.data
  //   })
  // }

  GetChargerSessionDetailsList(event: any,currentPage: number ,totalPage: number) {
    this.pageSize = event !== undefined && event !== '' ? event.pageSize : 10;
    this.displayedColumns = [  
    'sessionid',
      'duration',
      'usage',
      'starttime',
      'endtime',
      'meterreading',];
    this.currentPage = event !== undefined && event !== '' ?  (event.previousPageIndex < event.pageIndex ? currentPage + 1 : currentPage -1) : 1;
    if(this.currentPage == 0) {
     this.currentPage = this.currentPage + 1;
    }
    
    const body = {
      pageNumber: this.currentPage,
     // searchParam: this.searchParam == 'All' ? '' : this.searchParam,
     searchParam:this.searchKey,
      pageSize: this.pageSize,
      orderBy: '',
     // locationIds: [],
     // locationIds: this.locationId ? [this.locationId] : [],
      // opratorid: '',
      chargerboxid: [
              this.selecteChargerIds
           ]
    }
   
    this._chargerService.GetChargerSessionDetailsList(body).subscribe((res: any) => {
     
      
      if (res.data !== undefined && res.data != null && res.data.length > 0) {
        
        
        for (let i = 0; i < res.data.length; i++) {
          if (this.arrKeys.indexOf(res.data[i].requestType) == -1) {
            this.arrKeys.push(res.data[i].requestType)
            
          }
        }
        this.eventLogList=res.data
        this.totalRecords = res.paginationResponse.totalCount;
        this.totalPages = res.paginationResponse.totalPages;
        this.dataSource.data = res.data;
        this.isTableHasData = false;
      }else{
        this.dataSource.data=[]
        this.isTableHasData = true;
      }
    })
  }

  /********Download Function***** ****/


  public downloadAsPDF() {
    var prepare: any = []
    this.eventLogList.forEach((e: any) => {
      var tempObj = []
      tempObj.push(e.sessionid)
      tempObj.push(e.duration)
      tempObj.push(e.usage)
      tempObj.push(e.startTime)
      tempObj.push(e.endTime)
      tempObj.push(e.requestPayload)
      tempObj.push(e.responsePayload)
      prepare.push(tempObj)
    })
    let doc: any = new jsPDF()
    doc.autoTable({
      head: [
        [
          'SESSION ID',
          'DURATION (HH:MM:SS)',
          'USAGE (KWH)',
          'START TIME',
          'END TIME',
          'RequestPayload',
          'ResponsePayload',
        ],
      ],
      body: prepare,
    })
    doc.save('download' + '.pdf')

  }
}



