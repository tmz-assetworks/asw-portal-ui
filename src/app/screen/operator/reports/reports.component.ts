import { Component, OnInit } from '@angular/core'
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  imports:[RouterModule]
})
export class ReportsComponent implements OnInit {
  ngOnInit(): void {}
}
