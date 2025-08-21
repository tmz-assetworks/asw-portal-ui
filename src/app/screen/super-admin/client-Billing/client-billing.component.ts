

import { Component, OnInit } from '@angular/core';
import { ClientBilling } from '../client-Billing/client-billing.model';
import { ClientBillingService } from '../client-Billing/client-billing.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-client-billing',
  templateUrl: './client-billing.component.html',
  styleUrls: ['./client-billing.component.scss']
})
export class ClientBillingComponent implements OnInit {
   submitted = false;
  registrationForm: any;
  disableSelect = new FormControl(false);
  adminData: any;
  saveBtn: boolean = true;
  saveBtnValue: any;
  clientBillings: ClientBilling[] = [];
  title: string = 'Add Client Billing';
  editId = 0;
  customerId= 1;
   UserId: any;
  selectedBilling: ClientBilling | null = null;
  isEditMode = false;
  adminRowData: any
  PlugList: any
  isActive: boolean = false;
  today = new Date();
  newBilling: ClientBilling = {
    customerId: 1,
    planName: '',
    description: '',
    price: 0,
    chargerTypeId: 0
    
  };

  months = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' },
  ];
  
  startYears: number[] = [];
  endYears: number[] = [];

  constructor(private clientBillingService: ClientBillingService,
   private formBuilder: FormBuilder,
   private toastr: ToastrService,
   private _location: Location,
   private _storageService: StorageService
   
  ) { 
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
      this.title = 'Add Client Billing';
    }

   const currentYear = new Date().getFullYear();

    // Generate years for Start Date (current year to 100 years back)
    for (let year = currentYear; year >= currentYear - 100; year--) {
      this.startYears.push(year);
    }

    // Generate years for End Date (current year to 50 years forward)
    for (let year = currentYear; year <= currentYear + 50; year++) {
      this.endYears.push(year);
    }
   
  }

  ngOnInit(): void {
    this.GetPlugType()
     // When startMonth changes
  this.addAdminFormGroup.get('startMonth')?.valueChanges.subscribe(() => {
    this.resetEndMonthIfNeeded();
  });

 

  // When endYear changes
  this.addAdminFormGroup.get('endYear')?.valueChanges.subscribe(() => {
    this.resetEndMonthIfNeeded();
  });
  }

  private resetEndMonthIfNeeded(): void {
  const startYear = this.addAdminFormGroup.get('startYear')?.value;
  const endYear = this.addAdminFormGroup.get('endYear')?.value;
  const startMonth = this.addAdminFormGroup.get('startMonth')?.value;
  const endMonth = this.addAdminFormGroup.get('endMonth')?.value;

  // If years are different, always reset endMonth
  if (startYear && endYear && startYear !== endYear) {
    if (endMonth) {
      this.addAdminFormGroup.get('endMonth')?.reset('');
    }
  }

  // If same year but endMonth < startMonth → reset
  if (startYear && endYear && startYear === endYear) {
    if (endMonth && endMonth < startMonth) {
      this.addAdminFormGroup.get('endMonth')?.reset('');
    }
  }
}
    // Method to disable months in the end date dropdown
  isEndMonthDisabled(monthValue: number): boolean {
  const startMonth = this.addAdminFormGroup.get('startMonth')?.value;
  const startYear = this.addAdminFormGroup.get('startYear')?.value;
  const endYear = this.addAdminFormGroup.get('endYear')?.value;

  // No start month → don't disable anything
  if (!startMonth) {
    return false;
  }

  // If same year, disable end months before start month
  if (startYear && endYear && startYear === endYear) {
    return monthValue < startMonth;
  }

  // If end year not yet chosen → still disable months before start month
  if (!endYear) {
    return monthValue < startMonth;
  }

  // If end year is in the future → no restriction
  return false;
}




  // CREATE
  createBilling(): void {
   let formField = this.addAdminFormGroup.value;
    this.submitted = true;

     if (
      this.addAdminFormGroup.value.organizationName == '0' ||
      this.addAdminFormGroup.value.city == '0'
    ) {
      this.toastr.error('Please fill mandatory fields.');
      return;
    }
    if (this.addAdminFormGroup.invalid) {
      this.toastr.error('Please fill mandatory fields.');
      return;
    }

    if (this.editId == 0) {
          let body = {
  customerId: 1,
  planName: formField.planName,
  price: formField.price,
  chargerTypeId: parseInt(formField.chargerTypeId),
  startYear: formField.startYear,
  endYear: formField.endYear,
  startMonth: formField.startMonth,
  endMonth: formField.endMonth,
  isActive: true,
  description: formField.description,
  userId: this.UserId
           
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
          }).then((result) => {
            if (result.isDismissed) {
              this.clientBillingService.createClientBilling(body).subscribe({
                next: (res) => {
                  if (res.StatusCode === 200) {
                    sessionStorage.removeItem('orgUserId');
                    this.toastr.success(res.StatusMessage);
                    this._location.back();
                  } else {
                    this.toastr.error(res.StatusMessage);
                    return;
                  }
                },
                error: (error) => {
                  if (error.status == 400) {
                    let errorMsg = error.error.errors;
    
                    this.toastr.error(errorMsg);
                  }
                },
              });
            }
          });
        } else {
          let body = {
            id: this.editId,
       customerId: 1,
       planName: formField.planName,
       price: formField.price,
       chargerTypeId: parseInt(formField.chargerTypeId),
       startYear: formField.startYear,
       endYear: formField.endYear,
      startMonth: formField.startMonth,
      endMonth: formField.endMonth,
        isActive: formField.isActive,
        description: formField.description,
       userId: this.UserId
           
           
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
          }).then((result) => {
            if (result.isDismissed) {
              this.clientBillingService.updateClientBilling(body).subscribe({
                next: (res) => {
                  if (res.StatusCode == 200) {
                     this.toastr.success(res.StatusMessage);
                    this._location.back();
                    
                  } else {
                    this.toastr.error(res.statusMessage);
                  }
                },
                error: (error) => {
                  if (error.status == 400) {
                    let errorMsg = error.error.errors;
                    this.toastr.error(errorMsg);
                  }
                },
              });
            }
          });
        }

    
  }

   /**
     * Form group
     */
  
    addAdminFormGroup = this.formBuilder.group({
      planName: new FormControl('', [Validators.required]),
      price: new FormControl('', Validators.required),
      description: new FormControl(''),
      chargerTypeId: new FormControl('', Validators.required),
         // Controls for Start Date
      startMonth: ['', Validators.required],
      startYear: ['', Validators.required],
      // Controls for End Date
      endMonth: ['', Validators.required],
      endYear: ['', Validators.required],
      isActive: [false]
    
    });


  

    /**
   * Set form value
   * @param data
   */
