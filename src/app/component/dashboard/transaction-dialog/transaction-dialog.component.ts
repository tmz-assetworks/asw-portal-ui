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
  constructor(
    public _dialogRef: MatDialogRef<TransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    public _toastr: ToastrService,
    public _storageService: StorageService,
    private _loginService: LoginService,
  ) {
    this.UserId = this._storageService.getLocalData('user_id')
    this.id = data.id

    this.GenerateInvoiceDetails(this.id)
  }

  ngOnInit(): void {}

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
      if (res.statusCode == 400) {
        let msg = res.statusMessage

        this._toastr.error(msg)
        return
      } else {
        this.transactionData = res.data
      }
    })
  }
}
