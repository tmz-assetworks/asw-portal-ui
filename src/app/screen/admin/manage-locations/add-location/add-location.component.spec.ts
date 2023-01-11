import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr'

import { AddLocationComponent } from './add-location.component'

describe('AddLocationComponent', () => {
  let component: AddLocationComponent
  let fixture: ComponentFixture<AddLocationComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        HttpClientTestingModule,
        MatSelectModule,
        MatCheckboxModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      declarations: [AddLocationComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLocationComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
