import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ChargerComponent } from './charger.component'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [{ path: '', component: ChargerComponent }]
@NgModule({
  declarations: [ChargerComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ChargerModule {}
