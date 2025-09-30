import { ApplicationRef, Component, OnDestroy, OnInit } from '@angular/core'
import { LoaderService } from './service/loader.service'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    RouterModule
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'asset-works';
  isLoading = false;
  private subscription: Subscription = new Subscription();
  
  constructor(
    private loaderService: LoaderService,
    private appRef: ApplicationRef
  ) {}
  
  ngOnInit(): void {
    // Subscribe to loading state changes
    this.subscription = this.loaderService.isLoading.subscribe(loading => {
      // Use setTimeout to push the change to the next tick
      setTimeout(() => {
        this.isLoading = loading;
        // Manually trigger change detection
        this.appRef.tick();
      }, 0);
    });
  }
  
  ngOnDestroy(): void {
    // Clean up subscription
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
