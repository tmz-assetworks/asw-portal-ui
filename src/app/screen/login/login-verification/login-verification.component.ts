import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login-verification',
  templateUrl: './login-verification.component.html',
  styleUrls: ['./login-verification.component.scss']
})
export class LoginVerificationComponent implements OnInit {
  verifyOTPForm: FormGroup;
  showLoader = false;
  email: string;
  constructor(private _router: Router,private toastr: ToastrService,private _loginService: LoginService) {
   this.email = localStorage.getItem('userEmail') || '';
    this.verifyOTPForm = new FormGroup({'code1': new FormControl(null, [Validators.required]),
    'code2': new FormControl(null,[Validators.required]),
      'code3': new FormControl(null, [Validators.required]),
    'code4': new FormControl(null,[Validators.required]),'code5': new FormControl(null, [Validators.required]),
    'code6': new FormControl(null,[Validators.required])
     })
   }

  ngOnInit(): void {
  }
  
  verifyOTP() {
    if(this.verifyOTPForm.value.code1 == null || this.verifyOTPForm.value.code2 == null || this.verifyOTPForm.value.code3 == null || this.verifyOTPForm.value.code4 == null || this.verifyOTPForm.value.code5 == null || this.verifyOTPForm.value.code6 == null) {
     
      this.toastr.error('Please enter all values');
   } else {
    let otp = (this.verifyOTPForm.value.code1 + this.verifyOTPForm.value.code2 + this.verifyOTPForm.value.code3 + this.verifyOTPForm.value.code4 + this.verifyOTPForm.value.code5 + this.verifyOTPForm.value.code6)
   //  if(otp == '123456') {
     
     // CALL API
     
     this.showLoader = true;
     this._loginService.verifyUserByOTP(this.email,otp).subscribe({
      next: (response: any) => {
        this.showLoader = false;
        this.toastr.success('OTP Verified, Please Change Password');
        this._router.navigate(['/confirmation-mail']);
      },
      error: (err) => {
        this.showLoader = false;
        this.toastr.error('Something Went Wrong','Please Try Again')
      }
    });
    // this._router.navigate(['./changePassword'])
   //  } 
   }
  }

  sendCodeAgain() {
    this.showLoader = true;
    
     this._loginService.verifyUser(this.email).subscribe({
      next: (response: any) => {
        let email = response.data.userPrincipalName;
        localStorage.setItem('userEmail',email);
        this.showLoader = false;
        this.toastr.success('OTP Send To Emailid');
        this._router.navigate(['/verifyOTP']);
      },
      error: (err) => {
        this.showLoader = false;
        this.toastr.error('Something Went Wrong','Please Try Again')
      }
    });
  }
}
