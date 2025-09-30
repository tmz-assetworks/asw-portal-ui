import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersComponent } from './customers.component';
import { of } from 'rxjs';
import { AdminService } from '../admin.service';

describe('CustomersComponent', () => {
  //let adminService:AdminService;
  let component: CustomersComponent;
  let fixture: ComponentFixture<CustomersComponent>;
  let adminService:any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CustomersComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
   // adminService=new AdminService();
    adminService = TestBed.inject(AdminService);
  });

  it('should call getCustomerInfo() method on init', () => {
    // set up spies, could also call a fake method in case you don't want the API call to go through

    const componentSpy = spyOn(component, 'getCustomerInfo').and.callThrough()

    // make sure they haven't been called yet

    expect(componentSpy).not.toHaveBeenCalled()

    // depending on how your component is set up, fixture.detectChanges() might be enough
    component.ngOnInit()

    // expect(userServiceSpy).toHaveBeenCalledTimes(1)
    expect(componentSpy).toHaveBeenCalledTimes(1)
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call get customer method on init', () => {

    const componentSpy = spyOn(component, 'getCustomerInfo').and.callThrough();

    jasmine.createSpy('getCustomerInfo').and.callThrough();
    expect(componentSpy).not.toHaveBeenCalled();

    // depending on how your component is set up, fixture.detectChanges() might be enough
    component.ngOnInit();
    expect(componentSpy).toHaveBeenCalledTimes(1);
  });






});
