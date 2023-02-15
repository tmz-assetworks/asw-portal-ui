import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ManageVehiclesComponent } from './manage-vehicles.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router'
import { AdminService } from '../admin.service';
import { of } from 'rxjs';
describe('ManageVehiclesComponent', () => {
  let component: ManageVehiclesComponent;
  let fixture: ComponentFixture<ManageVehiclesComponent>;
  let router: Router;
  let toastr: ToastrService;
  let service: AdminService;
  let spy: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientTestingModule,ToastrModule.forRoot(),MatPaginatorModule,BrowserAnimationsModule],
      declarations: [ ManageVehiclesComponent ]
    })
    .compileComponents();
    service = TestBed.get(AdminService);
    toastr = TestBed.get(ToastrService);
    router=TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   /**call getUserList method for filter customers */
  //  it('should call GetAllCustomer method', fakeAsync(() => {
  //   component = fixture.componentInstance;
  //   spyOn(component, 'getVehicleList');
  //   fixture.detectChanges();
  //   const fakeEvent = new Event('input');
  //   component.inputValue = {nativeElement: {value: 'test'}}
  //   component.filterVehicle(fakeEvent);
  //   tick();
  //   expect(component.getVehicleList).toHaveBeenCalled();
  // }));

  it('should change the current page and page size when pageSize is different', () => {
    // Create an event object with a pageSize of 10
    const event = new CustomEvent('pageChange', { detail: { pageSize: 10 } });
    spyOn(component, 'getVehicleList').and.callThrough();

    // Call the pageChange method
    component.pageChange(event);
  console.log(event.detail.pageSize);

    // Assert that currentPage is 1 and pageSize is 10
    expect(component.currentPage).toEqual(1);
    expect(event.detail.pageSize).toEqual(10);
    expect(component.getVehicleList).toHaveBeenCalled();
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
    spyOn(component, 'getVehicleList').and.callThrough();
    // Call the pageChange method
    component.pageChange(event);

    // Assert that currentPage is 1 and pageSize is 10
    expect(component.currentPage).toEqual(1);
    expect(event.detail.pageSize).toEqual(10);
    expect(component.getVehicleList).toHaveBeenCalled();
  });

  it('should navigate to the correct URL when viewVehicle is called', () => {
    const data = { id: '1' };
    spyOn(router, 'navigateByUrl');
    component.viewVehicle(1);
    expect(router.navigateByUrl).toHaveBeenCalledWith(`admin/vehicles/view-vehicle?id=${data.id}`);
  });

  it('should navigate to the correct URL when editVehicle is called', () => {
    const data = { id: '1' };
    spyOn(router, 'navigateByUrl');
    component.editVehicle(1);
    expect(router.navigateByUrl).toHaveBeenCalledWith(`admin/vehicles/edit-vehicle?id=${data.id}`);
  });
    /*  change the status of a subscription plan     */
    it('should not change the status of a subscription plan', () => {
      spy = spyOn(service, 'IsActiveVehicleById').and.returnValue(of(true));
      spyOn(toastr, 'success');

      const id = 1;
      const status = false;

     // const component = new ManageSubscriptionsComponent();
      component.IsActiveVehicleById(id, status);

      expect(spy).toHaveBeenCalled();
      expect(toastr.success).toHaveBeenCalledWith('Record inactive successfully');
    });
    it('should change the status of a subscription plan', () => {
      spy = spyOn(service, 'IsActiveVehicleById').and.returnValue(of(true));
      spyOn(toastr, 'success');

      const id = 1;
      const status = true;

     // const component = new ManageSubscriptionsComponent();
      component.IsActiveVehicleById(id, status);

      expect(spy).toHaveBeenCalled();
      expect(toastr.success).toHaveBeenCalledWith('Record active successfully');
    });

    it('should not change the status of a subscription plan', () => {
      spy = spyOn(service, 'IsActiveVehicleById').and.returnValue(of(false));
      spyOn(toastr, 'success');

      const id = 1;
      const status = false;

      //const component = new YourComponent();
      component.IsActiveVehicleById(id, status);

      expect(spy).toHaveBeenCalled();
      expect(toastr.success).not.toHaveBeenCalled();
      //expect(toastr.success).toHaveBeenCalledWith('Record inactive successfully');
    });
});
