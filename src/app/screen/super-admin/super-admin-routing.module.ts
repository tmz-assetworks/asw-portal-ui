import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from 'src/app/gurads/auth.guard'
import { RoleAuthGuard } from 'src/app/gurads/role.auth.guard'
import { MasterComponent } from '../master/master.component'
import { HelpComponent } from './help/help.component'

const routes: Routes = [
  {
    path: '',
    component: MasterComponent,
    canActivate: [RoleAuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'customer',
        pathMatch: 'full',
      },
      {
        path: 'customer',
        loadChildren: () =>
          import(
            '../super-admin/manage-customers/manage-customers.module'
          ).then((m) => m.ManageCustomersModule),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('../super-admin/manage-admin-users/manage-admin.module').then(
            (m) => m.ManageAdminModule,
          ),
      },
      {
        path: 'help',
        component: HelpComponent,
        // loadChildren: () =>
        //   import('../super-admin/manage-admin-users/manage-admin.module').then(
        //     (m) => m.ManageAdminModule,
        //   ),
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
})
export class SuperAdminRoutingModule {}
