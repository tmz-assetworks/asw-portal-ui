import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {Component} from '@angular/core';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../admin.service';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { StorageService } from 'src/app/service/storage.service';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.scss'],
  imports:[
   CommonModule,
    SharedMaterialModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class CreateAdminComponent {
  isSubmitted = false;
  _adminData: any;
  saveBtn: boolean = true;
  title: string = 'Add Admin User';
  saveBtnValue: any;
  UserId: any;
  countryList: any;
  countryId = 0;
  stateList: any;
  stateId = 0;
  cityList: any;
  selectValue = '0';
  customerList: any;
  editId = 0;
  role = '';
  datePipe = new DatePipe('en-US');
  orgUserId = '0';
  telephoneNumber: string = '';
  adminRowData: any
  customerName:any
  customerId:any
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly toastr: ToastrService,
    private readonly adminService: AdminService,
    private readonly location: Location,
    private readonly  storageService: StorageService
  ) {
    this.role = localStorage.getItem('role') ?? '';
    this.editId = 0;
    this.UserId = this.storageService.getLocalData('user_id');
    this.saveBtn =
      sessionStorage.getItem('saveBtn') !== undefined &&
      sessionStorage.getItem('saveBtn') !== null &&
      sessionStorage.getItem('saveBtn') !== ''
        ? JSON.parse(JSON.stringify(sessionStorage.getItem('saveBtn')))
        : true;
    this._adminData =
      sessionStorage.getItem('adminData') !== undefined &&
      sessionStorage.getItem('adminData') !== null
        ? sessionStorage.getItem('adminData')
        : '';

    this.saveBtnValue = this.saveBtn;
    this.saveBtnValue = JSON.parse(this.saveBtnValue);

    if (
      this.saveBtnValue &&
      this._adminData !== undefined &&
      this._adminData !== null &&
      this._adminData !== ''
    ) {
      this.title = 'Edit Admin User';
      this.setFormValue(this._adminData);
    } else if (
      !this.saveBtnValue &&
      this._adminData !== undefined &&
      this._adminData !== null &&
      this._adminData !== ''
    ) {
      this.title = 'View Admin User';
      this.setFormValue(this._adminData);
      this.addAdminFormGroup.disable();
    } else {
      this.title = 'Add Admin User';
    }
  }

  /**
   * Form group
   */

addAdminFormGroup = this.formBuilder.group({
  username: ['', [Validators.required, Validators.maxLength(20),Validators.minLength(5)]],
  emailid: ['', [Validators.required, Validators.email]],
  phoneNumber: ['', Validators.required],
  organizationName: ['', Validators.required],
  addressLine1: ['', Validators.maxLength(255)],
  addressLine2: ['', Validators.maxLength(255)],
  country: [this.selectValue, Validators.required],
  state: [this.selectValue, Validators.required],
  cityName: [''],
  zipcode: [''],
});

  ngOnInit() {
    /**
     * Get org user from local storage
     */
    this.orgUserId = sessionStorage.getItem('orgUserId') ?? '';
    this.adminService.getListApis('country').subscribe((res) => {
      this.countryList = res.data;
    });
    /**
     * Call API
     */
    this.adminService.getListApis('org').subscribe((res) => {
      this.customerList = res.data;
      this.customerName = res.data[0].customerName;
      this.customerId = res.data[0].id;
    });
  }

  ngAfterViewInit() {
    if (this.title == 'Add Admin User' && this.orgUserId !== '') {
      this.addAdminFormGroup.patchValue({
        // organizationName: this.orgUserId.toString(),
      });
    }
  }

  /**
   * Add  or update admin user
   * @returns
   */
addUpdateAdmins() {
  if (
    this.addAdminFormGroup.value.organizationName == '0'
    // this.addAdminFormGroup.value.city == '0'
  ) {
    this.toastr.error('Please fill mandatory fields.');
    return;
  }
  if (this.addAdminFormGroup.invalid) {
    this.toastr.error('Please fill mandatory fields.');
    return;
  }

  const formField = this.addAdminFormGroup.value;
  const isCreate = this.editId === 0;
  const body = this.buildRequestBody(formField, isCreate);

  this.showConfirmationDialog(() => {
    const apiCall = isCreate
      ? this.adminService.CreateUser(body)
      : this.adminService.UpdateUser(body);

    apiCall.subscribe({
      next: (res) => {
        if (res.statusCode === 200 || res.statusCode === 201) {
          sessionStorage.removeItem('orgUserId');
          this.toastr.success(res.statusMessage);
          this.location.back();
        } else {
          this.toastr.error(res.statusMessage);
        }
      },
      error: (error) => {
        if (error.status === 400) {
          this.toastr.error(error.error.errors);
        }
      },
    });
  });
}


private buildRequestBody(formField: any, isCreate: boolean) {
  const commonBody = {
    emailId: formField.emailid,
    name: formField.username,
    phoneNumber: formField.phoneNumber,
    addressLine1: formField.addressLine1,
    addressLine2: formField.addressLine2,
    countryID: parseInt(formField.country),
    customerID: this.customerId,
    stateID: parseInt(formField.state),
    cityName: formField.cityName,
    zipCode: formField.zipcode,
    userRolesCommand: [{ roleid: 3 }],
  };

  if (isCreate) {
    return {
      ...commonBody,
      displayName: this.role,
      objectid: '',
      userPrincipalName: '',
      mailNickname: '',
      isActive: true,
      createdBy: this.UserId,
    };
  } else {
    return {
      ...commonBody,
      id: this.editId,
      modifiedBy: this.UserId,
      userRolesCommand: [{ id: this.editId, roleID: 3 }],
    };
  }
}

private showConfirmationDialog(onConfirm: () => void) {
  Swal.fire({
    title: '<strong>Are you sure you want to confirm?</strong>',
    icon: 'success',
    focusConfirm: true,
    confirmButtonText: ' <span style="color:#0062A6">CANCEL<span>',
    confirmButtonColor: '#E6E8E9',
    cancelButtonColor: '#0062A6',
    cancelButtonText: ' CONFIRM',
    showCancelButton: true,
    allowOutsideClick: false,
    allowEscapeKey: false,
  }).then((result) => {
    if (result.isDismissed) {
      onConfirm();
    }
  });
}
  /**
   * Country or state dropdown event
   * @param event
   * @param type
   */

  getSelect(event: any, type: string) {
    if (type == 'state') {
      if (this.countryId !== parseInt(event.value)) {
        // NEW COUNTRY IS SELECTED
        this.stateId = 0;

        this.addAdminFormGroup.patchValue({ state: this.selectValue });
        // this.addAdminFormGroup.patchValue({ city: this.selectValue });
        this.stateList = [];
      }
      this.countryId = parseInt(event.value);
      // this.countryName = event.value.split('#')[1];
      // CALL STATE API
      this.adminService
        .getListApis('state', this.countryId)
        .subscribe((res) => {
          this.stateList = res.data;
          if (this.countryId == 0) {
            // FOR NEW LOCATION
            this.addAdminFormGroup.patchValue({ state: this.selectValue });
            this.stateId = 0;
            // this.stateName = ''
          } else if (this.countryId > 0 && this.stateId > 0) {
            // FOR EDIT COUNTRY AND STATE BOTH ARE SELECTED
            this.addAdminFormGroup.patchValue({ state: this.stateId.toString() });
          } else if (this.countryId > 0 && this.stateId == 0) {
            // WHEN CHANGING COUNTRY
            this.addAdminFormGroup.patchValue({ state: this.selectValue });
          }
        });
    }
  }

  /**
   * Set form value
   * @param data
   */
setFormValue(data: any) {
  data = JSON.parse(data);
  this.editId = data.id;
  this.adminService.getListApis('admin', data.id).subscribe((res) => {
    this.adminRowData = res.data;
    this.countryId = this.adminRowData.countryID;
    this.stateId = this.adminRowData.stateID;

    this.getSelect({ value: this.adminRowData.countryID }, 'state');
    this.getSelect({ value: this.adminRowData.stateID }, 'city');

    this.addAdminFormGroup.patchValue({
      username: this.adminRowData.adminName,
      emailid: this.adminRowData.emailId,
      phoneNumber: this.adminRowData.phoneNumber,
      addressLine1: this.adminRowData.addressLine1,
      addressLine2: this.adminRowData.addressLine2,
      country: this.adminRowData.countryID !== 0 ? this.adminRowData.countryID.toString() : this.selectValue,
      state: this.adminRowData.stateID !== 0 ? this.adminRowData.stateID : this.selectValue,
      cityName: this.adminRowData.cityName,
      zipcode: this.adminRowData.zipcode,
    });
  });
}
  /**
   * Omit special character
   * @param event
   * @returns
   */

  omit_special_char(event: any) {
    let k = event.charCode; //         k = event.keyCode;  (Both can be used)
    return (
      (k > 64 && k < 91) ||
      (k > 96 && k < 123) ||
      k == 8 ||
      k == 32 ||
      (k >= 48 && k <= 57)
    );
  }

  /**
   * Number only
   * @param event
   * @returns
   */

  numberOnly(event: any): boolean {
     const charCode = event.which ?? event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  /**
   * Phone number format
   * @param event
   * @returns
   */

  phoneNumber(event: any) {
    const charCode = event.which ?? event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return;
    }
    let filterValue = (event.target as HTMLInputElement).value;
    this.telephoneNumber = filterValue;
    if (this.telephoneNumber.length == 3) {
      this.telephoneNumber = '(' + this.telephoneNumber + ')' + ' ';
    }
    if (this.telephoneNumber.length == 9) {
      this.telephoneNumber = this.telephoneNumber + '-';
    }
  }
}
