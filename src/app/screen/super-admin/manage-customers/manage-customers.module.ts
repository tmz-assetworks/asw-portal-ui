import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'
import { AddCustomersComponent } from './add-customers/add-customers.component'
import { ManageCustomersComponent } from './manage-customers.component'
import { CommonModule } from '@angular/common'
import { SharedModule } from 'src/app/shared/shared.module'

const routes: Routes = [
  { path: '', component: ManageCustomersComponent },
  { path: 'create-customer', component: AddCustomersComponent },
  { path: 'view-customer', component: AddCustomersComponent },
  { path: 'edit-customer', component: AddCustomersComponent },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedMaterialModule,
    SharedModule,
    CommonModule,
  ],
  exports: [AddCustomersComponent],
  declarations: [ManageCustomersComponent, AddCustomersComponent],
  providers: [],
})
export class ManageCustomersModule {}
