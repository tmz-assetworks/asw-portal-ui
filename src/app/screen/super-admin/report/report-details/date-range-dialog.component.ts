// import { Component } from '@angular/core';
// import { FormControl } from '@angular/forms';
// import { MatDialogRef } from '@angular/material/dialog';

// @Component({
//   selector: 'app-date-range-dialog',
//   template: `
//     <h2 mat-dialog-title>Select Date Range</h2>
//     <div mat-dialog-content>
//       <mat-form-field appearance="fill">
//         <mat-label>Start Date</mat-label>
//         <input matInput [matDatepicker]="startPicker" [formControl]="startDate">
//         <mat-datepicker-toggle matSuffix [for]="startPicker"></mat-datepicker-toggle>
//         <mat-datepicker #startPicker></mat-datepicker>
//       </mat-form-field>

//       <mat-form-field appearance="fill">
//         <mat-label>End Date</mat-label>
//         <input matInput [matDatepicker]="endPicker" [formControl]="endDate">
//         <mat-datepicker-toggle matSuffix [for]="endPicker"></mat-datepicker-toggle>
//         <mat-datepicker #endPicker></mat-datepicker>
//       </mat-form-field>
//     </div>
//     <div mat-dialog-actions>
//       <button mat-button (click)="onCancel()">Cancel</button>
//       <button mat-button color="primary" (click)="onApply()" [disabled]="!startDate.value || !endDate.value">Apply</button>
//     </div>
//   `,
//   styles: [`
//     mat-form-field {
//       width: 100%;
//       margin: 10px 0;
//     }
//   `]
// })
// export class DateRangeDialogComponent {
//   startDate = new FormControl();
//   endDate = new FormControl();

//   constructor(public dialogRef: MatDialogRef<DateRangeDialogComponent>) {}

//   onCancel(): void {
//     this.dialogRef.close();
//   }

//   onApply(): void {
//     this.dialogRef.close({
//       startDate: this.startDate.value,
//       endDate: this.endDate.value
//     });
//   }
// }
