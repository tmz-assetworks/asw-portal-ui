import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';

import { AddCustomersComponent } from './add-customers.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { SuperAdminService } from '../../super-admin.service';

import { routes } from 'src/app/app-routing.module';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/service/storage.service';

describe('AddCustomersComponent', () => {
  let component: AddCustomersComponent;
  let fixture: ComponentFixture<AddCustomersComponent>;
  let router: Router;
  let form: FormGroup;
  let mockService: any;
  let service: any;
  let superAdminService: SuperAdminService;
  let _toastr: ToastrService;
  let formBuilder: FormBuilder;
  let storageService: StorageService;
  let createCustomerSpy: jasmine.Spy;
  let getAllStateByCountryIdSpy: jasmine.Spy;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(routes),
        ToastrModule.forRoot(),
        HttpClientTestingModule,
        MatSelectModule,
        BrowserAnimationsModule,
      ],

      declarations: [AddCustomersComponent],
      providers: [SuperAdminService,StorageService],
    }).compileComponents();
    router = jasmine.createSpyObj('router', ['navigate']);
    _toastr = TestBed.get(ToastrService);
    formBuilder = TestBed.get(FormBuilder);
    //spyOn(_router, 'navigate').and.returnValue(Promise.resolve(true));
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(AddCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    storageService=TestBed.get(StorageService)
    service = TestBed.get(SuperAdminService);

  });

  //  it('should call getAllStateByCountryId with the provided id', () => {
  //   getAllStateByCountryIdSpy = spyOn(service, 'getAllStateByCountryId').and.returnValue(of({ data: [{ id: 1, name: 'state1' }, { id: 2, name: 'state2' }] }));

  //   service.getAllStateByCountryId(1);
  //    expect(getAllStateByCountryIdSpy).toHaveBeenCalledWith(1);
  //  });

  // it('should set getAllStateList to the returned data', () => {
  //   getAllStateByCountryIdSpy = spyOn(service, 'getAllStateByCountryId').and.returnValue(of({ data: [{ id: 1, name: 'state1' }, { id: 2, name: 'state2' }] }));

  //   service.getAllStateByCountryId(1);
  //   expect(service.getAllStateList).toEqual([{ id: 1, name: 'state1' }, { id: 2, name: 'state2' }]);
  // });
