import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingService { 
  USER_API_URL: string
  constructor(private readonly _http: HttpClient) {
    this.USER_API_URL = environment.USER_API_URL
  }


  // calling session time api
  getSessionConfig(): Observable<{ TimeoutMinutes: number; WarningMinutes: number }> {
    return this._http
      .get<{ TimeoutMinutes: number; WarningMinutes: number }>(
        `${this.USER_API_URL}Auth/SessionTime`
      )
  }
}
