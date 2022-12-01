import { Component, Inject, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators ,FormArray} from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ToastrService } from 'ngx-toastr'
import { interval } from 'rxjs'

import { StorageService } from 'src/app/service/storage.service'
import { DiagnosticsService } from '../../../diagnostics/diagnostics.service'
import { MatDialog } from '@angular/material/dialog';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'
import { AlertsService } from '../../../alerts/alerts.service'
import { ChargerService } from '../../../charger/charger.service'
import { SharedModule } from 'src/app/shared/shared.module'
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule,NgxMatNativeDateModule  } from '@angular-material-components/datetime-picker';

import { TransactionDialogComponent } from 'src/app/component/dashboard/transaction-dialog/transaction-dialog.component';
@Component({
  selector: 'app-command-dialog',
  templateUrl: './command-dialog.component.html',
  styleUrls: ['./command-dialog.component.scss'],
})
export class CommandDialogComponent implements OnInit {
  commandType: any
  chargerId: any
  selectConnectorIds = [0]
  UserId: string | null
  count = 1;
  idTag = '';
  intervalId: any;
  connectorID: any
  transactionId: any
  isSubmitBtn: boolean = true
  showLoader: boolean = false
  remoteStartForm: any;
  chargingProfilePurpose: any;
  firstFieldsRemoteStart:boolean= false;
  thirdFieldsRemoteStart:boolean= false;
  secondFieldsRemoteStart:boolean= false;

  firstFields = false;
  secondFields = false;
  thirdFields = false;
  isRemoteControl = false;
  isRemoteStartTransaction = false;
  chargingProfileKind: string[]
  recurrencyKind: string[]
  chargingRateUnit = ['A', 'W']
  constructor(
    public _dialogRef: MatDialogRef<CommandDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _diagnosticsService: DiagnosticsService,
    public _toastr: ToastrService,
    private _storageService: StorageService,
    public _alertsService: AlertsService,
    public _chargerService: ChargerService,
    public _sharedModule: SharedModule,
    public dialog: MatDialog,
    
    
    public SharedMaterialModule: SharedMaterialModule,
    private _fb: FormBuilder
  ) {
    this.UserId = this._storageService.getLocalData('user_id')
    this.chargerId = data.chargeBoxId
    this.commandType = data.commandType
    this.chargingProfilePurpose = this._diagnosticsService.getProfilePurpose();
    this.chargingProfileKind = this._diagnosticsService.getProfileKind();
    this.recurrencyKind = this._diagnosticsService.getrecurrencyKind();
  }

  ngOnInit(): void {
    this.getConnectorIds(this.chargerId, this.commandType)
    this.remoteStart()
  }

  @ViewChild('inputTag') inputTag: any;
  @ViewChild('picker1') picker1: any;

  /**
   * changeAvailability
   */
  changeAvailability(chargerType: any, connectorID: any) {
    if (chargerType == '') {
      this._toastr.error('Please Select Type')
      return
    } else if (connectorID == '') {
      this._toastr.error('Please Select connector Id')
      return
    }
    const pBody = {
      connectorId: parseInt(connectorID), // CH01 CH077
      type: chargerType,
    }

    this._diagnosticsService
      .ChangeAvailability(this.chargerId, pBody)
      .subscribe((res) => {
        if (res) {
          this.showLoader = true
          let cmsRequestPayload = res

          setTimeout(() => this.cmsReply(cmsRequestPayload), 3000)
        }
      })
  }

  /**
   * Reset
   */
  reset(chargerType: string) {
    if (chargerType == '') {
      this._toastr.error('Please Select Type')
      return
    }

    const pBody = {
      type: chargerType,
    }

    this._diagnosticsService.Reset(this.chargerId, pBody).subscribe((res) => {
      if (res) {
        this.showLoader = true
        let cmsRequestPayload = res
        setTimeout(() => this.cmsReply(cmsRequestPayload), 3000)
      }
    })
  }
  

  /**
   * Remote Start Transaction
   */
  // remoteStartTransaction(idTag: any, connectorId: any) {
  //   if (idTag == '') {
  //     this._toastr.error('Please Enter RFID')
  //     return
  //   }

  //   if (connectorId) {
  //     const pBody = {
  //       connectorId: connectorId, // optional
  //       idTag: idTag,
        
