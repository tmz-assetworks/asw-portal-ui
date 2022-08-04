import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DashboardComponent } from './dashboard.component'
import { HttpClientModule } from '@angular/common/http'
import { NgxEchartsModule } from 'ngx-echarts'
import { SharedModule } from 'src/app/shared/shared.module'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module';
import { DashboardStatusPanelComponent } from './dashboard-status-panel/dashboard-status-panel.component'
import { GraphDetailComponent } from '../graph-detail/graph-detail.component'

const routes: Routes = [
    { path: '', component: DashboardComponent},
    { path: 'detail', component: GraphDetailComponent},
    { path: 'detail/:id', component: GraphDetailComponent}
   
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    SharedMaterialModule,
    SharedModule,
  ],
  exports: [DashboardComponent],
  declarations: [DashboardComponent, DashboardStatusPanelComponent],
  providers: [],
})
export class DashboardModule {}
