import { trigger, state, style, transition, animate } from '@angular/animations'
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { AlertsService } from 'src/app/screen/operator/alerts/alerts.service'
import { StorageService } from 'src/app/service/storage.service'
import { DiagnosticsService } from 'src/app/screen/operator/diagnostics/diagnostics.service'
import { ToastrService } from 'ngx-toastr'
import 'jspdf'
import { ChargerService } from 'src/app/screen/operator/charger/charger.service'
import { MatDialog } from '@angular/material/dialog'
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators,FormsModule} from '@angular/forms'
import { interval, map, Observable, startWith } from 'rxjs'
import { TransactionDialogComponent } from 'src/app/component/dashboard/transaction-dialog/transaction-dialog.component'
import { CommonModule, DatePipe } from '@angular/common'
import { Router, RouterModule } from '@angular/router';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'
import { ToolTipItemComponent } from '../diagnostic/tool-tip-item/tool-tip-item.component'
import { ToolTipComponent } from '../diagnostic/tool-tip/tool-tip.component'
import { DiagWidgetComponent } from '../diagnostic/diag-widget/diag-widget.component'
import { DiagWidgetBarComponent } from '../diagnostic/diag-widget-bar/diag-widget-bar.component'
import { MatDatetimepickerModule, MatNativeDatetimeModule } from '@mat-datetimepicker/core';
import { MatMomentDatetimeModule } from '@mat-datetimepicker/moment';
import { CustomPaginationComponent } from 'src/app/shared/custom-pagination/custom-pagination.component';
declare let jsPDF: new () => any
interface DiagnosticsRow {
  OperatorType: string;
  Datetime: string;
  action?: string;
}

@Component({
  selector: 'app-common-diagnostics',
  templateUrl: './common-diagnostics.component.html',
  styleUrls: ['./common-diagnostics.component.scss'],
  imports:[
   CommonModule,
    SharedMaterialModule,
    ToolTipItemComponent,
    ToolTipComponent,
    DiagWidgetComponent,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,         
    DiagWidgetBarComponent,
    MatDatetimepickerModule,
    MatMomentDatetimeModule,
    MatNativeDatetimeModule,
    CustomPaginationComponent
  ],
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
export class CommonDiagnosticsComponent implements OnInit {
  chargerName: string | null
  isFireWareItem = false
  isProvisioning = false
  isRemoteControl = false
  isSmartCharging = false
  isAuthorization = false
  isDiagnosticsItem = false
  isUnlock = false
  isCancelReservation = false
  isReserveNow = false
  isTriggerMess = false
  isDiagnostics = false
  isSendLocalListVersion = false
  isClearChargingProfile = false
  isSetCharging = false
  digitValidate = /^\d+$/
  chargerId: any = ''
  isTableHasData = false
  chargerType = ''
  commandType = ''
  connectorID: number = 0
  idTag = ''
  transactionId = -1
  inputKeyConfig = ''
  inputValueConfig = ''
  inputDurationValue = 0
  inputReserveTag = ''
  enterLocationValue = ''
  UserId: any
  selectConnectorIds: any
  totalCount: any
  pageSize: number = 10
  currentPage: number = 1
  totalPages: any
  pageSizeOptions = [10, 20, 100]
  reqMessType = ''
  expiryDate: any
  requestMessTypes: any
  selectedDate: any
  startDate: any
  endDate: any
  currentDate: any
  randomSixDigit: number = 0
  statusData: any
  updateDatas: any
  getListVersionForm: any
  localList = false
  localIdTag = false
  rfidExpDate: any
  minDate = new Date()
  vendorId = '0'
  messageId = '0'
  data = ''
  id = 0
  connectorId = 0
  clearChargingPurpose: any = ''
  stackLevel = 0
  isDataTransfer = false
  reserveNowDate = new FormControl()
  setChargingForm: any
  chargingProfilePurpose: any
  chargingProfileKind: any
  recurrencyKind: any
  chargingRateUnit: any
  numberPhases: any = [1, 2, 3]
  firstFields: boolean = false
  secondFields: boolean = false
  thirdFields: boolean = false
  remoteStartForm: any
  firstFieldsRemoteStart: boolean = false
  thirdFieldsRemoteStart: boolean = false
  secondFieldsRemoteStart: boolean = false
  GetConfigurationKey: string[] = [];
  keyTypeGetConfig: string = '';
  keyTypeChangeConfig: string = '';
  datePipe = new DatePipe('en-US')
  href: string = "";
  isChargerDiagnostics: boolean = true
  chargerBoxIdArr: any
  userTimeZone:any;
  assetId: string | null;
  jumpPageNumber: number = 1;
  isLoading = true;

  chargerDeteailTab = [
   
    {
      text: "CHARGER INFORMATION",
      link: "../chargers-info"

    },
    {
      text: "CHARGE SESSIONS",
      link: "../chargers-session"

    },
    {
      text: "DIAGNOSTIC",
      link: "../chargers-diagnostic"

    },
    {
      text: "EVENT LOGS",
      link: "../chargers-event"

    }
  ]
  constructor(
    public _alertsService: AlertsService,
    private readonly _storageService: StorageService,
    private readonly _diagnosticsService: DiagnosticsService,
    private readonly toastr: ToastrService,
    public _chargerService: ChargerService,
    public dialog: MatDialog,
    private readonly _fb: FormBuilder,
    private readonly router: Router
  ) {
    this.requestMessTypes = [
      'BootNotification',
      'DiagnosticsStatusNotification',
      'FirmwareStatusNotification',
      'Heartbeat',
      'MeterValues',
      'StatusNotification',
    ]
    this.statusData = [
      'Accepted',
      'Blocked',
      'Expired',
      'Invalid',
      'ConcurrentTx',
    ]
    this.updateDatas = ['Full', 'Differential']
    this.chargingProfilePurpose = this._diagnosticsService.getProfilePurpose()
    this.chargingProfileKind = this._diagnosticsService.getProfileKind()
    this.recurrencyKind = this._diagnosticsService.getrecurrencyKind()
    this.chargingRateUnit = this._diagnosticsService.getChargingRateUnit()
    this.currentDate = this._diagnosticsService.currentDate() + 'T00:00'
    this.UserId = this._storageService.getLocalData('user_id')
    this.userTimeZone=this._storageService.getLocalData('time_zone');
    this.assetId = this._storageService.getSessionData('assetId') ?? 'N/A';


    this.chargerName = this._storageService.getSessionData('chargerName')
  }
  ngOnInit(): void {
    if (this.router.url == '/operator/diagonstics' || this.router.url == '/admin/diagonstics') {
      this._storageService.removeSessionData('chargerBoxId')
      this.isChargerDiagnostics = false
      this.chargerId = ''
    } else {
      this.chargerId = this._storageService.getSessionData('chargerBoxId')
      this.isChargerDiagnostics = true
      this.getConnectorIds('')
    }
    this.href = this.router.url;
    this.GetChargeBoxIDList()
    this.getConfigurationKeyList();
    this.GetOcppEventLog()
    this.filteredStreets = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => (value && value.length >= 0 ? this._filter(value) : [])),
    )

    this.filteredStreets1 = this.control1.valueChanges.pipe(
      startWith(''),
      map((value) => (value && value.length >= 0 ? this._filter1(value) : [])),
    )

  }

allowedCommands = [
  'change',
  'reset',
  'start',
  'getconfig',
  'changeconfig',
  'getComposite',
  'unlock',
  'isCancelReservation',
  'isReserveNow',
  'triggerMessage',
  'updatefirmware',
  'sendlocal',
  'getdiagnostics',
  'datatransfer',
  'getClearCharging',
  'setCharging'
];

isCommand(type: string): boolean {
  return this.commandType === type;
}
isAnyCommand(types: string[]): boolean {
  return types.includes(this.commandType);
}

  jsPDF: any
  fromHTML: any
  showLoader = false
  count = 1
  intervalId: any

  @ViewChild('pdfTable', { static: false })
  pdfTable!: ElementRef

  @ViewChild('input') input: any
  @ViewChild('inputTag') inputTag: any
  @ViewChild('inputKey') inputKey: any
  @ViewChild('inputValue') inputValue: any
  @ViewChild('inputDuration') inputDuration: any
  @ViewChild('inputReserveTag') inputReserveTagValue: any
  @ViewChild('inputretries') inputretriesValue: any
  @ViewChild('enterLocation') enterLocation: any
  @ViewChild('vendrId') vendrId: any
  @ViewChild('msgId') msgId: any
  @ViewChild('addData') addData: any
  @ViewChild('clearChargingId') clearChargingId: any
  @ViewChild('connectrId') connectrId: any
  @ViewChild('clearChargingPurpos') clearChargingPurpos: any
  @ViewChild('stakLevel') stakLevel: any

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

  @ViewChild('picker1') picker1: any
  
  viewCharger(data: any) {
    this._storageService.setSessionData('chargerBoxId', data.chargerBoxId)
    this._storageService.setSessionData('chargerName', data.chargerName)
  }

  
  dataSource = new MatTableDataSource<DiagnosticsRow>([])

  displayedColumns = ['OperatorType', 'Datetime', 'action']
  expandedElement: DiagnosticsRow  | null =null

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }



onPageSizeChange(size: number): void {
  this.pageSize = size;
  this.currentPage = 1;
  this.jumpPageNumber = 1;
  this.GetOcppEventLog();
}

