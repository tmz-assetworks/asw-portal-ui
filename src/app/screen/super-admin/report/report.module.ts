import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'
import { SharedModule } from 'src/app/shared/shared.module'
import { ReportsComponent } from './reports.component'
import { ChargerCountReportComponent } from './charger-count-report/charger-count-report.component'
import { ReportDetailComponent } from './report-details/report-details.component'



const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    children: [
      {
        path: '',
      //   component: ReportSessionComponent,
        pathMatch: 'full',
      },
      {
        path: 'reports/charger-count-report',
        component: ChargerCountReportComponent,
        pathMatch: 'full',
      },
//       {
//   path: 'report/detail',
//   component: ReportDetailComponent,
//   pathMatch: 'full',
// }

     
    ],
  },

 
]


@NgModule({
  declarations: [
   // ChargerCountReportComponent
   ReportsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    SharedMaterialModule,
  ],
})
export class ReportsModule {}
