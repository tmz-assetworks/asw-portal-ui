import { SharedModule } from 'src/app/shared/shared.module'
import { SharedMaterialModule } from './../../../shared/shared-material.module'
import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'

import { CommonModule } from '@angular/common'
import { ManageLocationsComponent } from './manage-locations.component'
import { AddLocationComponent } from './add-location/add-location.component'
import { GooglePlaceModule } from 'ngx-google-places-autocomplete'

const routes: Routes = [
  { path: '', component: ManageLocationsComponent },
  { path: 'add-location', component: AddLocationComponent },
  { path: 'edit-location', component: AddLocationComponent },
  { path: 'view-location', component: AddLocationComponent },
]

@NgModule({
  imports: [
    CommonModule,
    SharedMaterialModule,
    SharedModule,
    RouterModule.forChild(routes),
    GooglePlaceModule,
  ],
  declarations: [ManageLocationsComponent, AddLocationComponent],
  providers: [],
})
export class ManageLocationModule {}
