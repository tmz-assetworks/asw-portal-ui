import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })
export class ReportService {
  userUrl: string
  assetUrl: string
  reportUrl:string

  constructor(private readonly _http: HttpClient) {
    this.assetUrl = environment.ASSET_API_URL
    this.userUrl = environment.USER_API_URL
    this.reportUrl=environment.REPORT_API_URL
  }
   public getChargerAvailableCount(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.reportUrl}v1/Reports/GetAvialableChargerCountMonthWise`,params)
    
  }

   public getPaymentDetailsData(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.reportUrl}v1/Reports/GetPaymentReportMonthWise`,params)
    
  }
}