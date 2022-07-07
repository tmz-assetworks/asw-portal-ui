import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class SuperAdminService {
  baseUrl: string = 'https://run.mocky.io/v3/'

  constructor(private _http: HttpClient) {}
  public adminList(): Observable<any> {
    return this._http.get(this.baseUrl + '593a4b0e-b85e-4eee-9bbb-13d8629cee96')
  }

  public getCustomertList(): Observable<any> {
    return this._http.get(this.baseUrl + '6e1735bd-a12f-4c57-9790-1a9be5b013b6')
  }

  //  https://run.mocky.io/v3/41a2b03f-df8e-4db3-bda2-4b823b8ecee9
}
