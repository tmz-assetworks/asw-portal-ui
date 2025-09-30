import { NgModule } from '@angular/core'
import { RouterModule, RouterOutlet, Routes } from '@angular/router'
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
  imports: [
    MasterComponent,
    SharedModule, 
    RouterModule,
    RouterModule.forChild(routes)
  ],
  exports: [],
  declarations: [],
  providers: [],
})
export class MainMasterModule {}
