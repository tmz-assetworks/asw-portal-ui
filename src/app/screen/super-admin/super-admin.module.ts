import { SharedMaterialModule } from './../../shared/shared-material.module'
import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared/shared.module'
import { SuperAdminRoutingModule } from './super-admin-routing.module'
import { MainMasterModule } from '../master/master.module';
import { HelpComponent } from './help/help.component'
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    HelpComponent,
    SharedMaterialModule,
    SuperAdminRoutingModule,
    SharedModule,
    MainMasterModule,
    CommonModule
  ],
  exports: [],
  declarations: [
  ],
  providers: [],
})
export class SuperAdminModule {}