setFormValue(data: any) {
  try {
    const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
    this.editId = parsedData.id;

    this.clientBillingService.getClientBillingById(parsedData.id).subscribe((res) => {
      this.adminRowData = res.data;
     this.addAdminFormGroup.patchValue({
        planName: this.adminRowData.planName,
        price: this.adminRowData.price,
        chargerTypeId: this.adminRowData.chargerTypeId,
        description: this.adminRowData.description,
        // Directly use the month and year values from the API response
        startMonth: this.adminRowData.startMonth,
        startYear: this.adminRowData.startYear,
        endMonth: this.adminRowData.endMonth,
        endYear: this.adminRowData.endYear,
        isActive: this.adminRowData.isActive
      });

    });
  } catch (err) {
    console.error("Error parsing data:", err);
  }
}

toggleStatus() {
   console.log(this.isActive,"ISActive+++");
   
  this.isActive = !this.isActive;
}
    omit_special_char(event: any) {
    let k = event.charCode
    return (
      (k > 64 && k < 91) ||
      (k > 96 && k < 123) ||
      k == 8 ||
      k == 32 ||
      (k >= 48 && k <= 57)
    )
  }

  selectChargerType(event: any, id: number): void {
  if (event.isUserInput) {
    this.addAdminFormGroup.patchValue({
      chargerTypeId: id
    });
   
  }
}

GetPlugType() {
    const pBody = {
      userId: this.UserId,
    }
    this.clientBillingService.GetPlugType(pBody).subscribe((res: any) => {
      this.PlugList = res.data
    })
  }

  // READ (select for update)
  onSelectBilling(billing: ClientBilling): void {
    this.selectedBilling = { ...billing }; // Create a copy to avoid direct modification
    this.isEditMode = true;
  }




}