import { Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { Router } from '@angular/router'
import { EChartsOption } from 'echarts'
import { AuthService } from 'src/app/service/auth/auth.service'

@Component({
  selector: 'app-charger-inner',
  templateUrl: './charger-inner.component.html',
  styleUrls: ['./charger-inner.component.scss'],
})
export class ChargerInnerComponent implements OnInit {
  isTableHasData = false

  @ViewChild(MatPaginator) paginator!: MatPaginator

  displayedColumns: string[] = [
    'locationName',
    'chargerBoxId',
    'chargertype',
    'faultisince',
    'locationcontactname',
    'timereported',
    'locationid',
    'state',
    'locationcontactnumber',
    'action',
  ]
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA)

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    this.paginator._intl.itemsPerPageLabel = 'Rows per page'
  }

  viewCharger() {
    this._router.navigate(['operator/charger/chargers-analytics'])
  }

  option: EChartsOption = {
    // legend: {
    //   data: ['Total Revenue', 'Daily Revenue', 'Today Revenue'],
    // },
    // xAxis: {
    //   type: 'category',
    //   data: ['990.71', '412.14', '408.07'],
    // },

    // yAxis: {
    //   type: 'value',
    //   show: false,
    // },
    // series: [
    //   {
    //     data: [
    //       {
    //         name: 'Total Revenue',
    //         value: 200,
    //         itemStyle: {
    //           color: '#90993F',
    //         },
    //       },
    //       {
    //         name: 'Daily Revenue',
    //         value: 150,
    //         itemStyle: {
    //           color: '#E97300',
    //         },
    //       },
    //       {
    //         name: 'Today Revenue',
    //         value: 100,
    //         itemStyle: {
    //           color: '#0062A6',
    //         },
    //       },
    //     ],
    //     type: 'bar',
    //   },
    // ],
    // series: [
    //   { name: 'Total Revenue', data: [990.71], type: 'bar' },
    //   { name: 'Daily Revenue', data: [412.14], type: 'bar' },
    //   { name: 'Today Revenue', data: [408.07], type: 'bar' },
    // ],

    tooltip: {
      trigger: 'axis',
      position: ['15%', '20%'],
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: ['Total Revenue', 'Daily Revenue', 'Today Revenue'],
      icon: 'circle',
      right: 10,
      top: 'bottom',
    },
    grid: {
      left: '0%',
      right: '8%',
      bottom: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: ['990.71', '412.14', '408.07'],
      // data: (function () {
      //   let list = [];
      //   for (let i = 1; i <= 11; i++) {
      //     list.push('Nov ' + i);
      //   }
      //   return list;
      // })()
      // axisLabel: {
      //   rotate: 30,
      // },
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        name: 'Placeholder',
        type: 'bar',
        stack: 'Total',
        itemStyle: {
          borderColor: 'transparent',
          color: 'transparent',
        },
        emphasis: {
          itemStyle: {
            borderColor: 'transparent',
            color: 'transparent',
          },
        },
        // data: [0, 900, 1245, 1530, 1376, 1376, 1511, 1689, 1856, 1495, 1292]
      },
      {
        name: 'Total Revenue',
        type: 'bar',
        stack: 'Total',
        itemStyle: {
          color: '#90993F',
        },
        data: [990.71, '-', '-'],
      },
      {
        name: 'Daily Revenue',
        type: 'bar',
        stack: 'Total',
        itemStyle: {
          color: '#E97300',
        },
        data: ['-', 412.14, '-'],
      },
      {
        name: 'Today Revenue',
        type: 'bar',
        stack: 'Total',
        itemStyle: {
          color: '#0062A6',
        },
        data: ['-', '-', 408.07],
      },
    ],
  }

  locations = '../../../assets/widget-icon/location.png'
  chargers = '../../../assets/widget-icon/chargers.png'
  charging_session = '../../../assets/widget-icon/charging-sessions.png'
  errors = '../../../assets/widget-icon/erorrs.png'

  basic = 'basic'
  basicStatus = 'basicStatus'
  bar = 'chargerBar'
  barTitle = 'Chargers in Use'
  locationStatusTitle = 'Location Status'
  locationPerormTitle = 'Location  Performing '

  chargerArea = 'chargerArea'
  chargerAreaTitle = 'Chargin Sessions'
  chargingSessionData = ''

  data = [
    // {
    //   Type: 'Locations',
    //   Count: 50,
    //   StatusData: [
    //     {
    //       Key: 'Commissioned',
    //       Color: '#757575',
    //       value: 20,
    //     },
    //     {
    //       Key: 'Under Maintenance',
    //       Color: '#E97300',
    //       value: 25,
    //     },
    //     {
    //       Key: 'Upcoming',
    //       Color: '#0062A6',
    //       value: 5,
    //     },
    //   ],
    // },
    {
      type: 'Chargers',
      count: 35,
      statusData: [
        {
          key: 'Available',
          color: '#90993F',
          value: 10,
        },
        {
          key: 'Connected',
          color: '#E97300',
          value: 6,
        },
        {
          key: 'Offline',
          color: '#757575',
          value: 10,
        },
      ],
    },
    {
      type: 'Charging Sessions',
      count: 26,
      statusData: [
        {
          key: 'Cancelled',
          color: '#EA002A',
          value: 15,
        },
        {
          key: 'Interrupted',
          color: '#E97300',
          value: 15,
        },
        {
          key: 'Completed',
          color: '#90993F',
          value: 5,
        },
      ],
    },
    {
      type: 'Errors',
      count: 10,
      statusData: [
        {
          key: 'Critical',
          color: '#E97300',
          value: 5,
        },
        {
          key: 'High',
          color: '#EA002A',
          value: 3,
        },
        {
          key: 'Medium',
          color: '#0062A6',
          value: 2,
        },
      ],
    },
  ]
  constructor(private _router: Router, private _auth: AuthService) {}

  ngOnInit(): void {
    // alert('chargers');
    // this._auth.tokenExpired()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
    if (this.dataSource.filteredData.length > 0) {
      this.isTableHasData = false
    } else {
      this.isTableHasData = true
    }
  }
}

