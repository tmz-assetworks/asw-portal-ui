import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })
export class ChargerService {
  PORTAL_API_URL: any
  CHARGER_API_URL: string

  constructor(private _http: HttpClient) {
    this.PORTAL_API_URL =
      environment.PORTAL_API_URL + 'api/v1/OperatorDashboard/'
    this.CHARGER_API_URL = environment.PORTAL_API_URL + 'api/v1/Charger/'
  }

  /**
   *
   * @returns
   * Get Summary Status
   */

  public GetSummaryStatus(): Observable<any> {
    return this._http.get<any>(
      `${this.PORTAL_API_URL}getsummarystatus/${0}/true`,
    )
  }

  public GetDispensersDetail(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.CHARGER_API_URL}GetDispensersDetail`,
      params,
    )
  }
  /**
   * CHARGER SESSION DETAILS LIST
   * @param params
   * @returns
   */
  public GetChargerSessionDetailsList(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.CHARGER_API_URL}GetChargerSessionDetailsList`,
      params,
    )
  }

  /**
   * GET CHARGER INFO
   * @param params
   * @returns
   */
  public GetChargerInformation(params: any) {
    return this._http.post<any>(
      `${this.CHARGER_API_URL}GetChargerInformation`,
      params,
    )
  }
  /**
   * GET COMMAND LIST
   * @returns
   */

  public GetCommandList() {
    return this._http.get<any>(`${this.CHARGER_API_URL}GetCommandList`)
  }

  /**
   * GET CHARGEBOX ID LIST
   * @returns
   */

  public GetChargeBoxIDList(): Observable<any> {
    return this._http.get<any>(`${this.CHARGER_API_URL}GetChargeBoxIDList`)
  }

  /**
   * SET CHARGING PROFILE
   * @param params
   * @param requestbody
   * @returns
   */

  SetChargingProfile(params: any, requestbody: any) {
    return this._http.post<any>(
      `${this.PORTAL_API_URL}SetChargingProfile/${params}`,
      requestbody,
    )
  }
}
