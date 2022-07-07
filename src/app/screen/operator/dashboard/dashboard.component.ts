import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { AuthService } from 'src/app/service/auth/auth.service'
import { data } from './locations'

declare const google: any
declare const MarkerClusterer: any
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private _auth: AuthService) {}

  locations = '../../../assets/widget-icon/location.png'
  chargers = '../../../assets/widget-icon/chargers.png'
  charging_session = '../../../assets/widget-icon/charging-sessions.png'
  errors = '../../../assets/widget-icon/erorrs.png'

  basic = 'basic'
  bar = 'bar'
  barTitle = 'Chargers'
  basicTitle = 'Locations Performing '
  // toggle: boolean = false

  alteration_types = [
    'Location A',
    'Location B',
    'Location C',
    'Location D',
    'Location E',
  ]
  type_list: any

  type_lists = new FormControl('')

  data = [
    {
      Type: 'Locations',
      Count: 50,
      StatusData: [
        {
          Key: 'Commissioned',
          Color: '#757575',
          value: 20,
        },
        {
          Key: 'Under Maintenance',
          Color: '#E97300',
          value: 25,
        },
        {
          Key: 'Upcoming',
          Color: '#0062A6',
          value: 15,
        },
      ],
    },
    {
      Type: 'Chargers',
      Count: 35,
      StatusData: [
        {
          Key: 'Available',
          Color: '#90993F',
          value: 10,
        },
        {
          Key: 'Connected',
          Color: '#E97300',
          value: 16,
        },
        {
          Key: 'Offline',
          Color: '#757575',
          value: 10,
        },
      ],
    },
    {
      Type: 'Charging Sessions',
      Count: 26,
      StatusData: [
        {
          Key: 'Cancelled',
          Color: '#EA002A',
          value: 15,
        },
        {
          Key: 'Interrupted',
          Color: '#E97300',
          value: 15,
        },
        {
          Key: 'Completed',
          Color: '#90993F',
          value: 15,
        },
      ],
    },
    {
      Type: 'Errors',
      Count: 10,
      StatusData: [
        {
          Key: 'Critical',
          Color: '#E97300',
          value: 10,
        },
        {
          Key: 'High',
          Color: '#EA002A',
          value: 13,
        },
        {
          Key: 'Medium',
          Color: '#0062A6',
          value: 12,
        },
      ],
    },
  ]

  ngOnInit(): void {
    ;(window as any).initMap = this.initMap as any
    const initMapFunc = (window as any).initMap.bind(this)
    initMapFunc()
    // this.setMarker(locations);
    // this.handleEventListenerFromMarker();
  }

  initMap() {
    // let latlng=new google.maps.LatLng(-34.397, 150.644);
    // this.map = new google.maps.Map(document.getElementById('map') as any, {
    //   center: latlng,
    //   zoom: 5,
    // });

    function initialize() {
      var center = new google.maps.LatLng(59.9214, 10.8463)

      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
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
      for (var i = 0; i < data.features.length; i++) {
        var accident_injuries = data.features[i].properties['5074']
        var accident_title = ''
        var accident_lnglat = data.features[i].geometry['coordinates']
        switch (Number(accident_injuries)) {
          case 1:
            accident_title = 'Available'
            break
          case 3:
            accident_title = 'Unavailable'
            break
          case 2:
            accident_title = 'Offline'
            break
          case 5:
            accident_title = 'Busy'
            break
          case 4:
            accident_title = 'Occupied'
            break
          case 6:
            accident_title = 'Faulted'
            break
          case 7:
            accident_title = 'EV Disconnected'
            break
        }
        var accident_LatLng = new google.maps.LatLng(
          Number(accident_lnglat[1]),
          Number(accident_lnglat[0]),
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
}
