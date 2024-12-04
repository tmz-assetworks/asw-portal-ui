import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
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
import { TabsBarComponent } from '../component/diagnostic/tabs-bar/tabs-bar.component'
import { TabComponent } from '../component/diagnostic/tab/tab.component'
import { DiagWidgetComponent } from '../component/diagnostic/diag-widget/diag-widget.component'
import { DiagTableComponent } from '../component/diagnostic/diag-table/diag-table.component'
import { DiagWidgetBarComponent } from '../component/diagnostic/diag-widget-bar/diag-widget-bar.component'
import { MatTableComponent } from '../component/dashboard/mat-table/mat-table.component'
import { ToolTipComponent } from '../component/diagnostic/tool-tip/tool-tip.component'
import { ToolTipItemComponent } from '../component/diagnostic/tool-tip-item/tool-tip-item.component'
import {
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
  NgxMatNativeDateModule,
} from '@angular-material-components/datetime-picker'
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
    RouterModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule
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
    MatTableComponent,
    StackedAreaChartComponent,
    StatusListElementComponent,
    StatusBoxElementComponent,
    HeaderComponent,
    FooterComponent,
    StatusBoxEnergyComponent,
    NavigationModule,
    StatusBoxGraphComponent,
    StatusBoxPointsComponent,
    TabsBarComponent,
    TabComponent,
    DiagWidgetComponent,
    DiagTableComponent,
    DiagWidgetBarComponent,
    ToolTipComponent,
    ToolTipItemComponent,
  ],
  declarations: [
    WidgetComponent,
    GraphCardComponent,
    StatusBoxComponent,
    StatusPanelComponent,
    BarChartComponent,
    AreaChartComponent,
    LineChartComponent,
    MatTableComponent,
    StackedAreaChartComponent,
    StatusListElementComponent,
    StatusBoxElementComponent,
    HeaderComponent,
    FooterComponent,
    StatusBoxEnergyComponent,
    StatusBoxGraphComponent,
    StatusBoxPointsComponent,
    TabsBarComponent,
    TabComponent,
    DiagWidgetComponent,
    DiagTableComponent,
    DiagWidgetBarComponent,
    ToolTipComponent,
    ToolTipItemComponent,
  ],
  providers: [],
})
export class SharedModule {}
