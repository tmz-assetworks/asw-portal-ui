import { Component, OnInit } from '@angular/core'
import { DashboardService } from '../dashboard.service'
import { NgxEchartsModule } from 'ngx-echarts'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-dashboard-status-panel',
  templateUrl: './dashboard-status-panel.component.html',
  styleUrls: ['./dashboard-status-panel.component.scss'],
  imports:[NgxEchartsModule,CommonModule]
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
  chargingSession: Array<{key: number, value: string}> = [];
  totalCost: string = '0.00';


  constructor(private _dashboardService: DashboardService) {}

  ngOnInit() {
    this.getSummaryData();
    this.getSummarySatus()
  }

  // Fetch charging session info
  getSummarySatus() {
    this._dashboardService.GetSummaryStatus().subscribe({
      next: (res) => {
        this.chargingSession = res.data[2]?.statusData || [];        
      },
      error: (error) => {
        console.error('Error fetching charging session data:', error);
      }
    });
  }
  
  /**
   * Get summary data
   */

  getSummaryData() {
    this._dashboardService.GetSummaryData(0).subscribe((res) => {
      this.summaryData = res.data[0]
      this.charger = this.summaryData.chargingInfustructure[1]

      this.chargerkey = this.charger.key
      this.chargervalue = this.charger.value
      this.dataSet = this.summaryData.revenue
      const totalCostItem = this.dataSet.find((item: any) => item.key === 'Total Cost');
      this.totalCost = totalCostItem ? totalCostItem.value : '0.00';
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
        // right: 5,
        top: 'bottom',
      },
      grid: {
        left: '5%',
        right: '10%',
        // top: '0%',
        bottom: '25%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
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
          name: 'Total Cost',
          type: 'bar',
          stack: 'Total',
          itemStyle: {
            color: '#90993F',
          },
          data: [Number.parseInt(values[0].replaceAll(',', '')), '-', '-'],
        },
        {
          name: 'Daily Cost',
          type: 'bar',
          stack: 'Total',
          itemStyle: {
            color: '#E97300',
          },
          data: ['-', Number.parseInt(values[1].replaceAll(',', '')), '-'],
        },
        {
          name: "Today's Cost",
          type: 'bar',
          stack: 'Total',
          itemStyle: {
            color: '#0062A6',
          },
          data: ['-', '-', Number.parseInt(values[2].replaceAll(',', ''))],
        },
      ],
    }
  }
}
