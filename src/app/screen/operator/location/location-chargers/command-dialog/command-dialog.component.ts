import { Component, Inject, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ToastrService } from 'ngx-toastr'
import { interval } from 'rxjs'
import { StorageService } from 'src/app/service/storage.service'
import { DiagnosticsService } from '../../../diagnostics/diagnostics.service'

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

  connectorID: any
  transactionId: any
  isSubmitBtn: boolean = true
  showLoader: boolean = false
  constructor(
    public _dialogRef: MatDialogRef<CommandDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _diagnosticsService: DiagnosticsService,
    public _toastr: ToastrService,
    private _storageService: StorageService,
  ) {
    // console.log(data)
    this.UserId = this._storageService.getLocalData('user_id')
    this.chargerId = data.chargeBoxId
    this.commandType = data.commandType
  }

  ngOnInit(): void {
    this.getConnectorIds(this.chargerId, this.commandType)
  }

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
  remoteStartTransaction(idTag: any, connectorId: any) {
    if (idTag == '') {
      this._toastr.error('Please Enter RFID')
      return
    }

    if (connectorId) {
      const pBody = {
        connectorId: connectorId, // optional
        idTag: idTag,
        /* chargingProfile: {
          chargingProfileId: 0,
          transactionId: 0,
          stackLevel: 0,
          chargingProfilePurpose: 'string',
          chargingProfileKind: 'string',
          recurrencyKind: 'string',
          validFrom: '2022-08-18T05:40:06.910Z',
          validTo: '2022-08-18T05:40:06.910Z',
          chargingSchedule: {
            duration: 0,
            startSchedule: '2022-08-18T05:40:06.910Z',
            chargingRateUnit: 'string',
            chargingSchedulePeriod: [
              {
                startPeriod: 0,
                limit: 0,
                numberPhases: 0,
              },
            ],
            minChargingRate: 0,
          },
        }, */
      }

      this._diagnosticsService
        .RemoteStartTransaction(this.chargerId, pBody)
        .subscribe((res) => {
          if (res) {
            this.showLoader = true
            let cmsRequestPayload = res

            setTimeout(() => this.cmsReply(cmsRequestPayload), 3000)
          }
        })
    } else {
      const pBody = {
        idTag: idTag,
        /* chargingProfile: {
          chargingProfileId: 0,
          transactionId: 0,
          stackLevel: 0,
          chargingProfilePurpose: 'string',
          chargingProfileKind: 'string',
          recurrencyKind: 'string',
          validFrom: '2022-08-18T05:40:06.910Z',
          validTo: '2022-08-18T05:40:06.910Z',
          chargingSchedule: {
            duration: 0,
            startSchedule: '2022-08-18T05:40:06.910Z',
            chargingRateUnit: 'string',
            chargingSchedulePeriod: [
              {
                startPeriod: 0,
                limit: 0,
                numberPhases: 0,
              },
            ],
            minChargingRate: 0,
          },
        }, */
      }

      this._diagnosticsService
        .RemoteStartTransaction(this.chargerId, pBody)
        .subscribe((res) => {
          if (res) {
            this.showLoader = true
            let cmsRequestPayload = res
            setTimeout(() => this.cmsReply(cmsRequestPayload), 3000)
          }
        })
    }
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
      console.log(val, 'value')

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
