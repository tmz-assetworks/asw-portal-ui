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
import { AuthGuard } from 'src/app/gurads/auth.guard'
import { RoleAuthGuard } from 'src/app/gurads/role.auth.guard'
import { HelpComponent } from '../operator/help/help.component'
import { AddLocationComponent } from './manage-locations/add-location/add-location.component'
import { ManageLocationModule } from './manage-locations/manage-locations.module'
import { ManageVehiclesComponent } from './manage-vehicles/manage-vehicles.component'

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
        component: CustomersComponent,
        pathMatch: 'full',
      },

      {
        path: 'operator-user',
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
          import(
            '../admin/manage-vehicles/manage-vehicles.module'
          ).then((m) => m.ManageVehiclesModule),
      },
      
      {
        path: 'chargers',
        loadChildren: () =>
          import(
            '../admin/manage-chargers/manage-charger.module'
          ).then((m) => m.ManageVehiclesModule),
      },
      {
        path: 'assets',
        component: ManageAssetsComponent,
        pathMatch: 'full',
      },
      {
        path: 'pricing',
        component: ManagePricingComponent,
        pathMatch: 'full',
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
    RouterModule.forChild(routes),
    SharedModule,
  ],
  exports: [],
  declarations: [
    CustomersComponent,
    ManageAssetsComponent,
    ManagePricingComponent,
    ManageSubscriptionsComponent,
  ],
  providers: [],
})
export class AdminModule {}
