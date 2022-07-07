import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { DiagnosticsComponent } from './diagnostics.component'

const routes: Routes = [{ path: '', component: DiagnosticsComponent }]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [],
  declarations: [DiagnosticsComponent],
  providers: [],
})
export class DiagnosticsModule {}
