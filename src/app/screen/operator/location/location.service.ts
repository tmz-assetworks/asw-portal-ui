import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })
export class LocationService {
  PORTAL_API_URL: any
  LOCATION_API_URL: string
  NOTIFICATION_API_URL: string
  constructor(private _http: HttpClient) {
    this.PORTAL_API_URL =
      environment.PORTAL_API_URL + 'api/v1/OperatorDashboard/'
    this.LOCATION_API_URL =
      environment.PORTAL_API_URL + 'api/v1/LocationDashboard/'
    this.NOTIFICATION_API_URL =
      environment.NOTIFICATION_API_URL + 'v1/Notification/'
  }

  /**
   * @returns
   * Get SUMMARY DATA
   */

  public GetSummaryData(id: any): Observable<any> {
    return this._http.get<any>(`${this.PORTAL_API_URL}getsummarydata/${id}`)
  }

  /**
   * @returns
   * GET SUMMARY STATUS
   */

  public GetSummaryStatus(): Observable<any> {
    return this._http.get<any>(
      `${this.PORTAL_API_URL}getsummarystatus/${0}/false`,
    )
  }

  /**
   *
   * @returns
   * GET SUMMARY DATA BY LOCATION ID
   */

  public GetSummaryStatuByLocationId(locationId: any): Observable<any> {
    return this._http.get<any>(
      `${this.PORTAL_API_URL}getsummarystatus/${locationId}/false`,
    )
  }

  /**
   * @returns
   * GET LOCATION STATUS
   */

  public GetLocationStatus(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.LOCATION_API_URL}locationstatus`,
      params,
    )
  }

  /**
   * @returns
   * GET LOCATION PERFORMING
   */

  public GetLocationPerforming(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.PORTAL_API_URL}GetLocationPerforming
    `,
      params,
    )
  }

  /**
   * GET LOCATION CHARGER LIST
   * @returns
   *
   * */

  public GetlocationChargerList(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.LOCATION_API_URL}GetDispenserByLocation`,
      params,
    )
  }

  /**
   * GET DISPENSER BY LOCATION
   * @param params
   * @returns
   */
  public GetDispenserByLocation(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.LOCATION_API_URL}GetDispenserByLocation`,
      params,
    )
  }

  /**
   * GET LOCATION DISPENSER DETAILS
   * @param params
   * @returns
   */

  public getlocationsdispenserdetails(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.PORTAL_API_URL}getlocationsdispenserdetails`,
      params,
    )
  }

  /**
   * GET CHARGER CHART DATA
   * @param params
   * @returns
   */

  getChargerChartData(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.PORTAL_API_URL}GetChargerStatusByLocationID`,
      params,
    )
  }

  /**
   * GET LOCATION INFORMATION BY ID
   * @param params
   * @returns
   */

  getlocationInformationById(params: any): Observable<any> {
    return this._http.get<any>(
      `${this.LOCATION_API_URL}getlocatinbyid?id=${params}`,
    )
  }

  /**
   * GET LCOATION MILES ADDED CHART DATA
   * @param params
   * @returns
   */

  GetLocationMilesAddedChartdata(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.PORTAL_API_URL}GetMilesAddedByLocation`,
      params,
    )
  }

  /**
   * GET EVENT LOG BY LOCATION
   * @param params
   * @returns
   */

  public GetEventLogByLocation(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.PORTAL_API_URL}GetEventLogByLocation`,
      params,
    )
  }

  /**
   * UPDATE EVENT LOG IS READ
   * @param params
   * @returns
   */

  public UpdateOcppEventLogIsRead(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.NOTIFICATION_API_URL}UpdateOcppEventLogIsRead`,
      params,
    )
  }
}
