import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })
export class ReportService {
  url: string
  constructor(private _http: HttpClient) {
    this.url = environment.REPORT_API_URL
  }

  /**
   *
   * @returns
   * Get Subscription
   */

  Subscription(params: any): Observable<any> {
    return this._http.post<any>(`${this.url}Subscription/Subscription/`, params)
  }

  /**
   *
   * @returns
   * Get Charging Session
   */

  ChargingSession(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.url}v1/Reports/ChargingSession/`,
      params,
    )
  }

  /**
   *
   * @returns
   * Get Upcoming Session
   */

  GetUpComingSession(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.url}v1/Reports/GetUpComingSession/`,
      params,
    )
  }

  /**
   *
   * @returns
   * Get Charging Session Length
   */

  ChargingSessionlength(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.url}v1/Reports/ChargingSessionlength/`,
      params,
    )
  }
  /**
   *
   * @returns
   * Get Energy Used
   */

  GetEnergyUsed(params: any): Observable<any> {
    return this._http.post<any>(`${this.url}v1/Reports/GetEnergyUsed/`, params)
  }
  /**
   *
   * @returns
   * Get MT Co2 Saved
   */

  GetMTCoSavedEnergy(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.url}v1/Reports/GetMTCoSavedEnergy/`,
      params,
    )
  }
  /**
   *
   * @returns
   * Get Miles Added
   */

  GetMilesAddedByLocation(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.url}v1/Reports/GetMilesAddedByLocation/`,
      params,
    )
  }
  /**
   *
   * @returns
   * Get Gasoline Gallon
   */

  Getgasolinegallon(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.url}v1/Reports/Getgasolinegallon/`,
      params,
    )
  }

  /**
   *
   * @returns
   * Get Gasoline Gallon
   */

  GetTransaction(params: any): Observable<any> {
    return this._http.post<any>(`${this.url}Subscription/Transaction/`, params)
  }
  /**
   *
   * @returns
   * Get Gasoline Gallon
   */

  GetSubscriptionDetails(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.url}Subscription/GetAllSubscription/`,
      params,
    )
  }
  /**
   *
   * @returns
   * Get Gasoline Gallon
   */

  GetTransactionDetails(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.url}Subscription/GetAllTransaction/`,
      params,
    )
  }
}
