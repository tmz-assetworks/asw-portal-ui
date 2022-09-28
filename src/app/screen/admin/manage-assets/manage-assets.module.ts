import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatFormFieldModule } from '@angular/material/form-field'
import { RouterModule, Routes } from '@angular/router'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'
import { SharedModule } from 'src/app/shared/shared.module'
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
    SharedModule,
    RouterModule.forChild(routes),
    SharedMaterialModule,
    CommonModule,
    MatFormFieldModule,
  ],
  exports: [ManageAssetsComponent],
  declarations: [ManageAssetsComponent, AddAssetsComponent],
  providers: [],
})
export class ManageAsstesModule {}
