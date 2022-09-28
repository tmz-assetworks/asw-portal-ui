import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
@Injectable({ providedIn: 'root' })
export class AdminService {
  url: any
  urlBase: any
  urlPad: any
  constructor(private _http: HttpClient) {
    this.url = environment.assetLocalOrigin
    this.urlBase = environment.localOrigin
    this.urlPad = environment.originAuth
  }

  public GetLocationList(params: any): Observable<any> {
    return this._http.post<any>(`${this.url}Location/GetLocationList`, params)
  }

  public CreateLocation(params: any): Observable<any> {
    return this._http.post<any>(`${this.url}Location/CreateLocation`, params)
  }

  public createOperator(params: any): Observable<any> {
    return this._http.post<any>(`${this.urlBase}User/CreateUser`, params)
  }

  public updateOperator(params: any): Observable<any> {
    return this._http.put<any>(`${this.urlBase}User/UpdateUser`, params)
  }

  public getOperator(params: any): Observable<any> {
    return this._http.post<any>(`${this.urlBase}User/GetAllUsers`, params)
  }

  public updateLocation(params: any): Observable<any> {
    return this._http.put<any>(`${this.url}Location/UpdateLocation`, params)
  }

  GetAllLocationStatus(params: any): Observable<any> {
    return this._http.get<any>(
      `${this.url}Location/GetAllLocationStatus?id=${params}`,
    )
  }

  public GetLocationById(id: any): Observable<any> {
    return this._http.get<any>(`${this.url}Location/GetLocationById/${id}`)
  }

  public getListApi(
    type: string,
    id?: number,
    stateId?: number,
  ): Observable<any> {
    if (type == 'state') {
      return this._http.get<any>(
        `${this.url}Country/getAllStateByCountryId?Id=${id}`,
      )
    } else if (type == 'city') {
      return this._http.get<any>(
        `${this.url}Country/getAllCityByStateId?Id=${stateId}`,
      )
    } else if (type == 'locationStatus') {
      return this._http.get<any>(`${this.url}Location/GetAllLocationStatus`)
    } else if (type == 'location') {
      return this._http.get<any>(`${this.url}Location/GetLocationById?Id=${id}`)
    } else if (type == 'department') {
      return this._http.get<any>(`${this.url}Location/GetAllDepartmentList`)
    } else if (type == 'locationName') {
      return this._http.get<any>(`${this.url}Location/GetAllLocationName`)
    } else if (type == 'operator') {
      return this._http.get<any>(`${this.urlBase}User/GetUserById?id=${id}`)
    }
    return this._http.get<any>(`${this.url}Country/getallcountry`)
  }

  public ChangeState(params: any): Observable<any> {
    // return this._http.delete<any>(`${this.url}Location/DeleteLocation`, params);
    return this._http.request('delete', `${this.url}Location/DeleteLocation`, {
      body: params,
    })
  }

  public GetVechicleList(params: any): Observable<any> {
    return this._http.post<any>(`${this.url}Vehicle/GetVechicleList`, params)
  }

  public GetVehicleModelYearDDLList(): Observable<any> {
    return this._http.get<any>(`${this.url}Vehicle/GetVehicleModelYearDDLList`)
  }

  public GetVehicleMakeDDLList(): Observable<any> {
    return this._http.get<any>(`${this.url}Vehicle/GetVehicleMakeDDLList`)
  }

  public GetVehicleModelDDLList(): Observable<any> {
    return this._http.get<any>(`${this.url}Vehicle/GetVehicleModelDDLList`)
  }

  public CreateVehicle(params: any): Observable<any> {
    return this._http.post<any>(`${this.url}Vehicle/CreateVehicle`, params)
  }

  public GetAllVehicleById(id: any): Observable<any> {
    return this._http.get<any>(`${this.url}Vehicle/GetVehicleDetailsById/${id}`)
  }

  public UpdateVehicle(params: any): Observable<any> {
    return this._http.put<any>(`${this.url}Vehicle/UpdateVehicle`, params)
  }

  public DeleteVehicleById(params: any): Observable<any> {
    return this._http.delete<any>(
      `${this.url}Vehicle/DeleteVehicleById`,
      params,
    )
  }

  /**
   * Charger API
   */

