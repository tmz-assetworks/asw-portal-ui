import { animate, state, style, transition, trigger } from '@angular/animations'
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { AlertsService } from '../../alerts/alerts.service'

import 'jspdf'
declare let jsPDF: new () => any
@Component({
  selector: 'app-charger-event',
  templateUrl: './charger-event.component.html',
  styleUrls: ['./charger-event.component.scss'],
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
export class ChargerEventComponent implements OnInit {
  constructor(public _alertsService: AlertsService) {}
  ngOnInit(): void {
    // this.getAlertsList()
  }

  AlertList = [
    {
      OperatorType: 'CH01',
      Category: 'OCPP',
      MessageType: 'Boot Notification',
      Datetime: '2022-05-18 10:50:34',
      IpAddress: '123.987.10.66',
      LocationName: 'Washington',
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
      OperatorType: 'CH01',
      Category: 'OCPP',
      MessageType: 'Boot Notification',
      Datetime: '2022-05-18 10:50:34',
      IpAddress: '123.987.10.66',
      LocationName: 'Washington',
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
      OperatorType: 'CH01',
      Category: 'OCPP',
      MessageType: 'Boot Notification',
      Datetime: '2022-05-18 10:50:34',
      IpAddress: '123.987.10.66',
      LocationName: 'Washington',
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

  @ViewChild(MatPaginator) paginator!: MatPaginator

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    this.paginator._intl.itemsPerPageLabel = 'Rows per page'
  }

  dataSource = new MatTableDataSource<any>(this.AlertList)
  columnsToDisplay = ['Reset', 'Datetime', 'action']

  displayedColumns = ['Reset', 'Datetime', 'action']
  expandedElement!: any | null

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  /**
   * Get Alerts List
   */

  getAlertsList() {
    this._alertsService.getAlertsList().subscribe((res) => {
      // console.log(res)
    })
  }
}
