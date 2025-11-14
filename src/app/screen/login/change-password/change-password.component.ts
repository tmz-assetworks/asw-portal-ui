import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { LoginService } from '../login.service'
import { CommonModule } from '@angular/common'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  imports:[   
    CommonModule,
    SharedMaterialModule,
    ReactiveFormsModule,
    RouterModule]
})
export class ChangePasswordComponent implements OnInit {
  changePassForm: FormGroup
  passwordField = true
  passwordCField = true
  showLoader = false
  regexPass = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')
  objectID: any = ''
  username = ''

    // ✅ Password requirements list
  passwordRequirements = [
    { text: 'At least 8 characters long', valid: false },
    { text: 'At least one uppercase letter (A-Z)', valid: false },
    { text: 'At least one lowercase letter (a-z)', valid: false },
    { text: 'At least one number (0-9)', valid: false },
    { text: 'At least one special character (!@#$%^&*)', valid: false },
  ]
  
  constructor(
    private _loginService: LoginService,
    private _router: Router,
    private toastr: ToastrService,
    private _activatedRoute: ActivatedRoute,
  ) {
    this.changePassForm = new FormGroup({
      password: new FormControl(null, [Validators.required]),
      cpassword: new FormControl(null, [Validators.required]),
    })
  }

  ngOnInit(): void {
    // CHECK FOR QUERY PARAM
    // https://qa-portal-ui.azurewebsites.net/changePassword?username=userName&objectID=objectID
    // CHECK IF LINK CREATION TIME GREATER THAN CURRENT TIME

    let currentDate = new Date()
    let currentTime = currentDate.getTime()
    let futureDate = localStorage.getItem('timeInterval') || '';
    if (futureDate !== '' && Number.parseInt(futureDate) < currentTime) {
      this.toastr.error('Link Has Expired Please Contact Your Administrator')
      return
    }

    this._activatedRoute.queryParams.subscribe((params) => {
      this.username = params['username']
      this.objectID = params['objectID']
    })

    const email = localStorage.getItem('userEmailVerify') || ''
    if (
      (email == undefined || email == null || email == '') &&
      this.username == undefined
    ) {
      this.toastr.success('Email Not Setted')
      setTimeout(() => {
        this._router.navigate(['./forgotPassword'])
      }, 4000)
    }
    this.changePassForm.get('password')?.valueChanges.subscribe(value => {
      this.updatePasswordValidity(value || '');
    });
  }

   updatePasswordValidity(password: string) {
    this.passwordRequirements[0].valid = password.length >= 8;
    this.passwordRequirements[1].valid = /[A-Z]/.test(password);
    this.passwordRequirements[2].valid = /[a-z]/.test(password);
    this.passwordRequirements[3].valid = /\d/.test(password);
    this.passwordRequirements[4].valid = /[!@#$%^&*]/.test(password);
  }
  
  saveForm() {
    const allValid = this.passwordRequirements.every(req => req.valid);
    if (!allValid) {
      this.toastr.error('Password does not meet the listed requirements.');
      return;
    }
    if (
      this.changePassForm.value.password == null ||
      this.changePassForm.value.cpassword == null
    ) {
      this.toastr.error('Please enter all values')
    } else if (!this.regexPass.test(this.changePassForm.value.password)) {
      // check for pattern
      this.toastr.error(
        'Password should have minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter 1 number and special characters',
      )
    } else if (!this.regexPass.test(this.changePassForm.value.cpassword)) {
      // check for pattern
      this.toastr.error(
        'Password should have minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter 1 number and special characters',
      )
    } else if (
      this.changePassForm.value.password.trim() !=
      this.changePassForm.value.cpassword.trim()
    ) {
      this.toastr.error('Password and confirm pasword should have same value')
    } else {
      this.showLoader = true
      let email
      email = localStorage.getItem('userEmailVerify') || ''
      if (
        email !== '' &&
        email !== undefined &&
        email !== null &&
        this.username == undefined
      ) {
        email = JSON.parse(JSON.stringify(email))
        let encryptedPassword = this._loginService.encryptPassword(
          this.changePassForm.value.password.trim(),
        )
        let resetToken = localStorage.getItem('resetToken') || ''
        this._loginService
          .changePassword(email, encryptedPassword, resetToken)
          .subscribe({
            next: (response) => {
              this.showLoader = false
              this.toastr.success('Password Changed Successfully')
              this._router.navigate(['./login'])
            },
            error: (err) => {
              this.showLoader = false
              this.toastr.error('Something Went Wrong', 'Please Try Again')
              setTimeout(() => {
                this.changePassForm.reset()
              }, 4000)
            },
          })
      } else if (this.username !== '' && this.username !== undefined) {
        let encryptedPassword = this._loginService.encryptPassword(
          this.changePassForm.value.password.trim(),
        )
        let resetToken = localStorage.getItem('resetToken') || ''
        this._loginService
          .changePasswordObjectId(this.username, encryptedPassword, resetToken)
          .subscribe({
            next: (response) => {
              this.showLoader = false
              this.toastr.success('Password Changed Successfully')
              this._router.navigate(['./login'])
            },
            error: (err) => {
              this.showLoader = false
              this.toastr.error('Something Went Wrong', 'Please Try Again')
              setTimeout(() => {
                this.changePassForm.reset()
              }, 4000)
            },
          })
      }
    }
  }
  showPassword() {
    this.passwordField = this._loginService.showPassword(this.passwordField)
  }
  showCPassword() {
    this.passwordCField = this._loginService.showPassword(this.passwordCField)
  }
}
