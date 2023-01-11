import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { ToastrModule } from 'ngx-toastr'

import { AddPricingPlanComponent } from './add-pricing-plan.component'

describe('AddPricingPlanComponent', () => {
  let component: AddPricingPlanComponent
  let fixture: ComponentFixture<AddPricingPlanComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        HttpClientTestingModule,
        MatSelectModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      declarations: [AddPricingPlanComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPricingPlanComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
