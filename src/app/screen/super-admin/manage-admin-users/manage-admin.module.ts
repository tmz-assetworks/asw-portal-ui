import { SharedModule } from 'src/app/shared/shared.module';
import { SharedMaterialModule } from './../../../shared/shared-material.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ManageAdminUsersComponent } from './manage-admin-users.component';

import { CreateAdminComponent } from './create-admin/create-admin.component';
import { CommonModule } from '@angular/common';
const routes: Routes = [{ path: '', component: ManageAdminUsersComponent },
{ path: 'createadmin', component: CreateAdminComponent }]

@NgModule({
  imports: [CommonModule, SharedMaterialModule, SharedModule,RouterModule.forChild(routes)],
  declarations: [ManageAdminUsersComponent, CreateAdminComponent,],
  providers: [],
})
export class ManageAdminModule { }
