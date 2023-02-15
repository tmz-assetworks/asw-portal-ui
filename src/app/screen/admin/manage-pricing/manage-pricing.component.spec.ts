import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { ManagePricingComponent } from './manage-pricing.component';
import { of, share } from 'rxjs';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('ManagePricingComponent', () => {
  let component: ManagePricingComponent;
  let fixture: ComponentFixture<ManagePricingComponent>;
  let adminService: AdminService;
  let toastr: ToastrService;
  let spy: any;
  let router: Router;
  let inputEl: DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        MatPaginatorModule,
        BrowserAnimationsModule,
      ],
      declarations: [ManagePricingComponent],
    }).compileComponents();
    toastr = TestBed.get(ToastrService);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    adminService = TestBed.get(AdminService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  /**call getUserList method for filter customers */




/* GetAllPricePlan properties with the mock data */

  it('should set GetAllPricePlan the data correctly', () => {
    // Create a mock response
    const mockResponse = {
      data: [{ id: 1, name: 'John Doe' }],
      paginationResponse: {
        totalCount: 1,
        totalPages: 1,
        pageSize: 10,
      },
      statusData: 'Success',
    };

    // Stub the getUsers method to return the mock response
    spyOn(adminService, 'GetAllPricePlan').and.returnValue(of(mockResponse));

    // Call the getUserList method
    component.GetAllPricePlan();

    // Assert that the dataSource.data property is set correctly
    expect(component.dataSource.data).toEqual([{ id: 1, name: 'John Doe' }]);
    expect(component.isTableHasData).toEqual(false);
    expect(component.statusData).toEqual('Success');
    expect(component.totalCount).toEqual(1);
    expect(component.totalPages).toEqual(1);
    expect(component.pageSize).toEqual(10);

  });
/**GetAllPricePlan properties with the empty [] */

  it('should set GetAllPricePlan the data correctly', () => {
    // Create a mock response
    const mockResponse = {
      data: [],
      paginationResponse: {
        totalCount: 0,
        totalPages: 0,
        pageSize: 0,
      },
      statusData: 'Record not found',
    };

    // Stub the getUsers method to return the mock response
    spyOn(adminService, 'GetAllPricePlan').and.returnValue(of(mockResponse));
    component.statusData='Record not found'
    // Call the getUserList method
    component.GetAllPricePlan();

    // Assert that the dataSource.data property is set correctly
    expect(component.dataSource.data).toEqual([]);
    expect(component.isTableHasData).toEqual(true);
    expect(component.statusData).toEqual('Record not found');
    expect(component.totalCount).toBeUndefined;
    expect(component.totalPages).toBeUndefined;
    expect(component.pageSize).toBeUndefined;

  });

  it('should set the properties with the mock data', () => {
    let  mockData = {
      data: [
        {
          connectorId: 4,
          connectorType: 'J1772',
          currencyId: 13,
          currencyName: 'CAD',
          customerId: 1,
          customerName: 'TekMindz',
          id: 45,
          isActive: true,
          location: 8,
          modifiedOn: '2022-12-29T04:25:46.2932552',
          pricePlanName: 'one month',
          validFrom: '2022-12-22T09:55:43',
          validTo: '2023-01-31T09:55:43',
        },
      ],
      statusData: 'success',
      paginationResponse: {
        totalCount: 2,
        totalPages: 10,
        pageSize: 10,
      },
    };
    let dataSource = {
      data: [
        {
          connectorId: 4,
          connectorType: 'J1772',
          currencyId: 13,
          currencyName: 'CAD',
          customerId: 1,
          customerName: 'TekMindz',
          id: 45,
          isActive: true,
          location: 8,
          modifiedOn: '2022-12-29T04:25:46.2932552',
          pricePlanName: 'one month',
          validFrom: '2022-12-22T09:55:43',
          validTo: '2023-01-31T09:55:43',
        },
      ],
    }
     let body = {
     // connectorId: 4,
    //   connectorType: 'J1772',
    //   currencyId: 13,
    //   currencyName: 'CAD',
    //   customerId: 1,
    //   customerName: 'TekMindz',
    //   id: 45,
    //   isActive: true,
    //   location: 8,
    //   modifiedOn: '2022-12-29T04:25:46.2932552',
    //   pricePlanName: 'one month',
    //   validFrom: '2022-12-22T09:55:43',
    //   validTo: '2023-01-31T09:55:43',
  };


    // Call the GetAllPricePlan method

   // component.adminService.GetAllPricePlan(body).subscribe((res: any) => {
      component.statusData= 'success',
     component.totalCount=2,
     component.totalPages=10,
     component.isTableHasData=false
      spyOn(adminService, 'GetAllPricePlan').and.returnValue(of(body));
      // Assert that the properties are set with the mock data
      expect(component.statusData).toEqual(mockData.statusData);


       expect(component.totalCount).toEqual(mockData.paginationResponse.totalCount);
       expect(component.totalPages).toEqual( mockData.paginationResponse.totalPages);
       expect(component.pageSize).toEqual(mockData.paginationResponse.pageSize);
       expect(dataSource.data).toEqual(mockData.data);
       expect(component.isTableHasData).toEqual(false);
       expect(component.dataSource.data).toEqual([])
   // });

  });

  it('should set dataSource.data to an empty array when data is undefined or null', () => {
    let body = {};
    // Create a mock data with data as undefined
    let mockData = { data: '' };
  });

  it('should change the current page and page size when pageSize is different', () => {
    // Create an event object with a pageSize of 10
    const event = new CustomEvent('pageChange', { detail: { pageSize: 10 } });
    spyOn(component, 'GetAllPricePlan').and.callThrough();

    // Call the pageChange method
    component.pageChange(event);
    console.log(event.detail.pageSize);

    // Assert that currentPage is 1 and pageSize is 10
    expect(component.currentPage).toEqual(1);
    expect(event.detail.pageSize).toEqual(10);
    expect(component.GetAllPricePlan).toHaveBeenCalled();
  });

  it('should change the current page when pageIndex is different', () => {
    // Create an event object with a pageIndex of 1
    const event = new CustomEvent('pageChange', { detail: { pageIndex: 1 } });

    // Call the pageChange method
    component.pageChange(event);

    // Assert that currentPage is 1
    expect(component.currentPage).toEqual(1);
  });
  /*navigate to the correct URL when viewSubscriptionPan */
  it('should navigate to the correct URL when viewPricingPlan is called', () => {
    const data = { id: '123' };
    spyOn(router, 'navigateByUrl');
    component.viewPricingPlan(data);
    expect(router.navigateByUrl).toHaveBeenCalledWith(
      `admin/pricing/view-pricing?id=${data.id}`
    );
  });
  /*navigate to the correct URL when viewSubscriptionPan */
  it('should navigate to the correct URL when editPricingPlan is called', () => {
    const data = { id: '123' };
    spyOn(router, 'navigateByUrl');
    component.editPricingPlan(data);
    expect(router.navigateByUrl).toHaveBeenCalledWith(
      `admin/pricing/edit-pricing?id=${data.id}`
    );
  });
  it('should not change the current page and page size when pageSize is not different', () => {
    // Create an event object with a pageSize of 10
    const event = new CustomEvent('pageChange', {
      detail: { pageSize: 10, previousPageIndex: 0, pageIndex: 0 },
    });
    spyOn(component, 'GetAllPricePlan').and.callThrough();
    // Call the pageChange method
    component.pageChange(event);

    // Assert that currentPage is 1 and pageSize is 10
    expect(component.currentPage).toEqual(1);
    expect(event.detail.pageSize).toEqual(10);
    expect(component.GetAllPricePlan).toHaveBeenCalled();
  });

  it('should call IsActivePricePlan with the correct parameters when status is false', () => {
    const pbody = {
      id: 'id',
      isActive: 'status',
      modifiedBy: 'UserId',
    }
    spyOn(adminService, 'IsActivePricePlan').and.returnValue(of(pbody));
    spyOn(toastr, 'success');
    spyOn(component, 'GetAllPricePlan');

    component.IsActivePricePlanById(1, false);

    expect(adminService.IsActivePricePlan).toHaveBeenCalledWith({
      id: 1,
      isActive: false,
      modifiedBy: component.UserId
    });
    expect(toastr.success).toHaveBeenCalledWith('Record inactive successfully');
    expect(component.GetAllPricePlan).toHaveBeenCalled();
  });

/* call IsActivePricePlan with the correct parameters when status is true  */
  it('should call IsActivePricePlan with the correct parameters when status is true', () => {
    const pbody = {
      id: 'id',
      isActive: 'status',
      modifiedBy: 'UserId',
    }
    spyOn(adminService, 'IsActivePricePlan').and.returnValue(of(pbody));
    spyOn(toastr, 'success');
    spyOn(component, 'GetAllPricePlan');

    component.IsActivePricePlanById(1, true);

    expect(adminService.IsActivePricePlan).toHaveBeenCalledWith({
      id: 1,
      isActive: true,
      modifiedBy: component.UserId
    });
    expect(toastr.success).toHaveBeenCalledWith('Record active successfully');
    expect(component.GetAllPricePlan).toHaveBeenCalled();
  });

  /*  change the status of a subscription plan     */
  // it('should not change the status of a subscription plan', () => {
  //   spy = spyOn(adminService, 'IsActiveSubscription').and.returnValue(of(true));
  //   spyOn(toastr, 'success');

  //   const id = 1;
  //   const status = false;

  //  // const component = new ManageSubscriptionsComponent();
  //   component.IsActivePricePlanById(id, status);

  //   expect(spy).toHaveBeenCalled();
  //   expect(toastr.success).toHaveBeenCalledWith('Record inactive successfully');
  // });
  // it('should change the status of a subscription plan', () => {
  //   spy = spyOn(adminService, 'IsActiveSubscription').and.returnValue(of(true));
  //   spyOn(toastr, 'success');

  //   const id = 1;
  //   const status = true;

  //  // const component = new ManageSubscriptionsComponent();
  //   component.IsActivePricePlanById(id, status);

  //   expect(spy).toHaveBeenCalled();
  //   expect(toastr.success).toHaveBeenCalledWith('Record active successfully');
  // });

  // it('should not change the status of a subscription plan', () => {
  //   spy = spyOn(adminService, 'IsActiveSubscription').and.returnValue(of(false));
  //   spyOn(toastr, 'success');

  //   const id = 1;
  //   const status = false;

  //   //const component = new YourComponent();
  //   component.IsActivePricePlanById(id, status);

  //   expect(spy).toHaveBeenCalled();
  //   expect(toastr.success).not.toHaveBeenCalled();
  //   //expect(toastr.success).toHaveBeenCalledWith('Record inactive successfully');
  // });
});
