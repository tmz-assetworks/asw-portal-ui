import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ManageCustomersComponent } from './manage-customers.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'

import { RouterTestingModule } from '@angular/router/testing'
import { MatPaginatorModule } from '@angular/material/paginator'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SuperAdminService } from '../super-admin.service'
import { MatTableModule } from '@angular/material/table'

import { of } from 'rxjs'
import { CdkTableModule } from '@angular/cdk/table'
import { BidiModule } from '@angular/cdk/bidi'
import { _MatTableDataSource } from '@angular/material/table'
import { DebugElement } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ToastrModule } from 'ngx-toastr'
import { MatFormFieldModule } from '@angular/material/form-field'
import { StorageService } from 'src/app/service/storage.service'

describe('ManageCustomersComponent', () => {
  let de: DebugElement
  let component: ManageCustomersComponent
  let fixture: ComponentFixture<ManageCustomersComponent>

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
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCustomersComponent)
    component = fixture.componentInstance
    fixture.autoDetectChanges()
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
      ])
    })
  })

  it('should have as customer list equal to array', async () => {
    component.ngOnInit()
    expect(component.customerList).toEqual([])
  })
})
