// src/app/services/client-billing.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientBilling } from '../client-Billing/client-billing.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientBillingService {
 
  pricingUrl:string
  ASSET_API_URL:string
 

  constructor(private readonly _http: HttpClient) { 
   this.pricingUrl=environment.PRICING_API_URL
   this.ASSET_API_URL = environment.ASSET_API_URL
  
  }



    public getAllClientBillings(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.pricingUrl}ClientBillingConfig/GetAllClientBillingConfiguration`,params) 
    
  }
  // Get a single client billing by customerId
  public getClientBillingById(id: any): Observable<any> {
    return this._http.get<any>(
      `${this.pricingUrl}ClientBillingConfig/getClientBillingConfigurationbyid?id=${id}`,
    )
  }

    public createClientBilling(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.pricingUrl}ClientBillingConfig/CreateClientBillingConfiguration`,params) 
    
  }

  // Update an existing client billing 


  public updateClientBilling(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.pricingUrl}ClientBillingConfig/UpdateClientBillingConfiguration`,params) 
    
  }

   public GetPlugType(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.ASSET_API_URL}Dispenser/GetPlugType`,
      params,
    )
  }

}