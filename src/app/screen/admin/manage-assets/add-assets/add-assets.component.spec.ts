import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatSelectModule } from '@angular/material/select'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { ToastrModule } from 'ngx-toastr'

import { AddAssetsComponent } from './add-assets.component'

describe('AddAssetsComponent', () => {
  let component: AddAssetsComponent
  let fixture: ComponentFixture<AddAssetsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        HttpClientTestingModule,
        MatSelectModule,
        MatCheckboxModule,
        BrowserAnimationsModule,
      ],
      declarations: [AddAssetsComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssetsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
