import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SharedModule } from 'src/app/shared/shared.module'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'
import { AlertsComponent } from './alerts.component'

const routes: Routes = [{ path: '', component: AlertsComponent }]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes),SharedModule,SharedMaterialModule],
  exports: [],
  declarations: [AlertsComponent],
  providers: [],
})
export class AlertsModule {}
