import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from 'src/app/gurads/auth.guard'
import { SharedModule } from 'src/app/shared/shared.module'
import { MasterComponent } from './master.component'

const routes: Routes = [
  {
    path: '',
    component: MasterComponent,
  },
]

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [MasterComponent],
  declarations: [MasterComponent],
  providers: [],
})
export class MainMasterModule {}
