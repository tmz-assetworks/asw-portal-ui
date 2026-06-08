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
import { GoogleMapsLoaderService } from 'src/app/services/google-maps-loader.service';
import { MarkerClusterer, Cluster, Renderer } from '@googlemaps/markerclusterer';
declare const google: any

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
  locations = '../../../../assets/icons/Location-Icons.svg'
  chargers = '../../../../assets/icons/Chargers.svg'
  charging_session = '../../../../assets/icons/Charger-Seesion.svg'
  errors = '../../../../assets/icons/Error.svg'
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
  userRole: string = '';
  private readonly clusterer?: MarkerClusterer;
  constructor(
    private readonly _dashboardService: DashboardService,
    private readonly _storageService: StorageService,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly  toastr: ToastrService,
    public readonly dialog: MatDialog,
    private readonly mapsLoader: GoogleMapsLoaderService 
  ) {
    this.UserId = this._storageService.getLocalData('user_id')
    // Get user role from local storage and set dynamic URLs
    this.userRole = this._storageService.getLocalData('role')?.toLowerCase();
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

  initMap(): void {
  const initialize = (): void => {
    let centerLat = 36.2082629;
    let centerLng = -113.737393;
    if (this.mapstatusdata?.length > 0) {
      const target = this.mapstatusdata.find(
        (item: any) =>
          item.locationName !== 'NewChargers' &&
          item.latitude &&
          item.longitude
      );
      if (target) {
        centerLat = Number(target.latitude);
        centerLng = Number(target.longitude);
      } 
      else {
        console.warn( 'No valid location found with coordinates other than "NewChargers"' );
      }
    }

    const map = new google.maps.Map(
      document.getElementById('map'),
      {
        zoom: 5,
        center: new google.maps.LatLng(centerLat, centerLng),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false
      }
    );

    const statusColors: Record<string, string> = {
      Available: '#90993F',
      Offline: '#ea002a',
      Occupied: '#000C66',
      Faulted: '#757575',
      Busy: '#E97300',
      'EV Disconnected': '#0000FF',
      Reserved: '#675553',
      Unavailable: '#FFE333',
      BusySE: '#3366cc',
    };

    const markers: (google.maps.Marker & { chargerStatus?: string })[] = [];
    for (const data of this.mapstatusdata) {
      if (!data.latitude || !data.longitude) {
        continue;
      }
  const marker = new google.maps.Marker({
    position: new google.maps.LatLng(
    Number(data.latitude),
    Number(data.longitude)
  ),
  title: data.status,
  map,
  icon: {
    path:
      'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z',
    fillColor: statusColors[data.status] ?? '#ea002a',
    fillOpacity: 1,
    strokeColor: '#ffffff',
    strokeWeight: 1,
    scale: 1.5,
    anchor: new google.maps.Point(12, 22)
  }
});

(marker as google.maps.Marker & { chargerStatus?: string }).chargerStatus = data.status;

      const contentString =
        `<p>
          <b style="color:blue">${data.chargeBoxid}</b>
          <br/>Asset ID: ${data.assetId}
          <br/>Make: ${data.makeName}
          <br/>Model: ${data.modelName}
          ${
            data.isAutoGenerated
              ? '<br/><span style="color:red">Auto-generated coordinates</span>'
              : ''
          }</p>`;

      const infoWindow = new google.maps.InfoWindow({
        content: contentString
      });

      marker.addListener('mouseover', () => {
        infoWindow.open(map, marker);
      });

      marker.addListener('mouseout', () => {
        infoWindow.close();
      });

      marker.addListener('click', () => {
        this._storageService.setSessionData(
          'chargerBoxId',
          data.chargeBoxid
        );

        this._storageService.setSessionData(
          'chargerName',
          data.chargeBoxid
        );

        const userRole =
          this._storageService.getLocalData('role')?.toLowerCase();

        if (userRole) {
          this._router.navigate([
            `${userRole}/charger/chargers-diagnostic`
          ]);
        }
      });

      markers.push(marker);
    }

const customRenderer: Renderer = {
  render: (cluster: Cluster): google.maps.Marker => {
    const markersInCluster = (cluster as any).markers ?? [];
    const counts: Record<string, number> = {
      Available: 0,
      Offline: 0,
      Occupied: 0,
      Faulted: 0,
      Busy: 0,
      BusySE: 0,
      'EV Disconnected': 0,
      Reserved: 0,
      Unavailable: 0
    };
    markersInCluster.forEach((marker: google.maps.Marker & { chargerStatus?: string }) => {
      const status = marker.chargerStatus;
      if (counts[status] !== undefined) {
        counts[status]++;
      }
    });

    const total = markersInCluster.length;
    const segments: string[] = [];
    let start = 0;
    Object.entries(counts).forEach(([status, value]) => {
      if (!value) {
        return;
      }
      const percentage = value / total;
      const end = start + percentage;
      if (percentage >= 0.999) {
        segments.push(` <circle cx="50" cy="50" r="45" fill="${statusColors[status]}" />`);
        start = end;
        return;
      }
      const x1 = Math.cos(2 * Math.PI * start);
      const y1 = Math.sin(2 * Math.PI * start);
      const x2 = Math.cos(2 * Math.PI * end);
      const y2 = Math.sin(2 * Math.PI * end);
      const largeArc = percentage > 0.5 ? 1 : 0;

      segments.push(`
        <path
          d="
            M 50 50
            L ${50 + x1 * 45} ${50 + y1 * 45}
            A 45 45 0 ${largeArc} 1
            ${50 + x2 * 45} ${50 + y2 * 45}
            Z"
          fill="${statusColors[status]}"
        />
      `);
      start = end;
    });

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg"
           width="80"
           height="80"
           viewBox="0 0 100 100">
        ${segments.join('')}
        <circle
          cx="50"
          cy="50"
          r="18"
          fill="#ffffff"
        />

        <text
          x="50"
          y="56"
          text-anchor="middle"
          font-size="20"
          font-weight="bold"
          fill="#000000">
          ${cluster.count}
        </text>
      </svg>`;

     const clusterMarker = new google.maps.Marker({
       position: cluster.position,
       icon: {
        url:
          'data:image/svg+xml;charset=UTF-8,' +
          encodeURIComponent(svg),
        scaledSize: new google.maps.Size(60, 60)
      }
    });

    // Cluster Hover Tooltip
    const infoWindow = new google.maps.InfoWindow({
      content: this.getClusterTooltip(
        markersInCluster,
        statusColors
      )
    });

    clusterMarker.addListener('click', () => {
      map.panTo(cluster.position);
      map.setZoom(
        Math.min(
          (map.getZoom() ?? 5) + 1,
          18
        )
      );
    });

    clusterMarker.addListener('mouseover', () => {
          infoWindow.open({
          anchor: clusterMarker, map
         });
      });

    clusterMarker.addListener('mouseout', () => {
        infoWindow.close(); });
        return clusterMarker;
    }};
    // Official Google MarkerClusterer
    const markerClusterer = new MarkerClusterer({
      map,
      markers,
      renderer: customRenderer
    });
    // Add Legend
    const legendDiv = document.createElement('div');
    legendDiv.style.cssText = 'margin-right:5px;background:#fff;padding:10px;width:150px';
    Object.entries(statusColors).forEach(([title, color]) => {
      const row = document.createElement('div');
      row.style.marginBottom = '6px';
      row.innerHTML = ` <span style=" display:inline-block; width:12px; height:12px; background:${color}; 
                        margin-right:8px;"></span>${title}`;
      legendDiv.appendChild(row);
    });
    map.controls[ google.maps.ControlPosition.RIGHT_TOP ].push(legendDiv); };
    google.load('visualization', '1', {packages: ['corechart']});
    google.setOnLoadCallback(initialize);
}


private getClusterTooltip( markersInCluster: any[], statusColors: Record<string, string> ): string {
  const counts: Record<string, number> = {};
  markersInCluster.forEach((marker: google.maps.Marker & { chargerStatus?: string }) => {
    const status = marker.chargerStatus ?? 'Unknown';
    counts[status] = (counts[status] ?? 0) + 1;
  });
  let html = `
    <div style="min-width:180px">
      <div style="font-weight:bold;margin-bottom:8px">
        Total Chargers: ${markersInCluster.length}
      </div> `;

  Object.entries(counts).forEach(([status, count]) => {
    const color = statusColors[status] ?? '#999999';
    html += `
      <div style="margin-bottom:4px">
        <span
          style="
            display:inline-block;
            width:10px;
            height:10px;
            border-radius:50%;
            background:${color};
            margin-right:6px;
          ">
        </span>
        ${status}: <strong>${count}</strong>
      </div>`;
  });
  html += '</div>';
  return html;
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
    
    this.mapsLoader.load()
    .then(() => {
      this._dashboardService.GetMap(body).subscribe((res) => {
        this.mapstatusdata = res.data;
        this.initMap();  // call directly after script loaded
      });
    })
    .catch(err => console.error('Google Maps failed to load', err));


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