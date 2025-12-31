import { CommonModule } from '@angular/common'
import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
  imports:[CommonModule]
})
export class WidgetComponent implements OnInit {
  constructor(private readonly router: Router) {
  }

  @Input() widgetIcon: string | undefined
  @Input() data: any
  @Input() url: string = '';
  @Input() showStatusBars: boolean = true; // Default to true to show status bars
  @Input() compactMode: boolean = false; // Default to false for normal height
  @Input() clickable: boolean = true; // Default to true to allow clicks

  ngOnInit(): void {}
  
  navigateToUrl() {
    if (this.url) {
      this.router.navigate([this.url]);
    }
  }

  onClick() {
    if (this.compactMode && this.clickable && this.url) {
      this.navigateToUrl();
    }
  }
}
