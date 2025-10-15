import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddVehicleComponent } from "../manage-vehicles/add-vehicle/add-vehicle.component";
import { ManageVehiclesComponent } from "./manage-vehicles.component";

const routes: Routes = [
    {path:'',component:ManageVehiclesComponent},
    { path: 'add-vehicle', component:AddVehicleComponent},
    { path: 'edit-vehicle', component:AddVehicleComponent},
    { path: 'view-vehicle', component:AddVehicleComponent}
 ]

@NgModule({
    imports: [
      RouterModule.forChild(routes),    ],
    declarations: []  ,      
    providers: [],
  })
  export class ManageVehiclesModule {}