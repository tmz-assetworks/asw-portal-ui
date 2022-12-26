import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { LoginComponent } from './login.component'
import { CommonModule } from '@angular/common'
import { CookieService } from 'ngx-cookie-service'
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'
import { ChangePasswordComponent } from './change-password/change-password.component'
import { LoginVerificationComponent } from './login-verification/login-verification.component'
import { ConfirmationMailComponent } from './confirmation-mail/confirmation-mail.component'

@NgModule({
  imports: [RouterModule, ReactiveFormsModule, FormsModule, CommonModule],
  exports: [],
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    LoginVerificationComponent,
    ConfirmationMailComponent,
  ],
  providers: [CookieService],
})
export class LoginModule {}
