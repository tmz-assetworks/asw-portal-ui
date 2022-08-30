import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'
import { SharedModule } from 'src/app/shared/shared.module'

import { DiagnosticsComponent } from './diagnostics.component'
import { MatAutocompleteModule } from '@angular/material/autocomplete'

const routes: Routes = [{ path: '', component: DiagnosticsComponent }]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedMaterialModule,
    SharedModule,
  ],
  exports: [],
  declarations: [DiagnosticsComponent],
  providers: [],
})
export class DiagnosticsModule {}
