import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'
import { HelpComponent } from './help.component'

const routes: Routes = [{ path: '', component: HelpComponent }]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes),SharedMaterialModule,],
  exports: [],
  declarations: [HelpComponent],
  providers: [],
})
export class HelpModule {}
