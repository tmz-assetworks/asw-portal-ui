import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AddCustomersComponent } from './add-customers.component'
import { ReactiveFormsModule } from '@angular/forms'
import { ToastrModule } from 'ngx-toastr'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { MatSelectModule } from '@angular/material/select'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { of } from 'rxjs'
import { SuperAdminService } from '../../super-admin.service'
import { data } from 'src/app/screen/operator/dashboard/locations'

describe('AddCustomersComponent', () => {
  let component: AddCustomersComponent
  let fixture: ComponentFixture<AddCustomersComponent>
  let router: any
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        HttpClientTestingModule,
        MatSelectModule,
        BrowserAnimationsModule,
      ],

      declarations: [AddCustomersComponent],
      providers: [SuperAdminService],
    }).compileComponents()
    router = jasmine.createSpyObj('router', ['navigate'])
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCustomersComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should call getAllCountry method on init', () => {
    const componentSpy = spyOn(component, 'getAllCountry').and.callThrough()
    expect(componentSpy).not.toHaveBeenCalled()
    component.ngOnInit()
    expect(componentSpy).toHaveBeenCalledTimes(1)
  })

  it('should call #GetCustomerbyID method on init', () => {
    const componentSpy = spyOn(component, 'GetCustomerbyID').and.callThrough()

    expect(componentSpy).not.toHaveBeenCalled()
    component.ngOnInit()
    expect(componentSpy).toHaveBeenCalledTimes(0)
  })

  it('form invalid when empty', () => {
    expect(component.addCustomerProfile.valid).toBeFalsy()
  })

  it('should be valid if form value is valid', () => {
    component.addCustomerProfile.setValue({
      userName: 'Bobby',
      email: 'bobby@bobby.com',
      notes: 'Please fill in the',
      pointofcontact: 'sassa',
      phoneNumber: 'adsas',
      addressLine1: 'sda',
      addressLine2: 'sada',
      country: 'sdsa',
      state: 'sda',
      cityName: 'asda',
      zipCode: 'sada',
    })
    expect(component.addCustomerProfile.valid).toEqual(true)
  })

  it('#GetCustomerbyID  GET ALL CUSTOMER', () => {
    component.GetCustomerbyID(1)
    const service = fixture.debugElement.injector.get(SuperAdminService)
    spyOn(service, 'GetCustomerbyID').and.callFake(() => {
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
      ])
    })
  })

  it(`should have as title 'Add Organization'`, () => {
    expect(component.title).toEqual('Add Organization')
  })

  it('should have as country Id 0', async () => {
    component.ngOnInit()
    expect(component.countryId).toEqual(0)
  })

  it('should have as state Id 0', async () => {
    component.ngOnInit()
    expect(component.stateId).toEqual(0)
  })

  it('should have as city Id 0', async () => {
    component.ngOnInit()
    expect(component.cityId).toEqual(0)
  })
})
