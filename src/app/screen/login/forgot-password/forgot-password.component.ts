import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  showLoader = false;
  constructor(private _loginService: LoginService, private _router: Router, private toastr: ToastrService) { 
    this.forgotPasswordForm = new FormGroup(
      {'email': new FormControl(null, [Validators.required, Validators.email])
    })
  }

  ngOnInit(): void {
    localStorage.removeItem('userEmail');
  }

  saveForm() {
    if(this.forgotPasswordForm.value.email == null) {
     
      this.toastr.error('Please enter email');
   } else if(this.forgotPasswordForm.controls['email'].errors != null ) {
   this.toastr.error('Incorrect email');
 } else {
    this.showLoader = true;
     this._loginService.verifyUser(this.forgotPasswordForm.value.email).subscribe({
      next: (response: any) => {
        let email = response.data.userPrincipalName;
        localStorage.setItem('userEmail',email);
        this.showLoader = false;
        this._router.navigate(['/verifyOTP']);
      },
      error: (err) => {
        this.showLoader = false;
        this.toastr.error('Something Went Wrong','Please Try Again')
      }
    });
    }
  }

}
