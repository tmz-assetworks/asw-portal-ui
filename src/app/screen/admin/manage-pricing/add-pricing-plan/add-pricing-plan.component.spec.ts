import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick,
} from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { AddPricingPlanComponent } from './add-pricing-plan.component';
import { AdminService } from '../../admin.service';
import { DatePipe } from '@angular/common';
import { of } from 'rxjs';

describe('AddPricingPlanComponent', () => {
  let component: AddPricingPlanComponent;
  let fixture: ComponentFixture<AddPricingPlanComponent>;
  let service: AdminService;
  let toastrService: ToastrService;
  let spy: any;
  let form: FormGroup;
  let datePipe: DatePipe;
  let httpMock: HttpTestingController;
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
      providers: [DatePipe],
    }).compileComponents();
    service = TestBed.inject(AdminService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPricingPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    datePipe = TestBed.inject(DatePipe);
    toastrService = TestBed.inject(ToastrService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  /* getModifiedDate  */
  it('should return the time in the format HH:mm:ss', () => {
    const mockDate = new Date('2022-02-01T12:34:56');
    spyOn(component.datePipe, 'transform').and.returnValue('12:34:56');
    expect(component.getModifiedDate()).toEqual('12:34:56');
  });
  it('should return false if selected date is greater than or equal to today', () => {
    let today = new Date();
    let selectedDate = new Date();
    selectedDate.setDate(today.getDate() + 1);
    let result = component.dateFilterForStart(selectedDate);
    expect(result).toBe(false);
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
  /*  number key validation check */
  it('should return true for valid number key press', () => {
    const event = { which: 48 }; // key code for 0
    expect(component.numbersDecimalOnly(event)).toEqual(true);
  });

  it('should return false for non-number key press', () => {
    const event = { which: 65 }; // key code for 'A'
    expect(component.numbersDecimalOnly(event)).toEqual(false);
  });

  it('should return true for backspace key press', () => {
    const event = { which: 8 }; // key code for backspace
    expect(component.numbersDecimalOnly(event)).toEqual(true);
  });

  it('should return false for special characters key press', () => {
    const event = { which: 33 }; // key code for '!'
    expect(component.numbersDecimalOnly(event)).toEqual(false);
  });

  /* dateFilterForEnd  */
  // it('should return true if selected date is greater than or equal to validFromDate', () => {
  //   let selectedDate = new Date(2022, 1, 1);
  //   let result = component.dateFilterForEnd(selectedDate);
  //   expect(result).toBe(true);
  //  });
  it('should return false if selected date is less than validFromDate', () => {
    let selectedDate = new Date(2021, 11, 31);
    let result = component.dateFilterForEnd(selectedDate);
    expect(result).toBe(false);
  });

  /*get  GetCurrencyDDL   */
  it('should get GetCurrencyDDL', fakeAsync(() => {
    let mockDate = [
      { id: 1, name: 'priceType1' },
      { id: 2, name: 'priceType2' },
    ];
    component.GetCurrencyDDL();
    flush();
    expect(mockDate).toEqual([
      { id: 1, name: 'priceType1' },
      { id: 2, name: 'priceType2' },
    ]);
  }));
  /*get  GetAllPriceType   */
  it('should get GetAllPriceType', fakeAsync(() => {
    let mockDate = [
      { id: 1, name: 'priceType1' },
      { id: 2, name: 'priceType2' },
    ];
    component.GetAllPriceType();
    flush();
    expect(mockDate).toEqual([
      { id: 1, name: 'priceType1' },
      { id: 2, name: 'priceType2' },
    ]);
  }));
  /*get  GetAllUnit   */
  it('should get GetAllUnit', fakeAsync(() => {
    let mockDate = [
      { id: 1, name: 'priceType1' },
      { id: 2, name: 'priceType2' },
    ];
    component.GetAllUnit(1);
    flush();
    expect(mockDate).toEqual([
      { id: 1, name: 'priceType1' },
      { id: 2, name: 'priceType2' },
    ]);
  }));
  /*get  GetAllCurrencyCode   */
  it('should get GetAllCurrencyCode', fakeAsync(() => {
    let mockDate = [
      { id: 1, name: 'priceType1' },
      { id: 2, name: 'priceType2' },
    ];
    component.GetAllCurrencyCode();
    flush();
    expect(mockDate).toEqual([
      { id: 1, name: 'priceType1' },
      { id: 2, name: 'priceType2' },
    ]);
  }));
  /*get  CustomerDDL   */
  it('should get CustomerDDL', fakeAsync(() => {
    let mockDate = [
      { id: 1, name: 'priceType1' },
      { id: 2, name: 'priceType2' },
    ];
    component.CustomerDDL();
    flush();
    expect(mockDate).toEqual([
      { id: 1, name: 'priceType1' },
      { id: 2, name: 'priceType2' },
    ]);
  }));
  /*  get selectCustomerList */
  it('should set selectedCustomerId when event isUserInput is true', () => {
    const event = { isUserInput: true };
    const id = '123';
    component.selectCustomerList(event, id);
    expect(component.selectedCustomerId).toBe(id);
  });

  it('should not set selectedCustomerId when event isUserInput is false', () => {
    const event = { isUserInput: false };
    const id = '123';
    const selectedCustomerId = '456';
    component.selectedCustomerId = selectedCustomerId;
    component.selectCustomerList(event, id);
    expect(component.selectedCustomerId).toBe(selectedCustomerId);
  });
  /**
    GetAllUnit
 */
  // it('should set selectedPriceTypeId to the passed in id and call GetAllUnit() with the id', () => {
  //   const mockObservable = jasmine.createSpyObj('Observable', ['subscribe']);
  //   mockObservable.subscribe.and.returnValue({});
  //   spyOn(service, 'GetAllUnit');
  //   const event = {isUserInput: true};
  //   const id = '123';
  //   component.selectPriceType(event, id);
  //   expect(component.selectedPriceTypeId).toEqual(id);
  //   expect(service.GetAllUnit).toHaveBeenCalledWith(id);
  // });

  it('should not set selectedPriceTypeId or call GetAllUnit() if event is not user input', () => {
    spyOn(service, 'GetAllUnit');
    const event = { isUserInput: false };
    const id = '123';
    component.selectPriceType(event, id);
    expect(component.selectedPriceTypeId).toBeUndefined();
    expect(service.GetAllUnit).not.toHaveBeenCalled();
  });
  /** get selectedCurrency List */
  it('should set selectCurrencyCode when event isUserInput is true', () => {
    const event = { isUserInput: true };
    const id = '123';
    component.selectCurrencyCode(event, id);
    expect(component.selectedCurrencyId).toBe(id);
  });

  it('should not set selectedCustomerId when event isUserInput is false', () => {
    const event = { isUserInput: false };
    const id = '123';
    const selectedCurrencyId = '456';
    component.selectedCurrencyId = selectedCurrencyId;
    component.selectCurrencyCode(event, id);
    expect(component.selectedCurrencyId).toBe(selectedCurrencyId);
  });
  /** get selectConnectorType List */
  it('should set selectedConnectorId when event isUserInput is true', () => {
    const event = { isUserInput: true };
    const id = '123';
    component.selectConnectorType(event, id);
    expect(component.selectedConnectorId).toBe(id);
  });

  it('should not set selectedConnectorId when event isUserInput is false', () => {
    const event = { isUserInput: false };
    const id = '123';
    const selectedConnectorId = '456';
    component.selectedConnectorId = selectedConnectorId;
    component.selectConnectorType(event, id);
    expect(component.selectedConnectorId).toBe(selectedConnectorId);
  });
  /** get selectUnit List */
  // it('should set selectedUnitId when event isUserInput is true', () => {
  //   const event = { isUserInput: true };
  //   const id = '123';
  //   component.selectUnit(event, id);
  //   expect(component.selectedUnitId).toBe(id);

  // });

  it('should not set selectedUnitId when event isUserInput is false', () => {
    const event = { isUserInput: false };
    const id = '123';
    const selectedUnitId = '456';
    component.selectedUnitId = selectedUnitId;
    component.selectUnit(event, id);
    expect(component.selectedUnitId).toBe(selectedUnitId);
  });
  /* checkValidFrom toastr error when fromDate is not selected  */
  it('should call toastr error when fromDate is not selected', () => {
    spyOn(toastrService, 'error');
    component.pricingPlanFormGroup.patchValue({ validFrom: '' });
    component.checkValidFrom(1);
    expect(toastrService.error).toHaveBeenCalledWith(
      'Please select valid from date first.'
    );
  });

  /* set validto to empty string if validfrom is greater than valid to  */
  it('should set validto to empty string if validfrom is greater than validto', () => {
    component.pricingPlanFormGroup.controls['validFrom'].setValue(
      new Date(2022, 0, 1)
    );

    component.pricingPlanFormGroup = new FormGroup({
      validFrom: new FormControl(''),
      validTo: new FormControl(''),
    });
    component.pricingPlanFormGroup.patchValue({
      validFrom: '2022-01-01',
      validTo: '2021-01-01',
    });
    component.checkStartDate();
    expect(component.pricingPlanFormGroup.value.validTo).toBe('');
  });
  /* Get GetLocationName   */
  it('should call the GetLocationName method of the adminService', () => {
    jasmine.createSpyObj('service', ['GetLocationName']);
    spyOn(service, 'GetLocationName').and.returnValue(
      of({ data: 'your location' })
    );
    //service.GetLocationName.and.returnValue(of({ data: 'your location' }));
    component.GetLocationName();
    expect(service.GetLocationName).toHaveBeenCalled();
  });

  it('should set the locationList variable with the returned data', () => {
    jasmine.createSpyObj('service', ['GetLocationName']);
    spyOn(service, 'GetLocationName').and.returnValue(
      of({ data: 'your location' })
    );
    //service.GetLocationName.and.returnValue(of({ data: 'your location' }));
    component.GetLocationName();
    expect(component.locationList).toEqual('your location');
  });

  /* Get CustomerDDL   */
  it('should call the CustomerDDL method of the adminService', () => {
    jasmine.createSpyObj('service', ['CustomerDDL']);
    spyOn(service, 'CustomerDDL').and.returnValue(of({ data: 'your Name' }));
    //service.GetLocationName.and.returnValue(of({ data: 'your location' }));
    component.CustomerDDL();
    expect(service.CustomerDDL).toHaveBeenCalled();
  });

  it('should set the CustomerDDL variable with the returned data', () => {
    jasmine.createSpyObj('service', ['CustomerDDL']);
    spyOn(service, 'CustomerDDL').and.returnValue(of({ data: 'your Name' }));
    //service.GetLocationName.and.returnValue(of({ data: 'your location' }));
    component.CustomerDDL();
    expect(component.CustomerList).toEqual('your Name');
  });

  /* Get GetCurrencyDDL   */
  it('should call the GetCurrencyDDL method of the adminService', () => {
    jasmine.createSpyObj('service', ['GetCurrencyDDL']);
    spyOn(service, 'GetCurrencyDDL').and.returnValue(of({ data: 'Dollar' }));

    component.GetCurrencyDDL();
    expect(service.GetCurrencyDDL).toHaveBeenCalled();
  });

  it('should set the GetCurrencyDDL variable with the returned data', () => {
    jasmine.createSpyObj('service', ['GetCurrencyDDL']);
    spyOn(service, 'GetCurrencyDDL').and.returnValue(of({ data: 'Dollar' }));

    component.GetCurrencyDDL();
    expect(component.currencyList).toEqual('Dollar');
  });

  /* Get GetAllPriceType   */
  it('should call the GetAllPriceType method of the adminService', () => {
    jasmine.createSpyObj('service', ['GetAllPriceType']);
    spyOn(service, 'GetAllPriceType').and.returnValue(of({ data: '12.45' }));

    component.GetAllPriceType();
    expect(service.GetAllPriceType).toHaveBeenCalled();
  });

  it('should set the GetAllPriceType variable with the returned data', () => {
    jasmine.createSpyObj('service', ['GetAllPriceType']);
    spyOn(service, 'GetAllPriceType').and.returnValue(of({ data: '12.45' }));

    component.GetAllPriceType();
    expect(component.pricingList).toEqual('12.45');
  });
  /* Get GetAllUnit   */
  it('should call the GetAllUnit method of the adminService', () => {
    jasmine.createSpyObj('service', ['GetAllUnit']);
    spyOn(service, 'GetAllUnit').and.returnValue(of({ data: 'one' }));

    component.GetAllUnit(1);
    expect(service.GetAllUnit).toHaveBeenCalled();
  });

  it('should set the GetAllUnit variable with the returned data', () => {
    jasmine.createSpyObj('service', ['GetAllUnit']);
    spyOn(service, 'GetAllUnit').and.returnValue(of({ data: 'one' }));

    component.GetAllUnit(1);
    expect(component.unitList).toEqual('one');
  });

  /* Get GetAllCurrencyCode   */
  it('should call the GetAllCurrencyCode method of the adminService', () => {
    jasmine.createSpyObj('service', ['GetAllCurrencyCode']);
    spyOn(service, 'GetAllCurrencyCode').and.returnValue(of({ data: '$' }));

    component.GetAllCurrencyCode();
    expect(service.GetAllCurrencyCode).toHaveBeenCalled();
  });

  it('should set the GetAllCurrencyCode variable with the returned data', () => {
    jasmine.createSpyObj('service', ['GetAllCurrencyCode']);
    spyOn(service, 'GetAllCurrencyCode').and.returnValue(of({ data: '$' }));

    component.GetAllCurrencyCode();
    expect(component.currencyList).toEqual('$');
  });

  it('should add location id to locationIdResponse array', () => {
    component.locationIdResponse = [];
    const event = { isUserInput: true };
    const id = 1;
    component.onSelectLocation(event, id);
    expect(component.locationIdResponse).toContain(id);
  });
  /* get onSelectLocation*/
  it('should remove location id from locationIdResponse array', () => {
    component.locationIdResponse = [1];
    const event = { isUserInput: true };
    const id = 1;
    component.onSelectLocation(event, id);
    expect(component.locationIdResponse).not.toContain(id);
  });

  it('should call getChargeboxIdByLocationsId with updated locationIdResponse', () => {
    component.locationIdResponse = [];
    const event = { isUserInput: true };
    const id = 1;
    spyOn(component, 'getChargeboxIdByLocationsId');
    component.onSelectLocation(event, id);
    expect(component.getChargeboxIdByLocationsId).toHaveBeenCalledWith([1]);
  });
  /** Get onSelectCharger*/
  it('should add data to chargeboxidResponse when event isUserInput is true', () => {
    const event = { isUserInput: true };
    const data = { id: 1, locationId: 2 };
    component.onSelectCharger(event, data);
    expect(component.chargeboxidResponse).toEqual([
      { locationId: 2, chargerId: 1 },
    ]);
  });
  /**  Get CustomerInfo */
  it('should call the Getcustomer method of the AdminService and update the customerData and customerName properties', () => {
    // Arrange
    const id = 1;
    const mockResponse = {
      data: [
        {
          id: 1,
          userName: 'John Doe',
        },
      ],
    };
    spyOn(service, 'Getcustomer').and.returnValue(of(mockResponse));

    // Act
    component.getCustomerInfo(id);

    // Assert
    expect(service.Getcustomer).toHaveBeenCalledWith(id);
    expect(component.customerData).toEqual(mockResponse.data[0]);
    expect(component.customerName).toEqual('John Doe');
  });
  /** Get GetConnectorType  */

  it('should set connectorTypeList to the data returned by GetConnectorType', () => {
    jasmine.createSpyObj('adminService', ['GetConnectorType']);
    spy = service.GetConnectorType;
    spyOn(service, 'GetConnectorType').and.returnValue(of({ data: [] }));
    //spy.and.returnValue(of({ data: [1, 2, 3] }));
    component.GetConnectorType();
    expect(component.connectorTypeList).toEqual([]);
  });
  // it('should call GetConnectorType with userId', () => {
  //   spyOn(service, 'GetLocationName').and.returnValue(of({ data: [] }));
  //   //spy = service.GetConnectorType.and.returnValue(of({ data: [] }));
  //   component.UserId = 'test-user-id';
  //   component.GetConnectorType();
  //   expect(spy).toHaveBeenCalledWith({ userId: 'test-user-id' });
  // });

  // it('should set connectorTypeList to the data returned by GetConnectorType', () => {
  //   spyOn(service, 'GetLocationName').and.returnValue(of({ data: [] }));
  //   //spy = service.GetConnectorType.and.returnValue(of({ data: [] }));
  //   spy.and.returnValue(of({ data: [1, 2, 3] }));
  //   component.GetConnectorType();
  //   expect(component.connectorTypeList).toEqual([1, 2, 3]);
  // });

  /* should be patch value form data  */
  it('should be patch value form data getPricePlanbyid', () => {
    form = new FormGroup({
      customerN: new FormControl(''),
      pricingPlanName: new FormControl(''),
      description: new FormControl(''),
      currencyCode: new FormControl(''),
      validFrom: new FormControl(''),
      validTo: new FormControl(''),
      connectorType: new FormControl(''),
      priceTypeId: new FormControl(''),
      unitName: new FormControl(''),
      price: new FormControl(''),
      processPayment: new FormControl(true),
      priceSlot: new FormControl(false),
      parkingFee: new FormControl(''),
      gracePeriod: new FormControl(''),
      transactionFees: new FormControl(''),
      salaryTax: new FormControl(''),
      salesTax: new FormControl(''),
      locationId: new FormControl(''),
      chargerId: new FormControl(''),
    });

    form.patchValue({ customerN: 'Rehan' });
    expect(form.get('customerN')?.value).toEqual('Rehan');
  });
  /***for patching value **/
  it('#GetCustomerbyID  GET ALL CUSTOMER', () => {
    component.getPricePlanbyid(1);
    const service = fixture.debugElement.injector.get(AdminService);
    spyOn(service, 'getPricePlanbyid').and.callFake(() => {
      return of([
        {
          data: [
            {
              connectorId: 1,
              connectorType: 'CHAdeMO',
              currencyCode: '11',
              currencyName: 'USD',
              customerId: 1,
              customerName: 'TekMindz',
              description: '',
              gracePeriod: 0,
              id: 41,
              isActive: true,
              location: 10,
              locationIdResponse: [1, 4, 6, 42, 44, 48, 97],
              parkingFess: 10.5,
              price: 12.12,
              pricePlanLocationsMapperobj: [
                { locationId: 4, chargerId: 125 },
                { locationId: 6, chargerId: 37 },
              ],
              pricePlanName: 'OneMonth',
              priceSlot: false,
              priceTypeId: 1,
              processPayment: true,
              salesTax: 0,
              tax: 0,
              transactionFess: 0,
              unitId: 1,
              unitName: 'kWh',
              validFrom: '2022-12-06T15:31:07',
              validTo: '2022-12-22T15:31:07',
            },
          ],
        },
      ]);
    });
  });

/* set getPricePlanbyid Data patching  correctly*/
  // it('should set getPricePlanbyid Data patching  correctly', fakeAsync(() => {
  //   fixture = TestBed.createComponent(AddPricingPlanComponent);
  //   component = fixture.componentInstance;
  //   service = TestBed.get(AdminService);
  //   const customerData = {
  //     connectorId: 3,
  //     currencyId: 13,
  //     customerId: 1,
  //     description: "",
  //     gracePeriod: 212,
  //     isActive: true,
  //     parkingFee: 21,
  //     price: 1211,
  //     pricePlanLocationsMapperCommand: [{locationId: 48, chargerId: 0}],
  //     priceSlot: false,
  //     priceTypeId: 3,
  //     pricingPlanName: "Reh",
  //     processPayment: true,
  //     salesTax: 0,
  //     tax: 0,
  //     transactionFees: 2121,
  //     unitId: 3,
  //     userId: "2e8687a7-ab66-4637-83be-9ccc3b66e876",
  //     validFrom: "2023-01-10T16:36:43",
  //     validTo: "2023-01-26T16:36:43",
  //   };
  //   spyOn(service, 'getPricePlanbyid').and.returnValue(of({ data: [customerData] }));
  //   component.getPricePlanbyid(1);
  //  tick();
  //  expect(component.customerData).toEqual(customerData);
  //  expect(component.pricingPlanFormGroup.value).toEqual({

  //   connectorId: 3,
  //   currencyId: 13,
  //   customerId: 1,
  //   description: "",
  //   gracePeriod: 212,
  //   isActive: true,
  //   parkingFee: 21,
  //   price: 1211,
  //   pricePlanLocationsMapperCommand: [{locationId: 48, chargerId: 0}],
  //   priceSlot: false,
  //   priceTypeId: 3,
  //   pricingPlanName: "Reh",
  //   processPayment: true,
  //   salesTax: 0,
  //   tax: 0,
  //   transactionFees: 2121,
  //   unitId: 3,
  //   userId: "2e8687a7-ab66-4637-83be-9ccc3b66e876",
  //   validFrom: "2023-01-10T16:36:43",
  //   validTo: "2023-01-26T16:36:43",
  //  })
  //  }))

  // it('should set customer data correctly', fakeAsync(() => {
  //   fixture = TestBed.createComponent(AddPricingPlanComponent);
  //   component = fixture.componentInstance;
  //   service = TestBed.get(AdminService);
  //   const customerData = {

      // connectorId: 3,
      // currencyId: 13,
      // customerId: 1,
      // description: "",
      // gracePeriod: 212,
      // isActive: true,
      // parkingFee: 21,
      // price: 1211,
      // pricePlanLocationsMapperCommand: [{locationId: 48, chargerId: 0}],
      // priceSlot: false,
      // priceTypeId: 3,
      // pricingPlanName: "Reh",
      // processPayment: true,
      // salesTax: 0,
      // tax: 0,
      // transactionFees: 2121,
      // unitId: 3,
      // userId: "2e8687a7-ab66-4637-83be-9ccc3b66e876",
      // validFrom: "2023-01-10T16:36:43",
      // validTo: "2023-01-26T16:36:43",
  //   };
  //   spyOn(service, 'getPricePlanbyid').and.returnValue(
  //     of({ data: [customerData] })
  //   );
  //   component.getPricePlanbyid(1);
  //   tick();
  //   expect(component.customerData).toEqual(customerData);
  //   expect(component.pricingPlanFormGroup.value).toEqual({
  //     connectorId: 3,
  //     currencyId: 13,
  //     customerId: 1,
  //     description: "",
  //     gracePeriod: 212,
  //     isActive: true,
  //     parkingFee: 21,
  //     price: 1211,
  //     pricePlanLocationsMapperCommand: [{locationId: 48, chargerId: 0}],
  //     priceSlot: false,
  //     priceTypeId: 3,
  //     pricingPlanName: "Reh",
  //     processPayment: true,
  //     salesTax: 0,
  //     tax: 0,
  //     transactionFees: 2121,
  //     unitId: 3,
  //     userId: "2e8687a7-ab66-4637-83be-9ccc3b66e876",
  //     validFrom: "2023-01-10T16:36:43",
  //     validTo: "2023-01-26T16:36:43",
  //   });
  // }));
});
