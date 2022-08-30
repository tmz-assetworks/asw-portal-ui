import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { ThemePalette } from '@angular/material/core'
import { Router } from '@angular/router'
import { EChartsOption, number } from 'echarts'

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
  performingDataSet: any
  statusData: any
  isToggle: boolean = false
  defaultToggleValue = 0
  barChartId = 0
  orderBy = 0
  chargerData: any
  chartTypeData: any

  @Input() set locationStatusData(res: any) {
    if (res !== undefined) {
      this.statusData = res

      this.setChartOption('basicStatus')
    }
  }

  @Input() set locationPerformingData(value: any) {
    if (value !== undefined) {
      this.performingDataSet = value

      /**
       * Set Chart type
       */
      this.setChartOption(this.chartTypeData)
    }
  }

  @Input() set chargersData(value: any) {
    if (value !== undefined && value !== '') {
      this.chargerData = value
      this.setChartOption('bar')
    }
  }

  @Input() set locationareaData(res: any) {
    if (res !== undefined) {
      this.statusData = res
    }
  }

  color: ThemePalette = 'primary'
  checked = false
  disabled = false

  @Input() set chartType(value: any) {
    if (value !== undefined) {
      this.chartTypeData = value

      this.setChartOption(this.chartTypeData)
    }
  }
  @Input() chartTitle: any
  @Output() barDetailPage: EventEmitter<any> = new EventEmitter<any>()
  @Output() toggleValueChanges = new EventEmitter<any>()

  @Input() set toggle(value: boolean) {
    this.isToggle = value
  }

  constructor(private _router: Router) {}
  icon = '../../../../assets/chart-icon.png'

  option: EChartsOption = {}

  setChartOption(chartType: string) {
    if (chartType === 'bar' && this.chargerData !== undefined) {
      // alert('bar');
      this.barChartId = 1
      let arr: any
      arr = this.chargerData.data
      //console.log(arr);
      const maxValue = arr.map((accu: any) => `${accu.counts}`)

      const maxCountValue = Math.max(...maxValue)
      let arrObject: any[] = []
      let seriesData: any[] = []
      let legendColorData: any[] = []
      let legendData: any[] = ['Time']
      let svalueData: any[] =[];
      for (let i = 0; i < arr.length; i++) {
        legendData.push(arr[i].chargeStatus)
      }
      legendData = [...new Set(legendData)]
    
      for (let i = 0; i < arr.length; i++) {
        svalueData.push(arr[i].times)
      }
      svalueData = [...new Set(svalueData)]
      // FIND COLOR ACC TO LEGEND DATA 
       for(let i=1;i<legendData.length;i++) {
          let ind = arr.findIndex((x: any) => x.chargeStatus == legendData[i]);
         if(ind >= 0) {
           legendColorData.push((arr[ind].color !== undefined ? arr[ind].color : '#90993F' ));
         } 
         
       }
      arrObject.push(legendData);
       for(let i=0;i<svalueData.length;i++) {
        let xvalueData: any[] =[svalueData[i]];
       for(let j=1;j<legendData.length;j++) {
       let ind = arr.findIndex((x: any) => x.chargeStatus == legendData[j] && x.times == svalueData[i]);
       let arrOb =  ind >= 0 ? arr[ind].counts : 0;
       xvalueData.push(arrOb);
         
       }
       // console.log(xvalueData);
        arrObject.push(xvalueData);
       
        }


      // CREATE OBJECT FOR DIFF ELEMENT
      // console.log(legendData,'legend data');
      let legendDataLenghth = legendData.length - 1
      for (let j = 0; j < legendDataLenghth; j++) {
        if (legendColorData[j] !== undefined) {
          let obj = {
            type: 'bar',
            barWidth: '10%',
            itemStyle: {
              color: legendColorData[j],
            },
          }

          seriesData.push(obj)
        }
      }
      this.option = {
        grid: {
          left: '14%',
          right: '4%',
          bottom: '8%',
          top: 50,
          containLabel: true,
        },
        legend: {
          right: '4%',
          icon: 'square',
        },
        tooltip: {},
        dataset: {
          source: arrObject,
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
        yAxis: [
          {
            type: 'value',
            name: 'Chargers',
            nameLocation: 'middle',

            // fontWeight: 'bolder',
            nameGap: 60,
            // min: 0,
            // max: maxCountValue,
            nameTextStyle: {
              // align: 'right',
              verticalAlign: 'top',
              fontSize: 14,
              // fontWeight: 800,
              // fontStyle: 'italic',
            },
          },
        ],
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: seriesData,
      }
    } else if (chartType === 'barAnalytics') {
      this.option = {
        grid: {
          left: '12%',
          right: '0%',
          bottom: '8%',
          top: 50,
          containLabel: true,
        },
        legend: {
          // left: '56%',
          right: '4%',
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
            nameGap: 45,
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

            nameGap: 50,
            min: 0,
            max: 500,
            nameTextStyle: {
              // align: 'right',
              verticalAlign: 'top',

              fontSize: 14,
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
    } else if (chartType == 'chargerBar') {
      this.option = {
        grid: {
          left: '10%',
          right: '0%',
          bottom: '8%',
          top: 50,
          containLabel: true,
        },
        legend: {
          // left: '63%',
          right: '0%',
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
    } else if (chartType === 'dashboardlocationPerform') {
      //alert(4);
      if (this.performingDataSet !== undefined) {
        this.barChartId = 4
        this.option = this.setPerformChartOptions(
          this.performingDataSet,
        ) as EChartsOption
      }
    } else if (chartType == 'basicStatus') {
      if (this.statusData !== undefined) {
        this.barChartId = 3

        let legendData: any[] = []
        let seriesData: any[] = []
        seriesData.push({
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
        })
        for (let i = 0; i < this.statusData.length; i++) {
          legendData.push(this.statusData[i].locationStatus)
        }

        let legendCountData: any[] = []
        let legendColorData: any[] = []

        for (let i = 0; i < this.statusData.length; i++) {
          legendCountData.push(this.statusData[i].counts)
        }

        for (let i = 0; i < this.statusData.length; i++) {
          let color =
            this.statusData[i].color !== undefined
              ? this.statusData[i].color
              : '#90993F'
          legendColorData.push(color)
        }
        // CREATE OBJECT FOR DIFF ELEMENT
        for (let j = 0; j < legendCountData.length; j++) {
          let obj = {
            //  name: 'TOTAL LOCATIONS',
            name: legendData[j],
            type: 'bar',
            stack: 'Total',
            itemStyle: {
              color: legendColorData[j],
            },
            data: this.returnData(j, legendCountData),
          }

          seriesData.push(obj)
        }
        this.option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
          },
          legend: {
            data: legendData,
            icon: 'square',
            right: '4%',
          },
          grid: {
            left: '10%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          xAxis: {
            type: 'category',
            // data: ['Total Locations', 'Live', 'Under Maintenance', 'Upcoming'], // on hover
            data: legendData,
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
            // fontWeight: 'bolder',
            nameGap: 50,
            nameTextStyle: {
              // align: 'right',
              verticalAlign: 'top',

              fontSize: 14,
              // fontWeight: 800,
              // fontStyle: 'italic',
            },
          },
          series: seriesData,
        }
      }
    } else if (chartType === 'locationPerform') {
      this.barChartId = 2

      if (this.performingDataSet !== undefined) {
        this.option = this.setPerformChartOptions(
          this.performingDataSet,
        ) as EChartsOption
      }
    } else if (chartType == 'reportSubscribeMonthly') {
      this.option = {
        legend: {
          right: '4%',
          icon: 'square',
        },
        grid: {
          left: '12%',
        },
        tooltip: {
          show: true,
        },
        xAxis: {
          type: 'category',
          data: [
            'July 20',
            'Aug 20',
            'Sept 20',
            'Oct 20',
            'Nov 20',
            'Dec 20',
            'Jan 21',
            'Feb 21',
            'Mar 21',
            'Apr 21',
            'May 21',
            'Jun 21',
            'July 21',
          ],
          name: 'Month',
          nameLocation: 'middle',
          nameGap: 45,
          //nameGap: 25,
          axisTick: { show: false },

          // axisLabel: {
          //   rotate: 30,
          // },
        },
        yAxis: {
          type: 'value',
          name: 'Monthly Subscription',
          nameLocation: 'middle',
          nameGap: 50,
          nameTextStyle: {
            // align: 'right',
            verticalAlign: 'top',
            fontSize: 14,
          },
          axisLabel: {
            formatter: '${value}',
            // align: 'center'
            // ...
          },
        },
        series: [
          {
            name: 'MONTHLY SUBSCRIPTION',
            data: [120, 200, 150, 80, 70, 110, 130, 80, 70, 110, 130, 110, 130],
            type: 'bar',
            // itemStyle:{color:'#FFA12D'}
          },
        ],
      }
    } else if (chartType == 'reportSubscribeType') {
      this.option = {
        legend: {
          right: '4%',
          icon: 'square',
        },
        grid: {
          left: '12%',
        },
        tooltip: {
          show: true,
        },
        xAxis: {
          type: 'category',
          data: [
            'Service Plan 1',
            'Service Plan 2',
            'Service Plan 3',
            'Service Plan 4',
          ],
          name: 'Month',
          nameLocation: 'middle',
          nameGap: 45,
          //nameGap: 25,
          axisTick: { show: false },

          // axisLabel: {
          //   rotate: 30,
          // },
        },
        yAxis: {
          type: 'value',
          name: 'Count',
          nameLocation: 'middle',
          nameGap: 50,
          nameTextStyle: {
            // align: 'right',
            verticalAlign: 'top',
            fontSize: 14,
          },
          axisLabel: {
            formatter: '${value}',
            // align: 'center'
            // ...
          },
        },
        series: [
          {
            name: 'TYPE',
            data: [120, 200, 150, 80],
            type: 'bar',
            itemStyle: { color: '#90993F' },
          },
        ],
      }
    } else if (chartType == 'reportTransaction') {
      this.option = {
        grid: {
          left: '8%',
          right: '6%',
          bottom: '8%',
          top: 50,
          containLabel: true,
        },
        legend: {
          // left: '63%',
          right: '4%',
          icon: 'square',
        },
        tooltip: {},
        dataset: {
          source: [
            ['Yearly', 'TRANSACTION AMOUNT'],
            ['2022', 600],
            ['2023', 650],
            ['2024', 450],
            ['2025', 325],
            ['2026', 800],
            ['2027', 450],
            ['2028', 650],
            ['2029', 410],
            ['2030', 630],
            ['2031', 650],
            ['2032', 690],
            ['2033', 630],
          ],
        },
        xAxis: [
          {
            type: 'category',
            name: 'Yearly',
            nameLocation: 'middle',
            nameGap: 35,
            axisTick: { show: false },

            axisLabel: {
              //  rotate: 30,
              rotate: 0,
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Amount',
            nameLocation: 'middle',
            axisLabel: {
              formatter: '${value}',
              // align: 'center'
              // ...
            },

            /* fontWeight: 'bolder', */
            nameGap: 60,
            min: 0,
            max: 1000,
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
            barWidth: '18%',
            itemStyle: {
              // color: '#90993F',
              color: '#FFA12D',
            },
          },
        ],
      }
    } else if (chartType == 'reportSession') {
      this.option = {
        grid: {
          left: '8%',
          right: '6%',
          bottom: '8%',
          top: 50,
          containLabel: true,
        },
        legend: {
          // left: '63%',
          right: '4%',
          icon: 'square',
        },
        tooltip: {},
        dataset: {
          source: [
            ['Time', 'Available', 'Connected', 'Offline'],
            ['July 20', 26, 18, 25],
            ['Aug 20', 47, 173, 55.1],
            ['Sep 20', 60, 65.2, 82.5],
            ['Oct 20', 70, 53.9, 39.1],
            ['Nov 20', 80, 53.9, 39.1],
            ['Dec 20', 92.4, 53.9, 39.1],
            ['Jan 21', 72.4, 53.9, 39.1],
            ['Fab 21', 72.4, 53.9, 39.1],
            ['Mar 21', 72.4, 53.9, 39.1],
            ['Apr 21', 72.4, 53.9, 39.1],
            ['May 21', 72.4, 53.9, 39.1],
            ['Jun 21', 72.4, 53.9, 39.1],
          ],
        },
        xAxis: [
          {
            type: 'category',
            name: 'Months',
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
            name: 'Charging Session',
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
    }
  }

  ngOnInit(): void {
    // this.setChartOption(this.chartType)
  }

  graphDetailPage(barChartId: number) {
    this.barDetailPage.emit(barChartId)
  }

  returnData(j: number, data: any) {
    const len = data.length
    let blankData: any[] = []
    for (let i = 0; i < len; i++) {
      blankData.push('-')
    }
    if (j == 0) {
      blankData[0] = data[j]
      return blankData
    } else if (j == 0) {
      blankData[0] = data[j]
      return blankData
    } else if (j == 1) {
      blankData[1] = data[j]
      return blankData
    } else if (j == 2) {
      blankData[2] = data[j]
      return blankData
    } else if (j == 3) {
      blankData[3] = data[j]
      return blankData
    } else if (j == 4) {
      blankData[4] = data[j]
      return blankData
    } else if (j == 5) {
      blankData[5] = data[j]
      return blankData
    } else if (j == 6) {
      blankData[6] = data[j]
      return blankData
    } else if (j == 7) {
      blankData[7] = data[j]
      return blankData
    } else if (j == 8) {
      blankData[8] = data[j]
      return blankData
    }
    return
  }

  /**
   *
   * @param dataSet
   * @returns
   *
   * Set Perform Chart option
   */

  setPerformChartOptions(dataSet: any) {
    const len = dataSet.length

    const meteredValue = dataSet.map((accu: any) => `${accu.meterValue}`)

    // const maxMeterdedValue = Math.max(...meteredValue)

    // const color = dataSet.map((elem: any) => `${elem.color}`)

    const legends = dataSet.map((accu: any) => accu.locationName)

    const u = dataSet.map((accu: any, index: any) => {
      let arr: any = []

      arr.length = len

      return {
        name: accu.locationName,
        type: 'bar',
        stack: 'Total',
        itemStyle: {
          color: accu.color,
        },
        data: arr.fill(1).map((innerAccu: any, innerIndex: any) => {
          if (index === innerIndex) {
            return accu.meterValue
          } else {
            return '-'
          }
        }),
      }
    })

    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: legends,
        icon: 'square',
        // left: '8%',
        right: '4%',

        textStyle: {
          fontSize: '10',
        },
      },
      grid: {
        left: '10%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: legends,

        axisLabel: {
          rotate: 30,
        },
      },
      yAxis: {
        type: 'value',
        name: 'Energy Discharge (KWh) Till Date',
        // min: 0,
        // max: maxMeterdedValue,

        nameLocation: 'middle',
        /* fontWeight: 'bolder', */
        nameGap: 80,
        nameTextStyle: {
          // align: 'right',
          verticalAlign: 'top',

          fontSize: 14,
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
        ...u,
        // {
        //   name: 'LOCATION A',
        //   type: 'bar',
        //   stack: 'Total',
        //   itemStyle: {
        //     color: '#27B406',
        //   },
        //   data: [220, '-', '-', '-', '-'],
        // },
        // {
        //   name: 'LOCATION B',
        //   type: 'bar',
        //   stack: 'Total',
        //   itemStyle: {
        //     color: '#A60000',
        //   },
        //   data: ['-', 160, '-', '-', '-'],
        // },
        // {
        //   name: 'LOCATION C',
        //   type: 'bar',
        //   stack: 'Total',
        //   itemStyle: {
        //     color: '#FB5858',
        //   },
        //   data: ['-', '-', 140, '-', '-'],
        // },
        // {
        //   name: 'LOCATION D',
        //   type: 'bar',
        //   stack: 'Total',
        //   itemStyle: {
        //     color: '#FFA12D',
        //   },
        //   data: ['-', '-', '-', '120', '-'],
        // },
        // {
        //   name: 'LOCATION E',
        //   type: 'bar',
        //   stack: 'Total',
        //   itemStyle: {
        //     color: '#E97300',
        //   },
        //   data: ['-', '-', '-', '-', 60],
        // },
      ],
    }
  }
  /**
   *
   * @param event
   * Set toggle value
   */
  setToggleValue(event: any) {
    if (event.checked) {
      this.orderBy = 0
      this.toggleValueChanges.emit(this.orderBy)
    } else {
      this.orderBy = 1
      this.toggleValueChanges.emit(this.orderBy)
    }
  }

  /*  Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
}; */
}
