import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CommonDiagnosticsComponent } from 'src/app/component/common-diagnostics/common-diagnostics.component'
const routes: Routes = [{ path: '', component: CommonDiagnosticsComponent }]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [],
  declarations: [],
  providers: [],
})
export class DiagnosticsModule { }

