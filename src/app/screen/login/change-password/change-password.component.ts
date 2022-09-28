import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { LoginService } from '../login.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  changePassForm: FormGroup
  passwordField = true
  passwordCField = true
  showLoader = false
  regexPass = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')
  objectID: any = ''
  username = ''
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
    this._activatedRoute.queryParams.subscribe((params) => {
      this.username = params['username']
      this.objectID = params['objectID']
    })
    // alert(this.username)
    let email
    email = localStorage.getItem('userEmailVerify') || ''
    if (
      (email == undefined || email == null || email == '') &&
      this.username == undefined
    ) {
      this.toastr.success('Email Not Setted')
      setTimeout(() => {
        this._router.navigate(['./forgotPassword'])
      }, 4000)
    }
  }

  saveForm() {
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
        this._loginService.changePassword(email, encryptedPassword).subscribe({
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
        this._loginService
          .changePasswordObjectId(this.username, encryptedPassword)
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
