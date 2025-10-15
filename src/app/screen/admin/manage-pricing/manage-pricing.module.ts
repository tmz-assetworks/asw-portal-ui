import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPricingPlanComponent } from './add-pricing-plan/add-pricing-plan.component';
import { ManagePricingComponent } from './manage-pricing.component';


const routes: Routes = [
  {path:'',component:ManagePricingComponent},
  { path: 'add-pricing', component:AddPricingPlanComponent},
  { path: 'edit-pricing', component:AddPricingPlanComponent},
  { path: 'view-pricing', component:AddPricingPlanComponent}
]



@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  declarations: [],
  
})
export class ManagePricingModule { }
