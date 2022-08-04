import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RoleAuthGuard } from './gurads/role.auth.guard'
// import { AuthGuard } from './gurads/auth.guard'
import { ChangePasswordComponent } from './screen/login/change-password/change-password.component'
import { ConfirmationMailComponent } from './screen/login/confirmation-mail/confirmation-mail.component'
import { ForgotPasswordComponent } from './screen/login/forgot-password/forgot-password.component'
import { LoginVerificationComponent } from './screen/login/login-verification/login-verification.component'
import { LoginComponent } from './screen/login/login.component'

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'changePassword', component: ChangePasswordComponent },
  { path: 'verifyOTP', component: LoginVerificationComponent },
  {path: 'confirmation-mail',component: ConfirmationMailComponent},
  {
    path: 'operator',
     canActivate: [RoleAuthGuard],
    loadChildren: () =>
      import('../app/screen/operator/operator.module').then(
        (m) => m.OperatorModule,
      ),
  },

  {
    path: 'admin',
    // canActivate: [RoleAuthGuard],
    loadChildren: () =>
      import('../app/screen/admin/admin.module').then((m) => m.AdminModule),
  },

  {
    path: 'superadmin',
    // canActivate: [RoleAuthGuard],
    loadChildren: () =>
      import('../app/screen/super-admin/super-admin.module').then(
        (m) => m.SuperAdminModule,
      ),
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
