import { NgModule } from '@angular/core'
import { CustomersComponent } from './customers/customers.component'
import { ManageLocationsComponent } from './manage-locations/manage-locations.component'
import { ManageVehiclesComponent } from './manage-vehicles/manage-vehicles.component'
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

const routes: Routes = [
  {
    path: '',
    component: MasterComponent,
    canActivate: [RoleAuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'operator-user',
        pathMatch: 'full',
      },

      {
        path: 'operator-user',
        loadChildren: () =>
          import(
            '../admin/manage-operator-users/manage-operator-users.module'
          ).then((m) => m.ManageOperatorUsersModule),
      },
    ],
  },
]

@NgModule({
  imports: [SharedMaterialModule, RouterModule.forChild(routes), SharedModule],
  exports: [],
  declarations: [
    CustomersComponent,
    ManageLocationsComponent,
    ManageVehiclesComponent,
    ManageChargersComponent,
    ManageAssetsComponent,
    ManagePricingComponent,
    ManageSubscriptionsComponent,
  ],
  providers: [],
})
export class AdminModule {}
