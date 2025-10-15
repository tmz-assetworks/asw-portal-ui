import {  NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ManageChargersComponent } from "./manage-chargers.component";
import { AddChargerComponent } from "./add-charger/add-charger.component";

const routes: Routes = [
    {path:'',component:ManageChargersComponent},
    { path: 'add-chargers', component:AddChargerComponent},
    { path: 'edit-chargers', component: AddChargerComponent },
    { path: 'view-chargers', component: AddChargerComponent }
 ]

@NgModule({
    imports: [
      RouterModule.forChild(routes),
      ],
    declarations:[],      
    providers: [],
  })
  export class ManageVehiclesModule {}