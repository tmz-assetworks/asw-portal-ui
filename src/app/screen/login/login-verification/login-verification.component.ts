import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-verification',
  templateUrl: './login-verification.component.html',
  styleUrls: ['./login-verification.component.scss']
})
export class LoginVerificationComponent implements OnInit {
  verifyOTPForm: FormGroup;
  constructor(private _router: Router,private toastr: ToastrService) {
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
    let opt = (this.verifyOTPForm.value.code1 + this.verifyOTPForm.value.code2 + this.verifyOTPForm.value.code3 + this.verifyOTPForm.value.code4 + this.verifyOTPForm.value.code5 + this.verifyOTPForm.value.code6)
     if(opt == '123456') {
     this.toastr.success('OTP Verified, Please Change Password');
     this._router.navigate(['./changePassword'])
     } else {
     this.toastr.error('Invalid OTP, Please Try Again');
     setTimeout(() => {
      this.verifyOTPForm.reset();
     },4000)
     }
   }
  }
}
