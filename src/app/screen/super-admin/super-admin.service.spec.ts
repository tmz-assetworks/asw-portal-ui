import { of } from 'rxjs';
import { SuperAdminService } from './super-admin.service';

describe('SuperAdminService', () => {
  let superAdminService: SuperAdminService;
  let mockHttpClient: any;

  beforeEach(function () {
    superAdminService = new SuperAdminService(mockHttpClient);
  });
  it('should return country data', () => {
    let mockResponse = [
      { id: 1, countryId: 1, stateName: 'Alabama' },
      { id: 3, countryId: 1, stateName: 'Alaska' },
      { id: 32, countryId: 1, stateName: 'American Samoa' },
      { id: 33, countryId: 1, stateName: 'Arizona' },
      { id: 34, countryId: 1, stateName: 'Arkansas' },
    ];
    let response: any;
    spyOn(superAdminService, 'getAllCountry').and.returnValue(of(mockResponse));
    superAdminService.getAllCountry().subscribe((res) => {
      response = res;
    });
    expect(response).toEqual(mockResponse);
  });
  it('should update customer', () => {
    let mockResponse = [
      {
        addressLine1: 'AB-2/D',
        addressLine2: '',
        cityName: 'torranto',
        countryID: 6,
        email: 'niki@gmail.com',
        id: '87',
        modifiedBy: '585b7797-79b0-4f25-a0a6-8d412a8102a6',
        notes: 'asaddasdadas',
        phoneNumber: '(121) 212-1212',
        pointofcontact: 'nikhil',
        stateID: 96,
        userName: 'tekMindz',
        zipCode: '2323233',
      },
    ];
    let response: any;
    spyOn(superAdminService, 'UpdateCustomer').and.returnValue(
      of(mockResponse)
    );
    superAdminService.UpdateCustomer(3).subscribe((res) => {
      response = res;
    });



    expect(response).toEqual(mockResponse);
  });
  it('should  have customer by id', () => {
    let mockResponse = [
      {
        addressLine1: 'AB-2/D',
        addressLine2: '',
        cityName: 'torranto',
        countryID: 6,
        email: 'niki@gmail.com',
        id: '87',
        modifiedBy: '585b7797-79b0-4f25-a0a6-8d412a8102a6',
        notes: 'asaddasdadas',
        phoneNumber: '(121) 212-1212',
        pointofcontact: 'nikhil',
        stateID: 96,
        userName: 'tekMindz',
        zipCode: '2323233',
      },
    ];
    let response: any;
    spyOn(superAdminService, 'GetCustomerbyID').and.returnValue(
      of(mockResponse)
    );
    superAdminService.GetCustomerbyID(2).subscribe((res) => {
      response = res;
    });
    expect(response).toEqual(mockResponse);
  });
  it('should  have create Customer', () => {
    let mockResponse = [
      {
        addressLine1: 'AB-2/D',
        addressLine2: '',
        cityName: 'torranto',
        countryID: 6,
        email: 'niki@gmail.com',
        id: '87',
        modifiedBy: '585b7797-79b0-4f25-a0a6-8d412a8102a6',
        notes: 'asaddasdadas',
        phoneNumber: '(121) 212-1212',
        pointofcontact: 'nikhil',
        stateID: 96,
        userName: 'tekMindz',
        zipCode: '2323233',
      },
    ];
    let response: any;
    spyOn(superAdminService, 'CreateCustomer').and.returnValue(
      of(mockResponse)
    );
    superAdminService.CreateCustomer(1).subscribe((res) => {
      response = res;
    });

    expect(response).toEqual(mockResponse);
  });
  it('should return all customer list', () => {
    let mockResponse = [
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
        noofevcharger: 22,
        phoneNumber: '(989) 898-9898',
        pointofcontact: 'sadasd',
        stateID: 33,
        stateName: 'Arizona',
        userName: 'Rehan',
        users: 26,
        zipCode: '212133',
      },
      {
        addressLine1: 'AB-2/D',
        addressLine2: '',
        assets: 165,
        cityName: 'torranto',
        countryID: 6,
        countryName: 'Canada',
        description: 'asaddasdadas',
        email: 'niki@gmail.com',
        id: 87,
        isActive: false,
        modifiedOn: '2023-01-05T13:55:22.7572477',
        noofevcharger: 22,
        phoneNumber: '(121) 212-1212',
        pointofcontact: 'nikhil',
        stateID: 96,
        stateName: 'New Brunswick',
        userName: 'tekMindz',
        users: 26,
        zipCode: '2323233',
      },
      {
        addressLine1: 'test',
        addressLine2: 'test',
        assets: 165,
        cityName: 'ala',
        countryID: 1,
        countryName: 'United States',
        description: 'final test',
        email: 'testfinal@dispostable.com',
        id: 86,
        isActive: true,
        modifiedOn: '2022-12-26T05:57:48.3201746',
        noofevcharger: 22,
        phoneNumber: '(775) 623-2343',
        pointofcontact: 'adminTest',
        stateID: 3,
        stateName: 'Alaska',
        userName: 'TestFinal',
        users: 26,
        zipCode: '43234',
      },
    ];
    let response: any;
    spyOn(superAdminService, 'GetAllCustomer').and.returnValue(
      of(mockResponse)
    );
    superAdminService
      .GetAllCustomer(1)
      .subscribe((res) => {
        response = res;
      });

    expect(response).toEqual(mockResponse);
  });

  it('should return Pagination data', () => {
    let mockResponse = [
      {
        currentPage: 1,
        hasNext: false,
        hasPrevious: false,
        pageSize: 10,
        totalCount: 5,
        totalPages: 1,
      },
    ];
    let response: any;
    spyOn(superAdminService, 'GetAllCustomer').and.returnValue(
      of(mockResponse)
    );
    superAdminService.GetAllCustomer(0).subscribe((res) => {
      response = res;
    });
    expect(response).toEqual(mockResponse);
  });

  it('should return Status data', () => {
    let mockResponse = [
      {
        color: '#E97300',
        key: 'Total Organizations',
        value: '5',
      },
      {
        color: '#90993F',
        key: 'Active',
        value: '2',
      },
      {
        color: '#757575',
        key: 'Inactive',
        value: '3',
      },
    ];
    let response: any;
    spyOn(superAdminService, 'GetAllCustomer').and.returnValue(
      of(mockResponse)
    );
    superAdminService.GetAllCustomer(1).subscribe((res) => {
      response = res;
    });
    expect(response).toEqual(mockResponse);
  });


  it('should return  user data Status data', () => {
    let mockResponse = [
      {
        color: '#E97300',
        key: 'Total Organizations',
        value: '5',
      },
      {
        color: '#90993F',
        key: 'Active',
        value: '2',
      },
      {
        color: '#757575',
        key: 'Inactive',
        value: '3',
      },
    ];
    let response: any;
    spyOn(superAdminService, 'GetAllUsers').and.returnValue(
      of(mockResponse)
    );
    superAdminService.GetAllUsers(1).subscribe((res) => {
      response = res;
    });
    expect(response).toEqual(mockResponse);
  });

  it('should return get all users', () => {
    let mockResponse = [
      {
        addressLine1: 'S-16/b',
        addressLine2: '',
        adminName: 'Nik',
        cityName: 'saddsdsdas',
        countryID: 6,
        countryName: 'Canada',
        createdBy: null,
        createdOn: '0001-01-01T00:00:00',
        customerID: 1,
        customername: 'TekMindz',
        emailId: 'nik@gmail.com',
        id: 26,
        isActive: true,
        locationsId: null,
        locationsName: '',
        locationsNameCount: 0,
        modifiedBy: null,
        modifiedOn: '2022-12-26T12:23:14.5164171',
        phoneNumber: '(434) 343-4343',
        stateID: 120,
        stateName: 'Manitoba',
        zipcode: null,
      },
      {
        addressLine1: 'Noida',
        addressLine2: 'NA',
        adminName: 'testadmina',
        cityName: 'Noida',
        countryID: 1,
        countryName: 'United States',
        createdBy: null,
        createdOn: '0001-01-01T00:00:00',
        customerID: 1,
        customername: 'TekMindz',
        emailId: 'test12345@gmail.com',
        id: 8,
        isActive: true,
        locationsId: null,
        locationsName: 'Philadelphia',
        locationsNameCount: 1,
        modifiedBy: null,
        modifiedOn: '2022-12-16T11:49:46.1563271',
        phoneNumber: '(435) 437-4658',
        stateID: 3,
        stateName: 'Alaska',
        zipcode: null,
      },
      {
        addressLine1: 'NPX Address',
        addressLine2: '',
        adminName: 'Ashu Driver',
        cityName: 'Canada',
        countryID: 6,
        countryName: 'Canada',
        createdBy: null,
        createdOn: '0001-01-01T00:00:00',
        customerID: 1,
        customername: 'TekMindz',
        emailId: 'ashuad1512@dispostable.com',
        id: 21,
        isActive: true,
        locationsId: null,
        locationsName: '',
        locationsNameCount: 0,
        modifiedBy: null,
        modifiedOn: '2022-12-15T07:15:18.5813502',
        phoneNumber: '(874) 555-5555',
        stateID: 118,
        stateName: 'Alberta',
        zipcode: null,
      },
    ];
    let response: any;
    spyOn(superAdminService, 'GetAllUsers').and.returnValue(of(mockResponse));
    superAdminService.GetAllUsers(0).subscribe((res) => {
      response = res;
    });
    expect(response).toEqual(mockResponse);
  });

  // it('should create user', () => {
  //   let mockResponse = [
  //     {


  //     },

  //   ];
  //   let response:any;
  //   spyOn(superAdminService, 'CreateUser').and.returnValue(
  //     of(mockResponse)
  //   );
  //   superAdminService.CreateUser(1).subscribe((res) => {response = res});

  //   console.log(response, 'Hi Response!');
  //   console.log(mockResponse, 'Hi mockResponse!');
  //   expect(response).toEqual(mockResponse);
  // });
});
