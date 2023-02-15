import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  inject,
  tick,
} from '@angular/core/testing';

import { ManageCustomersComponent } from './manage-customers.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SuperAdminService } from '../super-admin.service';
import { MatTableModule } from '@angular/material/table';
import { NavigationEnd  } from '@angular/router';
import { By } from '@angular/platform-browser';
import { AddCustomersComponent } from './add-customers/add-customers.component';
import { Observable, from, of } from 'rxjs';
import { CdkTableModule } from '@angular/cdk/table';
import { BidiModule } from '@angular/cdk/bidi';
import { _MatTableDataSource } from '@angular/material/table';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StorageService } from 'src/app/service/storage.service';
// import { routes } from 'src/app/app-routing.module';
describe('ManageCustomersComponent', () => {
  let applyFilter: any;
  let router: Router;
  let de: DebugElement;
  let component: ManageCustomersComponent;
  let fixture: ComponentFixture<ManageCustomersComponent>;
  let superAdminService: SuperAdminService;
   let storageService: StorageService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        MatTableModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        CdkTableModule,
        MatFormFieldModule,
        FormsModule,
      ],
      declarations: [ManageCustomersComponent],
      providers: [SuperAdminService, StorageService],
    }).compileComponents();
    router=TestBed.inject(Router);
    // router = jasmine.createSpyObj('_router', ['navigate']);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCustomersComponent)
    component = fixture.componentInstance
    fixture.autoDetectChanges()
    storageService=TestBed.get(StorageService)
    de = fixture.debugElement
  })

  it('should create customer component', () => {
    expect(component).toBeTruthy()
  })

  it('should call getAllUsers method on init', () => {
    const componentSpy = spyOn(component, 'GetAllCustomer').and.callThrough()

    expect(componentSpy).not.toHaveBeenCalled()
    component.ngOnInit()
    expect(componentSpy).toHaveBeenCalledTimes(1)
  })

  it('should have page size 10', async () => {
    component.ngOnInit()
    expect(component.pageSize).toEqual(10)
  })
  it('should have page size Options', async () => {
    component.ngOnInit()
    expect(component.pageSizeOptions).toEqual([10, 20, 100])
  })
  it('should have current page number', async () => {
    component.ngOnInit()
    expect(component.currentPage).toEqual(1)
  })
  it('should have All Customer List', async () => {
    component.ngOnInit()
    expect(component.allCustomerlist).toEqual([])
  })

  it('should have Header data ', async () => {
    let mockDisplayedColumns = [
      'OrganisationName',
      'OrganisationId',
      'PointOfContact',
      'CustomerEmail',
      'PhoneNumber',
      'Status',
      'NumberOfEvChargers',
      'Assets',
      'User',
      'action',
    ]

    expect(component.displayedColumns).toEqual(mockDisplayedColumns)
  })

  it('should populate datasource', () => {
    expect(component.dataSource).not.toBeNull()
  })

  it('#GetAllCustomer  GET ALL CUSTOMER', () => {
    component.GetAllCustomer()
    const service = fixture.debugElement.injector.get(SuperAdminService)
    spyOn(service, 'GetAllCustomer').and.callFake(() => {
      return of([
        {
          data: [
            {
              addressLine1: 'SN-121',
              addressLine2: '',
              assets: 165,
              cityName: 'sdadsad',
              countryID: 1,
              countryName: 'United States',
              description: '',
              email: 'Rehan@gmail.com',
              id: 88,
              isActive: true,
              modifiedOn: '2023-01-05T14:19:39.9832855',
              noofevcharger: 23,
              phoneNumber: '(989) 898-9898',
              pointofcontact: 'sadasd',
              stateID: 33,
              stateName: 'Arizona',
              userName: 'Rehan',
              users: 26,
              zipCode: '212133',
            },
          ],
        },
      ]);
    });
  });

  it(`should have as title 'Add Organization'`, () => {
    const fixture = TestBed.createComponent(AddCustomersComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Add Organization');
  });

  it('should have as customer list equal to array', async () => {
    component.ngOnInit();
    expect(component.customerList).toEqual([]);
  });

  it('should have as OrganisationName string', async () => {
    component.ngOnInit();
    expect(component.OrganisationName).toEqual('');
  });

  // it('should have as OrganisationName ', async () => {

  //    component.ngAfterViewInit();
  //    expect(component.itemsPerPageLabel).toEqual('customerData');
  //   // console.log(component._storageService.removeSessionData,'HHIIIII');

  // });

  it('should be status data value undefined.', () => {
    expect(component.statusDataValue).toBeUndefined();
  });
  it('should be status data  undefined.', () => {
    expect(component.statusData).toBeUndefined();
  });
  it('should be  total page undefined.', () => {
    expect(component.totalPages).toBeUndefined();
  });
  it('should be isTableHasData undefined.', () => {
    expect(component.isTableHasData).toBeUndefined();
  });

  it('should be showCustomersList true.', () => {
    expect(component.showCustomersList).toEqual(true);
  });
  it('should be showAddCustomer false.', () => {
    expect(component.showAddCustomer).toEqual(false);
  });
  it('should be current Page 1.', () => {
    expect(component.currentPage).toEqual(1);
  });

  /**Cancel navigation button working  */

  it('should navigate to superadmin/customer when click on addOrganization', () => {
    spyOn(router, 'navigate');
    component.addOrganization();
    expect(router.navigate).toHaveBeenCalledWith(['superadmin/customer/create-customer']);
  });

  /**call GetAllCustomer method for filter customers */
  it('should call GetAllCustomer method', fakeAsync(() => {
    component = fixture.componentInstance;
    spyOn(component, 'GetAllCustomer');
    fixture.detectChanges();
    const fakeEvent = new Event('input');
    component.inputValue = {nativeElement: {value: 'test'}}
    component.applyFilter(fakeEvent);
    tick();
    expect(component.GetAllCustomer).toHaveBeenCalled();
  }));
  /** navigate to the correct URL when viewCustomer is called*/

  //  it('should navigate to the correct URL when viewCustomer is called', () => {
  //    component.viewCustomer(123);
  //    expect(router.url).toBe('superadmin/customer/edit-customer?id=123');
  //  });

  // it('should navigate to the correct URL when editCustomer is called', (done) => {
  //   router.navigateByUrl('').then(() => {
  //       component.editCusotmer(123);
  //       router.events.subscribe((event) => {
  //           if (event instanceof NavigationEnd) {
  //               expect(router.url).toBe('/superadmin/customer/edit-customer?id=123');
  //               done();
  //           }
  //       });
  //   });
  // });

/** navigate to the correct URL when editCustomer is called*/
  // it('should navigate to the correct URL when editCustomer is called', () => {

  //   component.editCusotmer(123);
  //   expect(router.url).toBe('superadmin/customer/edit-customer?id=123');
  // });

  // it('should remove customerData and IsSaveBtn from session storage', () => {
  //   spyOn(storageService, 'getSessionData').and.returnValue({'customerData': { name: 'John Doe' },'IsSaveBtn': true});
  //   spyOn(storageService, 'removeSessionData');

  //   component.ngOnInit();

  //   expect(storageService.getSessionData).toHaveBeenCalledWith('customerData');
  //   expect(storageService.getSessionData).toHaveBeenCalledWith('IsSaveBtn');
  //   expect(storageService.removeSessionData).toHaveBeenCalledWith('customerData');
  //   expect(storageService.removeSessionData).toHaveBeenCalledWith('IsSaveBtn');
  // });

  // it('should not remove customerData and IsSaveBtn from session storage if customerData does not exist', () => {
  //   spyOn(storageService, 'getSessionData').and.returnValue(null);
  //   spyOn(storageService, 'removeSessionData');

  //   component.ngOnInit();

  //   expect(storageService.getSessionData).toHaveBeenCalledWith('customerData');
  //   expect(storageService.getSessionData).toHaveBeenCalledWith('IsSaveBtn');
  //   expect(storageService.removeSessionData).not.toHaveBeenCalled();
  // });
});
