import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })
export class SuperAdminService {
  userUrl: string
  assetUrl: string

  constructor(private _http: HttpClient) {
    this.assetUrl = environment.ASSET_API_URL
    this.userUrl = environment.USER_API_URL
  }
  public GetAllUsers(params: any): Observable<any> {
    return this._http.post<any>(`${this.userUrl}User/GetAllUsers`, params)
  }

  public CreateUser(params: any): Observable<any> {
    return this._http.post<any>(`${this.userUrl}User/CreateUser`, params)
  }

  public UpdateUser(params: any): Observable<any> {
    return this._http.put<any>(`${this.userUrl}User/UpdateUser`, params)
  }

  public getListApi(
    type: string,
    id?: number,
    stateId?: number,
  ): Observable<any> {
    if (type == 'state') {
      return this._http.get<any>(
        `${this.assetUrl}Country/getAllStateByCountryId?Id=${id}`,
      )
    } else if (type == 'city') {
      return this._http.get<any>(
        `${this.assetUrl}Country/getAllCityByStateId?Id=${stateId}`,
      )
    } else if (type == 'admin') {
      return this._http.get<any>(`${this.userUrl}User/GetUserById?id=${id}`)
    } else if (type == 'org') {
      return this._http.get<any>(`${this.userUrl}User/CustomerDDL`)
    }
    return this._http.get<any>(`${this.assetUrl}Country/getallcountry`)
  }

  public ChangeState(params: any): Observable<any> {
    return this._http.request('delete', `${this.userUrl}User/DeleteUser`, {
      body: params,
    })
  }

  /*
   * Manage Customer
   */

  public GetAllCustomer(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.userUrl}Customer/GetAllCustomer`,
      params,
    )
  }

  public GetCustomerbyID(id: any): Observable<any> {
    return this._http.get<any>(
      `${this.userUrl}Customer/GetCustomerbyID?id=${id}`,
    )
  }

  public CreateCustomer(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.userUrl}Customer/CreateCustomer`,
      params,
    )
  }
  public UpdateCustomer(params: any): Observable<any> {
    return this._http.put<any>(`${this.userUrl}Customer/UpdateCustomer`, params)
  }

  public getAllCountry(): Observable<any> {
    return this._http.get<any>(`${this.assetUrl}Country/getallcountry`)
  }
  public getAllStateByCountryId(id: any): Observable<any> {
    return this._http.get<any>(
      `${this.assetUrl}Country/getAllStateByCountryId?Id=${id}`,
    )
  }
  public getAllCityByStateId(id: any): Observable<any> {
    return this._http.get<any>(
      `${this.assetUrl}Country/getAllCityByStateId?Id=${id}`,
    )
  }
}
