import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })
export class LocationService {
  url: any
  api: any
  constructor(private _http: HttpClient) {
    this.url = environment.origin + 'api/v1/OperatorDashboard/'
  }

  /**
   *
   * @returns
   * Get Summary Data
   */

  public GetSummaryData(id: any): Observable<any> {
    return this._http.get<any>(`${this.url}getsummarydata/${id}`)
  }
  /**
   *
   * @returns
   * Get Summary Data
   */

  public GetSummaryStatus(): Observable<any> {
    return this._http.get<any>(`${this.url}getsummarystatus/${0}`)
  }

  /**
   *
   * @returns
   * Get Summary Data by location id
   */

  public GetSummaryStatuByLocationId(locationId: any): Observable<any> {
    return this._http.get<any>(`${this.url}getsummarystatus/${locationId}`)
  }

  /**
   *
   * @returns
   * Get Location Data
   */

  public GetLocationStatus(params: any): Observable<any> {
    // let url =  environment.origin + 'v1/LocationDashboard/'
    let url = 'http://51.142.150.252:6010/api/v1/LocationDashboard/'
    return this._http.post<any>(`${url}locationstatus`, params)
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

  // public locationChargerList(): Observable<any> {
  //   return this._http.get(
  //     'https://run.mocky.io/v3/56b06353-c2f1-48f5-b8bd-dede166a646e',
  //   )
  // }
  /**
   * Location chager table data API
   * @returns
   *
   * */
  // public locationChargerList(): Observable<any> {
  //   return this._http.get(
  //     'https://run.mocky.io/v3/56b06353-c2f1-48f5-b8bd-dede166a646e',
  //   )
  // }
  public GetlocationChargerList(params: any): Observable<any> {
    // let url =  environment.origin + 'v1/LocationDashboard/'
    let url = 'http://51.142.150.252:6010/api/v1/LocationDashboard/'
    return this._http.post<any>(`${url}GetDispenserByLocation`, params)
  }
  public locationStatusList(): Observable<any> {
    return this._http.get(
      'https://run.mocky.io/v3/08038385-f9cb-4a72-b80b-1ddb30d0eefb',
    )
  }

  /*
     location deshboards table list
  */

  public getLocationTableData(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.url}getlocationsdispenserdetails`,
      params,
    )
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

  /**
   *
   * @param params
   *
   * @returns
   *
   * Get Charger chart data
   */

  getlocationInformationById(params: any): Observable<any> {
    let url = 'http://51.142.150.252:6010/api/v1/LocationDashboard/'
    return this._http.get<any>(`${url}getlocatinbyid?id=${params}`)
  }

  /**
   *
   * @param params
   * @returns
   *
   * Get Miles Added By Location chart data
   */

  GetLocationMilesAddedChartdata(params: any): Observable<any> {
    // let url = 'http://51.142.150.252:6010/api/v1/OperatorDashboard/'
    return this._http.post<any>(`${this.url}GetMilesAddedByLocation`, params)
  }
  // GetLocationMilesAddedChartdata(params: any): Observable<any> {
  //   let url = 'http://51.142.150.252:6010/api/v1/OperatorDashboard/GetMilesAddedByLocation/'
  //   return this._http.get<any>(`${url}GetMilesAddedByLocation?id=${params}`)
  // }
}
