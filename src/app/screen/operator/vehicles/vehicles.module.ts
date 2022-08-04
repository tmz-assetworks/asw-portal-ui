import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { VehiclesComponent } from './vehicles.component'
import { VehicleAssetsComponent } from './vehicle-assets/vehicle-assets.component'
import { VehicleAssetsDetailsComponent } from './vehicle-assets-details/vehicle-assets-details.component'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'
import { SharedModule } from 'src/app/shared/shared.module'

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
    CommonModule,
    RouterModule.forChild(routes),
    SharedMaterialModule,
    SharedModule,
  ],
  exports: [],
  declarations: [
    VehiclesComponent,
    VehicleAssetsComponent,
    VehicleAssetsDetailsComponent,
  ],
  providers: [],
})
export class VehiclesModule {}
