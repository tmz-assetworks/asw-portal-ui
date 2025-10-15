import { NgModule } from '@angular/core'
import { ChargerComponent } from './charger.component'
import { RouterModule, Routes } from '@angular/router'
import { ChargerInnerComponent } from './charger-inner/charger-inner.component'
import { ChargerInformationComponent } from './charger-information/charger-information.component'
import { ChargerSessionsComponent } from './charger-sessions/charger-sessions.component'
import { ChargerEventComponent } from './charger-event/charger-event.component'
import { GraphDetailComponent } from '../graph-detail/graph-detail.component'
import { CommonDiagnosticsComponent } from 'src/app/component/common-diagnostics/common-diagnostics.component'
const routes: Routes = [
  {
    path: '',
    component: ChargerComponent,
    children: [
      {
        path: '',
        component: ChargerInnerComponent,
        pathMatch: 'full',
      },

      // {
      //   path: 'chargers-analytics',
      //   component: ChargerAnalyticsComponent,
      // },

      {
        path: 'chargers-info',
        component: ChargerInformationComponent,
      },
      {
        path: 'chargers-session',
        component: ChargerSessionsComponent,
      },
      {
        path: 'chargers-diagnostic',
        component: CommonDiagnosticsComponent,
      },
      {
        path: 'chargers-event',
        component: ChargerEventComponent,
      },
    ],
  },
  { path: 'detail', component: GraphDetailComponent },
  { path: 'detail/:id', component: GraphDetailComponent },
  { path: 'chargers-analytics/detail', component: GraphDetailComponent },
  { path: 'chargers-analytics/detail/:id', component: GraphDetailComponent },
]
@NgModule({
  declarations: [
 
  ],
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class ChargerModule {}
