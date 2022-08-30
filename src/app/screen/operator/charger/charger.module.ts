import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ChargerComponent } from './charger.component'
import { RouterModule, Routes } from '@angular/router'
import { ChargerInnerComponent } from './charger-inner/charger-inner.component'
import { ChargerAnalyticsComponent } from './charger-analytics/charger-analytics.component'
import { ChargerInformationComponent } from './charger-information/charger-information.component'
import { ChargerSessionsComponent } from './charger-sessions/charger-sessions.component'
import { ChargerDiagnosticComponent } from './charger-diagnostic/charger-diagnostic.component'
import { ChargerEventComponent } from './charger-event/charger-event.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'
import { GraphDetailComponent } from '../graph-detail/graph-detail.component'
// import { TabsBarComponent } from '../../../component/diagnostic/tabs-bar/tabs-bar.component'
// import { TabComponent } from '../../../component/diagnostic/tab/tab.component'
// import { DiagWidgetComponent } from '../../../component/diagnostic/diag-widget/diag-widget.component'
// import { DiagTableComponent } from '../../../component/diagnostic/diag-table/diag-table.component'
// import { DiagWidgetBarComponent } from '../../../component/diagnostic/diag-widget-bar/diag-widget-bar.component';

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

      {
        path: 'chargers-analytics',
        component: ChargerAnalyticsComponent,
        // pathMatch: 'full',
      },

      {
        path: 'chargers-info',
        component: ChargerInformationComponent,
        // pathMatch: 'full',
      },
      {
        path: 'chargers-session',
        component: ChargerSessionsComponent,
        // pathMatch: 'full',
      },
      {
        path: 'chargers-diagnostic',
        component: ChargerDiagnosticComponent,
        // pathMatch: 'full',
      },
      {
        path: 'chargers-event',
        component: ChargerEventComponent,
        // pathMatch: 'full',
      },
    ],
  },
  { path: 'detail', component: GraphDetailComponent },
  { path: 'detail/:id', component: GraphDetailComponent },
  {path: 'chargers-analytics/detail', component: GraphDetailComponent},
  {path: 'chargers-analytics/detail/:id', component: GraphDetailComponent} 
]
@NgModule({
  declarations: [
    ChargerComponent,
    ChargerInnerComponent,
    ChargerAnalyticsComponent,
    ChargerInformationComponent,
    ChargerSessionsComponent,
    ChargerDiagnosticComponent,
    ChargerEventComponent
  ],
  imports: [CommonModule, RouterModule.forChild(routes) ,SharedModule, SharedMaterialModule],
})
export class ChargerModule {}
