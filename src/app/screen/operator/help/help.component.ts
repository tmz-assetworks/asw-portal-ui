import { Component } from '@angular/core'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
  imports:[SharedMaterialModule]
})
export class HelpComponent {
  // Initialize variables with default values
  panelOpenState = false
  panelOpenState1 = false
  panelOpenState2 = false
  panelOpenState3 = false
  panelOpenState4 = false
  panelOpenState5 = false
  panelOpenState6 = false
  panelOpenState7 = false
  panelOpenState8 = false
  panelOpenState9 = false

  constructor() {}

}
