import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { DomSanitizer } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { StorageService } from 'src/app/service/storage.service'
import Swal from 'sweetalert2'
// import { data } from '../operator/dashboard/locations'
import { UserProfileService } from './user-profile.service'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  // DECLARE VARIABLES
  UserId: any
  Title = 'Profile'
  role: string
  userData: any
  GetAllCountryList: any
  getAllStateList: any
  getAllCityList: any
  selectedStateId: any
  selectedCityId: any
  selectedCountryId: any
  submitted = false
  showLoader: boolean = false

  profileId: any
  file: any = null
  profileImg: any
  notificationEnable: boolean = true
  notificationText: any = ''
  telephoneNumber: string = ''

  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private toastr: ToastrService,
    private _storageService: StorageService,
    private _activatedRoute: ActivatedRoute,
    private _UserProfileService: UserProfileService,
    public fb: FormBuilder,
    private cd: ChangeDetectorRef,
    public sanitizer: DomSanitizer,
  ) {
    //GET USER ROLE
    this.role = localStorage.getItem('role') || ''
    // GET USER ID
    this.UserId = this._storageService.getLocalData('user_id')
  }

  ngOnInit(): void {
    // API CALL
    this.GetUserProfileById()
    this.getAllCountry()
    this.GetUserProfileImage()
  }
  // FORM GROUP

  userProfileFormGroup = this.formBuilder.group({
    adminName: new FormControl(''),
    emailId: new FormControl(''),
    // dob: new FormControl(''),
    phoneNumber: new FormControl('', Validators.required),
    addressLine1: new FormControl('', Validators.required),
    addressLine2: new FormControl('', [Validators.maxLength(255)]),
    country: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    cityName: new FormControl('', Validators.required),
    zipcode: new FormControl('', Validators.required),
    notificationEnable: new FormControl(''),
  })

  save() {
    let formData = this.userProfileFormGroup.value
    this.submitted = true
    if (this.userProfileFormGroup.invalid) {
      this.toastr.error('Please fill mandatory fileds.')
      return
    }

    const body = {
      id: this.profileId,
      phoneNumber: formData.phoneNumber,
      addressLine1: formData.addressLine1,
      addressLine2: formData.addressLine2,
      countryID: this.selectedCountryId,
      stateID: this.selectedStateId,
      cityName: formData.cityName,
      zipCode: formData.zipcode,
      notificationEnable: formData.notificationEnable,
      modifiedBy: this.UserId,
    }

    Swal.fire({
      title: '<strong>Are you sure you want to confirm?</strong>',
      icon: 'success',
      showCloseButton: true,
      focusConfirm: true,
      confirmButtonText: '<span style="color:#0062A6">CANCEL</span>',
      confirmButtonColor: '#E6E8E9',
      cancelButtonColor: '#0062A6',
      cancelButtonText: ' CONFIRM',
      showCancelButton: true,
    }).then(
      (result) => {
        if (result.isDismissed) {
          this._UserProfileService.UpdateUserProfile(body).subscribe((data) => {
            if (data) {
              this.toastr.success('Record update successfully.')
              this.showLoader = false
              this.submitted = false
            }
          })
        }
      },
      (error: any) => {
        if (error.status == 400) {
          let errorMsg = error.errors
          this.toastr.error(JSON.stringify(errorMsg))
          this.showLoader = false
        }
      },
    )
  }

  set isDisabled(value: boolean) {
    this.isDisabled = value
    if (value) {
      this.userProfileFormGroup.controls['adminName'].disable()
    } else {
      this.userProfileFormGroup.controls['name'].enable()
    }
  }
  // GO BACK
  revertBack() {
    if (this.role == 'Operator') {
      this._router.navigateByUrl('operator/dashboard')
    } else if (this.role == 'Admin') {
      this._router.navigateByUrl('admin/profile')
    } else {
      this._router.navigateByUrl('superadmin/customer')
    }
  }

  // GET USER PROFILE BY ID
  GetUserProfileById() {
    this._UserProfileService.GetUserProfileById().subscribe((res) => {
      if (res.data) {
        this.userData = res.data
        this.profileId = res.data.id
        this.userProfileFormGroup.patchValue({
          adminName: this.userData.adminName,
        })
        this.userProfileFormGroup.patchValue({ emailId: this.userData.emailId })
        this.userProfileFormGroup.patchValue({ dob: this.userData.dob })
        this.userProfileFormGroup.patchValue({
          phoneNumber: this.userData.phoneNumber,
        })
        this.userProfileFormGroup.patchValue({
          addressLine1: this.userData.addressLine1,
        })
        this.userProfileFormGroup.patchValue({
          addressLine2: this.userData.addressLine2,
        })
        if (this.userData.countryName) {
          this.selectedCountryId = this.userData.countryID

          this.userProfileFormGroup.patchValue({
            country: this.userData.countryName,
          })
        }
        if (this.userData.stateName) {
          this.selectedStateId = this.userData.stateID
          this.userProfileFormGroup.patchValue({
            state: this.userData.stateName,
          })
          this.getAllStateByCountryId(this.selectedCountryId)
          // this.selectState('', this.selectedCountryId);
          // this.getSelected('', this.selectedStateId, 'City');
        }
        this.userProfileFormGroup.patchValue({
          cityName: this.userData.cityName,
        })

        this.userProfileFormGroup.patchValue({ zipcode: this.userData.zipcode })
        if (this.userData.notificationEnable) {
          this.notificationText = 'Notification Enable'
        } else {
          this.notificationText = 'Notification Disable'
        }

        this.userProfileFormGroup.patchValue({
          notificationEnable: this.userData.notificationEnable,
        })
      }
    })
  }

  // ALL COUNTRY LIST

  getAllCountry() {
    this._UserProfileService.getAllCountry().subscribe((res: any) => {
      this.GetAllCountryList = res.data
    })
  }

  // GET STATE BY COUNTRY ID

  getAllStateByCountryId(id: any) {
    this._UserProfileService
      .getAllStateByCountryId(id)
      .subscribe((res: any) => {
        this.getAllStateList = res.data
      })
  }

  // getAllCityByStateId(id: any) {
  //   this._UserProfileService.getAllCityByStateId(id).subscribe((res: any) => {
  //     this.getAllCityList = res.data
  //   })
  // }

  // COUNTRY SELECT

  selectCountry(event: any, id: any) {
    if (event.isUserInput) {
      this.selectedCountryId = id
      this.userProfileFormGroup.patchValue({ state: '' })
      this.userProfileFormGroup.patchValue({ cityName: '' })
      this.selectedStateId = ''
      this.getAllStateByCountryId(this.selectedCountryId)
    }
  }

  // STATE SELECT

  selectState(event: any, id: any) {
    if (event.isUserInput) {
      this.selectedStateId = id
      // this.getAllCityByStateId(this.selectedStateId)
    }
  }

  // UPDATE USER PROFILE PICTURE

  UpdateUserProfilePicture(data: any) {
    this._UserProfileService
      .UpdateUserProfilePicture(data)
      .subscribe((res) => {})
  }

  // ON FILE SELECT
  onFileSelected(file: any) {
    this.file = file.target.files[0]

    if (this.file.size / 1024 / 1024 > 2) {
      this.toastr.error('Please upload image less than 2 MB.')
      this.file = null
      return
    }

    const form: any = new FormData()

    form.append('ProfilePicture', this.file)
    Swal.fire({
      text: 'Are you sure you want to change profile?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.value) {
        this._UserProfileService
          .UpdateUserProfilePicture(form)
          .subscribe((res: any) => {
            if (res.statusCode == 200) {
              this._UserProfileService.profileSubject.next('Hello world!')
              let msg = res.statusMessage
              this.GetUserProfileImage()

              this.toastr.success(`${msg}`)
            } else {
              this.toastr.error(`Failed to upload!`)
            }
          })
      }
    })
  }
  // OMIT SPECIAL CHARACTERS
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
  // GET USER PROFILE IMAGE
  GetUserProfileImage() {
    this._UserProfileService.GetUserProfileImage().subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.profileImg = 'data:image/jpeg;base64,' + res.data
      }
    })
  }

  // toDataUrlBase64(url: string) {
  //   const toBase64 = fetch(url)
  //     .then((response) => response.blob())
  //     .then(
  //       (blob) =>
  //         new Promise((resolve, reject) => {
  //           const reader = new FileReader()
  //           reader.onloadend = () => resolve(reader.result)
  //           reader.onerror = reject
  //           reader.readAsDataURL(blob)
  //         }),
  //     )

  //   return toBase64
  // }

  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false
    }
    return true
  }

  // PHONE NUMBER FORMAT

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

  // IS NOTIFICATION CHECKED
  isNotificationChecked(event: any) {
    if (event.checked) {
      this.notificationText = 'Notification Enable'
    } else {
      this.notificationText = 'Notification Disable'
    }
  }
}
