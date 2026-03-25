import { Component } from '@angular/core';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
  imports:[SharedMaterialModule]
})
export class HelpComponent {
  panelOpenState = false;
  constructor() {}
}
