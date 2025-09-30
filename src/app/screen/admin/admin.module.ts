import { NgModule } from '@angular/core';
import { CustomersComponent } from './customers/customers.component';
import { RouterModule, Routes } from '@angular/router';
import { MasterComponent } from '../master/master.component';
import { roleAuthGuard } from 'src/app/gurads/role.auth.guard';
import { HelpComponent } from './help/help.component';
import { DashboardComponent } from '../operator/dashboard/dashboard.component';
import { GraphDetailComponent } from '../operator/graph-detail/graph-detail.component';
import { AddCustomersComponent } from './customers/add-customers/add-customers.component';


const routes: Routes = [
  {
    path: '',
    component: MasterComponent,
    canActivate: [roleAuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        pathMatch: 'full',
      },
      { path: 'dashboard/detail', component: GraphDetailComponent},
      { path: 'dashboard/detail/:id', component: GraphDetailComponent},
      {
        path: 'customer',
        // In angular 15 , children and loadChildren cannot be used together.
        children: [
          {
            path: '',
            component: AddCustomersComponent,
            pathMatch: 'full',
          },
          {
            path: 'edit-customer',
            component: AddCustomersComponent,
            pathMatch: 'full',
          },
          {
            path: 'customer',
            component: AddCustomersComponent,
            pathMatch: 'full',
          }
        ]
      },
      {
        path: 'profile',
        component: CustomersComponent,
        pathMatch: 'full',
      },
      {
        path: 'location',
        loadChildren: () =>
          import('../operator/location/location.module').then((m) => m.LocationModule),
      },
      {
        path: 'charger',
        loadChildren: () =>
          import('../../screen/operator/charger/charger.module').then((m) => m.ChargerModule),
      },
      {
        path: 'admin-users',
        loadChildren: () =>
          import(
            '../admin/admin-users/admin-users.module'
          ).then((m) => m.AdminUsersModule),
      },

      {
        path: 'users',
        loadChildren: () =>
          import(
            '../admin/manage-operator-users/manage-operator-users.module'
          ).then((m) => m.ManageOperatorUsersModule),
      },

    


      {
        path: 'diagonstics',
        loadChildren: () =>
          import('../../screen/operator/diagnostics/diagnostics.module').then(
            (m) => m.DiagnosticsModule
          ),
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
        path: 'reports',
        loadChildren: () =>
          import('../operator/reports/reports.module').then((m) => m.ReportsModule),
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
    RouterModule.forChild(routes),
  ],
  exports: [],
  declarations: [],
})
export class AdminModule {}
