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
    }
  }

  /**
   *
   * @param dataSet
   * @returns
   * Set Line chart options
   */

  setLineChartOption(dataSet: any) {
    const src = dataSet.map((acc: any) => [
      `${acc.times}:00`,
      acc.endMeterValue,
    ])

    const maxValue = dataSet.map((acc: any) => `${acc.endMeterValue}`)

    const maxEndMeterValue = Math.max(...maxValue)

    // debugger

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
        // max: maxEndMeterValue,
        name: 'Energy Used (Kwh)',
        nameLocation: 'middle',
        /* fontWeight: 'bolder', */
        nameGap: 60, // 50
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
}
