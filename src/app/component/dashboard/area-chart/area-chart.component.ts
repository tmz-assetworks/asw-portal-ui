import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { EChartsOption, graphic } from 'echarts'

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.scss'],
})
export class AreaChartComponent implements OnInit {
  chargingSessionDataSet: any
  chartTypeData: any

  icon = '../../../../assets/chart-icon.png'
  option: EChartsOption = {}

  @Input() chartTitle: any
  reportSessionLengthDataSet: any
  reportEnegyMTCo2SavedSet: any
  reportEnegyMTCo2SavedDataSet: any

  // @Input() chartType: any

  @Input() set chartType(value: any) {
    if (value !== undefined) {
      this.chartTypeData = value

      /**
       * Set chart options
       */
      this.setChartOption(this.chartTypeData)
    }
  }

  @Input() set chargingSessionData(value: any) {
    if (value !== undefined) {
      this.chargingSessionDataSet = value

      /**
       * Set chart options
       */
      this.setChartOption(this.chartTypeData)
    }
  }

  @Input() set reportSessionLengthData(value: any) {
    if (value !== undefined) {
      this.reportSessionLengthDataSet = value

      /**
       * Set chart options
       */
      this.setChartOption(this.chartTypeData)
    }
  }

  @Input() set reportEnegyMTCo2SavedData(value: any) {
    if (value !== undefined) {
      this.reportEnegyMTCo2SavedDataSet = value

      /**
       * Set chart options
       */
      this.setChartOption(this.chartTypeData)
    }
  }

  constructor() {}
  @Output() areaDetailPage: EventEmitter<any> = new EventEmitter<any>()

  ngOnInit(): void {
    // this.setChartOption(this.chartTypeData, this.chargingSessionDataSet)
  }

  /**
   *
   * @param chartType
   * @param dataSet
   * Set Chart options
   */

