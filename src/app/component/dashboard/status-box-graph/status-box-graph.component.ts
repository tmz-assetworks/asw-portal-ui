import { Component, Input } from '@angular/core'
import { EChartsOption } from 'echarts'
import { NgxEchartsModule } from 'ngx-echarts'

@Component({
  selector: 'app-status-box-graph',
  templateUrl: './status-box-graph.component.html',
  styleUrls: ['./status-box-graph.component.scss'],
  imports:[NgxEchartsModule]
})
export class StatusBoxGraphComponent {
  constructor() {}

  @Input() title: any
  @Input() icon: any

  option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      position: ['15%', '20%'],
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
      bottom: '25%',
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
}
