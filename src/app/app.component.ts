import { ApplicationRef, Component, OnDestroy, OnInit } from '@angular/core'
import { LoaderService } from './service/loader.service'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { Subscription } from 'rxjs'
import { IdleService } from './service/setting/idle.service'
import { SettingService } from './service/setting/setting.service'

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
    private readonly loaderService: LoaderService,
    private readonly appRef: ApplicationRef,
    private readonly idleService: IdleService,
    private readonly settingsService: SettingService
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
    // calling get session config api and setting idle and warning time
    this.settingsService.getSessionConfig().subscribe((res : any) => {
    this.idleService.setConfig(res.timeoutMinutes, res.warningMinutes);
  });
  }
  
  ngOnDestroy(): void {
    // Clean up subscription
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
