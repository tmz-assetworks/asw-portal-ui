import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class StorageService {
  readonly USER_ID: string = 'UserID'
  readonly TOKEN: string = 'token'

  constructor() {
    if (!sessionStorage) {
      throw 'Storage Not Available'
    }
  }
  setLocalData(key: any, value: any): void {
    localStorage.setItem(key, value)
  }

  getLocalData(key: any) {
    return localStorage.getItem(key)
  }

  removeLocalData(key: any) {
    localStorage.removeItem(key)
  }
  clearLocalData(key: any) {
    localStorage.clear()
  }

  setSessionData(key: any, value: any) {
    sessionStorage.setItem(key, value)
  }

  getSessionData(key: any) {
    return sessionStorage.getItem(key)
  }

  removeSessionData(key: any) {
    sessionStorage.removeItem(key)
  }
  clearSessionData(key: any) {
    sessionStorage.clear()
  }

  getUserID() {
    let userId = this.getLocalData(this.USER_ID)
    return userId ? userId : null
  }

  getToken() {
    let data = this.getLocalData(this.TOKEN)
    return data ? data : null
  }
  isLoggedIn() {
    return (
      this.getToken() &&
      this.getSessionData('isLoggedIn') &&
      this.getSessionData('isLoggedIn') === '1'
    )
  }
}
