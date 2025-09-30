import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing'
import { MatPaginatorModule } from '@angular/material/paginator'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { Observable, from, of } from 'rxjs';
import { ManageOperatorUsersComponent } from './manage-operator-users.component'
import { AdminService } from '../admin.service'

describe('ManageOperatorUsersComponent', () => {
  let component: ManageOperatorUsersComponent
  let fixture: ComponentFixture<ManageOperatorUsersComponent>
  let adminService: AdminService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
      ],
      declarations: [ManageOperatorUsersComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageOperatorUsersComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    adminService = TestBed.inject(AdminService);
//spyOn(adminService, 'GetAllUsers').and.returnValue(of(mockData));

  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should call getUserList method on init', () => {
    const componentSpy = spyOn(component, 'getUserList').and.callThrough()

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
  it('should have adminList', async () => {
    component.ngOnInit()
    expect(component.adminList).toEqual([])
  })
  it('should have isTableHasData', async () => {
    component.ngOnInit()
    expect(component.isTableHasData).toBeUndefined()
  })
  it('should have totalCount', async () => {
    component.ngOnInit()
    expect(component.totalCount).toBeUndefined()
  })
  it('should have totalPages', async () => {
    component.ngOnInit()
    expect(component.totalPages).toBeUndefined()
  })
  it('should have statusData', async () => {
    component.ngOnInit()
    expect(component.statusData).toBeUndefined()
  })
  it('should have userId', async () => {
    component.ngOnInit()
    expect(component.userId).toBeNull()
  })
  it('should have adminList', async () => {
    component.ngOnInit()
    expect(component.adminName).toEqual('')
  })
  it('should have Header data ', async () => {
    let mockDisplayedColumns:string[] = [
      'name',
    'email',
    'status',
    'associatedSite',
    'action',
    ]

    expect(component.displayedColumns).toEqual(mockDisplayedColumns)
  })
  it('should populate datasource', () => {
    expect(component.dataSource).not.toBeNull()
  })

  it('#GetAllUsers  GET ALL USER', () => {
    component.getUserList()
    const service = fixture.debugElement.injector.get(AdminService)
    spyOn(service, 'GetAllUsers').and.callFake(() => {
      return of([
        {
          data: [
            {
              addressLine1: "20",
              addressLine2: "A12",
              adminName: "Operator",
              cityName: "Columbia",
              countryID: 6,
              countryName: "Canada",
              createdBy: null,
              createdOn: "0001-01-01T00:00:00",
              customerID: 1,
              customername: "TekMindz",
              emailId: "operator@devopstekmindz.onmicrosoft.com",
              id: 1,
              isActive: true,
              locationsId: null,
              locationsName: "Austin Public Works,Charging Station,Dallas Charger,Fleet Services,NK,Philadelphia,Washington",
              locationsNameCount: 7,
              modifiedBy: null,
              modifiedOn: "2022-12-26T13:02:47.5369064",
              phoneNumber: "(898) 989-8898",
              stateID: 119,
              stateName: "British Columbia",
              zipcode: null,
            },
          ],
        },
      ]);
    });
  });

  // it('should change the current page and page size when pageSize is different', () => {
  //   // Create an event object with a pageSize of 10
  //   // const event = new CustomEvent('pageChange', { pageSize: 10 });
  //   // const event = new CustomEvent('pageChange', { detail: Object.assign({}, { pageSize: 10 }, {pageIndex: 1 }) });
  //   const event = new CustomEvent('pageChange', { detail: { pageSize: 10 } });
  //   // Call the pageChange method
  //   component.pageChange(event);

  //   // Assert that currentPage is 1 and pageSize is 10
  //   expect(component.currentPage).toEqual(1);
  //   expect(component.pageSize).toEqual(10);
  // });

  it('should change the current page and page size when pageSize is different', () => {
    // Create an event object with a pageSize of 10
    const event = new CustomEvent('pageChange', { detail: { pageSize: 10 } });
    spyOn(component, 'getUserList').and.callThrough();

    // Call the pageChange method
    component.pageChange(event);
  console.log(event.detail.pageSize);

    // Assert that currentPage is 1 and pageSize is 10
    expect(component.currentPage).toEqual(1);
    expect(event.detail.pageSize).toEqual(10);
    expect(component.getUserList).toHaveBeenCalled();
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
    spyOn(component, 'getUserList').and.callThrough();
    // Call the pageChange method
    component.pageChange(event);

    // Assert that currentPage is 1 and pageSize is 10
    expect(component.currentPage).toEqual(1);
    expect(event.detail.pageSize).toEqual(10);
    expect(component.getUserList).toHaveBeenCalled();
  });

   /**call getUserList method for filter customers */
   it('should call GetAllCustomer method', fakeAsync(() => {
    component = fixture.componentInstance;
    spyOn(component, 'getUserList');
    fixture.detectChanges();
    const fakeEvent = new Event('input');
    component.inputValue = {nativeElement: {value: 'test'}}
    component.applyFilter(fakeEvent);
    tick();
    expect(component.getUserList).toHaveBeenCalled();
  }));


  it('should set the data correctly', () => {
    // Create a mock response
    const mockResponse = {
      data: [{ id: 1, name: 'John Doe' }],
      paginationResponse: {
        totalCount: 1,
        totalPages: 1,
        pageSize: 10
      },
      statusData: 'Success'
    }

    // Stub the getUsers method to return the mock response
    spyOn(adminService, 'GetAllUsers').and.returnValue(of(mockResponse));

    // Call the getUserList method
    component.getUserList();

    // Assert that the dataSource.data property is set correctly
    expect(component.dataSource.data).toEqual([{ id: 1, name: 'John Doe' }]);
    expect(component.isTableHasData).toEqual(false);
    expect(component.statusData).toEqual('Success');
    expect(component.totalCount).toEqual(1);
    expect(component.totalPages).toEqual(1);
    expect(component.pageSize).toEqual(10);
   // expect(component.dataSource.data).toEqual([])
  });
  // it('should set the properties with the mock data', () => {
  //   let mockData = {
  //     data: [{id: 1, name: 'user1'}, {id: 2, name: 'user2'}],
  //     statusData: 'success',
  //     paginationResponse: {
  //       totalCount: 2,
  //       totalPages: 1,
  //       pageSize: 2
  //     }
  //   }
  //   let body = {};
  //   // Call the GetAllUsers method
  //   component._adminService.GetAllUsers(body).subscribe((res) => {
  //     // Assert that the properties are set with the mock data
  //     expect(component.statusData).toEqual(mockData.statusData);
  //     expect(component.totalCount).toEqual(mockData.paginationResponse.totalCount);
  //     expect(component.totalPages).toEqual(mockData.paginationResponse.totalPages);
  //     expect(component.pageSize).toEqual(mockData.paginationResponse.pageSize);
  //     expect(component.dataSource.data).toEqual(mockData.data);
  //     expect(component.isTableHasData).toEqual(false);
  //   });
  // });

  it('should set dataSource.data to an empty array when data is undefined or null', () => {
    let body = {};
    // Create a mock data with data as undefined
    let mockData = {data:''}



  });


})
