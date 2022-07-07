import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgxEchartsModule } from 'ngx-echarts'
import { AreaChartComponent } from '../component/dashboard/area-chart/area-chart.component'
import { BarChartComponent } from '../component/dashboard/bar-chart/bar-chart.component'
import { GraphCardComponent } from '../component/dashboard/graph-card/graph-card.component'
import { LineChartComponent } from '../component/dashboard/line-chart/line-chart.component'
import { StackedAreaChartComponent } from '../component/dashboard/stacked-area-chart/stacked-area-chart.component'
import { StatusBoxElementComponent } from '../component/dashboard/status-box-element/status-box-element.component'
import { StatusBoxEnergyComponent } from '../component/dashboard/status-box-energy/status-box-energy.component'
import { StatusBoxGraphComponent } from '../component/dashboard/status-box-graph/status-box-graph.component'
import { StatusBoxPointsComponent } from '../component/dashboard/status-box-points/status-box-points.component'
import { StatusBoxComponent } from '../component/dashboard/status-box/status-box.component'
import { StatusListElementComponent } from '../component/dashboard/status-list-element/status-list-element.component'
import { StatusPanelComponent } from '../component/dashboard/status-panel/status-panel.component'
import { WidgetComponent } from '../component/dashboard/widget/widget.component'
import { FooterComponent } from '../component/master/footer/footer.component'
import { HeaderComponent } from '../component/master/header/header.component'
import { NavigationModule } from '../component/master/navigation/navigation.module'
import { SharedMaterialModule } from './shared-material.module'

@NgModule({
  imports: [
    NavigationModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedMaterialModule,
    CommonModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    WidgetComponent,
    GraphCardComponent,
    StatusBoxComponent,
    StatusPanelComponent,
    BarChartComponent,
    AreaChartComponent,
    LineChartComponent,
    StackedAreaChartComponent,
    StatusListElementComponent,
    StatusBoxElementComponent,
    HeaderComponent,
    FooterComponent,
    StatusBoxEnergyComponent,
    NavigationModule,
    StatusBoxGraphComponent,
    StatusBoxPointsComponent,
  ],
  declarations: [
    WidgetComponent,
    GraphCardComponent,
    StatusBoxComponent,
    StatusPanelComponent,
    BarChartComponent,
    AreaChartComponent,
    LineChartComponent,
    StackedAreaChartComponent,
    StatusListElementComponent,
    StatusBoxElementComponent,
    HeaderComponent,
    FooterComponent,
    StatusBoxEnergyComponent,
    StatusBoxGraphComponent,
    StatusBoxPointsComponent,
  ],
  providers: [],
})
export class SharedModule {}
