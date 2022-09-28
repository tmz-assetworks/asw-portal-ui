import { Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { EChartsOption } from 'echarts'
import { AuthService } from 'src/app/service/auth/auth.service'
import { LocationService } from './../location.service'

@Component({
  selector: 'app-location-staus',
  templateUrl: './location-staus.component.html',
  styleUrls: ['./location-staus.component.scss'],
})
export class LocationStausComponent implements OnInit {
  locationChargerList = []

  constructor(
    public _locationService: LocationService,
    private _auth: AuthService,
  ) {}

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

  @ViewChild(MatPaginator) paginator!: MatPaginator

  searchKey: any

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    this.paginator._intl.itemsPerPageLabel = 'Rows per page'
  }
  // getLocationList() {
  //   this._locationService.locationStatusList().subscribe((data) => {
  //     this.locationChargerList = data.Data

  //     this.dataSource.data = this.locationChargerList
  //   })
  // }

  ngOnInit() {
    // this._auth.tokenExpired()
    // this.getLocationList()
  }

  // @ViewChild(MatPaginator) paginator!: MatPaginator;

  // searchKey:any;

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }
  displayedColumns: string[] = [
    'customer_name',
    'uid',
    'chargertype',
    'faultsince',
    'faultdesription',
    'timereported',
    'locationid',
    'location',
  ]
  dataSource = new MatTableDataSource()

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }
}

export interface PeriodicElement {
  chargerid: string
  chargername: string
  chargermake: string
  chargermodel: string
  connectortype: string
  ocppprotocol: string
  chargerstatus: string
  chargerports: string
  action: string
}
