import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class LocationService {
  baseUrl:string = 'https://run.mocky.io/v3/56b06353-c2f1-48f5-b8bd-dede166a646e';

  constructor(private http:HttpClient) {
  }
  public locationChargerList(): Observable<any> {
    return this.http.get(this.baseUrl);
    console.log(this.baseUrl);
    
  }

   
}
