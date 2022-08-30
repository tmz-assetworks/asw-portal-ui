import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-report-subscription',
  templateUrl: './report-subscription.component.html',
  styleUrls: ['./report-subscription.component.scss'],
})
export class ReportSubscriptionComponent implements OnInit {
  filterToggle = new FormControl('1')

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
