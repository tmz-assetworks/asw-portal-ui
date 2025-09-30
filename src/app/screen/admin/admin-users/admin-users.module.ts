import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AdminUsersComponent } from './admin-users.component'
import { CreateAdminComponent } from './create-admin/create-admin.component'

const routes: Routes = [
  { path: '', component: AdminUsersComponent },
  { path: 'create-admin', component: CreateAdminComponent },
  { path: 'view-admin', component: CreateAdminComponent },
  { path: 'edit-admin', component: CreateAdminComponent },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ],
  exports: [],
  declarations: [],
  providers: [],
})
export class AdminUsersModule { }

