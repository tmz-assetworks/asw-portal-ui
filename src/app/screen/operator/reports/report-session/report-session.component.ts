import { Component, OnInit, ViewChild } from '@angular/core'
import { FormControl } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { EChartsOption } from 'echarts'
import { AuthService } from 'src/app/service/auth/auth.service'

@Component({
  selector: 'app-report-session',
  templateUrl: './report-session.component.html',
  styleUrls: ['./report-session.component.scss'],
})
export class ReportSessionComponent implements OnInit {
  reportChargingSession = 'reportSession'
  reportChargingSessionTitle = 'Session Length'

  reportLineSession = 'reportLineSession'
  reportLineSessionTitle = 'Upcoming Session - 24 Hours'

  filterToggle = new FormControl('1')

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _auth: AuthService,
  ) {}

  ngOnInit(): void {}

  setTime(event: any) {}
  openDetailPage(
    event: any,
    graphHeading: string,
    pageHeading: string,
    duration: any,
  ) {
    sessionStorage.setItem('graphHeading', graphHeading)
    sessionStorage.setItem('pageHeading', pageHeading)
    sessionStorage.setItem('duration', duration)

    this._router.navigate(['detail'], {
      relativeTo: this._route,
      queryParams: { id: event },
    })
    //this._router.navigate(['detail'],{relativeTo: this._route});
  }
}