  setChartOption(chartType: string) {
    if (chartType === 'analyticsArea') {
      this.chartTitle = 'Charging Sessions'
      this.option = {
        // color: ['#90993F', '#E97300', '#EA002A'],
        color: ['#EA002A', '#E97300', '#90993F'],
        title: {
          // text: 'Charging Sessions',
          // padding: [0, 20, 0, 100],
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
        legend: {
          // data: ['Completed', 'Interrupted', 'Cancelled'],
          data: ['CANCELLED', 'INTERRUPTED', 'COMPLETED'],
          icon: 'square',
          right: '4%',
          // left: '50%',
          // top: 'center',
        },
        // toolbox: {
        //   feature: {
        //     saveAsImage: {},
        //   },
        // },
        grid: {
          left: '14%',
          right: '0%',
          bottom: '8%',
          containLabel: true,
        },
        xAxis: [
          {
            name: 'Time',
            type: 'category',
            // boundaryGap: false,
            nameLocation: 'middle',
            // nameGap: 50,
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
              // formatter: '{value} kg',
              // align: 'center',
              rotate: 30,

              // ...
            },
            // axisTick: {
            //       alignWithLabel: true,
            //     },
            nameTextStyle: {
              // align: 'right',
              verticalAlign: 'top',
              /**
               * the top padding will shift the name down so that it does not overlap with the axis-labels
               * t-l-b-r
               */
              padding: [20, 0, 0, 0],
              fontSize: 14,
              // fontWeight: 800,
              // fontStyle: 'italic',
            },
            // the default nameGap=15 would move the text to the right
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Charging Sessions',
            min: 0,
            max: 1000,

            nameLocation: 'middle',
            /* fontWeight: 'bolder', */
            nameGap: 50,
            nameTextStyle: {
              // verticalAlign: 'top',

              // padding: [20, 0, 0, 0],
              fontSize: 13,
            },
          },
        ],
        series: [
          {
            //  name: 'Completed',
            name: 'CANCELLED',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.5,
              color: '#EA002A',
            },
            /* areaStyle: {
              opacity: 0.8,
              color: new graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#EA002A',
                },
                {
                  offset: 1,
                  color: 'rgba(234, 0, 42, 0.5);',
                },
              ]),
            }, */
            emphasis: {
              focus: 'series',
            },
            data: [140, 232, 101, 264, 90, 340, 250, 264, 90],
          },
          {
            // name: 'Interrupted',
            name: 'INTERRUPTED',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            /* areaStyle: {
              opacity: 0.8,
              color: '#E97300',
              
            }, */
            areaStyle: {
              opacity: 0.8,
              color: new graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#E97300',
                },
                {
                  offset: 1,
                  color: 'rgba(233, 115, 0, 0.5)',
                },
              ]),
            },
            emphasis: {
              focus: 'series',
            },
            data: [120, 282, 111, 234, 220, 340, 310, 232, 101],
          },
          {
            // name: 'Cancelled',
            name: 'COMPLETED',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.5,
              // color: '#EA002A',
              color: '#90993F',
              //   color: new graphic.LinearGradient(0, 0, 0, 1, [
              //     {
              //       offset: 0,
              //       color: '#EA002A',
              //     },
              //     {
              //       offset: 1,
              //       color: 'rgb(116, 21, 219)',
              //     },
              //   ]),
            },
            emphasis: {
              focus: 'series',
            },
            data: [150, 220, 240, 360, 370, 375, 400, 390, 410],
          },
        ],
      }
    } else if (chartType == 'dashboardChargingSession') {
      this.option = this.setAreaChartOption(
        this.chargingSessionDataSet,
      ) as EChartsOption
    } else if (chartType == 'chargerArea') {
      this.chartTitle = 'Charging Sessions'
      this.option = {
        color: ['#90993F', '#E97300', '#EA002A'],
        title: {
          // text: 'Charging Sessions',
          // padding: [0, 20, 0, 100],
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
        legend: {
          data: ['Completed', 'Interrupted', 'Cancelled'],
          icon: 'square',
          // right: 0,
          right: '4%',
          // top: 'center',
        },
        // toolbox: {
        //   feature: {
        //     saveAsImage: {},
        //   },
        // },
        grid: {
          left: '12%',
          right: '0%',
          bottom: '8%',
          containLabel: true,
        },
        xAxis: [
          {
            name: 'Time',
            type: 'category',
            // boundaryGap: false,
            nameLocation: 'middle',
            // nameGap: 50,
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
              // formatter: '{value} kg',
              // align: 'center',
              rotate: 30,

              // ...
            },
            // axisTick: {
            //       alignWithLabel: true,
            //     },
            nameTextStyle: {
              // align: 'right',
              verticalAlign: 'top',
              /**
               * the top padding will shift the name down so that it does not overlap with the axis-labels
               * t-l-b-r
               */
              padding: [20, 0, 0, 0],
              fontSize: 14,
              // fontWeight: 800,
              // fontStyle: 'italic',
            },
            // the default nameGap=15 would move the text to the right
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Charging Sessions',
            min: 0,
            max: 1000,

            nameLocation: 'middle',
            /* fontWeight: 'bolder', */
            nameGap: 60,
          },
        ],
        series: [
          {
            name: 'Completed',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#90993F',
                },
                {
                  offset: 1,
                  color: 'rgba(144, 153, 63, 0.5)',
                },
              ]),
            },
            emphasis: {
              focus: 'series',
            },
            data: [140, 232, 101, 264, 90, 340, 250, 264, 90],
          },
          {
            name: 'Interrupted',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#E97300',
                },
                {
                  offset: 1,
                  color: 'rgba(233, 115, 0, 0.5)',
                },
              ]),
            },
            emphasis: {
              focus: 'series',
            },
            data: [120, 282, 111, 234, 220, 340, 310, 232, 101],
          },
          {
            name: 'Cancelled',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: '#EA002A',
              //   color: new graphic.LinearGradient(0, 0, 0, 1, [
              //     {
              //       offset: 0,
              //       color: '#EA002A',
              //     },
              //     {
              //       offset: 1,
              //       color: 'rgb(116, 21, 219)',
              //     },
              //   ]),
            },
            emphasis: {
              focus: 'series',
            },
            data: [100, 120, 140, 160, 190, 130, 110, 105, 224],
          },
        ],
      }
    } else if (chartType == 'chargingSession') {
      this.option = this.setAreaChartOption(
        this.chargingSessionDataSet,
      ) as EChartsOption
    } else if (chartType == 'reportSessionLength') {
      if (this.reportSessionLengthDataSet !== undefined) {
        this.option = this.setReportSessionLengthChartOption(
          this.reportSessionLengthDataSet,
        ) as EChartsOption
      }
    } else if (chartType == 'reportEnegyMTCo2Saved') {
      if (this.reportEnegyMTCo2SavedDataSet !== undefined) {
        this.option = this.setreportEnegyMTCo2SavedChartOption(
          this.reportEnegyMTCo2SavedDataSet,
        ) as EChartsOption
      }
    }
  }

  /**
   *
   * @param dataSet
   * @returns
   * Set area chart options
   */

  setAreaChartOption(dataSet: any) {
    const counts = dataSet.map((accu: any) => `${accu.counts}`)

    const maxCountValue = Math.max(...counts)

    this.chartTitle = 'Charging Sessions'
    const xAxisTimes = this.findDistinct(dataSet, [], 'times')
    const distinctCH = this.findDistinct(dataSet, [], 'chargingStatus')

    const gpSim = this.groupObj(distinctCH, dataSet)

    const legends = distinctCH.map((elem: any) => `${elem.chargingStatus}`)

    const distinctColor = this.findDistinct(
      this.chargingSessionDataSet,
      [],
      'color',
    )

    const color = distinctColor.map((elem: any) => `${elem.color}`)

    const times = xAxisTimes.map((acc: any) => `${acc.times}`)

    const u = this.makeGroupByAxis(xAxisTimes, distinctCH, gpSim)

    return {
      color: color,
      title: {
        // text: 'Charging Sessions',
        // padding: [0, 20, 0, 100],
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985',
          },
        },
      },
      legend: {
        data: legends,
        icon: 'square',
        right: '4%',
        // top: 'center',
      },
      // toolbox: {
      //   feature: {
      //     saveAsImage: {},
      //   },
      // },

      grid: {
        left: '12%',
        right: '4%',
        bottom: '8%',
        containLabel: true,
      },
      xAxis: [
        {
          name: 'Time',
          type: 'category',
          // boundaryGap: false,
          nameLocation: 'middle',
          nameGap: 42,
          axisTick: {
            alignWithLabel: true,
          },
          data: times,

          axisLabel: {
            // formatter: '{value} kg',
            // align: 'center',
            rotate: 25,

            // ...
          },
          // axisTick: {
          //       alignWithLabel: true,
          //     },

          // the default nameGap=15 would move the text to the right
        },
      ],
      yAxis: [
        {
          type: 'value',
          name: 'Charging Sessions',
          // min: 0,
          // max: maxCountValue,

          right: '0%',
          // top: 'center',

          nameLocation: 'middle',
          /* fontWeight: 'bolder', */
          nameGap: 60,
          nameTextStyle: {
            // align: 'right',
            verticalAlign: 'top',

            fontSize: 14,
          },
        },
      ],
      series: u,
    }
  }

  graphDetailPage() {
    this.areaDetailPage.emit(2)
  }

  findDistinct(a: any, temp: any, key: any) {
    return a.filter((accu: any) =>
      temp.find((innerAccu: any) => innerAccu[key] === accu[key])
        ? false
        : temp.push(accu),
    )
  }

  getName(a: any, key: any) {
    return a.map((accu: any) => accu[key])
  }

  groupObj(a: any, ar: any) {
    return a.map((accu: any) => ({
      ch: accu.chargingStatus,
      gp: ar.filter(
        (innerAccu: any) => innerAccu.chargingStatus === accu.chargingStatus,
      ),
    }))
  }

  makeGroupByAxis(xAxisTimes: any, distinctCH: any, gpSim: any): any {
    return distinctCH.map((distinctCHAccu: any) => ({
      name: distinctCHAccu.chargingStatus,
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: distinctCHAccu.color,
          },
          {
            offset: 1,
            color: distinctCHAccu.color,
          },
        ]),
      },
      emphasis: {
        focus: 'series',
      },
      data: [
        ...xAxisTimes.map(
          (xAxisTimesAccu: any) =>
            (
              gpSim
                .find((accu: any) => accu.ch === distinctCHAccu.chargingStatus)
                .gp.find(
                  (gpAccu: any) => gpAccu.times === xAxisTimesAccu.times,
                ) || {
                counts: 0,
              }
            ).counts,
        ),
      ],
    }))
  }

  setReportSessionLengthChartOption(dataSet: any) {
    let xAxisValue = dataSet.map((accu: any) => `${accu.times}`)
    let sessionLen = dataSet.map((accu: any) => `${accu.sessionLenght}`)

    return {
      color: ['#87B3B9'],
      title: {
        // text: 'Charging Sessions',
        // padding: [0, 20, 0, 100],
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985',
          },
        },
      },
      legend: {
        // data: ['SESSION LENGTH'],
        icon: 'square',
        // right: 0,
        right: '4%',
        // top: 'center',
      },
      // toolbox: {
      //   feature: {
      //     saveAsImage: {},
      //   },
      // },
      grid: {
        left: '12%',
        right: '6%',
        bottom: '12%',
        containLabel: true,
      },
      xAxis: [
        {
          name: 'Session Length (Hours)',
          type: 'category',
          // boundaryGap: false,
          nameLocation: 'middle',
          nameGap: 30,
          axisTick: {
            alignWithLabel: true,
          },
          data: xAxisValue,
          // [
          //   '01',
          //   '02',
          //   '03',
          //   '04',
          //   '05',
          //   '06',
          //   '07',
          //   '08',
          //   '09',
          //   '10',
          //   '11',
          //   '12',
          //   '13',
          //   '14',
          //   '15',
          //   '16',
          //   '17',
          //   '18',
          //   '19',
          //   '20',
          //   '21',
          //   '22',
          //   '23',
          //   '24',
          // ],
          axisLabel: {
            // formatter: '{value} kg',
            // align: 'center',
            rotate: 30,

            // ...
          },
          // axisTick: {
          //       alignWithLabel: true,
          //     },
          nameTextStyle: {
            // align: 'right',
            verticalAlign: 'top',
            /**
             * the top padding will shift the name down so that it does not overlap with the axis-labels
             * t-l-b-r
             */
            padding: [20, 0, 0, 0],
            fontSize: 12,
            // fontWeight: 800,
            // fontStyle: 'italic',
          },
          // the default nameGap=15 would move the text to the right
        },
      ],
      yAxis: [
        {
          type: 'value',
          name: 'Charging Sessions',
   
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
            // padding: [20, 0, 0, 0],
            fontSize: 14,
            // fontWeight: 800,
            // fontStyle: 'italic',
          },
        },

      ],
      series: [
        {
          name: 'SESSION LENGTH',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          areaStyle: {
            color: '#87B3B9',
          },
          // areaStyle: {
          //   opacity: 0.8,
          //   color: new graphic.LinearGradient(0, 0, 0, 1, [
          //     {
          //       offset: 0,
          //       color: '#87B3B9',
          //     },
          //     {
          //       offset: 1,
          //       color: 'rgba(144, 153, 63, 0.5)',
          //     },
          //   ]),
          // },
          emphasis: {
            focus: 'series',
          },
          data: sessionLen,
          // [
          //   140,
          //   232,
          //   101,
          //   264,
          //   90,
          //   340,
          //   250,
          //   264,
          //   90,
          //   340,
          //   250,
          //   264,
          //   90,
          //   264,
          //   90,
          //   340,
          //   250,
          //   264,
          //   90,
          //   340,
          //   250,
          //   264,
          //   90,
          //   90,
          // ],
        },
      ],
    }
  }
  setreportEnegyMTCo2SavedChartOption(dataSet: any) {
    let xAxisValue = dataSet.map((accu: any) => `${accu.times}`)
    let CO2Count = dataSet.map((accu: any) => `${accu.value}`)

    return {
      color: ['#87B3B9'],
      title: {
        // text: 'Charging Sessions',
        // padding: [0, 20, 0, 100],
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985',
          },
        },
      },
      legend: {
        // data: ['SESSION LENGTH'],
        icon: 'square',
        // right: 0,
        right: '4%',
        // top: 'center',
      },
      // toolbox: {
      //   feature: {
      //     saveAsImage: {},
      //   },
      // },
      grid: {
        left: '12%',
        right: '6%',
        bottom: '8%',
        containLabel: true,
      },
      xAxis: [
        {
          name: 'Time',
          type: 'category',
          // boundaryGap: false,
          nameLocation: 'middle',
          // nameGap: 50,
          axisTick: {
            alignWithLabel: true,
          },
          data: xAxisValue,
          // [
          //   'July 20',
          //   'Aug 20',
          //   'Sep 20',
          //   'Oct 20',
          //   'Nov 20',
          //   'Dec 20',
          //   'Jan 21',
          //   'Feb 21',
          //   'Mar 21',
          //   'Apr 21',
          //   'May 21',
          //   'Jun 21',
          // ],
          axisLabel: {
            // formatter: '{value} kg',
            // align: 'center',
            rotate: 30,

            // ...
          },
          // axisTick: {
          //       alignWithLabel: true,
          //     },
          nameTextStyle: {
            // align: 'right',
            verticalAlign: 'top',
            /**
             * the top padding will shift the name down so that it does not overlap with the axis-labels
             * t-l-b-r
             */
            padding: [20, 0, 0, 0],
            fontSize: 14,
            // fontWeight: 800,
            // fontStyle: 'italic',
          },
          // the default nameGap=15 would move the text to the right
        },
      ],
      yAxis: [
        {
          type: 'value',
          name: 'MT of CO2 Saved',

          nameLocation: 'middle',
          /* fontWeight: 'bolder', */
          nameGap: 60,
          nameTextStyle:{
            fontSize: 14,
          },
        },
      ],
      series: [
        {
          name: 'MT of CO2 SAVED',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0,
          },
          
          showSymbol: false,
          areaStyle: {
            color: '#87B3B9',
          },

          // areaStyle: {
          //   opacity: 0.8,
          //   color: new graphic.LinearGradient(0, 0, 0, 1, [
          //     {
          //       offset: 0,
          //       color: '#87B3B9',
          //     },
          //     {
          //       offset: 1,
          //       color: 'rgba(144, 153, 63, 0.5)',
          //     },
          //   ]),
          // },
          emphasis: {
            focus: 'series',
          },
          data: CO2Count,
          // [
          //   0,
          //   140,
          //   232,
          //   101,
          //   264,
          //   90,
          //   340,
          //   250,
          //   264,
          //   90,
          //   340,
          //   250,
          //   264,
          //   90,
          //   264,
          //   90,
          //   340,
          //   250,
          //   264,
          //   90,
          //   340,
          //   250,
          //   264,
          //   90,
          //   90,
          // ],
        },
      ],
    }
  }
}
