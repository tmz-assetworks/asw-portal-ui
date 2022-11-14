import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-status-list-element',
  templateUrl: './status-list-element.component.html',
  styleUrls: ['./status-list-element.component.scss'],
})
export class StatusListElementComponent implements OnInit {
  constructor() {}

  @Input() EnergyUsedData: any

  @Input() Icon: any

  ngOnInit(): void {}
}
