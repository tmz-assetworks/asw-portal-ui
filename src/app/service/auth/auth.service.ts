import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { LoginService } from 'src/app/screen/login/login.service'
import { StorageService } from '../storage.service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private _router: Router,
    private storage: StorageService,
    private _loginService: LoginService,
  ) {}

  isLoggedIn() {
    return localStorage.getItem('token_operator') || ''
  }

  loggedIn() {
    return this.storage.getToken()
  }

  getToken() {
    return localStorage.getItem('token_id') || ''
  }

  isAuthenticated() {
    return this.storage.isLoggedIn()
  }

  getRole() {
    return localStorage.getItem('role')
  }

  haveAccess(role: string) {
    let idToken = localStorage.getItem('token_id')
    if (idToken !== null && idToken !== '') {
      let decodeData = this._loginService.getDecodedAccessToken(idToken)
      const currentRole = decodeData.roles[0]

      if (currentRole == role) {
        return true
      }
    }
    return false
  }
  tokenExpired() {
    const token = localStorage.getItem('token_operator')
    let expTime = localStorage.getItem('expTime')

    if (token != null && expTime != null) {
      // expTime = JSON.parse(expTime)

      const d = new Date()
      let time = d.getTime()
      //time = 300000 + time;  // 5 min
      if (time > Number(expTime)) {
        alert('Token Has Expired. Please login again')
        localStorage.removeItem('token_operator')
        // this.refreshToken();
        //this._router.navigate(['/login']);
      }
    } else {
      // TOKEN IS NULL
      this._router.navigate(['/login'])
    }
  }
}
