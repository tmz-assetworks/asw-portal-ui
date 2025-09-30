import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { ManageLocationsComponent } from './manage-locations.component'
import { AddLocationComponent } from './add-location/add-location.component'


const routes: Routes = [
  { path: '', component: ManageLocationsComponent },
  { path: 'add-location', component: AddLocationComponent },
  { path: 'edit-location', component: AddLocationComponent },
  { path: 'view-location', component: AddLocationComponent },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  declarations: [],
  providers: [],
})
export class ManageLocationModule {}
