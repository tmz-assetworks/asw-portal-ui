import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';
import { EChartsOption } from 'echarts'
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  isAnalytics = true;
  constructor(private _auth: AuthService) {}
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
      data: ['Total Revenue', 'Daily Revenue', "Today's Revenue"],
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
        name: "Today's Revenue",
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
  bar = 'barAnalytics'
  line = 'lineAnalytics'
  lineTitle = 'Energy Used'
  barTitle = 'Chargers'
  basicTitle = 'Locations Performing '

  alteration_types = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato',
  ]
  type_list: any

  type_lists = new FormControl('')

  data = [
    /* {
      Type: 'Locations',
      Count: 50,
      StatusData: [
        {
          Key: 'Commissioned',
          value: 20,
        },
        {
          Key: 'UnderMaintenance',
          value: 25,
        },
        {
          Key: 'Upcoming',
          value: 5,
        },
      ],
    }, */
    {
      Type: 'Chargers',
      Count: 26,
      StatusData: [
        {
          Key: 'Available',
          value: 10,
          Color: '#90993F',
        },
        {
          Key: 'Connected',
          value: 6,
          Color: '#E97300',
        },
        {
          Key: 'Offline',
          value: 10,
          Color: '#757575',
        },
      ],
    },
    {
      Type: 'Charging Sessions',
      Count: 35,
      StatusData: [
        {
          Key: 'Cancelled',
          value: 15,
          Color: '#EA002A',
        },
        {
          Key: 'Interrupted',
          value: 15,
          Color: '#E97300',
        },
        {
          Key: 'Completed',
          value: 5,
          Color: '#90993F',
        },
      ],
    },
    {
      Type: 'Alerts',
      Count: 10,
      StatusData: [
        {
          Key: 'Critical',
          value: 5,
          Color: '#E97300',
        },
        {
          Key: 'High',
          value: 3,
          Color: '#EA002A',
        },
        {
          Key: 'Medium',
          value: 2,
          Color: '#0062A6',
        },
      ],
    }
  ]

  ngOnInit(): void {
    //this._auth.tokenExpired()
  }

}
