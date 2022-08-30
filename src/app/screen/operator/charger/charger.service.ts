import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })
export class ChargerService {
  url: any
  constructor(private _http: HttpClient) {
    this.url = environment.origin + 'api/v1/OperatorDashboard/'
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
    let url =
      'https://asw-portal-rest-service.azurewebsites.net/api/v1/Charger/'
    return this._http.post<any>(`${url}GetDispensersDetail`, params)
  }
  /***** ********************************Charger Session API****************************************/

  public GetChargerSessionDetailsList(params: any): Observable<any> {
    let url =
      'https://asw-portal-rest-service.azurewebsites.net/api/v1/Charger/'
    return this._http.post<any>(`${url}GetChargerSessionDetailsList`, params)
  }
  /******************************************Charger information API****************************************************** */
  public GetChargerInformation(params: any) {
    let url =
      ' https://asw-portal-rest-service.azurewebsites.net/api/v1/Charger/'
    return this._http.post<any>(`${url}GetChargerInformation`, params)
  }
  /**
   * Get Command list
   *
   * @returns
   */

  public GetCommandList() {
    let url =
      ' https://asw-portal-rest-service.azurewebsites.net/api/v1/Charger/'
    return this._http.get<any>(`${url}GetCommandList`)
  }

  public GetChargeBoxIDList(): Observable<any> {
    let url =
    ' https://asw-portal-rest-service.azurewebsites.net/api/v1/Charger/'
    return this._http.get<any>(`${url}GetChargeBoxIDList`)
  }
}
