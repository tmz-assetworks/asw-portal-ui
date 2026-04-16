import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
@Injectable({ providedIn: 'root' })
export class AdminService {
  /**
   * Declare variable
   */
  ASSET_API_URL: string
  USER_API_URL: string
  PRICING_API_URL: string

  constructor(private _http: HttpClient) {
    this.ASSET_API_URL = environment.ASSET_API_URL
    this.USER_API_URL = environment.USER_API_URL
    this.PRICING_API_URL = environment.PRICING_API_URL
  }

  /**
   * Get location lists
   * @param params
   * @returns
   */
  public GetLocationList(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.ASSET_API_URL}Location/GetLocationList`,
      params,
    )
  }
  /**
   * Create location
   * @param params
   * @returns
   */

  public CreateLocation(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.ASSET_API_URL}Location/CreateLocation`,
      params,
    )
  }

  public DeleteDispenserById(id: number): Observable<any> {
    return this._http.delete<any>(
      `${this.ASSET_API_URL}Dispenser/DeleteDispenserById/${id}`
    );
  }

  /**
   * Create user
   * @param params
   * @returns
   */

  public CreateUser(params: any): Observable<any> {
    return this._http.post<any>(`${this.USER_API_URL}User/CreateUser`, params)
  }
  /**
   * Update user
   * @param params
   * @returns
   */

  public UpdateUser(params: any): Observable<any> {
    return this._http.put<any>(`${this.USER_API_URL}User/UpdateUser`, params)
  }

  /**
   * Get all users
   * @param params
   * @returns
   */
  public GetAllUsers(params: any): Observable<any> {
    return this._http.post<any>(`${this.USER_API_URL}User/GetAllUsers`, params)
  }

  /**
   * Update location
   * @param params
   * @returns
   */
  public UpdateLocation(params: any): Observable<any> {
    return this._http.put<any>(
      `${this.ASSET_API_URL}Location/UpdateLocation`,
      params,
    )
  }
  /**
   * Get all location status
   * @param params
   * @returns
   */

  GetAllLocationStatus(params: any): Observable<any> {
    return this._http.get<any>(
      `${this.ASSET_API_URL}Location/GetAllLocationStatus?id=${params}`,
    )
  }
  /**
   * Get location details by id
   * @param id
   * @returns
   */

  public GetLocationById(id: any): Observable<any> {
    return this._http.get<any>(
      `${this.ASSET_API_URL}Location/GetLocationById/${id}`,
    )
  }

  public getListApi(
    type: string,
    id?: number,
    stateId?: number,
  ): Observable<any> {
    if (type == 'state') {
      return this._http.get<any>(
        `${this.ASSET_API_URL}Country/getAllStateByCountryId?Id=${id}`,
      )
    } else if (type == 'city') {
      return this._http.get<any>(
        `${this.ASSET_API_URL}Country/getAllCityByStateId?Id=${stateId}`,
      )
    } else if (type == 'locationStatus') {
      return this._http.get<any>(
        `${this.ASSET_API_URL}Location/GetAllLocationStatus`,
      )
    } else if (type == 'location') {
      return this._http.get<any>(
        `${this.ASSET_API_URL}Location/GetLocationById?Id=${id}`,
      )
    } else if (type == 'department') {
      return this._http.get<any>(
        `${this.ASSET_API_URL}Location/GetAllDepartmentList`,
      )
    } else if (type == 'locationName') {
      return this._http.get<any>(
        `${this.ASSET_API_URL}Location/GetAllLocationName`,
      )
    } else if (type == 'operator') {
      return this._http.get<any>(
        `${this.USER_API_URL}User/GetUserById?id=${id}`,
      )
    }
    return this._http.get<any>(`${this.ASSET_API_URL}Country/getallcountry`)
  }

  public IsActiveUserById(params: any): Observable<any> {
    return this._http.request(
      'delete',
      `${this.USER_API_URL}User/IsActiveUsers`,
      {
        body: params,
      },
    )
  }

  public ChangeState(params: any): Observable<any> {
    return this._http.request('delete', `${this.USER_API_URL}User/DeleteUser`, {
      body: params,
    })
  }

  public GetVechicleList(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.ASSET_API_URL}Vehicle/GetVechicleList`,
      params,
    )
  }

  public GetVehicleModelYearDDLList(): Observable<any> {
    return this._http.get<any>(
      `${this.ASSET_API_URL}Vehicle/GetVehicleModelYearDDLList`,
    )
  }

  public GetVehicleMakeDDLList(): Observable<any> {
    return this._http.get<any>(
      `${this.ASSET_API_URL}Vehicle/GetVehicleMakeDDLList`,
    )
  }

  public GetVehicleModelDDLList(): Observable<any> {
    return this._http.get<any>(
      `${this.ASSET_API_URL}Vehicle/GetVehicleModelDDLList`,
    )
  }

  public CreateVehicle(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.ASSET_API_URL}Vehicle/CreateVehicle`,
      params,
    )
  }

  public GetAllVehicleById(id: any): Observable<any> {
    return this._http.get<any>(
      `${this.ASSET_API_URL}Vehicle/GetVehicleDetailsById/${id}`,
    )
  }

  public UpdateVehicle(params: any): Observable<any> {
    return this._http.put<any>(
      `${this.ASSET_API_URL}Vehicle/UpdateVehicle`,
      params,
    )
  }

  public DeleteVehicleById(id: number): Observable<any> {
    return this._http.delete<any>(
      `${this.ASSET_API_URL}Vehicle/DeleteVehicleById/${id}`
    );
  }

  public GetDispensersWithPagination(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.ASSET_API_URL}Dispenser/GetDispensersWithPagination`,
      params,
    )
  }

  public IsActiveDispenserById(params: any): Observable<any> {
    return this._http.put<any>(
      `${this.ASSET_API_URL}Dispenser/IsActiveDispenserById`,
      params,
    )
  }

  public GetDispenserDetailsById(id: any): Observable<any> {
    return this._http.post<any>(
      `${this.ASSET_API_URL}Dispenser/GetDispenserDetailsById?dispenserId=${id}`,
      '',
    )
  }

  public CreateDispenser(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.ASSET_API_URL}Dispenser/CreateDispenser`,
      params,
    )
  }

  public GetAllLocation(): Observable<any> {
    return this._http.get<any>(`${this.ASSET_API_URL}Location/GetAllLocation`)
  }

  public GetAllMakeMaster(): Observable<any> {
    return this._http.get<any>(
      `${this.ASSET_API_URL}MakeMaster/GetAllMakeMaster`,
    )
  }

  public GetAllModel(): Observable<any> {
    return this._http.get<any>(`${this.ASSET_API_URL}Model/GetAllModel`)
  }

  public GetAllModem(): Observable<any> {
    return this._http.get<any>(`${this.ASSET_API_URL}Modem/GetAllModem`)
  }
  public GetAllRfIdReaders(): Observable<any> {
    return this._http.get<any>(
      `${this.ASSET_API_URL}RFIdReader/GetAllRfIdReaders`,
    )
  }
  public getallpowerCabinet(): Observable<any> {
    return this._http.get<any>(
      `${this.ASSET_API_URL}PowerCabinet/getallpowerCabinet`,
    )
  }

  public GetDispenserStatus(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.ASSET_API_URL}Dispenser/GetDispenserStatus`,
      params,
    )
  }
  public GetAllModelData(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.ASSET_API_URL}Model/GetAllModelData`,
      params,
    )
  }

  public GetAllRFIdReaderData(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.ASSET_API_URL}RFIdReader/GetAllRFIdReaderData`,
      params,
    )
  }
  public GetPowerCabinetData(param: any): Observable<any> {
    return this._http.get<any>(
      `${this.ASSET_API_URL}PowerCabinet/GetPowerCabinetData?dispenserId=${param}`,
    )
  }

  public Updatedispenser(params: any): Observable<any> {
    return this._http.put<any>(
      `${this.ASSET_API_URL}Dispenser/updatedispenser`,
      params,
    )
  }
  public GetModemDDL(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.ASSET_API_URL}Dispenser/GetModemDDL`,
      params,
    )
  }

  public GetSwitchGearDropDown(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.ASSET_API_URL}SwitchGear/GetSwitchGearDropDown`,
      params,
    )
  }
  public GetAllPadData(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.ASSET_API_URL}Pad/GetAllPadData`,
      params,
    )
  }
  public GetAllLocationName(): Observable<any> {
    return this._http.get<any>(
      `${this.ASSET_API_URL}Location/GetAllLocationName`,
    )
  }
  public CreatePad(params: any): Observable<any> {
    return this._http.post<any>(`${this.ASSET_API_URL}/Pad/CreatePad`, params)
  }

  public GetCombineAssetList(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.ASSET_API_URL}AllAssetList/GetCombineAssetList`,
      params,
    )
  }

  public GetPadById(params: any): Observable<any> {
    return this._http.get<any>(
      `${this.ASSET_API_URL}Pad/getpadbyid?id=${params}`,
    )
  }
  public UpdatePad(params: any): Observable<any> {
    return this._http.put<any>(`${this.ASSET_API_URL}Pad/updatepad`, params)
  }

  public CreateCable(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.ASSET_API_URL}Cable/CreateCable`,
      params,
    )
  }
  public UpdateCable(params: any): Observable<any> {
    return this._http.put<any>(`${this.ASSET_API_URL}Cable/UpdateCable`, params)
  }

  public GetCableById(params: any): Observable<any> {
    return this._http.get<any>(
      `${this.ASSET_API_URL}Cable/getCablebyid?id=${params}`,
    )
  }

  public CreatePowerCabinet(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.ASSET_API_URL}PowerCabinet/createpowerCabinet`,
      params,
    )
  }

  public UpdatePowerCabinet(params: any): Observable<any> {
    return this._http.put<any>(
      `${this.ASSET_API_URL}PowerCabinet/updatepowerCabinet`,
      params,
    )
  }

  public GetPowerCabinetById(params: any): Observable<any> {
    return this._http.get<any>(
      `${this.ASSET_API_URL}PowerCabinet/getpowercabinetbyid?id=${params}`,
    )
  }

  public AddRfIdReader(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.ASSET_API_URL}RFIdReader/AddRfIdReader`,
      params,
    )
  }

  public UpdateRfIdReader(params: any): Observable<any> {
    return this._http.put<any>(
      `${this.ASSET_API_URL}RFIdReader/UpdateRfIdReader`,
      params,
    )
  }

  public GetRfIdReaderById(params: any): Observable<any> {
    return this._http.get<any>(
      `${this.ASSET_API_URL}RFIdReader/GetRfIdReaderById/${params}`,
    )
  }

  public GetPlugType(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.ASSET_API_URL}Dispenser/GetPlugType`,
      params,
    )
  }

  public GetConnectorType(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.ASSET_API_URL}Dispenser/GetConnectorType`,
      params,
    )
  }

  public Getcustomer(id: any): Observable<any> {
    return this._http.get<any>(
      `${this.USER_API_URL}Customer/getcustomerbyid?id=${id}`,
    )
  }

  public CreateModem(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.ASSET_API_URL}Modem/CreateModem`,
      params,
    )
  }

  public GetCableDropDown(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.ASSET_API_URL}Cable/GetCableDropDown`,
      params,
    )
  }

  public UpdateModem(params: any): Observable<any> {
    return this._http.put<any>(`${this.ASSET_API_URL}Modem/UpdateModem`, params)
  }

  public GetModembyid(params: any): Observable<any> {
    return this._http.get<any>(
      `${this.ASSET_API_URL}Modem/getModembyid?id=${params}`,
    )
  }

  public IsActiveAsset(params: any): Observable<any> {
    return this._http.put<any>(
      `${this.ASSET_API_URL}AllAssetList/IsActiveAsset`,
      params,
    )
  }
  public IsActiveVehicleById(params: any): Observable<any> {
    return this._http.put<any>(
      `${this.ASSET_API_URL}Vehicle/IsActiveVehicleById`,
      params,
    )
  }

  public GetAllPricePlan(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.PRICING_API_URL}PricePlan/GetAllPricePlan`,
      params,
    )
  }

 

  public CreateSwitchGear(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.ASSET_API_URL}SwitchGear/CreateSwitchGear`,
      params,
    )
  }

  public GetSwitchGearById(params: any): Observable<any> {
    return this._http.get<any>(
      `${this.ASSET_API_URL}SwitchGear/GetSwitchGearById?id=${params}`,
      params,
    )
  }
  public UpdateSwitchGear(params: any): Observable<any> {
    return this._http.put<any>(
      `${this.ASSET_API_URL}SwitchGear/UpdateSwitchGear`,
      params,
    )
  }
  public GetCurrencyCode(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.PRICING_API_URL}SubscriptionPlan/GetCurrencyDDL`,
      params,
    )
  }
  public GetCustomers(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.PRICING_API_URL}/SubscriptionPlan/GetCustomersDDL`,
      params,
    )
  }
  public GetSubscriptionPlanType(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.PRICING_API_URL}/SubscriptionPlan/GetSubscriptionPlanTypeDDL`,
      params,
    )
  }
  public GetSubscriptionStatus(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.PRICING_API_URL}/SubscriptionPlan/GetStatusDDL`,
      params,
    )
  }
  public GetSubscriptionGroup(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.PRICING_API_URL}/SubscriptionPlan/GetSubscriptionGroupDDL`,
      params,
    )
  }
  public GetAllSubscriptionPlan(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.PRICING_API_URL}SubscriptionPlan/GetAllSubscriptionPlan`,
      params,
    )
  }
  public IsActiveSubscription(params: any): Observable<any> {
    return this._http.put<any>(
      `${this.PRICING_API_URL}SubscriptionPlan/IsActiveSubscription`,
      params,
    )
  }

  public SubscriptionplanById(params: any): Observable<any> {
    return this._http.get<any>(
      `${this.PRICING_API_URL}/SubscriptionPlan/subscriptionplanById?id=${params}`,
      params,
    )
  }
  public CreateSubscriptionPlan(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.PRICING_API_URL}/SubscriptionPlan/CreateSubscriptionPlan`,
      params,
    )
  }
  public UpdateSubscriptionPlan(params: any): Observable<any> {
    return this._http.put<any>(
      `${this.PRICING_API_URL}/SubscriptionPlan/UpdateSubscriptionPlan`,
      params,
    )
  }
  /**
   * Pricing API
   * @param params
   * @returns
   */

  public CreatePricePlan(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.PRICING_API_URL}PricePlan/CreatePricePlan`,
      params,
    )
  }

   public GetAllDepartMentName(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.ASSET_API_URL}OwningDepartments/GetAllDepartment`,
      params,
    )
  }

    /**
   * Department API
   * @param params
   * @returns
   */

  public CreateDepartment(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.ASSET_API_URL}OwningDepartments/CreateDepartment`,
      params,
    )
  }

   public getDepartmentById(params: any): Observable<any> {
    return this._http.get<any>(
      `${this.ASSET_API_URL}OwningDepartments/getDepartmentbyid?id=${params}`,
      params,
    )
  }

  public UpdateDepartment(params: any): Observable<any> {
    return this._http.put<any>(
      `${this.ASSET_API_URL}OwningDepartments/UpdateDepartment`,
      params,
    )
  }

  public DeleteDepartmentById(id: number): Observable<any> {
    return this._http.delete<any>(
      `${this.ASSET_API_URL}OwningDepartments/DeleteDepartmentById/${id}`
    );
  }

  public UpdatePricePlan(params: any): Observable<any> {
    return this._http.put<any>(
      `${this.PRICING_API_URL}PricePlan/UpdatePricePlan`,
      params,
    )
  }

  public GetCurrencyDDL(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.PRICING_API_URL}SubscriptionPlan/GetCurrencyDDL`,
      params,
    )
  }

  public GetAllPriceType(): Observable<any> {
    return this._http.get<any>(
      `${this.PRICING_API_URL}PricePlan/GetAllPriceType`,
    )
  }
  public GetAllUnit(id: any): Observable<any> {
    return this._http.get<any>(
      `${this.PRICING_API_URL}PricePlan/GetAllUnit?PriceTypeId=${id}`,
    )
  }
  public GetAllLevel(): Observable<any> {
    return this._http.get<any>(`${this.PRICING_API_URL}PricePlan/GetAllLevel`)
  }
  public GetAllCurrencyCode(): Observable<any> {
    return this._http.get<any>(
      `${this.PRICING_API_URL}PricePlan/GetAllCurrencyCode`,
    )
  }
  public CustomerDDL(): Observable<any> {
    return this._http.get<any>(`${this.USER_API_URL}User/CustomerDDL`)
  }
  public getPricePlanbyid(params: any): Observable<any> {
    return this._http.get<any>(
      `${this.PRICING_API_URL}PricePlan/getPricePlanbyid?id=${params}`,
      params,
    )
  }

  public GetLocationName(): Observable<any> {
    return this._http.get<any>(
      `${this.ASSET_API_URL}Location/GetAllLocationName`,
    )
  }

  public GetChargeboxIdByLocationsId(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.ASSET_API_URL}Dispenser/GetChargeboxIdByLocationsId`,
      params,
    )
  }

  public IsActivePricePlan(params: any): Observable<any> {
    return this._http.put<any>(
      `${this.PRICING_API_URL}PricePlan/IsActivePricePlan`,
      params,
    )
  }
  public GetAllModemTypeData(): Observable<any> {
    return this._http.get<any>(`${this.ASSET_API_URL}Modem/GetAllModemTypeData`)
  }
 
    public getListApis(
    type: string,
    id?: number,
    stateId?: number,
  ): Observable<any> {
    if (type == 'state') {
      return this._http.get<any>(
        `${this.ASSET_API_URL}Country/getAllStateByCountryId?Id=${id}`,
      )
    } else if (type == 'city') {
      return this._http.get<any>(
        `${this.ASSET_API_URL}Country/getAllCityByStateId?Id=${stateId}`,
      )
    } else if (type == 'admin') {
      return this._http.get<any>(`${this.USER_API_URL}User/GetUserById?id=${id}`)
    } else if (type == 'org') {
      return this._http.get<any>(`${this.USER_API_URL}User/CustomerDDL`)
    }
    return this._http.get<any>(`${this.ASSET_API_URL}Country/getallcountry`)
  }

    public ModifyCustomer(params: any): Observable<any> {
    return this._http.put<any>(`${this.USER_API_URL}Customer/UpdateCustomer`, params)
  }

   public TimeZoneList(): Observable<any> {
    return this._http.get<any>(`${this.ASSET_API_URL}TimeZone/GetAllTimeZones`)
  }


}
