import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
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
    RouterModule.forChild(routes),
    CommonModule,

    ManageSubscriptionsComponent, 
    AddSubscriptionComponent
  ],
  declarations: [],
  providers: [],
})
export class ManageSubscriptionsModule {}
