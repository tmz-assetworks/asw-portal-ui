import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { WarningDialogComponent } from 'src/app/component/warning-dialog/warning-dialog/warning-dialog.component';
import { SettingService } from './setting.service';
import { TimeoutDialogComponent } from 'src/app/component/warning-dialog/timeout-dialog/timeout-dialog.component';

@Injectable({ providedIn: 'root' })
export class IdleService {
  private idleTimeoutId?: number;
  private warningTimeoutId?: number;

  private timeoutMinutes = 60;
  private warningMinutes = 1;
  private isWarningOpen = false;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private ngZone: NgZone,
    private readonly settingService: SettingService
  ) {
    this.initListeners();
    this.loadSessionConfig();
  }

  private loadSessionConfig(): void {
    this.settingService.getSessionConfig().subscribe({
      next: config => {
        const timeout = Number(config.TimeoutMinutes);
        const warning = Number(config.WarningMinutes);

        this.timeoutMinutes = Number.isFinite(timeout) ? timeout : this.timeoutMinutes;
        this.warningMinutes = Number.isFinite(warning) ? warning : this.warningMinutes;

        this.startTimers();
      },
      error: () => {
        // fallback to default values
        this.startTimers();
      }
    });
  }
  
  setConfig(timeout: number, warning: number): void {
    this.timeoutMinutes = timeout;
    this.warningMinutes = warning;
    this.startTimers();
  }

  private initListeners(): void {
    ['click', 'mousemove', 'keydown', 'scroll', 'touchstart'].forEach(event => {
      window.addEventListener(event, () => this.onUserActivity());
    });
  }

  private onUserActivity(): void {
    if (!this.isWarningOpen) {
      this.startTimers();
    }
  }

  private startTimers(): void {
    this.clearTimers();

    this.warningTimeoutId = window.setTimeout(
      () => this.showWarning(),
      (this.timeoutMinutes - this.warningMinutes) * 60 * 1000
    );

    this.idleTimeoutId = window.setTimeout(
      () => this.logoutUser(),
      this.timeoutMinutes * 60 * 1000
    );
  }

  private clearTimers(): void {
    if (this.warningTimeoutId) {
      clearTimeout(this.warningTimeoutId);
    }
    if (this.idleTimeoutId) {
      clearTimeout(this.idleTimeoutId);
    }
  }

  private showWarning(): void {
    if (this.router.url.startsWith('/login') || this.isWarningOpen) {
      return;
    }

    this.isWarningOpen = true;

    this.ngZone.run(() => {
      const dialogRef = this.dialog.open(WarningDialogComponent, {
        width: '420px',
        disableClose: true,
        data: { minutesLeft: this.warningMinutes }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.isWarningOpen = false;

        if (result === 'extend') {
          this.startTimers(); // ✅ reset session
        } else {
          this.logoutUser(); // ✅ force logout
        }
      });
    });
  }

  private logoutUser(): void {
    this.clearTimers();
    this.dialog.closeAll();
    localStorage.clear();

    this.ngZone.run(() => {

    this.router.navigate(['/login']).then(() => {

      this.dialog.open(TimeoutDialogComponent, {
        width: '420px',
        disableClose: true
      });

    });

  });
  }
}


    