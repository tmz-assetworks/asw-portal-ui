import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedMaterialModule } from "src/app/shared/shared-material.module";

import { SharedModule } from "src/app/shared/shared.module";
import { CommonModule } from "@angular/common";
import { MatFormFieldControl, MatFormFieldModule } from "@angular/material/form-field";
import { ManageLocationsComponent } from "../manage-locations/manage-locations.component";
import { AddVehicleComponent } from "../manage-vehicles/add-vehicle/add-vehicle.component";
import { ManageVehiclesComponent } from "./manage-vehicles.component";

const routes: Routes = [
    {path:'',component:ManageVehiclesComponent},
    { path: 'add-vehicle', component:AddVehicleComponent},
    { path: 'edit-vehicle', component:AddVehicleComponent},
    { path: 'view-vehicle', component:AddVehicleComponent}
 ]

@NgModule({
    imports: [SharedMaterialModule,RouterModule.forChild(routes),SharedModule,CommonModule,MatFormFieldModule],
    declarations: [ManageVehiclesComponent, AddVehicleComponent]  ,      
    providers: [],
  })
  export class ManageVehiclesModule {}