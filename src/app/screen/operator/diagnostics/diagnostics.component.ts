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
import { FormControl } from '@angular/forms'

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
  diagnosticList = []
  tooltipList: any
  isRemoteStopTransaction = false
  isRemoteStartTransaction = false
  isGetCompositeSchedule = false
  isGetLocalListVersion = false
  currentDate: any;
  randomSixDigit: number = 0;
  constructor(
    public _diagnosticsService: DiagnosticsService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private _storageService: StorageService,
    public _chargerService: ChargerService,
  ) {
    this.requestMessTypes = ['BootNotification','DiagnosticsStatusNotification','FirmwareStatusNotification','Heartbeat',
  'MeterValues','StatusNotification'];
  
  this.currentDate = this._diagnosticsService.currentDate() + 'T00:00'
    this.UserId = this._storageService.getLocalData('user_id')
  }
  ngOnInit(): void {
    this.GetChargeBoxIDList()
    this.filteredStreets = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => (value && value.length >= 0 ? this._filter(value) : [])),
    )
    this.GetOcppEventLog()
  }

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
  digitValidate = new RegExp('^[0-9]+$');
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
  expiryDate: any;
  requestMessTypes: any;
  reqMessType = ''

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

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator
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
    } else if (tileType == 'diagnostics') {
      this.isFireWareItem = false
      this.isProvisioning = false
      this.isRemoteControl = false
      this.isSmartCharging = false
      this.isAuthorization = false
      this.isDiagnosticsItem = true
      this.isTriggerMess = false
    }
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
    if (this.chargerId == '') {
      this.toastr.error('Please Enter Charger Id')
      return
    }

    this.inputKeyConfig = this.inputKey.nativeElement.value
    const pBody = {
      // key: [''],
      key: [this.inputKeyConfig],
    }

    this._diagnosticsService
      .GetConfiguration(this.chargerId, pBody)
      .subscribe((res: any) => {
        if (res) {
          // let cmsRequestPayload = res
          // alert(JSON.stringify(res))

          this.isProvisioning = false
          this.setCallFunction(res, 'getConfig')
         
        }
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
    }
    const pBody = {}
    this._diagnosticsService
      .ClearCache(this.chargerId, pBody)
      .subscribe((res: any) => {
        if (res) {
          // let cmsRequestPayload = res
          // alert(JSON.stringify(res))
          this.isProvisioning = false
          this.setCallFunction(res, 'clear')
          
        }
      })
  }

  /**
   * Reset
   */
  reset(chargerType: string) {
    if (this.chargerId == '') {
      this.toastr.error('Please Enter Charger Id')
      return
    } else if (this.chargerType == '') {
      this.toastr.error('Please Select Type')
      return
    }

    const pBody = {
      type: chargerType,
    }

    this._diagnosticsService.Reset(this.chargerId, pBody).subscribe((res) => {
      if (res) {
        //let cmsRequestPayload = res
        //alert(JSON.stringify(res))
        this.isProvisioning = false
        this.setCallFunction(res, 'reset')
        
      }
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
        if (
          res.data[0].responsePayload !== undefined &&
          res.data[0].responsePayload !== ''
        ) {
          let a = res.data[0].responsePayload
          this.transactionId = parseInt(
            a.split('transactionId')[1].split(':')[1].split('\n')[0].trim(),
          )
        }
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
      .subscribe((res) => {
        if (res) {
          this.isProvisioning = false
          this.setCallFunction(res, 'changeconfig')
          /* this.commandType = ''
          let cmsRequestPayload = res
          alert(JSON.stringify(res))
          this.isProvisioning = false
          this._diagnosticsService
            .CmsReply(cmsRequestPayload)
            .subscribe((res) => {
              if (res == 404) {
                alert('Error Connecting...')
              } else {
                this.GetOcppEventLog('',this.currentPage,this.totalRecords)
              }
            }) */
        }
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
    } else if (this.chargerType == '') {
      this.toastr.error('Please Select Type')
      return
    } /* else if (this.connectorID == 0) {
      this.toastr.error('Please Select connectorID')
      return
    } */
    const pBody = {
      connectorId: parseInt(connectorID), // CH01 CH077
      type: chargerType,
    }

    this._diagnosticsService
      .ChangeAvailability(this.chargerId, pBody)
      .subscribe((res) => {
        this.commandType = ''
        if (res) {
          // let cmsRequestPayload = res
          // alert(JSON.stringify(res))
          this.isProvisioning = false
          this.setCallFunction(res, 'change')
          
        }
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
    this.isUpdateFirmware = false
    this.isReserveNow = false
    this.isUnlock = false
    this.isCancelReservation = false
    this.isTriggerMess = false
    this.isRemoteStartTransaction = false

    
  }

  /**
   * Remote Start Transaction
   */
  remoteStartTransaction() {
    this.count = 1
    this.idTag = this.inputTag.nativeElement.value
    let pBody: any
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

    /* const pBody = {
      connectorId: this.connectorID, // optional
      idTag: this.idTag
    }  */
    pBody =
      this.connectorID == 0
        ? { idTag: this.idTag }
        : { connectorId: this.connectorID, idTag: this.idTag }
    this._diagnosticsService
      .RemoteStartTransaction(this.chargerId, pBody)
      .subscribe((res) => {
        this.isRemoteControl = false
        this.setCallFunction(res, 'remoteStart')
        
      }, (error) => {
        if(error !== undefined && error.url !== null  && error.url.includes('RemoteStartTransaction') && error.error !== undefined) {
          this.toastr.error(JSON.stringify(error.error.error));
          
        }
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
    // const pBody = {
    //   connectorId: this.connectorID,
    //   duration: this.inputDurationValue, // 0
    //   chargingRateUnit: this.charingRateUnit,
    // }

    this._diagnosticsService
      .GetCompositeSchedule(this.chargerId, pBody)
      .subscribe((res) => {
        this.commandType = ''

        if (res) {
          // let cmsRequestPayload = res
          // alert(JSON.stringify(res))
          this.isRemoteControl = false
          this.setCallFunction(res, 'composite')
          /* this._diagnosticsService
            .CmsReply(cmsRequestPayload)
            .subscribe((res) => {
              if (res == 404) {
                alert('Error Connecting...')
              } else {
                this.GetOcppEventLog('',this.currentPage,this.totalRecords)
              }
            }) */
        }
      })
  }

  /**
   * Get LocalListVersion
   */
  getLocalListVersion() {
    if (this.chargerId == '') {
      this.toastr.error('Please Enter Charger Id')
      return
    }
    const pBody = {}

    this._diagnosticsService
      .getLocalListVersion(this.chargerId, pBody)
      .subscribe((res: any) => {
        if (res) {
          // this.commandType = ''
          // let cmsRequestPayload = res
          //  alert(JSON.stringify(res))

          this.isAuthorization = false
          this.setCallFunction(res, 'localList')
          /* this._diagnosticsService
            .CmsReply(cmsRequestPayload)
            .subscribe((res: any) => {
              if (res == 404) {
                alert('Error Connecting...')
              } else {
                this.GetOcppEventLog('',this.currentPage,this.totalRecords)
              }
            }) */
        }
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
    }
    
    this.commandType = cmdType

    if (this.commandType == 'start' || this.commandType == 'unlock' || this.commandType == 'triggerMessage') { 
      this.getConnectorIds('remoteStart')
    } else {
      this.getConnectorIds('')
    }
  }

  selectOption(event: any) {
    //getted from event
    // console.log(id);
    //getted from binding
    // alert(event.target.value);
    this.chargerType = ''
    this.chargerType = event.target.value
    if (this.chargerType == '') {
      this.toastr.error('Please Select Type')
      return
    }
    /* if (this.commandType == 'change') {
     this.changeAvailability(this.chargerType, -1)
    } else if (this.commandType == 'reset') {
     this.reset(this.chargerType)
    } */
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
      this.commandType !== 'getComposite' && this.commandType !== 'isReserveNow'
    ) {
      this.toastr.error('Please Select Connector ID')
      return
    }
    
  }


  selectRequestMessage(event: any) {
    //alert(this.commandType);
    this.reqMessType = event.target.value
    if (
      this.reqMessType == ''
    ) {
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
    } 
    const pBody = {}
    this._diagnosticsService
      .RemoteStopTransaction(this.chargerId, pBody)
      .subscribe((res) => {
        if (res) {
          
          this.isRemoteControl = false
          this.setCallFunction(res, 'stop')
         
        }
      })
  }

   /**
   * Unlock
   */
    unlock(connectorID: number) {
      if (this.chargerId == '') {
        this.toastr.error('Please Enter Charger Id')
        return
      } else if (connectorID == 0) {
        this.toastr.error('Please Select Connector ID')
        return
      }
  
      const pBody = {
        connectorId: connectorID,
      }
  
      this._diagnosticsService.unlock(this.chargerId, pBody).subscribe((res) => {
        if (res) {
          //let cmsRequestPayload = res
          //alert(JSON.stringify(res))
          this.isRemoteControl = false
          this.commandType = ''
          this.isUnlock = false
          this.setCallFunction(res, 'unlock');
        }
      },(error) => {
        this.handleError(error)
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
      } else if (this.inputReserveTag.length == 0) {
        this.toastr.error('Please Enter ReservationId')
        return
      }
     let digitValidate = this.inputReserveTag.trim();
    if(!this.digitValidate.test(digitValidate)) {
      this.toastr.error('Please Enter Numbers Only')
    } if (parseInt(digitValidate) == 0) {
      this.toastr.error('Please Enter Number Greater Than 0')
      return
    }
   // return
      const pBody = {
        reservationId: parseInt(digitValidate)
      }
  
      this._diagnosticsService.cancelReservation(this.chargerId, pBody).subscribe((res) => {
        if (res) {
          //let cmsRequestPayload = res
          //alert(JSON.stringify(res))
          this.isRemoteControl = false
          this.commandType = ''
          this.isCancelReservation = false
          this.setCallFunction(res, 'cancel');
        }
      },(error) => {
      this.handleError(error);
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
      } else if(this.expiryDate == '') {
      this.toastr.error('Please Select Expiry Date')
    }
  else if (this.idTag == '') {
      this.toastr.error('Please Enter RFID')
      return
    } else if (this.idTag.length > 20) {
      this.toastr.error('RFID Must Be Less Than 20 Characters')
      return
    } else if (this.inputKeyConfig.length > 20) {
      this.toastr.error('ParentId Tag Must Be Less Than 20 Characters')
      return
    }
    else if (this.inputReserveTag.length == 0) {
      this.toastr.error('Please Enter ReservationId')
      return
    }
   let digitValidate = this.inputReserveTag.trim();
  if(!this.digitValidate.test(digitValidate)) {
    this.toastr.error('Please Enter Numbers Only')
  } if (parseInt(digitValidate) == 0) {
    this.toastr.error('Please Enter Number Greater Than 0')
    return
  }
 // return
    const pBody = {
      connectorId: connectorID,
      reservationId: digitValidate,
      expiryDate: this.expiryDate,
      idTag: this.idTag,
      parentIdTag: this.inputKeyConfig

    }

    this._diagnosticsService.reserveNow(this.chargerId, pBody).subscribe({next: (res) => {
      if (res) {
        
        this.isRemoteControl = false
        this.commandType = ''
       // this.isCancelReservation = false
       this.isReserveNow = false;
        this.setCallFunction(res, 'isReserveNow');
      }
    },error: (error) => {
      if(error !== undefined && error.error !== undefined) {
        this.toastr.error(JSON.stringify(error.error.error));
        
      }
    } })
  } 

  /**
   * triggerMessage
   */
   triggerMessage(connectorID: any) {
    if (this.chargerId == '') {
      this.toastr.error('Please Enter Charger Id')
      return
    } else if (
      this.reqMessType == ''
    ) {
      this.toastr.error('Please Select RequestMessage')
      return
    }
  // return
  let pBody: any;
   pBody = connectorID > 0 ? {
      connectorId: connectorID,
      requestedMessage: this.reqMessType
    } : {
      requestedMessage: this.reqMessType
    }

    this._diagnosticsService.triggerMessage(this.chargerId, pBody).subscribe((res) => {
      if (res) {
        //let cmsRequestPayload = res
        //alert(JSON.stringify(res))
        this.isDiagnosticsItem = false
        this.commandType = ''
        this.isTriggerMess = false;
        
        this.setCallFunction(res, 'cancel');
      }
    }/* ,(error) => {
      if(error !== undefined && error.error !== undefined) {
        this.toastr.error(JSON.stringify(error.error.error));
        
      }
    } */)
  }   

  /**
   * updateFirmware
   */
   updateFirmware(connectorID: any) {
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
    this.inputReserveTag = this.inputReserveTagValue.nativeElement.value // Retry Interval
    let retryValue = this.inputretriesValue.nativeElement.value // retries
    this.enterLocationValue = this.enterLocation.nativeElement.value
    let digitValidate = this.inputReserveTag.trim();
   let retryKeyValue = retryValue.trim()
    if (this.chargerId == '') {
      this.toastr.error('Please Enter Charger Id')
      return
    } else if (this.enterLocationValue.length == 0) {
      this.toastr.error('Please Enter Location')
      return
    } else if (!this.enterLocationValue.match(urlPattern)) {
      this.toastr.error('Please Enter Valid URL')
      return
    }  else if (this.selectedDate == undefined) {
      this.toastr.error('Please Enter Retrieve Date')
      return
    } else if (this.selectedDate !== undefined && this.selectedDate.length == 0) {
      this.toastr.error('Please Enter Retrieve Date')
      return
    } if(this.selectedDate <= this._diagnosticsService.currentDate()) {
      this.toastr.error('Date Must Not Less Than Current Date')
      return
    }
   
  else if(this.inputReserveTag.length > 0 && !this.digitValidate.test(digitValidate)) {
    this.toastr.error('Please Enter Numbers Only For Retry Interval')
  } if (parseInt(digitValidate) == 0) {
    this.toastr.error('Please Enter Number Greater Than 0 For RetryInterval')
    return
  }
  if(retryKeyValue.length > 0 && !this.digitValidate.test(retryKeyValue)) {
    this.toastr.error('Please Enter Numbers Only For Retries ')
  } if (parseInt(retryKeyValue) == 0) {
    this.toastr.error('Please Enter Number Greater Than 0 For Retries')
    return
  }
  // return
  const  pBody = {
    location: this.enterLocationValue,
    retries: retryKeyValue.length == 0 ? 0 : parseInt(retryKeyValue),
    retrieveDate: this.expiryDate,
    retryInterval: this.inputReserveTag.length == 0 ? 0 : parseInt(this.inputReserveTag)
  }
    this._diagnosticsService.updateFirmware(this.chargerId, pBody).subscribe((res) => {
      if (res) {
        this.isFireWareItem = false
        this.commandType = ''
        this.isUpdateFirmware = false
        this.setCallFunction(res, 'update');
      }
    })
  } 
  selectedDate: any
  
 selectDate(event: any) {
  
  this.selectedDate = event.target.value;
  var date = new Date(this.selectedDate);
  this.expiryDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString()

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
        if ((type == 'remoteStart' || type == 'unlock' || type == 'triggerMessage') && type !== '') {
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
            // this.selectConnectorIds.push(res.data.connectorIds.split(','))
          }
        }

        // if (res.data !== undefined) {
        //   if (res.data.connectorIds !== '') {

        //     this.selectConnectorIds.push(res.data.connectorIds.split(','))
        //   }
        // }
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
        // < 3
       // console.log('call' + this.count)
        this._diagnosticsService
          .CmsReply(cmsRequestPayload)
          .subscribe((res) => {
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
              cmdType == 'stop' || cmdType == 'unlock' || cmdType == 'isReserveNow' || 
              cmdType == 'triggerMessage' || cmdType == 'cancel'
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
            } else if(cmdType == 'update') {
              if (res == '{}') {
                this.count = 4
              }
            }
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
      this.isRemoteStartTransaction = false
      this.isGetCompositeSchedule = false
      this.isUnlock = false
      this.isCancelReservation = false
      this.isReserveNow = false
      this.isDiagnosticsItem = false
    } else if (type == 'isClearCache') {
      this.isClearCache = true
      this.isGetConfig = false
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
    } else if (type == 'isReset') {
      this.isReset = true
      this.isGetConfig = false
      this.isClearCache = false
      this.isChangeConfiguration = false
      this.isChangeAvailability = false
      this.isRemoteStopTransaction = false
      this.isRemoteStartTransaction = false
      this.isGetCompositeSchedule = false
      this.isUnlock = false
      this.isCancelReservation = false
      this.isReserveNow = false
      this.isDiagnosticsItem = false
    } else if (type == 'isChangeConfiguration') {
      this.isChangeConfiguration = true
      this.isGetConfig = false
      this.isReset = false
      this.isClearCache = false
      this.isChangeAvailability = false
      this.isRemoteStopTransaction = false
      this.isRemoteStartTransaction = false
      this.isGetCompositeSchedule = false
      this.isUnlock = false
      this.isCancelReservation = false
      this.isReserveNow = false
      this.isDiagnosticsItem = false
    } else if (type == 'isChangeAvailability') {
      this.isChangeAvailability = true
      this.isGetConfig = false
      this.isReset = false
      this.isClearCache = false
      this.isChangeConfiguration = false
      this.isRemoteStopTransaction = false
      this.isRemoteStartTransaction = false
      this.isGetCompositeSchedule = false
      this.isUnlock = false
      this.isCancelReservation = false
      this.isReserveNow = false
      this.isDiagnosticsItem = false
    } else if (type == 'isRemoteStopTransaction') {
      this.isChangeAvailability = false
      this.isGetConfig = false
      this.isReset = false
      this.isClearCache = false
      this.isChangeConfiguration = false
      this.isRemoteStartTransaction = false
      this.isRemoteStopTransaction = true
      this.isGetCompositeSchedule = false
      this.isUnlock = false
      this.isCancelReservation = false
      this.isReserveNow = false
      this.isDiagnosticsItem = false
    } else if (type == 'isRemoteStartTransaction') {
      this.isChangeAvailability = false
      this.isGetConfig = false
      this.isReset = false
      this.isClearCache = false
      this.isChangeConfiguration = false
      this.isRemoteStopTransaction = false
      this.isRemoteStartTransaction = true
      this.isGetCompositeSchedule = false
      this.isUnlock = false
      this.isCancelReservation = false
      this.isReserveNow = false
      this.isDiagnosticsItem = false
    } else if (type == 'isGetCompositeSchedule') {
      this.isRemoteStopTransaction = false
      this.isRemoteStartTransaction = false
      this.isChangeAvailability = false
      this.isGetConfig = false
      this.isReset = false
      this.isClearCache = false
      this.isChangeConfiguration = false
      this.isGetCompositeSchedule = true
      this.isUnlock = false
      this.isCancelReservation = false
      this.isReserveNow = false
      this.isDiagnosticsItem = false
    } else if (type == 'isGetLocalListVersion') {
      this.isGetLocalListVersion = true
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
    } else if (type == 'updatefirmware') {
      this.isUpdateFirmware = true
      this.isPublishFirmware = false
      this.isGetLocalListVersion = false
      this.isRemoteStopTransaction = false
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
    } else if (type == 'isPublishFirmware') {
      this.isPublishFirmware = true
      this.isUpdateFirmware = false
      
    } else if (type == 'isUnlock') {
      this.isGetLocalListVersion = false
      this.isRemoteStopTransaction = false
      this.isRemoteStartTransaction = false
      this.isChangeAvailability = false
      this.isGetConfig = false
      this.isReset = false
      this.isClearCache = false
      this.isChangeConfiguration = false
      this.isGetCompositeSchedule = false
      this.isUnlock = true
      this.isDiagnosticsItem = false
      this.isCancelReservation = false
      this.isReserveNow = false
    } else if (type == 'isCancelReservation') {
      this.isGetLocalListVersion = false
      this.isRemoteStopTransaction = false
      this.isRemoteStartTransaction = false
      this.isChangeAvailability = false
      this.isGetConfig = false
      this.isReset = false
      this.isClearCache = false
      this.isChangeConfiguration = false
      this.isGetCompositeSchedule = false
      this.isUnlock = false
      this.isCancelReservation = true
      this.isDiagnosticsItem = false
      this.isReserveNow = false
    } else if (type == 'isReserveNow') {
      this.randomSixDigit = Math.floor(100000 + Math.random() * 900000);
      this.isGetLocalListVersion = false
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
      this.isReserveNow = true
      this.isDiagnosticsItem = false
    } else if (type == 'triggerMessage') {
      this.isGetLocalListVersion = true
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
      this.isDiagnosticsItem = true
      this.isTriggerMess = true
    } 
  }

  /**
   * Get Charger List
   */

  GetChargeBoxIDList() {
    this._chargerService.GetChargeBoxIDList().subscribe((res) => {
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
    if(error !== undefined && error.error !== undefined && error.error.error !== undefined && error.error.error.length > 0) {
     this.toastr.error(JSON.stringify(error.error.error));
     
   } 
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
}
