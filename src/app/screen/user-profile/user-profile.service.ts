
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({providedIn: 'root'})
export class UserprofileService {
    userUrl: string;
  assetUrl: string;
    
        constructor(private _http: HttpClient) {
            
            this.userUrl = environment.localOrigin
            this.assetUrl = environment.assetLocalOrigin
          }
    

    public UpdateUserProfile(params: any): Observable<any> {
        return this._http.put<any>(
          `${this.userUrl}User/UpdateUserProfile`,
          params,
        )
      }

     
    public GetUserProfileById(): Observable<any> {
    return this._http.get<any>(
      `${this.userUrl}User/GetUserProfileById`
    )
  }

  public UpdateUserProfilePicture(params: any): Observable<any> {
    return this._http.put<any>(
      `${this.userUrl}User/UpdateUserProfilePicture`,
      params,
    )
  }


  public getAllCountry(): Observable<any> {
    return this._http.get<any>(`${this.assetUrl}Country/getallcountry`)
  }
  public getAllStateByCountryId(id: any): Observable<any> {
    return this._http.get<any>(`${this.assetUrl}Country/getAllStateByCountryId?Id=${id}`)
  }
  public getAllCityByStateId(id: any): Observable<any> {
    return this._http.get<any>(`${this.assetUrl}Country/getAllCityByStateId?Id=${id}`)
  }
}