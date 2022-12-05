import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-tool-tip',
  templateUrl: './tool-tip.component.html',
  styleUrls: ['./tool-tip.component.scss'],
})
export class ToolTipComponent implements OnInit {
  setCharging: boolean = true;
  start:boolean=true
  constructor(private _storageService: StorageService) {}

  ngOnInit(): void {
    let isCharging = this._storageService.getSessionData('setCharging');
    let isStarting=this._storageService.getSessionData('start');
    if (isCharging) {
      this.setCharging = true;
    } else {
      this.setCharging = false;
    }
    if(isStarting){
      this.start= true
    }else{
      this.start= false
    }
  }
}
