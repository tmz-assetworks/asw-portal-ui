import { Component } from '@angular/core'
import { Subject } from 'rxjs'
import { LoaderService } from './service/loader.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'asset-works'
  constructor(private _loaderService: LoaderService) {}

  isLoading: Subject<boolean> = this._loaderService.isLoading
}
