import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/service/auth/auth.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-report-energy',
  templateUrl: './report-energy.component.html',
  styleUrls: ['./report-energy.component.scss'],
})
export class ReportEnergyComponent implements OnInit {
  reportEnergyUsed = 'reportEnergyUsed'
  reportEnergyMilesAdded = 'reportEnergyMilesAdded'
  reportEnegyMTCo2Saved = 'reportEnegyMTCo2Saved'
  reportEnergyGasolineGallon = 'reportEnergyGasolineGallon'
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _auth: AuthService,
  ) {}

  filterToggle = new FormControl('1')
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
