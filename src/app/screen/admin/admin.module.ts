import { NgModule } from '@angular/core'
import { CustomersComponent } from './customers/customers.component'
import { ManageChargersComponent } from './manage-chargers/manage-chargers.component'
import { ManageAssetsComponent } from './manage-assets/manage-assets.component'
import { ManagePricingComponent } from './manage-pricing/manage-pricing.component'
import { ManageSubscriptionsComponent } from './manage-subscriptions/manage-subscriptions.component'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'
import { RouterModule, Routes } from '@angular/router'
import { MasterComponent } from '../master/master.component'
import { SharedModule } from 'src/app/shared/shared.module'

import { RoleAuthGuard } from 'src/app/gurads/role.auth.guard'
import { HelpComponent } from '../operator/help/help.component'

import { ManageLocationModule } from './manage-locations/manage-locations.module'
import { ManageAsstesModule } from './manage-assets/manage-assets.module'

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
        component: ManageSubscriptionsComponent,
        pathMatch: 'full',
      },
      // {
      //   path: 'help',
      //   component: HelpComponent,
      //   pathMatch: 'full',
      // },
    ],
  },
]

@NgModule({
  imports: [
    ManageLocationModule,
    SharedMaterialModule,
    ManageAsstesModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  exports: [],
  declarations: [CustomersComponent, ManageSubscriptionsComponent],
  providers: [],
})
export class AdminModule {}
