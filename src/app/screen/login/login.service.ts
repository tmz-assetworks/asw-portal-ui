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
  /**
   * Declare variables
   */
  PRICING_API_URL: string
  USER_API_URL: string

  constructor(private _http: HttpClient) {
    this.USER_API_URL = environment.USER_API_URL
    this.PRICING_API_URL = environment.PRICING_API_URL
  }

  /**
   * Verify user
   * @param email
   * @returns
   */

  verifyUser(email: string) {
    let params = '?emailid=' + email
    return this._http.get<any>(`${this.USER_API_URL}Auth/VerifyUser${params}`)
  }

  /**
   * Verify user by otp
   * @param email
   * @returns
   */

  verifyUserByOTP(email: string, otp: any) {
    let params = '?emailid=' + email + '&OTP=' + otp
    return this._http.get<any>(
      `${this.USER_API_URL}Auth/VerifyUserByOTP${params}`,
    )
  }

  /**
   * Change password
   * @param email
   * @param password
   */
  changePassword(email: string, password: string, token: string) {
    const body = {
      emailid: email,
      password: password,
      accesstoken: token,
    }
    return this._http.post<any>(`${this.USER_API_URL}Auth/ChangePassword`, body)
  }

  /**
   * Reset password
   * @param email
   * @param password
   */
  changePasswordObjectId(uname: string, password: string, token: string) {
    const body = {
      emailid: uname,
      password: password,
      accesstoken: token,
    }
    return this._http.post<any>(`${this.USER_API_URL}Auth/ResetPassword`, body)
  }

  /**
   * Show password
   * @param password
   * @returns
   */
  showPassword(password: boolean) {
    return !password
  }

  /**
   * Encrypt password
   * @param field
   * @returns
   */

  encryptPassword(field: string) {
    var keySize = 256
    var salt = CryptoJS.lib.WordArray.random(16)
    // well known algorithm to generate key
    var key = CryptoJS.PBKDF2(environment.ENCRYPT_KEY, salt, {
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
   * Decrypt token
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
   * Login user
   * @param email
   * @param password
   * @returns
   */
  loginUser(params: any): Observable<any> {
    // return this._http.post<any>(`${this.url}AuthNew`, params)
    return this._http.post<any>(`${this.USER_API_URL}Auth/`, params)
  }

  /**
   * Logout User
   * @param params
   * @returns
   */

  logout(email: string): Observable<any> {
    let params = '?emailid=' + email
    return this._http.post<any>(`${this.USER_API_URL}Auth/Logout${params}`, '')
  }

  /**
   * Refresh token API
   * @returns
   */
  refreshToken() {
    let refreshToken =
      JSON.parse(JSON.stringify(localStorage.getItem('token_refresh'))) || ''
    let params = '?refreshToken=' + refreshToken
    return this._http.get<any>(`${this.USER_API_URL}Auth/AuthRefresh${params}`)
  }

  /**
   *
   * @param res
   * Save token details
   */

  saveToken(data: any) {
    localStorage.setItem('token_operator', data.data.access_token)
    localStorage.setItem('token_refresh', data.data.refresh_token)
    localStorage.setItem('token_id', data.data.id_token) // for role
    localStorage.setItem('token_expires_on', data.data.expires_on)
    localStorage.setItem('refreshToken_expires_on', data.data.not_before)
  }

  /**
   * Get invoice details
   * @param id
   * @returns
   */

  public GenerateInvoiceDetails(id: any): Observable<any> {
    return this._http.get<any>(
      `${this.PRICING_API_URL}SubscriptionPlan/GenerateInvoiceDetails/${id}`,
    )
  }
}
