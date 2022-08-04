import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { OperatorService } from '../../admin/operator.service'
import { animate, state, style, transition, trigger } from '@angular/animations'
import 'jspdf'
declare let jsPDF: new () => any
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

@Component({
  selector: 'app-diagnostics',
  templateUrl: './diagnostics.component.html',
  styleUrls: ['./diagnostics.component.scss'],
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
export class DiagnosticsComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {
    // this.getAlertsList()
  }

  jsPDF: any

  fromHTML: any
  @ViewChild('pdfTable', { static: false })
  pdfTable!: ElementRef

  public downloadAsPDF() {
    const doc = new jsPDF()
    const specialElementHandlers = {
      '#editor': function (element: any, renderer: any) {
        return true
      },
    }
    const pdfTable = this.pdfTable.nativeElement
    doc.fromHTML(pdfTable.innerHTML, 15, 15, {
      width: 190,
      elementHandlers: specialElementHandlers,
    })
    doc.save('download.pdf')
  }

  DiagnosticsList = [
    {
      ChargeBoxId: 'Update Firmware',
      Category: 'OCPP',
      Datetime: '2022-05-18 10:50:34',
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
      ChargeBoxId: 'Update Firmware',
      Category: 'OCPP',
      Datetime: '2022-05-18 10:50:34',
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
      ChargeBoxId: 'Update Firmware',
      Category: 'OCPP',
      Datetime: '2022-05-18 10:50:34',
      RequestPayload: {
        Id: 3,
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
        Id: 4,
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
      ChargeBoxId: 'Update Firmware',
      Category: 'OCPP',
      Datetime: '2022-05-18 10:50:34',
      RequestPayload: {
        Id: 5,
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
        Id: 6,
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
      ChargeBoxId: 'Update Firmware',
      Category: 'OCPP',
      Datetime: '2022-05-18 10:50:34',
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
      ChargeBoxId: 'Update Firmware',
      Category: 'OCPP',
      Datetime: '2022-05-18 10:50:34',
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
      ChargeBoxId: 'Update Firmware',
      Category: 'OCPP',
      Datetime: '2022-05-18 10:50:34',
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
      ChargeBoxId: 'Update Firmware',
      Category: 'OCPP',
      Datetime: '2022-05-18 10:50:34',
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
      ChargeBoxId: 'Update Firmware',
      Category: 'OCPP',
      Datetime: '2022-05-18 10:50:34',
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
      ChargeBoxId: 'Update Firmware',
      Category: 'OCPP',
      Datetime: '2022-05-18 10:50:34',
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

  dataSource = new MatTableDataSource<any>(this.DiagnosticsList)
  columnsToDisplay = ['ChargeBoxId', 'Datetime', 'action']

  txt = 'hello world'

  displayedColumns = ['ChargeBoxId', 'Datetime', 'action']
  expandedElement!: any | null

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  /**
   * Get Alerts List
   */

  // getAlertsList() {
  //   this._alertsService.getAlertsList().subscribe((res) => {
  //     console.log(res)
  //   })
  // }

  /** Tool tip function */
  showToolTip = false

  viewToolTip() {
    this.showToolTip = !this.showToolTip

    // console.log("this is tool tip");
  }
}
