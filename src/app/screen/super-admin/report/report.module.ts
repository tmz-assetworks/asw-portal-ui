import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'
import { SharedModule } from 'src/app/shared/shared.module'
import { ReportsComponent } from './reports.component'
import { ChargerCountReportComponent } from './charger-count-report/charger-count-report.component'



const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
      },
      {
        path: 'reports/charger-count-report',
        component: ChargerCountReportComponent,
        pathMatch: 'full',
      },


     
    ],
  },

 
]


@NgModule({
  declarations: [
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
