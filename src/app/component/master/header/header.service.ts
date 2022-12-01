import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })
export class HeaderService {
  subject = new Subject<any>()
  url: any
  constructor(private _http: HttpClient) {
    this.url = environment.NOTIFICATION_API_URL + 'v1/Notification/'
  }
  // sendMessage(message: boolean) {
  //   this.subject.next({ value: message })
  // }

  // clearMessages() {
  //   // this.subject.next();
  // }

  // getMessage(): Observable<any> {
  //   return this.subject.asObservable()
  // }

  GetNotificationCountsByUserid(params: any) {
    return this._http.post<any>(
      `${this.url}GetNotificationCountsByUserid`,
      params,
    )
  }
}
