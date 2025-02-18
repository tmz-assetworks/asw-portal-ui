import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root',
})
export class DiagnosticsService {
  url: any
  chargingProfilePurpose = [
    'ChargePointMaxProfile',
    'TxDefaultProfile',
    'TxProfile',
  ]
  chargingProfileKind = ['Absolute', 'Recurring', 'Relative']
  recurrencyKind = ['Daily', 'Weekly']
  chargingRateUnit = ['A', 'W']
  constructor(private _http: HttpClient) {
    this.url = environment.DIAGNOSTIC_API_URL
  }

  /**
   * Get Configuration
   * @param params
   * @param requestParam
   * @returns
   */

  GetConfiguration(params: any, requestbody: any): any {
    return this._http.post<any>(
      `${this.url}GetConfiguration/${params}`,
      requestbody,
    )
  }
  /**
   * Change Configuration
   * @param params
   * @param requestbody
   * @returns
   */

  ChangeConfiguration(params: any, requestbody: any) {
    return this._http.post<any>(
      `${this.url}ChangeConfiguration/${params}`,
      requestbody,
    )
  }

  /**
   * CmsReply
   * @param params
   * @returns
   */

  CmsReply(params: any) {
    return this._http.post<any>(`${this.url}CmsReply`, params)
  }

  /**
   * Get LocalListVersion
   * @param params
   * @param requestbody
   * @returns
   */

  GetLocalListVersion(params: any, requestbody: any) {
    return this._http.post<any>(
      `${this.url}GetLocalListVersion/${params}`,
      requestbody,
    )
  }

  /**
   * ClearCache
   * @param params
   * @param requestParam
   * @returns
   */
  ClearCache(params: any, requestbody: any) {
    return this._http.post<any>(`${this.url}ClearCache/${params}`, requestbody)
  }

  /**
   * RemoteStartTransaction
   * @param params
   * @param requestbody
   */
  RemoteStartTransaction(params: any, requestbody: any) {
    return this._http.post<any>(
      `${this.url}RemoteStartTransaction/${params}`,
      requestbody,
    )
  }
  /**
   * GetCompositeSchedule
   * @param params
   * @param requestbody
   * @returns
   */

  GetCompositeSchedule(params: any, requestbody: any) {
    return this._http.post<any>(
      `${this.url}GetCompositeSchedule/${params}`,
      requestbody,
    )
  }

  GetClearChargingProfile(params: any, requestbody: any) {
    return this._http.post<any>(
      `${this.url}ClearChargingProfile/${params}`,
      requestbody,
    )
  }

  /**
   * RemotStopTransaction
   * @param params
   * @param requestbody
   * @returns
   */
  RemoteStopTransaction(params: any, requestbody: any) {
    return this._http.post<any>(
      `${this.url}RemoteStopTransaction/${params}`,
      requestbody,
    )
  }
  /**
   * Reset
   * @param params
   * @param requestbody
   * @returns
   */

  Reset(params: any, requestbody: any) {
    return this._http.post<any>(`${this.url}Reset/${params}`, requestbody)
  }
  /**
   * Get EventLogByLocation
   * @param params
   * @returns
   */

  GetEventLogByLocation(params: any) {
    let url = environment.PORTAL_API_URL + 'api/v1/OperatorDashboard/'
    return this._http.post<any>(`${url}GetEventLogByLocation`, params)
  }

  /**
   * changeConfiguration
   * @param params
   * @param requestbody
   * @returns
   */

  changeConfiguration(params: any, requestbody: any) {
    return this._http.post<any>(
      `${this.url}ChangeConfiguration/${params}`,
      requestbody,
    )
  }

  /**
   * Change Availability
   * @param params
   * @param requestbody
   * @returns
   */
  ChangeAvailability(params: any, requestbody: any) {
    return this._http.post<any>(
      `${this.url}ChangeAvailability/${params}`,
      requestbody,
    )
  }

  /**
   * Get LocalListVersion
   * @param params
   * @param requestbody
   * @returns
   */
  getLocalListVersion(params: any, requestbody: any) {
    return this._http.post<any>(
      `${this.url}GetLocalListVersion/${params}`,
      requestbody,
    )
  }

