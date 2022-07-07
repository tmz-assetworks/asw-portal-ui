import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class HeaderService {
  subject = new Subject<any>()

  // sendMessage(message: boolean) {
  //   this.subject.next({ value: message })
  // }

  // clearMessages() {
  //   // this.subject.next();
  // }

  // getMessage(): Observable<any> {
  //   return this.subject.asObservable()
  // }
}
