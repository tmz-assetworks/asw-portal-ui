import { Component, Input, OnInit } from '@angular/core'
import { EChartsOption } from 'echarts'

@Component({
  selector: 'app-stacked-area-chart',
  templateUrl: './stacked-area-chart.component.html',
  styleUrls: ['./stacked-area-chart.component.scss'],
})
export class StackedAreaChartComponent implements OnInit {
  @Input() chartType: any
  @Input() chartTitle: any
  icon = '../../../../assets/chart-icon.png'
  option: EChartsOption = {}
  constructor() {}

  ngOnInit(): void {
    this.setChartOption(this.chartType)
  }

  setChartOption(chartType: string) {
    if (chartType == 'stackedArea') {
      this.chartTitle = 'Miles Added'
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
          data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
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
            // nameGap: 50,
             axisTick: {
              alignWithLabel: true,
            }, 
            data: ['00:00',
            '03:00',
            '6:00',
            '9:00',
            '12:00',
            '15:00',
            '18:00',
            '21:00',
            '24:00'],
            axisLabel: {
              rotate: 36,

              // ...
            },
            // axisTick: {
            //       alignWithLabel: true,
            //     },
            nameTextStyle: {
              // align: 'right',
              verticalAlign: 'top',
              fontSize: 14,
              padding: [20, 20, 20, 20],

              // fontWeight: 800,
              // fontStyle: 'italic',
            },
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
             nameGap: 40,
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
      }
    }
  }
}
