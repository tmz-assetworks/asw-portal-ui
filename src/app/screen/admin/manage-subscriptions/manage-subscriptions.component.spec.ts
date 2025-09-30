import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing'
import { MatPaginatorModule } from '@angular/material/paginator'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { ToastrModule, ToastrService } from 'ngx-toastr'
import { ManageSubscriptionsComponent } from './manage-subscriptions.component'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'
import { AdminService } from '../admin.service'
import {  of } from 'rxjs'
import { async } from 'rxjs'
import { Router } from '@angular/router'
describe('ManageSubscriptionsComponent', () => {
  let component: ManageSubscriptionsComponent
  let fixture: ComponentFixture<ManageSubscriptionsComponent>
  let service: AdminService;
  let toastr: ToastrService;
  let spy: any;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        MatPaginatorModule,
        BrowserAnimationsModule,
      ],
      declarations: [ManageSubscriptionsComponent],
    }).compileComponents()
    service = TestBed.inject(AdminService);
    toastr = TestBed.inject(ToastrService);
    router=TestBed.inject(Router);
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSubscriptionsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should have Header data ', async () => {
    let mockDisplayedColumns = [
      'CustomerName',
      'SubscriptionPlanName',
      'Currency',
      'ValidFrom',
      'ValidTo',
      'Status',
      'Action',
    ]

    expect(component.displayedColumns).toEqual(mockDisplayedColumns)
  })

  /*page Change function test case */
  it('should change the current page and page size when pageSize is different', () => {
    // Create an event object with a pageSize of 10
    const event = new CustomEvent('pageChange', { detail: { pageSize: 10 } });
    spyOn(component, 'GetSubscriptionPlanList').and.callThrough();

    // Call the pageChange method
    component.pageChange(event);
  console.log(event.detail.pageSize);

    // Assert that currentPage is 1 and pageSize is 10
    expect(component.currentPage).toEqual(1);
    expect(event.detail.pageSize).toEqual(10);
    expect(component.GetSubscriptionPlanList).toHaveBeenCalled();
  });

  it('should change the current page when pageIndex is different', () => {
    // Create an event object with a pageIndex of 1
    const event = new CustomEvent('pageChange', { detail: { pageIndex: 1 } });

    // Call the pageChange method
    component.pageChange(event);

    // Assert that currentPage is 1
    expect(component.currentPage).toEqual(1);
  });

  it('should not change the current page and page size when pageSize is not different', () => {
    // Create an event object with a pageSize of 10
    const event = new CustomEvent('pageChange', { detail: { pageSize: 10, previousPageIndex: 0, pageIndex: 0 } });
    spyOn(component, 'GetSubscriptionPlanList').and.callThrough();
    // Call the pageChange method
    component.pageChange(event);

    // Assert that currentPage is 1 and pageSize is 10
    expect(component.currentPage).toEqual(1);
    expect(event.detail.pageSize).toEqual(10);
    expect(component.GetSubscriptionPlanList).toHaveBeenCalled();
  });

  /*  change the status of a subscription plan     */
  it('should not change the status of a subscription plan', () => {
    spy = spyOn(service, 'IsActiveSubscription').and.returnValue(of(true));
    spyOn(toastr, 'success');

    const id = 1;
    const status = false;

   // const component = new ManageSubscriptionsComponent();
    component.changeStatusById(id, status);

    expect(spy).toHaveBeenCalled();
    expect(toastr.success).toHaveBeenCalledWith('Record inactive successfully');
  });
  it('should change the status of a subscription plan', () => {
    spy = spyOn(service, 'IsActiveSubscription').and.returnValue(of(true));
    spyOn(toastr, 'success');

    const id = 1;
    const status = true;

   // const component = new ManageSubscriptionsComponent();
    component.changeStatusById(id, status);

    expect(spy).toHaveBeenCalled();
    expect(toastr.success).toHaveBeenCalledWith('Record active successfully');
  });

  it('should not change the status of a subscription plan', () => {
    spy = spyOn(service, 'IsActiveSubscription').and.returnValue(of(false));
    spyOn(toastr, 'success');

    const id = 1;
    const status = false;

    //const component = new YourComponent();
    component.changeStatusById(id, status);

    expect(spy).toHaveBeenCalled();
    expect(toastr.success).not.toHaveBeenCalled();
    //expect(toastr.success).toHaveBeenCalledWith('Record inactive successfully');
  });

  /* adminService.IsActiveSubscription    */
  it('should set isTableHasData to false when data is returned', async() => {
    spyOn(service, 'GetAllSubscriptionPlan').and.returnValue(of({
      data: [{id: 1, name: 'test'}],
      paginationResponse: {
        totalCount: 1,
        totalPages: 1,
        pageSize: 1
      }
    }));

    //const component = new YourComponent(adminService);
    component.ngOnInit();

    expect(component.isTableHasData).toBeFalsy();
    expect(component.dataSource.data.length).toBeGreaterThan(0);
  });

  it('should set isTableHasData to true when no data is returned', async () => {
    spyOn(service, 'GetAllSubscriptionPlan').and.returnValue(of({
      data: [],
      paginationResponse: {
        totalCount: 0,
        totalPages: 0,
        pageSize: 0
      }
    }));

   // const component = new YourComponent(adminService);
    component.ngOnInit();

    expect(component.isTableHasData).toBeTruthy();
    expect(component.dataSource.data.length).toEqual(0);
  });

  it('should navigate to the correct URL when viewSubscriptionPan is called', () => {
    const data = { id: '123' };
    spyOn(router, 'navigateByUrl');
    component.viewSubscriptionPan(data);
    expect(router.navigateByUrl).toHaveBeenCalledWith(`admin/subscriptions-plans/view-subscription?id=${data.id}`);
  });

  it('should navigate to the correct URL when viewSubscriptionPan is called', () => {
    const data = { id: '123' };
    spyOn(router, 'navigateByUrl');
    component.editSubscriptionPan(data);
    expect(router.navigateByUrl).toHaveBeenCalledWith(`admin/subscriptions-plans/edit-subscription?id=${data.id}`);
  });
  // it('should call the `GetSubscriptionPlanList` method when input value changes', () => {

  //   spyOn(component, 'GetSubscriptionPlanList');
  //   let inputEl: DebugElement;
  //   fixture.detectChanges();
  //   inputEl.triggerEventHandler('input', { target: { value: 'test' } });
  //   expect(component.GetSubscriptionPlanList).toHaveBeenCalled();
  // });


})
