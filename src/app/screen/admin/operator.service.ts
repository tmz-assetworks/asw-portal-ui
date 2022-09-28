import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OperatorService {
  // header:any =new Headers({'Content-Type':'application/json','No-auth':'True'});
  // http: any;
  constructor(private objHttp: HttpClient) {}

  getCustomertList() {
    return this.objHttp.get(
      'https://run.mocky.io/v3/7794b8d2-84dc-470b-8787-e41ffe6cc508'
    );
  }

  SaveCustomer(data: {}): Observable<any> {
    return this.objHttp.post(
      'https://run.mocky.io/v3/7794b8d2-84dc-470b-8787-e41ffe6cc508',
      data
    );
  }

  /********Amdin Location table data API call*************** */

  adminLocationTableData(): Observable<any> {
    return this.objHttp.get(
      'https://run.mocky.io/v3/d33ad8ea-3d5e-49a4-896a-71bcd36edbbc'
    );
  }
















  /**
   * 
   * 
   */
  

}
