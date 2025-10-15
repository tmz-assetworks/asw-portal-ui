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
import { SharedModule } from 'src/app/shared/shared.module'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [RouterModule, ReactiveFormsModule, FormsModule, CommonModule, MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    LoginComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    LoginVerificationComponent,
    ConfirmationMailComponent],
  exports: [SharedModule],
  declarations: [
   
  ],
  providers: [CookieService],
})
export class LoginModule {}
