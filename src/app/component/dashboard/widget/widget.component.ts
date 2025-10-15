import { CommonModule } from '@angular/common'
import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
  imports:[CommonModule]
})
export class WidgetComponent implements OnInit {
  constructor() {}

  @Input() widgetIcon: string | undefined
  // @Input() data: any
  @Input() data: any

  ngOnInit(): void {}
}
