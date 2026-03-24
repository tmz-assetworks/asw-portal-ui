import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-warning-dialog',
  templateUrl: './warning-dialog.component.html',
  styleUrls: ['./warning-dialog.component.scss']
})
export class WarningDialogComponent {
  constructor(
    private readonly dialogRef: MatDialogRef<WarningDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { minutesLeft: number }
  ) {}

  stayLoggedIn(): void {
    this.dialogRef.close('extend');
  }

  logout(): void {
    this.dialogRef.close('logout');
  }
  dismiss(): void {
    this.dialogRef.close('extend');
  }
}
