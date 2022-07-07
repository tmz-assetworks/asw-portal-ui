import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
})
export class WidgetComponent implements OnInit {
  constructor() {}

  @Input() widgetIcon: string | undefined
  @Input() data: any

  color: any

  ngOnInit(): void {
    console.log(this.data, 'getting data')
    this.color = this.data.StatusData[0].Color
  }
}
