import { Component} from '@angular/core'
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss'],
  imports:[RouterModule]
})
export class VehiclesComponent {
  constructor() {}
}
