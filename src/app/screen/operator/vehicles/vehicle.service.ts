import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })
export class VehicleService {
  url: any
  constructor(private _http: HttpClient) {
    this.url = environment.PORTAL_API_URL + 'api/v1/VehicleDashboard/'
  }

  getAllVehicle(param: any) {
    return this._http.post<any>(`${this.url}getallvehicle`, param)
  }

  GetVehicleByID(param: any) {
    return this._http.get<any>(`${this.url}GetVehicleByID/${param}`)
  }
}
