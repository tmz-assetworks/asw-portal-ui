import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AddAssetsComponent } from './add-assets/add-assets.component'
import { ManageAssetsComponent } from './manage-assets.component'

const routes: Routes = [
  {
    path: '',
    component: ManageAssetsComponent,
  },
  { path: 'add-assets', component: AddAssetsComponent },
  { path: 'view-assets', component: AddAssetsComponent },
  { path: 'edit-assets', component: AddAssetsComponent },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [],
  declarations: [],
  providers: [],
})
export class ManageAsstesModule {}
