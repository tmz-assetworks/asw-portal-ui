import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, observable } from 'rxjs'
import { environment } from 'src/environments/environment'


@Injectable({ providedIn: 'root' })
export class SuperAdminService {
  url: any
  urlBase: any
  baseUrl: string = 'https://run.mocky.io/v3/'
  

  constructor(private _http: HttpClient) {
    this.url = environment.assetLocalOrigin
    this.urlBase = environment.localOrigin
  }
  public adminList(params: any): Observable<any> {
    return this._http.post<any>(`${this.urlBase}User/GetAllUsers`, params)
   

  }
  /* public adminList(): Observable<any> {
    return this._http.get(this.baseUrl + '593a4b0e-b85e-4eee-9bbb-13d8629cee96')
  } */

  public getCustomertList(): Observable<any> {
    return this._http.get(this.baseUrl + '6e1735bd-a12f-4c57-9790-1a9be5b013b6')
  }

  public createAdmin(params: any): Observable<any> {
    return this._http.post<any>(`${this.urlBase}User/CreateUser`, params)
  }

  public updateAdmin(params: any): Observable<any> {
    return this._http.put<any>(`${this.urlBase}User/UpdateUser`, params)
  }
  
  public getListApi(
    type: string,
    id?: number,
    stateId?: number,
  ): Observable<any> {
    if (type == 'state') {
      return this._http.get<any>(
        `${this.url}Country/getAllStateByCountryId?Id=${id}`,
      )
    } else if (type == 'city') {
      return this._http.get<any>(
        `${this.url}Country/getAllCityByStateId?Id=${stateId}`,
      )
    } else if (type == 'admin') {
      return this._http.get<any>(
        `${this.urlBase}User/GetUserById?id=${id}`,
      )
    } else if (type == 'org') {
      return this._http.get<any>(`${this.urlBase}User/CustomerDDL`)
    } 
    return this._http.get<any>(`${this.url}Country/getallcountry`)
  }

  public ChangeState(params: any): Observable<any> {
    // return this._http.delete<any>(`${this.url}Location/DeleteLocation`, params);
    return this._http.request('delete', `${this.urlBase}User/DeleteUser`, {
      body: params,
    })
  //  https://run.mocky.io/v3/41a2b03f-df8e-4db3-bda2-4b823b8ecee9

  }

  /*
  * Manage Customer
  */

  public GetAllCustomer(params:any): Observable<any> {
    return this._http.post<any>(`${this.urlBase}Customer/GetAllCustomer`,params)
  }

  public GetCustomerbyID(id: any): Observable<any> {
    return this._http.get<any>(`${this.urlBase}Customer/GetCustomerbyID?id=${id}`)
  }

  public CreateCustomer(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.urlBase}Customer/CreateCustomer`,
      params,
    )
  }
  public UpdateCustomer(params: any): Observable<any> {
    return this._http.put<any>(`${this.urlBase}Customer/UpdateCustomer`, params)
  }
}

