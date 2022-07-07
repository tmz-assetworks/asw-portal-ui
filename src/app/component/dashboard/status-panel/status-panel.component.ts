import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-status-panel',
  templateUrl: './status-panel.component.html',
  styleUrls: ['./status-panel.component.scss'],
})
export class StatusPanelComponent implements OnInit {
  statusBoxTitle1 = 'Charging Infrastructure'

  statusBoxIcon1 = '../../../../../assets/locationcharger-icon/charging-infa.svg'
  statusBoxTitle2 = ' Revenue From Public Charging'
  statusBoxIcon2 = '../../../../assets/status-panel-icon/revenue.png'

  statusBoxTitle3 = 'Energy Used'
  statusBoxTitle4 = 'Energy Points'

  statusBoxIcon4 = '../../../../assets/status-panel-icon/energy_points.png'

  rightPanel = [
    {
      chargingInfustructure: [
        {
          Key: 'Total Location',
          Value: 50,
        },
        {
          Key: 'Total Charger',
          Value: 150,
        },
      ],
      Revenue: [
        {
          Key: 'Total Revenue',
          Value: 990.71,
        },
        {
          Key: 'Daily Revenue',
          Value: 412.14,
        },
        {
          Key: "Today's Revenue",
          Value: 408.14,
        },
      ],
      EnergyUsed: [
        {
          Key: 'TotalEnergy',
          Value: 408.14,
        },
        {
          Key: 'DailyAverage',
          Value: 412.14,
        },
        {
          Key: "Today's",
          Value: 990.71,
        },
      ],
      EnergyPoints: [
        {
          Key: 'MT of co2 saved',
          Value: 19408.07,
        },
        {
          Key: 'GGE of gas saved',
          Value: 990.71,
        },
      ],
    },
  ]

  constructor() {}

  ngOnInit(): void {}
}
