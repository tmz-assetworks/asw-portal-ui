import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AddCustomersComponent } from './add-customers/add-customers.component'
import { ManageCustomersComponent } from './manage-customers.component'

const routes: Routes = [
  { path: '', component: ManageCustomersComponent },
  { path: 'create-customer', component: AddCustomersComponent },
  { path: 'view-customer', component: AddCustomersComponent },
  { path: 'edit-customer', component: AddCustomersComponent },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [],
  declarations: [],
  providers: [],
})
export class ManageCustomersModule {}
