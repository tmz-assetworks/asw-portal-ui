import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageDepartmentComponent } from './manage-department.component';
import { AddDepartmentComponent } from './add-department/add-department.component';


const routes: Routes = [
  {path:'',component:ManageDepartmentComponent},
  { path: 'add-department', component:AddDepartmentComponent},
  { path: 'edit-department', component:AddDepartmentComponent},
  { path: 'view-department', component:AddDepartmentComponent}
]



@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  declarations: [],
  
})
export class ManageDepartmentModule { }
