import { Component, OnInit } from '@angular/core'

import { EChartsOption } from 'echarts'
import { DashboardService } from '../dashboard.service'

@Component({
  selector: 'app-dashboard-status-panel',
  templateUrl: './dashboard-status-panel.component.html',
  styleUrls: ['./dashboard-status-panel.component.scss'],
})
export class DashboardStatusPanelComponent implements OnInit {
  infra: any
  infrakey: any
  infraValue: any
  charger: any
  chargerkey: any
  chargervalue: any
  energyUsedkey0: any
  energyUsed: any
  energyUsedvalue0: any
  energyUsedkey1: any
  energyUsedvalue1: any
  energyUsedkey2: any
  energyUsedvalue2: any
  energyPointskey0: any
  energyPointsvalue0: any
  energyPointskey1: any
  energyPointsvalue1: any
  key: any
  revenue: any
  revenueValue0: any
  revenuekey0: any
  energyPoints: any
  dataSet: any
  chartOption: any
  summaryData: any

  constructor(private _dashboardService: DashboardService) {}

  ngOnInit() {
    this.getSummaryData()
  }

  /**
   * Get summary data
   */

  getSummaryData() {
    this._dashboardService.GetSummaryData(0).subscribe((res) => {
      this.summaryData = res.data[0]

      this.infra = this.summaryData.chargingInfustructure[0]
      this.infrakey = this.infra.key
      this.infraValue = this.infra.value

      this.charger = this.summaryData.chargingInfustructure[1]

      this.chargerkey = this.charger.key
      this.chargervalue = this.charger.value

      //revenue chart
      this.dataSet = this.summaryData.revenue
      this.chartOption = this.setRevenueOptions(this.dataSet) as EChartsOption

      // EnergyUsed
      this.energyUsed = this.summaryData.energyUsed[0]
      this.energyUsedkey0 = this.energyUsed.key
      this.energyUsedvalue0 = this.energyUsed.value

      this.energyUsed = this.summaryData.energyUsed[1]
      this.energyUsedkey1 = this.energyUsed.key
      this.energyUsedvalue1 = this.energyUsed.value

      this.energyUsed = this.summaryData.energyUsed[2]
      this.energyUsedkey2 = this.energyUsed.key
      this.energyUsedvalue2 = this.energyUsed.value

      //EnergyPoints
      this.energyPoints = this.summaryData.energyPoints[0]
      this.energyPointskey0 = this.energyPoints.key.replace('MT', 'Metric Tons')

      this.energyPointsvalue0 = this.energyPoints.value

      this.energyPoints = this.summaryData.energyPoints[1]
      this.energyPointskey1 = this.energyPoints.key
      this.energyPointsvalue1 = this.energyPoints.value
    })
  }

  // energyPoints= [
  //   {
  //     Key: 'MT of CO2 Saved',
  //     Value: 19408.07,
  //     Icon: '../../../../assets/status-panel-icon/saved.png',
  //   },
  //   {
  //     Key: 'Gasoline gallon equivalent (GGE Saved)',
  //     Value: 990.71,
  //     Icon: '../../../../assets/status-panel-icon/gallon.png',
  //   },
  // ]

  setRevenueOptions(data: any) {
    const legends = data.map((acc: any) => `${acc.key}`)
    const values = data.map((acc: any) => `${acc.value}`)
    return {
      tooltip: {
        trigger: 'axis',
        position: ['2%', '3%'],
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: legends,
        icon: 'circle',
        right: 10,
        top: 'bottom',
      },
      grid: {
        left: '-10%',
        right: '20%',

        top: '0%',
        bottom: '25%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          // name: 'USD',
          // nameLocation: 'middle',
          // nameGap: 50,
          data: values,
          axisLabel: {
            rotate: 30,
            formatter: '${value}',
          },
        },
      ],
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
          data: [values[0], '-', '-'],
        },
        {
          name: 'Daily Revenue',
          type: 'bar',
          stack: 'Total',
          itemStyle: {
            color: '#E97300',
          },
          data: ['-', values[1], '-'],
        },
        {
          name: "Today's Revenue",
          type: 'bar',
          stack: 'Total',
          itemStyle: {
            color: '#0062A6',
          },
          data: ['-', '-', values[2]],
        },
      ],
    }
  }
}
