import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'

import { Routes } from '@angular/router'
import { ToastrModule } from 'ngx-toastr'
import { UserProfileComponent } from './user-profile.component'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

const routes: Routes = [{ path: '', component: UserProfileComponent }]

@NgModule({
  declarations: [],
  imports: [
    UserProfileComponent,
    CommonModule,
    RouterModule.forChild(routes),
    ToastrModule.forRoot({ timeOut: 5000, positionClass: 'toast-top-right' }),
    HttpClientModule,
  ],
})
export class UserProfileModule {}
