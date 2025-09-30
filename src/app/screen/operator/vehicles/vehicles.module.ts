import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { VehiclesComponent } from './vehicles.component'
import { VehicleAssetsComponent } from './vehicle-assets/vehicle-assets.component'
import { VehicleAssetsDetailsComponent } from './vehicle-assets-details/vehicle-assets-details.component'

const routes: Routes = [
  {
    path: '',
    component: VehiclesComponent,
    children: [
      {
        path: '',
        component: VehicleAssetsComponent,
        pathMatch: 'full',
      },
      {
        path: 'vehicle-details',
        component: VehicleAssetsDetailsComponent,
        pathMatch: 'full',
      },
    ],
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [],
  declarations: [
  ],
  providers: [],
})
export class VehiclesModule {}
