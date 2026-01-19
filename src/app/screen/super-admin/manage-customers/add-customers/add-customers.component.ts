import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators,ReactiveFormsModule } from '@angular/forms'
import { FormControl } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import Swal from 'sweetalert2'
import { ToastrService } from 'ngx-toastr'
import { SuperAdminService } from '../../super-admin.service'
import { StorageService } from 'src/app/service/storage.service'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'
import { CommonModule } from '@angular/common'
import { AuthService } from 'src/app/service/auth/auth.service'

@Component({
  selector: 'app-add-customers',
  templateUrl: './add-customers.component.html',
  styleUrls: ['./add-customers.component.scss'],
  imports:[SharedMaterialModule,ReactiveFormsModule,CommonModule]
})
export class AddCustomersComponent implements OnInit {
  showAddCustomer: boolean | undefined
  showCustomersList: boolean | undefined
  title: string = 'Add Customer'
  customerData: any
  UserId: string | null
  customersId: any
  isSaveBtn: boolean = true
  isUpdateBtn: boolean = false
  countryList: any
  selectedCountryId: any
  selectedTimeZoneId: any
  selectedStateId: any
  countryId = 0
  stateList: any
  stateId = 0
  cityId = 0
  cityList: any
  selectedCityId: any
  submitted: any
  showLoader: boolean = false
  GetAllCountryList: any
  GetTimeZoneList: any
  getAllStateList: any
  getAllCityList: any
  telephoneNumber: string = ''
  router: any

  constructor(
    private _fb: FormBuilder,
    public _router: Router,
    private _toastr: ToastrService,
    private _superAdminService: SuperAdminService,
    private _storageService: StorageService,
    private _activatedRoute: ActivatedRoute,
    private readonly _authService: AuthService,
  ) {
    this.UserId = this._storageService.getLocalData('user_id')
    this.customersId = this._activatedRoute.snapshot.queryParams['id']
    let routePath = this._activatedRoute.snapshot.routeConfig?.path

    if (this.customersId && routePath != 'view-customer') {
      this.title = 'Edit Organization'
      this.isUpdateBtn = true
      this.isSaveBtn = false
    } else if (this.customersId && routePath == 'view-customer') {
      this.title = 'View Organization'
      this.isSaveBtn = false
      this.isUpdateBtn = false
      this.addCustomerProfile.disable()
    } else {
      this.title = 'Add Organization'
      this.isSaveBtn = true
      this.isUpdateBtn = false
    }
  }

