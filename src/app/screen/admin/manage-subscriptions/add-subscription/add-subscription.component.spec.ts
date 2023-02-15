import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { ToastrModule, ToastrService } from 'ngx-toastr'
import { SharedModule } from 'src/app/shared/shared.module'
import { DatePipe } from '@angular/common'
import { AddSubscriptionComponent } from './add-subscription.component'
import { AdminService } from '../../admin.service'
import { async, of } from 'rxjs'


describe('AddSubscriptionComponent', () => {
  let component: AddSubscriptionComponent
  let fixture: ComponentFixture<AddSubscriptionComponent>
  let datePipe: DatePipe;
  let toastrService: ToastrService;
  let _adminService: AdminService;

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
      providers: [DatePipe
      ]
      // providers:[DatePipe,{ provide: AdminService, useValue: {
      //   GetAllPriceType: () => of({data: [{id: 1, name: 'priceType1'}, {id: 2, name: 'priceType2'}]})

    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubscriptionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    toastrService = TestBed.get(ToastrService);
    _adminService = TestBed.get(AdminService);
    datePipe = TestBed.get(DatePipe);
    component.subscriptionPlanFormGroup.controls['validfrom'].setValue(new Date(2022, 0, 1));
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
/*  number key validation check */
  it('should return true for valid number key press', () => {
    const event = { which: 48 }; // key code for 0
    expect(component.numberOnly(event)).toEqual(true);
    });

    it('should return false for non-number key press', () => {
    const event = { which: 65 }; // key code for 'A'
    expect(component.numberOnly(event)).toEqual(false);
    });

    it('should return true for backspace key press', () => {
    const event = { which: 8 }; // key code for backspace
    expect(component.numberOnly(event)).toEqual(true);
    });

    it('should return false for special characters key press', () => {
    const event = { which: 33 }; // key code for '!'
    expect(component.numberOnly(event)).toEqual(false);
    });

    /* selectedUnitId and showPriceUnitTitle correctly*/

    it('should set isUnit to true and selectedUnitId and showPriceUnitTitle correctly', fakeAsync(() => {
      // Arrange
      const event = { isUserInput: true };
      const data = { id: 1, unitName: 'kg' };

      // Act
      component.selectUnit(event, data);
      tick();
      fixture.detectChanges();

      // Assert
      expect(component.isUnit).toBe(true);
      expect(component.selectedUnitId).toBe(1);
      expect(component.showPriceUnitTitle).toBe('kg');
    }));

    it('should not set isUnit to true and selectedUnitId and showPriceUnitTitle if event.isUserInput is false', fakeAsync(() => {
      // Arrange
      const event = { isUserInput: false };
      const data = { id: 1, unitName: 'kg' };
      component.isUnit = false;
      component.selectedUnitId = null;
      component.showPriceUnitTitle = '';

      // Act
      component.selectUnit(event, data);
      tick();
      fixture.detectChanges();

      // Assert
      expect(component.isUnit).toBe(false);
      expect(component.selectedUnitId).toBe(null);
      expect(component.showPriceUnitTitle).toBe('');
    }));


  /* getModifiedDate  */
    it('should return the time in the format HH:mm:ss', () => {
      const mockDate = new Date('2022-02-01T12:34:56');
      spyOn(component.datePipe, 'transform').and.returnValue('12:34:56');
      expect(component.getModifiedDate()).toEqual('12:34:56');
    });
    /* getModifiedTime  */
    it('should return the current time in the format of HH:mm:ss', () => {
      let result = component.getModifiedTime();
      let time = new Date().toTimeString().split(' ')[0];
      expect(result).toEqual(time);
  });
  it('should return true if selected date is greater than or equal to today', () => {
    let today = new Date();
    let selectedDate = new Date();
    selectedDate.setDate(today.getDate() + 1);
    let result = component.dateFilterForStart(selectedDate);
    expect(result).toBe(true);
  });
   /*Date Filter */
  it('should return true when passed date is less than today', () => {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    expect(component.dateFilter(date)).toBe(true);
  });
   /* dateFilterForEnd  */
  it('should return true if selected date is greater than or equal to validFromDate', () => {
    let selectedDate = new Date(2022, 1, 1);
    let result = component.dateFilterForEnd(selectedDate);
    expect(result).toBe(true);
});
it('should return false if selected date is less than validFromDate', () => {
  let selectedDate = new Date(2021, 11, 31);
  let result = component.dateFilterForEnd(selectedDate);
  expect(result).toBe(false);
});


/*update selectedPriceType and selectedUni */

it('should update selectedPriceType and selectedUnit when event is user input', () => {
  const event = { isUserInput: true };
  const id = 'someId';
  spyOn(component, 'GetUnits').and.callThrough();
  component.selectType(event, id);

  expect(component.selectedPriceType).toBe(id);
  expect(component.selectedUnit).toBe('');
  expect(component.GetUnits).toHaveBeenCalledWith(id);
});

it('should not update selectedPriceType and selectedUnit when event is not user input', () => {
  const event = { isUserInput: false };
  const id = 'someId';
  spyOn(component, 'GetUnits').and.callThrough();
  component.selectType(event, id);

  expect(component.selectedPriceType).not.toBe(id);
  expect(component.selectedUnit).not.toBe('');
  expect(component.GetUnits).not.toHaveBeenCalled();
});
/* checkValidFrom toastr error when fromDate is not selected  */
it('should call toastr error when fromDate is not selected', () => {
  spyOn(toastrService, 'error');
  component.subscriptionPlanFormGroup.patchValue({ validfrom: '' });
  component.checkValidFrom();
  expect(toastrService.error).toHaveBeenCalledWith('Please select From Date first.');
});

/* set validto to empty string if validfrom is greater than valid to  */
it('should set validto to empty string if validfrom is greater than validto', () => {
  component.subscriptionPlanFormGroup = new FormGroup({
    validfrom: new FormControl(''),
    validto: new FormControl('')
  });
  component.subscriptionPlanFormGroup.patchValue({
    validfrom: '2022-01-01',
    validto: '2021-01-01'
  });
  component.checkStartDate();
  expect(component.subscriptionPlanFormGroup.value.validto).toBe('');
});

/* GetCurrencyCode and get the currency list  */
it('should call GetCurrencyCode and get the currency list', fakeAsync(() => {
  const pBody = {
    userId: component.UserId,
  };
  const currencyList = [{ code: 'USD' }, { code: 'INR' }];
  const spy = spyOn(_adminService, 'GetCurrencyCode').and.returnValue(of({ data: currencyList }));

  component.GetCurrencyCode();
  tick();

  expect(component.CurrencyList).toEqual(currencyList);
  expect(spy).toHaveBeenCalledWith(pBody);
}));

/*get price plan type GetPricePlanType   */
it('should get price plan type', fakeAsync(() => {
 let mockDate=[{id: 1, name: 'priceType1'}, {id: 2, name: 'priceType2'}];
  component.GetPricePlanType();
  flush();
  expect(mockDate).toEqual([{id: 1, name: 'priceType1'}, {id: 2, name: 'priceType2'}]);
}));

/* set customer data when getCustomerInfo is called getCustomerInfo*/
it('should set customer data when getCustomerInfo is called', () => {
  const mockResponse = {
    data: [
      {
        userName: 'John Doe',
        id: 1
      }
    ]
  };

  spyOn(_adminService, 'Getcustomer').and.returnValue(of(mockResponse));

  component.getCustomerInfo(1);

  expect(component.customerData).toEqual(mockResponse.data[0]);
  expect(component.customerName).toEqual('John Doe');
  expect(component.customerId).toEqual(1);
});
/* getSubsccriptionPlanById when subsPlanId */
it('should call getSubsccriptionPlanById when subsPlanId is set', () => {
  component.subsPlanId = 1;
  spyOn(component, 'getSubsccriptionPlanById');
  component.ngOnInit();
  expect(component.getSubsccriptionPlanById).toHaveBeenCalledWith(1);
});
it('should not call getSubsccriptionPlanById when subsPlanId is not set', () => {
  spyOn(component, 'getSubsccriptionPlanById');
  component.ngOnInit();
  expect(component.getSubsccriptionPlanById).not.toHaveBeenCalled();
});
/* GetCurrencyCode and get the currency list  */
// it('should call GetCustomers and get the customer list', fakeAsync(() => {
//   const pBody = {
//     userId: component.UserId,
//   };
//   const CustomerList = [{ name: 'NIK' }];
//   const spy = spyOn(_adminService, 'GetCustomers').and.returnValue(of({ data: CustomerList }));

//   component.GetCustomers();
//   tick();

//   expect(component.CurrencyList).toEqual(CustomerList);
//   expect(spy).toHaveBeenCalledWith(pBody);
// }));
/* GetCurrencyCode and get the currency list  */
// it('should call GetSubscriptionGroup and get the currency list', fakeAsync(() => {
//   const pBody = {
//     userId: component.UserId,
//   };
//   const GetSubscriptionGroup = [{ code: 'USD' }, { code: 'INR' }];
//   const spy = spyOn(_adminService, 'GetSubscriptionGroup').and.returnValue(of({ data: GetSubscriptionGroup }));

//   component.GetSubscriptionGroup();
//   tick();

//   expect(component.CurrencyList).toEqual(GetSubscriptionGroup);
//   expect(spy).toHaveBeenCalledWith(pBody);
// }));
})
