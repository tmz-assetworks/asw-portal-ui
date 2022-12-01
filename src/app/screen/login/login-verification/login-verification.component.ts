import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { LoginService } from '../login.service'

@Component({
  selector: 'app-login-verification',
  templateUrl: './login-verification.component.html',
  styleUrls: ['./login-verification.component.scss'],
})
export class LoginVerificationComponent implements OnInit {
  // https://qa-portal-ui.azurewebsites.net/verifyOTP?emailid=admintest@devopstekmindz.onmicrosoft.com
  verifyOTPForm: FormGroup
  showLoader = false
  email: string
  emailQuery: string = ''
  constructor(
    private _router: Router,
    private toastr: ToastrService,
    private _loginService: LoginService,
    private _activatedRoute: ActivatedRoute,
  ) {
    this.email = localStorage.getItem('userEmail') || ''
    this.verifyOTPForm = new FormGroup({
      code1: new FormControl(null, [Validators.required]),
      code2: new FormControl(null, [Validators.required]),
      code3: new FormControl(null, [Validators.required]),
      code4: new FormControl(null, [Validators.required]),
      code5: new FormControl(null, [Validators.required]),
      code6: new FormControl(null, [Validators.required]),
    })
  }

  ngOnInit(): void {
    localStorage.removeItem('userEmailVerify')
    localStorage.removeItem('resetToken')
    localStorage.removeItem('timeInterval')
    this._activatedRoute.queryParams.subscribe((params) => {
      this.emailQuery = params['emailid']
    })
    if (this.emailQuery !== undefined) {
      localStorage.setItem('userEmailVerify', this.emailQuery)
      this.email = this.emailQuery
      // this._router.navigate(['./changePassword'])
    }
  }

  verifyOTP() {
    if (
      this.verifyOTPForm.value.code1 == null ||
      this.verifyOTPForm.value.code2 == null ||
      this.verifyOTPForm.value.code3 == null ||
      this.verifyOTPForm.value.code4 == null ||
      this.verifyOTPForm.value.code5 == null ||
      this.verifyOTPForm.value.code6 == null
    ) {
      this.toastr.error('Please enter all values')
    } else {
      let otp =
        this.verifyOTPForm.value.code1 +
        this.verifyOTPForm.value.code2 +
        this.verifyOTPForm.value.code3 +
        this.verifyOTPForm.value.code4 +
        this.verifyOTPForm.value.code5 +
        this.verifyOTPForm.value.code6
      //  if(otp == '123456') {

      // CALL API

      this.showLoader = true
      this._loginService.verifyUserByOTP(this.email, otp).subscribe({
        next: (response: any) => {
          let resetToken = response.resettoken
          localStorage.setItem('resetToken', resetToken)
          localStorage.setItem('userEmailVerify', this.email)
          this.showLoader = false
          this.setTime()
          this.toastr.success('OTP Verified, Please Change Password')
          this._router.navigate(['/confirmation-mail'])
        },
        error: (err) => {
          this.showLoader = false
          this.toastr.error('Something Went Wrong', 'Please Try Again')
        },
      })
      // this._router.navigate(['./changePassword'])
      //  }
    }
  }

  sendCodeAgain() {
    this.showLoader = true

    this._loginService.verifyUser(this.email).subscribe({
      next: (response: any) => {
        let email = response.data.userPrincipalName
        localStorage.setItem('userEmailVerify', email)
        this.showLoader = false
        this.toastr.success('OTP Send To Emailid')
        this._router.navigate(['/verifyOTP'])
      },
      error: (err) => {
        this.showLoader = false
        this.toastr.error('Something Went Wrong', 'Please Try Again')
      },
    })
  }

  setTime() {
    let minutesToAdd = 10
    let currentDate = new Date()
    let futureDate = new Date(currentDate.getTime() + minutesToAdd * 60000)
    let futureDateTime = futureDate.getTime()
    localStorage.setItem('timeInterval', JSON.stringify(futureDateTime))
  }

  nextStep(event: any, step: number): void {
    // if (this.verifyOTPForm.valid) {
    //   // this.onSubmit()
    //   this.verifyOTP()
    // }
    const prevElement = document.getElementById('code' + (step - 1))
    const nextElement = document.getElementById('code' + (step + 1))

    if (event.code == 'Backspace' && event.target.value === '') {
      event.target.parentElement.parentElement.children[
        step - 2 > 0 ? step - 2 : 0
      ].children[0].value = ''
      if (prevElement) {
        prevElement.focus()
        return
      }
    } else {
      if (nextElement) {
        nextElement.focus()
        return
      } else {
      }
    }
  }
  paste(event: any) {
    let clipboardData = event.clipboardData
    let pastedText = clipboardData.getData('text')
    this.verifyOTPForm.setValue({
      code1: pastedText.charAt(0),
      code2: pastedText.charAt(1),
      code3: pastedText.charAt(2),
      code4: pastedText.charAt(3),
      code5: pastedText.charAt(4),
      code6: pastedText.charAt(5),
    })
    // this.onSubmit()
    //
  }
}
