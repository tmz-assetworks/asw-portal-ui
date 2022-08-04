import { Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { EChartsOption } from 'echarts'
import { LocationService } from './../location.service'
import { animate, state, style, transition, trigger } from '@angular/animations'
import { StorageService } from 'src/app/service/storage.service'

export interface PeriodicElement {
  categorybox_id: string
  category: string
  message_type: string
  date_time: string
  ip_address: string
  location_time: string
  action: string
  position: number
  weight: number
  symbol: string
  description: string
}
@Component({
  selector: 'app-events-log',
  templateUrl: './events-log.component.html',
  styleUrls: ['./events-log.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'),
      ),
    ]),
  ],
})
export class EventsLogComponent implements OnInit {
  locationName: string | null
  constructor(
    public _locationService: LocationService,
    private _storageService: StorageService,
  ) {
    this.locationName = this._storageService.getSessionData('locationName')
  }
  ngOnInit(): void {}

  eventLogsList = [
    {
      Type: 'Reset',
      DateTime: '23-05-2022 12:15',
      SerialNumber: '2095550251',

      RequestPayload: {
        Id: 2,
        deviceId: 'cbid1810',
        requestId: 'b441afaa982b49d1855fadeef49199de',
        requestName: 'BootNotification',

        RequestPayload: {
          chargePointVendor: 'AVT-Company',
          chargePointModel: 'AVT-Express',
          chargePointSerialNumber: 'avt.001.13.1',
          chargeBoxSerialNumber: 'avt.001.13.1.01',
          firmwareVersion: '0.9.87',
          iccid: '',
          imsi: '',
          meterType: 'AVT NQC-ACDC',
          meterSerialNumber: 'avt.001.13.1.01',
        },
      },
      ResponsePayload: {
        Id: 3,
        deviceId: 'cbid1810',
        ResponseId: 'b441afaa982b49d1855fadeef49199de',
        ResponsePayload: {
          status: 'Accepted',
          currentTime: '2022-07-12T14:35:59.3680572+05:30',
          interval: 2,
        },
      },
    },
    {
      Type: 'Heartbeat',
      DateTime: '23-05-2022 12:15',
      SerialNumber: '2095550251',

      RequestPayload: {
        Id: 2,
        deviceId: 'cbid1810',
        requestId: 'b441afaa982b49d1855fadeef49199de',
        requestName: 'BootNotification',

        RequestPayload: {
          chargePointVendor: 'AVT-Company',
          chargePointModel: 'AVT-Express',
          chargePointSerialNumber: 'avt.001.13.1',
          chargeBoxSerialNumber: 'avt.001.13.1.01',
          firmwareVersion: '0.9.87',
          iccid: '',
          imsi: '',
          meterType: 'AVT NQC-ACDC',
          meterSerialNumber: 'avt.001.13.1.01',
        },
      },
      ResponsePayload: {
        Id: 3,
        deviceId: 'cbid1810',
        ResponseId: 'b441afaa982b49d1855fadeef49199de',
        ResponsePayload: {
          status: 'Accepted',
          currentTime: '2022-07-12T14:35:59.3680572+05:30',
          interval: 2,
        },
      },
    },
    {
      Type: 'Start Transaction',
      DateTime: '23-05-2022 12:15',
      SerialNumber: '2095550251',

      RequestPayload: {
        Id: 2,
        deviceId: 'cbid1810',
        requestId: 'b441afaa982b49d1855fadeef49199de',
        requestName: 'BootNotification',

        RequestPayload: {
          chargePointVendor: 'AVT-Company',
          chargePointModel: 'AVT-Express',
          chargePointSerialNumber: 'avt.001.13.1',
          chargeBoxSerialNumber: 'avt.001.13.1.01',
          firmwareVersion: '0.9.87',
          iccid: '',
          imsi: '',
          meterType: 'AVT NQC-ACDC',
          meterSerialNumber: 'avt.001.13.1.01',
        },
      },
      ResponsePayload: {
        Id: 3,
        deviceId: 'cbid1810',
        ResponseId: 'b441afaa982b49d1855fadeef49199de',
        ResponsePayload: {
          status: 'Accepted',
          currentTime: '2022-07-12T14:35:59.3680572+05:30',
          interval: 2,
        },
      },
    },
  ]

  option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
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
      bottom: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: ['990.71', '412.14', '408.07'],
      // data: (function () {
      //   let list = [];
      //   for (let i = 1; i <= 11; i++) {
      //     list.push('Nov ' + i);
      //   }
      //   return list;
      // })()
      // axisLabel: {
      //   rotate: 30,
      // },
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
        // data: [0, 900, 1245, 1530, 1376, 1376, 1511, 1689, 1856, 1495, 1292]
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

  @ViewChild(MatPaginator) paginator!: MatPaginator

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    this.paginator._intl.itemsPerPageLabel = 'Rows per page'
  }

  dataSource = new MatTableDataSource<any>(this.eventLogsList)
  columnsToDisplay = ['Type', 'DateTime', 'SerialNumber', 'action']

  displayedColumns = ['Type', 'DateTime', 'SerialNumber', 'action']
  expandedElement!: PeriodicElement | null

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }
}
