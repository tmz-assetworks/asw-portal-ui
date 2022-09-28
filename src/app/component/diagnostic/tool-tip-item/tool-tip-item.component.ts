import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-tool-tip-item',
  templateUrl: './tool-tip-item.component.html',
  styleUrls: ['./tool-tip-item.component.scss'],
})
export class ToolTipItemComponent implements OnInit {
  showToolTipitem: any

  @Input() set isGetConfig(value: boolean) {
    if (value !== undefined) {
      console.log(value, 'value getting')

      this.showToolTipitem = value
    }
  }
  @Input() set isClearCache(value: boolean) {
    if (value !== undefined) {
      console.log(value, 'value getting')

      this.showToolTipitem = value
    }
  }

  @Input() set isReset(value: boolean) {
    if (value !== undefined) {
      console.log(value, 'value getting')
      this.showToolTipitem = value
} }

/* @Input() set isClearCache(value: boolean) {
  if(value!==undefined){

    console.log(value,"value getting");
    
    this.showToolTipitem=value;
  }
}

  @Input() set isReset(value: boolean) {
    if(value!==undefined){
  
      console.log(value,"value getting");
      
      this.showToolTipitem=value;
    }

}

@Input() set isChangeConfiguration(value: boolean) {
  if(value!==undefined){

    console.log(value,"value getting");
    
    this.showToolTipitem=value;
  }

}
@Input() set isChangeAvailability(value: boolean) {
  if(value!==undefined){

    console.log(value,"value getting");
    
    this.showToolTipitem=value;
  }

} */
 

 
  

  @Input() set isChangeConfiguration(value: boolean) {
    if (value !== undefined) {
      console.log(value, 'value getting')

      this.showToolTipitem = value
    }
  }
  @Input() set isChangeAvailability(value: boolean) {
    if (value !== undefined) {
      console.log(value, 'value getting')

      this.showToolTipitem = value
    }
  }
  @Input() set isGetLocalListVersion(value: boolean) {
    if (value !== undefined) {
      console.log(value, 'value getting')

      this.showToolTipitem = value
    }
  }
  @Input() set isRemoteStartTransaction(value: boolean) {
    if (value !== undefined) {
      console.log(value, 'value getting')

      this.showToolTipitem = value
    }
  }
  @Input() set isRemoteStopTransaction(value: boolean) {
    if (value !== undefined) {
      console.log(value, 'value getting')

      this.showToolTipitem = value
    }
  }
  @Input() set isGetCompositeSchedule(value: boolean) {
    if (value !== undefined) {
      console.log(value, 'value getting')

      this.showToolTipitem = value
    }
  }
  @Input() set isupdatefirmware(value: boolean) {
    if (value !== undefined) {
      console.log(value, 'value getting')

      this.showToolTipitem = value
    }
  }
  @Input() set isPublishFirmware(value: boolean) {
    if (value !== undefined) {
      console.log(value, 'value getting')

      this.showToolTipitem = value
    }
  }

  @Input() set isUnlock(value: boolean) {
    if (value !== undefined) {
      console.log(value, 'value getting')

      this.showToolTipitem = value
    }
  }

  @Input() set isCancelReservation(value: boolean) {
    if (value !== undefined) {
      console.log(value, 'value getting')

      this.showToolTipitem = value
    }
  }

  @Input() set isReserveNow(value: boolean) {
    if (value !== undefined) {
      console.log(value, 'value getting')

      this.showToolTipitem = value
    }
  }

  @Input() set isTriggerMess(value: boolean) {
    if (value !== undefined) {
      console.log(value, 'value getting')

      this.showToolTipitem = value
    }
  }

  @Input() set isUpdateFirmware(value: boolean) {
    if (value !== undefined) {
      console.log(value, 'value getting')

      this.showToolTipitem = value
    }
  }

  constructor() {}

  ngOnInit(): void {
   
  }
}
