import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { EChartsOption } from 'echarts'

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
  energyUsedDataSet: any
  locationAnalyticsDataSet: any
  chartTypeData: any
  reportSubscribeYearlyDataSet: any
  reportUpcomingSessionDataSet: any
  reportEnergyUsedDataSet: any
  reportEnergyGasolineGallonDataSet: any
  reportEnergyMilesAddedDataSet: any
  @Input() set chartType(value: any) {
    this.chartTypeData = value

    this.setChartOption(this.chartTypeData)
  }
  @Input() chartTitle: any

  @Input() set energyUsedData(value: any) {
    if (value !== undefined) {
      this.energyUsedDataSet = value

      /**
       * Set Chart type
       */
      this.setChartOption(this.chartTypeData)
    }
  }

  @Input() set chargerEnergyUsedData(value: any) {
    if (value !== undefined) {
      // this.energyUsedDataSet = value

      /**
       * Set Chart type
       */
      this.setChartOption(this.chartTypeData)
    }
  }

  @Input() set energyAnalticsUsedData(value: any) {
    if (value !== undefined) {
      this.locationAnalyticsDataSet = value
      this.setChartOption(this.chartTypeData)
    }
  }
  @Input() set reportSubscribeYearlyData(value: any) {
    if (value !== undefined) {
      this.reportSubscribeYearlyDataSet = value
      this.setChartOption(this.chartTypeData)
    }
  }
  @Input() set reportUpcomingSessionData(value: any) {
    if (value !== undefined) {
      this.reportUpcomingSessionDataSet = value
      this.setChartOption(this.chartTypeData)
    }
  }
  @Input() set reportEnergyUsedData(value: any) {
    if (value !== undefined) {
      this.reportEnergyUsedDataSet = value
      this.setChartOption(this.chartTypeData)
    }
  }
  @Input() set reportEnergyGasolineGallonData(value: any) {
    if (value !== undefined) {
      this.reportEnergyGasolineGallonDataSet = value
      this.setChartOption(this.chartTypeData)
    }
  }

  @Input() set reportEnergyMilesAddedData(value: any) {
    if (value !== undefined) {
      this.reportEnergyMilesAddedDataSet = value
      this.setChartOption(this.chartTypeData)
    }
  }
  @Output() lineDetailPage: EventEmitter<any> = new EventEmitter<any>()
  constructor() {}

  icon = '../../../../assets/chart-icon.png'

  dataSet = []
  option: EChartsOption = {}

  ngOnInit(): void {
    // this.setChartOption(this.chartType)
  }

  /**
   *
   * @param chartType
   *
   * Set Line chart options
   */
  setChartOption(chartType: string) {
    if (chartType == 'lineAnalytics') {
      this.chartTitle = 'Energy Demand Over Time'
      this.option = this.setLineChartOption(
        this.locationAnalyticsDataSet,
      ) as EChartsOption

      // this.chartTitle = 'Energy Demand Over Time'
      // this.option = {
      //   legend: {
      //     left: '82%',
      //     icon: 'square',
      //   },
      //   grid: {
      //     left: '10%',
      //     right: '0%',
      //     bottom: '8%',
      //     top: 50,
      //     containLabel: true,
      //   },
      //   tooltip: {
      //     show: true,
      //   },
      //   background: 'transparent',
      //   dataset: {
      //     source: [
      //       //   ['category', 'Energy Used'],
      //       ['category', 'ENERGY USED'],
      //       ['00:00', 1535],
      //       ['3:00', 1930],
      //       ['6:00', 3860],
      //       ['9:00', 4720],
      //       ['12:00', 5930],
      //       ['15:00', 6860],
      //       ['18:00', 7725],
      //       ['24:00', 7728],
      //     ],
      //   },
      //   /* xAxis: {
      //     type: 'category',

      //   }, */
      //   xAxis: [
      //     {
      //       type: 'category',
      //       name: 'Time',
      //       nameLocation: 'middle',
      //       nameGap: 40,
      //       axisTick: { show: false },
      //       axisLabel: {
      //         rotate: 30,
      //       },
      //     },
      //   ],
      //   yAxis: {
      //     type: 'value',
      //     min: 0,
      //     max: 10000,
      //     name: 'Energy Used (Kwh)',
      //     nameLocation: 'middle',
      //     /* fontWeight: 'bolder', */
      //     nameGap: 60,
      //     nameTextStyle: {
      //       // align: 'right',
      //       // verticalAlign: 'top',
      //       /**
      //        * the top padding will shift the name down so that it does not overlap with the axis-labels
      //        * t-l-b-r
      //        */
      //       // padding: [10, 0, 0, 0],
      //       fontSize: 14,
      //       // fontWeight: 800,
      //       // fontStyle: 'italic',
      //     },
      //   },
      //   series: [
      //     {
      //       /*  data: chartData.map(m=>({
      //         value: m.value
      //       })), */
      //       type: 'line',
      //     },
      //   ],
      // }
    } else if (chartType === 'dashboardEnergyUsed') {
      this.option = this.setLineChartOption(
        this.energyUsedDataSet,
      ) as EChartsOption
      // })

      //   this.chartTitle = 'Energy Demand Over Time'

      //   this.option = {
      //     legend: {
      //       left: '70%', // 80%
      //       icon: 'square',
      //     },
      //     grid: {
      //       left: '10%',
      //       // left: '12%',
      //       // right: '0%',
      //       right: '0%',
      //       bottom: '8%',
      //       top: 50,
      //       containLabel: true,
      //     },
      //     tooltip: {
      //       show: true,
      //     },
      //     background: 'transparent',
      //     dataset: {
      //       source: [
      //         ['category', 'Energy Used'],
      //         ['00:00', 1535],
      //         ['3:00', 1930],
      //         ['6:00', 3860],
      //         ['9:00', 4720],
      //         ['12:00', 5930],
      //         ['15:00', 6860],
      //         ['18:00', 7725],
      //         ['24:00', 7728],
      //       ],
      //     },
      //     /* xAxis: {
      //   type: 'category',

      // }, */
      //     xAxis: [
      //       {
      //         type: 'category',
      //         name: 'Time',
      //         nameLocation: 'middle',
      //         nameGap: 50,
      //         axisTick: { show: false },
      //         axisLabel: {
      //           rotate: 30,
      //         },
      //       },
      //     ],
      //     yAxis: {
      //       type: 'value',
      //       min: 0,
      //       max: 10000,
      //       name: 'Energy Used (Kwh)',
      //       nameLocation: 'middle',
      //       /* fontWeight: 'bolder', */
      //       nameGap: 60, // 50
      //       nameTextStyle: {
      //         // align: 'right',
      //         // verticalAlign: 'top',
      //         /**
      //          * the top padding will shift the name down so that it does not overlap with the axis-labels
      //          * t-l-b-r
      //          */
      //         // padding: [10, 0, 0, 0],
      //         fontSize: 14,
      //         // fontWeight: 800,
      //         // fontStyle: 'italic',
      //       },
      //     },
      //     series: [
      //       {
      //         /*  data: chartData.map(m=>({
      //       value: m.value
      //     })), */
      //         type: 'line',
      //       },
      //     ],
      //   }
    } else if (chartType == 'chargerAnalytics') {
      this.chartTitle = 'Energy Demand Over Time'
      this.option = {
        legend: {
          // left: '82%',
          right: '4%',
          icon: 'square',
        },
        grid: {
          left: '10%',
          right: '0%',
          bottom: '8%',
          top: 50,
          containLabel: true,
        },
        tooltip: {
          show: true,
        },
        background: 'transparent',
        dataset: {
          source: [
            //   ['category', 'Energy Used'],
            ['category', 'ENERGY USED'],
            ['00:00', 1535],
            ['3:00', 1930],
            ['6:00', 3860],
            ['9:00', 4720],
            ['12:00', 5930],
            ['15:00', 6860],
            ['18:00', 7725],
            ['24:00', 7728],
          ],
        },
        /* xAxis: {
          type: 'category',
    
        }, */
        xAxis: [
          {
            type: 'category',
            name: 'Time',
            nameLocation: 'middle',
            nameGap: 42,
            axisTick: { show: false },
            axisLabel: {
              rotate: 25,
            },
          },
        ],
        yAxis: {
          type: 'value',
          // min: 0,
          // max: 10000,
          name: 'Energy Used (Kwh)',
          nameLocation: 'middle',
          /* fontWeight: 'bolder', */
          nameGap: 50,
          nameTextStyle: {
            // align: 'right',
            // verticalAlign: 'top',
            /**
             * the top padding will shift the name down so that it does not overlap with the axis-labels
             * t-l-b-r
             */
            // padding: [10, 0, 0, 0],
            fontSize: 14,
            // fontWeight: 800,
            // fontStyle: 'italic',
          },
        },
        series: [
          {
            /*  data: chartData.map(m=>({
              value: m.value
            })), */
            type: 'line',
          },
        ],
      }
    } else if (chartType == 'energyAnalyticsUsed') {
      this.option = this.setLineChartOption(
        this.energyUsedDataSet,
      ) as EChartsOption
    } else if (chartType == 'reportTransaction') {
      this.chartTitle = 'Monthly Transaction'
      this.option = {
        legend: {
          // left: '82%',
          right: '4%',
          icon: 'square',
        },
        grid: {
          left: '8%',
          right: '6%',
          bottom: '8%',
          top: 50,
          containLabel: true,
        },
        tooltip: {
          show: true,
        },
        background: 'transparent',
        dataset: {
          source: [
            //   ['category', 'Energy Used'],
            ['category', 'MONTHLY TRANSACTION'],
            ['July 20', 50],
            ['Aug 20', 70],
            ['Sep 20', 110],
            ['Oct 20', 150],
            ['Nov 20', 190],
            ['Dec 20', 250],
            ['Jan 21', 260],
            ['Feb 21', 300],
            ['Mar 21', 405],
            ['Apr 21', 417],
            ['May 21', 480],
            ['Jun 21', 470],
          ],
        },
        /* xAxis: {
          type: 'category',
    
        }, */
        xAxis: [
          {
            type: 'category',
            name: 'Month',
            nameLocation: 'middle',
            nameGap: 35,
            axisTick: { show: false },
            axisLabel: {
              //rotate: 30,
              rotate: 0,
            },
          },
        ],
        yAxis: {
          type: 'value',
          min: 0,
          max: 1000,
          name: 'Monthly Transaction',
          nameLocation: 'middle',
          /* fontWeight: 'bolder', */
          nameGap: 50,
          nameTextStyle: {
            // align: 'right',
            // verticalAlign: 'top',
            /**
             * the top padding will shift the name down so that it does not overlap with the axis-labels
             * t-l-b-r
             */
            // padding: [10, 0, 0, 0],
            fontSize: 14,
            // fontWeight: 800,
            // fontStyle: 'italic',
          },
          axisLabel: {
            formatter: '${value}',
            // align: 'center'
            // ...
          },
        },
        series: [
          {
            /*  data: chartData.map(m=>({
              value: m.value
            })), */
            type: 'line',
            lineStyle: { color: '#A60000' },
            itemStyle: { color: '#A60000' },
          },
        ],
      }
    } else if (chartType == 'reportSubscribeYearly') {
      if (this.reportSubscribeYearlyDataSet !== undefined) {
        this.option = this.reportSubscribeYearlyChartOptions(
          this.reportSubscribeYearlyDataSet,
        ) as EChartsOption
      }
    } else if (chartType == 'reportUpcomingSession') {
      if (this.reportUpcomingSessionDataSet !== undefined) {
        this.option = this.setUpcomingSessionChartOptions(
          this.reportUpcomingSessionDataSet,
        ) as EChartsOption
      }

      // this.option = {
      //   legend: {
      //     // left: '82%',
      //     right: '4%',
      //     icon: 'square',
      //   },
      //   grid: {
      //     left: '10%',
      //     right: '4%',
      //     // bottom: '8%',
      //     top: 50,
      //     containLabel: true,
      //   },
      //   tooltip: {
      //     show: true,
      //   },
      //   background: 'transparent',
      //   dataset: {
      //     source: [
      //       //   ['category', 'Energy Used'],
      //       ['category', 'UPCOMING SESSION - 24 HOURS'],
      //       ['00:00', 10],
      //       ['02:00', 20],
      //       ['04:00', 40],
      //       ['06:00', 50],
      //       ['08:00', 60],
      //       ['10:00', 30],
      //       ['12:00', 60],
      //       ['14:00', 80],
      //     ],
      //   },
      //   /* xAxis: {
      //     type: 'category',

      //   }, */
      //   xAxis: [
      //     {
      //       type: 'category',
      //       name: 'Time',
      //       nameLocation: 'middle',
      //       nameGap: 50,
      //       axisTick: { show: false },
      //       // axisLabel: {
      //       //   rotate: 30,
      //       // },
      //     },
      //   ],
      //   yAxis: {
      //     type: 'value',
      //     // min: 0,
      //     // max: 10000,
      //     name: 'Charging Sessions',
      //     nameLocation: 'middle',
      //     /* fontWeight: 'bolder', */
      //     nameGap: 50,
      //     nameTextStyle: {
      //       // align: 'right',
      //       // verticalAlign: 'top',
      //       /**
      //        * the top padding will shift the name down so that it does not overlap with the axis-labels
      //        * t-l-b-r
      //        */
      //       // padding: [10, 0, 0, 0],
      //       fontSize: 14,
      //       // fontWeight: 800,
      //       // fontStyle: 'italic',
      //     },
      //   },
      //   series: [
      //     {
      //       /*  data: chartData.map(m=>({
      //         value: m.value
      //       })), */
      //       type: 'line',
      //     },
      //   ],
      // }
    } else if (chartType == 'reportEnergyUsed') {
      if (this.reportEnergyUsedDataSet !== undefined) {
        debugger
        this.option = this.setreportEnergyUsedDataChartOptions(
          this.reportEnergyUsedDataSet,
        ) as EChartsOption
      }
    } else if (chartType == 'reportEnergyGasolineGallon') {
      if (this.reportEnergyGasolineGallonDataSet !== undefined) {
        this.option = this.setEnergyGasolineGallonDataChartOptions(
          this.reportEnergyGasolineGallonDataSet,
        ) as EChartsOption
      }
    } else if (chartType == 'reportEnergyMilesAdded') {
      if (this.reportEnergyMilesAddedDataSet !== undefined) {
        this.option = this.setReportEnergyMilesAddedOption(
          this.reportEnergyMilesAddedDataSet,
        ) as EChartsOption
      }
    }
  }

  /**
   *
   * @param dataSet
   * @returns
   * Set Line chart options
   */

  setLineChartOption(dataSet: any) {
    const src = dataSet.map((acc: any) => [`${acc.times}`, acc.endMeterValue])

    const maxValue = dataSet.map((acc: any) => `${acc.endMeterValue}`)

    const maxEndMeterValue = Math.max(...maxValue)

    // let maxValue = Math.max(dataSet.map((acc: any) => [`${acc.endMeterValue}`]))
    // console.log(maxValue, 'max value')

    return {
      legend: {
        // left: '70%', // 80%
        right: '4%',
        icon: 'square',
      },
      grid: {
        left: '10%',
        // left: '12%',
        // right: '0%',
        right: '5%',
        bottom: '8%',
        top: 50,
        containLabel: true,
      },
      tooltip: {
        show: true,
      },
      background: 'transparent',
      dataset: {
        source: [
          ['category', 'Energy Used'],
          // ['00:00', 1535],
          // ['3:00', 1930],
          // ['6:00', 3860],
          // ['9:00', 4720],
          // ['12:00', 5930],
          // ['15:00', 6860],
          // ['18:00', 7725],
          // ['24:00', 7728],
          ...src,
        ],
      },
      xAxis: [
        {
          type: 'category',
          name: 'Time',
          nameLocation: 'middle',
          nameGap: 42,
          axisTick: { show: false },
          axisLabel: {
            rotate: 25,
          },
        },
      ],
      yAxis: {
        type: 'value',
        // min: 0,
        // max: maxEndMeterValue,
        name: 'Energy Used (Kwh)',
        nameLocation: 'middle',
        /* fontWeight: 'bolder', */
        nameGap: 70, // 50
        nameTextStyle: {
          fontSize: 14,
        },
      },
      series: [
        {
          type: 'line',
        },
      ],
    }
  }

  graphDetailPage() {
    this.lineDetailPage.emit(3)
  }

  reportSubscribeYearlyChartOptions(dataSet: any) {
    let yearlyArray = dataSet.map((accu: any) => [
      `${accu.year}`,
      accu.yearlyPrice,
    ])

    return {
      legend: {
        // left: '82%',
        right: '4%',
        icon: 'square',
      },
      grid: {
        left: '10%',
        right: '4%',
        // bottom: '8%',
        top: 50,
        containLabel: true,
      },
      tooltip: {
        show: true,
      },
      background: 'transparent',
      dataset: {
        source: [
          //   ['category', 'Energy Used'],
          ['category', 'YEARLY SUBSCRIPTION'],
          ...yearlyArray,
          // ['2022', 200],
          // ['2023', 300],
          // ['2024', 400],
          // ['2025', 450],
          // ['2026', 500],
          // ['2027', 550],
          // ['2028', 600],
          // ['2029', 650],
          // ['2030', 800],
          // ['2031', 900],
        ],
      },
      /* xAxis: {
        type: 'category',
  
      }, */
      xAxis: [
        {
          type: 'category',
          name: 'Yearly',
          nameLocation: 'middle',
          nameGap: 50,
          axisTick: { show: false },
          axisLabel: {
            rotate: 30,
          },
        },
      ],
      yAxis: {
        type: 'value',
        // min: 0,
        // max: 10000,
        name: 'Yearly Subscription',
        nameLocation: 'middle',
        /* fontWeight: 'bolder', */
        nameGap: 50,
        nameTextStyle: {
          // align: 'right',
          // verticalAlign: 'top',
          /**
           * the top padding will shift the name down so that it does not overlap with the axis-labels
           * t-l-b-r
           */
          // padding: [10, 0, 0, 0],
          fontSize: 14,
          // fontWeight: 800,
          // fontStyle: 'italic',
        },
        axisLabel: {
          formatter: '${value}',
          // align: 'center'
          // ...
        },
      },
      series: [
        {
          /*  data: chartData.map(m=>({
            value: m.value
          })), */
          type: 'line',
        },
      ],
    }
  }
  /**
   *
   * @param dataSet
   * Set upcomg Sesstion chart options
   */
  setUpcomingSessionChartOptions(dataSet: any) {
    let sessionUpcomingArray = dataSet.map((accu: any) => [
      `${accu.value}`,
      accu.counts,
    ])

    return {
      legend: {
        // left: '82%',
        right: '4%',
        icon: 'square',
      },
      grid: {
        left: '10%',
        right: '4%',
        // bottom: '8%',
        top: 50,
        containLabel: true,
      },
      tooltip: {
        show: true,
      },
      background: 'transparent',
      dataset: {
        source: [
          //   ['category', 'Energy Used'],
          ['category', 'UPCOMING SESSION - 24 HOURS'],

          ...sessionUpcomingArray,
          // ['00:00', 10],
          // ['02:00', 20],
          // ['04:00', 40],
          // ['06:00', 50],
          // ['08:00', 60],
          // ['10:00', 30],
          // ['12:00', 60],
          // ['14:00', 80],
        ],
      },
      /* xAxis: {
        type: 'category',
  
      }, */
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
      yAxis: {
        type: 'value',
        // min: 0,
        // max: 10000,
        name: 'Charging Sessions',
        nameLocation: 'middle',
        /* fontWeight: 'bolder', */
        nameGap: 50,
        nameTextStyle: {
          // align: 'right',
          // verticalAlign: 'top',
          /**
           * the top padding will shift the name down so that it does not overlap with the axis-labels
           * t-l-b-r
           */
          // padding: [10, 0, 0, 0],
          fontSize: 14,
          // fontWeight: 800,
          // fontStyle: 'italic',
        },
      },
      series: [
        {
          /*  data: chartData.map(m=>({
            value: m.value
          })), */
          type: 'line',
        },
      ],
    }
  }

  setreportEnergyUsedDataChartOptions(dataSet: any) {
    let enegyUsedArray = dataSet.map((accu: any) => [
      `${accu.times}`,
      accu.endMeterValue,
    ])

    return {
      legend: {
        // left: '82%',
        right: '4%',
        icon: 'square',
      },
      grid: {
        left: '10%',
        right: '4%',
        // bottom: '8%',
        top: 50,
        containLabel: true,
      },
      tooltip: {
        show: true,
      },
      background: 'transparent',
      dataset: {
        source: [
          //   ['category', 'Energy Used'],
          ['category', ' ENERGY USED'],
          ...enegyUsedArray,
          // ['00:00', 0],
          // ['03:00', 10],
          // ['06:00', 40],
          // ['09:00', 50],
          // ['12:00', 60],
          // ['15:00'],
          // ['18:00'],
          // ['24:00'],
        ],
      },
      /* xAxis: {
        type: 'category',
  
      }, */
      xAxis: [
        {
          type: 'category',
          name: 'Time',
          nameLocation: 'middle',
          nameGap: 50,
          nameTextStyle:{
            fontSize: 14,
          },
          axisTick: { show: false },
          axisLabel: {
            rotate: 30,
          },
        },
      ],
      yAxis: {
        type: 'value',
        // min: 0,
        // max: 10000,
        name: 'ENERGY USED (kwh)',
        nameLocation: 'middle',
        /* fontWeight: 'bolder', */
        nameGap: 60,
        nameTextStyle: {
          // align: 'right',
          // verticalAlign: 'top',
          /**
           * the top padding will shift the name down so that it does not overlap with the axis-labels
           * t-l-b-r
           */
          // padding: [10, 0, 0, 0],
          fontSize: 14,
          // fontWeight: 800,
          // fontStyle: 'italic',
        },
      },
      series: [
        {
          /*  data: chartData.map(m=>({
            value: m.value
          })), */
          type: 'line',
        },
      ],
    }
  }

  setEnergyGasolineGallonDataChartOptions(dataSet: any) {
    // debugger

    let gallonArray = dataSet.map((accu: any) => [
      `${accu.times}`,
      accu.gasolinegallon,
    ])
    return {
      legend: {
        // left: '82%',
        right: '4%',
        icon: 'square',
      },
      grid: {
        left: '10%',
        right: '4%',
        // bottom: '8%',
        top: 50,
        containLabel: true,
      },
      tooltip: {
        show: true,
      },
      background: 'transparent',
      dataset: {
        source: [
          //   ['category', 'Energy Used'],
          ['category', ' GGE of Gas Saved'],
          ...gallonArray,
          // ['July 20', 0],
          // ['Aug 20', 20],
          // ['Sep 20', 20],
          // ['Oct 20', 40],
          // ['Nov 20', 50],
          // ['Dec 20', 60],
          // ['Jan 21', 70],
          // ['Feb 21', 80],
          // ['Mar 21', 60],
          // ['Apr 21', 90],
          // ['May 21', 70],
          // ['Jun 21', 100],
        ],
      },
      /* xAxis: {
        type: 'category',
  
      }, */
      xAxis: [
        {
          type: 'category',
          name: 'Month',
          nameLocation: 'middle',
          nameGap: 50,
          nameTextStyle:{
            fontSize: 14,
          },
          axisTick: { show: false },
          axisLabel: {
            rotate: 30,
          },
        },
      ],
      yAxis: {
        type: 'value',
        // min: 0,
        // max: 10000,
        name: 'GGE of Gas Saved',
        nameLocation: 'middle',
        /* fontWeight: 'bolder', */
        nameGap: 50,
        nameTextStyle: {
          // align: 'right',
          // verticalAlign: 'top',
          /**
           * the top padding will shift the name down so that it does not overlap with the axis-labels
           * t-l-b-r
           */
          // padding: [10, 0, 0, 0],
          fontSize: 14,
          // fontWeight: 800,
          // fontStyle: 'italic',
        },
      },
      series: [
        {
          /*  data: chartData.map(m=>({
            value: m.value
          })), */
          type: 'line',
          itemStyle: {
            color: '#27B406',
          },
        },
      ],
    }
  }

  setReportEnergyMilesAddedOption(dataSet: any) {
    let dataArray = dataSet.map((accu: any) => [
      `${accu.times}`,
      accu.rangeAdded,
    ])
    return {
      legend: {
        // left: '82%',
        right: '4%',
        icon: 'square',
      },
      grid: {
        left: '10%',
        right: '4%',
        // bottom: '8%',
        top: 50,
        containLabel: true,
      },
      tooltip: {
        show: true,
      },
      background: 'transparent',
      dataset: {
        source: [
          //   ['category', 'Energy Used'],
          ['category', ' Miles Added'],
          ...dataArray,
          // ['July 20', 0],
          // ['Aug 20', 20],
          // ['Sep 20', 20],
          // ['Oct 20', 40],
          // ['Nov 20', 50],
          // ['Dec 20', 60],
          // ['Jan 21', 70],
          // ['Feb 21', 80],
          // ['Mar 21', 60],
          // ['Apr 21', 90],
          // ['May 21', 70],
          // ['Jun 21', 100],
        ],
      },
      /* xAxis: {
        type: 'category',
  
      }, */
      xAxis: [
        {
          type: 'category',
          name: 'Time',
          nameLocation: 'middle',
          nameGap: 50,
          nameTextStyle:{
            fontSize: 14,
          },
          axisTick: { show: false },
          axisLabel: {
            rotate: 30,
          },
        },
      ],
      yAxis: {
        type: 'value',
        // min: 0,
        // max: 10000,
        name: 'Miles',
        nameLocation: 'middle',
        /* fontWeight: 'bolder', */
        nameGap: 50,
        nameTextStyle: {
          // align: 'right',
          // verticalAlign: 'top',
          /**
           * the top padding will shift the name down so that it does not overlap with the axis-labels
           * t-l-b-r
           */
          // padding: [10, 0, 0, 0],
          fontSize: 16,
          // fontWeight: 800,
          // fontStyle: 'italic',
        },
      },
      series: [
        {
          /*  data: chartData.map(m=>({
            value: m.value
          })), */
          type: 'line',
        },
      ],
    }
  }
}
