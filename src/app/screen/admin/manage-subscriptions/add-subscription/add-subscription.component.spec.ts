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
import { SharedModule } from 'src/app/shared/shared.module'

import { AddSubscriptionComponent } from './add-subscription.component'

describe('AddSubscriptionComponent', () => {
  let component: AddSubscriptionComponent
  let fixture: ComponentFixture<AddSubscriptionComponent>

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
      declarations: [AddSubscriptionComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubscriptionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
