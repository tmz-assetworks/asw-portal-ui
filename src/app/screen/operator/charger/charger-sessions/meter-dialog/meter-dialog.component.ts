import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MeterChartComponent } from 'src/app/component/dashboard/meter-chart/meter-chart.component'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'
@Component({
  selector: 'app-meter-dialog',
  templateUrl: './meter-dialog.component.html',
  styleUrls: ['./meter-dialog.component.scss'],
  imports:[
    MeterChartComponent,
    SharedMaterialModule
  ]
})
export class MeterDialogComponent {
  constructor(
    public _dialogRef: MatDialogRef<MeterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    // console.log(data)
  }
}
