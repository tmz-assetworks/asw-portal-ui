import { Component, Input } from '@angular/core'
import { DashboardService } from 'src/app/screen/operator/dashboard/dashboard.service'
import { StatusBoxElementComponent } from '../status-box-element/status-box-element.component'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-status-box',
  templateUrl: './status-box.component.html',
  styleUrls: ['./status-box.component.scss'],
  imports:[CommonModule,StatusBoxElementComponent]
})
export class StatusBoxComponent {
  constructor(private _dashboardService: DashboardService) {}

  @Input() title: any
  @Input() icon: any
  
  data = [
    {
      Key: 'Total Locations',
      Value: 50,
      Icon: '../../../../assets/status-panel-icon/sites.png',
    },
    {
      Key: 'Total Chargers',
      Value: 150,
      Icon: '../../../../assets/status-panel-icon/chargers.png',
    },
  ]
}
