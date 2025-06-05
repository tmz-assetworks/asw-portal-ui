import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'
import { AdminUsersComponent } from './admin-users.component'
// import { CreateAdminComponent } from './create-admin/create-admin.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { CommonModule } from '@angular/common'
import {
  MatFormFieldControl,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { CreateAdminComponent } from './create-admin/create-admin.component'

//import { AddVehicleComponent } from '../manage-vehicles/add-vehicle/add-vehicle.component'

const routes: Routes = [
  { path: '', component: AdminUsersComponent },
  { path: 'create-admin', component: CreateAdminComponent },
  { path: 'view-admin', component: CreateAdminComponent },
  { path: 'edit-admin', component: CreateAdminComponent },
  // { path: 'add-vehicle', component: AddVehicleComponent },
]

@NgModule({
  imports: [
    SharedMaterialModule,
    RouterModule.forChild(routes),
    SharedModule,
    CommonModule,
    MatFormFieldModule,
  ],
  exports: [AdminUsersComponent],
  declarations: [AdminUsersComponent, CreateAdminComponent],
  providers: [],
})
export class AdminUsersModule { }
