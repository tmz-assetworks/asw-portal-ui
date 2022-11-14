import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { RouterModule, Routes } from '@angular/router'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'
import { SharedModule } from 'src/app/shared/shared.module'
import { AddSubscriptionComponent } from './add-subscription/add-subscription.component'
import { ManageSubscriptionsComponent } from './manage-subscriptions.component'
const routes: Routes = [
  { path: '', component: ManageSubscriptionsComponent },
  { path: 'add-subscription', component: AddSubscriptionComponent },
  { path: 'edit-subscription', component: AddSubscriptionComponent },
  { path: 'view-subscription', component: AddSubscriptionComponent },
]
@NgModule({
  imports: [
    SharedMaterialModule,
    RouterModule.forChild(routes),
    SharedModule,
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  declarations: [ManageSubscriptionsComponent, AddSubscriptionComponent],
  providers: [],
})
export class ManageSubscriptionsModule {}
