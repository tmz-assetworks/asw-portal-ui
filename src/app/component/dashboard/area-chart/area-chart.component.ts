import { Component, Input, OnInit } from '@angular/core'
import { EChartsOption, graphic } from 'echarts'

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.scss'],
})
export class AreaChartComponent implements OnInit {
  @Input() chartType: any
  @Input() chartTitle = ''
  constructor() {}

  icon = '../../../../assets/chart-icon.png'
  option: EChartsOption = {}

  ngOnInit(): void {
    this.setChartOption(this.chartType)
  }

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
         data: ['CANCELLED', 'INTERRUPTED','COMPLETED' ],
          icon: 'square',

          right: 20,
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
             color: '#EA002A' 
              
              
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
    } else {
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

          right: 20,
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
    }
  }
}