export interface PeriodicElement {
  locationName: string
  chargerBoxId: string
  chargertype: string
  faultisince: string
  locationcontactname: string
  timereported: string
  locationid: string
  state: string
  locationcontactnumber: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    locationName: 'Fast Speed Charger',
    chargerBoxId: 'SITEWIT001',
    chargertype: 'Connector ',
    faultisince: '1 Day 1 hr',
    locationcontactname: 'Brooklyn',
    timereported: '20-04-21 12:30',
    locationid: 'WIT202101021234',
    state: 'New York',
    locationcontactnumber: '+1-202-5555-0192',
  },
  {
    locationName: 'Fast Speed Charger',
    chargerBoxId: 'SITEWIT001',
    chargertype: 'Connector ',
    faultisince: '1 Day 1 hr',
    locationcontactname: 'Brooklyn',
    timereported: '20-04-21 12:30',
    locationid: 'WIT202101021234',
    state: 'New York',
    locationcontactnumber: '+1-202-5555-0192',
  },
  {
    locationName: 'Fast Speed Charger',
    chargerBoxId: 'SITEWIT001',
    chargertype: 'Connector ',
    faultisince: '1 Day 1 hr',
    locationcontactname: 'Brooklyn',
    timereported: '20-04-21 12:30',
    locationid: 'WIT202101021234',
    state: 'New York',
    locationcontactnumber: '+1-202-5555-0192',
  },
  {
    locationName: 'Fast Speed Charger',
    chargerBoxId: 'SITEWIT001',
    chargertype: 'Connector ',
    faultisince: '1 Day 1 hr',
    locationcontactname: 'Brooklyn',
    timereported: '20-04-21 12:30',
    locationid: 'WIT202101021234',
    state: 'New York',
    locationcontactnumber: '+1-202-5555-0192',
  },
  {
    locationName: 'Fast Speed Charger',
    chargerBoxId: 'SITEWIT001',
    chargertype: 'Connector ',
    faultisince: '1 Day 1 hr',
    locationcontactname: 'Brooklyn',
    timereported: '20-04-21 12:30',
    locationid: 'WIT202101021234',
    state: 'New York',
    locationcontactnumber: '+1-202-5555-0192',
  },
  {
    locationName: 'Fast Speed Charger',
    chargerBoxId: 'SITEWIT001',
    chargertype: 'Connector ',
    faultisince: '1 Day 1 hr',
    locationcontactname: 'Brooklyn',
    timereported: '20-04-21 12:30',
    locationid: 'WIT202101021234',
    state: 'New York',
    locationcontactnumber: '+1-202-5555-0192',
  },
  {
    locationName: 'Fast Speed Charger',
    chargerBoxId: 'SITEWIT001',
    chargertype: 'Connector ',
    faultisince: '1 Day 1 hr',
    locationcontactname: 'Brooklyn',
    timereported: '20-04-21 12:30',
    locationid: 'WIT202101021234',
    state: 'New York',
    locationcontactnumber: '+1-202-5555-0192',
  },
  {
    locationName: 'Fast Speed Charger',
    chargerBoxId: 'SITEWIT001',
    chargertype: 'Connector ',
    faultisince: '1 Day 1 hr',
    locationcontactname: 'Brooklyn',
    timereported: '20-04-21 12:30',
    locationid: 'WIT202101021234',
    state: 'New York',
    locationcontactnumber: '+1-202-5555-0192',
  },
  {
    locationName: 'Fast Speed Charger',
    chargerBoxId: 'SITEWIT001',
    chargertype: 'Connector ',
    faultisince: '1 Day 1 hr',
    locationcontactname: 'Brooklyn',
    timereported: '20-04-21 12:30',
    locationid: 'WIT202101021234',
    state: 'New York',
    locationcontactnumber: '+1-202-5555-0192',
  },
  {
    locationName: 'Fast Speed Charger',
    chargerBoxId: 'SITEWIT001',
    chargertype: 'Connector ',
    faultisince: '1 Day 1 hr',
    locationcontactname: 'Brooklyn',
    timereported: '20-04-21 12:30',
    locationid: 'WIT202101021234',
    state: 'New York',
    locationcontactnumber: '+1-202-5555-0192',
  },
  {
    locationName: 'Fast Speed Charger',
    chargerBoxId: 'SITEWIT001',
    chargertype: 'Connector ',
    faultisince: '1 Day 1 hr',
    locationcontactname: 'Brooklyn',
    timereported: '20-04-21 12:30',
    locationid: 'WIT202101021234',
    state: 'New York',
    locationcontactnumber: '+1-202-5555-0192',
  },
  {
    locationName: 'Fast Speed Charger',
    chargerBoxId: 'SITEWIT001',
    chargertype: 'Connector ',
    faultisince: '1 Day 1 hr',
    locationcontactname: 'Brooklyn',
    timereported: '20-04-21 12:30',
    locationid: 'WIT202101021234',
    state: 'New York',
    locationcontactnumber: '+1-202-5555-0192',
  },
  {
    locationName: 'Fast Speed Charger',
    chargerBoxId: 'SITEWIT001',
    chargertype: 'Connector ',
    faultisince: '1 Day 1 hr',
    locationcontactname: 'Brooklyn',
    timereported: '20-04-21 12:30',
    locationid: 'WIT202101021234',
    state: 'New York',
    locationcontactnumber: '+1-202-5555-0192',
  },
]
