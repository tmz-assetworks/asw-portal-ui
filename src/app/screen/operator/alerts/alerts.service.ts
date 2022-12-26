import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  PORTAL_API_URL: any
  constructor(private _http: HttpClient) {
    this.PORTAL_API_URL =
      environment.PORTAL_API_URL + 'api/v1/OperatorDashboard/'
  }

  /**
   * Get operator alerts
   * @param params
   * @returns
   */

  GetOperatorAlerts(params: any) {
    return this._http.post<any>(
      `${this.PORTAL_API_URL}GetOperatorAlerts`,
      params,
    )
  }

  /**
   * Update notification
   * @param params
   * @returns
   */

  UpdateNotificationIsRead(params: any) {
    return this._http.post<any>(
      `${this.PORTAL_API_URL}UpdateNotificationIsRead`,
      params,
    )
  }
}
