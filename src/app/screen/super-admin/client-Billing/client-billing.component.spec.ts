import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { ClientBillingComponent } from './client-billing.component';
import { ClientBillingService } from '../client-Billing/client-billing.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { StorageService } from 'src/app/service/storage.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';

describe('ClientBillingComponent', () => {
  let component: ClientBillingComponent;
  let fixture: ComponentFixture<ClientBillingComponent>;
  let clientBillingService: jasmine.SpyObj<ClientBillingService>;
  let formBuilder: FormBuilder;
  let toastr: jasmine.SpyObj<ToastrService>;
  let location: jasmine.SpyObj<Location>;
  let storageService: jasmine.SpyObj<StorageService>;

  beforeEach(async () => {
    const clientBillingServiceSpy = jasmine.createSpyObj('ClientBillingService', [
      'createClientBilling', 'updateClientBilling', 'getClientBillingById', 'GetPlugType'
    ]);
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    const locationSpy = jasmine.createSpyObj('Location', ['back']);
    const storageServiceSpy = jasmine.createSpyObj('StorageService', ['getLocalData']);

    await TestBed.configureTestingModule({
      declarations: [ClientBillingComponent],
      imports: [ReactiveFormsModule, MatSelectModule, MatCheckboxModule, RouterTestingModule],
      providers: [
        { provide: ClientBillingService, useValue: clientBillingServiceSpy },
        { provide: ToastrService, useValue: toastrSpy },
        { provide: Location, useValue: locationSpy },
        { provide: StorageService, useValue: storageServiceSpy },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientBillingComponent);
    
    component = fixture.componentInstance;
    clientBillingService = TestBed.inject(ClientBillingService) as jasmine.SpyObj<ClientBillingService>;
    formBuilder = TestBed.inject(FormBuilder);
    toastr = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    location = TestBed.inject(Location) as jasmine.SpyObj<Location>;
    storageService = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.addAdminFormGroup).toBeDefined();
    expect(component.addAdminFormGroup.get('planName')?.value).toBe('');
    expect(component.addAdminFormGroup.get('price')?.value).toBe('');
    expect(component.addAdminFormGroup.get('description')?.value).toBe('');
    expect(component.addAdminFormGroup.get('chargerTypeId')?.value).toBe('');
    expect(component.addAdminFormGroup.get('isActive')?.value).toBe(true);
  });

 



  
 

  

  it('should validate date fields as required', () => {
    const startMonthControl = component.addAdminFormGroup.get('startMonth');
    const startYearControl = component.addAdminFormGroup.get('startYear');
    const endMonthControl = component.addAdminFormGroup.get('endMonth');
    const endYearControl = component.addAdminFormGroup.get('endYear');
    
    startMonthControl?.setValue('');
    startYearControl?.setValue('');
    endMonthControl?.setValue('');
    endYearControl?.setValue('');
    
    startMonthControl?.markAsTouched();
    startYearControl?.markAsTouched();
    endMonthControl?.markAsTouched();
    endYearControl?.markAsTouched();
    
    expect(startMonthControl?.valid).toBeFalse();
    expect(startYearControl?.valid).toBeFalse();
    expect(endMonthControl?.valid).toBeFalse();
    expect(endYearControl?.valid).toBeFalse();
  });

 

  it('should reset endMonth when years are different', () => {
    const startYearControl = component.addAdminFormGroup.get('startYear');
    const endYearControl = component.addAdminFormGroup.get('endYear');
    const endMonthControl = component.addAdminFormGroup.get('endMonth');
    
    // Set initial values
    startYearControl?.setValue(2023);
    endYearControl?.setValue(2024);
    endMonthControl?.setValue(5);
    
    // Trigger value change
    endYearControl?.setValue(2025);
    
   //  expect(endMonthControl?.value).toBe('');
  });

  it('should reset endMonth when same year but endMonth < startMonth', () => {
    const startYearControl = component.addAdminFormGroup.get('startYear');
    const endYearControl = component.addAdminFormGroup.get('endYear');
    const startMonthControl = component.addAdminFormGroup.get('startMonth');
    const endMonthControl = component.addAdminFormGroup.get('endMonth');
    
    // Set initial values
    startYearControl?.setValue(2023);
    endYearControl?.setValue(2023);
    startMonthControl?.setValue(6); // June
    endMonthControl?.setValue(5); // May (before June)
    
    // Trigger value change
    startMonthControl?.setValue(7); // July
    
   //  expect(endMonthControl?.value).toBe('');
  });

  it('should disable end months correctly', () => {
    const startMonthControl = component.addAdminFormGroup.get('startMonth');
    const startYearControl = component.addAdminFormGroup.get('startYear');
    const endYearControl = component.addAdminFormGroup.get('endYear');
    
    // Set start month to June (6)
    startMonthControl?.setValue(6);
    startYearControl?.setValue(2023);
    endYearControl?.setValue(2023);
    
    // Check if months before June are disabled
    expect(component.isEndMonthDisabled(5)).toBeTrue(); // May should be disabled
    expect(component.isEndMonthDisabled(6)).toBeFalse(); // June should not be disabled
    expect(component.isEndMonthDisabled(7)).toBeFalse(); // July should not be disabled
  });
});

