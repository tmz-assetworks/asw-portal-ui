import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ReportsComponent } from './reports.component'

const routes: Routes = [{ path: '', component: ReportsComponent }]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [],
  declarations: [ReportsComponent],
  providers: [],
})
export class ReportsModule {}
