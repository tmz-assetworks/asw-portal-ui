import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ChargerComponent } from './charger.component'
import { RouterModule, Routes } from '@angular/router'
import { ChargerInnerComponent } from './charger-inner/charger-inner.component'
import { ChargerAnalyticsComponent } from './charger-analytics/charger-analytics.component'
import { ChargerInformationComponent } from './charger-information/charger-information.component'
import { ChargerSessionsComponent } from './charger-sessions/charger-sessions.component'
import { ChargerEventComponent } from './charger-event/charger-event.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'
import { GraphDetailComponent } from '../graph-detail/graph-detail.component'
import { MatTableExporterModule } from 'mat-table-exporter'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatInputModule } from '@angular/material/input'
import { NgxEchartsModule } from 'ngx-echarts'
import {
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
  NgxMatNativeDateModule,
} from '@angular-material-components/datetime-picker'
import { MeterChartComponent } from 'src/app/component/dashboard/meter-chart/meter-chart.component'
import { MeterDialogComponent } from './charger-sessions/meter-dialog/meter-dialog.component'
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
    ChargerComponent,
    ChargerInnerComponent,
    ChargerAnalyticsComponent,
    ChargerInformationComponent,
    ChargerSessionsComponent,
    ChargerEventComponent,
    MeterChartComponent,
    MeterDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxEchartsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    SharedModule,
    SharedMaterialModule,
    MatDatepickerModule,
    MatInputModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    MatTableExporterModule,
    NgxMatNativeDateModule,
  ],
})
export class ChargerModule {}
