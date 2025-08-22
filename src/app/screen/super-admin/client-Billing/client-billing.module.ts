import { SharedModule } from 'src/app/shared/shared.module'
import { SharedMaterialModule } from '../../../shared/shared-material.module'
import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { ClientBillingComponent } from './client-billing.component'
import { ClientBillingListComponent } from './client-Billing-List/client-billing-list.component'
import { CommonModule } from '@angular/common'
import { MatFormFieldModule } from '@angular/material/form-field'
const routes: Routes = [
  { path: '', component: ClientBillingListComponent },
  { path: 'create-client-billing', component: ClientBillingComponent },
  { path: 'view-client-billing', component: ClientBillingComponent },
  { path: 'edit-client-billing', component: ClientBillingComponent },
]

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    SharedMaterialModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ClientBillingListComponent, ClientBillingComponent],
  providers: [],
})
export class ClientBillingModule {}
