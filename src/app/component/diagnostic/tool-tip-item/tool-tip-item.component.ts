import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-tool-tip-item',
  templateUrl: './tool-tip-item.component.html',
  styleUrls: ['./tool-tip-item.component.scss'],
  imports:[CommonModule]
})
export class ToolTipItemComponent {
  showToolTipitem: any

  @Input() set isGetConfig(value: boolean) {
    if (value !== undefined) {
      this.showToolTipitem = value
    }
  }
  @Input() set isClearCache(value: boolean) {
    if (value !== undefined) {
      this.showToolTipitem = value
    }
  }

  @Input() set isReset(value: boolean) {
    if (value !== undefined) {
      this.showToolTipitem = value
    }
  }
  @Input() set isDataTransfer(value: boolean) {
    if (value !== undefined) {
      this.showToolTipitem = value
    }
  }

  @Input() set isChangeConfiguration(value: boolean) {
    if (value !== undefined) {
      this.showToolTipitem = value
    }
  }
  @Input() set isChangeAvailability(value: boolean) {
    if (value !== undefined) {
      this.showToolTipitem = value
    }
  }
  @Input() set isGetLocalListVersion(value: boolean) {
    if (value !== undefined) {
      this.showToolTipitem = value
    }
  }
  @Input() set isSendLocalListVersion(value: boolean) {
    if (value !== undefined) {
      this.showToolTipitem = value
    }
  }
  @Input() set isRemoteStartTransaction(value: boolean) {
    if (value !== undefined) {
      this.showToolTipitem = value
    }
  }
  @Input() set isRemoteStopTransaction(value: boolean) {
    if (value !== undefined) {
      this.showToolTipitem = value
    }
  }
  @Input() set isGetCompositeSchedule(value: boolean) {
    if (value !== undefined) {
      this.showToolTipitem = value
    }
  }
  @Input() set isClearChargingProfile(value: boolean) {
    if (value !== undefined) {
      this.showToolTipitem = value
    }
  }
  @Input() set isupdatefirmware(value: boolean) {
    if (value !== undefined) {
      this.showToolTipitem = value
    }
  }
  @Input() set isPublishFirmware(value: boolean) {
    if (value !== undefined) {
      this.showToolTipitem = value
    }
  }

  @Input() set isUnlock(value: boolean) {
    if (value !== undefined) {
      this.showToolTipitem = value
    }
  }

  @Input() set isCancelReservation(value: boolean) {
    if (value !== undefined) {
      this.showToolTipitem = value
    }
  }

  @Input() set isReserveNow(value: boolean) {
    if (value !== undefined) {
      this.showToolTipitem = value
    }
  }

  @Input() set isTriggerMess(value: boolean) {
    if (value !== undefined) {
      this.showToolTipitem = value
    }
  }

  @Input() set isUpdateFirmware(value: boolean) {
    if (value !== undefined) {
      this.showToolTipitem = value
    }
  }

  @Input() set isDiagnostics(value: boolean) {
    if (value !== undefined) {
      this.showToolTipitem = value
    }
  }

  @Input() set isSetCharging(value: boolean) {
    if (value !== undefined) {
      this.showToolTipitem = value
    }
  }
@Input() tooltipText: string = ''; // this binds your title attr
   showTooltip = false;
tooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';

onMouseEnter(event: MouseEvent): void {
  this.showTooltip = true;

  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  if (rect.top < 80) {
    this.tooltipPosition = 'bottom';
  } else if (rect.bottom > vh - 80) {
    this.tooltipPosition = 'top';
  } else if (rect.left < 120) {
    this.tooltipPosition = 'right';
  } else if (rect.right > vw - 120) {
    this.tooltipPosition = 'left';
  } else {
    this.tooltipPosition = 'top';
  }
}

onMouseLeave(): void {
  this.showTooltip = false;
}
  constructor() {}
}
