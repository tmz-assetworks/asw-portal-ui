import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })
export class ChargerService {
  url: any
  chargerUrl: string
  constructor(private _http: HttpClient) {
    this.url = environment.origin + 'api/v1/OperatorDashboard/'
    this.chargerUrl = environment.origin + 'api/v1/Charger/'
  }

  /**
   *
   * @returns
   * Get Summary Status
   */

  public GetSummaryStatus(): Observable<any> {
    return this._http.get<any>(`${this.url}getsummarystatus/${0}/true`)
  }

  public GetDispensersDetail(params: any): Observable<any> {
    return this._http.post<any>(`${this.chargerUrl}GetDispensersDetail`, params)
  }
  /**
   * Charger Session Details
   * @param params
   * @returns
   */
  public GetChargerSessionDetailsList(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.chargerUrl}GetChargerSessionDetailsList`,
      params,
    )
  }

  /**
   * Get charger info
   * @param params
   * @returns
   */
  public GetChargerInformation(params: any) {
    return this._http.post<any>(
      `${this.chargerUrl}GetChargerInformation`,
      params,
    )
  }
  /**
   * Get Command list
   *
   * @returns
   */

  public GetCommandList() {
    return this._http.get<any>(`${this.chargerUrl}GetCommandList`)
  }

  public GetChargeBoxIDList(): Observable<any> {
    return this._http.get<any>(`${this.chargerUrl}GetChargeBoxIDList`)
  }
}
