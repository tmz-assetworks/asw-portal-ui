import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatSelectModule } from '@angular/material/select'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { ToastrModule } from 'ngx-toastr'
import { AddOperatorComponent } from './add-operator.component'
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../admin.service'
import { of } from 'rxjs'
describe('AddOperatorComponent', () => {
  let component: AddOperatorComponent
  let fixture: ComponentFixture<AddOperatorComponent>
  let router: Router;
  let adminService: AdminService;
  let formBuilder: FormBuilder;
  let spy: any;
  let operatorData: string;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        MatSelectModule,
        BrowserAnimationsModule,
      ],
      declarations: [AddOperatorComponent],
    }).compileComponents()
    router=TestBed.inject(Router);
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOperatorComponent)
    component = fixture.componentInstance
    operatorData = 'test data';
    fixture.detectChanges()
    adminService = TestBed.inject(AdminService);
    formBuilder = TestBed.inject(FormBuilder);

  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })


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
  it('should be registrationForm  undefined.', () => {
    expect(component.registrationForm).toBeUndefined();
  });
  it('should be locationList undefined.', () => {
    expect(component.locationList).toBeUndefined();
  });
  it('should be operatorData .', () => {
    expect(component.operatorData).toBe('');
  });
  // it('should be UserId undefined.', () => {
  //   expect(component.UserId).toBeUndefined();
  // });
  it('should be stateList Null.', () => {
    expect(component.stateList).toBeUndefined();
  });
  it('should be saveBtnValue undefined.', () => {
    expect(component.saveBtnValue).toEqual(true);
  });
  it('should be saveBtn true.', () => {
    expect(component.saveBtn).toEqual(true);
  });
  it('should be showLoader false.', () => {
    expect(component.showLoader).toEqual(false);
  });
  it('should be countryList undefined.', () => {
    expect(component.countryList).toBeUndefined();
  });
  it('should be countryId undefined.', () => {
    expect(component.countryId).toBe(0);
  });

  it('should be stateId undefined.', () => {
    expect(component.stateId).toBe(0);
  });
  it('should be selectValue undefined.', () => {
    expect(component.selectValue).toBe('0');
  });
  it('should be UserId undefined.', () => {
    expect(component.UserId).toBeNull();
  });
  it('should be role undefined.', () => {
    expect(component.role).toEqual('');
  });
  it('should be editId undefined.', () => {
    expect(component.editId).toEqual(0);
  });
  it('should be disabled undefined.', () => {
    expect(component.disabled).toBeUndefined();
  });
  it('should not valid', () => {
    expect(component.addOperatorProfile.valid).not.toBeTruthy();
  });

  it('should be valid if form value is valid', () => {
    component.addOperatorProfile.setValue({
      username: 'Bobby',
      emailid: 'bobby@bobby.com',
      // "message": "Email me a soda, please.",
     // notes: 'Please fill in the',
     // pointofcontact: 'sassa',
     //operatorUserMapperCommand:[{0:118}],
    // userRolesCommand:[{id: 28, roleID: 4}],
      phonenumber: 'adsas',
      locationIds:[2],
      addressLine1: 'sda',
      addressLine2: 'sada',
      country: 'sdsa',
      state: 'sda',
      cityName: 'asda',
      zipcode: 'sada',
    });

    expect(component.addOperatorProfile.valid).toEqual(true);
  });
  /* navigate to the correct URL when the button is clicked  */

  it('should navigate to the correct URL when the button is clicked', () => {
    // Spy on the navigateByUrl method
    spyOn(router, 'navigateByUrl');

    // Call the btnClick method
    component.btnClick();

    // Assert that the navigateByUrl method was called with the correct URL
    expect(router.navigateByUrl).toHaveBeenCalledWith('admin/manage-operator/');
  });

  /**Phone Number key validation check */
  // it('should return true for valid number key press', () => {
  //   const event = { which: 48 }; // key code for 0
  //   expect(component.phoneNumber(event)).toEqual();
  //   });

    it('should return false for non-number key press', () => {
    const event = { which: 65 }; // key code for 'A'
    expect(component.phoneNumber(event)).toEqual();
    });

    // it('should return true for backspace key press', () => {
    // const event = { which: 8 }; // key code for backspace
    // expect(component.phoneNumber(event)).toBe();
    // });

    it('should return false for special characters key press', () => {
    const event = { which: 33 }; // key code for '!'
    expect(component.phoneNumber(event)).toEqual();
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

    it('should set the countryList and locationList correctly', () => {
      // Create a mock response
      const countryListMockResponse = {
          data: [{ id: 1, name: 'India' }],
      };
      const locationListMockResponse = {
          data: [{ id: 1, name: 'Hyderabad' }],
      };

      // Stub the getListApi method to return the mock response
      spyOn(adminService, 'getListApi').and.callFake((param) => {
          if(param === 'country') {
              return of(countryListMockResponse);
          }
          return of(locationListMockResponse);
      });
      component.ngOnInit()
      // Call the methods
      adminService.getListApi('countryList');
      adminService.getListApi('locationList');

      // Assert that the countryList and locationList properties are set correctly
      expect(component.countryList).toEqual([{ id: 1, name: 'India' }]);
      expect(component.locationList).toEqual([{ id: 1, name: 'Hyderabad' }]);
    });

    it('should return true when passed date is less than today', () => {
      let date = new Date();
      date.setDate(date.getDate() - 1);
      expect(component.dateFilter(date)).toBe(true);
    });

    it('should return false when passed date is greater than today', () => {
      let date = new Date();
      date.setDate(date.getDate() + 1);
      expect(component.dateFilter(date)).toBe(false);
    });

    it('should format the telephone number correctly', () => {
      const event = {
        target: {
          value: '123'
        }
      }
      // Call the method
      component.phoneNumber(event);
      // Assert that the telephoneNumber property is set correctly
      expect(component.telephoneNumber).toEqual('(123) ');

      event.target.value = '(123) 456-789'
      component.phoneNumber(event);
      expect(component.telephoneNumber).toEqual('(123) 456-789');
    });

    /*set operatorData when saveBtnValue    */

    // it('should set operatorData when saveBtnValue is true', () => {
    //   component.saveBtnValue = true;
    //   component.operatorData = {};
    //   spyOn(component, 'setoperatorData');
    //   fixture.detectChanges();
    //   expect(component.setoperatorData).toHaveBeenCalledWith(component.operatorData);
    // });

    // it('should set operatorData and disable the form when saveBtnValue is false', () => {
    //   component.saveBtnValue = false;
    //   component.operatorData = {};
    //   spyOn(component.addOperatorProfile, 'disable');
    //   spyOn(component, 'setoperatorData');
    //   fixture.detectChanges();
    //   expect(component.setoperatorData).toHaveBeenCalledWith(component.operatorData);
    //   expect(component.addOperatorProfile.disable).toHaveBeenCalled();
    // });

    it('should not set operatorData when it is undefined or null or empty string', () => {
      component.saveBtnValue = true;
      component.operatorData = undefined;
       spyOn(component, 'setoperatorData');
      fixture.detectChanges();
      expect(component.setoperatorData).not.toHaveBeenCalled();

      component.operatorData = null;
      fixture.detectChanges();
      expect(component.setoperatorData).not.toHaveBeenCalled();

      component.operatorData = '';
      fixture.detectChanges();
      expect(component.setoperatorData).not.toHaveBeenCalled();
    });
/* call getSelected and update the stateList */
    it('should call getSelected and update the stateList', () => {
      spyOn(adminService, 'getListApi').and.returnValue(of({ data: [{ id: 1, name: 'state1' }, { id: 2, name: 'state2' }] }));
      component.getSelected({ value: '1' }, 'state');
      expect(adminService.getListApi).toHaveBeenCalledWith('state', 1);
      expect(component.stateList).toEqual([{ id: 1, name: 'state1' }, { id: 2, name: 'state2' }]);
  });

//   it('should set operatorData when saveBtnValue is false and operatorData is defined, not null and not empty', () => {
//     component.saveBtnValue = false;
//     component.setoperatorData(operatorData);
//     expect(component.operatorData).toEqual(operatorData);
// });

// it('should not set operatorData when saveBtnValue is true', () => {
//     component.saveBtnValue = true;
//     component.setoperatorData(operatorData);
//     expect(component.operatorData).toBeUndefined();
// });

// it('should not set operatorData when operatorData is undefined', () => {
//     component.saveBtnValue = false;
//     component.setoperatorData(undefined);
//     expect(component.operatorData).toBeUndefined();
// });

// it('should not set operatorData when operatorData is null', () => {
//     component.saveBtnValue = false;
//     component.setoperatorData(null);
//     expect(component.operatorData).toBeNull();
// });

// it('should not set operatorData when operatorData is empty', () => {
//     component.saveBtnValue = false;
//     component.setoperatorData('');
//     expect(component.operatorData).toEqual('');
// });



  // it('should call setoperatorData and disable addOperatorProfile', () => {
  //   component.operatorData = { /* mock data */ };
  //   component.saveBtnValue = false;
  //   component.setoperatorData(component.operatorData);
  //   expect(spy).toHaveBeenCalledWith(component.operatorData);
  //   expect(component.addOperatorProfile.disable).toHaveBeenCalled();
  // });

    // it('should set the data correctly', () => {
    //   const data = { id: 1 };
    //   const res = { data: {
    //         adminName: 'test',
    //         emailId: 'test@test.com',
    //         phoneNumber: '1234567890',
    //         addressLine1: 'test',
    //         addressLine2: 'test',
    //         countryID: 1,
    //         stateID: 1,
    //         cityName: 'test',
    //         zipcode: '123456',
    //         locationsId: [1,2,3]
    //       }
    //   };
    //   spyOn(adminService, 'getListApi').and.returnValue(of(res));
    //   component.setoperatorData(data);
    //   expect(component.editId).toBe(1);
    //   expect(component.adminRowData).toEqual(res.data);
    //   expect(component.countryId).toBe(1);
    //   expect(component.stateId).toBe(1);
    //   expect(component.cityId).toBe(1);
    //   expect(component.getSelected).toHaveBeenCalled();
    //   expect(component.addOperatorProfile.value).toEqual({
    //         username: 'test',
    //         emailid: 'test@test.com',
    //         phonenumber: '1234567890',
    //         addressLine1: 'test',
    //         addressLine2: 'test',
    //         country: '1',
    //         state: '1',
    //         cityName: 'test',
    //         zipcode: '123456',
    //         locationIds: [1,2,3]
    //       });
    // });
    // it('should add a dash to the telephone number if it has a length of 9', () => {
    //   const event={
    //     value:'123456789'
    //   }
    //   component.telephoneNumber = '123456789';
    //   component.phoneNumber(event);
    //   expect(component.telephoneNumber).toBe('123-456-789');
    // });

    // it('should not add a dash to the telephone number if it has a length not equal to 9', () => {
    //   const event={
    //     value:'123456789'
    //   }
    //   component.telephoneNumber = '12345678';
    //   component.phoneNumber(event);
    //   expect(component.telephoneNumber).toBe('12345678');
    // });



  })


