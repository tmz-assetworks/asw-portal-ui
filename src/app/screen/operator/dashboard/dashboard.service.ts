import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { forkJoin, Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class DashboardService {
  url: string
  constructor(private _http: HttpClient) {
    this.url = environment.origin + 'api/v1/OperatorDashboard/'
  }

  /**
   *
   * @returns
   * Get Summary Status
   */

  GetSummaryStatus(): Observable<any> {
    return this._http.get<any>(`${this.url}getsummarystatus/${0}`)
  }

  /**
   *
   * @returns
   * Get Summary Data
   */

  GetSummaryData(id: any): Observable<any> {
    return this._http.get<any>(`${this.url}getsummarydata/${id}`)
  }
  /**
   *
   * @returns
   * Get All Location
   */

  GetAllLocations(): Observable<any> {
    return this._http.get<any>(`${this.url}getalllocation`)
  }
  /**
   *
   * @param params
   * @returns
   *
   * Get Energy chart data
   */

  public GetEnergyUsedByLocationID(params: any): Observable<any> {
    return this._http.post<any>(`${this.url}GetEnergyUsedByLocationID`, params)
  }

  /**
   *
   * @returns
   * Get Location Performing data
   */

  public GetLocationPerforming(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.url}GetLocationPerforming
    `,
      params,
    )
  }

  GetAreachartdataData(param: any): Observable<any> {
    return this._http.post<any>(`${this.url}ChargingSession`, param)
  }

  GetMileschartdataData(param: any): Observable<any> {
    return this._http.post<any>(`${this.url}ChargingSession`, param)
  }
  GetMap(param: any): Observable<any> {
    return this._http.post<any>(`${this.url}getLocationsDispenserformap`, param)
  }

  /**
   *
   * @param params
   * @returns
   *
   * Get Charger chart data
   */

  getChargerChartData(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.url}GetChargerStatusByLocationID`,
      params,
    )
  }

  public requestDataFromMultipleSources(
    locatioPer: any,
    energyUsed: any,
    chargersGraphReq: any,chargingSessionReq: any
  ): Observable<any[]> {
    let response1 = this._http.get<any>(`${this.url}getsummarystatus/${0}`)
    let response2 = this._http.post<any>(
      `${this.url}GetLocationPerforming`,
      locatioPer,
    )
    let response3 = this._http.post<any>(
      `${this.url}GetEnergyUsedByLocationID`,
      energyUsed,
    )
    let response4 = this._http.post<any>(
      `${this.url}GetChargerStatusByLocationID`,
      chargersGraphReq,
    )

    let response5 = this._http.get<any>(`${this.url}getalllocation`)
    let response6 = this._http.post<any>(`${this.url}ChargingSession`,chargingSessionReq)
    // let response3 = this.http.get(requestUrl3);
    // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
    return forkJoin([response1, response2, response3, response4,response5,response6])
  }
}
