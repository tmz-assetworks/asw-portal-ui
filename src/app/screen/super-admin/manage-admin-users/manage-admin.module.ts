import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { ManageAdminUsersComponent } from './manage-admin-users.component'
import { CreateAdminComponent } from './create-admin/create-admin.component'
const routes: Routes = [
  { path: '', component: ManageAdminUsersComponent },
  { path: 'create-admin', component: CreateAdminComponent },
  { path: 'view-admin', component: CreateAdminComponent },
  { path: 'edit-admin', component: CreateAdminComponent },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  declarations: [],
  providers: [],
})
export class ManageAdminModule {}
