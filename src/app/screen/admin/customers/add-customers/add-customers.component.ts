import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../admin.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-add-customers',
  templateUrl: './add-customers.component.html',
  styleUrls: ['./add-customers.component.scss']
})
export class AddCustomersComponent {

  showAddCustomer: boolean | undefined
  showCustomersList: boolean | undefined
  title: string = 'Add Customer'
  data: any
  UserId: string | null
  customersId: any
  isSaveBtn: boolean = true
  isUpdateBtn: boolean = false
  countryList: any
  selectedCountryId: any
  selectedTimeZoneId: any
  selectedStateId: any
  countryId = 0
  stateId = 0
  cityId = 0
  cityList: any
  selectedCityId: any
  submitted: any
  showLoader: boolean = false
  CountryList: any
  TimeZoneList: any
  StateList: any
  telephoneNumber: string = ''

  constructor(
    private readonly fb: FormBuilder,
    public readonly router: Router,
    private readonly toastr: ToastrService,
    private readonly adminService: AdminService,
    private readonly storageService: StorageService,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.UserId = this.storageService.getLocalData('user_id')
    this.customersId = this.activatedRoute.snapshot.queryParams['id']
    let routePath = this.activatedRoute.snapshot.routeConfig?.path

    if (this.customersId && routePath != 'view-customer') {
      this.title = 'Edit Organization'
      this.isUpdateBtn = true
      this.isSaveBtn = false
    }
  }
  /**
   * Form group
   */
  addCustomerProfile = this.fb.group({
    userName: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
    ]),
    notes: new FormControl('', Validators.maxLength(255)),
    pointofcontact: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
    ]),
    email: new FormControl('', [
    Validators.required,
    Validators.email
  ]),
    phoneNumber: new FormControl('', Validators.required),
    timeZone: new FormControl('', Validators.required),
    addressLine1: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
    ]),
    addressLine2: new FormControl('', [Validators.maxLength(255)]),
    zipCode: new FormControl('', [Validators.required]),
    country: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    cityName: new FormControl('', Validators.required),
  })

  ngOnInit() {
    if (this.customersId) {
      this.LoadCustomerbyID(this.customersId)
    }
    this.LoadCountries()
    this.LoadTimeZones();
  }
  /**
   *  Patch data for edit fuction
   */
  LoadCustomerbyID(id: number) {
    this.adminService.Getcustomer(id).subscribe((res: any) => {
      this.data = res.data[0]

      this.addCustomerProfile.patchValue({
        userName: this.data.userName,
      })
      this.addCustomerProfile.patchValue({
        notes: this.data.description,
      })
      this.addCustomerProfile.patchValue({
        pointofcontact: this.data.pointofcontact,
      })
      this.addCustomerProfile.patchValue({
        ponitOfContact: this.data.ponitOfContact,
      })
      this.addCustomerProfile.patchValue({ email: this.data.email })
      this.addCustomerProfile.patchValue({
        phoneNumber: this.data.phoneNumber,
      })
      this.addCustomerProfile.patchValue({
        addressLine1: this.data.addressLine1,
      })

      this.addCustomerProfile.patchValue({
        addressLine2: this.data.addressLine2,
      })

      this.addCustomerProfile.patchValue({
        zipCode: this.data.zipCode,
      })

      if (this.data.countryName) {
        this.selectedCountryId = this.data.countryID

        this.addCustomerProfile.patchValue({
          country: this.data.countryName,
        })
      }
      if (this.data.timeZoneText) {
        this.selectedTimeZoneId = this.data.timeZoneID

        this.addCustomerProfile.patchValue({
          timeZone: this.data.timeZoneText,
        })
      }

      if (this.data.stateName) {
        this.selectedStateId = this.data.stateID
        this.addCustomerProfile.patchValue({
          state: this.data.stateName,
        })
        this.LoadStatesByCountry(this.selectedCountryId)
      }
      this.addCustomerProfile.patchValue({
        cityName: this.data.cityName,
      })
    })
  }
  /**
   * Update Customer Profile
   */
 ModifyCustomer() {
  this.submitted = true;

  if (this.addCustomerProfile.invalid) {
    this.toastr.error('Please fill mandatory fields.');
    return;
  }

  const formData = this.addCustomerProfile.value;
  const body = {
    id: this.customersId,
    userName: formData.userName,
    email: formData.email,
    notes: formData.notes,
    phoneNumber: formData.phoneNumber,
    pointofcontact: formData.pointofcontact,
    addressLine1: formData.addressLine1,
    addressLine2: formData.addressLine2,
    zipCode: formData.zipCode,
    countryID: this.selectedCountryId,
    stateID: this.selectedStateId,
    cityName: formData.cityName,
    timeZoneID: this.selectedTimeZoneId,
    modifiedBy: this.UserId,
  };

  Swal.fire({
    title: '<strong>Are you sure you want to confirm?</strong>',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: '<span style="color:#0062A6">CONFIRM</span>',
    cancelButtonText: '<span style="color:#fff">CANCEL</span>',
    confirmButtonColor: '#E6E8E9',
    cancelButtonColor: '#0062A6',
    focusConfirm: false,
  }).then((result) => {
    if (result.isConfirmed) {
      this.updateCustomer(body);
    }
  });
}

