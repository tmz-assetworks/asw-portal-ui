import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })
export class ChargerService {
  url: any
  chargerUrl: string
  constructor(private _http: HttpClient) {
    this.url = environment.PORTAL_API_URL + 'api/v1/OperatorDashboard/'
    this.chargerUrl = environment.PORTAL_API_URL + 'api/v1/Charger/'
    
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

  SetChargingProfile(params: any, requestbody: any) {
    // alert('change api');
     return this._http.post<any>(
       `${this.url}SetChargingProfile/${params}`,
       requestbody
     );
   }

  //  /***
  //   * 
  //   */
  //  /**
  //  * RemoteStartTransaction
  //  * @param params
  //  * @param requestbody
  //  */
  // RemoteStartTransaction(params: any, requestbody: any) {
  //   return this._http.post<any>(
  //     `${this.url}RemoteStartTransaction/${params}`,
  //     requestbody,
  //   )
  // }
    // public RemoteStartTransaction(params: any) {
    //   return this._http.post<any>(
    //     `${this.chargerUrl}RemoteStartTransaction`,
    //     params,
    //   )
    // }
}
