import { Component, OnInit } from '@angular/core'
import { StorageService } from 'src/app/service/storage.service'
import { ChargerService } from '../charger.service'

@Component({
  selector: 'app-charger-information',
  templateUrl: './charger-information.component.html',
  styleUrls: ['./charger-information.component.scss'],
})
export class ChargerInformationComponent implements OnInit {
  UserId: string | null
  chargerName: string | null
  selecteLocationIds: string | null
  chargerInfo: any
  userTimeZone:any

  constructor(
    private _storageService: StorageService,
    private _chargerService: ChargerService,
  ) {
    this.UserId = this._storageService.getLocalData('user_id')
    this.selecteLocationIds = this._storageService.getSessionData(
      'chargerBoxId',
    )
    this.chargerName = this._storageService.getSessionData('chargerName')
    this.userTimeZone=this._storageService.getLocalData('time_zone');  

  }

  ngOnInit(): void {
    this.GetChargerInformation()
  }

  GetChargerInformation() {
    const body = {
      //     pageNumber: 1,
      //     searchParam: '',
      //     pageSize: 10,
      //     orderBy: 'chargerBoxId',
      //     locationIds: [],
      chargeBoxId: this.selecteLocationIds,
      operatorId: '',
      //     opratorid: this.UserId,
    }
    this._chargerService.GetChargerInformation(body).subscribe((res: any) => {
      if (res.data) {
        this.chargerInfo = res.data
      }
    })
  }
}
