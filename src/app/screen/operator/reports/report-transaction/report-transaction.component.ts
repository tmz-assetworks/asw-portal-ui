import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-report-transaction',
  templateUrl: './report-transaction.component.html',
  styleUrls: ['./report-transaction.component.scss'],
})
export class ReportTransactionComponent implements OnInit {
  filterToggle = new FormControl('1')
  basic = 'basic'
  basicStatus = 'basicStatus'
  bar = 'chargerBar'
  barChargers = 'reportTransaction'
  lineChargers = 'reportTransaction'
  lineChargersTitle = 'reportTransaction'

  barChargersTitle = 'Transaction Amount'
  constructor(private _router: Router, private _route: ActivatedRoute) {}

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
  }
}
