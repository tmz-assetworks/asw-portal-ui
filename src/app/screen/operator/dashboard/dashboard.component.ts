import { Component, OnInit } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { StorageService } from 'src/app/service/storage.service'
import { DashboardService } from './dashboard.service'
import { ToastrService } from 'ngx-toastr'
import { MatDialog } from '@angular/material/dialog'
import { LegendsDialogComponent } from 'src/app/component/dashboard/legends-dialog/legends-dialog.component'
import { AreaChartComponent } from 'src/app/component/dashboard/area-chart/area-chart.component'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'
import { CommonModule } from '@angular/common'
import { LineChartComponent } from 'src/app/component/dashboard/line-chart/line-chart.component'
import { WidgetComponent } from 'src/app/component/dashboard/widget/widget.component'
import { BarChartComponent } from 'src/app/component/dashboard/bar-chart/bar-chart.component'
import { DashboardStatusPanelComponent } from './dashboard-status-panel/dashboard-status-panel.component'
declare const google: any
declare const MarkerClusterer: any

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports:[
    CommonModule,
    AreaChartComponent,
    BarChartComponent,
    LineChartComponent,
    SharedMaterialModule,
    ReactiveFormsModule,
    WidgetComponent,
    DashboardStatusPanelComponent
  ]
})
export class DashboardComponent implements OnInit {
  locations = '../../../../assets/Operator/Location-Icons.svg'
  chargers = '../../../../assets/Operator/Chargers.svg'
  charging_session = '../../../../assets/Operator/Charger-Seesion.svg'
  errors = '../../../../assets/Operator/Error.svg'
  costData = ''

  locationPerformingData = ''
  energyUsedData = ''
  locationList: any
  summaryStatus:string[] = []

  locationIds = new FormControl([])
  filterToggle = new FormControl('90')

  selectedTime: number = 90
  selecteLocationIds:any = ''
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
    private readonly _dashboardService: DashboardService,
    private readonly _storageService: StorageService,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly  toastr: ToastrService,
    public readonly dialog: MatDialog,
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
    this.getSummaryStatus();
    (globalThis as any).initMap = this.initMap as any
    this.initMapFunc = (globalThis as any).initMap.bind(this)


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

     this.getReportTransaction(
      this.UserId, 
      this.selecteLocationIds, 
      this.selectedTime,
    )
  }
   

  /**
   * Initializes the map
   */

  initMap() {
    const initialize = () => {
       // Default fallback center (if no data)
    let centerLat = 36.2082629;
    let centerLng = -113.737393;

 if (this.mapstatusdata && this.mapstatusdata.length > 0) {
  const target = this.mapstatusdata.find(
    ((item:any) =>
      item.locationName !== 'NewChargers' &&
      item.latitude &&
      item.longitude
  ));

  if (target) {
    centerLat = Number(target.latitude);
    centerLng = Number(target.longitude);
  } else {
    console.warn('No valid location found with coordinates other than "NewChargers"');
  }
}
    
    const center = new google.maps.LatLng(centerLat, centerLng);
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: center,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
      })

      let opt:any = {
        legend: {
          Available: '#90993F',
          Offline: '#ea002a',
          Occupied: '#000C66',
          Faulted: '#757575',
          Busy: '#E97300',
          'EV Disconnected': '#0000FF',
          Reserved: '#675553',
          Unavailable: '#FFE333',
        },
        styles: [{ width:80, height: 80}],
      }

      let markers = []
      for (const data of this.mapstatusdata) {
        const accident_title = data.status
        const chargeBoxId = data.chargeBoxid
        const assetId = data.assetId
        const makeName = data.makeName
        const modelName = data.modelName
        const accident_LatLng = new google.maps.LatLng(
          data.latitude,  
          data.longitude,
        )
        let newLat = accident_LatLng.lat() //+ (Math.random() - 0.5) / 1500 // * (Math.random() * (max - min) + min);
        let newLng = accident_LatLng.lng() //+ (Math.random() - 0.5) / 1500 // * (Math.random() * (max - min) + min);
        let finalLatLng = new google.maps.LatLng(newLat, newLng)

        let marker = new google.maps.Marker({
          position: finalLatLng,
          title: accident_title,
          map: map

        })

        const contentString =
            '<p><b style="color:blue">' + chargeBoxId +
            '</b><br/>Asset ID: ' + assetId +
            '<br/>Make: ' + makeName +
            '<br/>Model: ' + modelName +
            (data.isAutoGenerated ? '<br/><span style="color:red">Auto-generated coordinates</span>' : '') +
            '</p>';

        let infoWindow = new google.maps.InfoWindow({
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
          this._storageService.setSessionData('chargerBoxId', chargeBoxId)
          this._storageService.setSessionData('chargerName', chargeBoxId);
          let userRole=this._storageService.getLocalData('role')?.toLowerCase();
          if(userRole){
            this._router.navigate([`${userRole}/charger/chargers-diagnostic`]);
          }
        })
        markers.push(marker)
      }
     
    // NOSONAR - MarkerClusterer is instantiated for clustering side effects
     new MarkerClusterer(map, markers,opt) // NOSONAR
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

    this.getReportTransaction(
      this.UserId,
      this.selecteLocationIds,
      this.selectedTime
    )
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
      locationIds: (locationIds?.length ? locationIds : []),
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
      this.selectedTime.toString(),
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
      locationIds: (locationIds?.length ? locationIds : []),
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

    this.getReportTransaction(
      this.UserId,
      this.selecteLocationIds,
      this.selectedTime
    )
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
      locationIds: (locationIds?.length ? locationIds : []),
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
      locationIds: (locationIds?.length ? locationIds : []),
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
      locationIds: (locationIds?.length ? locationIds : []), 
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

    getReportTransaction(userId: any, locationIds: any, duration: any) {
    const pBbody = {
      operatorId: userId,
      locationId: (locationIds?.length ? locationIds : []),
      duration: duration.toString(),
    };
    
    this._dashboardService.GetTransaction(pBbody).subscribe((res: any) => {
      if (res.data) {
        this.costData = res.data[0].monthlydata 
      }
    })
  }
  
  
   openReportDetailPage(
    event: any,
    graphHeading: string,
    pageHeading: string,
    duration: any,
  ) {
      sessionStorage.setItem('graphHeading', graphHeading)
      sessionStorage.setItem('pageHeading', pageHeading)
      sessionStorage.setItem('duration', duration)
      this._router.navigateByUrl('admin/reports/report-transaction/report-detail?id=4')
  }  
}