import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import Swal from 'sweetalert2'
import { AdminService } from '../../admin.service'
import { DatePipe, Location } from '@angular/common'
import { StorageService } from 'src/app/service/storage.service'

@Component({
  selector: 'app-add-operator',
  templateUrl: './add-operator.component.html',
  styleUrls: ['./add-operator.component.scss'],
})
export class AddOperatorComponent implements OnInit {
  submitted = false
  registrationForm: any
  countryList: any
  countryId = 0
  stateList: any
  stateId = 0
  cityList: any
  cityId = 0
  selectValue = '0'
  UserId: any
  locationList: any
  role = ''
  saveBtn: boolean = true
  operatorData: any
  saveBtnValue: any
  editId = 0
  disabled: any
  showLoader: boolean = false
  datePipe = new DatePipe('en-US')
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _adminService: AdminService,
    private toastr: ToastrService,
    private _location: Location,
    private _storageService: StorageService,
  ) {
    this.role = localStorage.getItem('role') || ''
    this.UserId = this._storageService.getLocalData('user_id')
    this.saveBtn =
      sessionStorage.getItem('saveBtn') !== undefined &&
      sessionStorage.getItem('saveBtn') !== null &&
      sessionStorage.getItem('saveBtn') !== ''
        ? JSON.parse(JSON.stringify(sessionStorage.getItem('saveBtn')))
        : true
    this.operatorData =
      sessionStorage.getItem('operatorData') !== undefined &&
      sessionStorage.getItem('operatorData') !== null
        ? sessionStorage.getItem('operatorData')
        : ''

    this.saveBtnValue = this.saveBtn
    this.saveBtnValue = JSON.parse(this.saveBtnValue)

    if (
      this.saveBtnValue &&
      this.operatorData !== undefined &&
      this.operatorData !== null &&
      this.operatorData !== ''
    ) {
      // this.title = 'Edit Admin User'
      this.setoperatorData(this.operatorData)
    } else if (
      !this.saveBtnValue &&
      this.operatorData !== undefined &&
      this.operatorData !== null &&
      this.operatorData !== ''
    ) {
      // this.title = 'View Admin User'
      this.setoperatorData(this.operatorData)
    } else {
      //  this.title = 'Add Admin Users'
    }
  }

  addOperatorProfile = this.formBuilder.group({
    username: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]{5,20}'),
    ]),
    emailid: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/),
    ]),
    dob: new FormControl('', Validators.required),
    phonenumber: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{10,15}'),
    ]),
    addressLine1: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
    ]),
    addressLine2: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
    ]),
    location: new FormControl(this.selectValue, Validators.required),
    country: new FormControl(this.selectValue, Validators.required),
    state: new FormControl(this.selectValue, Validators.required),
    city: new FormControl(this.selectValue, Validators.required),
    zipcode: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9A-Z]{6}'),
    ]),
  })

  type_lists = new FormControl('')
  alteration_types = [
    'Location A',
    'Location B',
    'Location C',
    'Location D',
    'Location E',
  ]
  ngOnInit() {
    // this.onSubmit();
    this._adminService.getListApi('country').subscribe((res) => {
      this.countryList = res.data
    })
    this._adminService.getListApi('locationName').subscribe((res) => {
      this.locationList = res.data
    })
  }

  alertWithSuccess() {
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
        this.saveForm()
      }
    })
  }

  saveForm() {
    this.submitted = true
    if (this.addOperatorProfile.invalid) {
      this.toastr.error('Please fill mandatory fields.')
      return
    }
    //alert("Your Record Succefully Save.")
    // console.log('Form data is ', this.addOperatorProfile.value);
    let pass = sessionStorage.getItem('enpass')
    let formField = this.addOperatorProfile.value
    if (
      formField.emailid == '' ||
      formField.username == '' ||
      formField.dob == '' ||
      formField.phonenumber == '' ||
      formField.addressLine1 == '' ||
      parseInt(formField.country) == 0 ||
      parseInt(formField.state) == 0 ||
      parseInt(formField.city) == 0
    ) {
      this.toastr.error('Fill all Mandatory Fields')
      return
    }
    if (this.editId == 0) {
      const body = {
        displayName: this.role,
        objectid: '',
        userPrincipalName: '',
        mailNickname: '',
        isActive: true,
        //  password: pass,
        //  isForceChangePasswordNextSignIn: true,
        emailId: formField.emailid,
        name: formField.username,
        dob: this.datePipe.transform(formField.dob, 'yyyy-MM-ddThh:mm:ss'),
        phoneNumber: parseInt(formField.phonenumber),
        addressLine1: formField.addressLine1,
        addressLine2: formField.addressLine2,
        countryID: parseInt(formField.country),
        customerID: 1,
        stateID: parseInt(formField.state),
        cityID: parseInt(formField.city),
        zipCode: formField.zipcode,
        createdBy: this.UserId,
        userRolesCommand: [
          {
            roleid: 4,
          },
        ],
        operatorUserMapperCommand: [
          {
            locationId: parseInt(formField.location),
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
          this._adminService.createOperator(body).subscribe(
            (data) => {
              if (data) {
                //Do your stuffs...
                this.toastr.success('Record saved successfully.')
                this.addOperatorProfile.reset()
                this.showLoader = false
                this.submitted = false
                this.router.navigate(['users/add-operator'])
              }
            },
            (error: any) => {
              if (error.status == 400) {
                let errorMsg = error.error.errors
                this.toastr.error(JSON.stringify(errorMsg))
                this.showLoader = false
              }
            },
          )
        }
      })
      // console.log(formField);
      // return;
      // const body = {}
      // this._adminService.createOperator(body).subscribe({
      //   next: (res) => {
      //     this.toastr.success(res.statusMessage)
      //     this._location.back()
      //   },
      //   error: (error) => {
      //     this.toastr.error('Fill all Mandatory Fields')
      //   },
      // })
    } else {
      const body = {
        id: this.editId,
        // displayName: this.role,
        // objectid: '',
        // userPrincipalName: '',
        //  mailNickname: '',
        // isActive: true,
        // password: pass,
        //  isForceChangePasswordNextSignIn: true,
        emailId: formField.emailid,
        name: formField.username,
        dob: this.datePipe.transform(formField.dob, 'yyyy-MM-ddThh:mm:ss'),
        phoneNumber: formField.phonenumber,
        addressLine1: formField.addressLine1,
        addressLine2: formField.addressLine2,
        countryID: parseInt(formField.country),
        customerID: 1,
        stateID: parseInt(formField.state),
        cityID: parseInt(formField.city),
        zipCode: formField.zipcode,
        modifiedBy: this.UserId,
        userRolesCommand: [
          {
            id: this.editId,
            roleID: 4,
          },
        ],
        operatorUserMapperCommand: [
          { id: this.editId, locationId: parseInt(formField.location) },
        ],
      }
      // console.log(formField);
      // return;
      // const body = {}

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
          this._adminService.updateOperator(body).subscribe(
            (data) => {
              if (data) {
                //Do your stuffs...
                this.toastr.success('Record update successfully.')
                this.addOperatorProfile.reset()
                this.showLoader = false
                this.submitted = false

                this.router.navigate(['users/add-operator'])
              }
            },
            (error: any) => {
              if (error.status == 400) {
                let errorMsg = error.error.errors
                this.toastr.error(JSON.stringify(errorMsg))
                this.showLoader = false
              }
            },
          )
        }
      })
      // this._adminService.updateOperator(body).subscribe({
      //   next: (res) => {
      //     this.toastr.success(res.statusMessage)
      //     this._location.back()
      //   },
      //   error: (error) => {
      //     this.toastr.error('Fill all Mandatory Fields')
      //   },
      // })
    }
  }
  btnClick() {
    this.router.navigateByUrl('admin/manage-operator/')
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  getSelected(event: any, type: string) {
    if (type == 'state') {
      if (this.countryId !== parseInt(event.value)) {
        // NEW COUNTRY IS SELECTED
        this.stateId = 0
        // this.stateName = ''
        this.cityId = 0
        // this.cityName = ''
        this.addOperatorProfile.patchValue({ state: this.selectValue })
        this.addOperatorProfile.patchValue({ city: this.selectValue })
        this.stateList = []
        this.cityList = []
      }
      this.countryId = parseInt(event.value)
      // this.countryName = event.value.split('#')[1];
      // CALL STATE API
      this._adminService
        .getListApi('state', this.countryId)
        .subscribe((res) => {
          this.stateList = res.data
          if (this.countryId == 0) {
            // FOR NEW LOCATION
            this.addOperatorProfile.patchValue({ state: this.selectValue })
            this.stateId = 0
            // this.stateName = ''
          } else if (this.countryId > 0 && this.stateId > 0) {
            // FOR EDIT COUNTRY AND STATE BOTH ARE SELECTED
            this.addOperatorProfile.patchValue({
              state: this.stateId.toString(),
            })
          } else if (
            this.countryId > 0 &&
            this.stateId > 0 &&
            this.cityId > 0
          ) {
            // FOR EDIT COUNTRY AND STATE BOTH ARE SELECTED
            this.addOperatorProfile.patchValue({ city: this.cityId.toString() })
          } else if (this.countryId > 0 && this.stateId == 0) {
            // WHEN CHANGING COUNTRY
            this.addOperatorProfile.patchValue({ state: this.selectValue })
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
      this._adminService
        .getListApi('city', 0, this.stateId)
        .subscribe((res) => {
          this.cityList = res.data
          if (this.stateId == 0) {
            // FOR NEW LOCATION
            this.addOperatorProfile.patchValue({ city: this.selectValue })
            this.cityId = 0
            //  this.cityName = ''
          } else if (this.stateId > 0 && this.cityId > 0) {
            // FOR EDIT STATE AND CITY BOTH ARE SELECTED
            this.addOperatorProfile.patchValue({
              state: this.stateId.toString(),
            })
            this.addOperatorProfile.patchValue({ city: this.cityId.toString() })
          } else if (this.stateId > 0 && this.cityId == 0) {
            // WHEN CHANGING STATE
            this.addOperatorProfile.patchValue({ city: this.selectValue })
            this.addOperatorProfile.patchValue({
              state: this.stateId.toString(),
            })
          }
          /* this.addOperatorProfile.patchValue({City: this.selectValue})
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
  setoperatorData(data: any) {
    const body = {}
    data = JSON.parse(data)
    this.editId = data.id
    this._adminService.getListApi('operator', data.id).subscribe((res) => {
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

      this.addOperatorProfile.patchValue({
        username: this.adminRowData.adminName,
      })
      this.addOperatorProfile.patchValue({
        emailid: this.adminRowData.emailId,
      })
      this.addOperatorProfile.patchValue({
        phonenumber: this.adminRowData.phoneNumber,
      })

      this.addOperatorProfile.patchValue({
        addressLine1: this.adminRowData.addressLine1,
      })
      this.addOperatorProfile.patchValue({
        addressLine2: this.adminRowData.addressLine2,
      })

      this.addOperatorProfile.patchValue({
        country:
          this.adminRowData.countryID !== 0
            ? this.adminRowData.countryID.toString()
            : this.selectValue,
      })
      this.addOperatorProfile.patchValue({
        state:
          this.adminRowData.stateID !== 0
            ? this.adminRowData.stateID
            : this.selectValue,
      })

      this.addOperatorProfile.patchValue({
        city:
          this.adminRowData.cityId !== 0
            ? this.adminRowData.cityId
            : this.selectValue,
      })
      this.addOperatorProfile.patchValue({
        zipcode: this.adminRowData.zipcode,
      })
      this.addOperatorProfile.patchValue({
        dob: this.adminRowData.dob,
      })

      this.addOperatorProfile.patchValue({
        location:
          this.adminRowData.customerID !== 0
            ? this.adminRowData.customerID.toString()
            : 0,
      })

      // console.log(this.stateList)
    })
  }

  //dob filter
  dateFilter = (d: any | null) => {
    // const date = new Date();
    // date.setDate(date.getDate() - 30);
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
