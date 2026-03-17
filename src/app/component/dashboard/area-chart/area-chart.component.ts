import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { EChartsOption, graphic } from 'echarts'
import { NgxEchartsModule } from 'ngx-echarts'

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.scss'],
  imports:[NgxEchartsModule
    ]
})
export class AreaChartComponent implements OnInit {
  chargingSessionDataSet: any
  chartTypeData: any
  icon = '../../../../assets/chart-icon.svg'
  option: EChartsOption = {}
  @Input() chartTitle: any
  reportSessionLengthDataSet: any
  reportEnegyMTCo2SavedSet: any
  reportEnegyMTCo2SavedDataSet: any
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

  private isEmpty(data?: any[]): boolean {
    return !data || data.length === 0;
  }

  constructor() {}
  @Output() areaDetailPage: EventEmitter<any> = new EventEmitter<any>()

  ngOnInit(): void {
    // this.setChartOption(this.chartTypeData, this.chargingSessionDataSet)
  }


  /**
   *
   * @param chartType
   * Set Chart options
   */

  setChartOption(chartType: string): void {
      switch (chartType) {
        case 'analyticsArea':
          this.setAnalyticsAreaChart();
          break;
      
        case 'dashboardChargingSession':
          this.setDashboardChargingSessionChart();
          break;
      
        case 'chargerArea':
          this.setChargerAreaChart();
          break;
      
        case 'chargingSession':
          this.setDashboardChargingSessionChart();  //remove method setChargingSessionChart simialr this sonar issue
          break;
      
        case 'reportSessionLength':
          this.setReportSessionLengthChart();
          break;
      
        case 'reportEnegyMTCo2Saved':
          this.setReportEnergyMTCo2SavedChart();
          break;
      
        default:
          this.option = {};
          break;
      }
    }

