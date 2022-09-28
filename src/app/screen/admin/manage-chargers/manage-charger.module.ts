import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedMaterialModule } from "src/app/shared/shared-material.module";

import { SharedModule } from "src/app/shared/shared.module";
import { CommonModule } from "@angular/common";
import { MatFormFieldControl, MatFormFieldModule } from "@angular/material/form-field";
import { ManageChargersComponent } from "./manage-chargers.component";
import { AddChargerComponent } from "./add-charger/add-charger.component";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
    {path:'',component:ManageChargersComponent},
    { path: 'add-chargers', component:AddChargerComponent},
    { path: 'edit-chargers', component: AddChargerComponent },
    { path: 'view-chargers', component: AddChargerComponent }
 ]

@NgModule({
    imports: [SharedMaterialModule,RouterModule.forChild(routes),SharedModule,CommonModule,MatFormFieldModule,ReactiveFormsModule],
    declarations: [ManageChargersComponent, AddChargerComponent]  ,      
    providers: [],
  })
  export class ManageVehiclesModule {}