  /**
   * Get Connector ID
   *
   * @param requestbody
   * @returns
   */
  getConnectorId(requestbody: any) {
    const url = environment.PORTAL_API_URL + 'api/v1/Charger/'
    return this._http.post<any>(`${url}GetChargerInformation`, requestbody)
  }

  /**
   * Unlock
   * @param params
   * @param requestbody
   * @returns
   */

  unlock(params: any, requestbody: any) {
    return this._http.post<any>(
      `${this.url}UnlockConnector/${params}`,
      requestbody,
    )
  }

  /**
   * cancelReservation
   * @param params
   * @param requestbody
   * @returns
   */

  cancelReservation(params: any, requestbody: any) {
    return this._http.post<any>(
      `${this.url}CancelReservation/${params}`,
      requestbody,
    )
  }

  /**
   * reserveNow
   * @param params
   * @param requestbody
   * @returns
   */

  reserveNow(params: any, requestbody: any) {
    return this._http.post<any>(`${this.url}ReserveNow/${params}`, requestbody)
  }

  /**
   * triggerMessage
   * @param params
   * @param requestbody
   * @returns
   */

  triggerMessage(params: any, requestbody: any) {
    return this._http.post<any>(
      `${this.url}TriggerMessage/${params}`,
      requestbody,
    )
  }

  /**
   * updateFirmware
   * @param params
   * @param requestbody
   * @returns
   */

  updateFirmware(params: any, requestbody: any) {
    return this._http.post<any>(
      `${this.url}api/UpdateFirmware/${params}`,
      requestbody,
    )
  }

  /**
   * getDiagnostics
   * @param params
   * @param requestbody
   * @returns
   */

  getDiagnostics(params: any, requestbody: any) {
    // alert('change api');
    return this._http.post<any>(
      `${this.url}GetDiagnostics/${params}`,
      requestbody,
    )
  }
  dataTransfer(params: any, requestbody: any) {
    // alert('change api');
    return this._http.post<any>(
      `${this.url}DataTransferCS/${params}`,
      requestbody,
    )
  }
  SetChargingProfile(params: any, requestbody: any) {
    // alert('change api');
    return this._http.post<any>(
      `${this.url}SetChargingProfile/${params}`,
      requestbody,
    )
  }
  /**
   * sendLocalList
   * @param params
   * @param requestbody
   * @returns
   */

  sendLocalList(params: any, requestbody: any) {
    // alert('change api');
    return this._http.post<any>(
      `${this.url}SendLocalList/${params}`,
      requestbody,
    )
  }

  currentDate() {
    let date = new Date()

    // Get year, month, and day part from the date
    let year = date.toLocaleString('default', { year: 'numeric' })
    let month = date.toLocaleString('default', { month: '2-digit' })
    let day = date.toLocaleString('default', { day: '2-digit' })

    // Generate yyyy-mm-dd date string
    var formattedDate = year + '-' + month + '-' + day

    return formattedDate
  }

  isValidURL(url: string) {
    let urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
      '(\\#[-a-z\\d_]*)?$',
      'i',
    )
    return url.match(urlPattern)
  }

  convertToIso(date: any) {
    let newDate = new Date(date)
    return new Date(
      newDate.getTime() - newDate.getTimezoneOffset() * 60000,
    ).toISOString()
  }

  convertToUTC(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString();
  }

  /* convertToIsoSendLocal(date: any) {
    let newDate = new Date(date);
    return new Date(
      newDate.getTime() - newDate.getTimezoneOffset() * 60000
    ).toISOString();
  } */

  /**
   * getDate
   * @param params
   * @param requestbody
   * @returns
   */

  getDate(rfid: any) {
    // alert('change api');
    return this._http.post<any>(
      `${this.url}GetVehicleRfidDetails/GetVehicleRfidData?Rfid=${rfid}`,
      {},
    )
  }

  getProfilePurpose() {
    return this.chargingProfilePurpose
  }

  getProfileKind() {
    return this.chargingProfileKind
  }

  getrecurrencyKind() {
    return this.recurrencyKind
  }

  getChargingRateUnit() {
    return this.chargingRateUnit
  }


  /**
  * Get ConfigurationKey
  * @param params
  * @param requestbody
  * @returns
  */

  GetConfigurationKey(): Observable<{ key: string[] }> {
    return this._http.post<{ key: string[] }>(
      `${this.url}api/ConfigurationKey/ConfigurationKey`,
      {}
    );
  }
}

