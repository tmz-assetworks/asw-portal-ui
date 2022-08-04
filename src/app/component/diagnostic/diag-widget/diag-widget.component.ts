import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-diag-widget',
  templateUrl: './diag-widget.component.html',
  styleUrls: ['./diag-widget.component.scss']
})
export class DiagWidgetComponent implements OnInit {
  showToolTipData: any;

@Input() set showToolTip(value: boolean) {
  if(value!==undefined){

    console.log(value,"value getting");
    
    this.showToolTipData=value;
  }


}
 
  constructor() { }

     ngOnInit(): void {

  
    }

  }