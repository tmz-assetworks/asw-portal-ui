import { Component, OnInit } from '@angular/core'
import { AuthService } from 'src/app/service/auth/auth.service'
import { StorageService } from 'src/app/service/storage.service'
import { LocationService } from '../location.service'
import { LocationStatusPanelComponent } from '../location-status-panel/location-status-panel.component'
import { CommonModule } from '@angular/common'
import { NgxEchartsDirective } from 'ngx-echarts'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'
import { RouterModule } from '@angular/router'
declare const google: any

@Component({
  selector: 'app-location-information',
  templateUrl: './location-information.component.html',
  styleUrls: ['./location-information.component.scss'],
  imports:[LocationStatusPanelComponent,CommonModule,RouterModule,SharedMaterialModule]
})
export class LocationInformationComponent implements OnInit {
  panelOpenState= false
  panelOpenState1= false
  panelOpenState2= false
  panelOpenState3= false
  UserId: any
  selectedLocationIds: any
  contactPersonName: any
  mobileNumber: any
  emailId: any
  locationSchedule: any
  totalCapacity: any
  utilityService: any
  departmentName: any
  address: any
  locationName: any
  fuelProtectType: any
  locationAddressLong: any
  locationAddressLat: any
  initMapFunc: any
  locationTitleName: string | null
  locationScheduleSaturday: any
  contactPersonNumber: any

  constructor(
    private _storageService: StorageService,
    private _locationService: LocationService,
  ) {
    this.UserId = this._storageService.getLocalData('user_id')
    this.selectedLocationIds = this._storageService.getSessionData('locationId')
    this.locationTitleName = this._storageService.getSessionData('locationName')
  }

  ngOnInit(): void {
    this.getlocationInformationById(this.selectedLocationIds)
    ;(window as any).initMap = this.initMap as any
    this.initMapFunc = (window as any).initMap.bind(this)
    // initMapFunc()
  }

  /**
   * Set marker on map
   */

  initMap() {
    /**
     * Initializes map
     */

    const initialize = () => {
      let lat = this.locationAddressLat
      let long = this.locationAddressLong
      var center = new google.maps.LatLng(lat, long)

      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: center,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      })

      new google.maps.Marker({
        position: center,
        map,
        title: '',
      })
    }

    google.load('visualization', '1', { packages: ['corechart'] })
    google.setOnLoadCallback(initialize)
  }

  /**
   * Get location information
   */

  getlocationInformationById(locationId: any) {
    this._locationService
      .getlocationInformationById(locationId)
      .subscribe((res) => {
        this.contactPersonName = res.data.contactPersonName

        this.contactPersonNumber = res.data.contactPersonNumber
        this.emailId = res.data.email

        this.departmentName = res.data.departmentName
      //  this.address = res.data.department.address
        this.locationAddressLat = res.data.locationAddress.latitude
        this.locationAddressLong = res.data.locationAddress.longitude
        this.fuelProtectType = res.data.fuelProtectType

        this.locationName = res.data.locationName
        this.totalCapacity = res.data.totalCapacity
        this.utilityService = res.data.utilityService

        this.locationSchedule = res.data.locationSchedule

        this.initMapFunc()

        // this.locationScheduleSaturday = res.data.locationSchedule
      })
  }
}
