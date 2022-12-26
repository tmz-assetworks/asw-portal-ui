import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  panelOpenState= false
  panelOpenState1= false
  panelOpenState2= false
  panelOpenState3= false
  constructor() { }

  ngOnInit(): void {
  }

}
