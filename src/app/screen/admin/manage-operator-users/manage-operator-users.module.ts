import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ManageOperatorUsersComponent } from './manage-operator-users.component'
import { AddOperatorComponent } from './add-operator/add-operator.component'
import { AddVehicleComponent } from '../manage-vehicles/add-vehicle/add-vehicle.component'

const routes: Routes = [
  { path: '', component: ManageOperatorUsersComponent },
  { path: 'add-operator', component: AddOperatorComponent },
  { path: 'view-operator', component: AddOperatorComponent },
  { path: 'edit-operator', component: AddOperatorComponent },
  { path: 'add-vehicle', component: AddVehicleComponent },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [],
  declarations: [],
  providers: [],
})
export class ManageOperatorUsersModule {}