  //        chargingProfile: {
  //         chargingProfileId: 0,
  //         transactionId: 0,
  //         stackLevel: 0,
  //         chargingProfilePurpose: 'string',
  //         chargingProfileKind: 'string',
  //         recurrencyKind: 'string',
  //         validFrom: '2022-08-18T05:40:06.910Z',
  //         validTo: '2022-08-18T05:40:06.910Z',
  //         chargingSchedule: {
  //           duration: 0,
  //           startSchedule: '2022-08-18T05:40:06.910Z',
  //           chargingRateUnit: 'string',
  //           chargingSchedulePeriod: [
  //             {
  //               startPeriod: 0,
  //               limit: 0,
  //               numberPhases: 0,
  //             },
  //           ],
  //           minChargingRate: 0,
  //         },
  //       }, 
  //     }

  //     this._diagnosticsService
  //       .RemoteStartTransaction(this.chargerId, pBody)
  //       .subscribe((res) => {
  //         if (res) {
  //           this.showLoader = true
  //           let cmsRequestPayload = res

  //           setTimeout(() => this.cmsReply(cmsRequestPayload), 3000)
  //         }
  //       })
  //   } else {
  //     const pBody = {
  //       idTag: idTag,
  //       /* chargingProfile: {
  //         chargingProfileId: 0,
  //         transactionId: 0,
  //         stackLevel: 0,
  //         chargingProfilePurpose: 'string',
  //         chargingProfileKind: 'string',
  //         recurrencyKind: 'string',
  //         validFrom: '2022-08-18T05:40:06.910Z',
  //         validTo: '2022-08-18T05:40:06.910Z',
  //         chargingSchedule: {
  //           duration: 0,
  //           startSchedule: '2022-08-18T05:40:06.910Z',
  //           chargingRateUnit: 'string',
  //           chargingSchedulePeriod: [
  //             {
  //               startPeriod: 0,
  //               limit: 0,
  //               numberPhases: 0,
  //             },
  //           ],
  //           minChargingRate: 0,
  //         },
  //       }, */
  //     }

  //     this._diagnosticsService
  //       .RemoteStartTransaction(this.chargerId, pBody)
  //       .subscribe((res) => {
  //         if (res) {
  //           this.showLoader = true
  //           let cmsRequestPayload = res
  //           setTimeout(() => this.cmsReply(cmsRequestPayload), 3000)
  //         }
  //       })
  //   }
  // }

  submitted = false;
  // remoteStartTransaction() {
  //   this.submitted = true;
  //   if (this.remoteStartForm.invalid) {
  //     this._toastr.error('Please fill mandatory fields.');
  //     return;
  //   }

  //   if (this.chargerId == '') {
  //     this._toastr.error('Please Enter Charger Id');
  //     return;
  //   }
  //   let chargingProfileData = this.remoteStartForm.value.chargingProfile;

    
  //   const pBody = {
  //     connectorId: +this.remoteStartForm.value.connectorId,
  //     chargingProfile: {
  //       chargingProfileId: +chargingProfileData.chargingProfileId,
  //       transactionId: chargingProfileData.transactionId
  //         ? +chargingProfileData.transactionId
  //         : undefined,
  //       stackLevel: +chargingProfileData.stackLevel,
  //       chargingProfilePurpose: chargingProfileData.chargingProfilePurpose,
  //       chargingProfileKind: chargingProfileData.chargingProfileKind,
  //       recurrencyKind: chargingProfileData.recurrencyKind,
  //       validFrom: chargingProfileData.validFrom
  //         ? chargingProfileData.validFrom
  //         : undefined,
  //       validTo: chargingProfileData.validTo
  //         ? chargingProfileData.validTo
  //         : undefined,
  //       chargingSchedule: {
  //         duration: +chargingProfileData.duration,
  //         startSchedule: chargingProfileData.startSchedule
  //           ? chargingProfileData.startSchedule
  //           : undefined,
  //         chargingRateUnit: chargingProfileData.chargingRateUnit,
  //         chargingSchedulePeriod: {
  //           startPeriod: chargingProfileData.startPeriod,
  //           limit: chargingProfileData.limit,
  //           numberPhases: chargingProfileData.numberPhases
  //             ? +chargingProfileData.numberPhases
  //             : undefined,
  //         },
  //         minChargingRate: chargingProfileData.minChargingRate,
  //       },
  //     },
  //   };

  //   this._diagnosticsService
  //     .SetChargingProfile(this.chargerId, pBody)
  //     .subscribe({
  //       next: (res) => {
  //         this.showLoader = true;
  //         if (res) {
  //           this.showLoader = false;
  //           this.commandType = '';
  //           this.setCallFunction(res, 'setCharging');
  //         }
  //       },
  //       error: (error: any) => {
  //         this.showLoader = false;
  //         this.handleError(error);
  //       },
  //     });
  // }

