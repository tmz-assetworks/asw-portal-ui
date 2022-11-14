import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from 'src/app/gurads/auth.guard'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'
import { SharedModule } from 'src/app/shared/shared.module'
import { NgxEchartsModule } from 'ngx-echarts'
import { MainMasterModule } from '../master/master.module'
import { MasterComponent } from '../master/master.component'
import { RoleAuthGuard } from 'src/app/gurads/role.auth.guard'
import { GraphDetailComponent } from './graph-detail/graph-detail.component'
import { CommonModule } from '@angular/common'

const routes: Routes = [
  {
    path: '',
    component: MasterComponent,
    canActivate: [RoleAuthGuard],
    // pathMatch: 'full',
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
    SharedMaterialModule,
    SharedModule,
    RouterModule.forChild(routes),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  exports: [],
  declarations: [GraphDetailComponent],
})
export class OperatorModule {}
