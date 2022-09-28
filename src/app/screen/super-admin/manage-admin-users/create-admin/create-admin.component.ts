import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import Swal from 'sweetalert2'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { SuperAdminService } from '../../super-admin.service'
import { DatePipe, Location } from '@angular/common'
import { StorageService } from 'src/app/service/storage.service'

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.scss'],
})
export class CreateAdminComponent implements OnInit {
  submitted = false
  registrationForm: any
  disableSelect = new FormControl(false)
  adminData: any
  saveBtn: boolean = true
  title: string = 'Add Admin User'
  saveBtnValue: any
  UserId: any
  countryList: any
  countryId = 0
  stateList: any
  stateId = 0
  cityList: any
  cityId = 0
  selectValue = '0'
  customerList: any
  editId = 0
  role = ''
  datePipe = new DatePipe('en-US')
  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private toastr: ToastrService,
    private _superadminService: SuperAdminService,
    private _location: Location,
    private _storageService: StorageService,
  ) {
    this.role = localStorage.getItem('role') || ''
    this.editId = 0
    this.UserId = this._storageService.getLocalData('user_id')
    this.saveBtn =
      sessionStorage.getItem('saveBtn') !== undefined &&
      sessionStorage.getItem('saveBtn') !== null &&
      sessionStorage.getItem('saveBtn') !== ''
        ? JSON.parse(JSON.stringify(sessionStorage.getItem('saveBtn')))
        : true
    this.adminData =
      sessionStorage.getItem('adminData') !== undefined &&
      sessionStorage.getItem('adminData') !== null
        ? sessionStorage.getItem('adminData')
        : ''

    this.saveBtnValue = this.saveBtn
    this.saveBtnValue = JSON.parse(this.saveBtnValue)

    if (
      this.saveBtnValue &&
      this.adminData !== undefined &&
      this.adminData !== null &&
      this.adminData !== ''
    ) {
      this.title = 'Edit Admin User'
      this.setadminData(this.adminData)
    } else if (
      !this.saveBtnValue &&
      this.adminData !== undefined &&
      this.adminData !== null &&
      this.adminData !== ''
    ) {
      this.title = 'View Admin User'
      this.setadminData(this.adminData)
    } else {
      this.title = 'Add Admin User'
    }
  }

  addAdminProfile = this.formBuilder.group({
    username: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
    ]),
    emailid: new FormControl('', [Validators.required, Validators.email]),
    dob: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{10,15}'),
    ]),
    organizationName: new FormControl(this.selectValue, Validators.required),
    addressLine1: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
    ]),
    addressLine2: new FormControl('', [Validators.maxLength(255)]),
    country: new FormControl(this.selectValue, Validators.required),
    state: new FormControl(this.selectValue, Validators.required),
    city: new FormControl(this.selectValue, Validators.required),
    zipcode: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9A-Z]{6}'),
    ]),
  })

  ngOnInit() {
    // this.onSubmit();
    this._superadminService.getListApi('country').subscribe((res) => {
      this.countryList = res.data
    })
    this._superadminService.getListApi('org').subscribe((res) => {
      this.customerList = res.data // it represent organisation
      //  console.log(this.customerList);
    })
  }

  // alertWithSuccess() {
  //   Swal.fire({
  //     title: '<strong>Are you sure you want to confirm?</strong>',
  //     icon: 'success',
  //     focusConfirm: true,
  //     confirmButtonText: ' <span style="color:#0062A6">CANCEL<span>',
  //     confirmButtonColor: '#E6E8E9',

  //     cancelButtonColor: '#0062A6',
  //     cancelButtonText: ' CONFIRM',
  //     showCancelButton: true,
  //   }).then((result) => {
  //     if (result.isDismissed) {
  //       // this.toastr.success("Record has been registered on success.")
  //       //Do your stuffs...
  //       this.saveForm()
  //     }
  //   })
  // }

  saveForm() {
    // console.log('Form data is ', this.addAdminProfile.value)
    let formField = this.addAdminProfile.value
    // if (
    //   formField.emailid == '' ||
    //   formField.username == '' ||
    //   formField.dob == '' ||
    //   formField.phoneNumber == '' ||
    //   formField.addressLine1 == '' ||
    //   parseInt(formField.country) == 0 ||
    //   parseInt(formField.state) == 0 ||
    //   parseInt(formField.city) == 0 ||
    //   parseInt(formField.organizationName) == 0
    // ) {
    //   this.toastr.error('Fill all Mandatory Fields');
    //   return;
    // }
    this.submitted = true
    if (this.addAdminProfile.invalid) {
      this.toastr.error('Please fill mandatory fields.')
      return
    }
    if (this.editId == 0) {
      let pass = sessionStorage.getItem('enpass')
      let body = {
        displayName: this.role,
        objectid: '',
        userPrincipalName: '',
        mailNickname: '',
        isActive: true,
        //  password: pass,
        // isForceChangePasswordNextSignIn: true,
        emailId: formField.emailid,
        name: formField.username,
        dob: this.datePipe.transform(formField.dob, 'yyyy-MM-ddThh:mm:ss'),
        phoneNumber: formField.phoneNumber,
        addressLine1: formField.addressLine1,
        addressLine2: formField.addressLine2,
        countryID: parseInt(formField.country),
        customerID: parseInt(formField.organizationName),
        stateID: parseInt(formField.state),
        cityID: parseInt(formField.city),
        zipCode: formField.zipcode,
        createdBy: this.UserId,
        userRolesCommand: [
          {
            roleid: 3,
          },
        ] /* ,
      operatorUserMapperCommand: [
        {
          locationId: 0
        }
      ] */,
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
      }).then((result) => {
        if (result.isDismissed) {
          // this.toastr.success("Record has been registered on success.")
          //Do your stuffs...
          this._superadminService.createAdmin(body).subscribe({
            next: (res) => {
              this.toastr.success(res.statusMessage)
              this._location.back()
            },
            error: (error) => {
              if (error.status == 400) {
                let errorMsg = error.error.errors
                this.toastr.error(JSON.stringify(errorMsg))
                // this.showLoader = false
              }
            },
          })
        }
      })
    } else {
      // body.id =
      // console.log(body);
      let body = {
        id: this.editId,
        emailId: formField.emailid,
        name: formField.username,
        dob: this.datePipe.transform(formField.dob, 'yyyy-MM-ddThh:mm:ss'),
        phoneNumber: formField.phoneNumber,
        addressLine1: formField.addressLine1,
        addressLine2: formField.addressLine2,
        countryID: parseInt(formField.country),
        customerID: parseInt(formField.organizationName),
        stateID: parseInt(formField.state),
        cityId: parseInt(formField.city),
        zipCode: formField.zipcode,
        modifiedBy: this.UserId,
        userRolesCommand: [
          {
            id: this.editId,
            roleID: 3,
          },
        ],
        operatorUserMapperCommand: [
          {
            id: this.editId,
            locationId: 0,
          },
        ],
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
      }).then((result) => {
        if (result.isDismissed) {
          // this.toastr.success("Record has been registered on success.")
          //Do your stuffs...
          this._superadminService.updateAdmin(body).subscribe({
            next: (res) => {
              this.toastr.success(res.statusMessage)
              this._location.back()
            },

            // (error: any) => {
            //   if (error.status == 400) {
            //     let errorMsg = error.error.errors
            //     this._toastr.error(JSON.stringify(errorMsg))
            //     this.showLoader = false
            //   }
            // },
            error: (error) => {
              if (error.status == 400) {
                let errorMsg = error.error.errors
                this.toastr.error(JSON.stringify(errorMsg))
                // this.showLoader = false
              }
            },
          })
        }
      })
    }
  }
  btnClick() {
    this._router.navigateByUrl('superadmin/admin/')
  }

  getSelected(event: any, type: string) {
    if (type == 'state') {
      if (this.countryId !== parseInt(event.value)) {
        // NEW COUNTRY IS SELECTED
        this.stateId = 0
        // this.stateName = ''
        this.cityId = 0
        // this.cityName = ''
        this.addAdminProfile.patchValue({ state: this.selectValue })
        this.addAdminProfile.patchValue({ city: this.selectValue })
        this.stateList = []
        this.cityList = []
      }
      this.countryId = parseInt(event.value)
      // this.countryName = event.value.split('#')[1];
      // CALL STATE API
      this._superadminService
        .getListApi('state', this.countryId)
        .subscribe((res) => {
          this.stateList = res.data
          if (this.countryId == 0) {
            // FOR NEW LOCATION
            this.addAdminProfile.patchValue({ state: this.selectValue })
            this.stateId = 0
            // this.stateName = ''
          } else if (this.countryId > 0 && this.stateId > 0) {
            // FOR EDIT COUNTRY AND STATE BOTH ARE SELECTED
            this.addAdminProfile.patchValue({ state: this.stateId.toString() })
          } else if (
            this.countryId > 0 &&
            this.stateId > 0 &&
            this.cityId > 0
          ) {
            // FOR EDIT COUNTRY AND STATE BOTH ARE SELECTED
            this.addAdminProfile.patchValue({ city: this.cityId.toString() })
          } else if (this.countryId > 0 && this.stateId == 0) {
            // WHEN CHANGING COUNTRY
            this.addAdminProfile.patchValue({ state: this.selectValue })
          }
        })
    } else if (type == 'city') {
      if (this.stateId !== parseInt(event.value)) {
        // NEW STATE IS SELECTED
        this.cityId = 0
        //  this.cityName = ''
      }
      this.stateId = parseInt(event.value)
      // this.stateName = event.value.split('#')[1];
      // CALL STATE API
      this._superadminService
        .getListApi('city', 0, this.stateId)
        .subscribe((res) => {
          this.cityList = res.data
          if (this.stateId == 0) {
            // FOR NEW LOCATION
            this.addAdminProfile.patchValue({ city: this.selectValue })
            this.cityId = 0
            //  this.cityName = ''
          } else if (this.stateId > 0 && this.cityId > 0) {
            // FOR EDIT STATE AND CITY BOTH ARE SELECTED
            this.addAdminProfile.patchValue({ state: this.stateId.toString() })
            this.addAdminProfile.patchValue({ city: this.cityId.toString() })
          } else if (this.stateId > 0 && this.cityId == 0) {
            // WHEN CHANGING STATE
            this.addAdminProfile.patchValue({ city: this.selectValue })
            this.addAdminProfile.patchValue({ state: this.stateId.toString() })
          }
          /* this.addAdminProfile.patchValue({City: this.selectValue})
         this.cityId = 0
         this.cityName = '' */
        })
    } else {
      // FOR CITY ID AND NAME
      this.cityId = parseInt(event.value)
      // this.cityName = event.value.split('#')[1];
    }
  }

  /**
   * Set Form Value
   * @param data
   */
  adminRowData: any
  setadminData(data: any) {
    const body = {}
    data = JSON.parse(data)
    this.editId = data.id
    this._superadminService.getListApi('admin', data.id).subscribe((res) => {
      // console.log(res)

      this.adminRowData = res.data
      this.countryId = this.adminRowData.countryID
      this.stateId = this.adminRowData.stateID
      this.cityId = this.adminRowData.cityID

      // console.log(this.adminRowData)
      // alert(this.locationRowData.locationStatus.id + this.locationRowData.locationStatus.locationStatusName);
      this.getSelected(
        {
          value: this.adminRowData.countryID,
        },
        'state',
      )
      this.getSelected(
        {
          value: this.adminRowData.stateID,
        },
        'city',
      )

      this.addAdminProfile.patchValue({
        username: this.adminRowData.adminName,
      })
      this.addAdminProfile.patchValue({
        emailid: this.adminRowData.emailId,
      })
      this.addAdminProfile.patchValue({
        phoneNumber: this.adminRowData.phoneNumber,
      })

      this.addAdminProfile.patchValue({
        addressLine1: this.adminRowData.addressLine1,
      })
      this.addAdminProfile.patchValue({
        addressLine2: this.adminRowData.addressLine2,
      })

      this.addAdminProfile.patchValue({
        country:
          this.adminRowData.countryID !== 0
            ? this.adminRowData.countryID.toString()
            : this.selectValue,
      })
      this.addAdminProfile.patchValue({
        state:
          this.adminRowData.stateID !== 0
            ? this.adminRowData.stateID
            : this.selectValue,
      })

      this.addAdminProfile.patchValue({
        city:
          this.adminRowData.cityId !== 0
            ? this.adminRowData.cityId
            : this.selectValue,
      })
      this.addAdminProfile.patchValue({
        zipcode: this.adminRowData.zipcode,
      })
      this.addAdminProfile.patchValue({
        dob: this.adminRowData.dob,
      })

      this.addAdminProfile.patchValue({
        organizationName:
          this.adminRowData.customerID !== 0
            ? this.adminRowData.customerID.toString()
            : 0,
      })

      // console.log(this.stateList)
    })
    this.addAdminProfile
  }

  //dob filter
  dateFilter = (d: any | null) => {
    return d < new Date()
  }

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

  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false
    }
    return true
  }
}
