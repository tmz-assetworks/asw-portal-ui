import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })
export class LocationService {
  url: any
  locationUrl: string
  constructor(private _http: HttpClient) {
    this.url = environment.origin + 'api/v1/OperatorDashboard/'
    this.locationUrl = environment.origin + 'api/v1/LocationDashboard/'
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
    return this._http.get<any>(`${this.url}getsummarystatus/${0}/false`)
  }

  /**
   *
   * @returns
   * Get Summary Data by location id
   */

  public GetSummaryStatuByLocationId(locationId: any): Observable<any> {
    return this._http.get<any>(
      `${this.url}getsummarystatus/${locationId}/false`,
    )
  }

  /**
   *
   * @returns
   * Get Location Data
   */

  public GetLocationStatus(params: any): Observable<any> {
    return this._http.post<any>(`${this.locationUrl}locationstatus`, params)
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

  /**
   * Location Charger List
   * @returns
   *
   * */

  public GetlocationChargerList(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.locationUrl}GetDispenserByLocation`,
      params,
    )
  }


  public GetDispenserByLocation(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.locationUrl}GetDispenserByLocation`,
      params,
    )
  }
  // public locationStatusList(): Observable<any> {
  //   return this._http.get(
  //     'https://run.mocky.io/v3/08038385-f9cb-4a72-b80b-1ddb30d0eefb',
  //   )
  // }
  /**
   *
   * @param params
   * @returns
   */

  public getlocationsdispenserdetails(params: any): Observable<any> {
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
   * @returns
   *
   */

  getlocationInformationById(params: any): Observable<any> {
    return this._http.get<any>(`${this.locationUrl}getlocatinbyid?id=${params}`)
  }

  /**
   *
   * @param params
   * @returns
   *
   * Get Miles Added By Location chart data
   */

  GetLocationMilesAddedChartdata(params: any): Observable<any> {
    return this._http.post<any>(`${this.url}GetMilesAddedByLocation`, params)
  }

  /**
   *
   * @param params
   * @returns
   */

  public GetEventLogByLocation(params: any): Observable<any> {
    return this._http.post<any>(`${this.url}GetEventLogByLocation`, params)
  }
  /**
   *
   * @param params
   * @returns
   */

  public UpdateOcppEventLogIsRead(params: any): Observable<any> {
    return this._http.post<any>(`${this.url}UpdateOcppEventLogIsRead`, params)
  }
}
