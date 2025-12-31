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
  constructor(private router: Router) {
  }

  @Input() widgetIcon: string | undefined
  @Input() data: any
  @Input() url: string = '';
  @Input() showStatusBars: boolean = true; // Default to true to show status bars
  @Input() compactMode: boolean = false; // Default to false for normal height
  @Input() clickable: boolean = true; // Default to true to allow clicks

  ngOnInit(): void {}
  
  // Navigate to the URL specified in the widget

  navigateToUrl() {
    if (this.url) {
      this.router.navigate([this.url]);
    }
  }

  //Method to handle widget click - navigates to the URL specified in the widget
  // Only works when in compact mode (dashboard) and clickable is true
  
  onClick() {
    if (this.compactMode && this.clickable && this.url) {
      this.navigateToUrl();
    }
  }
}