public  updatePage(page: number): void {

  if (page < 1 || page > this.totalPages) return;

  if (page === this.currentPage) return;

  this.currentPage = page;
  this.jumpPageNumber = page;

  this.GetOcppEventLog();
}

  /**
 * Get Charger List
 */

  GetChargeBoxIDList() {
    this._chargerService.GetChargeBoxIDList().subscribe((res) => {
      this.chargerBoxIdArr = res.data
      this.streets = res.data
    })
  }

  getConfigurationKeyList(){
    this._diagnosticsService.GetConfigurationKey().subscribe(
      (response) => {
        this.GetConfigurationKey = response?.key;
        this.streets1=response?.key;

      },
      (error) => {
        console.error('Error fetching dropdown data', error);
      }
    );
  }



  viewToolTip(tileType: string) {
    if (tileType == 'fireware') {
      this.isFireWareItem = true
      this.isProvisioning = false
      this.isRemoteControl = false
      this.isSmartCharging = false
      this.isAuthorization = false
      this.isDiagnosticsItem = false
    } else if (tileType == 'provisioning') {
      this.control1.reset();
      this.isFireWareItem = false
      this.isProvisioning = true
      this.isRemoteControl = false
      this.isSmartCharging = false
      this.isAuthorization = false
      this.isDiagnosticsItem = false
    } else if (tileType == 'remoteControl') {
      this.isFireWareItem = false
      this.isProvisioning = false
      this.isSmartCharging = false
      this.isRemoteControl = true
      this.isAuthorization = false
      this.isDiagnosticsItem = false
    } else if (tileType == 'smartcharging') {
      this.isFireWareItem = false
      this.isProvisioning = false
      this.isRemoteControl = false
      this.isSmartCharging = true
      this.isAuthorization = false
      this.isDiagnosticsItem = false
    } else if (tileType == 'authorization') {
      this.isFireWareItem = false
      this.isProvisioning = false
      this.isRemoteControl = false
      this.isSmartCharging = false
      this.isAuthorization = true
      this.isDiagnosticsItem = false
    } else if (tileType == 'diagnostics') {
      this.isFireWareItem = false
      this.isProvisioning = false
      this.isRemoteControl = false
      this.isSmartCharging = false
      this.isAuthorization = false
      this.isDiagnosticsItem = true
      this.isTriggerMess = false
    } else if (tileType == 'isDataTransfer') {
      this.isGetLocalListVersion = false
      this.isSendLocalListVersion = false
      this.isDataTransfer = true
      this.isGetConfig = false
      this.isReset = false
      this.isClearCache = false
      this.isChangeConfiguration = false
      this.isRemoteStopTransaction = false
      this.isChangeAvailability = false
      this.isRemoteStartTransaction = false
      this.isGetCompositeSchedule = false
      this.isUnlock = false
      this.isCancelReservation = false
      this.isReserveNow = false
      this.isDiagnosticsItem = false
      this.isDiagnostics = false
      this.isUpdateFirmware = false
    }
  }
  /**
   * Get Configurations
   */


  getConfiguration(cmdType: string) {
    
    this.count = 1;
    if (this.handleCommandType(cmdType)) return;

    if (!this.isChargerValid()) return;

    if (this.keyTypeGetConfig === "") {
      this.keyTypeGetConfig=this.control1.value??"";
    }

    const pBody = {
      key: [this.keyTypeGetConfig],
    };

    this._diagnosticsService.GetConfiguration(this.chargerId, pBody).subscribe({
      next: (res: any) => {
        this.showLoader = true;
        if (res) {
          this.showLoader = false;
          this.isProvisioning = false;
          this.isGetConfig = false;
          this.setCallFunction(res);
          this.keyTypeGetConfig = '';
        }
      },
      error: (error: any) => {
        this.showLoader = false;
        this.handleError(error);
      },
    });
  }

  handleCommandType(cmdType: string) {
    switch (cmdType) {
      case 'changeconfig':
        this.changeConfiguration();
        return true;
      case 'getComposite':
        this.getCompositeSchedule();
        return true;
      case 'getdiagnostics':
        this.getDiagnosticsCmd();
        return true;
      case 'datatransfer':
        this.dataTransferCmd();
        return true;
      case 'getClearCharging':
        this.getClearChargingProfile();
        return true;
      case 'change':
        this.changeAvailability(this.chargerType, this.connectorID);
        return true;
      case 'reset':
        this.reset(this.chargerType);
        return true;
      case 'unlock':
        this.unlock(this.connectorID);
        return true;
      case 'isCancelReservation':
        this.cancelReservation();
        return true;
      case 'isReserveNow':
        this.reserveNow(this.connectorID);
        return true;
      case 'triggerMessage':
        this.triggerMessage(this.connectorID);
        return true;
      case 'updatefirmware':
        this.updateFirmware(this.connectorID);
        return true;
      default:
        return false;
    }
  }

  isChargerValid() {
    if (this.chargerId === '') {
      this.toastr.error('Please Enter Charger Id');
      return false;
    } else if (!this.hasChargerBoxId()) {
      this.toastr.error('Invalid Charge Box id');
      return false;
    }
    return true;
  }


  /**
   * Clear Cache
   */
  clearCache() {
    this.count = 1
    if (this.chargerId == '') {
      this.toastr.error('Please Enter Charger Id')
      return
    } else if (!this.hasChargerBoxId()) {
      this.toastr.error('Invalid Charge Box id')
      return
    }
    const pBody = {}
    this._diagnosticsService.ClearCache(this.chargerId, pBody).subscribe({
      next: (res: any) => {
        this.showLoader = true
        if (res) {
          this.showLoader = false
          this.isProvisioning = false
          this.isClearCache = false
          this.setCallFunction(res)
        }
      },
      error: (error: any) => {
        this.showLoader = false
        this.handleError(error)
      },
    })
  }

  /**
   * Reset
   */
  reset(chargerType: string) {
    if (this.chargerId == '') {
      this.toastr.error('Please Enter Charger Id')
      return
    } else if (!this.hasChargerBoxId()) {
      this.toastr.error('Invalid Charge Box id')
      return
    } else if (this.chargerType == '') {
      this.toastr.error('Please Select Type')
      return
    }

    const pBody = {
      type: chargerType,
    }

    this._diagnosticsService.Reset(this.chargerId, pBody).subscribe({
      next: (res) => {
        this.showLoader = true
        if (res) {
          this.showLoader = false
          this.isProvisioning = false
          this.isReset = false
          this.setCallFunction(res)
        }
      },
      error: (error: any) => {
        this.showLoader = false
        this.handleError(error)
      },
    })
  }

  /**
   * Get Ocpp Event Log List
   */
