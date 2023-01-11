import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing'
import { ToastrModule } from 'ngx-toastr'
import { AdminService } from '../../admin.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { AddVehicleComponent } from './add-vehicle.component'
import { MatSelectModule } from '@angular/material/select'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing'
import { BrowserTestingModule } from '@angular/platform-browser/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

describe('AddVehicleComponent', () => {
  let component: AddVehicleComponent
  let fixture: ComponentFixture<AddVehicleComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserDynamicTestingModule,
        BrowserTestingModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        HttpClientTestingModule,
        FormsModule,
        MatSelectModule,
        MatCheckboxModule,
      ],
      declarations: [AddVehicleComponent],
      providers: [AdminService],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AddVehicleComponent)
        component = fixture.componentInstance
      })
  })

  beforeEach(() => {
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it(`should have as title 'Add Vehicle'`, () => {
    expect(component.vehicleFormTitle).toEqual('Add Vehicle')
  })
})
