import { Component, Input, OnInit } from '@angular/core'
import { DashboardService } from 'src/app/screen/operator/dashboard/dashboard.service'

@Component({
  selector: 'app-status-box',
  templateUrl: './status-box.component.html',
  styleUrls: ['./status-box.component.scss'],
})
export class StatusBoxComponent implements OnInit {
  constructor(private _dashboardService:DashboardService) {}

  @Input() title: any
  @Input() icon: any
  // data=[]

  ngOnInit(): void {
   // this.getSummaryData();
  }


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


  /**
   * Get Summary Data
   */

// getSummaryData(){

//   this._dashboardService.GetSummaryData().subscribe(data=>{

//     console.log(data[0].chargingInfustructure,"getting panakj")
     


//   })
// }


}
