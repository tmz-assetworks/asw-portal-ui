import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module';

@Component({
  selector: 'app-date-range-dialog',
  template: `
    <h2 mat-dialog-title>Select Date Range</h2>
    <div mat-dialog-content>
      <form [formGroup]="rangeForm">
        <mat-form-field appearance="fill">
          <mat-label>Start date</mat-label>
          <input matInput [matDatepicker]="startPicker" formControlName="start" (dateChange)="onStartDateChange($event)">
          <mat-datepicker-toggle matSuffix [for]="startPicker"></mat-datepicker-toggle>
          <mat-datepicker #startPicker></mat-datepicker>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>End date</mat-label>
          <input matInput [matDatepicker]="endPicker" formControlName="end" [max]="maxEndDate">
          <mat-datepicker-toggle matSuffix [for]="endPicker"></mat-datepicker-toggle>
          <mat-datepicker #endPicker></mat-datepicker>
        </mat-form-field>
      </form>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-button color="primary" (click)="onSubmit()" [disabled]="!rangeForm.valid">Submit</button>
    </div>
  `,
  imports:[CommonModule,SharedMaterialModule,ReactiveFormsModule],
  styles: [`
    mat-form-field {
      width: 100%;
      margin: 10px 0;
    }
  `]
})
export class DateRangeDialogComponent {
  maxEndDate: Date;
  rangeForm = new FormGroup({
    start: new FormControl(null),
    end: new FormControl(null)
  });

  constructor(
    public dialogRef: MatDialogRef<DateRangeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Set maximum end date to today
    this.maxEndDate = new Date();
  }

 onStartDateChange(event: MatDatepickerInputEvent<Date>) {
  const start: any = event.value ?? null;
  const end: any = this.rangeForm.value.end;

  if (start && end && start > end) {
    this.rangeForm.patchValue({ end: null });
  }
}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.rangeForm.valid) {
      const startDate:any = this.rangeForm.value.start;
      const endDate:any = this.rangeForm.value.end;
      
      if (startDate && endDate) {
        // Ensure end date is not in the future (additional validation)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const validatedEndDate = endDate > today ? today : endDate;
        
        const months = this.calculateMonthsBetweenDates(startDate, validatedEndDate);
        this.dialogRef.close({
          startDate,
          endDate: validatedEndDate,
          months
        });
      }
    }
  }

  private calculateMonthsBetweenDates(start: Date, end: Date): number {
    const startYear = start.getFullYear();
    const startMonth = start.getMonth();
    const endYear = end.getFullYear();
    const endMonth = end.getMonth();

    return (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
  }
}