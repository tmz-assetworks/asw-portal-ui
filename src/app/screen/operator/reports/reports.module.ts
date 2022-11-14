import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'
import { SharedModule } from 'src/app/shared/shared.module'

import { ReportsComponent } from './reports.component'

import { ReportSubscriptionComponent } from './report-subscription/report-subscription.component'
import { ReportTransactionComponent } from './report-transaction/report-transaction.component'
import { ReportEnergyComponent } from './report-energy/report-energy.component'
import { ReportSessionComponent } from './report-session/report-session.component'
import { GraphDetailComponent } from '../graph-detail/graph-detail.component'

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    children: [
      {
        path: '',
        component: ReportSessionComponent,
        pathMatch: 'full',
      },
      {
        path: 'reports/report-session',
        component: ReportSessionComponent,
        // pathMatch: 'full',
      },

      {
        path: 'report-subscription',
        component: ReportSubscriptionComponent,
        // pathMatch: 'full',
      },

      {
        path: 'report-transaction',
        component: ReportTransactionComponent,
        // pathMatch: 'full',
      },
      {
        path: 'report-energy',
        component: ReportEnergyComponent,
        // pathMatch: 'full',
      },
    ],
  },
  { path: 'report-transaction/detail', component: GraphDetailComponent },
  { path: 'report-transaction/detail/:id', component: GraphDetailComponent },
  { path: 'report-subscription/detail', component: GraphDetailComponent },
  { path: 'report-subscription/detail/:id', component: GraphDetailComponent },
  { path: 'report-session/detail', component: GraphDetailComponent },
  { path: 'report-session/detail/:id', component: GraphDetailComponent },
  { path: 'report-energy/detail', component: GraphDetailComponent },
  { path: 'report-energy/detail/:id', component: GraphDetailComponent },
]
@NgModule({
  declarations: [
    ReportsComponent,
    ReportSessionComponent,
    ReportSubscriptionComponent,
    ReportTransactionComponent,
    ReportEnergyComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    SharedMaterialModule,
  ],
})
export class ReportsModule {}
