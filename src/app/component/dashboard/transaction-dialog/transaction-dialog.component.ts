import { Component, Inject, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ToastrService } from 'ngx-toastr'
import { LoginService } from 'src/app/screen/login/login.service'
import { StorageService } from 'src/app/service/storage.service'

@Component({
  selector: 'app-transaction-dialog',
  templateUrl: './transaction-dialog.component.html',
  styleUrls: ['./transaction-dialog.component.scss'],
})
export class TransactionDialogComponent implements OnInit {
  id: any
  UserId: string | null
  transactionData: any
  noPriceType: boolean = false
  constructor(
    public _dialogRef: MatDialogRef<TransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    public _toastr: ToastrService,
    public _storageService: StorageService,
    private _loginService: LoginService,
  ) {
    this.UserId = this._storageService.getLocalData('user_id')
  }

  ngOnInit(): void {
    this.id = this.data.id
    this.GenerateInvoiceDetails(this.id)
  }

  closeDialog() {
    this._dialogRef.close()
  }
  /**
   *
   * @param id
   * Generate Invoice API
   */

  GenerateInvoiceDetails(id: any) {
    this._loginService.GenerateInvoiceDetails(id).subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.transactionData = res.data
        if (this.transactionData.priceType == null) {
          this.noPriceType = true
        }
      } else {
        let msg = res.statusMessage
        this._toastr.error('Transaction invoice not available.')
        this._dialogRef.close()
      }
      // if (res.statusCode == 400) {
      //   let msg = res.statusMessage
      //   this._toastr.error(msg)
      //   return
      // } else if (res.statusCode == 404) {
      //   let msg = res.statusMessage
      //   this._toastr.error(msg)
      //   this._dialogRef.close()
      // } else {
      //   this.transactionData = res.data
      //   if (this.transactionData.priceType == null) {
      //     this.noPriceType = true
      //   }
      // }
    })
  }
}
