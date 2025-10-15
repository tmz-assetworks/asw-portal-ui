import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { SuperAdminService } from '../../super-admin.service';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { StorageService } from 'src/app/service/storage.service';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.scss'],
  imports:[SharedMaterialModule,ReactiveFormsModule,CommonModule,RouterModule]
})
export class CreateAdminComponent implements OnInit {
  submitted = false;
  registrationForm: any;
  disableSelect = new FormControl(false);
  adminData: any;
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
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private _superadminService: SuperAdminService,
    private _location: Location,
    private _storageService: StorageService,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.role = localStorage.getItem('role') || '';
    this.editId = 0;
    this.UserId = this._storageService.getLocalData('user_id');
    this.saveBtn =
      sessionStorage.getItem('saveBtn') !== undefined &&
      sessionStorage.getItem('saveBtn') !== null &&
      sessionStorage.getItem('saveBtn') !== ''
        ? JSON.parse(JSON.stringify(sessionStorage.getItem('saveBtn')))
        : true;
    this.adminData =
      sessionStorage.getItem('adminData') !== undefined &&
      sessionStorage.getItem('adminData') !== null
        ? sessionStorage.getItem('adminData')
        : '';

    this.saveBtnValue = this.saveBtn;
    this.saveBtnValue = JSON.parse(this.saveBtnValue);

