import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })
export class VehicleService {
  url: any

  constructor(private _http: HttpClient) {
    //this.url = environment.origin + 'api/v1/OperatorDashboard/'
    this.url = 'https://run.mocky.io/v3/e004a5eb-1108-461b-966b-53d621ff1a84'
  }


  /**
   *
   * @returns
   * Get Vehicle List
   */

   public GetVehicleList(): Observable<any> {
    return this._http.get<any>(`${this.url}`)
  }
  
}
