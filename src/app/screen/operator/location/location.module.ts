import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LocationComponent } from './location.component'
import { RouterModule, Routes } from '@angular/router'
import { AnalyticsComponent } from './analytics/analytics.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'
import { LocationInformationComponent } from './location-information/location-information.component'
import { LocationChargersComponent } from './location-chargers/location-chargers.component'
import { LocationInnerComponent } from './location-inner/location-inner.component'
import { NgxEchartsModule } from 'ngx-echarts';
import { LocationStausComponent } from './location-staus/location-staus.component';
import { EventsLogComponent } from './events-log/events-log.component'
import { GraphDetailComponent } from '../graph-detail/graph-detail.component'
import { LocationStatusPanelComponent } from './location-status-panel/location-status-panel.component';
import { CommandDialogComponent } from './location-chargers/command-dialog/command-dialog.component'
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker'


const routes: Routes = [
  {
    path: '',
    component: LocationComponent,
    
    children: [
      {
        path: '',
        component: LocationInnerComponent,
        pathMatch: 'full',
      },

      {
        path: 'analytics',
        component: AnalyticsComponent,
        // pathMatch: 'full',
      },

      {
        path: 'location-info',
        component: LocationInformationComponent,
        // pathMatch: 'full',
      },
      {
        path: 'location-chargers',
        component: LocationChargersComponent,
        // pathMatch: 'full',
      },
      {
        path: 'events-log',
        component: EventsLogComponent,
        // pathMatch: 'full',
      },
      {
        path: 'location-status',
        component: LocationStausComponent,
        // pathMatch: 'full',
      },
    ],
  },
  { path: 'detail', component: GraphDetailComponent},
  { path: 'detail/:id', component: GraphDetailComponent},
 {path: 'analytics/detail', component: GraphDetailComponent},
  {path: 'analytics/detail/:id', component: GraphDetailComponent} 
]

@NgModule({
  declarations: [
    LocationComponent,
    AnalyticsComponent,
    LocationInformationComponent,
    LocationChargersComponent,
    LocationInnerComponent,
    LocationStausComponent,
    EventsLogComponent,
    LocationStatusPanelComponent,
    CommandDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    SharedMaterialModule,
    NgxEchartsModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule
  ],
  exports: [LocationComponent],
})
export class LocationModule {}