    if (
      this.saveBtnValue &&
      this.adminData !== undefined &&
      this.adminData !== null &&
      this.adminData !== ''
    ) {
      this.title = 'Edit Admin User';
      this.setFormValue(this.adminData);
    } else if (
      !this.saveBtnValue &&
      this.adminData !== undefined &&
      this.adminData !== null &&
      this.adminData !== ''
    ) {
      this.title = 'View Admin User';
      this.setFormValue(this.adminData);
      this.addAdminFormGroup.disable();
    } else {
      this.title = 'Add Admin User';
    }
  }

  /**
   * Form group
   */

  addAdminFormGroup = this.formBuilder.group({
    username: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
    ]),
    emailid: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', Validators.required),
    organizationName: new FormControl(Validators.required),
    addressLine1: new FormControl('', [
      Validators.maxLength(255),
    ]),
    addressLine2: new FormControl('', [Validators.maxLength(255)]),
    country: new FormControl(this.selectValue, Validators.required),
    state: new FormControl(this.selectValue, Validators.required),
    cityName: new FormControl(''),
    zipcode: new FormControl(''),
  });

  ngOnInit() {
    /**
     * Get org user from local storage
     */
    this.orgUserId = sessionStorage.getItem('orgUserId') || '';
    this._superadminService.getListApi('country').subscribe((res) => {
      this.countryList = res.data;
    });
    /**
     * Call API
     */
    this._superadminService.getListApi('org').subscribe((res) => {
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
  addUpdateAdmin() {
    let formField = this.addAdminFormGroup.value;

    this.submitted = true;
    if (this.addAdminFormGroup.invalid) {
      this.toastr.error('Please fill mandatory fields.');
      return;
    }
    if (this.editId == 0) {
      let body = {
        displayName: this.role,
        objectid: '',
        userPrincipalName: '',
        mailNickname: '',
        isActive: true,
        emailId: formField.emailid,
        name: formField.username,
        phoneNumber: formField.phoneNumber,
        addressLine1: formField.addressLine1,
        addressLine2: formField.addressLine2,
        countryID: Number.parseInt(formField.country ?? '0'),
        customerID: this.customerId,
        stateID: Number.parseInt(formField.state ?? '0'),
        cityName: formField.cityName,
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
      };
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
          //Do your stuffs...
          this._superadminService.CreateUser(body).subscribe({
            next: (res) => {
              if (res.statusCode === 200) {
                sessionStorage.removeItem('orgUserId');
                this.toastr.success(res.statusMessage);
                this._location.back();
              } else {
                this.toastr.error(res.statusMessage);
                return;
              }
            },
            error: (error) => {
              if (error.status == 400) {
                let errorMsg = error.error.errors;

                this.toastr.error(errorMsg);
                // this.showLoader = false
              }
            },
          });
        }
      });
    } else {
      let body = {
        id: this.editId,
        emailId: formField.emailid,
        name: formField.username,
        phoneNumber: formField.phoneNumber,
        addressLine1: formField.addressLine1,
        addressLine2: formField.addressLine2,
        countryID: Number.parseInt(formField?.country ?? '0'),
        customerID: this.customerId,
        stateID: Number.parseInt(formField?.state ?? '0'),
        cityName: formField.cityName,
        zipCode: formField.zipcode,
        modifiedBy: this.UserId,
        userRolesCommand: [
          {
            id: this.editId,
            roleID: 3,
          },
        ],
      };

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
          // this.toastr.success("Record has been registered on success.")
          //Do your stuffs...
          this._superadminService.UpdateUser(body).subscribe({
            next: (res) => {
              if (res.statusCode == 400) {
                this.toastr.error(res.statusMessage);
              } else {
                this.toastr.success(res.statusMessage);
                this._location.back();
              }
            },
            error: (error) => {
              if (error.status == 400) {
                let errorMsg = error.error.errors;
                this.toastr.error(errorMsg);
                // this.showLoader = false
              }
            },
          });
        }
      });
    }
  }

  /**
   * Country or state dropdown event
   * @param event
   * @param type
   */

  getSelected(event: any, type: string) {
    if (type == 'state') {
      if (this.countryId !== Number.parseInt(event.value)) {
        // NEW COUNTRY IS SELECTED
        this.stateId = 0;

        this.addAdminFormGroup.patchValue({ state: this.selectValue });
        this.stateList = [];
      }
      this.countryId = Number.parseInt(event.value);
      // CALL STATE API
      this._superadminService
        .getListApi('state', this.countryId)
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
    const body = {};
    data = JSON.parse(data);
    this.editId = data.id;
    this._superadminService.getListApi('admin', data.id).subscribe((res) => {
      this.adminRowData = res.data;

      this.countryId = this.adminRowData.countryID;
      this.stateId = this.adminRowData.stateID;

      this.getSelected(
        {
          value: this.adminRowData.countryID,
        },
        'state'
      );
      this.getSelected(
        {
          value: this.adminRowData.stateID,
        },
        'city'
      );

      this.addAdminFormGroup.patchValue({
        username: this.adminRowData.adminName,
      });
      this.addAdminFormGroup.patchValue({
        emailid: this.adminRowData.emailId,
      });
      this.addAdminFormGroup.patchValue({
        phoneNumber: this.adminRowData.phoneNumber,
      });

      this.addAdminFormGroup.patchValue({
        addressLine1: this.adminRowData.addressLine1,
      });
      this.addAdminFormGroup.patchValue({
        addressLine2: this.adminRowData.addressLine2,
      });

      this.addAdminFormGroup.patchValue({
        country:
          this.adminRowData.countryID !== 0
            ? this.adminRowData.countryID.toString()
            : this.selectValue,
      });
      this.addAdminFormGroup.patchValue({
        state:
          this.adminRowData.stateID !== 0
            ? this.adminRowData.stateID
            : this.selectValue,
      });

      this.addAdminFormGroup.patchValue({
        cityName: this.adminRowData.cityName,
      });

      this.addAdminFormGroup.patchValue({
        zipcode: this.adminRowData.zipcode,
      });

      // this.addAdminFormGroup.patchValue({
      //   organizationName:
      //     this.adminRowData.customerID !== 0
      //       ? this.adminRowData.customerID.toString()
      //       : 0,
      // });
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
    const charCode = event.which ? event.which : event.keyCode;
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
    const charCode = event.which ? event.which : event.keyCode;
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