it('should be patch value form data', () => {
    form = new FormGroup({
      addressLine: new FormControl(''),
      addressLine1: new FormControl(''),
      addressLine2: new FormControl(''),
      assets: new FormControl(''),
      cityName: new FormControl(''),
      countryID: new FormControl(''),
      countryName: new FormControl(''),
      description: new FormControl(''),
      email: new FormControl(''),
      id: new FormControl(''),
      isActive: new FormControl(''),
      //modifiedOn: '2023-01-05T14:19:39.9832855',
      noofevcharger: new FormControl(''),
      phoneNumber: new FormControl(''),
      pointofcontact: new FormControl(''),
      stateID: new FormControl(''),
      stateName: new FormControl(''),
      userName: new FormControl(''),
      users: new FormControl(''),
      zipCode: new FormControl(''),
    });

    form.patchValue({ userName: 'Rehan' });
    expect(form.get('userName')?.value).toEqual('Rehan');
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllCountry method on init', () => {
    const componentSpy = spyOn(component, 'getAllCountry').and.callThrough();

    expect(componentSpy).not.toHaveBeenCalled();
    component.ngOnInit();
    expect(componentSpy).toHaveBeenCalledTimes(1);
  });

  it('#getAllStateByCountryId  GET State Name', () => {
    component.getAllStateByCountryId(1);

    const service = fixture.debugElement.injector.get(SuperAdminService);
    spyOn(service, 'getAllStateByCountryId').and.callFake(() => {
      return of([
        {
          data: [
            { countryId: 1, id: 1, stateName: 'Alabama' },
            { countryId: 1, id: 3, stateName: 'Alaska' },
            { countryId: 1, id: 32, stateName: 'American Samoa' },
          ],
        },
      ]);
    });
  });

  it('should return getAllStateByCountryId data', () => {
    let mockResponse = [
      { countryId: 1, id: 1, stateName: 'Alabama' },
      { countryId: 1, id: 3, stateName: 'Alaska' },
      { countryId: 1, id: 32, stateName: 'American Samoa' },
    ];
    let response: any;
    const service = fixture.debugElement.injector.get(SuperAdminService);
    spyOn(service, 'getAllStateByCountryId').and.returnValue(of(mockResponse));
    service.getAllStateByCountryId(1).subscribe((res: any) => {
      response = res;
    });
    expect(response).toEqual(mockResponse);
  });

  it('should call getAllStateByCountryId method on init', () => {
    const componentSpy = spyOn(
      component,
      'getAllStateByCountryId'
    ).and.callThrough();
    component.ngOnInit();
    expect(componentSpy).not.toHaveBeenCalled();
  });

  it('should call GetCustomerbyID method on init', () => {
    const componentSpy = spyOn(component, 'GetCustomerbyID').and.callThrough();

    expect(componentSpy).not.toHaveBeenCalled();

    component.ngOnInit();
    expect(componentSpy).toHaveBeenCalledTimes(0);
  });

  // it('should navigate when click cancel', () => {
  //   component.cancel();
  //   expect(router.navigate.calls.any()).toBe(true, 'superadmin/customer');
  // });

  // it('should navigate when click save button', () => {
  //   component.addCustomers();
  //   expect(router.navigate.calls.any()).toBe(false, 'superadmin/customer');
  // });

  // it('should navigate when click update button', () => {
  //   component.UpdateCustomers(
  //   );
  //   expect(router.navigate.calls.any()).toBe(false, 'superadmin/customer');
  // });

  it('should not valid', () => {
    expect(component.addCustomerProfile.valid).not.toBeTruthy();
  });

  it('should be valid if form value is valid', () => {
    component.addCustomerProfile.setValue({
      userName: 'Bobby',
      email: 'bobby@bobby.com',
      // "message": "Email me a soda, please.",
      notes: 'Please fill in the',
      pointofcontact: 'sassa',
      phoneNumber: 'adsas',
      addressLine1: 'sda',
      addressLine2: 'sada',
      country: 'sdsa',
      state: 'sda',
      cityName: 'asda',
      zipCode: 'sada',
    });

    expect(component.addCustomerProfile.valid).toEqual(true);
  });

  // it('#GetCustomerbyID  GET ALL CUSTOMER', () => {
  //   component.GetCustomerbyID(1);
  //   const service = fixture.debugElement.injector.get(SuperAdminService);
  //   spyOn(service, 'GetCustomerbyID').and.callFake(() => {
  //     return of([
  //       {
  //         data: [
  //           {
  //             addressLine1: 'SN-121',
  //             addressLine2: '',
  //             assets: 165,
  //             cityName: 'sdadsad',
  //             countryID: 1,
  //             countryName: 'United States',
  //             description: '',
  //             email: 'Rehan@gmail.com',
  //             id: 88,
  //             isActive: true,
  //             modifiedOn: '2023-01-05T14:19:39.9832855',
  //             noofevcharger: 23,
  //             phoneNumber: '(989) 898-9898',
  //             pointofcontact: 'sadasd',
  //             stateID: 33,
  //             stateName: 'Arizona',
  //             userName: 'Rehan',
  //             users: 26,
  //             zipCode: '212133',
  //           },
  //         ],
  //       },
  //     ]);
  //   });
  // });

  it(`should have as title 'Add Organization'`, () => {
    const fixture = TestBed.createComponent(AddCustomersComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Add Organization');
  });

  it('should have as country Id 0', async () => {
    component.ngOnInit();
    expect(component.countryId).toEqual(0);
  });

  it('should have as state Id 0', async () => {
    component.ngOnInit();
    expect(component.stateId).toEqual(0);
  });

  it('should have as city Id 0', async () => {
    component.ngOnInit();
    expect(component.cityId).toEqual(0);
  });
  it('should be showAddCustomer  undefined.', () => {
    expect(component.showAddCustomer).toBeUndefined();
  });

  it('should be selectedCityId  undefined.', () => {
    expect(component.selectedCityId).toBeUndefined();
  });
  it('should be showCustomersList undefined.', () => {
    expect(component.showCustomersList).toBeUndefined();
  });
  it('should be customerData .', () => {
    expect(component.customerData).toBeUndefined();
  });
  it('should be UserId Null.', () => {
    expect(component.UserId).toBeNull();
  });
  it('should be customersId undefined.', () => {
    expect(component.customersId).toBeUndefined();
  });
  it('should be isSaveBtn true.', () => {
    expect(component.isSaveBtn).toEqual(true);
  });
  it('should be isUpdateBtn false.', () => {
    expect(component.isUpdateBtn).toEqual(false);
  });
  it('should be countryList undefined.', () => {
    expect(component.countryList).toBeUndefined();
  });
  it('should be selectedCountryId undefined.', () => {
    expect(component.selectedCountryId).toBeUndefined();
  });

  it('should be selectedStateId undefined.', () => {
    expect(component.selectedStateId).toBeUndefined();
  });

  // it('#addCustomers  Create Customers', () => {
  //   component.addCustomers();
  //   let _toastr = TestBed.inject(ToastrService);
  //   const service = fixture.debugElement.injector.get(SuperAdminService);
  //   spyOn(service, 'CreateCustomer').and.callFake(() => {
  //     return of([
  //       {
  //         data: [
  //           {
  //             addressLine1: 'Asss-656/o0',
  //             addressLine2: '',
  //             cityName: 'jersey',
  //             countryID: 1,
  //             createdBy: '585b7797-79b0-4f25-a0a6-8d412a8102a6',
  //             email: 'nik@gmail.com',
  //             notes: '',
  //             phoneNumber: '(909) 009-0090',
  //             pointofcontact: 'phone',
  //             stateID: 61,
  //             userName: 'Nil',
  //             zipCode: '21121212',
  //           },
  //         ],
  //         if(data: any) {
  //           //Do your stuffs...
  //           _toastr.success('Record saved successfully.');
  //           component.addCustomerProfile.reset();
  //           component.showLoader = false;
  //           component.submitted = false;
  //           router.navigate(['superadmin/customer']);
  //         },
  //       },
  //     ]);
  //     mockService = jasmine.createSpyObj(['createCustomer', 'updateCustomer']);
  //   });
  // });

  it('should Create Customers empty', () => {
    let _toastr = TestBed.inject(ToastrService);
    component.addCustomers();
    component.UpdateCustomers();

    component.addCustomerProfile.setValue({
      addressLine1: null,
      addressLine2: null,
      cityName: null,
      notes: null,
      pointofcontact: null,
      country: null,
      email: null,
      phoneNumber: null,
      userName: null,
      state: null,
      zipCode: null,
    });

    expect(component.addCustomerProfile.invalid).toBeTruthy();
    // spyOn(_toastr, 'error');

    // _toastr.error('Please fill mandatory fields');
    if (component.addCustomerProfile.invalid) {
      _toastr.error('Please fill mandatory fields.');
      return;
    }
    spyOn(_toastr, 'error');
    expect(_toastr.error).toHaveBeenCalledWith('Please fill mandatory fields.');
  });

  // it('should be cancel button '),()=>{
  //   spyOn(router, 'navigate');
  //   component.cancel()
  //   fixture.detectChanges();
  //   expect(_router.navigate).toHaveBeenCalledWith(['superadmin/customer']);
  //   //expect(router.navigate).toHaveBeenCalledWith(['/themen'])
  // }

  it('should Create Customers success full', () => {
    let _toastr = TestBed.inject(ToastrService);
    component.addCustomers();
   // component.UpdateCustomers();
    spyOn(router, 'navigate');

    component.addCustomerProfile.setValue({
      addressLine1: 'Asss-656/o0',
      addressLine2: '',
      cityName: 'jersey',
      country: 1,

      email: 'nik@gmail.com',
      notes: '',
      phoneNumber: '(909) 009-0090',
      pointofcontact: 'phone',
      state: 61,
      userName: 'Nil',
      zipCode: '21121212',
    });
    // expect(_router.navigate).toHaveBeenCalledWith(['/superadmin/customer']);
    expect(component.addCustomerProfile.valid).toBeTruthy();
    spyOn(_toastr, 'success');

    // _toastr.error('Please fill mandatory fields');
  });
/*  Create Customer data correctly' */
   it('should set GetCustomerbyID Data patching  correctly', fakeAsync(() => {
    fixture = TestBed.createComponent(AddCustomersComponent);
    component = fixture.componentInstance;
    service = TestBed.get(SuperAdminService);
    const customerData = {
      userName: 'John Smith',
      description: 'Test customer',
      pointofcontact: 'John',
      notes:'',
      ponitOfContact: 'Smith',
      email: 'johnsmith@email.com',
      phoneNumber: '1234567890',
      addressLine1: '123 Main St',
      addressLine2: 'Apt 4B',
      zipCode: '12345',
      countryName: 'United States',
      countryID: 1,
      stateName: 'California',
      stateID: 2,
      cityName: 'Los Angeles'
    };
    spyOn(service, 'GetCustomerbyID').and.returnValue(of({ data: [customerData] }));
    component.GetCustomerbyID(1);
   tick();
   expect(component.customerData).toEqual(customerData);
   expect(component.addCustomerProfile.value).toEqual({

      userName: 'John Smith',
      //description: 'Test customer',
      pointofcontact: 'John',
      notes:'Test customer',
      //ponitOfContact: 'Smith',
      email: 'johnsmith@email.com',
      phoneNumber: '1234567890',
      addressLine1: '123 Main St',
      addressLine2: 'Apt 4B',
      zipCode: '12345',
      country: 'United States',
     // countryID: 1,
      state: 'California',
     // stateID: 2,
      cityName: 'Los Angeles'
   })
   }))

  it('should set selectedStateId to the given id', () => {
    const event = { isUserInput: true };
    const id = 'someId';
    // const component = new MyComponent();

    component.selectState(event, id);

    expect(component.selectedStateId).toBe(id);
  });

  it('should not set selectedStateId if event is not user input', () => {
    const event = { isUserInput: false };
    const id = 'someId';
    ///const component = new MyComponent();

    component.selectState(event, id);

    expect(component.selectedStateId).toBeUndefined();
  });

  it('should set selectedCountryId and call getAllStateByCountryId', () => {
    spyOn(component, 'getAllStateByCountryId');
    const event = { isUserInput: true };
    const id = 1;
    component.selectCountry(event, id);
    component.selectedStateId = 1;
    component.selectedCityId = 2;
    expect(component.selectedCountryId).toEqual(id);
    expect(component.getAllStateByCountryId).toHaveBeenCalledWith(id);
    expect(component.addCustomerProfile.value.state).toBe('');
  });

  it('should not set selectedCountryId and not call getAllStateByCountryId', () => {
    spyOn(component, 'getAllStateByCountryId');
    const event = { isUserInput: false };
    const id = 1;
    component.selectedStateId = 1;
    component.selectedCityId = 2;
    component.selectCountry(event, id);
    expect(component.selectedCountryId).toBeUndefined();
    expect(component.getAllStateByCountryId).not.toHaveBeenCalled();
    expect(component.addCustomerProfile.value.state).toBe('');
  });

/**Cancel navigation button working  */

  it('should navigate to "superadmin/customer"', () => {
    spyOn(router, 'navigate');
    component.cancel();
    expect(router.navigate).toHaveBeenCalledWith(['superadmin/customer']);
  });

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

/** Omit Special char unit case */

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

    /** */
    // it('should have title "Edit Organization" when customersId is truthy and routePath is not "view-customer"', () => {
    //   component.customersId = true;
    //   component.routePath = 'not-view-customer';
    //   component.ngOnInit();
    //   expect(component.title).toEqual('Edit Organization');
    //   expect(component.isUpdateBtn).toBeTruthy();
    //   expect(component.isSaveBtn).toBeFalsy();
    // });

  //   it('should have title "View Organization" when customersId is truthy and routePath is "view-customer"', () => {
  //     component.customersId = true;
  //     component.routePath = 'view-customer';
  //     component.ngOnInit();
  //     expect(component.title).toEqual('View Organization');
  //     expect(component.isSaveBtn).toBeFalsy();
  //     expect(component.isUpdateBtn).toBeFalsy();
  //     expect(component.addCustomerProfile.disabled).toBeTruthy();
  //   });

  //   it('should have title "Add Organization" when customersId is falsy', () => {
  //     component.customersId = false;
  //     component.routePath = 'not-view-customer';
  //     component.ngOnInit();
  //     expect(component.title).toEqual('Add Organization');
  //     expect(component.isSaveBtn).toBeTruthy();
  //     expect(component.isUpdateBtn).toBeFalsy();
  //   });
  //   it('should set title to "Edit Organization"', () => {
  //     component.customersId = 1;
  //     component.routePath = 'edit-customer';
  //     component.ngOnInit();
  //     expect(component.title).toBe('Edit Organization');
  // });


    /**call GetCustomerbyID and getAllCountry on ngOnInit */
    // it('should call GetCustomerbyID and getAllCountry on ngOnInit', () => {
    //   spyOn(service, 'GetCustomerbyID').and.returnValue(of({}));
    //   spyOn(service, 'getAllCountry').and.returnValue(of([]));
    //   component.customersId = 1;

    //   fixture.detectChanges();

    //   expect(service.GetCustomerbyID).toHaveBeenCalledWith(1);
    //   expect(service.getAllCountry).toHaveBeenCalled();
    // });

    /** all the update customer service when form is valid  */
    // fit('should call the update customer service when form is valid', () => {
    //    spyOn(superAdminService, 'UpdateCustomer').and.returnValue(of({data: true}));
    //   spyOn(router, 'navigate');
    //   spyOn(_toastr, 'success');

    //   component.addCustomerProfile = formBuilder.group({
    //     userName: 'testUser',
    //     email: 'test@email.com',
    //     notes: 'test notes',
    //     phoneNumber: '1234567890',
    //     pointofcontact: 'test contact',
    //     addressLine1: 'test address 1',
    //     addressLine2: 'test address 2',
    //     zipCode: '12345',
    //     cityName: 'test city'
    //   });
    //   component.selectedCountryId = 1;
    //   component.selectedStateId = 1;
    //   component.customersId = 1;
    //   component.UserId = '';
    //   component.UpdateCustomers();
    //   expect(superAdminService.UpdateCustomer).toHaveBeenCalled();
    //   expect(router.navigate).toHaveBeenCalledWith(['superadmin/customer']);
    //   expect(_toastr.success).toHaveBeenCalledWith('Record update successfully.');
    // });

    // it('should show error message when form is invalid', () => {
    //   createCustomerSpy = spyOn(superAdminService, 'UpdateCustomer').and.returnValue(of({}));

    //   spyOn(_toastr, 'error');

    //   component.addCustomerProfile = formBuilder.group({
    //     userName: '',
    //     email: '',
    //     notes: '',
    //     phoneNumber: '',
    //     pointofcontact:'',
    //     addressLine1:'',
    //     addressLine2:'',
    //     zipCode:'',
    //     cityName:'',
    //   });
    // });

    /**  call CreateCustomer with correct body and navigate to customer page*/
//     it('should call CreateCustomer with correct body and navigate to customer page', () => {
//       // set up test data
//       component.addCustomerProfile.value = {
//         userName: 'Test User',
//         email: 'test@email.com',
//         notes: 'Test notes',
//         pointofcontact: 'Test contact',
//         phoneNumber: '123-456-7890',
//         addressLine1: 'Test address 1',
//         addressLine2: 'Test address 2',
//         zipCode: '12345',
//       };
//       component.selectedCountryId = 1;
//       component.selectedStateId = 2;
//       component.customersId = 3;
//       component.UserId = '4';
//       component.submitted = true;
//       const expectedBody = {
//         id: 3,
//         userName: 'Test User',
//         email: 'test@email.com',
//         notes: 'Test notes',
//         pointofcontact: 'Test contact',
//         phoneNumber: '123-456-7890',
//         addressLine1: 'Test address 1',
//         addressLine2: 'Test address 2',
//         zipCode: '12345',
//         countryID: 1,
//         stateID: 2,
//         cityName: '',
//         createdBy: 4
//       };
// });
});
