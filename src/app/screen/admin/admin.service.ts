import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
@Injectable({ providedIn: 'root' })
export class AdminService {
  assetUrl: string
  userUrl: string
  pricingUrl: string
  constructor(private _http: HttpClient) {
    this.assetUrl = environment.assetLocalOrigin
    this.userUrl = environment.localOrigin
    this.pricingUrl = environment.AssetPricing
  }

  public GetLocationList(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.assetUrl}Location/GetLocationList`,
      params,
    )
  }

  public CreateLocation(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.assetUrl}Location/CreateLocation`,
      params,
    )
  }

  public CreateUser(params: any): Observable<any> {
    return this._http.post<any>(`${this.userUrl}User/CreateUser`, params)
  }

  public UpdateUser(params: any): Observable<any> {
    return this._http.put<any>(`${this.userUrl}User/UpdateUser`, params)
  }

  public GetAllUsers(params: any): Observable<any> {
    return this._http.post<any>(`${this.userUrl}User/GetAllUsers`, params)
  }

  public UpdateLocation(params: any): Observable<any> {
    return this._http.put<any>(
      `${this.assetUrl}Location/UpdateLocation`,
      params,
    )
  }

  GetAllLocationStatus(params: any): Observable<any> {
    return this._http.get<any>(
      `${this.assetUrl}Location/GetAllLocationStatus?id=${params}`,
    )
  }

  public GetLocationById(id: any): Observable<any> {
    return this._http.get<any>(`${this.assetUrl}Location/GetLocationById/${id}`)
  }

  public getListApi(
    type: string,
    id?: number,
    stateId?: number,
  ): Observable<any> {
    if (type == 'state') {
      return this._http.get<any>(
        `${this.assetUrl}Country/getAllStateByCountryId?Id=${id}`,
      )
    } else if (type == 'city') {
      return this._http.get<any>(
        `${this.assetUrl}Country/getAllCityByStateId?Id=${stateId}`,
      )
    } else if (type == 'locationStatus') {
      return this._http.get<any>(
        `${this.assetUrl}Location/GetAllLocationStatus`,
      )
    } else if (type == 'location') {
      return this._http.get<any>(
        `${this.assetUrl}Location/GetLocationById?Id=${id}`,
      )
    } else if (type == 'department') {
      return this._http.get<any>(
        `${this.assetUrl}Location/GetAllDepartmentList`,
      )
    } else if (type == 'locationName') {
      return this._http.get<any>(`${this.assetUrl}Location/GetAllLocationName`)
    } else if (type == 'operator') {
      return this._http.get<any>(`${this.userUrl}User/GetUserById?id=${id}`)
    }
    return this._http.get<any>(`${this.assetUrl}Country/getallcountry`)
  }

  public IsActiveUserById(params: any): Observable<any> {
    return this._http.request('delete', `${this.userUrl}User/IsActiveUsers`, {
      body: params,
    })
  }

  public ChangeState(params: any): Observable<any> {
    return this._http.request('delete', `${this.userUrl}User/DeleteUser`, {
      body: params,
    })
  }

  public GetVechicleList(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.assetUrl}Vehicle/GetVechicleList`,
      params,
    )
  }

  public GetVehicleModelYearDDLList(): Observable<any> {
    return this._http.get<any>(
      `${this.assetUrl}Vehicle/GetVehicleModelYearDDLList`,
    )
  }

  public GetVehicleMakeDDLList(): Observable<any> {
    return this._http.get<any>(`${this.assetUrl}Vehicle/GetVehicleMakeDDLList`)
  }

  public GetVehicleModelDDLList(): Observable<any> {
    return this._http.get<any>(`${this.assetUrl}Vehicle/GetVehicleModelDDLList`)
  }

  public CreateVehicle(params: any): Observable<any> {
    return this._http.post<any>(`${this.assetUrl}Vehicle/CreateVehicle`, params)
  }

  public GetAllVehicleById(id: any): Observable<any> {
    return this._http.get<any>(
      `${this.assetUrl}Vehicle/GetVehicleDetailsById/${id}`,
    )
  }

  public UpdateVehicle(params: any): Observable<any> {
    return this._http.put<any>(`${this.assetUrl}Vehicle/UpdateVehicle`, params)
  }

  public DeleteVehicleById(params: any): Observable<any> {
    return this._http.delete<any>(
      `${this.assetUrl}Vehicle/DeleteVehicleById`,
      params,
    )
  }

  public GetDispensersWithPagination(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.assetUrl}Dispenser/GetDispensersWithPagination`,
      params,
    )
  }

  public GetDispenserDetailsById(id: any): Observable<any> {
    return this._http.post<any>(
      `${this.assetUrl}Dispenser/GetDispenserDetailsById?dispenserId=${id}`,
      '',
    )
  }

  public CreateDispenser(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.assetUrl}Dispenser/CreateDispenser`,
      params,
    )
  }

  public GetAllLocation(): Observable<any> {
    return this._http.get<any>(`${this.assetUrl}Location/GetAllLocation`)
  }

  public GetAllMakeMaster(): Observable<any> {
    return this._http.get<any>(`${this.assetUrl}MakeMaster/GetAllMakeMaster`)
  }

  public GetAllModel(): Observable<any> {
    return this._http.get<any>(`${this.assetUrl}Model/GetAllModel`)
  }

  public GetAllModem(): Observable<any> {
    return this._http.get<any>(`${this.assetUrl}Modem/GetAllModem`)
  }
  public GetAllRfIdReaders(): Observable<any> {
    return this._http.get<any>(`${this.assetUrl}RFIdReader/GetAllRfIdReaders`)
  }
  public getallpowerCabinet(): Observable<any> {
    return this._http.get<any>(
      `${this.assetUrl}PowerCabinet/getallpowerCabinet`,
    )
  }

  public GetDispenserStatus(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.assetUrl}Dispenser/GetDispenserStatus`,
      params,
    )
  }
  public GetAllModelData(params: any): Observable<any> {
    return this._http.post<any>(`${this.assetUrl}Model/GetAllModelData`, params)
  }

  public GetAllRFIdReaderData(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.assetUrl}RFIdReader/GetAllRFIdReaderData`,
      params,
    )
  }
  public GetPowerCabinetData(param: any): Observable<any> {
    return this._http.get<any>(
      `${this.assetUrl}PowerCabinet/GetPowerCabinetData?dispenserId=${param}`,
    )
  }

  public Updatedispenser(params: any): Observable<any> {
    return this._http.put<any>(
      `${this.assetUrl}Dispenser/updatedispenser`,
      params,
    )
  }
  public GetModemDDL(params: any): Observable<any> {
    return this._http.post<any>(`${this.assetUrl}Dispenser/GetModemDDL`, params)
  }

  public GetSwitchGearDropDown(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.assetUrl}SwitchGear/GetSwitchGearDropDown`,
      params,
    )
  }
  public GetAllPadData(params: any): Observable<any> {
    return this._http.post<any>(`${this.assetUrl}Pad/GetAllPadData`, params)
  }
  public GetAllLocationName(): Observable<any> {
    return this._http.get<any>(`${this.assetUrl}Location/GetAllLocationName`)
  }
  public CreatePad(params: any): Observable<any> {
    return this._http.post<any>(`${this.assetUrl}Pad/CreatePad`, params)
  }

  public GetCombineAssetList(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.assetUrl}AllAssetList/GetCombineAssetList`,
      params,
    )
  }

  public GetPadById(params: any): Observable<any> {
    return this._http.get<any>(`${this.assetUrl}Pad/getpadbyid?id=${params}`)
  }
  public UpdatePad(params: any): Observable<any> {
    return this._http.put<any>(`${this.assetUrl}Pad/updatepad`, params)
  }

  public CreateCable(params: any): Observable<any> {
    return this._http.post<any>(`${this.assetUrl}Cable/CreateCable`, params)
  }
  public UpdateCable(params: any): Observable<any> {
    return this._http.put<any>(`${this.assetUrl}Cable/UpdateCable`, params)
  }

  public GetCableById(params: any): Observable<any> {
    return this._http.get<any>(
      `${this.assetUrl}Cable/getCablebyid?id=${params}`,
    )
  }

  public CreatePowerCabinet(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.assetUrl}PowerCabinet/createpowerCabinet`,
      params,
    )
  }

  public UpdatePowerCabinet(params: any): Observable<any> {
    return this._http.put<any>(
      `${this.assetUrl}PowerCabinet/updatepowerCabinet`,
      params,
    )
  }

  public GetPowerCabinetById(params: any): Observable<any> {
    return this._http.get<any>(
      `${this.assetUrl}PowerCabinet/getpowercabinetbyid?id=${params}`,
    )
  }

  public AddRfIdReader(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.assetUrl}RFIdReader/AddRfIdReader`,
      params,
    )
  }

  public UpdateRfIdReader(params: any): Observable<any> {
    return this._http.put<any>(
      `${this.assetUrl}RFIdReader/UpdateRfIdReader`,
      params,
    )
  }

  public GetRfIdReaderById(params: any): Observable<any> {
    return this._http.get<any>(
      `${this.assetUrl}RFIdReader/GetRfIdReaderById/${params}`,
    )
  }

  public GetPlugType(params: any): Observable<any> {
    return this._http.post<any>(`${this.assetUrl}Dispenser/GetPlugType`, params)
  }

  public GetConnectorType(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.assetUrl}Dispenser/GetConnectorType`,
      params,
    )
  }

  public Getcustomer(id: any): Observable<any> {
    return this._http.get<any>(
      `${this.userUrl}Customer/getcustomerbyid?id=${id}`,
    )
  }

  public CreateModem(params: any): Observable<any> {
    return this._http.post<any>(`${this.assetUrl}Modem/CreateModem`, params)
  }

  public GetCableDropDown(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.assetUrl}Cable/GetCableDropDown`,
      params,
    )
  }

  public UpdateModem(params: any): Observable<any> {
    return this._http.put<any>(`${this.assetUrl}Modem/UpdateModem`, params)
  }

  public GetModembyid(params: any): Observable<any> {
    return this._http.get<any>(
      `${this.assetUrl}Modem/getModembyid?id=${params}`,
    )
  }

  public IsActiveAsset(params: any): Observable<any> {
    return this._http.put<any>(
      `${this.assetUrl}AllAssetList/IsActiveAsset`,
      params,
    )
  }
  public IsActiveVehicleById(params: any): Observable<any> {
    return this._http.put<any>(
      `${this.assetUrl}Vehicle/IsActiveVehicleById`,
      params,
    )
  }

  public GetAllPricePlan(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.pricingUrl}PricePlan/GetAllPricePlan`,
      params,
    )
  }

  public CreateSwitchGear(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.assetUrl}SwitchGear/CreateSwitchGear`,
      params,
    )
  }

  public GetSwitchGearById(params: any): Observable<any> {
    return this._http.get<any>(
      `${this.assetUrl}SwitchGear/GetSwitchGearById?id=${params}`,
      params,
    )
  }
  public UpdateSwitchGear(params: any): Observable<any> {
    return this._http.put<any>(
      `${this.assetUrl}SwitchGear/UpdateSwitchGear`,
      params,
    )
  }

  public GetAllSubscriptionPlan(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.pricingUrl}SubscriptionPlan/GetAllSubscriptionPlan`,
      params,
    )
  }
  public IsActiveSubscription(params: any): Observable<any> {
    return this._http.put<any>(
      `${this.pricingUrl}SubscriptionPlan/IsActiveSubscription`,
      params,
    )
  }

  public SubscriptionplanById(params: any): Observable<any> {
    return this._http.get<any>(
      `${this.pricingUrl}SubscriptionPlan/subscriptionplanById?id=${params}`,
      params,
    )
  }
  public CreateSubscriptionPlan(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.pricingUrl}SubscriptionPlan/CreateSubscriptionPlan`,
      params,
    )
  }
  public UpdateSubscriptionPlan(params: any): Observable<any> {
    return this._http.put<any>(
      `${this.pricingUrl}SubscriptionPlan/UpdateSubscriptionPlan`,
      params,
    )
  }
  public GetPricingPlanMocky(): Observable<any> {
    return this._http.get<any>(
      `https://run.mocky.io/v3/b2eb683a-3227-44a0-b2d4-ae8d55c59c71`,
    )
  }
}
