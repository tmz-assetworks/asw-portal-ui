import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AlertsComponent } from './alerts.component'

const routes: Routes = [{ path: '', component: AlertsComponent }]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [],
  declarations: [AlertsComponent],
  providers: [],
})
export class AlertsModule {}
