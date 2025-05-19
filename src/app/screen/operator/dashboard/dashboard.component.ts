import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { AuthService } from 'src/app/service/auth/auth.service'
import { StorageService } from 'src/app/service/storage.service'
import { DashboardService } from './dashboard.service'
import { data } from './locations'
import { ToastrService } from 'ngx-toastr'
import { MatDialog } from '@angular/material/dialog'
import { LegendsDialogComponent } from 'src/app/component/dashboard/legends-dialog/legends-dialog.component'
declare const google: any
declare const MarkerClusterer: any

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  myparams: any
  locations = '../../../../assets/Operator/Location-Icons.svg'
  chargers = '../../../../assets/Operator/Chargers.svg'
  charging_session = '../../../../assets/Operator/Charger-Seesion.svg'
  errors = '../../../../assets/Operator/Error.svg'

  locationPerformingData = ''
  energyUsedData = ''
  locationList: any
  summaryStatus = []

  locationIds = new FormControl([])
  filterToggle = new FormControl('1')

  selectedTime: number = 1
  selecteLocationIds = ''
  UserId: any
  chargersChartData = ''

  /**
   * declare variables for charging session
   */

  chargingSessionData = ''

  mapstatusdata: any
  initMapFunc: any
  toggleValue: number = 1

  constructor(
    private _dashboardService: DashboardService,
    private _storageService: StorageService,
    private _router: Router,
    private _route: ActivatedRoute,
    private toastr: ToastrService,
    public dialog: MatDialog,
  ) {
    this.UserId = this._storageService.getLocalData('user_id')
  }

  ngOnInit(): void {
    let isDuration = this._storageService.getSessionData('duration')

    let isLocation = this._storageService.getSessionData('locationId')

    if (isLocation) {
      this._storageService.removeSessionData('locationId')
    }

    if (isDuration) {
      this._storageService.removeSessionData('duration')
      this._storageService.removeSessionData('graphHeading')
      this._storageService.removeSessionData('pageHeading')
      this._storageService.removeSessionData('chargerBoxId')
    }
    this.getMapLocations(this.selecteLocationIds, this.UserId)
    this.locationIds.valueChanges.subscribe((res) => {
      this.onSelectLocation(res)
    })
    this.getSummaryStatus()
    ;(window as any).initMap = this.initMap as any
    this.initMapFunc = (window as any).initMap.bind(this)
    // initMapFunc()
    // this.setMarker(locations);
    // this.handleEventListenerFromMarker();

    /**
     * Get All Locations
     */
    this.getAllLocations()

    /**
     * Call Location performing
     */

    this.getLocationPerforming(
      this.selecteLocationIds,
      this.selectedTime,
      this.UserId,
      this.toggleValue,
    )

    /**
     * Call Energy Used
     */

    this.getEnergyUsedByLocationId(
      this.selecteLocationIds,
      this.selectedTime,
      this.UserId,
    )

    /**
     * Call Chargers Graph
     */

    this.getChargerGraph(
      this.selecteLocationIds,
      this.selectedTime,
      this.UserId,
    )

    this.getChargingSessionChartData(
      this.selecteLocationIds,
      this.selectedTime,
      this.UserId,
    )
  }
  /**
   * Initializes the map
   */

  initMap() {
    const initialize = () => {
      var center = new google.maps.LatLng(36.2082629, -113.737393)
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: center,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
      })

      var opt = {
        // styles: [
        //   { textColor: 'black', textSize: 15, height: 60, width: 60 },
        //   { textColor: 'black', textSize: 15, height: 70, width: 70 },
        //   { textColor: 'black', textSize: 15, height: 80, width: 80 },
        //   { textColor: 'black', textSize: 15, height: 90, width: 90 },
        //   { textColor: 'black', textSize: 15, height: 100, width: 100 },
        // ],

        legend: {
          Available: '#90993F',
          // Connected: '#ea0088',
          Offline: '#ea002a',
          Occupied: '#000C66',
          Faulted: '#757575',
          Busy: '#E97300',
          'EV Disconnected': '#0000FF',
          Reserved: '#675553',
          Unavailable: '#FFE333',
        },

        styles: [{ width: 80, height: 80,url: 'assets/cluster-icons/m' }],
      }

      var markers = []
      for (var i = 0; i < this.mapstatusdata.length; i++) {
    
        const accident_title = this.mapstatusdata[i].status
        const chargeBoxId = this.mapstatusdata[i].chargeBoxid
        const assetId = this.mapstatusdata[i].assetId
        const makeName = this.mapstatusdata[i].makeName
        const modelName = this.mapstatusdata[i].modelName
        const accident_LatLng = new google.maps.LatLng(
          this.mapstatusdata[i].latitude,
          this.mapstatusdata[i].longitude,
        )
        let newLat = accident_LatLng.lat() + (Math.random() - 0.5) / 1500 // * (Math.random() * (max - min) + min);
        let newLng = accident_LatLng.lng() + (Math.random() - 0.5) / 1500 // * (Math.random() * (max - min) + min);
        let finalLatLng = new google.maps.LatLng(newLat, newLng)

        let  color
        let  scale 
        let customSymbol1 = new google.maps.Point(15, 0) 
        if (accident_title === "Available")
        {
          scale =1.5
          color ='#90993F'
          customSymbol1 =new google.maps.Point(15, 0) 
        }
        if (accident_title === "Offline")
        {
          color ='#ea002a'
          scale =1.5
        }
        if (accident_title === "Reserved")
        {
          color ='#675553'
          scale =1.5
        }
        if (accident_title === "BusySE")
        {
          color ='#E97300'
          scale =1.5
        }
       
      const customSymbol: google.maps.Symbol = {
      path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z M12 11.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z', // simple triangle path
      fillColor: color,
      fillOpacity: 0.7,
      scale: scale,
      strokeColor: '#000000',
      strokeWeight: 1,
      anchor: customSymbol1
    };
        let marker = new google.maps.Marker({
          position: finalLatLng,
          icon: customSymbol,
          title: accident_title,
          map: map

        })

        const contentString =
          '<p><b style="color:blue">' +
          chargeBoxId +
          '</b><br/>Asset ID: ' +
          assetId+
          '<br/>Make: ' +
          makeName +
          '<br/>Model: ' +
          modelName +
          ''

        var infoWindow = new google.maps.InfoWindow({
          content: contentString,
        })

        marker.addListener('mouseover', () => {
          infoWindow.setContent(contentString)
          infoWindow.open(map, marker)
        })

        marker.addListener('mouseout', function () {
          infoWindow.close()
        })

        marker.addListener('click', () => {
          // if (accident_title == 'Faulted') {
          this._storageService.setSessionData('chargerBoxId', chargeBoxId)
          this._storageService.setSessionData('chargerName', chargeBoxId);
          let userRole=this._storageService.getLocalData('role')?.toLowerCase();
          if(userRole){
            this._router.navigate([`${userRole}/charger/chargers-diagnostic`]);
          }
          
          // }
          // infoWindow.setContent(contentString)
          
        })

        markers.push(marker)
      }
      new MarkerClusterer({map, markers,opt})
      MarkerClusterer.clearMarkers();
    }
    google.load('visualization', '1', { packages: ['corechart'] })
    google.setOnLoadCallback(initialize)
  }

  /**
   * Get Summary Status
   */
  getSummaryStatus() {
    this._dashboardService.GetSummaryStatus().subscribe((res) => {
      this.summaryStatus = res.data
    })
  }

  openDetailPage(
    event: any,
    graphHeading: string,
    pageHeading: string,
    duration: any,
    location: any,
  ) {
    sessionStorage.setItem('graphHeading', graphHeading)
    sessionStorage.setItem('pageHeading', pageHeading)
    sessionStorage.setItem('duration', duration)
    sessionStorage.setItem('locationId', location)

    this._router.navigate(['detail'], {
      relativeTo: this._route,
      queryParams: { id: event },
    })
    //this._router.navigate(['detail'],{relativeTo: this._route});
  }
  /**
   * Get Alllocations
   */

  getAllLocations() {
    this._dashboardService.GetAllLocations().subscribe((res) => {
      this.locationList = res.data
    })
  }

  /**
   * Set time to show
   */

  setTime(event: any) {
    if (event.value) {
      this.selectedTime = event.value
      this.getEnergyUsedByLocationId(
        this.selecteLocationIds,
        this.selectedTime,
        this.UserId,
      )
      this.getLocationPerforming(
        this.selecteLocationIds,
        this.selectedTime,
        this.UserId,
        this.toggleValue,
      )

      this.getChargerGraph(
        this.selecteLocationIds,
        this.selectedTime,
        this.UserId,
      )

      this.getChargingSessionChartData(
        this.selecteLocationIds,
        this.selectedTime,
        this.UserId,
      )
    }
  }
  /**
   *
   * @param locationIds
   * @param duration
   * @param operatorId
   * @param orderBy
   *
   * GET LOCATION PERFORMING DATA
   */

  getLocationPerforming(
    locationIds: any,
    duration: any,
    operatorId: any,
    orderBy: any,
  ) {
    const body = {
      locationIds: locationIds ? locationIds : [],
      duration: duration.toString(),
      opratorid: operatorId,
      orderby: orderBy,
    }

    this._dashboardService.GetLocationPerforming(body).subscribe((res) => {
      this.locationPerformingData = res.data
    })
  }

  /**
   * Emit Toggle event
   */
  changeToggleValue(event: any) {
    this.toggleValue = event
    this.getLocationPerforming(
      this.selecteLocationIds,
      this.selectedTime,
      this.UserId,
      this.toggleValue,
    )
  }
  /**
   *
   * @param locationIds
   * @param duration
   * @param operatorId
   *
   * ECALL ENERGY USED DATA
   */

  getEnergyUsedByLocationId(locationIds: any, duration: any, operatorId: any) {
    const body = {
      locationIds: locationIds ? locationIds : [],
      duration: duration.toString(),
      opratorid: operatorId,
    }
    this._dashboardService.GetEnergyUsedByLocationID(body).subscribe((res) => {
      this.energyUsedData = res.data
    })
  }

  /**
   *
   * @param event
   *  SELECT LOCATION
   */
  onSelectLocation(event: any) {
    let locationIds = this.locationIds.value

    this.selecteLocationIds = locationIds

    this.getEnergyUsedByLocationId(
      this.selecteLocationIds,
      this.selectedTime,
      this.UserId,
    )
    this.getLocationPerforming(
      this.selecteLocationIds,
      this.selectedTime,
      this.UserId,
      1,
    )
    this.getChargerGraph(
      this.selecteLocationIds,
      this.selectedTime,
      this.UserId,
    )

    this.getChargingSessionChartData(
      this.selecteLocationIds,
      this.selectedTime,
      this.UserId,
    )

    this.getChargerGraph(
      this.selecteLocationIds,
      this.selectedTime,
      this.UserId,
    )
  }

  /**
   * CHARGER GRAPH DATA
   */

  getChargerGraph(locationIds: any, duration: any, operatorId: any) {
    const body = {
      locationIds: locationIds ? locationIds : [],
      duration: duration.toString(),
      opratorid: operatorId,
    }
    this._dashboardService.getChargerChartData(body).subscribe({
      next: (response) => {
        this.chargersChartData = response.data
      },
      error: (err) => {
        console.log('no response for chargers graph')
      },
    })
  }

  /**
   *
   * @param locationIds
   * @param duration
   * @param operatorId
   *
   *  CHARGING SESSION DATA
   */
  getChargingSessionChartData(
    locationIds: any,
    duration: any,
    operatorId: any,
  ) {
    const body = {
      locationIds: locationIds ? locationIds : [],
      duration: duration.toString(),
      opratorid: operatorId,
    }
    this._dashboardService.GetAreachartdataData(body).subscribe((res) => {
      this.chargingSessionData = res.data
    })
  }
  /**
   *
   * @param locationIds
   * @param operatorId
   * GET MAP LOCATIONS
   */

  getMapLocations(locationIds: any, operatorId: any) {
    const body = {
      locationIds: locationIds ? locationIds : [],
      chargeBoxId: '',
      opratorid: operatorId,
    }
    this._dashboardService.GetMap(body).subscribe((res) => {
      this.mapstatusdata = res.data
      this.initMapFunc()
    })
  }
  /**
   * Tooltip for legends show description
   */

  showLegendsInfo() {
    const dialogRef = this.dialog.open(LegendsDialogComponent, {
      // width: '30%',
      autoFocus: false,
      // height: '600px',
      panelClass: 'my-dialog-container-class2',
      // data: { id: id },
    })
    dialogRef.afterClosed().subscribe((result) => {})
  }
}