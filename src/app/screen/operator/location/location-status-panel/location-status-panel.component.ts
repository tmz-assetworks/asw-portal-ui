import { Location } from '@angular/common'
import { Component, OnInit } from '@angular/core'

import { EChartsOption } from 'echarts'
import { StorageService } from 'src/app/service/storage.service'
import { LocationService } from '../location.service'

@Component({
  selector: 'app-location-status-panel',
  templateUrl: './location-status-panel.component.html',
  styleUrls: ['./location-status-panel.component.scss'],
})
export class LocationStatusPanelComponent implements OnInit {
  chartOption: EChartsOption = {}
  infra: any
  dataSet = []
  energyUsed: any
  energyPoints: any
  infrakey: any
  infraValue: any

  energyUsedkey0: any
  energyUsedvalue0: any
  energyUsedkey1: any
  energyUsedvalue1: any
  energyUsedkey2: any
  energyUsedvalue2: any

  energyPointskey0: any
  energyPointsvalue0: any
  energyPointsvalue1: any
  energyPointskey1: any
  summaryData: any
  selectedLocationId: any
  constructor(
    private locationservice: LocationService,
    private _storageService: StorageService,
  ) {}

  /**
   *
   * Get Summary Data
   */
  getsummarydata(locationId: number) {
    this.locationservice.GetSummaryData(locationId).subscribe((res: any) => {
      this.summaryData = res.data[0]

      this.infra = locationId
        ? this.summaryData.chargingInfustructure[0]
        : this.summaryData.chargingInfustructure[1]

      this.infrakey = this.infra.key
      this.infraValue = this.infra.value

      // Revenue From Public Charging
      this.dataSet = this.summaryData.revenue

      this.chartOption = this.setRevenueOptions(this.dataSet) as EChartsOption

      // Energy Used
      this.energyUsed = this.summaryData.energyUsed[0]

      this.energyUsedkey0 = this.energyUsed.key
      this.energyUsedvalue0 = this.energyUsed.value

      this.energyUsed = this.summaryData.energyUsed[1]
      this.energyUsedkey1 = this.energyUsed.key
      this.energyUsedvalue1 = this.energyUsed.value

      this.energyUsed = this.summaryData.energyUsed[2]
      this.energyUsedkey2 = this.energyUsed.key
      this.energyUsedvalue2 = this.energyUsed.value

      //Energy Points
      this.energyPoints = this.summaryData.energyPoints[0]
      this.energyPointskey0 = this.energyPoints.key.replace('MT', 'Metric Tons')
      this.energyPointsvalue0 = this.energyPoints.value

      this.energyPoints = this.summaryData.energyPoints[1]
      this.energyPointskey1 = this.energyPoints.key
      this.energyPointsvalue1 = this.energyPoints.value
    })
  }

  /**
   *
   * @param data
   * @returns
   *
   * Set chart options
   */

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
        // right: 10,
        top: 'bottom',
      },
      grid: {
        left: '20%',
        right: '10%',
        bottom: '25%',
        containLabel: true,
      },
      xAxis: {
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
          data: [values[0], '-', '-'],
        },
        {
          name: 'Daily Cost',
          type: 'bar',
          stack: 'Total',
          itemStyle: {
            color: '#E97300',
          },
          data: ['-', values[1], '-'],
        },
        {
          name: "Today's Cost",
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

  ngOnInit(): void {
    let locationId = this._storageService.getSessionData('locationId')

    if (locationId) {
      this.selectedLocationId = locationId
    } else {
      this.selectedLocationId = 0
    }
    this.getsummarydata(this.selectedLocationId)
  }
}
