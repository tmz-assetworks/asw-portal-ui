import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-status-box-element',
  templateUrl: './status-box-element.component.html',
  styleUrls: ['./status-box-element.component.scss'],
})
export class StatusBoxElementComponent implements OnInit {
  constructor() {}

  @Input() data: any

  chargingInfra: any

  ngOnInit(): void {
    this.chargingInfra = this.data[0].chargingInfra
  }
}
