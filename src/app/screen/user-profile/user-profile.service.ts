import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  profileSubject = new Subject<string>()
  alertSubject = new Subject<string>()

  USER_API_URL: string
  ASSET_API_URL: string

  constructor(private _http: HttpClient) {
    this.USER_API_URL = environment.USER_API_URL
    this.ASSET_API_URL = environment.ASSET_API_URL
  }
  /**
   * UPDATE USER PROFILE
   * @param params
   * @returns
   */
  public UpdateUserProfile(params: any): Observable<any> {
    return this._http.put<any>(
      `${this.USER_API_URL}User/UpdateUserProfile`,
      params,
    )
  }
  /**
   * GET USER PROFILE BY ID
   * @returns
   */
  public GetUserProfileById(): Observable<any> {
    return this._http.get<any>(`${this.USER_API_URL}User/GetUserProfileById`)
  }
  /**
   * UPDATE USER PROFILE PICTURES
   * @param params
   * @returns
   */
  public UpdateUserProfilePicture(params: any): Observable<any> {
    return this._http.put<any>(
      `${this.USER_API_URL}User/UpdateUserProfilePicture`,
      params,
    )
  }

  /**
   * GET ALL COUNTRY
   * @returns
   */
  public getAllCountry(): Observable<any> {
    return this._http.get<any>(`${this.ASSET_API_URL}Country/getallcountry`)
  }

  /**
   * GET ALL STATE BY COUNTRY ID
   * @param id
   * @returns
   */
  public getAllStateByCountryId(id: any): Observable<any> {
    return this._http.get<any>(
      `${this.ASSET_API_URL}Country/getAllStateByCountryId?Id=${id}`,
    )
  }

  // GET USER PROFILE IMAGE
  public GetUserProfileImage(): Observable<any> {
    return this._http.get<any>(`${this.USER_API_URL}User/GetUserProfileImage`)
  }
}
