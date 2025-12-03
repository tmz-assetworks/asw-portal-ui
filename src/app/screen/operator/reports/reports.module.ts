import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ReportsComponent } from './reports.component'
import { ReportSubscriptionComponent } from './report-subscription/report-subscription.component'
import { ReportTransactionComponent } from './report-transaction/report-transaction.component'
import { ReportEnergyComponent } from './report-energy/report-energy.component'
import { ReportSessionComponent } from './report-session/report-session.component'
import { GraphDetailComponent } from '../graph-detail/graph-detail.component'
import { ReportDetailComponent } from './report-detail/report-detail.component'

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    children: [
      {
        path: '',
        redirectTo: 'report-transaction',
        pathMatch: 'full',
      },
      {
        path: 'report-session',
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
  { path: 'detail', component: GraphDetailComponent },
  { path: 'detail/:id', component: GraphDetailComponent },
  {
    path: 'report-subscription/report-detail',
    component: ReportDetailComponent,
  },
  {
    path: 'report-subscription/report-detail/:id',
    component: ReportDetailComponent,
  },
  {
    path: 'report-transaction/report-detail',
    component: ReportDetailComponent,
  },
  {
    path: 'report-transaction/report-detail/:id',
    component: ReportDetailComponent,
  },
  { path: 'report-energy/detail', component: GraphDetailComponent },
  { path: 'report-energy/detail/:id', component: GraphDetailComponent },
]
@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forChild(routes),
  ],
})
export class ReportsModule {}
