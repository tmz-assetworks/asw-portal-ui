import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'
import { SharedModule } from 'src/app/shared/shared.module'

import { ReportsComponent } from './reports.component'
import { ChargerCountReportComponent } from './charger-count-report/charger-count-report.component'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonToggleModule } from '@angular/material/button-toggle'

import { CustomerBillingComponent } from './payment/customer-billing.component'
import { ReportDetailComponent } from './report-details/report-details.component'



const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    children: [
      {
        path: '',
        component: ChargerCountReportComponent,
        pathMatch: 'full',
      },
      {
        path: 'billing',
        component: CustomerBillingComponent,
        pathMatch: 'full',
      },
      {
        path: 'detail',
        component: ReportDetailComponent,
        pathMatch: 'full',
      },

       {
        path: 'billing/detail',
        component: ReportDetailComponent,
        pathMatch: 'full',
      },
    ],
  },
 
]
@NgModule({
  declarations: [
    ReportsComponent,
    CustomerBillingComponent,
    ChargerCountReportComponent,
    ReportDetailComponent

  ],
  imports: [
   CommonModule, 
    ReactiveFormsModule,        
    MatButtonToggleModule,    
    SharedMaterialModule,       
    SharedModule,              
    RouterModule.forChild(routes),
  ],
})
export class ReportsModule {}
