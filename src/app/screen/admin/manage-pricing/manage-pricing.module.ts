import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'; 
import { RouterModule, Routes } from '@angular/router';
import { AddPricingPlanComponent } from './add-pricing-plan/add-pricing-plan.component';
import { ManagePricingComponent } from './manage-pricing.component';
import { MatFormFieldControl,MatFormFieldModule } from '@angular/material/form-field';


const routes: Routes = [
  {path:'',component:ManagePricingComponent},
  { path: 'add-pricing', component:AddPricingPlanComponent},
  { path: 'edit-pricing', component:AddPricingPlanComponent},
  { path: 'view-pricing', component:AddPricingPlanComponent}
]



@NgModule({
  imports: [SharedMaterialModule,RouterModule.forChild(routes),SharedModule,MatFormFieldModule,CommonModule],
  declarations: [ManagePricingComponent,AddPricingPlanComponent],
  
})
export class ManagePricingModule { }
