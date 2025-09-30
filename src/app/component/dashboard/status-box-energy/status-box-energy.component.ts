import { Component, Input, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StatusListElementComponent } from '../status-list-element/status-list-element.component'

@Component({
  selector: 'app-status-box-energy',
  templateUrl: './status-box-energy.component.html',
  styleUrls: ['./status-box-energy.component.scss'],
  imports:[CommonModule,StatusListElementComponent]
})
export class StatusBoxEnergyComponent implements OnInit {
  constructor() {}

  @Input() title: any

  energyUsedData = [
    {
      Key: 'Total Energy',
      Value: 408.14,
    },
    {
      Key: 'Daily Average',
      Value: 412.14,
    },
    {
      Key: "Today's",
      Value: 990.71,
    },
  ]

  icon1 = '../../../../assets/status-panel-icon/total-energy.png'
  icon2 = '../../../../assets/status-panel-icon/daily_average.png'
  icon3 = '../../../../assets/status-panel-icon/calender.png'

  ngOnInit(): void {}
}
