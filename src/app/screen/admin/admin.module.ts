import { NgModule } from '@angular/core'
import { CustomersComponent } from './customers/customers.component'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'
import { RouterModule, Routes } from '@angular/router'
import { MasterComponent } from '../master/master.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { RoleAuthGuard } from 'src/app/gurads/role.auth.guard'
import { ManageLocationModule } from './manage-locations/manage-locations.module'
import { ManageAsstesModule } from './manage-assets/manage-assets.module'
import { ManageSubscriptionsModule } from './manage-subscriptions/manage-subscription-module'
import { HelpComponent } from './help/help.component'
import { CommonModule } from '@angular/common'

const routes: Routes = [
  {
    path: '',
    component: MasterComponent,
    canActivate: [RoleAuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
      {
        path: 'profile',
        component: CustomersComponent,
        pathMatch: 'full',
      },

      {
        path: 'users',
        loadChildren: () =>
          import(
            '../admin/manage-operator-users/manage-operator-users.module'
          ).then((m) => m.ManageOperatorUsersModule),
      },

      {
        path: 'locations',
        loadChildren: () =>
          import('../admin/manage-locations/manage-locations.module').then(
            (m) => m.ManageLocationModule,
          ),
      },

      {
        path: 'vehicles',
        loadChildren: () =>
          import('../admin/manage-vehicles/manage-vehicles.module').then(
            (m) => m.ManageVehiclesModule,
          ),
      },

      {
        path: 'chargers',
        loadChildren: () =>
          import('../admin/manage-chargers/manage-charger.module').then(
            (m) => m.ManageVehiclesModule,
          ),
      },
      {
        path: 'assets',
        loadChildren: () =>
          import('../admin/manage-assets/manage-assets.module').then(
            (m) => m.ManageAsstesModule,
          ),
      },
      {
        path: 'pricing',
        loadChildren: () =>
          import('../admin/manage-pricing/manage-pricing.module').then(
            (m) => m.ManagePricingModule,
          ),
      },
      {
        path: 'subscriptions-plans',
        loadChildren: () =>
          import(
            '../admin/manage-subscriptions/manage-subscription-module'
          ).then((m) => m.ManageSubscriptionsModule),
      },
      {
        path: 'user-profile',
        loadChildren: () =>
          import('../../screen/user-profile/user-profile.module').then(
            (m) => m.UserProfileModule,
          ),
      },

      {
        path: 'help',
        component: HelpComponent,
        pathMatch: 'full',
      },
    ],
  },
]

@NgModule({
  imports: [
    ManageLocationModule,
    ManageSubscriptionsModule,
    SharedMaterialModule,
    ManageAsstesModule,
    RouterModule.forChild(routes),
    SharedModule,
    CommonModule,
  ],
  exports: [],
  declarations: [CustomersComponent, HelpComponent],
  providers: [],
})
export class AdminModule {}