      private setAnalyticsAreaChart(): void {
        this.chartTitle = 'Charging Sessions';
        this.option = {
          color: ['#EA002A', '#E97300', '#90993F'],
          title: {},
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
          data: ['CANCELLED', 'INTERRUPTED', 'COMPLETED'],
          icon: 'square',
          right: '4%',
        },
        grid: {
          left: '14%',
          right: '0%',
          bottom: '8%',
          containLabel: true,
        },
        xAxis: [
          {
            name: 'Duration',
            type: 'category',
            nameLocation: 'middle',
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
              rotate: 30,
            },
            nameTextStyle: {
              verticalAlign: 'top',
              padding: [20, 0, 0, 0],
              fontSize: 14,
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Charging Sessions',
            min: 0,
            max: 1000,

            nameLocation: 'middle',
            nameGap: 50,
            nameTextStyle: {
              fontSize: 13,
            },
          },
        ],
        series: [
          {
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
            emphasis: {
              focus: 'series',
            },
            data: [140, 232, 101, 264, 90, 340, 250, 264, 90],
          },
          {
            name: 'INTERRUPTED',
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
              color: '#90993F',
            },
            emphasis: {
              focus: 'series',
            },
            data: [150, 220, 240, 360, 370, 375, 400, 390, 410],
          },
        ],
        };
      }

      private setDashboardChargingSessionChart(): void {
        if (this.isEmpty(this.chargingSessionDataSet)) {
          this.option = {};
          return;
        }
      
        this.option = this.setAreaChartOption(
          this.chargingSessionDataSet
        ) as EChartsOption;
      }

      private setChargerAreaChart(): void {
        this.chartTitle = 'Charging Sessions';
        this.option = {
          color: ['#90993F', '#E97300', '#EA002A'],
          title: {},
          // ⬅️ keep your existing option object exactly as it is
        };
      }
      
      private setReportSessionLengthChart(): void {
        if (this.isEmpty(this.reportSessionLengthDataSet)) {
          this.option = {};
          return;
        }
      
        this.option = this.setReportSessionLengthChartOption(
          this.reportSessionLengthDataSet
        ) as EChartsOption;
      }
      
      private setReportEnergyMTCo2SavedChart(): void {
        if (this.isEmpty(this.reportEnegyMTCo2SavedDataSet)) {
          this.option = {};
          return;
        }
      
        this.option = this.setreportEnegyMTCo2SavedChartOption(
          this.reportEnegyMTCo2SavedDataSet
        ) as EChartsOption;
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
      },
      grid: {
        left: '14%',
        right: '5%',
        bottom: '8%',
        containLabel: true,
      },
      xAxis: [
        {
          name: 'Duration',
          type: 'category',
          nameLocation: 'middle',
          nameGap: 42,
          axisTick: {
            alignWithLabel: true,
          },
          data: times,
          axisLabel: {
            rotate: 25,
          },
          // the default nameGap=15 would move the text to the right
        },
      ],
      yAxis: [
        {
          type: 'value',
          name: 'Charging Sessions',
          right: '0%',
          nameLocation: 'middle',
          nameGap: 50,
          nameTextStyle: {
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
      temp.some((innerAccu: any) => innerAccu[key] === accu[key])
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


  setReportSessionLengthChartOption(dataSet: any[]): any {
  const xAxisValue: string[] = dataSet.map((item: any) => item?.times ?? '');
  const sessionLen: number[] = dataSet.map((item: any) =>
    item?.sessionLenghtInMinutes
      ? Number((item.sessionLenghtInMinutes / 60).toFixed(2))
      : 0
  );

  return {
    color: ['#87B3B9'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      },
      formatter: (params: any) => {
        const value = params?.[0]?.data ?? 0;
        const label = params?.[0]?.axisValue ?? '';
        return `${label}<br/>Session Length: ${value} Hours`;
      }
    },

    legend: {
      icon: 'square',
      right: '4%'
    },

    grid: {
      left: '12%',
      right: '6%',
      bottom: '12%',
      containLabel: true
    },

    xAxis: [
      {
        name: '',
        type: 'category',
        nameLocation: 'middle',
        nameGap: 30,
        axisTick: {
          alignWithLabel: true
        },
        data: xAxisValue,
        axisLabel: {
          rotate: 30
        },
        nameTextStyle: {
          verticalAlign: 'top',
          padding: [20, 0, 0, 0],
          fontSize: 12
        }
      }
    ],

    yAxis: [
      {
        type: 'value',
        name: 'Hours',
        nameLocation: 'middle',
        nameGap: 60,
        nameTextStyle: {
          fontSize: 14
        }
      }
    ],

    series: [
      {
        name: 'SESSION LENGTH',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          color: '#87B3B9'
        },
        emphasis: {
          focus: 'series'
        },
        data: sessionLen
      }
    ]
  };
}

  setreportEnegyMTCo2SavedChartOption(dataSet: any) {
    let xAxisValue = dataSet.map((accu: any) => `${accu.times}`)
    let CO2Count = dataSet.map((accu: any) => `${accu.value}`)

    return {
      color: ['#87B3B9'],
      title: {
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
        icon: 'square',
        right: '4%',
      },
      grid: {
        left: '12%',
        right: '6%',
        bottom: '8%',
        containLabel: true,
      },
      xAxis: [
        {
          name: 'Duration',
          type: 'category',
          nameLocation: 'middle',
          axisTick: {
            alignWithLabel: true,
          },
          data: xAxisValue,
          axisLabel: {
            rotate: 30,
          },
          nameTextStyle: {
            verticalAlign: 'top',
            /**
             * the top padding will shift the name down so that it does not overlap with the axis-labels
             * t-l-b-r
             */
            padding: [20, 0, 0, 0],
            fontSize: 14,
          },
          // the default nameGap=15 would move the text to the right
        },
      ],
      yAxis: [
        {
          type: 'value',
          name: 'MT of CO2 Saved',

          nameLocation: 'middle',
          nameGap: 60,
          nameTextStyle: {
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
          emphasis: {
            focus: 'series',
          },
          data: CO2Count,
        },
      ],
    }
  }
}
