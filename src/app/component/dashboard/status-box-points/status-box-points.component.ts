import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-status-box-points',
  templateUrl: './status-box-points.component.html',
  styleUrls: ['./status-box-points.component.scss'],
})
export class StatusBoxPointsComponent implements OnInit {
  constructor() {}

  @Input() title: any
  @Input() icon: any

  data = [
    {
      Key: 'MT of CO2 Saved',
      Value: 19408.07,
      Icon: '../../../../assets/status-panel-icon/saved.png',
    },
    {
      Key: 'Gasoline gallon equivalent (GGE Saved)',
      Value: 990.71,
      Icon: '../../../../assets/status-panel-icon/gallon.png',
    },
  ]

  ngOnInit(): void {}
}
