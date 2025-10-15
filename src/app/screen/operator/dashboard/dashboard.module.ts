import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DashboardComponent } from './dashboard.component'
import { HttpClientModule } from '@angular/common/http'
import { GraphDetailComponent } from '../graph-detail/graph-detail.component'

const routes: Routes = [
    { path: '', component: DashboardComponent},
    { path: 'detail', component: GraphDetailComponent},
    { path: 'detail/:id', component: GraphDetailComponent}
   
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    HttpClientModule,
  ],
  exports: [],
  declarations: [],
  providers: [],
})
export class DashboardModule {}
