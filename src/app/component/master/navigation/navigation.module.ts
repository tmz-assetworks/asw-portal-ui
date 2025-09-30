import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterLinkActive, RouterModule } from '@angular/router'
import { NavigationComponent } from './navigation.component'
/*  Niharika added*/
import { MatTableModule } from '@angular/material/table'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatNativeDateModule } from '@angular/material/core'
import { MatSelectModule } from '@angular/material/select'
import { MatIconModule } from '@angular/material/icon'
import { MatRadioModule } from '@angular/material/radio'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatListModule } from '@angular/material/list'
import { MatCardModule } from '@angular/material/card'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatMenuModule} from '@angular/material/menu';
/* import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule} from '@angular/material/checkbox' */

/** niharika ended */
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
