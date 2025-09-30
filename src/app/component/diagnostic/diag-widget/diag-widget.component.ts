import { CommonModule } from '@angular/common'
import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-diag-widget',
  templateUrl: './diag-widget.component.html',
  styleUrls: ['./diag-widget.component.scss'],
  imports:[CommonModule]
})
export class DiagWidgetComponent implements OnInit {
  showToolTipData: any

  @Input() set isProvisioning(value: boolean) {
    if (value !== undefined) {
      this.showToolTipData = value
    }
  }
  @Input() set isFireWareItem(value: boolean) {
    if (value !== undefined) {
      this.showToolTipData = value
    }
  }
  @Input() set isRemoteControl(value: boolean) {
    if (value !== undefined) {
      this.showToolTipData = value
    }
  }
  @Input() set isSmartCharging(value: boolean) {
    if (value !== undefined) {
      this.showToolTipData = value
    }
  }

  @Input() set isAuthorization(value: boolean) {
    if (value !== undefined) {
      this.showToolTipData = value
    }
  }

  @Input() set isDiagnosticsItem(value: boolean) {
    if (value !== undefined) {
      this.showToolTipData = value
    }
  }

  constructor() {}

  ngOnInit(): void {}
}