private updateCustomer(body: any) {
  this.showLoader = true;

  this.adminService.ModifyCustomer(body).subscribe({
    next: (data) => {
      this.toastr.success('Record updated successfully.');
      this.addCustomerProfile.reset();
      this.submitted = false;
      this.showLoader = false;
      this.router.navigate(['admin/profile']);
    },
    error: (error) => {
      this.showLoader = false;
      const errorMsg = error?.error?.errors || 'An error occurred.';
      this.toastr.error(JSON.stringify(errorMsg));
    },
  });
}
  /**
   * Omit special character
   * @param event
   * @returns
   */
  omit_special_char(event: any) {
    let k = event.charCode //         k = event.keyCode;  (Both can be used)
    return (
      (k > 64 && k < 91) ||
      (k > 96 && k < 123) ||
      k == 8 ||
      k == 32 ||
      (k >= 48 && k <= 57)
    )
  }

  /**
   * Number only
   * @param event
   * @returns
   */
  numberOnly(event: any): boolean {
    const charCode = event.which ?? event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false
    }
    return true
  }

  LoadCountries() {
    this.adminService.getListApi('',0,0).subscribe((res: any) => {
      this.CountryList = res.data
    })
  }

  LoadTimeZones(){
    this.adminService.TimeZoneList().subscribe((res: any) => {
      this.TimeZoneList = res.data
    })
  }

  LoadStatesByCountry(id: any){
    this.adminService.getListApi('state',id,0).subscribe((res: any) => {
      this.StateList = res.data
    })
  }

  /**
   * Select Country
   * @param event
   * @returns
   */
  setCountry(event: any, id: any) {
    if (event.isUserInput) {
      if (this.selectedStateId && this.selectedCityId) {
        this.addCustomerProfile.patchValue({ state: '' })
      }
      this.selectedCountryId = id
      this.LoadStatesByCountry(this.selectedCountryId)
    }
  }

  setTimeZone(event: any, zoneId: any) {
    if (event.isUserInput) {
        this.selectedTimeZoneId = zoneId
  }
}

  /**
   * Select State
   * @param event
   * @returns
   */
  setState(event: any, id: any) {
    if (event.isUserInput) {
      this.selectedStateId = id
    }
  }

  /**
   * Phone number validations
   * @param event
   * @returns
   */
  phoneNumber(event: any) {
    const charCode = event.which ?? event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return
    }
    let filterValue = (event.target as HTMLInputElement).value
    this.telephoneNumber = filterValue
    if (this.telephoneNumber.length == 3) {
      this.telephoneNumber = '(' + this.telephoneNumber + ')' + ' '
    }
    if (this.telephoneNumber.length == 9) {
      this.telephoneNumber = this.telephoneNumber + '-'
    }
  }
/**
 * Cancel function
 */
  redirect(){
    this.router.navigate(['admin/profile']);
  }
}