GetOcppEventLog(): void {

  const body = {
    pageNumber: this.currentPage,
    pageSize: this.pageSize,
    searchParam: '',
    orderBy: '',
    locationIds: [] as number[],
    opratorid: this.UserId,
    chargerBoxIds: this.chargerId ? [this.chargerId.toString()] : []
  };

  this.isLoading = true;

  this._diagnosticsService
    .GetEventLogByLocation(body)
    .subscribe({
      next: (res: any) => {

        const data = res?.data ?? [];
        const pagination = res?.paginationResponse ?? {};

        this.commandType = '';
        this.dataSource.data = data;

        this.totalCount = pagination.totalCount ?? 0;
        this.totalPages = pagination.totalPages ?? 0;
        this.pageSize = pagination.pageSize ?? this.pageSize;

        this.jumpPageNumber = this.currentPage;
        this.isTableHasData = data.length > 0;

        this.isLoading = false;
      },
      error: (err) => {
        console.error('OCPP API Error:', err);
        this.dataSource.data = [];
        this.totalCount = 0;
        this.totalPages = 0;
        this.isTableHasData = false;
        this.isLoading = false;
      }
    });
}

  /**
   * changeConfiguration
   */
  changeConfiguration() {

    this.inputValueConfig = ''
    if (this.chargerId == '') {
      this.toastr.error('Please Enter Charger Id')
      return
    } 
    if (!this.hasChargerBoxId()) {
      this.toastr.error('Invalid Charge Box id')
      return
    }
     if (this.keyTypeChangeConfig == '' || this.control1.value=="") {
      this.keyTypeChangeConfig=this.control1.value??"";
      if(this.keyTypeChangeConfig==''){
        this.toastr.error('Please Select key')
      return
      }
    }
     if (this.inputValue.nativeElement.value.length == 0) {
      this.toastr.error('Please Enter Value')
      
    } else if (this.inputValue.nativeElement.value.length > 500) {
      this.toastr.error('Value Must Be Less Than 500 Characters')
    }else{
      this.inputValueConfig = this.inputValue.nativeElement.value
      const pBody = {
        key: this.keyTypeChangeConfig,
        value: this.inputValueConfig,
      }
  
      this._diagnosticsService
        .changeConfiguration(this.chargerId, pBody)
        .subscribe({
          next: (res) => {
            this.showLoader = true
            if (res) {
              this.showLoader = false
              this.isProvisioning = false
              this.setCallFunction(res)
              this.keyTypeChangeConfig = ''
            }
          },
          error: (error: any) => {
            this.showLoader = false
          },
        })
    }
  }

  /**
   * changeAvailability
   */
  changeAvailability(chargerType: string, connectorID: any) {
    this.count = 1
    if (this.chargerId == '') {
      this.toastr.error('Please Enter Charger Id')
      return
    } else if (!this.hasChargerBoxId()) {
      this.toastr.error('Invalid Charge Box id')
      return
    } else if (this.chargerType == '') {
      this.toastr.error('Please Select Type')
      return
    }
    const pBody = {
      connectorId: connectorID,
      type: chargerType,
    }

    this._diagnosticsService
      .ChangeAvailability(this.chargerId, pBody)
      .subscribe({
        next: (res) => {
          this.showLoader = true
          this.commandType = ''
          if (res) {
            this.showLoader = false
            this.isProvisioning = false
            this.isChangeAvailability = false
            this.setCallFunction(res)
          }
        },
        error: (error: any) => {
          this.showLoader = false
          this.handleError(error)
        },
      })
  }

  /**
   * Close Popup
   */
  closePopup() {
    this.randomSixDigit = 0
    this.commandType = ''
    this.isProvisioning = false
    this.isRemoteControl = false
    this.isSmartCharging = false
    this.isAuthorization = false
    this.isClearCache = false
    this.isGetConfig = false
    this.isReset = false
    this.isChangeConfiguration = false
    this.isChangeAvailability = false
    this.isFireWareItem = false
    this.isDiagnosticsItem = false
    this.isDataTransfer = false
    this.isUpdateFirmware = false
    this.isReserveNow = false
    this.isUnlock = false
    this.isCancelReservation = false
    this.isTriggerMess = false
    this.isRemoteStartTransaction = false
    this.isGetLocalListVersion = false
    this.isSendLocalListVersion = false
    this.isDiagnostics = false
    this.localList = false
    this.localIdTag = false
  }

  /**
   * Remote Start Transaction
   */

  remoteStartTransaction() {
    this.count = 1;
    this.idTag = this.inputTag.nativeElement.value;

    if (!this.isChargerAndRFIDValid()) return;
    if (this.firstFieldsRemoteStart && !this.isRemoteStartTransactionDataValid()) return;

    const pBody = this.getTransactionPayload();

    this.showLoader = true;
    this._diagnosticsService.RemoteStartTransaction(this.chargerId, pBody).subscribe({
      next: (res) => {
        this.showLoader = false;
        this.isRemoteControl = false;
        this.isRemoteStartTransaction = false;
        this.setCallFunction(res);
      },
      error: (error) => {
        this.showLoader = false;
        if (this.isErrorFromRemoteStart(error)) {
          this.toastr.error(JSON.stringify(error.error.error));
        }
      },
    });
  }

  isChargerAndRFIDValid() {
    if (this.chargerId === '') {
      this.toastr.error('Please Enter Charger Id');
      return false;
    } else if (this.idTag === '') {
      this.toastr.error('Please Enter RFID');
      return false;
    } else if (this.idTag.length > 20) {
      this.toastr.error('RFID Must Be Less Than 20 Characters');
      return false;
    }
    return true;
  }

  isRemoteStartTransactionDataValid() {
    const remoteStartTransactionData = this.remoteStartForm.value.chargingProfile;

    const fields = [
      { field: remoteStartTransactionData.chargingProfileId, message: 'Please Enter Charging Profile Id' },
      { field: remoteStartTransactionData.transactionId, message: 'Please Enter Transaction Id' },
      { field: remoteStartTransactionData.stackLevel, message: 'Please Enter Stack Level' },
      { field: remoteStartTransactionData.chargingProfilePurpose, message: 'Please Select Charging Profile Purpose' },
      { field: remoteStartTransactionData.chargingProfileKind, message: 'Please Select Charging Profile Kind' },
      { field: remoteStartTransactionData.chargingRateUnit, message: 'Please Select Charging Rate Unit' },
      { field: remoteStartTransactionData.startPeriod, message: 'Please Enter Start Period' },
      { field: remoteStartTransactionData.limit, message: 'Please Enter Limit' },
    ];

    for (const { field, message } of fields) {
      if (!field) {
        this.toastr.error(message);
        return false;
      }
    }

    return true;
  }

  getTransactionPayload() {
    const remoteStartTransactionData = this.remoteStartForm.value.chargingProfile;

    return this.firstFieldsRemoteStart ? {
      connectorId: this.getValue(this.remoteStartForm.value.connectorId),
      idTag: this.remoteStartForm.value.idTag,
      chargingProfile: this.getChargingProfilePayload(remoteStartTransactionData)
    } : {
      connectorId: this.getValue(this.remoteStartForm.value.connectorId),
      idTag: this.remoteStartForm.value.idTag,
    };
  }

  getChargingProfilePayload(remoteStartTransactionData: any) {
    return {
      chargingProfileId: +remoteStartTransactionData.chargingProfileId,
      transactionId: this.getValue(remoteStartTransactionData.transactionId),
      stackLevel: +remoteStartTransactionData.stackLevel,
      chargingProfilePurpose: remoteStartTransactionData.chargingProfilePurpose,
      chargingProfileKind: remoteStartTransactionData.chargingProfileKind,
      recurrencyKind: remoteStartTransactionData.recurrencyKind,
      validFrom: this.convertToIsoIfValid(remoteStartTransactionData.validFrom),
      validTo: this.convertToIsoIfValid(remoteStartTransactionData.validTo),
      chargingSchedule: this.getChargingSchedulePayload(remoteStartTransactionData)
    };
  }

  getChargingSchedulePayload(remoteStartTransactionData: any) {
    return {
      duration: this.getValue(remoteStartTransactionData.duration),
      startSchedule: this.convertToIsoIfValid(remoteStartTransactionData.startSchedule),
      chargingRateUnit: remoteStartTransactionData.chargingRateUnit,
      chargingSchedulePeriod: {
        startPeriod: this.getValue(remoteStartTransactionData.startPeriod),
        limit: this.getValue(remoteStartTransactionData.limit),
        numberPhases: this.getValue(remoteStartTransactionData.numberPhases),
      },
      minChargingRate: this.getValue(remoteStartTransactionData.minChargingRate),
    };
  }

  convertToIsoIfValid(date: any) {
    return date ? this._diagnosticsService.convertToUTC(date) : undefined;
  }

  getValue(value: any) {
    return value ? +value : undefined;
  }

  isErrorFromRemoteStart(error: any) {
    return error?.url?.includes('RemoteStartTransaction') && error?.error;
  }

  /**
   * Get Composite Schedule
   */

  getCompositeSchedule() {
    this.count = 1
    this.inputDurationValue = 0
    if (this.chargerId == '') {
      this.toastr.error('Please Enter Charger Id')
      return
    } else if (!this.hasChargerBoxId()) {
      this.toastr.error('Invalid Charge Box id')
      return
    }
    if (
      this.inputDuration.nativeElement.value.length == 0 ||
      this.inputDuration.nativeElement.value == 0
    ) {
      this.toastr.error('Duration Must Be Greater Than 0')
      return
    }
    this.inputDurationValue = this.inputDuration.nativeElement.value

    let pBody = this.charingRateUnit
      ? {
        connectorId: this.connectorID,
        duration: this.inputDurationValue,
        chargingRateUnit: this.charingRateUnit,
      }
      : { connectorId: this.connectorID, duration: this.inputDurationValue }

    this._diagnosticsService
      .GetCompositeSchedule(this.chargerId, pBody)
      .subscribe({
        next: (res) => {
          this.commandType = ''
          this.showLoader = true

          if (res) {
            this.showLoader = false
            this.isSmartCharging = false
            this.isGetCompositeSchedule = false
            this.setCallFunction(res)
          }
        },
        error: (error: any) => {
          this.showLoader = false
          this.handleError(error)
        },
      })
  }

  /**
   * Get LocalListVersion
   */
  getLocalListVersion() {
    if (this.chargerId == '') {
      this.toastr.error('Please Enter Charger Id')
      return
    } else if (!this.hasChargerBoxId()) {
      this.toastr.error('Invalid Charge Box id')
      return
    }
    const pBody = {}

    this._diagnosticsService
      .getLocalListVersion(this.chargerId, pBody)
      .subscribe({
        next: (res: any) => {
          this.showLoader = true
          if (res) {
            this.showLoader = false
            this.isAuthorization = false
            this.isGetLocalListVersion = false
            this.setCallFunction(res)
          }
        },
        error: (error: any) => {
          this.showLoader = false
          this.handleError(error)
        },
      })
  }
  /**
   * Close Popup Type
   */
  closePopupType() {
    this.commandType = ''
  }

  showMessage(cmdType: string) {
    this.connectorID = 0 // Reset connector id
    if (this.chargerId == '') {
      this.toastr.error('Please Enter Charger Id')
      return
    } else if (!this.hasChargerBoxId()) {
      this.toastr.error('Invalid Charge Box id')
      return
    }

    this.commandType = cmdType
    if (this.commandType == 'sendlocal') {
      // CHECK FOR GETLOCAL 29 SEPT 2022
      this.getListVersionForm = new FormGroup({
        listVersion: new FormControl(''),
        updateType: new FormControl(''),
        listTagControls: new FormArray([]),
        idTagControls: new FormArray([]),
      })
    }

    if (this.commandType == 'setCharging') {
      this.createSetCharging()
    }

    if (this.commandType == 'start') {
      this.remoteStart()
    }

    if (
      this.commandType == 'start' ||
      this.commandType == 'unlock' ||
      this.commandType == 'isReserveNow' ||
      this.commandType == 'triggerMessage'
    ) {
      this.getConnectorIds('remoteStart')
    } else {
      this.getConnectorIds('')
    }
  }
  newLocalList(date: any, rfid: any, status: any): FormGroup {
    return new FormGroup({
      localListDate: new FormControl(date),
      rfid: new FormControl(rfid),
      status: new FormControl(status),
    })
  }

  newListTag(idTag: any): FormGroup {
    return new FormGroup({
      idTag: new FormControl(idTag),
    })
  }

  getListTagFormControls(): any {
    return (this.getListVersionForm.get('listTagControls') as FormArray)
      .controls
  }

  getIdFormControls(): any {
    return (this.getListVersionForm.get('idTagControls') as FormArray).controls
  }

  addListTag(fbGroup?: FormGroup): void {
    this.localList = true
      ; (this.getListVersionForm.get('listTagControls') as FormArray).push(
        fbGroup || this.newListTag(''),
      )
  }

  addLocalList(fbGroup?: FormGroup): void {
    let rfid = ''
    this.showLoader = true
    this.localIdTag = true

    if (
      this.getListVersionForm.value.listTagControls !== undefined &&
      this.getListVersionForm.value.listTagControls[0].idTag !== undefined
    ) {
      rfid = this.getListVersionForm.value.listTagControls[0].idTag.trim()
    }
    if (rfid == '') {
      this.toastr.error('Please Enter Id Tag')
      this.localIdTag = false
      this.showLoader = false
    } else {
      // CALL API TO BIND DATE
      this._diagnosticsService.getDate(rfid).subscribe({
        next: (res) => {
          this.showLoader = false
          this.rfidExpDate = res.expiryDate
            ; (this.getListVersionForm.get('idTagControls') as FormArray).push(
              fbGroup || this.newLocalList(this.rfidExpDate, '', ''),
            )
        },
        error: (error) => {
          this.showLoader = false
          this.handleError(error)
        },
      })
    }
  }

  submit() {
    const formField = this.getListVersionForm.value.idTagControls[0]
    const listField = this.getListVersionForm.value.listTagControls[0]
    let listVersion = this.getListVersionForm.value.listVersion.trim()
    if (listVersion == '') {
      this.toastr.error('Please Enter List Version')
    } else if (!this.digitValidate.test(listVersion)) {
      this.toastr.error('Please Enter Only Number For List Version')
    } else if (listVersion == 0) {
      this.toastr.error('Please Enter Number Greater Than 0 For List Version')
      return
    } else if (formField !== undefined && formField.status == '') {
      this.toastr.error('Please Select Status')
      return
    } else if (this.getListVersionForm.value.updateType == '') {
      this.toastr.error('Please Select Update Type')
      return
    }

    const body = {
      listVersion: listVersion,
      localAuthorizationList: {
        idTag: listField?.idTag ?? '',
        idTagInfo: {
          expiryDate: formField?.localListDate ?? '', // expiryDate
          parentIdTag: formField?.rfid?? '',
          status: formField?.status?? '',
        },
      },
      updateType: this.getListVersionForm.value.updateType,
    }

    this._diagnosticsService.sendLocalList(this.chargerId, body).subscribe({
      next: (res) => {
        this.showLoader = true
        if (res) {
          this.showLoader = false
          this.isAuthorization = false
          this.commandType = ''
          this.isSendLocalListVersion = false
          this.localList = false
          this.localIdTag = false
          this.setCallFunction(res)
        }
      },
      error: (error: any) => {
        this.showLoader = false
        this.handleError(error)
      },
    })
  }

  selectOption(event: any) {
    this.chargerType = ''
    this.chargerType = event.target.value
    if (this.chargerType == '') {
      this.toastr.error('Please Select Type')
    }
  }
  selectOptionKey(event: any, value:any, type: string) {
    if(event.isUserInput){
      if (type === 'getConfig') {
        this.keyTypeGetConfig = value;
      } else if (type === 'changeConfig') {
        this.keyTypeChangeConfig = value;
        // Handle changeConfig logic
        if (this.keyTypeChangeConfig == "") {
          this.toastr.error('Please Select Configuration Key');
        }
  
      }
    }
 
    // Determine which config type is being updated
   

  }

  showAllOption(): boolean {
    return this.GetConfigurationKey.some((item) => item !== null && item !== undefined);
  }
  charingRateUnit = ''
  selectChargingRateUnit(event: any) {
    this.charingRateUnit = ''
    this.charingRateUnit = event.target.value
  }

  selectConnectorID(event: any) {
    this.connectorID = 0
    this.connectorID = event.target.value
    if (
      this.connectorID == 0 &&
      this.commandType !== 'change' &&
      this.commandType !== 'getComposite' &&
      this.commandType !== 'isReserveNow'
    ) 
    {
      this.toastr.error('Please Select Connector ID')
    }
  }
  selectRequestMessage(event: any) {
    this.reqMessType = event.target.value
    if (this.reqMessType == '') {
      this.toastr.error('Please Select RequestMessage')
    }
  }
  /**
   * Remote Stop Transaction
   */

  remoteStopTransaction() {
    this.commandType = ''
    this.count = 1
    if (this.chargerId == '') {
      this.toastr.error('Please Enter Charger Id')
      return
    } else if (!this.hasChargerBoxId()) {
      this.toastr.error('Invalid Charge Box id')
      return
    }
    const pBody = {}
    this._diagnosticsService
      .RemoteStopTransaction(this.chargerId, pBody)
      .subscribe({
        next: (res) => {
          this.showLoader = true
          if (res) {
            this.showLoader = false
            this.isRemoteControl = false
            this.isRemoteStopTransaction = false
            this.setCallFunction(res)
          }
        },
        error: (error: any) => {
          this.showLoader = false
          this.handleError(error)
        },
      })
  }

  /** GET CONNECTOR ID */
  getConnectorIds(type: any) {
    if (this.chargerId == '') {
      this.toastr.error('Please Enter Charger Id')
      // return
    }
    const pBody = {
      chargeBoxId: this.chargerId,
      operatorId: this.UserId,
    }
    this._diagnosticsService.getConnectorId(pBody).subscribe({
       next: (res) => {
         if (
           (type === 'remoteStart' ||
             type === 'unlock' ||
             type === 'triggerMessage') &&
           type !== ''
         ) {
           if (res.data.connectorIds !== '') {
             this.selectConnectorIds = res.data.connectorIds
               .split(',')
               .map((element: string) => element.trim());
           }
         } 
         else if (res.data.connectorIds === '') {
           res.data.connectorIds = 0;
         } 
         else {
           this.selectConnectorIds = res.data.connectorIds
             .split(',')
             .map((element: string) => element.trim());

           this.selectConnectorIds.unshift(0);
         }
       },
       error: (err) => {
         // handle error if needed
       }
    });

  }
  setCallFunction(cmsRequestPayload: any) {
    const source = interval(3000)
    this.showLoader = true
    this.toastr.success(JSON.stringify(cmsRequestPayload))
    const subscribe = source.subscribe((val) => {
      if (val <= 2) {
        this._diagnosticsService
          .CmsReply(cmsRequestPayload)
          .subscribe((res) => {
            if (res.status === 'Accepted') {
              let msg = res
              subscribe.unsubscribe()
              this.showLoader = false
              this.toastr.success(JSON.stringify(msg))
              this.GetOcppEventLog()
            } 
            else {
              subscribe.unsubscribe()
              this.showLoader = false
              let msg = res
              this.toastr.error(JSON.stringify(msg))
              this.GetOcppEventLog()
            }
          })
      } else {
        this.showLoader = false
        subscribe.unsubscribe()
        this.toastr.error('No response from charger.')
      }
    })
  }


  /****************************************** Sub Tool Tip background Color function****************************************************** */
  isGetConfig = false
  isClearCache = false
  isReset = false
  isChangeConfiguration = false
  isChangeAvailability = false
  isRemoteStopTransaction = false
  isRemoteStartTransaction = false
  isGetCompositeSchedule = false
  isGetLocalListVersion = false
  isUpdateFirmware = false
  isPublishFirmware = false


  viewToolTipTtem(type: any) {
    this.control1.reset();
    if (this.chargerId === '') {
      return;
    }

    const typeActionMap = this.getTypeActionMap();
    const action = typeActionMap[type];
    if (action) {
      action();
    }
  }

  getTypeActionMap(): { [key: string]: () => void } {
    return {
      isGetConfig: () => this.isGetConfigShow(),
      isClearCache: () => this.isClearCacheShow(),
      isReset: () => this.isResetShow(),
      isChangeConfiguration: () => this.isChangeConfigurationShow(),
      isChangeAvailability: () => this.isChangeAvailabilityShow(),
      isRemoteStopTransaction: () => this.isRemoteStopTransactionShow(),
      isRemoteStartTransaction: () => this.isRemoteStartTransactionShow(),
      isGetCompositeSchedule: () => this.isGetCompositeScheduleShow(),
      isGetLocalListVersion: () => this.isGetLocalListVersionShow(),
      isSendLocalListVersion: () => this.isSendLocalListVersionShow(),
      updatefirmware: () => this.isUpdateFirmwarShow(),
      isPublishFirmware: () => {
        this.isPublishFirmware = true;
        this.isUpdateFirmware = false;
      },
      isUnlock: () => this.isUnlockShow(),
      isCancelReservation: () => this.isCancelReservationShow(),
      isReserveNow: () => this.isReserveNowShow(),
      triggerMessage: () => this.triggerMessageShow(),
      getdiagnostics: () => this.getDiagnosticsShow(),
      isDataTransfer: () => this.isDataTransferShow(),
      isClearChargingProfile: () => this.isClearChargingProfileShow(),
      setCharging: () => this.setChargingShow(),
    };
  }





  setChargingShow() {
    this.isGetLocalListVersion = false
    this.isSendLocalListVersion = false
    this.isDataTransfer = false
    this.firstFields = false
    this.secondFields = false
    this.thirdFields = false
    this.isGetConfig = false
    this.isReset = false
    this.isClearCache = false
    this.isChangeConfiguration = false
    this.isRemoteStopTransaction = false
    this.isChangeAvailability = false
    this.isRemoteStartTransaction = false
    this.isGetCompositeSchedule = false
    this.isClearChargingProfile = false
    this.isUnlock = false
    this.isCancelReservation = false
    this.isReserveNow = false
    this.isDiagnosticsItem = false
    this.isDiagnostics = false
    this.isUpdateFirmware = false
    this.isSetCharging = true
    this._storageService.setSessionData('start', 'true')
  }

  isClearChargingProfileShow() {
    this.isClearChargingProfile = true
    this.isGetLocalListVersion = false
    this.isSendLocalListVersion = false
    this.isRemoteStopTransaction = false
    this.isRemoteStartTransaction = false
    this.isChangeAvailability = false
    this.isGetConfig = false
    this.isReset = false
    this.isDataTransfer = false
    this.isClearCache = false
    this.isChangeConfiguration = false
    this.isGetCompositeSchedule = false
    this.isUnlock = false
    this.isCancelReservation = false
    this.isReserveNow = false
    this.isDiagnosticsItem = false
    this.isDiagnostics = false
    this.isUpdateFirmware = false
    this.isSetCharging = false
    this._storageService.removeSessionData('start')
  }

  isDataTransferShow() {
    this.isDataTransfer = true
    this.isUpdateFirmware = false
    this.isGetLocalListVersion = true
    this.isSendLocalListVersion = false
    this.isClearChargingProfile = false
    this.isRemoteStopTransaction = false
    this.isRemoteStartTransaction = false
    this.isChangeAvailability = false
    this.isGetConfig = false
    this.isReset = false
    this.isClearCache = false
    this.isChangeConfiguration = false
    this.isGetCompositeSchedule = false
    this.isUnlock = false
    this.isCancelReservation = false
    this.isReserveNow = false
    this.isDiagnosticsItem = false
    this.isTriggerMess = false
    this.isDiagnostics = true
    this.isSetCharging = false
    this._storageService.removeSessionData('start')
  }

  getDiagnosticsShow() {
    this.isUpdateFirmware = false
    this.isGetLocalListVersion = true
    this.isSendLocalListVersion = false
    this.isRemoteStopTransaction = false
    this.isRemoteStartTransaction = false
    this.isChangeAvailability = false
    this.isGetConfig = false
    this.isDataTransfer = false
    this.isReset = false
    this.isClearChargingProfile = false
    this.isClearCache = false
    this.isChangeConfiguration = false
    this.isGetCompositeSchedule = false
    this.isUnlock = false
    this.isCancelReservation = false
    this.isReserveNow = false
    this.isDiagnosticsItem = false
    this.isTriggerMess = false
    this.isDiagnostics = true
    this.isSetCharging = false
    this._storageService.removeSessionData('start')
  }


  triggerMessageShow() {
    this.isUpdateFirmware = false
    this.isGetLocalListVersion = false
    this.isTriggerMess = true
    this.isSendLocalListVersion = false
    this.isDataTransfer = false
    this.isRemoteStopTransaction = false
    this.isRemoteStartTransaction = false
    this.isChangeAvailability = false
    this.isGetConfig = false
    this.isReset = false
    this.isClearCache = false
    this.isClearChargingProfile = false
    this.isChangeConfiguration = false
    this.isGetCompositeSchedule = false
    this.isUnlock = false
    this.isCancelReservation = false
    this.isReserveNow = false
    this.isTriggerMess = true
    this.isDiagnostics = false
    this.isSetCharging = false
    this._storageService.removeSessionData('start')
  }

  isReserveNowShow() {
    const array = new Uint32Array(1);
    globalThis.crypto.getRandomValues(array);
    this.randomSixDigit = 100000 + (array[0] % 900000);
    this.isGetLocalListVersion = false
    this.isSendLocalListVersion = false
    this.isRemoteStopTransaction = false
    this.isRemoteStartTransaction = false
    this.isChangeAvailability = false
    this.isDataTransfer = false
    this.isGetConfig = false
    this.isClearChargingProfile = false
    this.isReset = false
    this.isClearCache = false
    this.isChangeConfiguration = false
    this.isGetCompositeSchedule = false
    this.isUnlock = false
    this.isCancelReservation = false
    this.isReserveNow = true
    this.isDiagnosticsItem = false
    this.isDiagnostics = false
    this.isUpdateFirmware = false
    this.isSetCharging = false
    this._storageService.removeSessionData('start')
  }

  isCancelReservationShow() {
    this.isGetLocalListVersion = false
    this.isSendLocalListVersion = false
    this.isRemoteStopTransaction = false
    this.isRemoteStartTransaction = false
    this.isChangeAvailability = false
    this.isGetConfig = false
    this.isReset = false
    this.isClearChargingProfile = false
    this.isClearCache = false
    this.isDataTransfer = false
    this.isChangeConfiguration = false
    this.isGetCompositeSchedule = false
    this.isUnlock = false
    this.isCancelReservation = true
    this.isDiagnosticsItem = false
    this.isReserveNow = false
    this.isDiagnostics = false
    this.isUpdateFirmware = false
    this.isSetCharging = false
    this._storageService.removeSessionData('start')
  }

  isUnlockShow() {
    this.isGetLocalListVersion = false
    this.isSendLocalListVersion = false
    this.isClearChargingProfile = false
    this.isRemoteStopTransaction = false
    this.isRemoteStartTransaction = false
    this.isChangeAvailability = false
    this.isGetConfig = false
    this.isReset = false
    this.isClearCache = false
    this.isDataTransfer = false
    this.isChangeConfiguration = false
    this.isGetCompositeSchedule = false
    this.isUnlock = true
    this.isDiagnosticsItem = false
    this.isCancelReservation = false
    this.isReserveNow = false
    this.isDiagnostics = false
    this.isUpdateFirmware = false
    this.isSetCharging = false
    this._storageService.removeSessionData('start')

  }


  isUpdateFirmwarShow() {
    this.isUpdateFirmware = true
    this.isPublishFirmware = false
    this.isGetLocalListVersion = false
    this.isDataTransfer = false
    this.isSendLocalListVersion = false
    this.isRemoteStopTransaction = false
    this.isClearChargingProfile = false
    this.isRemoteStartTransaction = false
    this.isChangeAvailability = false
    this.isGetConfig = false
    this.isReset = false
    this.isClearCache = false
    this.isChangeConfiguration = false
    this.isGetCompositeSchedule = false
    this.isUnlock = false
    this.isDiagnosticsItem = false
    this.isCancelReservation = false
    this.isReserveNow = false
    this.isDiagnostics = false
    this.isSetCharging = false
    this._storageService.removeSessionData('start')
  }

  isSendLocalListVersionShow() {
    this.isGetLocalListVersion = false
    this.isRemoteStopTransaction = false
    this.isRemoteStartTransaction = false
    this.isDataTransfer = false
    this.isChangeAvailability = false
    this.isGetConfig = false
    this.isClearChargingProfile = false
    this.isReset = false
    this.isClearCache = false
    this.isChangeConfiguration = false
    this.isGetCompositeSchedule = false
    this.isUnlock = false
    this.isCancelReservation = false
    this.isReserveNow = false
    this.isDiagnosticsItem = false
    this.isDiagnostics = false
    this.isSendLocalListVersion = true
    this.isUpdateFirmware = false
    this.localList = false
    this.localIdTag = false
    this.isSetCharging = false
    this._storageService.removeSessionData('start')

  }
  isGetLocalListVersionShow() {
    this.isGetLocalListVersion = true
    this.isClearChargingProfile = false
    this.isSendLocalListVersion = false
    this.isRemoteStopTransaction = false
    this.isRemoteStartTransaction = false
    this.isChangeAvailability = false
    this.isGetConfig = false
    this.isReset = false
    this.isDataTransfer = false
    this.isClearCache = false
    this.isChangeConfiguration = false
    this.isGetCompositeSchedule = false
    this.isUnlock = false
    this.isCancelReservation = false
    this.isReserveNow = false
    this.isDiagnosticsItem = false
    this.isDiagnostics = false
    this.isUpdateFirmware = false
    this.isSetCharging = false
    this._storageService.removeSessionData('start')

  }
  isGetCompositeScheduleShow() {

    this.isGetLocalListVersion = false
    this.isSendLocalListVersion = false
    this.isClearChargingProfile = false
    this.isRemoteStopTransaction = false
    this.isRemoteStartTransaction = false
    this.isChangeAvailability = false
    this.isGetConfig = false
    this.isReset = false
    this.isDataTransfer = false
    this.isClearCache = false
    this.isChangeConfiguration = false
    this.isGetCompositeSchedule = true
    this.isUnlock = false
    this.isCancelReservation = false
    this.isReserveNow = false
    this.isDiagnosticsItem = false
    this.isDiagnostics = false
    this.isUpdateFirmware = false
    this.isSetCharging = false
    this._storageService.removeSessionData('start')

  }


  isGetConfigShow() {
    this.isGetConfig = true
    this.isClearCache = false
    this.isReset = false
    this.isChangeConfiguration = false
    this.isChangeAvailability = false
    this.isRemoteStopTransaction = false
    this.isClearChargingProfile = false
    this.isDataTransfer = false
    this.isRemoteStartTransaction = false
    this.isGetCompositeSchedule = false
    this.isUnlock = false
    this.isCancelReservation = false
    this.isReserveNow = false
    this.isDiagnosticsItem = false
    this.isDiagnostics = false
    this.isGetLocalListVersion = false
    this.isSendLocalListVersion = false
    this.isUpdateFirmware = false
    this.isSetCharging = false
    this._storageService.removeSessionData('start')
  }

  isClearCacheShow() {
    this.isGetLocalListVersion = false
    this.isSendLocalListVersion = false
    this.isClearChargingProfile = false
    this.isClearCache = true
    this.isGetConfig = false
    this.isDataTransfer = false
    this.isReset = false
    this.isChangeConfiguration = false
    this.isChangeAvailability = false
    this.isRemoteStopTransaction = false
    this.isRemoteStartTransaction = false
    this.isGetCompositeSchedule = false
    this.isUnlock = false
    this.isCancelReservation = false
    this.isReserveNow = false
    this.isDiagnosticsItem = false
    this.isDiagnostics = false
    this.isUpdateFirmware = false
    this.isSetCharging = false
    this._storageService.removeSessionData('start')
  }

  isResetShow() {
    this.isGetLocalListVersion = false
    this.isSendLocalListVersion = false
    this.isReset = true
    this.isGetConfig = false
    this.isClearChargingProfile = false
    this.isClearCache = false
    this.isDataTransfer = false
    this.isChangeConfiguration = false
    this.isChangeAvailability = false
    this.isRemoteStopTransaction = false
    this.isRemoteStartTransaction = false
    this.isGetCompositeSchedule = false
    this.isUnlock = false
    this.isCancelReservation = false
    this.isReserveNow = false
    this.isDiagnosticsItem = false
    this.isDiagnostics = false
    this.isUpdateFirmware = false
    this.isSetCharging = false
    this._storageService.removeSessionData('start')
  }


  isChangeConfigurationShow() {
    this.isGetLocalListVersion = false
    this.isSendLocalListVersion = false
    this.isChangeConfiguration = true
    this.isGetConfig = false
    this.isReset = false
    this.isDataTransfer = false
    this.isClearChargingProfile = false
    this.isClearCache = false
    this.isChangeAvailability = false
    this.isRemoteStopTransaction = false
    this.isRemoteStartTransaction = false
    this.isGetCompositeSchedule = false
    this.isUnlock = false
    this.isCancelReservation = false
    this.isReserveNow = false
    this.isDiagnosticsItem = false
    this.isDiagnostics = false
    this.isUpdateFirmware = false
    this.isSetCharging = false
    this._storageService.removeSessionData('start')
  }


  isChangeAvailabilityShow() {
    this.isGetLocalListVersion = false
    this.isSendLocalListVersion = false
    this.isChangeAvailability = true
    this.isClearChargingProfile = false
    this.isGetConfig = false
    this.isReset = false
    this.isDataTransfer = false
    this.isClearCache = false
    this.isChangeConfiguration = false
    this.isRemoteStopTransaction = false
    this.isRemoteStartTransaction = false
    this.isGetCompositeSchedule = false
    this.isUnlock = false
    this.isCancelReservation = false
    this.isReserveNow = false
    this.isDiagnosticsItem = false
    this.isDiagnostics = false
    this.isUpdateFirmware = false
    this.isSetCharging = false
    this._storageService.removeSessionData('start')
  }

  isRemoteStopTransactionShow() {
    this.isGetLocalListVersion = false
    this.isSendLocalListVersion = false
    this.isChangeAvailability = false
    this.isDataTransfer = false
    this.isGetConfig = false
    this.isReset = false
    this.isClearCache = false
    this.isChangeConfiguration = false
    this.isClearChargingProfile = false
    this.isRemoteStartTransaction = false
    this.isRemoteStopTransaction = true
    this.isGetCompositeSchedule = false
    this.isUnlock = false
    this.isCancelReservation = false
    this.isReserveNow = false
    this.isDiagnosticsItem = false
    this.isDiagnostics = false
    this.isSetCharging = false
    this._storageService.removeSessionData('start')
  }

  isRemoteStartTransactionShow() {
    this.firstFieldsRemoteStart = false
    this.secondFieldsRemoteStart = false
    this.thirdFieldsRemoteStart = false
    this.isGetLocalListVersion = false
    this.isSendLocalListVersion = false
    this.isChangeAvailability = false
    this.isGetConfig = false
    this.isReset = false
    this.isClearCache = false
    this.isClearChargingProfile = false
    this.isChangeConfiguration = false
    this.isDataTransfer = false
    this.isRemoteStopTransaction = false
    this.isRemoteStartTransaction = true
    this.isGetCompositeSchedule = false
    this.isUnlock = false
    this.isCancelReservation = false
    this.isReserveNow = false
    this.isDiagnosticsItem = false
    this.isDiagnostics = false
    this.isUpdateFirmware = false
    this.isSetCharging = false
    this._storageService.removeSessionData('start')
  }

  control = new FormControl('');
  control1 = new FormControl('');

  streets:string[] = []
  streets1: string[] = []

  filteredStreets!: Observable<any[]>
  filteredStreets1!: Observable<any[]>

  private _filter(value: any): string[] {
    const filterValue = value.toLowerCase()
    return this.streets.filter((option: any) => {
      return option.chargeboxid.toLowerCase().includes(filterValue)
    })
  }

  private _filter1(value: any): string[] {
    const filterValue = value.toLowerCase()
    return this.streets1.filter((option: any) => {
      return option.toLowerCase().includes(filterValue)
    })
  }

  selectCharger(event: any, value: any) {
    if (event.isUserInput) {
      this.chargerId = value
      this.getConnectorIds('')
      this.GetOcppEventLog()
    }
  }


  removeFilter(event: any, chargerId: any): void {
      const isCharger =
        this.streets.find((elem: any) => {
          // existing logic
        }) === chargerId.value;
      
      if (isCharger) {
        this.chargerId = chargerId.value;
        this.getConnectorIds('');
        this.GetOcppEventLog();
      }
      else if (chargerId.value === '') {
        this.chargerId = '';
        this.selectConnectorIds = [0];
        this.GetOcppEventLog();
      }
      else {
        this.chargerId = chargerId.value;
        this.selectConnectorIds = [0];
        this.dataSource.data = [];
      }
    }




  removeFilter1(event: any, getConfig: any) {
  
    let isCharger =
      this.streets1.find((elem: any) => {
        //elem.chargeboxid
      }) == getConfig.value

    if (isCharger) {
      this.chargerId = getConfig.value

    }
  }

  removeFilter2(event: any, changeConfig: any) {
    let isCharger =
    this.streets1.find((elem: any) => {
      //elem.chargeboxid
    }) == changeConfig.value

  if (isCharger) {
    this.chargerId = changeConfig.value
  }
  }

  /**
   * Unlock
   */
  unlock(connectorID: number) {
    if (this.chargerId == '') {
      this.toastr.error('Please Enter Charger Id')
      return
    } else if (!this.hasChargerBoxId()) {
      this.toastr.error('Invalid Charge Box id')
      return
    } else if (connectorID == 0) {
      this.toastr.error('Please Select Connector ID')
      return
    }

    const pBody = {
      connectorId: connectorID,
    }

    this._diagnosticsService.unlock(this.chargerId, pBody).subscribe({
      next: (res) => {
        this.showLoader = true
        if (res) {
          this.showLoader = false
          this.isRemoteControl = false
          this.commandType = ''
          this.isUnlock = false
          this.setCallFunction(res)
        }
      },
      error: (error) => {
        this.handleError(error)
      },
    })
  }

  /**
   * CancelReservation
   */
  cancelReservation() {
    this.inputReserveTag = this.inputReserveTagValue.nativeElement.value
    if (this.chargerId == '') {
      this.toastr.error('Please Enter Charger Id')
      return
    } else if (!this.hasChargerBoxId()) {
      this.toastr.error('Invalid Charge Box id')
      return
    } else if (this.inputReserveTag.length == 0) {
      this.toastr.error('Please Enter ReservationId')
      return
    }
    let digitValidate = this.inputReserveTag.trim()
    if (!this.digitValidate.test(digitValidate)) {
      this.toastr.error('Please Enter Numbers Only')
    }
    if (digitValidate == "0") {
      this.toastr.error('Please Enter Number Greater Than 0')
      return
    }
    const pBody = {
      reservationId: digitValidate,
    }

    this._diagnosticsService
      .cancelReservation(this.chargerId, pBody)
      .subscribe({
        next: (res) => {
          this.showLoader = true
          if (res) {
            this.isRemoteControl = false
            this.commandType = ''
            this.isCancelReservation = false
            this.showLoader = false
            this.setCallFunction(res)
          }
        },
        error: (error) => {
          this.handleError(error)
        },
      })
  }

  /**
   * reserveNow
   */
  reserveNow(connectorID: any) {
    // SET RANDOM NUMBER FOR RESERVATION ID
    this.inputReserveTag = this.inputReserveTagValue.nativeElement.value
    this.idTag = this.inputTag.nativeElement.value
    this.inputKeyConfig = ''
    this.inputKeyConfig =
      this.inputKey.nativeElement.value.length == 0
        ? ''
        : this.inputKey.nativeElement.value

    if (this.chargerId == '') {
      this.toastr.error('Please Enter Charger Id')
      return
    } else if (!this.hasChargerBoxId()) {
      this.toastr.error('Invalid Charge Box id')
      return
    } else if (this.expiryDate == '') {
      this.toastr.error('Please Select Expiry Date')
    } else if (this.idTag == '') {
      this.toastr.error('Please Enter RFID')
      return
    } else if (this.idTag.length > 20) {
      this.toastr.error('RFID Must Be Less Than 20 Characters')
      return
    } else if (this.inputKeyConfig.length > 20) {
      this.toastr.error('ParentId Tag Must Be Less Than 20 Characters')
      return
    } else if (this.inputReserveTag.length == 0) {
      this.toastr.error('Please Enter ReservationId')
      return
    }
    let digitValidate = this.inputReserveTag.trim()
    if (!this.digitValidate.test(digitValidate)) {
      this.toastr.error('Please Enter Numbers Only')
    }
    if (digitValidate == "0") {
      this.toastr.error('Please Enter Number Greater Than 0')
      return
    }
    // return
    const pBody = {
      connectorId: connectorID,
      reservationId: digitValidate,
      expiryDate: this.expiryDate,
      idTag: this.idTag,
      parentIdTag: this.inputKeyConfig,
    }

    this._diagnosticsService.reserveNow(this.chargerId, pBody).subscribe({
      next: (res) => {
        this.showLoader = true
        if (res) {
          this.showLoader = false
          this.isRemoteControl = false
          this.commandType = ''
          this.isReserveNow = false
          this.setCallFunction(res)
        }
      },
      error: (error) => {
        this.showLoader = false
        this.handleError(error)
      },
    })
  }
  /**
   * Data Transfer Cmd
   */

  dataTransferCmd() {
    this.vendorId = this.vendrId.nativeElement.value
    this.messageId = this.msgId.nativeElement.value
    this.data = this.addData.nativeElement.value
    if (this.chargerId == '') {
      this.toastr.error('Please Enter Charger Id')
      return
    } else if (!this.hasChargerBoxId()) {
      this.toastr.error('Invalid Charge Box id')
      return
    } else if (this.vendorId == '') {
      this.toastr.error('Please Enter Vendor Id')
      return
    }
    const pBody = {
      vendorId: this.vendorId,
      messageId: this.messageId,
      data: this.data,
    }
    this._diagnosticsService.dataTransfer(this.chargerId, pBody).subscribe({
      next: (res) => {
        this.showLoader = true
        if (res) {
          this.showLoader = false
          this.commandType = ''
          this.setCallFunction(res)
        }
      },
      error: (error: any) => {
        this.showLoader = false
        this.handleError(error)
      },
    })
  }
  /**
   * triggerMessage
   */
  triggerMessage(connectorID: any) {
    if (this.chargerId == '') {
      this.toastr.error('Please Enter Charger Id')
      return
    } else if (!this.hasChargerBoxId()) {
      this.toastr.error('Invalid Charge Box id')
      return
    } else if (this.reqMessType == '') {
      this.toastr.error('Please Select RequestMessage')
      return
    }
    let pBody: any
    pBody =
      connectorID > 0
        ? {
          connectorId: connectorID,
          requestedMessage: this.reqMessType,
        }
        : {
          requestedMessage: this.reqMessType,
        }

    this._diagnosticsService.triggerMessage(this.chargerId, pBody).subscribe({
      next: (res) => {
        this.showLoader = true
        if (res) {
          this.showLoader = false
          this.isRemoteControl = false
          this.commandType = ''
          this.isTriggerMess = false

          this.setCallFunction(res)
        }
      },
      error: (error: any) => {
        this.showLoader = false
        this.handleError(error)
      },
    })
  }

  selectChargingProfilePurpose(event: any) {
    this.clearChargingPurpose = event.target.value
  }
  /**
   * ClearChargingProfile
   */
  getClearChargingProfile() {
    this.id = this.clearChargingId.nativeElement.value
      ? this.clearChargingId.nativeElement.value
      : undefined

    this.clearChargingPurpose = this.clearChargingPurpose
      ? this.clearChargingPurpose
      : undefined
    this.stackLevel = this.stakLevel.nativeElement.value
      ? this.stakLevel.nativeElement.value
      : undefined
    if (this.chargerId == '') {
      this.toastr.error('Please Enter Charger Id')
      return
    }
    const pBody = {
      id: this.id ? +this.id : undefined,
      connectorId: this.connectorID ? +this.connectorID : undefined,
      chargingProfilePurpose: this.clearChargingPurpose
        ? this.clearChargingPurpose
        : undefined,
      stackLevel: this.stackLevel ? +this.stackLevel : undefined,
    }
    this._diagnosticsService
      .GetClearChargingProfile(this.chargerId, pBody)
      .subscribe({
        next: (res) => {
          this.commandType = ''
          this.showLoader = true

          if (res) {
            this.showLoader = false
            this.isSmartCharging = false
            this.isClearChargingProfile = false
            this.setCallFunction(res)
          }
        },
        error: (error: any) => {
          this.showLoader = false
          this.handleError(error)
        },
      })
  }

  /**
   * updateFirmware
   */

  updateFirmware(connectorID: any) {
    this.inputReserveTag = this.inputReserveTagValue.nativeElement.value // Retry Interval
    let retryValue = this.inputretriesValue.nativeElement.value // retries
    this.enterLocationValue = this.enterLocation.nativeElement.value
    let digitValidate = this.inputReserveTag.trim()
    let retryKeyValue = retryValue.trim()
    if (this.chargerId == '') {
      this.toastr.error('Please Enter Charger Id')
      return
    } else if (!this.hasChargerBoxId()) {
      this.toastr.error('Invalid Charge Box id')
      return
    } else if (this.enterLocationValue.length == 0) {
      this.toastr.error('Please Enter Location')
      return
    } else if (!this._diagnosticsService.isValidURL(this.enterLocationValue)) {
      this.toastr.error('Please Enter Valid URL')
      return
    } else if (this.expiryDate !== undefined && this.expiryDate.length == 0) {
      this.toastr.error('Please Enter Retrieve Date')
      return
    }
    if (this.selectedDate <= this._diagnosticsService.currentDate()) {
      this.toastr.error('Date Must Not Less Than Current Date')
      return
    } else if (
      this.inputReserveTag.length > 0 &&
      !this.digitValidate.test(digitValidate)
    ) {
      this.toastr.error('Please Enter Numbers Only For Retry Interval')
      return
    }

    if (retryKeyValue.length > 0 && !this.digitValidate.test(retryKeyValue)) {
      this.toastr.error('Please Enter Numbers Only For Retries')
      return
    }

    const pBody = {
      location: this.enterLocationValue,
      retries: retryKeyValue.length == 0 ? 0 : retryKeyValue,
      retrieveDate: this.expiryDate,
      retryInterval:
        this.inputReserveTag.length == 0 ? 0 : this.inputReserveTag,
    }
    this._diagnosticsService.updateFirmware(this.chargerId, pBody).subscribe({
      next: (res) => {
        this.showLoader = true
        if (res) {
          this.showLoader = false
          this.isFireWareItem = false
          this.commandType = ''
          this.isUpdateFirmware = false
          this.setCallFunction(res)
        }
      },
      error: (error: any) => {
        this.showLoader = false
        this.handleError(error)
      },
    })
    this.expiryDate = ''
  }

  getDiagnosticsCmd() {
    this.inputReserveTag = this.inputReserveTagValue.nativeElement.value // Retry Interval
    let retryValue = this.inputretriesValue.nativeElement.value // retries
    this.enterLocationValue = this.enterLocation.nativeElement.value
    let digitValidate = this.inputReserveTag.trim()
    let retryKeyValue = retryValue.trim()
    if (this.chargerId == '') {
      this.toastr.error('Please Enter Charger Id')
      return
    } else if (!this.hasChargerBoxId()) {
      this.toastr.error('Invalid Charge Box id')
      return
    } else if (this.enterLocationValue.length == 0) {
      this.toastr.error('Please Enter Location')
      return
    } else if (!this._diagnosticsService.isValidURL(this.enterLocationValue)) {
      this.toastr.error('Please Enter Valid Location URL')
      return
    } else if (
      this.inputReserveTag.length > 0 &&
      !this.digitValidate.test(digitValidate)
    ) {
      this.toastr.error('Please Enter Numbers Only For Retry Interval')
      return
    }

    if (retryKeyValue.length > 0 && !this.digitValidate.test(retryKeyValue)) {
      this.toastr.error('Please Enter Numbers Only For Retries')
      return
    }

    const pBody = {
      location: this.enterLocationValue,
      retries: retryKeyValue.length == 0 ? 0 : retryKeyValue,
      startTime: this.startDate,
      stopTime: this.endDate,
      retryInterval:
        this.inputReserveTag.length == 0 ? 0 : this.inputReserveTag,
    }

    this._diagnosticsService.getDiagnostics(this.chargerId, pBody).subscribe({
      next: (res) => {
        this.showLoader = true
        if (res) {
          this.showLoader = false
          this.isFireWareItem = false
          this.commandType = ''
          this.isDiagnostics = false
          this.setCallFunction(res)
        }
      },
      error: (error: any) => {
        this.showLoader = false
        this.handleError(error)
      },
    })
  }

  changeDateTime(event: any, type?: string) {
    if (type !== undefined) {
      if (type == 'start') {
        this.startDate = this._diagnosticsService.convertToUTC(event.value)
      } else if (type == 'end') {
        this.endDate = this._diagnosticsService.convertToUTC(event.value)
      }
    }
    this.expiryDate = this._diagnosticsService.convertToUTC(event.value)
  }
  selectDate(event: any, type?: string) {
    this.selectedDate = event.target.value
    if (type !== undefined) {
      if (type == 'start') {
        this.startDate = this._diagnosticsService.convertToUTC(
          this.selectedDate,
        )
      } else if (type == 'end') {
        this.endDate = this._diagnosticsService.convertToUTC(this.selectedDate)
      }
    }

    this.expiryDate = this._diagnosticsService.convertToUTC(this.selectedDate)
  }

  handleError(error: any) {
    if (
      error !== undefined &&
      error.error !== undefined &&
      error.error.error !== undefined &&
      error.error.error.length > 0
    ) {
      this.toastr.error(error.error.error)
    }
  }
  /**
   *
   * @param id
   * Make payment request
   */

  openMakePaymentDialog(id: any) {
    const dialogRef = this.dialog.open(TransactionDialogComponent, {
      autoFocus: false,
      data: { id: id },
    })
    dialogRef.afterClosed().subscribe((result) => { })
  }

  createSetCharging() {
    this.setChargingForm = this._fb.group({
      connectorId: new FormControl('', Validators.required),
      csChargingProfiles: new FormGroup({
        chargingProfileId: new FormControl('', [Validators.required]),
        transactionId: new FormControl(''),
        stackLevel: new FormControl('', [Validators.required]),
        chargingProfilePurpose: new FormControl('', [Validators.required]),
        chargingProfileKind: new FormControl('', [Validators.required]),
        recurrencyKind: new FormControl(''),
        validFrom: new FormControl(''),
        validTo: new FormControl(''),
        duration: new FormControl(''),
        startSchedule: new FormControl(''),
        chargingRateUnit: new FormControl('', [Validators.required]),
        minChargingRate: new FormControl(''),
        startPeriod: new FormControl('', [Validators.required]),
        limit: new FormControl('', [Validators.required]),
        numberPhases: new FormControl(''),
      }),
    })
  }

  enableFields(type: string) {
    if (type == 'firstFields') {
      this.firstFields = !this.firstFields
    } else if (type == 'secondFields') {
      this.secondFields = !this.secondFields
    } else if (type == 'thirdFields') {
      this.thirdFields = !this.thirdFields
    }
  }

  /**
   * Submit SetCharging Cmd
   */
  submitted = false

  submitSetCharging() {
    this.submitted = true;

    if (!this.validateForm()) return;

    const pBody = this.buildChargingProfilePayload();

    this._diagnosticsService.SetChargingProfile(this.chargerId, pBody).subscribe({
      next: (res) => {
        this.showLoader = true;
        if (res) {
          this.showLoader = false;
          this.commandType = '';
          this.setCallFunction(res);
        }
      },
      error: (error: any) => {
        this.showLoader = false;
        this.handleError(error);
      },
    });
  }

  private validateForm(): boolean {
    if (!this.chargerId) {
      this.toastr.error('Please Enter Charger Id');
      return false;
    }

    const { csChargingProfiles, connectorId } = this.setChargingForm.value;

    if (!connectorId) {
      this.toastr.error('Please Select Connector Id');
      return false;
    }
    if (!csChargingProfiles.chargingProfileId) {
      this.toastr.error('Please Enter Charging Profile Id');
      return false;
    }
    if (!csChargingProfiles.stackLevel) {
      this.toastr.error('Please Enter Stack Level');
      return false;
    }
    if (!csChargingProfiles.chargingProfilePurpose) {
      this.toastr.error('Please Select Charging Profile Purpose');
      return false;
    }
    if (!csChargingProfiles.chargingProfileKind) {
      this.toastr.error('Please Select Charging Profile Kind');
      return false;
    }
    if (!csChargingProfiles.chargingRateUnit) {
      this.toastr.error('Please Select Charging Rate Unit');
      return false;
    }
    if (!csChargingProfiles.startPeriod) {
      this.toastr.error('Please Enter Start Period');
      return false;
    }
    if (!csChargingProfiles.limit) {
      this.toastr.error('Please Enter Limit');
      return false;
    }

    return true;
  }

  private buildChargingProfilePayload() {
    const chargingProfileData = this.setChargingForm.value.csChargingProfiles;
    const convertToUTC = this._diagnosticsService.convertToUTC.bind(this._diagnosticsService);

    return {
      connectorId: +this.setChargingForm.value.connectorId,
      csChargingProfiles: {
        chargingProfileId: +chargingProfileData.chargingProfileId,
        transactionId: chargingProfileData.transactionId ? +chargingProfileData.transactionId : undefined,
        stackLevel: chargingProfileData.stackLevel,
        chargingProfilePurpose: chargingProfileData.chargingProfilePurpose || undefined,
        chargingProfileKind: chargingProfileData.chargingProfileKind || undefined,
        recurrencyKind: chargingProfileData.recurrencyKind || undefined,
        validFrom: chargingProfileData.validFrom ? convertToUTC(chargingProfileData.validFrom) : undefined,
        validTo: chargingProfileData.validTo ? convertToUTC(chargingProfileData.validTo) : undefined,
        chargingSchedule: {
          duration: chargingProfileData.duration ? +chargingProfileData.duration : undefined,
          startSchedule: chargingProfileData.startSchedule ? convertToUTC(chargingProfileData.startSchedule) : undefined,
          chargingRateUnit: chargingProfileData.chargingRateUnit || undefined,
          chargingSchedulePeriod: {
            startPeriod: chargingProfileData.startPeriod || undefined,
            limit: chargingProfileData.limit || undefined,
            numberPhases: chargingProfileData.numberPhases ? +chargingProfileData.numberPhases : undefined,
          },
          minChargingRate: chargingProfileData.minChargingRate || undefined,
        },
      },
    };
  }


  /****
   * Remote Start Transaction Create
   */
  remoteStart() {
    this.remoteStartForm = this._fb.group({
      connectorId: new FormControl(''),
      idTag: new FormControl('', Validators.required),
      chargingProfile: new FormGroup({
        chargingProfile: new FormControl('', Validators.required),
        chargingProfileId: new FormControl('', [Validators.required]),
        transactionId: new FormControl(''),
        stackLevel: new FormControl('', [Validators.required]),
        chargingProfilePurpose: new FormControl('', [Validators.required]),
        chargingProfileKind: new FormControl('', [Validators.required]),
        recurrencyKind: new FormControl(''),
        validFrom: new FormControl(''),
        validTo: new FormControl(''),
        duration: new FormControl(''),
        startSchedule: new FormControl(''),
        chargingRateUnit: new FormControl('', [Validators.required]),
        minChargingRate: new FormControl('', [Validators.required]),
        startPeriod: new FormControl('', [Validators.required]),
        limit: new FormControl('', [Validators.required]),
        numberPhases: new FormControl(''),
      }),
    })
  }
  /** TO Match Chargerbox ID Is Coming In Drop Down OR NOT */
  

  hasChargerBoxId(): boolean {
    const ind = this.chargerBoxIdArr?.findIndex(
      (x: any) =>
        x.chargeboxid?.toLowerCase() === this.chargerId?.toLowerCase()
    ) ?? -1;

    return ind !== -1;
  }

  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false
    }
    return true
  }
  numbersDecimalOnly(event: any) {
    let charCode = event.which ? event.which : event.keyCode
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
      return false
    return true
  }

  enableFieldsStartTransaction(type: string) {
    if (type == 'firstFields') {
      this.firstFieldsRemoteStart = !this.firstFieldsRemoteStart
    } else if (type == 'secondFields') {
      this.secondFieldsRemoteStart = !this.secondFieldsRemoteStart
    } else if (type == 'thirdFields') {
      this.thirdFieldsRemoteStart = !this.thirdFieldsRemoteStart
    }
  }

  /**
   * Submit Remote Start Transaction Cmd
   */
  submitted1 = false

  /**
   * check start date validation
   */
  checkStartDate() {
    if (
      this.remoteStartForm.value.chargingProfile.validFrom >
      this.remoteStartForm.value.chargingProfile.validTo
    ) {
      this.remoteStartForm.controls.chargingProfile.patchValue({
        validTo: '',
      })
    }
  }
  checkStartDateForSetCharging() {
    if (
      this.setChargingForm.value.csChargingProfiles.validFrom >
      this.setChargingForm.value.csChargingProfiles.validTo
    ) {
      this.setChargingForm.controls.csChargingProfiles.patchValue({
        validTo: '',
      })
    }
  }
  /**
   * Check valid from date
   * @param e
   * @returns
   */

  checkValidFrom() {
    let fromDate = this.remoteStartForm.value.chargingProfile?.validFrom
    if (!fromDate) {
      this.toastr.error('Please select From Date first.')
      this.remoteStartForm.controls.chargingProfile.patchValue({ validTo: '' })
    }
  }
  checkValidFromForSetCharging() {
    let fromDate = this.setChargingForm.value.csChargingProfiles.validFrom
    if (!fromDate) {
      this.toastr.error('Please select From Date first.')
      this.setChargingForm.controls.csChargingProfiles.patchValue({ validTo: '' })
    }
  }
  dateFilterForEnd = (d: Date | null): boolean => {
    if (!d) return false;
    const fromDate = this.remoteStartForm?.value?.chargingProfile?.validFrom;
    if (!fromDate) return true;
    return d >= new Date(fromDate);
  }
  dateFilterForEndForSetCharging = (d: Date | null): boolean => {
    if (!d) return false;
    const fromDate = this.setChargingForm?.value?.csChargingProfiles?.validFrom;
    if (!fromDate) return true;
    return d >= new Date(fromDate);
  }
  dateFilterForStartScheduleForSetCharging = (d: Date | null): boolean => {
    if (!d) {
      return false;
    }

    const selectedDate = new Date(
      this.datePipe.transform(
        d,
        'yyyy-MM-ddT' + this.getModifiedTime()
      ) as string
    );

    const today = new Date();
    const todayDate = new Date(
      this.datePipe.transform(
        today,
        'yyyy-MM-ddT' + this.getModifiedTime()
      ) as string
    );

    return selectedDate >= todayDate;
  };

  dateFilterForStartSchedule = (d: Date | null): boolean => {
    if (!d) {
      return false;
    }

    const selectedDate = new Date(
      this.datePipe.transform(
        d,
        'yyyy-MM-ddT' + this.getModifiedTime()
      ) as string
    );

    const today = new Date();
    const todayDate = new Date(
      this.datePipe.transform(
        today,
        'yyyy-MM-ddT' + this.getModifiedTime()
      ) as string
    );

    return selectedDate >= todayDate;
  };

  dateFilterForStart = (d: Date | null): boolean => {
    if (!d) {
      return false;
    }

    const selectedDate = new Date(
      this.datePipe.transform(
        d,
        'yyyy-MM-ddT' + this.getModifiedTime()
      ) as string
    );

    const today = new Date();
    const todayDate = new Date(
      this.datePipe.transform(
        today,
        'yyyy-MM-ddT' + this.getModifiedTime()
      ) as string
    );

    return selectedDate >= todayDate;
  };

   dateFilterForStartForSetCharging = (d: Date | null): boolean => {
    if (!d) {
      return false;
    }

    const selectedDate = new Date(
      this.datePipe.transform(
        d,
        'yyyy-MM-ddT' + this.getModifiedTime()
      ) as string
    );

    const today = new Date();
    const todayDate = new Date(
      this.datePipe.transform(
        today,
        'yyyy-MM-ddT' + this.getModifiedTime()
      ) as string
    );

    return selectedDate >= todayDate;
  };

  getModifiedTime() {
    let date = new Date()
    let time = this.datePipe.transform(date, 'HH:mm:ss')
    return time
  }
  /**
   * not Allow Zero in Input
   * @param event
   */
  restrictZero(event: any) {
    if (event.target.value.length === 0 && event.key === '0') {
      event.preventDefault()
    }
  }
}
