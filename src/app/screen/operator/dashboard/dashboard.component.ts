import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { AuthService } from 'src/app/service/auth/auth.service'
import { StorageService } from 'src/app/service/storage.service'
import { DashboardService } from './dashboard.service'
import { data } from './locations'
import { ToastrService } from 'ngx-toastr'
declare const google: any
declare const MarkerClusterer: any

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  myparams: any
  locations = '../../../assets/widget-icon/location.png'
  chargers = '../../../assets/widget-icon/chargers.png'
  charging_session = '../../../assets/widget-icon/charging-sessions.png'
  errors = '../../../assets/widget-icon/erorrs.png'

  basic = 'basic'
  bar = 'bar'
  barTitle = 'Chargers'

  locationPerformingData = ''
  dashboardlocationPerform = 'dashboardlocationPerform'
  locationPerormTitle = 'Locations Performing '

  energyUsedData = ''
  dashboardEnergyUsed = 'dashboardEnergyUsed'
  dashboardEnergyUsedTitle = 'Energy Demand Over Time'

  locationList: any

  location_list: any
  summaryStatus = []

  locationIds = new FormControl([])
  filterToggle = new FormControl('1')

  selectedTime: number = 1
  selecteLocationIds = ''
  UserId: any
  chargersChartData = ''
  locationsPerReq: any // niharika
  energyUsedReq: any // niharika
  chargersGraphReq: any // niharika

  /**
   * declare variables for charging session
   */

  chargingSessionData = ''
  dashboardChargingSession = 'dashboardChargingSession'
  dashboardChargingSessionTitle = 'Charging Session'

  mapstatusdata: any
  initMapFunc: any
  toggleValue: number = 1

  constructor(
    private _dashboardService: DashboardService,
    private _storageService: StorageService,
    private _router: Router,
    private _route: ActivatedRoute,
    private toastr: ToastrService,
  ) {
    this.UserId = this._storageService.getLocalData('user_id')
  }

  ngOnInit(): void {
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
    /* 
    // FORK JOIN CODE
    this.locationsPerReq = {
      locationIds: this.selecteLocationIds ? this.selecteLocationIds : [],
      duration: this.selectedTime.toString(),
      opratorid: this.UserId,
      orderby: 1,
    }

   this.energyUsedReq = {
    locationIds: this.selecteLocationIds ? this.selecteLocationIds : [],
    duration: this.selectedTime.toString(),
    opratorid: this.UserId,
    }

    this.chargersGraphReq =  {
      locationIds: this.selecteLocationIds ? this.selecteLocationIds : [],
      duration: this.selectedTime.toString(),
      opratorid: this.UserId,
    }
   
      this._dashboardService.requestDataFromMultipleSources(this.locationsPerReq,this.energyUsedReq,this.chargersGraphReq).subscribe({
        next: (responseList) => {
          
          
          this.summaryStatus = responseList[0].data
          this.locationPerformingData = responseList[1].data
          this.energyUsedData = responseList[2].data
          this.chargersChartData = responseList[3]
        },
        error: (err) => {
         
        }
      });
  */
  }

  /**
   * Initializes the map
   */

  initMap() {
    // let latlng=new google.maps.LatLng(-34.397, 150.644);
    // this.map = new google.maps.Map(document.getElementById('map') as any, {
    //   center: latlng,
    //   zoom: 5,
    // });

    const initialize = () => {
      var center = new google.maps.LatLng(36.2082629, -113.737393)
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: center,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
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
          Available: '#18A558',
          Unavailable: '#FFA12D',
          Offline: '#757575',
          Busy: '#e97300',
          Occupied: '#000C66',
          Faulted: '#ea002a',
          'EV Disconnected': '#a7360e',
        },
      }

      var markers = []
      for (var i = 0; i < this.mapstatusdata.length; i++) {
        //var accident_injuries = this.mapstatusdata[i].charger[0]
        var accident_title = this.mapstatusdata[i].status
        // var accident_lnglat = this.mapstatusdata[i].coordinates
        // switch (Number(accident_injuries)) {
        //   case 1:
        //     accident_title = 'Available'
        //     break
        //   case 3:
        //     accident_title = 'Unavailable'
        //     break
        //   case 2:
        //     accident_title = 'Offline'
        //     break
        //   case 5:
        //     accident_title = 'Busy'
        //     break
        //   case 4:
        //     accident_title = 'Occupied'
        //     break
        //   case 6:
        //     accident_title = 'Faulted'
        //     break
        //   case 7:
        //     accident_title = 'EV Disconnected'
        //     break
        // }
        //debugger
        var accident_LatLng = new google.maps.LatLng(
          this.mapstatusdata[i].latitude,
          this.mapstatusdata[i].longitude,
        )

        const info =
          '<div id="content">' +
          '<div id="siteNotice">' +
          '</div>' +
          '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
          '<div id="bodyContent">' +
          '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
          'sandstone rock formation in the southern part of the ' +
          'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
          'south west of the nearest large town, Alice Springs; 450&#160;km ' +
          '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
          'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
          'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
          'Aboriginal people of the area. It has many springs, waterholes, ' +
          'rock caves and ancient paintings. Uluru is listed as a World ' +
          'Heritage Site.</p>' +
          '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
          'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
          '(last visited June 22, 2009).</p>' +
          '</div>' +
          '</div>'

        var infoWindow = new google.maps.InfoWindow({
          content:
            '<p><b style="color:blue">' +
            accident_LatLng +
            '</b><br/>Status:' +
            accident_title +
            '',
        })
        var marker = new google.maps.Marker({
          position: accident_LatLng,
          title: accident_title,
          clickable: true,
        })

        // google.maps.event.addEventListener(marker, 'click', function () {
        //   console.log('test')
        // })

        // google.maps.event.addListener(marker, 'click', function () {
        //   console.log('hello ')

        //   return function () {
        //     var content = ['jhello']
        //     infoWindow.setContent(content)
        //     infoWindow.open(map, marker)
        //   }
        infoWindow.open(map, marker)
        // })

        // google.maps.event.addListener(marker, 'click', function () {
        //   infoWindow.open({
        //     map,
        //     // shouldFocus: false,\
        //     marker,
        //   })
        // })

        // new google.maps.event.addListener(marker, 'click', function () {
        //   infoWindow.open(map, marker)
        // })

        markers.push(marker)
      }

      var markerCluster = new MarkerClusterer(map, markers, opt)
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

  openDetailPage(event: any, graphHeading: string, pageHeading: string) {
    sessionStorage.setItem('graphHeading', graphHeading)
    sessionStorage.setItem('pageHeading', pageHeading)
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
   * Get Location performing data
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
      // console.log(
      //   'loactions performing api on dashboard for location' + locationIds,
      //   res.data.length,
      // )
      this.locationPerformingData = res.data
    })
  }

  /**
   * Get Location area data
   */

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
   * Get Energy Used data
   */

  getEnergyUsedByLocationId(locationIds: any, duration: any, operatorId: any) {
    const body = {
      locationIds: locationIds ? locationIds : [],
      duration: duration.toString(),
      opratorid: operatorId,
    }
    this._dashboardService.GetEnergyUsedByLocationID(body).subscribe((res) => {
      // console.log(
      //   'energy used api on dashboard for location' + locationIds,
      //   res.data.length,
      // )
      this.energyUsedData = res.data
    })
  }

  /**
   *
   * @param event
   *
   * select location data
   */
  onSelectLocation(event: any) {
    // if (!event.isUserInput) {
    //   return
    // }

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
   * Get Charger Graph
   */

  getChargerGraph(locationIds: any, duration: any, operatorId: any) {
    const body = {
      locationIds: locationIds ? locationIds : [],
      duration: duration.toString(),
      opratorid: operatorId,
    }
    this._dashboardService.getChargerChartData(body).subscribe({
      next: (response) => {
        // console.log(
        //   'chargers api on dashboard for location' + locationIds,
        //   response.data.length,
        // )
        this.chargersChartData = response
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
   * Get charging session data
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
      // console.log(
      //   'charging session graph on dashboard for location' + locationIds,
      //   res.data.length,
      // )
      this.chargingSessionData = res.data
    })
  }

  getMapLocations(locationIds: any, operatorId: any) {
    const body = {
      locationIds: locationIds ? locationIds : [],
      opratorid: operatorId,
    }
    this._dashboardService.GetMap(body).subscribe((res) => {
      this.mapstatusdata = res.data
      this.initMapFunc()
    })
  }
}
