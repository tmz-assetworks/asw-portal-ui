import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedMaterialModule } from "src/app/shared/shared-material.module";
import { ManageOperatorUsersComponent } from "./manage-operator-users.component";
import { AddOperatorComponent } from './add-operator/add-operator.component';
import { SharedModule } from "src/app/shared/shared.module";
import { CommonModule } from "@angular/common";
import { MatFormFieldControl, MatFormFieldModule } from "@angular/material/form-field";

const routes: Routes = [
  { path: '', component: ManageOperatorUsersComponent },
  { path: 'add-operator', component: AddOperatorComponent },
]

@NgModule({
    imports: [SharedMaterialModule,RouterModule.forChild(routes),SharedModule,CommonModule,MatFormFieldModule],
    exports: [ManageOperatorUsersComponent],
    declarations: [ManageOperatorUsersComponent, AddOperatorComponent]  ,      
    providers: [],
  })
  export class ManageOperatorUsersModule {}
