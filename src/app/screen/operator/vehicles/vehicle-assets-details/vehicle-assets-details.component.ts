import { Component, OnInit } from '@angular/core'
import { StorageService } from 'src/app/service/storage.service'
import { VehicleService } from '../vehicle.service'

@Component({
  selector: 'app-vehicle-assets-details',
  templateUrl: './vehicle-assets-details.component.html',
  styleUrls: ['./vehicle-assets-details.component.scss'],
})
export class VehicleAssetsDetailsComponent implements OnInit {
  // DECLARE VARIABLES

  vehicleId: string | null
  vehicleData: any
  subsPlanData: any
  userTimeZone: any
  
  constructor(
    private _storageService: StorageService,
    public _vehicleService: VehicleService,
  ) {
    this.vehicleId = this._storageService.getSessionData('vehicleId')
    this.userTimeZone = this._storageService.getLocalData("time_zone");

  }

  ngOnInit(): void {
    //API CALL
    this.GetVehicleByID(this.vehicleId)
  }

  // GET VEHICLE BY ID

  GetVehicleByID(vehicleId: any) {
    this._vehicleService.GetVehicleByID(vehicleId).subscribe((res) => {
      this.vehicleData = res.data
      this.subsPlanData = res.data.applicableSubscriptionPlans
    })
  }
}
