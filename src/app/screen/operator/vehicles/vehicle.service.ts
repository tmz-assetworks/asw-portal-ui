import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })
export class VehicleService {
  PORTAL_API_URL: any
  constructor(private _http: HttpClient) {
    this.PORTAL_API_URL =
      environment.PORTAL_API_URL + 'api/v1/VehicleDashboard/'
  }

  /**
   * GET VEHICLE LIST
   * @param param
   * @returns
   */
  getAllVehicle(param: any) {
    return this._http.post<any>(`${this.PORTAL_API_URL}getallvehicle`, param)
  }

  /**
   * GET VEHICLE BY ID
   * @param param
   * @returns
   */

  GetVehicleByID(param: any) {
    return this._http.get<any>(`${this.PORTAL_API_URL}GetVehicleByID/${param}`)
  }
}
