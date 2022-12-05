import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  url: any
  constructor(private _http: HttpClient) {
    this.url = environment.PORTAL_API_URL + 'api/v1/OperatorDashboard/'

    // this.url = 'https://run.mocky.io/v3/f6b39ff3-632e-49d3-9a0e-094436794919'
  }

  /**
   * Get Alerts List
   * @returns
   */

  getAlertsList() {
    // let params = '?emailid=' + email

    let url = 'https://run.mocky.io/v3/f6b39ff3-632e-49d3-9a0e-094436794919'
    return this._http.get<any>(`${url}`)
  }

  /**
   * Get Operator Alerts
   * @param params
   * @returns
   */

  GetOperatorAlerts(params: any) {
    return this._http.post<any>(`${this.url}GetOperatorAlerts`, params)
  }

  /**
   * Update Notification
   * @param params
   * @returns
   */

  UpdateNotificationIsRead(params: any) {
    return this._http.post<any>(`${this.url}UpdateNotificationIsRead`, params)
  }
}
