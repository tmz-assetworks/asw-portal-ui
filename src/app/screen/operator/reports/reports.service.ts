import { HttpClient,HttpParams  } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })
export class ReportService {
  REPORT_API_URL: string
  constructor(private _http: HttpClient) {
    this.REPORT_API_URL = environment.REPORT_API_URL
  }

  /**
   * GET SUBSCRIPTION
   * @param params
   * @returns
   */

  Subscription(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.REPORT_API_URL}Subscription/Subscription/`,
      params,
    )
  }

  /**
   * CHARGING SESSION
   * @param params
   * @returns
   */

  ChargingSession(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.REPORT_API_URL}v1/Reports/ChargingSession/`,
      params,
    )
  }

  /**
   * GET UPCOMING SESSION
   * @param params
   * @returns
   */

  GetUpComingSession(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.REPORT_API_URL}v1/Reports/GetUpComingSession/`,
      params,
    )
  }

  /**
   * GET CHARGING SESSION LENGTH
   * @param params
   * @returns
   */

  ChargingSessionlength(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.REPORT_API_URL}v1/Reports/ChargingSessionlength/`,
      params,
    )
  }

  GetInvalidRequestsChartData(data: any): Observable<any> {
    let params = new HttpParams();
    params = params.set('Duration', data.Duration || '');
    return this._http.get<any>(
      `${this.REPORT_API_URL}v1/Reports/GetInvalidBootChartData`,
      { params } 
    );
  }

  GetCommandAlerts(data: any): Observable<any> {
    let params = new HttpParams();
    params = params.set('Duration', data.Duration || '');
    return this._http.get<any>(
      `${this.REPORT_API_URL}v1/Reports/GetCommandAlerts`,
      { params } 
    );
  }



    InvalidSessionChartData(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.REPORT_API_URL}v1/Reports/GetInvalidSessions/`,
      params,
    )
  }

  InvalidOcppCommandData(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.REPORT_API_URL}v1/Reports/GetInvalidOCPPCommands/`,
      params,
    )
  }


  /**
   * GET ENERGY USED
   * @param params
   * @returns
   */

  GetEnergyUsed(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.REPORT_API_URL}v1/Reports/GetEnergyUsed/`,
      params,
    )
  }

  /**
   * GET MT Co2 SAVED
   * @param params
   * @returns
   */

  GetMTCoSavedEnergy(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.REPORT_API_URL}v1/Reports/GetMTCoSavedEnergy/`,
      params,
    )
  }

  /**
   * GET MILES ADDED
   * @param params
   * @returns
   */

  GetMilesAddedByLocation(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.REPORT_API_URL}v1/Reports/GetMilesAddedByLocation/`,
      params,
    )
  }

  /**
   * GET GASOLINE GALLON DATA
   * @param params
   * @returns
   */

  Getgasolinegallon(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.REPORT_API_URL}v1/Reports/Getgasolinegallon/`,
      params,
    )
  }

  /**
   * GET TRANSACTION
   * @param params
   * @returns
   */

  GetTransaction(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.REPORT_API_URL}Subscription/Transaction/`,
      params,
    )
  }

  /**
   * GET SUBSCRIPTION DETAILS
   * @param params
   * @returns
   */

  GetSubscriptionDetails(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.REPORT_API_URL}Subscription/GetAllSubscription/`,
      params,
    )
  }

  /**
   * GET TRANSACTION DETAILS
   * @param params
   * @returns
   */

  GetTransactionDetails(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.REPORT_API_URL}Subscription/GetAllTransaction/`,
      params,
    )
  }
}
