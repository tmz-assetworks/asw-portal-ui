import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-timeout-dialog',
  imports: [],
  templateUrl: './timeout-dialog.component.html',
  styleUrl: './timeout-dialog.component.scss',
})
export class TimeoutDialogComponent {
  constructor(private readonly dialogRef: MatDialogRef<TimeoutDialogComponent>) {}
  close(): void {
    this.dialogRef.close();
  }
}


