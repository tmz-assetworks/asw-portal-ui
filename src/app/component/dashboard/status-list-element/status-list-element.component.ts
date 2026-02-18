import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-status-list-element',
  templateUrl: './status-list-element.component.html',
  styleUrls: ['./status-list-element.component.scss'],
})
export class StatusListElementComponent {
  constructor() {}

  @Input() EnergyUsedData: any

  @Input() Icon: any

}
