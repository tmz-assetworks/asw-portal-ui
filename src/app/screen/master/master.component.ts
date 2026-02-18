import { Component } from '@angular/core'
import { RouterModule } from '@angular/router';
import { FooterComponent } from 'src/app/component/master/footer/footer.component';
import { HeaderComponent } from 'src/app/component/master/header/header.component';
import { NavigationComponent } from 'src/app/component/master/navigation/navigation.component';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss'],
  imports:[
    HeaderComponent,
    NavigationComponent,
    FooterComponent,
    RouterModule
  ]
})
export class MasterComponent {
  constructor() {}

}
