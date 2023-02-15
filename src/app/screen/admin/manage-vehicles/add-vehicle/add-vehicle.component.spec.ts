import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
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
  let vehicleFormGroup: FormGroup;
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

  it('should return true for valid characters', () => {
    const event = { charCode: 65 }; // A
    const result = component.omit_special_char(event);
    expect(result).toBe(true);
  });

  it('should return false for invalid characters', () => {
    const event = { charCode: 64 }; // @
    const result = component.omit_special_char(event);
    expect(result).toBe(false);
  });
/* patch value form data'   */
  it('should be patch value form data', () => {
    vehicleFormGroup = new FormGroup({


      vin: new FormControl(''),
      modelyear: new FormControl(''),
      makeName: new FormControl(''),
      modelName: new FormControl(''),
      licencePlate: new FormControl(''),
      unitNumber: new FormControl(''),
      department: new FormControl(''),
      domicileLocation: new FormControl(''),
      vehicleMacAddress: new FormControl(''),
      rfidCardAssigned: new FormControl('')


    });

    vehicleFormGroup.patchValue({ vin: 'Rehan' });
    expect(vehicleFormGroup.get('vin')?.value).toEqual('Rehan');
  });
})
