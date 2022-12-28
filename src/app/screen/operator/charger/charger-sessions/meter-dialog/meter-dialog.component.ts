import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-meter-dialog',
  templateUrl: './meter-dialog.component.html',
  styleUrls: ['./meter-dialog.component.scss'],
})
export class MeterDialogComponent {
  constructor(
    public _dialogRef: MatDialogRef<MeterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    // console.log(data)
  }
}
