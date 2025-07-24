import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from 'src/app/gurads/auth.guard'
import { RoleAuthGuard } from 'src/app/gurads/role.auth.guard'
import { CustomersComponent } from '../admin/customers/customers.component'
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
        path: 'report',
        loadChildren: () =>
          import('../super-admin/report/reports.module').then(
            (m) => m.ReportsModule,
          ),
      },
      {
        path: 'help',
        component: HelpComponent,
        //   // loadChildren: () =>
        //   //   import('../super-admin/manage-admin-users/manage-admin.module').then(
        //   //     (m) => m.ManageAdminModule,
        //   //   ),
      },
      {
        path: 'user-profile',
        loadChildren: () =>
          import('../../screen/user-profile/user-profile.module').then(
            (m) => m.UserProfileModule,
          ),
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
})
export class SuperAdminRoutingModule {}
