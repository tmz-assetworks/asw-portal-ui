import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
  imports:[
    CommonModule,
    SharedMaterialModule
  ]
})
export class HelpComponent {
  panelOpenState= false
  panelOpenState1= false
  panelOpenState2= false
  panelOpenState3= false
  constructor() { }

}
