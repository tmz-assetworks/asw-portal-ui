import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'
import { AddCustomersComponent } from './add-customers/add-customers.component'
import { ManageCustomersComponent } from './manage-customers.component'

import { SharedModule } from 'src/app/shared/shared.module'

const routes: Routes = [
  { path: '', component: ManageCustomersComponent },
  { path: 'createcustomer', component: AddCustomersComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes), SharedMaterialModule, SharedModule],
  exports: [AddCustomersComponent],
  declarations: [ManageCustomersComponent, AddCustomersComponent],
  providers: [],
})
export class ManageCustomersModule {}
