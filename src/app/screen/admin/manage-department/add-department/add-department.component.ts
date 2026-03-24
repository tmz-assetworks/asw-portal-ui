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
  imports: [
    RouterModule,
    CommonModule,
    SharedMaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-department.component.html',
  styleUrl: './add-department.component.scss',
})
export class AddDepartmentComponent implements OnInit {

  datePipe = new DatePipe('en-US');
  submitted = false;
  isSaveBtn = true;
  title = 'Add Department';
  departmentId: any;
  UserId: string | null;
  UserEmail: string | null;
  isUpdateBtn = false;
  showLoader = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly _router: Router,
    private readonly toastr: ToastrService,
    private readonly _storageService: StorageService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _AdminService: AdminService
  ) {

    this.UserId = this._storageService.getLocalData('user_id');
    this.departmentId = this._activatedRoute.snapshot.queryParams['id'];
    const routePath = this._activatedRoute.snapshot.routeConfig?.path;
    this.UserEmail = localStorage.getItem('userEmail');

    if (this.departmentId && routePath === 'edit-department') {
      this.title = 'Edit Department';
      this.isUpdateBtn = true;
      this.isSaveBtn = false;
    } else if (this.departmentId && routePath === 'view-department') {
      this.title = 'View Department';
      this.isSaveBtn = false;
      this.isUpdateBtn = false;
      this.departmentFormGroup.disable();
    }
  }

  /**
   * Form Group
   */
  departmentFormGroup = this.formBuilder.group({
    departmentName: new FormControl('', Validators.required),
    deptkWhRate: new FormControl('', Validators.required),
  });

  ngOnInit() {
    if (this.departmentId) {
      this.getDepartmentById(this.departmentId);
    }
  }

  /**
   * Get Department By Id
   */
  getDepartmentById(id: number) {
    this._AdminService.getDepartmentById(id).subscribe((res: any) => {
      if (res?.data?.departmentName) {
        this.departmentFormGroup.patchValue({
          departmentName: res.data.departmentName,
          deptkWhRate: res.data.deptkWhRate
        });
      }
    });
  }

  /**
   * Omit special characters
   */
  omit_special_char(event: any) {
    const k = event.charCode;
    return (
      (k > 64 && k < 91) ||
      (k > 96 && k < 123) ||
      k === 8 ||
      k === 32 ||
      (k >= 48 && k <= 57)
    );
  }

  /**
   * Validate Form
   */
  private validateForm(): boolean {
    this.submitted = true;

    if (this.departmentFormGroup.invalid) {
      this.toastr.error('Please fill mandatory fields.');
      return false;
    }

    return true;
  }

  /**
   * SweetAlert Confirmation
   */
  private confirmAction(callback: () => void): void {
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
        callback();
      }
    });
  }

  /**
   * Handle API response
   */
  private handleApiResponse(res: any): void {
    if (res.id === -1) {
      this.AlreadyExist();
    } else {
      this.handleSuccess();
    }
  }

  /**
   * Update Department
   */
  updateDepartment() {
    if (!this.validateForm()) return;
    const formData = this.departmentFormGroup.value;
    const deptRate = Number(
         String(formData.deptkWhRate).replaceAll(/[^0-9.]/g, '')
       );
    const pBody = {
      Id: this.departmentId,
      createdBy: this.UserEmail,
      departmentName: formData.departmentName,
      deptkWhRate: deptRate
    };

    this.confirmAction(() => {
      this._AdminService.UpdateDepartment(pBody).subscribe(
        (res) => this.handleApiResponse(res),
        (error: any) => this.handleError(error)
      );
    });
  }

  /**
   * Create Department
   */
  createDepartment() {
       if (!this.validateForm()) return;
       const formData = this.departmentFormGroup.value;
       const deptRate = Number(
         String(formData.deptkWhRate).replaceAll(/[^0-9.]/g, '')
       );
       const pBody = {
         createdBy: this.UserEmail,
         departmentName: formData.departmentName,
         deptkWhRate: deptRate
       };
       this.confirmAction(() => {
         this._AdminService.CreateDepartment(pBody).subscribe(
           (res) => this.handleApiResponse(res),
           (error: any) => this.handleError(error)
         );
       });
  }
  


  formatUsd(): void {
  const control = this.departmentFormGroup.get('deptkWhRate');

  if (!control) {
    return;
  }

  const rawValue = control.value;

  if (!rawValue) {
    return;
  }

  const numericValue = Number(String(rawValue).replaceAll(/[^0-9.]/g, ''));

  if (Number.isNaN(numericValue)) {
    return;
  }

  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(numericValue);

  control.setValue(formatted, { emitEvent: false });
}



  /**
   * Already exists message
   */
  private AlreadyExist(): void {
    this.toastr.warning('Record Already Avaiable.');
    this.departmentFormGroup.reset();
    this.submitted = false;
    this._router.navigate(['admin/department']);
  }

  /**
   * Success message
   */
  private handleSuccess(): void {
    this.toastr.success('Record saved successfully.');
    this.departmentFormGroup.reset();
    this.submitted = false;
    this._router.navigate(['admin/department']);
  }

  /**
   * Error Handler
   */
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