  remoteStartTransaction() {
    this.count = 1;
    this.idTag = this.inputTag.nativeElement.value;
    // let pBody: any;
    // alert(this.idTag +'kk');
    if (this.chargerId == '') {
      this._toastr.error('Please Enter Charger Id');
      return;
    } else if (this.idTag == '') {
      this._toastr.error('Please Enter RFID');
      return;
    } else if (this.idTag.length > 20) {
      this._toastr.error('RFID Must Be Less Than 20 Characters');
      return;
    }

    /* const pBody = {
      connectorId: this.connectorID, // optional
      idTag: this.idTag
    }  */
    // pBody =
    //   this.connectorID == 0
    //     ? { idTag: this.idTag }
    //     : { connectorId: this.connectorID, idTag: this.idTag };
    let remoteStartTransactionData = this.remoteStartForm.value.chargingProfile;
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
              stackLevel: +remoteStartTransactionData.stackLevel
                ? remoteStartTransactionData.stackLevel
                : undefined,
              chargingProfilePurpose:
                remoteStartTransactionData.chargingProfilePurpose
                  ? remoteStartTransactionData.chargingProfilePurpose
                  : undefined,
              chargingProfileKind:
                remoteStartTransactionData.chargingProfileKind
                  ? remoteStartTransactionData.chargingProfileKind
                  : undefined,
              recurrencyKind: remoteStartTransactionData.recurrencyKind
                ? remoteStartTransactionData.recurrencyKind
                : undefined,
              validFrom: remoteStartTransactionData.validFrom
                ? remoteStartTransactionData.validFrom
                : undefined,
              validTo: remoteStartTransactionData.validTo
                ? remoteStartTransactionData.validTo
                : undefined,
              chargingSchedule: {
                duration: +remoteStartTransactionData.duration,
                startSchedule: remoteStartTransactionData.startSchedule
                  ? remoteStartTransactionData.startSchedule
                  : undefined,
                chargingRateUnit: remoteStartTransactionData.chargingRateUnit
                  ? remoteStartTransactionData.chargingRateUnit
                  : undefined,
                chargingSchedulePeriod: {
                  startPeriod: remoteStartTransactionData.startPeriod
                    ? remoteStartTransactionData.startPeriod
                    : undefined,
                  limit: remoteStartTransactionData.limit
                    ? remoteStartTransactionData.limit
                    : undefined,
                  numberPhases: remoteStartTransactionData.numberPhases
                    ? +remoteStartTransactionData.numberPhases
                    : undefined,
                },
                minChargingRate: remoteStartTransactionData.minChargingRate
                  ? remoteStartTransactionData.minChargingRate
                  : undefined,
              },
            },
          }
        : {
            connectorId: this.remoteStartForm.value.connectorId
              ? +this.remoteStartForm.value.connectorId
              : undefined,
            idTag: this.remoteStartForm.value.idTag,
          };

    this.showLoader = true;
    this._diagnosticsService
      .RemoteStartTransaction(this.chargerId, pBody)
      .subscribe({
        next: (res) => {
          this.showLoader = false;
          // this.isRemoteControl = false;
          // this.isRemoteStartTransaction = false;
          this.showLoader = true
  this.showLoader = true
            let cmsRequestPayload = res
            setTimeout(() => this.cmsReply(cmsRequestPayload), 3000)
        },
        error: (error) => {
          this.showLoader = false;
          if (
            error !== undefined &&
            error.url !== null &&
            error.url.includes('RemoteStartTransaction') &&
            error.error !== undefined
          ) {
            this._toastr.error(JSON.stringify(error.error.error));
          }
        },
      });
  }

  enableFields(type: string) {
    
    if (type == 'firstFields') {
      this.firstFieldsRemoteStart = !this.firstFieldsRemoteStart;
    } else if (type == 'secondFields') {
      this.secondFieldsRemoteStart = !this.secondFieldsRemoteStart;
    } else if (type == 'thirdFields') {
      this.thirdFieldsRemoteStart = !this.thirdFieldsRemoteStart;
    }
  }

  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  openMakePaymentDialog(id: any) {
    const dialogRef = this.dialog.open(TransactionDialogComponent, {
      width: '30%',
      autoFocus: false,
      height: '600px',
      // panelClass: 'my-dialog-container-class2',
      data: { id: id },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

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
    });
  }

  handleError(error: any) {
    if (
      error !== undefined &&
      error.error !== undefined &&
      error.error.error !== undefined &&
      error.error.error.length > 0
    ) {
      this._toastr.error(error.error.error);
    }
  }

  setCallFunction(res: any, cmdType?: string) {
    this.commandType = '';
    this.count = 1;
    let cmsRequestPayload = res;
    this._toastr.success(JSON.stringify(res));

    this.showLoader = true;
    this.intervalId = setInterval(() => {
      if (this.count < 4 && this.commandType == '') {
        this._diagnosticsService.CmsReply(cmsRequestPayload).subscribe({
          next: (res) => {
            this.showLoader = false;
            if (res == 404) {
              this._toastr.error('Error Connecting...');
              this.count = this.count + 1;
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
              cmdType == 'setCharging'
            ) 
            {
              if (res !== undefined && res.status !== undefined) {
                this.showLoader = false;
                this._toastr.success(res.status);
                this.count = 4;
                //this.GetOcppEventLog();
              } else if (res !== undefined && res.meterStart !== undefined) {
                this.showLoader = false;
                this._toastr.success(JSON.stringify(res));
                this.count = this.count + 1;
                //this.GetOcppEventLog();
              }
            } else if (cmdType == 'getConfig') {
              // unknownKey
              if (res !== undefined && res.unknownKey !== undefined) {
                this.count = 4;
              }
              //this.GetOcppEventLog();
            } else if (cmdType == 'localList') {
              // unknownKey
              if (res !== undefined && res.listVersion !== undefined) {
                this.count = 4;
              }
              //this.GetOcppEventLog();
            } else if (cmdType == 'update') {
              if (res == '{}') {
                this.count = 4;
              }
            } else if (cmdType == 'getdiagnostics') {
              if (
                res !== undefined &&
                res.fileName !== '' &&
                res.fileName !== undefined
              ) {
                this.count = 4;
              }
            }
          },
          error: (error: any) => {
            this.showLoader = false;
            this.handleError(error);
          },
        });
      }
      if (this.count > 3) {
        clearInterval(this.intervalId);
        this.showLoader = false;
      }
    }, 3000);
  }

  /**
   * Remote Stop Transaction
   */
  remoteStopTransaction(transactionId: any) {
    if (transactionId == '') {
      this._toastr.error('Please Enter Transaction Id')
      return
    }
    const pBody = {
      transactionId: transactionId,
    }

    this._diagnosticsService
      .RemoteStopTransaction(this.chargerId, pBody)
      .subscribe((res) => {
        if (res) {
          this.showLoader = true
          let cmsRequestPayload = res

          setTimeout(() => this.cmsReply(cmsRequestPayload), 3000)
        }
      })
  }
  /***
   *
   *
   */
  cmsReply(cmsRequestPayload: any) {
    const source = interval(3000)
    const subscribe = source.subscribe((val) => {
      if (val <= 2) {
        this._diagnosticsService
          .CmsReply(cmsRequestPayload)
          .subscribe((res) => {
            if (res == 404) {
              this._toastr.error('Error Connecting...')
              this._dialogRef.close()
            } else if (res.status == 'Accepted') {
              let msg = JSON.stringify(res.status)
              subscribe.unsubscribe()
              this.showLoader = false
              this._toastr.success(msg)
              this._dialogRef.close()
            } else {
              subscribe.unsubscribe()
              this.showLoader = false
              let msg = JSON.stringify(res)
              this._toastr.error(msg)
              this._dialogRef.close()
            }
          })
      } else {
        this.showLoader = false
        subscribe.unsubscribe()
        this._toastr.error('Error Connecting Charger...')
      }
    })
  }

  /**
   *Get Connector Id
   * @param chargerId
   *
   */
  getConnectorIds(chargerId: any, commandType: any) {
    const pBody = {
      chargeBoxId: chargerId,
      operatorId: this.UserId,
    }
    this._diagnosticsService.getConnectorId(pBody).subscribe({
      next: (res) => {
        // if(commandType=='start'){
        //   this.selectConnectorIds.push(res.data.connectorIds.split(','))

        // }else{

        // }

        if (commandType == 'start') {
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
      },
      error: (err) => {
        this._toastr.error('No connector Id Found')
      },
    })
  }

  closeDialog() {
    this._dialogRef.close()
  }
}
