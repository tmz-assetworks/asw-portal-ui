import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/service/storage.service';
import { ChargerService } from '../charger.service';

@Component({
  selector: 'app-charger-information',
  templateUrl: './charger-information.component.html',
  styleUrls: ['./charger-information.component.scss']
})
export class ChargerInformationComponent implements OnInit {
  UserId: string | null;
  chargerName: string | null;
  selecteLocationIds: string | null;
  data: any;
  SerialNumber: any;
  chargerboxid: any;
  charger: any;
  chargertype: any;
  chargerstatus: any;
  installeddate: any;
  status: any;
  address: any;
  country: any;
  state: any;
  city: any;
  zipcode: any;

  constructor(private _storageService: StorageService, private _chargerService: ChargerService) { 
    this.UserId = this._storageService.getLocalData('user_id')
  this.selecteLocationIds = this._storageService.getSessionData('chargerBoxId')

  this.chargerName = this._storageService.getSessionData('chargerName')}

  ngOnInit(): void {
   this.GetChargerInformation();
  }

  GetChargerInformation(){
      const body = {
    //     pageNumber: 1,
    //     searchParam: '',
    //     pageSize: 10,
    //     orderBy: 'chargerBoxId',
    //     locationIds: [],
           chargeBoxId: this.selecteLocationIds,
            operatorId: ""
    //     opratorid: this.UserId,
       }
      this._chargerService.GetChargerInformation(body).subscribe((res: any) => {
         
        
         this.SerialNumber=res.data.serialNo;
         this.chargerboxid=res.data.chargeBoxId;
         this.charger=res.data.charger;
         this.chargertype=res.data.chargerType;
         this.chargerstatus=res.data.chargerStatus;
        this.installeddate=res.data.installedDate;
        this.status=res.data.status;
        this.address=res.data.address;
        this.country=res.data.country;
        this.state=res.data.state;
        this.city=res.data.city;
        this.zipcode=res.data.zipCode;
      
        
      
      })
     }



}
