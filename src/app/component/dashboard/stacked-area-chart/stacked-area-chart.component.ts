import { Component, EventEmitter, Input, Output } from '@angular/core'
import { EChartsOption } from 'echarts'
import { NgxEchartsModule } from 'ngx-echarts'

import { DashboardService } from 'src/app/screen/operator/dashboard/dashboard.service'

@Component({
  selector: 'app-stacked-area-chart',
  templateUrl: './stacked-area-chart.component.html',
  styleUrls: ['./stacked-area-chart.component.scss'],
  imports:[NgxEchartsModule
    ]
})
export class StackedAreaChartComponent {
  chartTypeData: any

  @Input() set chartType(value: any) {
    if (value !== undefined) {
      this.chartTypeData = value

      this.setChartOption(this.chartTypeData)
    }
  }
  @Input() chartTitle: any
  locationAnalyticsMilesAddDataSet: any

  @Input() set locationAnalyticsMilesAddData(value: any) {
    if (value !== undefined) {
      this.locationAnalyticsMilesAddDataSet = value
      this.setChartOption(this.chartTypeData)
    }
  }

  @Output() stackedAreaDetailPage: EventEmitter<any> = new EventEmitter<any>()
  icon = '../../../../assets/chart-icon.svg'
  option: EChartsOption = {}
  dataSet: any
  constructor(private _dashboardService: DashboardService) {}

  @Output() areaDetailPage: EventEmitter<any> = new EventEmitter<any>()

  setChartOption(chartType: any) {
    if (chartType == 'stackedArea') {
      this.option = {
        /* title: {
      text: 'Stacked Area Chart'
    }, */
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
        grid: {
          left: '12%',
          right: '0%',
          bottom: '8%',
          top: 50,
          containLabel: true,
        },
        legend: {
          // data: distinctCH,
        },
        /*  toolbox: {
      feature: {
        saveAsImage: {}
      }
    },*/
        /* grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    }, */
        xAxis: [
          {
            type: 'category',
            // boundaryGap: false,
            name: 'Time',
            // boundaryGap: false,
            nameLocation: 'middle',
            nameGap: 42,
            axisTick: {
              alignWithLabel: true,
            },
            data: [
              '00:00',
              '03:00',
              '6:00',
              '9:00',
              '12:00',
              '15:00',
              '18:00',
              '21:00',
              '24:00',
            ],
            axisLabel: {
              rotate: 25,

              // ...
            },
            // axisTick: {
            //       alignWithLabel: true,
            //     },
            // nameTextStyle: {
            //   // align: 'right',
            //   verticalAlign: 'top',
            //   fontSize: 14,
            //   padding: [20, 20, 20, 20],

            //   // fontWeight: 800,
            //   // fontStyle: 'italic',
            // },
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Miles',
            min: 0,
            max: 500,
            nameLocation: 'middle',
            // fontWeight: 'bolder',
            nameGap: 50,
            /* axisLabel: {
          
       
        }, */
            // axisTick: {
            //       alignWithLabel: true,
            //     },
            nameTextStyle: {
              //verticalAlign: 'top',
              fontSize: 14,
              // padding: [-20, -20, -20, -20],
            },
          },
        ],
        series: [
          {
            name: 'Completed',
            type: 'line',
            stack: 'Total',
            itemStyle: {
              color: '#87B3B9',
            },
            areaStyle: {},
            emphasis: {
              focus: 'series',
            },
            data: [40, 132, 101, 164, 90, 140, 150, 164, 90],
          },
          {
            name: 'Interrupted',
            type: 'line',
            stack: 'Total',
            itemStyle: {
              color: '#FC5859',
            },
            areaStyle: {},
            emphasis: {
              focus: 'series',
            },
            data: [120, 182, 111, 134, 120, 140, 110, 132, 101],
          },
        ],
        // }
      }
    } else if (chartType == 'locationAnalyticsMilesAdd') {
      if (this.locationAnalyticsMilesAddDataSet.length == 0) {
        this.option = {}
        return
      }
      this.option = this.setStackAreaChartOption(
        this.locationAnalyticsMilesAddDataSet,
      ) as EChartsOption
    }
  }

  setStackAreaChartOption(dataSet: any) {
    this.chartTitle = 'Miles Added'

    if (dataSet.length == 0) {
      return {}
    }

    // const xAxisTimes = this.findDistinct(dataSet, [], 'times')
    // const distinctCH = this.findDistinct(dataSet, [], 'chargingStatus')
    // const gpSim = this.groupObj(distinctCH, dataSet)

    // const legends = dataSet.map((elem: any) => `${elem.chargingStatus}`)

    const times = dataSet.map((acc: any) => `${acc.times}`)

    const rangeAdded = dataSet.map((acc: any) => `${acc.rangeAdded}`)

    const maxRange = Math.max(...rangeAdded)

    // const u = this.makeGroupByAxis(xAxisTimes, distinctCH, gpSim)
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985',
          },
        },
      },
      grid: {
        left: '14%',
        right: '5%',
        bottom: '8%',
        top: 50,
        containLabel: true,
      },
      legend: {
        // data: distinctCH,
        show: false,
      },
      /*  toolbox: {
feature: {
  saveAsImage: {}
}
},*/
      /* grid: {
left: '3%',
right: '4%',
bottom: '3%',
containLabel: true
}, */
      xAxis: [
        {
          type: 'category',
          // boundaryGap: false,
          name: 'Duration',
          // boundaryGap: false,
          nameLocation: 'middle',
          nameGap: 42,
          axisTick: {
            alignWithLabel: true,
          },
          data: times,
          axisLabel: {
            rotate: 25,

            // ...
          },
          // axisTick: {
          //       alignWithLabel: true,
          //     },
          // nameTextStyle: {
          //   // align: 'right',
          //   verticalAlign: 'top',
          //   fontSize: 14,
          //   padding: [20, 20, 20, 20],

          //   // fontWeight: 800,
          //   // fontStyle: 'italic',
          // },
        },
      ],
      yAxis: [
        {
          type: 'value',
          name: 'Miles',
          // min: 0,
          // max: maxRange,
          nameLocation: 'middle',
          // fontWeight: 'bolder',
          nameGap: 50,
          /* axisLabel: {
    
 
  }, */
          // axisTick: {
          //       alignWithLabel: true,
          //     },
          nameTextStyle: {
            //verticalAlign: 'top',
            fontSize: 14,
            // padding: [-20, -20, -20, -20],
          },
        },
      ],
      series: [
        {
          name: 'Miles Added',
          type: 'line',
          stack: 'Total',
          itemStyle: {
            color: '#87B3B9',
          },
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          data: rangeAdded,
        },
        // {
        //   name: 'Interrupted',
        //   type: 'line',
        //   stack: 'Total',
        //   itemStyle: {
        //     color: '#FC5859',
        //   },
        //   areaStyle: {},
        //   emphasis: {
        //     focus: 'series',
        //   },
        //   data: [120, 182, 111, 134, 120, 140, 110, 132, 101],
        // },
      ],

      // }
    }
  }
  graphDetailPage() {
    this.stackedAreaDetailPage.emit(2)
  }
}