  /**
   * Form group
   */
  addCustomerProfile = this._fb.group({
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
      Validators.pattern(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/),
      Validators.email,
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
    // this._adminService.getListApi('country').subscribe((res) => {
    //   this.countryList = res.data;
    // });

    /**
     * Call Country API
     */
    if (this.customersId) {
      this.GetCustomerbyID(this.customersId)
    }
    this.getAllCountry()
    this.getTimeZoneList();
  }
  /**
   *  Patch data for edit fuction
   */

  GetCustomerbyID(id: number) {

    this._superAdminService.GetCustomerbyID(id).subscribe((res: any) => {
      this.customerData = res.data[0]

      this.addCustomerProfile.patchValue({
        userName: this.customerData.userName,
      })
      this.addCustomerProfile.patchValue({
        notes: this.customerData.description,
      })
      this.addCustomerProfile.patchValue({
        pointofcontact: this.customerData.pointofcontact,
      })
      this.addCustomerProfile.patchValue({ email: this.customerData.email })
      this.addCustomerProfile.patchValue({
        phoneNumber: this.customerData.phoneNumber,
      })
      this.addCustomerProfile.patchValue({
        addressLine1: this.customerData.addressLine1,
      })

      this.addCustomerProfile.patchValue({
        addressLine2: this.customerData.addressLine2,
      })

      this.addCustomerProfile.patchValue({
        zipCode: this.customerData.zipCode,
      })

      if (this.customerData.countryName) {
        this.selectedCountryId = this.customerData.countryID

        this.addCustomerProfile.patchValue({
          country: this.customerData.countryName,
        })
      }


      if (this.customerData.timeZoneText) {
        this.selectedTimeZoneId = this.customerData.timeZoneID

        this.addCustomerProfile.patchValue({
          timeZone: this.customerData.timeZoneText,
        })
      }

      if (this.customerData.stateName) {
        this.selectedStateId = this.customerData.stateID
        this.addCustomerProfile.patchValue({
          state: this.customerData.stateName,
        })
        this.getAllStateByCountryId(this.selectedCountryId)
      }
      this.addCustomerProfile.patchValue({
        cityName: this.customerData.cityName,
      })
    })
  }

  /**
   * Add Customer Profile
   */
  addCustomers() {
    let formData = this.addCustomerProfile.value
    this.submitted = true
    if (this.addCustomerProfile.invalid) {
      this._toastr.error('Please fill mandatory fields.')
      return
    }

    const body = {
      id: this.customersId,
      userName: formData.userName,
      email: formData.email,
      notes: formData.notes,
      pointofcontact: formData.pointofcontact,
      phoneNumber: formData.phoneNumber,
      addressLine1: formData.addressLine1,
      addressLine2: formData.addressLine2,
      zipCode: formData.zipCode,
      countryID: this.selectedCountryId,
      stateID: this.selectedStateId,
      cityName: formData.cityName,
      timeZoneID:this.selectedTimeZoneId,

      createdBy: this.UserId,
    }
    Swal.fire({
      title: '<strong>Are you sure you want to confirm?</strong>',
      icon: 'success',

      focusConfirm: true,
      confirmButtonText: ' <span style="color:#0062A6">CANCEL<span>',
      confirmButtonColor: '#E6E8E9',

      cancelButtonColor: '#0062A6',
      cancelButtonText: ' CONFIRM',
      showCancelButton: true,
      allowOutsideClick: false, // 🔒 Prevent close on outside click
      allowEscapeKey: false     // 🔒 Prevent close with Esc
    }).then((result) => {
      if (result.isDismissed) {
        this._superAdminService.CreateCustomer(body).subscribe(
          (data) => {
            if (data) {
              //Do your stuffs...
              this._toastr.success('Record saved successfully.')
              this.addCustomerProfile.reset()
              this.showLoader = false
              this.submitted = false
              this._router.navigate(['superadmin/customer'])
            }
          },
          (error: any) => {
            if (error.status == 400) {
              let errorMsg = error.error.errors
              this._toastr.error(JSON.stringify(errorMsg))
              this.showLoader = false
            }
          },
        )
      }
    })
  }

  /**
   * Update Customer Profile
   */
  UpdateCustomers() {
    this.submitted = true
    if (this.addCustomerProfile.invalid) {
      this._toastr.error('Please fill mandatory fields.')
      return
    }
    let formData = this.addCustomerProfile.value
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
      timeZoneID:this.selectedTimeZoneId,
      modifiedBy: this.UserId,
    }
    Swal.fire({
      title: '<strong>Are you sure you want to confirm?</strong>',
      icon: 'success',

      focusConfirm: true,
      confirmButtonText: ' <span style="color:#0062A6">CANCEL<span>',
      confirmButtonColor: '#E6E8E9',

      cancelButtonColor: '#0062A6',
      cancelButtonText: ' CONFIRM',
      showCancelButton: true,
      allowOutsideClick: false, // 🔒 Prevent close on outside click
      allowEscapeKey: false     // 🔒 Prevent close with Esc
    }).then((result) => {
      if (result.isDismissed) {
        this._superAdminService.UpdateCustomer(body).subscribe(
          (data) => {
            if (data) {
              //Do your stuffs...
              this._toastr.success('Record update successfully.')
              this.addCustomerProfile.reset()
              this.showLoader = false
              this.submitted = false

             // Call authservice to get user role

              let userRole = this._authService.getRole();    
              // Redirect as per user role   
              this._router.navigate(userRole == 'SuperAdmin'?['superadmin/customer']:['admin/profile'])
            }
          },
          (error: any) => {
            if (error.status == 400) {
              let errorMsg = error.error.errors
              this._toastr.error(JSON.stringify(errorMsg))
              this.showLoader = false
            }
          },
        )
      }
    })
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
    const charCode = event.which ? event.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false
    }
    return true
  }

  /*
   *All Country List
   *
   */

  getAllCountry() {
    this._superAdminService.getAllCountry().subscribe((res: any) => {
      this.GetAllCountryList = res.data
    })
  }

  getTimeZoneList() {
    this._superAdminService.getTimeZoneList().subscribe((res: any) => {
      this.GetTimeZoneList = res.data
    })
  }

  /*
   *All getAllStateByCountryId List
   *
   */
  getAllStateByCountryId(id: any) {
    this._superAdminService.getAllStateByCountryId(id).subscribe((res: any) => {
      this.getAllStateList = res.data
    })
  }

  /**
   * Select Country
   * @param event
   * @returns
   */
  selectCountry(event: any, id: any) {
    if (event.isUserInput) {
      if (this.selectedStateId && this.selectedCityId) {
        this.addCustomerProfile.patchValue({ state: '' })
      }
      this.selectedCountryId = id
      this.getAllStateByCountryId(this.selectedCountryId)
    }
  }

  selectTimeZone(event: any, zoneId: any) {
    if (event.isUserInput) {
        this.selectedTimeZoneId = zoneId
  }
}

  /**
   * Select State
   * @param event
   * @returns
   */
  selectState(event: any, id: any) {
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
    const charCode = event.which ? event.which : event.keyCode
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
  cancel(){
    // Call authservice to get user role
    let userRole = this._authService.getRole();

  // Redirect as per user role 
    this._router.navigate(userRole == 'SuperAdmin'?['superadmin/customer']:['admin/profile'])
 }
}
