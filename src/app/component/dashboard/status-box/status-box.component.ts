import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-status-box',
  templateUrl: './status-box.component.html',
  styleUrls: ['./status-box.component.scss'],
})
export class StatusBoxComponent implements OnInit {
  constructor() {}

  @Input() title: any
  @Input() icon: any

  data = [
    {
      Key: 'Total Locations',
      Value: 50,
      Icon: '../../../../assets/status-panel-icon/sites.png',
    },
    {
      Key: 'Total Charger',
      Value: 150,
      Icon: '../../../../assets/status-panel-icon/chargers.png',
    },
  ]

  ngOnInit(): void {}
}
