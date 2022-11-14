import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import * as CryptoJS from 'crypto-js'
import jwt_decode from 'jwt-decode'
import { environment } from 'src/environments/environment'
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url: any
  constructor(private _http: HttpClient) {
    this.url = environment.originAuth + 'api/Auth/'
  }

  /**
   * Verify User
   * @param email
   * @returns
   */

  verifyUser(email: string) {
    let params = '?emailid=' + email
    return this._http.get<any>(`${this.url}VerifyUser${params}`)
  }

  /**
   * Verify User
   * @param email
   * @returns
   */

   verifyUserByOTP(email: string, otp: any) {
    let params = '?emailid=' + email + '&OTP=' + otp
    return this._http.get<any>(`${this.url}VerifyUserByOTP${params}`)
  }


  /**
   * Change Password
   * @param email
   * @param password
   */
  changePassword(email: string, password: string,token: string) {
     const body = {
      emailid: email,
      password: password,
      accesstoken: token
    }
    return this._http.post<any>(`${this.url}ChangePassword`,body) 
 
  }

  /**
   * Change Password
   * @param email
   * @param password
   */
   changePasswordObjectId(uname: string, password: string,token: string) {
  
    const body = {
      emailid: uname,
      password: password,
      accesstoken: token
    }
    return this._http.post<any>(`${this.url}ResetPassword`,body)
   
  }

  /**
   * Show Password
   * @param password
   * @returns
   */
  showPassword(password: boolean) {
    return !password
  }

  /**
   * Encrypt Password
   * @param field
   * @returns
   */

  encryptPassword(field: string) {
    var keySize = 256
    var salt = CryptoJS.lib.WordArray.random(16)
    // well known algorithm to generate key
    var key = CryptoJS.PBKDF2('E534C8DF286CD5931069B522E695D4F1', salt, {
      keySize: keySize / 32,
      iterations: 100,
    })
    // random IV
    var iv = CryptoJS.lib.WordArray.random(128 / 8)
    // specify everything explicitly
    var encrypted = CryptoJS.AES.encrypt(field, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    })
    // combine everything together in base64 string
    var result = CryptoJS.enc.Base64.stringify(
      salt.concat(iv).concat(encrypted.ciphertext),
    )
    return result
  }

  /**
   * Decrypt Token
   * @param token
   * @returns
   */

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token)
    } catch (Error) {
      return null
    }
  }
  /**
   * login User
   * @param email
   * @param password
   * @returns
   */
  loginUser(params: any): Observable<any> {
   // return this._http.post<any>(`${this.url}AuthNew`, params)
   return this._http.post<any>(`${this.url}`, params)
  }

  /**
   * Logout User
   * @param params
   * @returns
   */

  logout(email: string): Observable<any> {
    let params = '?emailid=' + email
    return this._http.post<any>(`${this.url}Logout${params}`, '')
  }

  /**
   * Refresh Token
   * @returns
   */
  refreshToken() {
    
    let refreshToken =
      JSON.parse(JSON.stringify(localStorage.getItem('token_refresh'))) || ''
    let params = '?refreshToken=' + refreshToken

    return this._http.get<any>(`${this.url}AuthRefresh${params}`)
  }

  saveToken(res: any) {
    localStorage.setItem('token_operator', res.data.access_token)
    localStorage.setItem('token_refresh', res.data.refresh_token)
    localStorage.setItem('token_id', res.data.id_token) // for role
    localStorage.setItem('token_expires_on', res.data.expires_on)
    localStorage.setItem('refreshToken_expires_on', res.data.not_before)

  }
}
