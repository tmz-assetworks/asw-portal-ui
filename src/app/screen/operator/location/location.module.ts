import { NgModule } from '@angular/core'
import { LocationComponent } from './location.component'
import { RouterModule, Routes } from '@angular/router'
import { AnalyticsComponent } from './analytics/analytics.component'
import { LocationInformationComponent } from './location-information/location-information.component'
import { LocationChargersComponent } from './location-chargers/location-chargers.component'
import { LocationInnerComponent } from './location-inner/location-inner.component'
import { LocationStausComponent } from './location-staus/location-staus.component';
import { EventsLogComponent } from './events-log/events-log.component'
import { GraphDetailComponent } from '../graph-detail/graph-detail.component'


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
   
  ],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [],
})
export class LocationModule {}
