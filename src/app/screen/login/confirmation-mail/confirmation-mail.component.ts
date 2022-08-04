import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation-mail',
  templateUrl: './confirmation-mail.component.html',
  styleUrls: ['./confirmation-mail.component.scss']
})
export class ConfirmationMailComponent implements OnInit {
 path: string
  constructor() { 
    this.path = window.location.origin +'/changePassword'
  }

  ngOnInit(): void {
  }

}
