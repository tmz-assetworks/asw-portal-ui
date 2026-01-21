import { NgModule } from '@angular/core'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSelectModule } from '@angular/material/select'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatFormFieldModule} from '@angular/material/form-field'
import { MatDialogModule } from '@angular/material/dialog'
import { MatRadioModule } from '@angular/material/radio'
import { MatCardModule } from '@angular/material/card'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { MatInputModule } from '@angular/material/input'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatMenuModule } from '@angular/material/menu'
import { MatListModule } from '@angular/material/list'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import {MatCheckboxModule} from '@angular/material/checkbox';


const MATERIAL_MODULES = [
  MatSelectModule,
  MatTableModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatDialogModule,
  MatCardModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRadioModule,
  MatInputModule,
  MatPaginatorModule,
  MatSlideToggleModule,
  MatFormFieldModule,
  MatMenuModule,
  MatListModule,
  MatButtonToggleModule,
  MatGridListModule,
  MatTooltipModule,
  MatExpansionModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatSelectModule
]

@NgModule({
  imports: [...MATERIAL_MODULES],
  exports: [...MATERIAL_MODULES],
  declarations: [],
  providers: [],
})
export class SharedMaterialModule {}
