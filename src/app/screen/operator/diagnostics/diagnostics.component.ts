import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { animate, state, style, transition, trigger } from '@angular/animations'
import 'jspdf'
import { DiagnosticsService } from './diagnostics.service'
import { ToastrService } from 'ngx-toastr'
import { MatDialog } from '@angular/material/dialog'
import { ChargerService } from '../charger/charger.service'
import { StorageService } from 'src/app/service/storage.service'
import { map, Observable, startWith } from 'rxjs'
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms'
import { TransactionDialogComponent } from 'src/app/component/dashboard/transaction-dialog/transaction-dialog.component'
import { DatePipe } from '@angular/common'

declare let jsPDF: new () => any

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
  jsPDF: any

  fromHTML: any
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
  digitValidate = new RegExp('^[0-9]+$')
  chargerId = ''
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
  selectConnectorIds: any = [0]
  showLoader = false
  count = 1
  intervalId: any

  totalCount: any
  pageSize: number = 10
  currentPage: number = 1
  totalPages: any
  pageSizeOptions = [10, 20, 100]
  searchParam = ''
  expiryDate: any
  requestMessTypes: any
  reqMessType = ''
  selectedDate: any
  startDate: any
  endDate: any

  diagnosticList = []
  tooltipList: any
  isRemoteStopTransaction = false
  isRemoteStartTransaction = false
  isGetCompositeSchedule = false
  isGetLocalListVersion = false
  isClearChargingProfile = false
  isSetCharging = false
  currentDate: any
  currentDateLocal: any
  randomSixDigit: number = 0
  statusData: any
  updateDatas: any
  getListVersionForm: any
  remoteStartForm: any
  rfidExpDate: any
  minDate = new Date()
  vendorId = '0'
  messageId = '0'
  data = ''
  id = 0
  connectorId = 0
  clearChargingPurpose: any = ''
  stackLevel = 0
  reserveNowDate = new FormControl()
  chargerBoxIdArr: any
  setChargingForm: any
  chargingProfilePurpose: any
  chargingProfileKind: any
  recurrencyKind: any
  chargingRateUnit: any
  firstFields: boolean = false
  secondFields: boolean = false
  thirdFields: boolean = false
  firstFieldsRemoteStart: boolean = false
  thirdFieldsRemoteStart: boolean = false
  secondFieldsRemoteStart: boolean = false
  datePipe = new DatePipe('en-US')
  constructor(
    public _diagnosticsService: DiagnosticsService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private _storageService: StorageService,
    public _chargerService: ChargerService,
    private _fb: FormBuilder,
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
    this.currentDateLocal =
      this._diagnosticsService.currentDate() + 'T00:00:00.000'
    this.UserId = this._storageService.getLocalData('user_id')
    // SET CHARGING ARRAY DATA
  }
  ngOnInit(): void {
    this.createSetCharging()
    this.GetChargeBoxIDList()
    this.filteredStreets = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => (value && value.length >= 0 ? this._filter(value) : [])),
    )
    this.GetOcppEventLog()
  }

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

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild('picker1') picker1: any

  ngAfterViewInit() {
    if (this.paginator !== undefined && this.paginator._intl !== undefined) {
      this.paginator._intl.itemsPerPageLabel = 'Rows per page'
    }
  }

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

  dataSource = new MatTableDataSource<any>(this.diagnosticList)
  columnsToDisplay = ['ChargeBoxId', 'DateTime', 'Action']

  displayedColumns = ['ChargeBoxId', 'DateTime', 'Action']
  expandedElement!: any | null

  applyFilter(event: Event) {
    this.chargerId = this.input.nativeElement.value.toUpperCase()
    this.GetOcppEventLog()
    const filterValue = (event.target as HTMLInputElement).value
    if (filterValue !== undefined && filterValue.length > 1) {
      this.chargerId = filterValue.toUpperCase()
      this.getConnectorIds('')
    }
    this.dataSource.filter = filterValue.trim().toLowerCase()
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
    } /* 11 oct else if (tileType == 'diagnostics') {
      this.isFireWareItem = false;
      this.isProvisioning = false;
      this.isRemoteControl = false;
      this.isSmartCharging = false;
      this.isAuthorization = false;
      this.isDiagnosticsItem = true;
      this.isTriggerMess = false;
    } */
  }
  /**
   * Get Configurations
   */
  getConfiguration(cmdTye: string) {
    this.count = 1
    if (cmdTye == 'changeconfig') {
      this.changeConfiguration()
      return
    } else if (cmdTye == 'getComposite') {
      this.getCompositeSchedule()
      return
    } else if (this.commandType == 'change') {
      this.changeAvailability(this.chargerType, this.connectorID)
      return
    } else if (this.commandType == 'reset') {
      this.reset(this.chargerType)
      return
    } else if (this.commandType == 'unlock') {
      this.unlock(this.connectorID)
      return
    } else if (this.commandType == 'isCancelReservation') {
      this.cancelReservation()
      return
    } else if (this.commandType == 'isReserveNow') {
      this.reserveNow(this.connectorID)
      return
    } else if (this.commandType == 'triggerMessage') {
      this.triggerMessage(this.connectorID)
      return
    } else if (this.commandType == 'updatefirmware') {
      this.updateFirmware(this.connectorID)
      return
    } else if (this.commandType == 'getdiagnostics') {
      this.getDiagnosticsCmd()
      return
    } else if (this.commandType == 'datatransfer') {
      this.dataTransferCmd()
      return
    } else if (this.commandType == 'getClearCharging') {
      this.getClearChargingProfile()
      return
    } else if (this.commandType == 'setCharging') {
      this.submitSetCharging()
      return
    }
    if (this.chargerId == '') {
      this.toastr.error('Please Enter Charger Id')
      return
    } else if (!this.hasChargerBoxId()) {
      this.toastr.error('Invalid Charge Box id')
      return
    }
    this.inputKeyConfig = ''
    this.inputKeyConfig =
      this.inputKey.nativeElement.value.length == 0
        ? ''
        : this.inputKey.nativeElement.value
    if (
      this.inputKeyConfig !== '' &&
      this.inputKey.nativeElement.value.length > 50
    ) {
      this.toastr.error('Key Must Be Less Than 50 Characters in Length')
      return
    }

    this.inputKeyConfig = this.inputKey.nativeElement.value
    const pBody = {
      // key: [''],
      key: [this.inputKeyConfig],
    }

    this._diagnosticsService.GetConfiguration(this.chargerId, pBody).subscribe({
      next: (res: any) => {
        this.showLoader = true
        if (res) {
          // let cmsRequestPayload = res
          // alert(JSON.stringify(res))
          this.showLoader = false
          this.isProvisioning = false
          this.isGetConfig = false
          this.setCallFunction(res, 'getConfig')
        }
      },
      error: (error: any) => {
        this.showLoader = false
        this.handleError(error)
      },
    })
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
          this.setCallFunction(res, 'clear')
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
          this.setCallFunction(res, 'reset')
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
  GetOcppEventLog() {
    const pBody = {
      pageNumber: this.currentPage,
      pageSize: this.pageSize,
      // pageNumber: 1,
      searchParam: '',
      // pageSize: 10,
      orderBy: '',
      locationIds: [],
      opratorid: '',
      chargerBoxIds: this.chargerId == '' ? [] : [this.chargerId.toString()],
    }

    this._diagnosticsService.GetEventLogByLocation(pBody).subscribe((res) => {
      this.commandType = ''
      if (
        res !== undefined &&
        res.data !== undefined &&
        res.data !== null &&
        res.data.length > 0
      ) {
        this.isTableHasData = true
        this.totalCount = res.paginationResponse.totalCount
        this.totalPages = res.paginationResponse.totalPages
        this.pageSize = res.paginationResponse.pageSize
        // this.transactionId
        // let a = '[3,\r\n"StartTransaction",\r\n{\n  "idTagInfo": {\n    "status": "Accepted",\r\n\n    "expiryDate": "2024-06-27T12:15:44.557",\r\n\n    "parentIdTag": {\n      "IdToken": "RFID_CB011"\n    }\n  },\r\n\n  "transactionId": 3104\n}]'
        this.diagnosticList = res.data
        this.dataSource.data = this.diagnosticList
        /* if (
          res.data[0].responsePayload !== undefined &&
          res.data[0].responsePayload !== ''
        ) {
          let a = res.data[0].responsePayload;
          this.transactionId = parseInt(
            a.split('transactionId')[1].split(':')[1].split('\n')[0].trim()
          );
        } */
      } else {
        this.isTableHasData = false
        this.dataSource.data = []
      }
    })
  }

  /**
   * changeConfiguration
   */
  changeConfiguration() {
    this.inputKeyConfig = ''
    this.inputValueConfig = ''
    if (this.chargerId == '') {
      this.toastr.error('Please Enter Charger Id')
      return
    } else if (!this.hasChargerBoxId()) {
      this.toastr.error('Invalid Charge Box id')
      return
    } else if (this.inputKey.nativeElement.value.length == 0) {
      this.toastr.error('Please Enter Key')
      return
    } else if (this.inputKey.nativeElement.value.length > 50) {
      this.toastr.error('Key Must Be Less Than 50 Characters')
      return
    } else if (this.inputValue.nativeElement.value.length == 0) {
      this.toastr.error('Please Enter Value')
      return
    } else if (this.inputValue.nativeElement.value.length > 500) {
      this.toastr.error('Value Must Be Less Than 500 Characters')
      return
    }
    this.inputKeyConfig = this.inputKey.nativeElement.value
    this.inputValueConfig = this.inputValue.nativeElement.value

    const pBody = {
      key: this.inputKeyConfig,
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
            this.isChangeConfiguration = false
            this.setCallFunction(res, 'changeconfig')
          }
        },
        error: (error: any) => {
          this.showLoader = false
          this.handleError(error)
        },
      })
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
      connectorId: parseInt(connectorID), // CH01 CH077
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
            this.setCallFunction(res, 'change')
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
    this.isDataTransfer = false
    this.isReset = false
    this.isChangeConfiguration = false
    this.isChangeAvailability = false
    this.isFireWareItem = false
    this.isDiagnosticsItem = false
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
    this.isSetCharging = false
  }
  /**
   * Remote Start Transaction
   */
  /**
   * Remote Start Transaction
   */

  remoteStartTransaction() {
    this.count = 1
    this.idTag = this.inputTag.nativeElement.value
    // let pBody: any;
    // alert(this.idTag +'kk');
    if (this.chargerId == '') {
      this.toastr.error('Please Enter Charger Id')
      return
    } else if (this.idTag == '') {
      this.toastr.error('Please Enter RFID')
      return
    } else if (this.idTag.length > 20) {
      this.toastr.error('RFID Must Be Less Than 20 Characters')
      return
    }
    let remoteStartTransactionData = this.remoteStartForm.value.chargingProfile
    const pBody =
      this.firstFieldsRemoteStart == true
        ? {
            connectorId: this.remoteStartForm.value.connectorId
              ? +this.remoteStartForm.value.connectorId
              : undefined,
            idTag: this.remoteStartForm.value.idTag,
            chargingProfile: {
              chargingProfileId: +remoteStartTransactionData.chargingProfileId,
              transactionId: remoteStartTransactionData.transactionId
                ? +remoteStartTransactionData.transactionId
                : undefined,
              stackLevel: +remoteStartTransactionData.stackLevel,
              chargingProfilePurpose: remoteStartTransactionData.chargingProfilePurpose
                ? remoteStartTransactionData.chargingProfilePurpose
                : undefined,
              chargingProfileKind: remoteStartTransactionData.chargingProfileKind
                ? remoteStartTransactionData.chargingProfileKind
                : undefined,
              recurrencyKind: remoteStartTransactionData.recurrencyKind
                ? remoteStartTransactionData.recurrencyKind
                : undefined,
              validFrom: remoteStartTransactionData.validFrom
                ? this.datePipe.transform(
                    remoteStartTransactionData.validFrom,
                    'yyyy-MM-ddT' + this.getModifiedDate(),
                  )
                : undefined,
              validTo: remoteStartTransactionData.validTo
                ? this.datePipe.transform(
                    remoteStartTransactionData.validTo,
                    'yyyy-MM-ddT' + this.getModifiedDate(),
                  )
                : undefined,
              chargingSchedule: {
                duration: remoteStartTransactionData.duration
                  ? +remoteStartTransactionData.duration
                  : undefined,
                startSchedule: remoteStartTransactionData.startSchedule
                  ? remoteStartTransactionData.startSchedule
                  : undefined,
                chargingRateUnit: remoteStartTransactionData.chargingRateUnit
                  ? remoteStartTransactionData.chargingRateUnit
                  : undefined,
                chargingSchedulePeriod: {
                  startPeriod: remoteStartTransactionData.startPeriod
                    ? +remoteStartTransactionData.startPeriod
                    : undefined,
                  limit: remoteStartTransactionData.limit
                    ? +remoteStartTransactionData.limit
                    : undefined,
                  numberPhases: remoteStartTransactionData.numberPhases
                    ? +remoteStartTransactionData.numberPhases
                    : undefined,
                },
                minChargingRate: remoteStartTransactionData.minChargingRate
                  ? +remoteStartTransactionData.minChargingRate
                  : undefined,
              },
            },
          }
        : {
            connectorId: this.remoteStartForm.value.connectorId
              ? +this.remoteStartForm.value.connectorId
              : undefined,
            idTag: this.remoteStartForm.value.idTag,
          }

    this.showLoader = true
    this._diagnosticsService
      .RemoteStartTransaction(this.chargerId, pBody)
      .subscribe({
        next: (res) => {
          this.showLoader = false
          this.isRemoteControl = false
          this.isRemoteStartTransaction = false
          this.setCallFunction(res, 'remoteStart')
        },
        error: (error) => {
          this.showLoader = false
          if (
            error !== undefined &&
            error.url !== null &&
            error.url.includes('RemoteStartTransaction') &&
            error.error !== undefined
          ) {
            this.toastr.error(JSON.stringify(error.error.error))
          }
        },
      })
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
            this.setCallFunction(res, 'composite')
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
    // this.connectorId = this.connectrId.nativeElement.value? this.connectrId.nativeElement.value:undefined;
    // this.clearChargingPurpose = this.clearChargingPurpos.nativeElement.value? this.clearChargingPurpos.nativeElement.value:undefined;

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
            this.setCallFunction(res, 'getClearCharging')
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
            this.setCallFunction(res, 'localList')
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
      // CHECK FOR GETLOCAL
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
      this.commandType == 'triggerMessage'
    ) {
      this.getConnectorIds('remoteStart')
    } else {
      this.getConnectorIds('')
    }
  }
  newLocalList(date: any, rfid: any, status: any): FormGroup {
    return new FormGroup({
      //listVersion: new FormControl(listVersion,[Validators.required,Validators.pattern('[0-9]+')]),
      //idTag: new FormControl(id),
      localListDate: new FormControl(date),
      rfid: new FormControl(rfid),
      status: new FormControl(status),
      // updateType: new FormControl(updateType)
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
  localList = false
  localIdTag = false
  addListTag(fbGroup?: FormGroup): void {
    this.localList = true
    ;(this.getListVersionForm.get('listTagControls') as FormArray).push(
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
      return
    } else {
      // CALL API TO BIND DATE
      this._diagnosticsService.getDate(rfid).subscribe({
        next: (res) => {
          this.showLoader = false
          this.rfidExpDate = res.expiryDate
          ;(this.getListVersionForm.get('idTagControls') as FormArray).push(
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
      listVersion: parseInt(listVersion),
      localAuthorizationList: {
        idTag: listField !== undefined ? listField.idTag : '',
        idTagInfo: {
          expiryDate: formField !== undefined ? formField.localListDate : '', // expiryDate
          parentIdTag: formField !== undefined ? formField.rfid : '',
          status: formField !== undefined ? formField.status : '',
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
          this.setCallFunction(res, 'sendlocal')
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
      return
    }
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
    ) {
      this.toastr.error('Please Select Connector ID')
      return
    }
  }

  selectRequestMessage(event: any) {
    //alert(this.commandType);
    this.reqMessType = event.target.value
    if (this.reqMessType == '') {
      this.toastr.error('Please Select RequestMessage')
      return
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
            this.setCallFunction(res, 'stop')
          }
        },
        error: (error: any) => {
          this.showLoader = false
          this.handleError(error)
        },
      })
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
        minChargingRate: new FormControl(''),
        startPeriod: new FormControl('', [Validators.required]),
        limit: new FormControl('', [Validators.required]),
        numberPhases: new FormControl(''),
      }),
    })
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
          this.setCallFunction(res, 'unlock')
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
      return
    }
    if (parseInt(digitValidate) == 0) {
      this.toastr.error('Please Enter Number Greater Than 0')
      return
    }
    // return
    const pBody = {
      reservationId: parseInt(digitValidate),
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
            this.setCallFunction(res, 'cancel')
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
      return
    }
    if (parseInt(digitValidate) == 0) {
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
          this.setCallFunction(res, 'isReserveNow')
        }
      },
      error: (error) => {
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
    // return
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

          this.setCallFunction(res, 'cancel')
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
    } else if (this.expiryDate == undefined) {
      this.toastr.error('Please Enter Retrieve Date')
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
      this.toastr.error('Please Enter Numbers Only For Retries ')
      return
    }

    const pBody = {
      location: this.enterLocationValue,
      retries: retryKeyValue.length == 0 ? 0 : parseInt(retryKeyValue),
      retrieveDate: this.expiryDate,
      retryInterval:
        this.inputReserveTag.length == 0 ? 0 : parseInt(this.inputReserveTag),
    }
    this._diagnosticsService.updateFirmware(this.chargerId, pBody).subscribe({
      next: (res) => {
        this.showLoader = true
        if (res) {
          this.showLoader = false
          this.isFireWareItem = false
          this.commandType = ''
          this.isUpdateFirmware = false
          this.setCallFunction(res, 'update')
        }
      },
      error: (error: any) => {
        this.showLoader = false
        this.handleError(error)
      },
    })
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
      retries: retryKeyValue.length == 0 ? 0 : parseInt(retryKeyValue),
      startTime: this.startDate,
      stopTime: this.endDate,
      retryInterval:
        this.inputReserveTag.length == 0 ? 0 : parseInt(this.inputReserveTag),
    }
    // console.log(pBody);
    //  return
    this._diagnosticsService.getDiagnostics(this.chargerId, pBody).subscribe({
      next: (res) => {
        this.showLoader = true
        if (res) {
          this.showLoader = false
          this.isFireWareItem = false
          this.commandType = ''
          this.isDiagnostics = false
          this.setCallFunction(res, 'getdiagnostics')
        }
      },
      error: (error: any) => {
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
          //  this.isDiagnostics = false;
          this.setCallFunction(res, 'datatransfer')
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
        //  this.startDate = this._convertToIso(this.selectedDate)
        this.startDate = this._diagnosticsService.convertToIso(event.value)
      } else if (type == 'end') {
        this.endDate = this._diagnosticsService.convertToIso(event.value)
      }
    }
    this.expiryDate = this._diagnosticsService.convertToIso(event.value)
  }

  selectDate(event: any, type?: string) {
    this.selectedDate = event.target.value

    if (type !== undefined) {
      if (type == 'start') {
        //  this.startDate = this._convertToIso(this.selectedDate)
        this.startDate = this._diagnosticsService.convertToIso(
          this.selectedDate,
        )
      } else if (type == 'end') {
        this.endDate = this._diagnosticsService.convertToIso(this.selectedDate)
      }
    }

    this.expiryDate = this._diagnosticsService.convertToIso(this.selectedDate)
  }

  //getReserveDate: any
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
          (type == 'remoteStart' ||
            type == 'unlock' ||
            type == 'triggerMessage') &&
          type !== ''
        ) {
          if (res.data.connectorIds !== '')
            this.selectConnectorIds = res.data.connectorIds
              .split(',')
              .map((element: any) => element.trim())
        } else {
          if (res.data.connectorIds == '') {
            res.data.connectorIds = 0
          } else {
            this.selectConnectorIds = res.data.connectorIds
              .split(',')
              .map((element: any) => element.trim())

            this.selectConnectorIds.unshift(0)
          }
        }
      },
      error: (err) => {
        // this.toastr.error('No connector Id Found')
      },
    })
  }

  setCallFunction(res: any, cmdType?: string) {
    this.commandType = ''
    this.count = 1
    let cmsRequestPayload = res
    this.toastr.success(JSON.stringify(res))

    this.showLoader = true
    this.intervalId = setInterval(() => {
      if (this.count < 4 && this.commandType == '') {
        this._diagnosticsService.CmsReply(cmsRequestPayload).subscribe({
          next: (res) => {
            this.showLoader = false
            if (res == 404) {
              this.toastr.error('Error Connecting...')
              this.count = this.count + 1
            }
            if (
              cmdType == 'remoteStart' ||
              cmdType == 'clear' ||
              cmdType == 'reset' ||
              cmdType == 'changeconfig' ||
              cmdType == 'change' ||
              cmdType == 'composite' ||
              cmdType == 'stop' ||
              cmdType == 'unlock' ||
              cmdType == 'isReserveNow' ||
              cmdType == 'triggerMessage' ||
              cmdType == 'cancel' ||
              cmdType == 'sendlocal' ||
              cmdType == 'datatransfer' ||
              cmdType == 'getClearCharging' ||
              cmdType == 'set'
            ) {
              if (res !== undefined && res.status !== undefined) {
                this.showLoader = false
                this.toastr.success(res.status)
                this.count = 4
                this.GetOcppEventLog()
              } else if (res !== undefined && res.meterStart !== undefined) {
                this.showLoader = false
                this.toastr.success(JSON.stringify(res))
                this.count = this.count + 1
                this.GetOcppEventLog()
              }
            } else if (cmdType == 'getConfig') {
              // unknownKey
              if (res !== undefined && res.unknownKey !== undefined) {
                this.count = 4
              }
              this.GetOcppEventLog()
            } else if (cmdType == 'localList') {
              // unknownKey
              if (res !== undefined && res.listVersion !== undefined) {
                this.count = 4
              }
              this.GetOcppEventLog()
            } else if (cmdType == 'update') {
              if (res == '{}') {
                this.count = 4
              }
            } else if (cmdType == 'getdiagnostics') {
              if (
                res !== undefined &&
                res.fileName !== '' &&
                res.fileName !== undefined
              ) {
                this.count = 4
              }
            }
          },
          error: (error: any) => {
            this.showLoader = false
            this.handleError(error)
          },
        })
      }
      if (this.count > 3) {
        // >=
        clearInterval(this.intervalId)
        this.showLoader = false
      }
    }, 3000)
  }

  /****************************************** Sub Tool Tip background Color function****************************************************** */
  isGetConfig = false
  isClearCache = false
  isReset = false
  isChangeConfiguration = false
  isChangeAvailability = false
  isDataTransfer = false
  isUpdateFirmware = false
  isPublishFirmware = false
  viewToolTipTtem(type: any) {
    if (this.chargerId == '') {
      return
    }

    if (type == 'isGetConfig') {
      this.isGetConfig = true
      this.isClearCache = false
      this.isReset = false
      this.isChangeConfiguration = false
      this.isChangeAvailability = false
      this.isRemoteStopTransaction = false
      this.isDataTransfer = false
      this.isRemoteStartTransaction = false
      this.isGetCompositeSchedule = false
      this.isClearChargingProfile = false
      this.isUnlock = false
      this.isCancelReservation = false
      this.isReserveNow = false
      this.isDiagnosticsItem = false
      this.isDiagnostics = false
      this.isGetLocalListVersion = false
      this.isSendLocalListVersion = false
      this.isUpdateFirmware = false
      this.isSetCharging = false
    } else if (type == 'isClearCache') {
      this.isGetLocalListVersion = false
      this.isSendLocalListVersion = false
      this.isClearCache = true
      this.isGetConfig = false
      this.isReset = false
      this.isChangeConfiguration = false
      this.isChangeAvailability = false
      this.isDataTransfer = false
      this.isRemoteStopTransaction = false
      this.isRemoteStartTransaction = false
      this.isGetCompositeSchedule = false
      this.isClearChargingProfile = false
      this.isUnlock = false
      this.isCancelReservation = false
      this.isReserveNow = false
      this.isDiagnosticsItem = false
      this.isDiagnostics = false
      this.isUpdateFirmware = false
      this.isSetCharging = false
      this._storageService.removeSessionData('setCharging')
    } else if (type == 'isReset') {
      this.isGetLocalListVersion = false
      this.isSendLocalListVersion = false
      this.isDataTransfer = false
      this.isReset = true
      this.isGetConfig = false
      this.isClearCache = false
      this.isChangeConfiguration = false
      this.isChangeAvailability = false
      this.isRemoteStopTransaction = false
      this.isRemoteStartTransaction = false
      this.isGetCompositeSchedule = false
      this.isClearChargingProfile = false
      this.isUnlock = false
      this.isCancelReservation = false
      this.isReserveNow = false
      this.isDiagnosticsItem = false
      this.isDiagnostics = false
      this.isUpdateFirmware = false
      this.isSetCharging = false
      this._storageService.removeSessionData('setCharging')
    } else if (type == 'isChangeConfiguration') {
      this.isGetLocalListVersion = false
      this.isSendLocalListVersion = false
      this.isChangeConfiguration = true
      this.isGetConfig = false
      this.isReset = false
      this.isDataTransfer = false
      this.isClearCache = false
      this.isChangeAvailability = false
      this.isRemoteStopTransaction = false
      this.isRemoteStartTransaction = false
      this.isGetCompositeSchedule = false
      this.isClearChargingProfile = false
      this.isUnlock = false
      this.isCancelReservation = false
      this.isReserveNow = false
      this.isDiagnosticsItem = false
      this.isDiagnostics = false
      this.isUpdateFirmware = false
      this.isSetCharging = false
      this._storageService.removeSessionData('setCharging')
    } else if (type == 'isChangeAvailability') {
      this.isGetLocalListVersion = false
      this.isSendLocalListVersion = false
      this.isChangeAvailability = true
      this.isGetConfig = false
      this.isDataTransfer = false
      this.isReset = false
      this.isClearCache = false
      this.isChangeConfiguration = false
      this.isRemoteStopTransaction = false
      this.isRemoteStartTransaction = false
      this.isGetCompositeSchedule = false
      this.isClearChargingProfile = false
      this.isUnlock = false
      this.isCancelReservation = false
      this.isReserveNow = false
      this.isDiagnosticsItem = false
      this.isDiagnostics = false
      this.isUpdateFirmware = false
      this.isSetCharging = false
      this._storageService.removeSessionData('setCharging')
    } else if (type == 'isRemoteStopTransaction') {
      this.isGetLocalListVersion = false
      this.isSendLocalListVersion = false
      this.isChangeAvailability = false
      this.isGetConfig = false
      this.isReset = false
      this.isClearCache = false
      this.isDataTransfer = false
      this.isChangeConfiguration = false
      this.isRemoteStartTransaction = false
      this.isRemoteStopTransaction = true
      this.isGetCompositeSchedule = false
      this.isClearChargingProfile = false
      this.isUnlock = false
      this.isCancelReservation = false
      this.isReserveNow = false
      this.isDiagnosticsItem = false
      this.isDiagnostics = false
      this.isSetCharging = false
      this._storageService.removeSessionData('setCharging')
    } else if (type == 'isRemoteStartTransaction') {
      this.isGetLocalListVersion = false
      this.isSendLocalListVersion = false
      this.isChangeAvailability = false
      this.isGetConfig = false
      this.isReset = false
      this.isDataTransfer = false
      this.isClearCache = false
      this.isChangeConfiguration = false
      this.isRemoteStopTransaction = false
      this.isRemoteStartTransaction = true
      this.isGetCompositeSchedule = false
      this.isClearChargingProfile = false
      this.isUnlock = false
      this.isCancelReservation = false
      this.isReserveNow = false
      this.isDiagnosticsItem = false
      this.isDiagnostics = false
      this.isUpdateFirmware = false
      this.isSetCharging = false
      this._storageService.removeSessionData('setCharging')
    } else if (type == 'isGetCompositeSchedule') {
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
      this.isGetCompositeSchedule = true
      this.isClearChargingProfile = false
      this.isUnlock = false
      this.isCancelReservation = false
      this.isReserveNow = false
      this.isDiagnosticsItem = false
      this.isDiagnostics = false
      this.isUpdateFirmware = false
      this.isSetCharging = false
      this._storageService.removeSessionData('setCharging')
    } else if (type == 'isClearChargingProfile') {
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
      this._storageService.removeSessionData('setCharging')
    } else if (type == 'isGetLocalListVersion') {
      this.isGetLocalListVersion = true
      this.isSendLocalListVersion = false
      this.isRemoteStopTransaction = false
      this.isDataTransfer = false
      this.isRemoteStartTransaction = false
      this.isChangeAvailability = false
      this.isGetConfig = false
      this.isReset = false
      this.isClearCache = false
      this.isChangeConfiguration = false
      this.isGetCompositeSchedule = false
      this.isClearChargingProfile = false
      this.isUnlock = false
      this.isCancelReservation = false
      this.isReserveNow = false
      this.isDiagnosticsItem = false
      this.isDiagnostics = false
      this.isUpdateFirmware = false
      this.isSetCharging = false
      this._storageService.removeSessionData('setCharging')
    } else if (type == 'isSendLocalListVersion') {
      this.isGetLocalListVersion = false
      this.isRemoteStopTransaction = false
      this.isRemoteStartTransaction = false
      this.isChangeAvailability = false
      this.isDataTransfer = false
      this.isGetConfig = false
      this.isReset = false
      this.isClearCache = false
      this.isChangeConfiguration = false
      this.isGetCompositeSchedule = false
      this.isClearChargingProfile = false
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
      this._storageService.removeSessionData('setCharging')
    } else if (type == 'updatefirmware') {
      this.isUpdateFirmware = true
      this.isPublishFirmware = false
      this.isGetLocalListVersion = false
      this.isSendLocalListVersion = false
      this.isRemoteStopTransaction = false
      this.isRemoteStartTransaction = false
      this.isDataTransfer = false
      this.isChangeAvailability = false
      this.isGetConfig = false
      this.isReset = false
      this.isClearCache = false
      this.isChangeConfiguration = false
      this.isGetCompositeSchedule = false
      this.isClearChargingProfile = false
      this.isUnlock = false
      this.isDiagnosticsItem = false
      this.isCancelReservation = false
      this.isReserveNow = false
      this.isDiagnostics = false
      this.isSetCharging = false
    } else if (type == 'isPublishFirmware') {
      this.isPublishFirmware = true
      this.isUpdateFirmware = false
      this._storageService.removeSessionData('setCharging')
    } else if (type == 'isUnlock') {
      this.isGetLocalListVersion = false
      this.isSendLocalListVersion = false
      this.isRemoteStopTransaction = false
      this.isDataTransfer = false
      this.isRemoteStartTransaction = false
      this.isChangeAvailability = false
      this.isGetConfig = false
      this.isReset = false
      this.isClearCache = false
      this.isChangeConfiguration = false
      this.isGetCompositeSchedule = false
      this.isClearChargingProfile = false
      this.isUnlock = true
      this.isDiagnosticsItem = false
      this.isCancelReservation = false
      this.isReserveNow = false
      this.isDiagnostics = false
      this.isUpdateFirmware = false
      this.isSetCharging = false
      this._storageService.removeSessionData('setCharging')
    } else if (type == 'isCancelReservation') {
      this.isGetLocalListVersion = false
      this.isSendLocalListVersion = false
      this.isRemoteStopTransaction = false
      this.isRemoteStartTransaction = false
      this.isChangeAvailability = false
      this.isDataTransfer = false
      this.isGetConfig = false
      this.isReset = false
      this.isClearCache = false
      this.isChangeConfiguration = false
      this.isGetCompositeSchedule = false
      this.isClearChargingProfile = false
      this.isUnlock = false
      this.isCancelReservation = true
      this.isDiagnosticsItem = false
      this.isReserveNow = false
      this.isDiagnostics = false
      this.isUpdateFirmware = false
      this.isSetCharging = false
      this._storageService.removeSessionData('setCharging')
    } else if (type == 'isReserveNow') {
      this.randomSixDigit = Math.floor(100000 + Math.random() * 900000)
      this.isGetLocalListVersion = false
      this.isSendLocalListVersion = false
      this.isRemoteStopTransaction = false
      this.isRemoteStartTransaction = false
      this.isDataTransfer = false
      this.isChangeAvailability = false
      this.isGetConfig = false
      this.isReset = false
      this.isClearCache = false
      this.isChangeConfiguration = false
      this.isGetCompositeSchedule = false
      this.isClearChargingProfile = false
      this.isUnlock = false
      this.isCancelReservation = false
      this.isReserveNow = true
      this.isDiagnosticsItem = false
      this.isDiagnostics = false
      this.isUpdateFirmware = false
      this.isSetCharging = false
      this._storageService.removeSessionData('setCharging')
    } else if (type == 'triggerMessage') {
      this.isUpdateFirmware = false
      this.isGetLocalListVersion = false
      this.isTriggerMess = true
      this.isDataTransfer = false
      this.isSendLocalListVersion = false
      this.isRemoteStopTransaction = false
      this.isRemoteStartTransaction = false
      this.isChangeAvailability = false
      this.isGetConfig = false
      this.isReset = false
      this.isClearCache = false
      this.isChangeConfiguration = false
      this.isGetCompositeSchedule = false
      this.isClearChargingProfile = false
      this.isUnlock = false
      this.isCancelReservation = false
      this.isReserveNow = false
      // this.isDiagnosticsItem = true;
      this.isTriggerMess = true
      this.isDiagnostics = false
      this.isSetCharging = false
      this._storageService.removeSessionData('setCharging')
    } else if (type == 'getdiagnostics') {
      this.isUpdateFirmware = false
      this.isGetLocalListVersion = true
      this.isSendLocalListVersion = false
      this.isDataTransfer = false
      this.isRemoteStopTransaction = false
      this.isRemoteStartTransaction = false
      this.isChangeAvailability = false
      this.isGetConfig = false
      this.isReset = false
      this.isClearCache = false
      this.isChangeConfiguration = false
      this.isGetCompositeSchedule = false
      this.isClearChargingProfile = false
      this.isUnlock = false
      this.isCancelReservation = false
      this.isReserveNow = false
      this.isDiagnosticsItem = false
      this.isTriggerMess = false
      this.isDiagnostics = true
      this.isSetCharging = false
      this._storageService.removeSessionData('setCharging')
    } else if (type == 'isDataTransfer') {
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
      this.isClearChargingProfile = false
      this.isUnlock = false
      this.isCancelReservation = false
      this.isReserveNow = false
      this.isDiagnosticsItem = false
      this.isDiagnostics = false
      this.isUpdateFirmware = false
      this.isSetCharging = false
      this._storageService.removeSessionData('setCharging')
    } else if (type == 'setCharging') {
      this.isSetCharging = true
      this.isGetLocalListVersion = false
      this.isSendLocalListVersion = false
      this.isDataTransfer = false
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

      this._storageService.setSessionData('setCharging', 'true')
    }
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

  control = new FormControl('')
  streets = []
  filteredStreets!: Observable<any[]>

  private _filter(value: any): string[] {
    const filterValue = value.toLowerCase()
    return this.streets.filter((option: any) => {
      return option.chargeboxid.toLowerCase().includes(filterValue)
    })
  }

  selectCharger(event: any, value: any) {
    if (event.isUserInput) {
      this.chargerId = value
      this.getConnectorIds('')
      this.GetOcppEventLog()
    }
  }
  handleError(error: any) {
    this.showLoader = false
    if (
      error !== undefined &&
      error.error !== undefined &&
      error.error.error !== undefined &&
      error.error.error.length > 0
    ) {
      this.toastr.error(error.error.error)
    }
  }

  openMakePaymentDialog(id: any) {
    const dialogRef = this.dialog.open(TransactionDialogComponent, {
      width: '30%',
      autoFocus: false,
      height: '600px',
      // panelClass: 'my-dialog-container-class2',
      data: { id: id },
    })
    dialogRef.afterClosed().subscribe((result) => {})
  }
  checkCharger(test: any) {
    this.filteredStreets = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => (value.length >= 0 ? this._filter(value) : this.streets)),
    )
    test.blur()
  }

  removeFilter(event: any, chargerId: any) {
    // if (!event.isUserInput) {
    //   return
    // }

    let isCharger =
      this.streets.find((elem: any) => {
        elem.chargeboxid
      }) == chargerId.value

    if (isCharger) {
      this.chargerId = chargerId.value
      this.getConnectorIds('')
      this.GetOcppEventLog()
    } else {
      if (chargerId.value == '') {
        this.chargerId = ''

        this.selectConnectorIds = [0]
        this.GetOcppEventLog()
      } else {
        this.chargerId = chargerId.value
        this.selectConnectorIds = [0]
        // this.diagnosticList = []
        this.dataSource.data = []
      }

      // this.get
    }
  }
  /**
   *
   * @param event
   * Page Event
   */

  pageChange(event: any) {
    if (event.pageSize !== this.pageSize) {
      this.currentPage = 1
      this.pageSize = event.pageSize
      this.paginator.pageIndex = 0
    } else {
      this.currentPage =
        event.previousPageIndex < event.pageIndex
          ? this.currentPage + 1
          : this.currentPage - 1
    }

    this.GetOcppEventLog()
  }

  /** TO Match Chargerbox ID Is Coming In Drop Down OR NOT */
  hasChargerBoxId() {
    let ind = 0

    ind = this.chargerBoxIdArr.findIndex(
      (x: any) => x.chargeboxid.toLowerCase() == this.chargerId.toLowerCase(),
    )
    // alert(ind);
    return ind == -1 ? false : true
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

  createSetCharging() {
    this.setChargingForm = this._fb.group({
      connectorId: new FormControl('', Validators.required),
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
   * check start date validation
   */
  checkStartDate() {
    if (
      this.setChargingForm.value.chargingProfile.validFrom >
      this.setChargingForm.value.chargingProfile.validTo
    ) {
      this.setChargingForm.value.chargingProfile.validTo.patchValue({
        validTo: '',
      })
    }
  }
  /**
   * Check valid from date
   * @param e
   * @returns
   */

  checkValidFrom(e: any) {
    let fromDate = this.remoteStartForm.value.chargingProfile.validFrom
    if (!fromDate) {
      this.toastr.error('Please select From Date first.')
      this.remoteStartForm.value.chargingProfile.patchValue({ validTo: '' })
      return
    }
  }
  checkValidFromForSetCharging(e: any) {
    let fromDate = this.setChargingForm.value.chargingProfile.validFrom
    if (!fromDate) {
      this.toastr.error('Please select From Date first.')
      this.setChargingForm.value.chargingProfile.patchValue({ validTo: '' })
      return
    }
  }

  dateFilterForEnd = (d: any | null) => {
    let fromDate = this.remoteStartForm.value.chargingProfile.validFrom
    return d >= fromDate
  }
  dateFilterForEndForSetCharging = (d: any | null) => {
    let fromDate = this.setChargingForm.value.chargingProfile.validFrom
    return d >= fromDate
  }

  dateFilterForStartSchedule = (d: any | null) => {
    let today = new Date()
    return d >= today
  }
  /**
   * Submit SetCharging Cmd
   */
  submitted = false
  submitSetCharging() {
    this.submitted = true
    if (this.setChargingForm.value.invalid) {
      this.toastr.error('Please fill mandatory fields.')
      return
    }

    if (this.chargerId == '') {
      this.toastr.error('Please Enter Charger Id')
      return
    }
    let chargingProfileData = this.setChargingForm.value.chargingProfile
    const pBody = {
      connectorId: +this.setChargingForm.value.connectorId,
      chargingProfile: {
        chargingProfileId: +chargingProfileData.chargingProfileId,
        transactionId: chargingProfileData.transactionId
          ? +chargingProfileData.transactionId
          : undefined,
        stackLevel: chargingProfileData.stackLevel,
        chargingProfilePurpose: chargingProfileData.chargingProfilePurpose
          ? chargingProfileData.chargingProfilePurpose
          : undefined,
        chargingProfileKind: chargingProfileData.chargingProfileKind
          ? chargingProfileData.chargingProfileKind
          : undefined,
        recurrencyKind: chargingProfileData.recurrencyKind
          ? chargingProfileData.recurrencyKind
          : undefined,
        validFrom: chargingProfileData.validFrom
          ? this.datePipe.transform(
              chargingProfileData.validFrom,
              'yyyy-MM-ddT' + this.getModifiedDate(),
            )
          : undefined,
        validTo: chargingProfileData.validTo
          ? this.datePipe.transform(
              chargingProfileData.validTo,
              'yyyy-MM-ddT' + this.getModifiedDate(),
            )
          : undefined,
        chargingSchedule: {
          duration: chargingProfileData.duration
            ? +chargingProfileData.duration
            : undefined,
          startSchedule: chargingProfileData.startSchedule
            ? chargingProfileData.startSchedule
            : undefined,
          chargingRateUnit: chargingProfileData.chargingRateUnit
            ? chargingProfileData.chargingRateUnit
            : undefined,
          chargingSchedulePeriod: {
            startPeriod: chargingProfileData.startPeriod
              ? chargingProfileData.startPeriod
              : undefined,
            limit: chargingProfileData.limit
              ? chargingProfileData.limit
              : undefined,
            numberPhases: chargingProfileData.numberPhases
              ? +chargingProfileData.numberPhases
              : undefined,
          },
          minChargingRate: chargingProfileData.minChargingRate
            ? chargingProfileData.minChargingRate
            : undefined,
        },
      },
    }
    this._diagnosticsService
      .SetChargingProfile(this.chargerId, pBody)
      .subscribe({
        next: (res) => {
          this.showLoader = true
          if (res) {
            this.showLoader = false
            this.commandType = ''
            this.setCallFunction(res, 'setCharging')
          }
        },
        error: (error: any) => {
          this.showLoader = false
          this.handleError(error)
        },
      })
  }
  getModifiedDate() {
    let date = new Date()
    let time = this.datePipe.transform(date, 'HH:mm:ss')
    return time
  }
}
