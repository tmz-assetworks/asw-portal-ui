import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { LoginService } from './login.service'
import Swal from 'sweetalert2'
import { StorageService } from 'src/app/service/storage.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  myLoginForm: FormGroup
  email: string | any
  password: string | any
  rememeberValue = false
  passwordField = true
  showLoader = false

  constructor(
    private _router: Router,
    private _loginService: LoginService,
    private toastr: ToastrService,
    private _storageService: StorageService,
  ) {
    this.email =
      localStorage.getItem('emailEleVehi') != null &&
      localStorage.getItem('emailEleVehi') != ''
        ? localStorage.getItem('emailEleVehi')
        : null
    this.password =
      localStorage.getItem('passEleVehi') != null &&
      localStorage.getItem('passEleVehi') != ''
        ? localStorage.getItem('passEleVehi')
        : null
    this.rememeberValue =
      localStorage.getItem('emailEleVehi') != null &&
      localStorage.getItem('emailEleVehi') != ''
        ? true
        : false
    this.myLoginForm = new FormGroup({
      email: new FormControl(this.email, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(this.password, [Validators.required]),
      rememeberMe: new FormControl(this.rememeberValue),
    })
  }
  //  pass = 'nihi@12345'

  ngOnInit(): void {
    localStorage.removeItem('userEmail')
    localStorage.removeItem('token_operator')
    localStorage.removeItem('role')
    localStorage.removeItem('token_refresh')
    localStorage.removeItem('token_id')
    localStorage.removeItem('token_expires_on')
    localStorage.removeItem('refreshToken_expires_on')
  }

  rememberMe(event: any) {
    if (
      event.currentTarget.checked &&
      this.myLoginForm.value.email != null &&
      this.myLoginForm.value.password != null &&
      this.myLoginForm.controls['email'].errors == null &&
      this.myLoginForm.controls['password'].errors == null
    ) {
      localStorage.setItem('emailEleVehi', this.myLoginForm.value.email)
      localStorage.setItem('passEleVehi', this.myLoginForm.value.password)
    } else {
      // alert('unset value')
      localStorage.setItem('emailEleVehi', '')
      localStorage.setItem('passEleVehi', '')
    }
  }

  login() {
    // call azure ad for login

    if (
      this.myLoginForm.value.email == null &&
      this.myLoginForm.value.password == null
    ) {
      this.toastr.error('Please enter all values')
    } else if (
      this.myLoginForm.value.email == null ||
      this.myLoginForm.value.email == ''
    ) {
      this.toastr.error('Please enter email')
    } else if (
      this.myLoginForm.value.password == null ||
      this.myLoginForm.value.password == ''
    ) {
      this.toastr.error('Please enter password')
    } else if (
      this.myLoginForm.controls['email'].errors != null ||
      this.myLoginForm.controls['password'].errors != null
    ) {
      this.toastr.error('Incorrect email or password')
    } else {
      // DECODE PASSWORD
      let encryptedPassword = this._loginService.encryptPassword(
        this.myLoginForm.value.password.trim(),
      )
      this.showLoader = true

      const pBody = {
        username: this.myLoginForm.value.email.trim(),
        password: encryptedPassword,
      }
      this._loginService.loginUser(pBody).subscribe({
        next: (res) => {
          localStorage.setItem('userEmail', this.myLoginForm.value.email)
          const d = new Date()
          let time = d.getTime()
          //  res.data.expires_on = time + 120000; // 2 min
          //  res.data.not_before = time + 240000 // 4 min
          localStorage.setItem('token_operator', res.data[0].access_token)
          localStorage.setItem('token_refresh', res.data[0].refresh_token)
          localStorage.setItem('token_id', res.data[0].id_token) // for role
          localStorage.setItem('token_expires_on', res.data[0].expires_on)
          localStorage.setItem(
            'refreshToken_expires_on',
            res.data[0].not_before,
          )
          const decodeData = this._loginService.getDecodedAccessToken(
            res.data[0].id_token,
          )

          this._storageService.setLocalData('user_id', decodeData.oid)

          this.showLoader = false
          if (decodeData.roles == 'Operator') {
            localStorage.setItem('role', 'Operator')
            this._router.navigate(['/operator'])
          } else if (decodeData.roles == 'Admin') {
            localStorage.setItem('role', 'Admin')
            // admin/customer
            this._router.navigate(['/admin/customer'])
          } else if (decodeData.roles == 'SuperAdmin') {
            localStorage.setItem('role', 'SuperAdmin')
            this._router.navigate(['/superadmin/customer'])
          }
        },
        error: (err) => {
          this.showLoader = false
          this.toastr.error('Something Went Wrong', 'Please Try Again')
        },
      })
    }
  }

  showPassword() {
    this.passwordField = this._loginService.showPassword(this.passwordField)
  }
}
