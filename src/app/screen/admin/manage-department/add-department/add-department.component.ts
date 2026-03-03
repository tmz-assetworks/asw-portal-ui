import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/service/storage.service';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module';
import { AdminService } from '../../admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-department',
  imports:[
    RouterModule,
    CommonModule,
    SharedMaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-department.component.html',
  styleUrl: './add-department.component.scss',
})
export class AddDepartmentComponent  implements OnInit{
  datePipe = new DatePipe('en-US')
  submitted = false
  registrationForm: any
  isSaveBtn: boolean = true
  showPriceUnitTitle = ''
  isUnit: boolean = false
  checked = true
  indeterminate = true
  labelPosition: 'before' | 'after' = 'after'
  disabled = true
  title: string = 'Add Department'
  departmentId: any
  UserId: string | null
  UserEmail: string | null
  isUpdateBtn: boolean = false
  showLoader: boolean = false
  selectedPriceTypeId: any
  selectedUnitId: any
  selectedCurrencyId: any
  selectedCustomerId: any
  pricingList: any
  currencyList: any
  unitList: any

  CustomerList: any
  locationList: any
  chargerList: any
  selectedLocationId: any
  locationIdResponse: any = []
  chargeboxidResponse: any = []
  customerData: any
  customerName: any
  customerId: any
  selectedChargerTypeId: any
  Pluglist: any

  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private toastr: ToastrService,
    private _storageService: StorageService,
    private _activatedRoute: ActivatedRoute,
    private _AdminService: AdminService,
  ) {
    this.UserId = this._storageService.getLocalData('user_id')
    this.departmentId = this._activatedRoute.snapshot.queryParams['id']
    let routePath = this._activatedRoute.snapshot.routeConfig?.path
    this.UserEmail = localStorage.getItem('userEmail');
    if (this.departmentId && routePath == 'edit-department') {
      this.title = 'Edit Department'
      this.isUpdateBtn = true
      this.isSaveBtn = false
    } else if (this.departmentId && routePath == 'view-department') {
      this.title = 'View Department'
      this.isSaveBtn = false
      this.isUpdateBtn = false
      this.departmentFormGroup.disable()
    } else {
      this.title = 'Add Department'
      this.isSaveBtn = true
      this.isUpdateBtn = false
    }
  }

  /**
   * Price plan form group
   */

  departmentFormGroup = this.formBuilder.group({
    departmentName: new FormControl('', Validators.required),
  })

   ngOnInit() {
    if (this.departmentId) {
      this.getDepartmentById(this.departmentId)
    }
  }

  /**
   * Get price plan details by id
   * @param id
   */
  getDepartmentById(id: number) {
    this._AdminService.getDepartmentById(id).subscribe((res: any) => {
      if (res.data) {
        let departmentData = res.data;
        if (departmentData.departmentName) {
          this.departmentFormGroup.patchValue({
            departmentName: departmentData.departmentName,
          })
        }
      }
    })
  }

  /**
   * Omit special characters
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
  * Update price plan
  */
  
  updateDepartment() {

    this.submitted = true
      if (this.departmentFormGroup.invalid) {
        this.toastr.error('Please fill mandatory fields.')
        return
      }
      let formData = this.departmentFormGroup.value;

      const pBody = {
        Id: this.departmentId,
        createdBy: this.UserEmail,
        departmentName: formData.departmentName,
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
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isDismissed) {
          this._AdminService.UpdateDepartment(pBody).subscribe(
            (res) => {
              if (res.id == -1) {
               this.AlreadyExist()
              }
              else{this.handleSuccess()}
            },
            (error: any) => this.handleError(error),
          )
        }
      })
    }
    
    createDepartment() {
      
      this.submitted = true
      if (this.departmentFormGroup.invalid) {
        this.toastr.error('Please fill mandatory fields.')
        return
      }
      let formData = this.departmentFormGroup.value;
      
  
      const pBody = {
        createdBy: this.UserEmail,
        departmentName: formData.departmentName,
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
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isDismissed) {
          this._AdminService.CreateDepartment(pBody).subscribe(
            (res) => {
              if (res.id == -1) {
               this.AlreadyExist()
              }
              else{this.handleSuccess()}
            },
            (error: any) => this.handleError(error),
          )
        }
      })
    }

    /**
   * show success and error msg
   */
  private AlreadyExist(): void {
  this.toastr.warning('Record Already Avaiable.')
  this.departmentFormGroup.reset()
  this.submitted = false
  this._router.navigate(['admin/department'])
  }
  /**
   * show success and error msg
   */
  private handleSuccess(): void {
  this.toastr.success('Record saved successfully.')
  this.departmentFormGroup.reset()
  this.submitted = false
  this._router.navigate(['admin/department'])
  }

  private handleError(error: any): void {
     if (error.status === 400) {
       let errorMsg = '';
      
       if (error.error?.errors) {
         const validationErrors = error.error.errors;
        
         errorMsg = Object.values(validationErrors)
           .flat()
           .map((err: unknown) =>
             typeof err === 'string' ? err : JSON.stringify(err)
           )
           .join('<br/>');
         
       } else if (error.error?.statusCode === 200) {
         errorMsg = error.error.statusMessage;
        
       } else {
         errorMsg = typeof error.error?.errors === 'string'
           ? error.error.errors
           : JSON.stringify(error.error?.errors);
       }
     
       this.toastr.error(errorMsg);
       this.showLoader = false;
     }
}

}
