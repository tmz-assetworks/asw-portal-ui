import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-charger-sessions',
  templateUrl: './charger-sessions.component.html',
  styleUrls: ['./charger-sessions.component.scss']
})
export class ChargerSessionsComponent implements OnInit {

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
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA)
  
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator
      this.paginator._intl.itemsPerPageLabel = 'Rows per page'
    }
  
    // viewCharger() {
    //   this.showLocationNav = true
    //   this._router.navigate(['operator/charger/chargers-analytics'])
    // }
  
    constructor(private _router: Router, private _auth: AuthService) {}
  
    ngOnInit(): void {
      // this._auth.tokenExpired()
    }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value
      this.dataSource.filter = filterValue.trim().toLowerCase()
    }
}

export interface PeriodicElement {
  sessionid: number
  duration: number
  usage: number
  starttime: number
  endtime: number
  
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    sessionid: 4546567,
    duration: 10,
    usage: 4,
    starttime: 10-0o6-21 ,
    endtime: 10-0o6-21 ,
   
  },
  {
    sessionid: 4546567,
    duration: 10,
    usage: 4,
    starttime: 10-0o6-21 ,
    endtime: 10-0o6-21 ,
   
  }, {
    sessionid: 4546567,
    duration: 10,
    usage: 4,
    starttime: 10-0o6-21 ,
    endtime: 10-0o6-21 ,
   
  }, {
    sessionid: 4546567,
    duration: 10,
    usage: 4,
    starttime: 10-0o6-21 ,
    endtime: 10-0o6-21 ,
   
  }, {
    sessionid: 4546567,
    duration: 10,
    usage: 4,
    starttime: 10-0o6-21 ,
    endtime: 10-0o6-21 ,
   
  }, {
    sessionid: 4546567,
    duration: 10,
    usage: 4,
    starttime: 10-0o6-21 ,
    endtime: 10-0o6-21 ,
   
  }, {
    sessionid: 4546567,
    duration: 10,
    usage: 4,
    starttime: 10-0o6-21 ,
    endtime: 10-0o6-21 ,
   
  }, {
    sessionid: 4546567,
    duration: 10,
    usage: 4,
    starttime: 10-0o6-21 ,
    endtime: 10-0o6-21 ,
   
  },
  {
    sessionid: 4546567,
    duration: 10,
    usage: 4,
    starttime: 10-0o6-21 ,
    endtime: 10-0o6-21 ,
   
  },{
    sessionid: 4546567,
    duration: 10,
    usage: 4,
    starttime: 10-0o6-21 ,
    endtime: 10-0o6-21 ,
   
  },{
    sessionid: 4546567,
    duration: 10,
    usage: 4,
    starttime: 10-0o6-21 ,
    endtime: 10-0o6-21 ,
   
  },{
    sessionid: 4546567,
    duration: 10,
    usage: 4,
    starttime: 10-0o6-21 ,
    endtime: 10-0o6-21 ,
   
  },{
    sessionid: 4546567,
    duration: 10,
    usage: 4,
    starttime: 10-0o6-21 ,
    endtime: 10-0o6-21 ,
   
  },
]
