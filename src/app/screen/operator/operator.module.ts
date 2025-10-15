import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RoleAuthGuard } from 'src/app/gurads/role.auth.guard'
import { MasterComponent } from '../master/master.component'
import { CommonModule } from '@angular/common'

const routes: Routes = [
  {
    path: '',
    component: MasterComponent,
    canActivate: [RoleAuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },

      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'location',
        loadChildren: () =>
          import('./location/location.module').then((m) => m.LocationModule),
      },

      {
        path: 'charger',
        loadChildren: () =>
          import('./charger/charger.module').then((m) => m.ChargerModule),
      },
      {
        path: 'diagonstics',
        loadChildren: () =>
          import('./diagnostics/diagnostics.module').then(
            (m) => m.DiagnosticsModule,
          ),
      },
      {
        path: 'vehicles',
        loadChildren: () =>
          import('./vehicles/vehicles.module').then((m) => m.VehiclesModule),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./reports/reports.module').then((m) => m.ReportsModule),
      },
      {
        path: 'alerts',
        loadChildren: () =>
          import('./alerts/alerts.module').then((m) => m.AlertsModule),
      },
      {
        path: 'help',
        loadChildren: () =>
          import('./help/help.module').then((m) => m.HelpModule),
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
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [],
  declarations: [],
})
export class OperatorModule {}
