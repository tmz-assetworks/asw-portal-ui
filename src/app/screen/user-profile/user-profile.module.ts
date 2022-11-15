import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'

import { RouterModule, Routes } from '@angular/router'
import { ToastrModule } from 'ngx-toastr'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'
import { SharedModule } from 'src/app/shared/shared.module'
import { UserProfileComponent } from './user-profile.component'

const routes: Routes = [{ path: '', component: UserProfileComponent }]

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    RouterModule.forChild(routes),
    RouterModule,
    SharedModule,
    SharedMaterialModule,
    CommonModule,
    ToastrModule.forRoot({ timeOut: 5000, positionClass: 'toast-top-right' }),
    HttpClientModule,
  ],
})
export class UserProfileModule {}
