import { Component, Input, OnInit } from '@angular/core'
import { ThemePalette } from '@angular/material/core'
import { EChartsOption } from 'echarts'

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
  @Input() chartType: any
  @Input() chartTitle: any
  isToggle: boolean = false
  @Input() set toggle(value: boolean) {
    // this._allowDay = value;
    // this.updatePeriodTypes();
    // console.log(value, 'nik')
    this.isToggle = value
  }

  color: ThemePalette = 'primary'
  checked = false
  disabled = false
  constructor() {
    // console.log(this.isToggle)
  }
  icon = '../../../../assets/chart-icon.png'

  option: EChartsOption = {}

  setChartOption(chartType: string) {
    if (chartType === 'bar') {
      this.option = {
        grid: {
          left: '10%',
          right: '0%',
          bottom: '8%',
          top: 50,
          containLabel: true,
        },
        legend: {
          right: '55%',
          icon: 'square',
        },
        tooltip: {},
        dataset: {
          source: [
            ['Time', 'Available', 'Connected', 'Offline'],
            ['00:00', 26, 18, 25],
            ['3:00', 47, 173, 55.1],
            ['6:00', 60, 65.2, 82.5],
            ['9:00', 70, 53.9, 39.1],
            ['12:00', 80, 53.9, 39.1],
            ['15:00', 92.4, 53.9, 39.1],
            ['18:00', 72.4, 53.9, 39.1],
            ['21:00', 72.4, 53.9, 39.1],
            ['24:00', 72.4, 53.9, 39.1],
          ],
        },
        xAxis: [
          {
            type: 'category',
            name: 'Time',
            nameLocation: 'middle',
            nameGap: 50,
            axisTick: { show: false },

            axisLabel: {
              rotate: 30,
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Chargers',
            nameLocation: 'middle',

            /* fontWeight: 'bolder', */
            nameGap: 60,
            min: 0,
            max: 300,
            nameTextStyle: {
              // align: 'right',
              verticalAlign: 'top',
              /**
               * the top padding will shift the name down so that it does not overlap with the axis-labels
               * t-l-b-r
               */
              // padding: [20, 0, 0, 0],
              fontSize: 14,
              // fontWeight: 800,
              // fontStyle: 'italic',
            },
          },
        ],
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          {
            type: 'bar',
            barWidth: '10%',
            itemStyle: {
              color: '#90993F',
            },
          },
          {
            type: 'bar',
            barWidth: '10%',
            itemStyle: {
              color: '#E97300',
            },
          },
          {
            type: 'bar',
            barWidth: '10%',
            itemStyle: {
              color: '#757575',
            },
          },
        ],
      }
    } else if (chartType === 'basic') {
      this.option = {
        // width: '450px',
        // grid: {
        //   left: '8%',
        //   right: '8%',
        //   bottom: '8%',
        //   top: 50,
        //   containLabel: true,
        // },
        // legend: {
        //   data: [
        //     'Location A',
        //     'Location B',
        //     'Location C',
        //     'Location D',
        //     'Location E',
        //   ],
        //   // show: true,
        // },
        // xAxis: {
        //   type: 'category',
        //   data: [
        //     'Location A',
        //     'Location B',
        //     'Location C',
        //     'Location D',
        //     'Location E',
        //   ],

        //   nameGap: 70,
        //   axisTick: { show: false },
        //   axisLabel: {
        //     rotate: 30,
        //   },
        // },

        // yAxis: [
        //   {
        //     type: 'value',
        //     name: 'Energy Discharge (kWh) till date',
        //     min: 0,
        //     max: 500,

        //     nameLocation: 'middle',
        //     /* fontWeight: 'bolder', */
        //     nameGap: 50,
        //     nameTextStyle: {
        //       // align: 'right',
        //       verticalAlign: 'top',
        //       /**
        //        * the top padding will shift the name down so that it does not overlap with the axis-labels
        //        * t-l-b-r
        //        */
        //       // padding: [20, 0, 0, 0],
        //       fontSize: 14,
        //       // fontWeight: 800,
        //       // fontStyle: 'italic',
        //     },
        //   },
        // ],

        // series: [
        //   {
        //     name: 'Location A',
        //     data: [990.71, 0, 0, 0, 0],
        //     type: 'bar',
        //     barWidth: 20,
        //     // barCategoryGap: '10%',
        //   },
        //   {
        //     name: 'Location B',
        //     data: [0, 880, 0, 0, 0],
        //     type: 'bar',
        //     barWidth: 20,
        //     // barCategoryGap: '10%',
        //   },
        //   {
        //     name: 'Location C',
        //     data: [0, 0, 645, 0, 0],
        //     type: 'bar',
        //     barWidth: 20,
        //     // barCategoryGap: '10%',
        //   },
        //   {
        //     name: 'Location D',
        //     data: [0, 0, 0, 454, 0],
        //     type: 'bar',
        //     barWidth: 20,
        //     // barCategoryGap: '10%',
        //   },
        //   {
        //     name: 'Location E',
        //     data: [0, 0, 0, 0, 454],
        //     type: 'bar',
        //     barWidth: 20,
        //     // barCategoryGap: '20%',
        //   },
        // ],
        // series: [
        //   {
        //     data: [60, 200, 150, 235, 335],
        //     type: 'bar',
        //   },
        // ],

        // series: [
        //   {
        //     data: [
        //       {
        //         name: 'Location A',
        //         value: 120,
        //         itemStyle: { color: 'green' },
        //       },
        //       {
        //         value: 200,
        //         itemStyle: { color: 'red' },
        //       },
        //       {
        //         value: 150,
        //         itemStyle: { color: 'pink' },
        //       },
        //       {
        //         value: 160,
        //         itemStyle: { color: 'yellow' },
        //       },
        //       {
        //         value: 200,
        //         itemStyle: { color: 'orange' },
        //       },
        //     ],
        //     type: 'bar',
        //   },
        // ],

        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {
          data: [
            'LOCATION A',
            'LOCATION B',
            'LOCATION C',
            'LOCATION D',
            'LOCATION E',
          ],
          icon: 'square',
          left: '10%',
        },
        grid: {
          left: '10%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: [
            'Location A',
            'Location B',
            'Location C',
            'Location D',
            'Location E',
          ],
          // data: (function () {
          //   let list = [];
          //   for (let i = 1; i <= 11; i++) {
          //     list.push('Nov ' + i);
          //   }
          //   return list;
          // })()
          axisLabel: {
            rotate: 30,
          },
        },
        yAxis: {
          type: 'value',
          name: 'Energy Discharge (KWh) Till Date',
          min: 0,
          max: 500,

          nameLocation: 'middle',
          /* fontWeight: 'bolder', */
          nameGap: 60,
          nameTextStyle: {
            // align: 'right',
            verticalAlign: 'top',
            /**
             * the top padding will shift the name down so that it does not overlap with the axis-labels
             * t-l-b-r
             */
            // padding: [20, 0, 0, 0],
            fontSize: 14,
            // fontWeight: 800,
            // fontStyle: 'italic',
          },
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
            name: 'LOCATION A',
            type: 'bar',
            stack: 'Total',
            itemStyle: {
              color: '#27B406',
            },
            data: [220, '-', '-', '-', '-'],
          },
          {
            name: 'LOCATION B',
            type: 'bar',
            stack: 'Total',
            itemStyle: {
              color: '#A60000',
            },
            data: ['-', 160, '-', '-', '-'],
          },
          {
            name: 'LOCATION C',
            type: 'bar',
            stack: 'Total',
            itemStyle: {
              color: '#FB5858',
            },
            data: ['-', '-', 140, '-', '-'],
          },
          {
            name: 'LOCATION D',
            type: 'bar',
            stack: 'Total',
            itemStyle: {
              color: '#FFA12D',
            },
            data: ['-', '-', '-', '120', '-'],
          },
          {
            name: 'LOCATION E',
            type: 'bar',
            stack: 'Total',
            itemStyle: {
              color: '#E97300',
            },
            data: ['-', '-', '-', '-', 60],
          },
        ],
      }
    } else if (chartType === 'basicStatus') {
      this.option = {
        // width: '60%',
        // grid: {
        //   left: '10%',
        //   right: '0%',
        //   bottom: '8%',
        //   top: 50,
        //   containLabel: true,
        // },
        // legend: {
        //   // data: [
        //   //   'Location A',
        //   //   'Lcoation B',
        //   //   'Location C',
        //   //   'Location D',
        //   //   'Location E',
        //   // ],
        // },
        // xAxis: {
        //   type: 'category',
        //   data: ['Total Locations', 'Live', 'Under Maintenance', 'Upcoming'],

        //   nameGap: 60,
        //   axisTick: { show: false },
        //   axisLabel: {
        //     // rotate: 30,
        //   },
        // },

        // yAxis: [
        //   {
        //     type: 'value',
        //     name: 'Count',
        //     min: 0,
        //     max: 500,

        //     nameLocation: 'middle',
        //     /* fontWeight: 'bolder', */
        //     nameGap: 50,
        //     nameTextStyle: {
        //       // align: 'right',
        //       verticalAlign: 'top',
        //       /**
        //        * the top padding will shift the name down so that it does not overlap with the axis-labels
        //        * t-l-b-r
        //        */
        //       // padding: [20, 0, 0, 0],
        //       fontSize: 14,
        //       // fontWeight: 800,
        //       // fontStyle: 'italic',
        //     },
        //   },
        // ],

        // series: [
        //   {
        //     name: 'Total Locations',
        //     data: [120, 0, 0, 0],
        //     type: 'bar',
        //   },
        //   {
        //     name: 'Live',
        //     data: [0, 200, 0, 0],
        //     type: 'bar',
        //   },
        //   {
        //     name: 'Under Maintenance',
        //     data: [0, 0, 150, 0],
        //     type: 'bar',
        //   },
        //   {
        //     name: 'Upcoming',
        //     data: [0, 0, 0, 160],
        //     type: 'bar',
        //   },
        // ],

        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {
          data: ['TOTAL LOCATIONS', 'LIVE', 'UNDER MAINTENANCE', 'UPCOMING'],
          icon: 'square',
        },
        grid: {
          left: '10%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: ['Total Locations', 'Live', 'Under Maintenance', 'Upcoming'],
          // data: (function () {
          //   let list = [];
          //   for (let i = 1; i <= 11; i++) {
          //     list.push('Nov ' + i);
          //   }
          //   return list;
          // })()
          axisLabel: {
            // rotate: 30,
            fontSize: 10,
          },
        },
        yAxis: {
          type: 'value',
          name: 'Count',
          min: 0,
          max: 500,

          nameLocation: 'middle',
          /* fontWeight: 'bolder', */
          nameGap: 50,
          nameTextStyle: {
            // align: 'right',
            verticalAlign: 'top',
            /**
             * the top padding will shift the name down so that it does not overlap with the axis-labels
             * t-l-b-r
             */
            // padding: [20, 0, 0, 0],
            fontSize: 14,
            // fontWeight: 800,
            // fontStyle: 'italic',
          },
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
            name: 'TOTAL LOCATIONS',
            type: 'bar',
            stack: 'Total',
            itemStyle: {
              color: '#90993F',
            },
            data: [220, '-', '-', '-'],
          },
          {
            name: 'LIVE',
            type: 'bar',
            stack: 'Total',
            itemStyle: {
              color: '#757575',
            },
            data: ['-', 160, '-', '-'],
          },
          {
            name: 'UNDER MAINTENANCE',
            type: 'bar',
            stack: 'Total',
            itemStyle: {
              color: '#E97300',
            },
            data: ['-', '-', 140, '-'],
          },
          {
            name: 'UPCOMING',
            type: 'bar',
            stack: 'Total',
            itemStyle: {
              color: '#0062A6',
            },
            data: ['-', '-', '-', '120'],
          },
        ],
      }
    } else if (chartType === 'barAnalytics') {
      this.option = {
        grid: {
          left: '10%',
          right: '0%',
          bottom: '8%',
          top: 50,
          containLabel: true,
        },
        legend: {
          left: '45%',
          icon: 'square',
        },
        tooltip: {},
        dataset: {
          source: [
            //  ['Time', 'Available', 'Connected', 'Offline'],
            ['Time', 'AVAILABLE', 'CONNECTED', 'OFFLINE'],
            ['00:00', 153, 18, 25],
            ['3:00', 193, 173, 55.1],
            ['6:00', 86.4, 65.2, 82.5],
            ['9:00', 172.4, 253.9, 229.1],
            ['12:00', 60.4, 53.9, 39.1],
            ['15:00', 72.4, 53.9, 39.1],
            ['18:00', 192.4, 153.9, 139.1],
            ['21:00', 272.4, 133.9, 159.1],
            ['24:00', 139.1, 253.9, 372.4],
          ],
        },
        xAxis: [
          {
            type: 'category',
            name: 'Time',
            nameLocation: 'middle',
            nameGap: 50,
            //nameGap: 25,
            axisTick: { show: false },

            axisLabel: {
              rotate: 30,
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Chargers',
            nameLocation: 'middle',

            /* fontWeight: 'bolder', */
            nameGap: 50,
            min: 0,
            max: 500,
            nameTextStyle: {
              // align: 'right',
              verticalAlign: 'top',
              /**
               * the top padding will shift the name down so that it does not overlap with the axis-labels
               * t-l-b-r
               */
              // padding: [20, 0, 0, 0],
              fontSize: 14,
              // fontWeight: 800,
              // fontStyle: 'italic',
            },
          },
        ],
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
         /*  { type: 'bar', barWidth: '10%' },
          { type: 'bar', barWidth: '10%' },
          { type: 'bar', barWidth: '10%' }, */
          {
            type: 'bar',
            barWidth: '10%',
            itemStyle: {
              color: '#90993F',
            },
          },
          {
            type: 'bar',
            barWidth: '10%',
            itemStyle: {
              color: '#E97300',
            },
          },
          {
            type: 'bar',
            barWidth: '10%',
            itemStyle: {
              color: '#757575',
            },
          },
        ],
      }
    }
  }

  ngOnInit(): void {
    this.setChartOption(this.chartType)
  }
}