  public GetDispensersWithPagination(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.url}Dispenser/GetDispensersWithPagination`,
      params,
    )
  }

  public GetDispenserDetailsById(id: any): Observable<any> {
    return this._http.post<any>(
      `${this.url}Dispenser/GetDispenserDetailsById?dispenserId=${id}`,
      '',
    )
  }

  public CreateDispenser(params: any): Observable<any> {
    return this._http.post<any>(`${this.url}Dispenser/CreateDispenser`, params)
  }

  public GetAllLocation(): Observable<any> {
    return this._http.get<any>(`${this.url}Location/GetAllLocation`)
  }

  public GetAllMakeMaster(): Observable<any> {
    return this._http.get<any>(`${this.url}MakeMaster/GetAllMakeMaster`)
  }

  public GetAllModel(): Observable<any> {
    return this._http.get<any>(`${this.url}Model/GetAllModel`)
  }

  public GetAllModem(): Observable<any> {
    return this._http.get<any>(`${this.url}Modem/GetAllModem`)
  }
  public GetAllRfIdReaders(): Observable<any> {
    return this._http.get<any>(`${this.url}RFIdReader/GetAllRfIdReaders`)
  }
  public getallpowerCabinet(): Observable<any> {
    return this._http.get<any>(`${this.url}PowerCabinet/getallpowerCabinet`)
  }

  public GetDispenserStatus(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.url}Dispenser/GetDispenserStatus`,
      params,
    )
  }
  public GetAllModelData(params: any): Observable<any> {
    return this._http.post<any>(`${this.url}Model/GetAllModelData`, params)
  }

  public GetAllRFIdReaderData(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.url}RFIdReader/GetAllRFIdReaderData`,
      params,
    )
  }
  public GetPowerCabinetData(): Observable<any> {
    return this._http.get<any>(`${this.url}PowerCabinet/GetPowerCabinetData`)
  }

  public updatedispenser(params: any): Observable<any> {
    return this._http.put<any>(`${this.url}Dispenser/updatedispenser`, params)
  }
  public GetModemDDL(params: any): Observable<any> {
    return this._http.post<any>(`${this.url}Dispenser/GetModemDDL`, params)
  }
  public GetAllPadData(params: any): Observable<any> {
    return this._http.post<any>(`${this.url}Pad/GetAllPadData`, params)
  }
  public GetAllLocationName(): Observable<any> {
    return this._http.get<any>(`${this.url}Location/GetAllLocationName`)
  }
  public createPad(params: any): Observable<any> {
    return this._http.post<any>(
      `https://qa-assets-service.azurewebsites.net/asset/pad`,
      params,
    )
  }

  public GetCombineAssetList(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.url}AllAssetList/GetCombineAssetList`,
      params,
    )
  }

  public getPadById(params: any): Observable<any> {
    return this._http.get<any>(`${this.url}Pad/getpadbyid?id=${params}`)
  }
  public updatePad(params: any): Observable<any> {
    return this._http.put<any>(`${this.url}Pad/updatepad`, params)
  }

  public CreateCable(params: any): Observable<any> {
    return this._http.post<any>(`${this.url}Cable/CreateCable`, params)
  }
  public updateCable(params: any): Observable<any> {
    return this._http.put<any>(`${this.url}Cable/UpdateCable`, params)
  }

  public getCableById(params: any): Observable<any> {
    return this._http.get<any>(`${this.url}Cable/getCablebyid?id=${params}`)
  }

  public createPowerCabinet(params: any): Observable<any> {
    return this._http.post<any>(
      `${this.url}PowerCabinet/createpowerCabinet`,
      params,
    )
  }

  public updatePowerCabinet(params: any): Observable<any> {
    return this._http.put<any>(
      `${this.url}PowerCabinet/updatepowerCabinet`,
      params,
    )
  }

  public getPowerCabinetById(params: any): Observable<any> {
    return this._http.get<any>(
      `${this.url}PowerCabinet/getpowercabinetbyid?id=${params}`,
    )
  }

  public AddRfIdReader(params: any): Observable<any> {
    return this._http.post<any>(`${this.url}RFIdReader/AddRfIdReader`, params)
  }

  public UpdateRfIdReader(params: any): Observable<any> {
    return this._http.put<any>(`${this.url}RFIdReader/UpdateRfIdReader`, params)
  }

  public GetRfIdReaderById(params: any): Observable<any> {
    return this._http.get<any>(
      `${this.url}RFIdReader/GetRfIdReaderById/${params}`,
    )
  }

  public GetPlugType(params: any): Observable<any> {
    return this._http.post<any>(`${this.url}Dispenser/GetPlugType`, params)
  }

  public GetConnectorType(params: any): Observable<any> {
    return this._http.post<any>(`${this.url}Dispenser/GetConnectorType`, params)
  }
  /**
   * Customer API
   */

  public getcustomer(id: any): Observable<any> {
    return this._http.get<any>(
      `${this.urlBase}Customer/getcustomerbyid?id=${id}`,
    )
  }

  public CreateModem(params: any): Observable<any> {
    return this._http.post<any>(`${this.url}Modem/CreateModem`, params)
  }

  public UpdateModem(params: any): Observable<any> {
    return this._http.put<any>(`${this.url}Modem/UpdateModem`, params)
  }

  public getModembyid(params: any): Observable<any> {
    return this._http.get<any>(`${this.url}Modem/getModembyid?id=${params}`)
  }

  public IsActiveAsset(params: any): Observable<any> {
    return this._http.put<any>(`${this.url}AllAssetList/IsActiveAsset`, params)
  }
  public IsActiveVehicleById(params: any): Observable<any> {
    return this._http.put<any>(`${this.url}Vehicle/IsActiveVehicleById`,params)
  }

  
}
