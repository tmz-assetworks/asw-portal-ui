import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  url: any
  constructor(private _http: HttpClient) {
    // this.url = environment.origin + 'api/Auth/'

    this.url = 'https://run.mocky.io/v3/f6b39ff3-632e-49d3-9a0e-094436794919'
  }

  /**
   * Get Alerts List
   * @returns
   */

  getAlertsList() {
    // let params = '?emailid=' + email
    return this._http.get<any>(`${this.url}`)
  }

  /**
   * Change Password
   * @param email
   * @param password
   */
  changePassword(email: string, password: string) {
    let params = '?emailid=' + email + '&password=' + password
    return this._http.get<any>(`${this.url}ChangePassword${params}`)
  }

  /**
   * Show Password
   * @param password
   * @returns
   */
  showPassword(password: boolean) {
    return !password
  }
}
