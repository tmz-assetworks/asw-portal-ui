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
import { NgxEchartsModule } from 'ngx-echarts'

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
    ],
  },
]

@NgModule({
  declarations: [
    LocationComponent,
    AnalyticsComponent,
    LocationInformationComponent,
    LocationChargersComponent,
    LocationInnerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    SharedMaterialModule,
    NgxEchartsModule,
  ],
  exports: [LocationComponent],
})
export class LocationModule {}
