import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'
import { SharedModule } from 'src/app/shared/shared.module'

import { ReportsComponent } from './reports.component'
import { ChargerCountReportComponent } from './charger-count-report/charger-count-report.component'
import { ReactiveFormsModule,FormsModule } from '@angular/forms'
import { MatButtonToggleModule } from '@angular/material/button-toggle'

import { CustomerBillingComponent } from './payment/customer-billing.component'
import { ReportDetailComponent } from './report-details/report-details.component'

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DateRangeDialogComponent } from './report-details/date-range-dialog.component'



const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    children: [
      {
        path: '',
        component: CustomerBillingComponent,
        pathMatch: 'full',
      },
      {
        path: 'charger',
        component: ChargerCountReportComponent,
        pathMatch: 'full',
      },
      {
        path: 'charger/detail',
        component: ReportDetailComponent,
        pathMatch: 'full',
      },

       {
        path: 'detail',
        component: ReportDetailComponent,
        pathMatch: 'full',
      },
    ],
  },
 
]
@NgModule({
  declarations: [
    ReportsComponent,
    CustomerBillingComponent,
    ChargerCountReportComponent,
    ReportDetailComponent,
   DateRangeDialogComponent
  ],
  imports: [
   CommonModule, 
    ReactiveFormsModule,        
    MatButtonToggleModule,    
    SharedMaterialModule,       
    SharedModule,              
    RouterModule.forChild(routes),
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    
  ],
})
export class ReportsModule {}
