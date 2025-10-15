import { NgModule } from '@angular/core'
import { NavigationComponent } from './navigation.component'
import { MatIconModule } from '@angular/material/icon'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatListModule } from '@angular/material/list'
import { MatCardModule } from '@angular/material/card'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatMenuModule} from '@angular/material/menu';

@NgModule({
  imports: [
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    NavigationComponent,
  ],
  exports: [],
  declarations: [],
  providers: [],
})
export class NavigationModule {}
