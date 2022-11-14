import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { LoginService } from 'src/app/screen/login/login.service'
import { environment } from 'src/environments/environment'
import { StorageService } from '../storage.service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // baseUrl: string
  constructor(
    private http: HttpClient,
    private _router: Router,
    private storage: StorageService,
    private _loginService: LoginService,
  ) {
    // this.baseUrl = environment.origin
  }

  isLoggedIn() {
    return localStorage.getItem('token_operator') || ''
  }

  loginUser(user: any) {
    // return this.http.post<any>(this.baseUrl + 'api/getUserLogin', user)
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

  /* refreshToken() {
    const d = new Date();
    let time = d.getTime();  
    time = 75000 + time;
    localStorage.setItem('token_operator', 'fghmn');
    localStorage.setItem('expTime', JSON.stringify(time));
    localStorage.getItem('userEmail');
    // send REFRESH TOKEN and email id to server to get token
    
  } */

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
    // return true;
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
