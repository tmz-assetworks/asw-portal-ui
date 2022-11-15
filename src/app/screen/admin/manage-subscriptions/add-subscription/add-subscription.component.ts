import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import Swal from 'sweetalert2'
import { ToastrService } from 'ngx-toastr'
import { StorageService } from 'src/app/service/storage.service'
import { AdminService } from '../../admin.service'

@Component({
  selector: 'app-add-subscription',
  templateUrl: './add-subscription.component.html',
  styleUrls: ['./add-subscription.component.scss'],
})
export class AddSubscriptionComponent implements OnInit {
  UserId: string | null
  subsPlanId: any
  subscriptionData: any
  showLoader: boolean = false
  ngOnInit(): void {
    if (this.subsPlanId) {
      this.getSubsccriptionPlanById(this.subsPlanId)
    }
  }
  submitted = false
  isSaveBtn: boolean = true
  isUpdateBtn: boolean = false
  Title: string = 'Add Subscription Plan'

  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private _toastr: ToastrService,
    private _storageService: StorageService,
    private _activatedRoute: ActivatedRoute,
    private _adminService: AdminService,
  ) {
    this.UserId = this._storageService.getLocalData('user_id')
    this.subsPlanId = this._activatedRoute.snapshot.queryParams['id']
    let routePath = this._activatedRoute.snapshot.routeConfig?.path

    if (this.subsPlanId && routePath == 'edit-subscription') {
      this.Title = 'Edit Subscription Plan'
      this.isUpdateBtn = true
      this.isSaveBtn = false
    } else if (this.subsPlanId && routePath == 'view-subscription') {
      this.Title = 'View Subscription Plan'
      this.isSaveBtn = false
      this.isUpdateBtn = false
      this.addSubscriptionPlanForm.disable()
    } else {
      this.Title = 'Add Subscription Plan'
      this.isSaveBtn = true
      this.isUpdateBtn = false
    }
  }

  addSubscriptionPlanForm = this.formBuilder.group({
    customerName: new FormControl('', Validators.required),
    subscriptionPlanName: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    currencyCode: new FormControl('', Validators.required),
    validfrom: new FormControl('', Validators.required),
    validto: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    unit: new FormControl('', Validators.required),
    value: new FormControl('', Validators.required),
    subGroup: new FormControl('', Validators.required),
  })
  /**
   * Set Form Value
   * @param data
   */
  setLocationData(data: any) {
    this.addSubscriptionPlanForm.patchValue({ customername: data.customername })
  }

  type_lists = new FormControl('')
  alteration_types = [
    'Location A',
    'Location B',
    'Location C',
    'Location D',
    'Location E',
  ]

  alertWithSuccess() {
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
    }).then((result) => {
      if (result.isDismissed) {
        this._toastr.success('Record saved successfully.')
      }
    })
  }
  /**
   *
   * @param id
   * Get Subscription Plans By ID
   */
  getSubsccriptionPlanById(id: number) {
    this._adminService.SubscriptionplanById(id).subscribe((res) => {
      this.subscriptionData = res.data[0]
      if (this.subscriptionData.customerId)
        this.addSubscriptionPlanForm.patchValue({
          customerName: this.subscriptionData.customerName,
        })

      this.addSubscriptionPlanForm.patchValue({
        subscriptionPlanName: this.subscriptionData.subscriptionPlanName,
      })
      this.addSubscriptionPlanForm.patchValue({
        description: this.subscriptionData.description,
      })
      this.addSubscriptionPlanForm.patchValue({
        validfrom: this.subscriptionData.validFrom,
      })
      this.addSubscriptionPlanForm.patchValue({
        validto: this.subscriptionData.validTo,
      })
      this.addSubscriptionPlanForm.patchValue({
        value: this.subscriptionData.subscriptionsValue,
      })
    })
  }

  /**
   * Add Subscription Plan
   */
  saveSubscriptionPlan() {
    this.submitted = true

    if (this.addSubscriptionPlanForm.invalid) {
      this._toastr.error('Please fill mandatory fields.')
      return
    }
    let formData = this.addSubscriptionPlanForm.value
    const body = {
      customerId: 1,
      subscriptionPlanName: formData.subscriptionPlanName,
      description: formData.description,
      currencyId: 1,
      validFrom: formData.validfrom,
      validTo: formData.validto,
      statusId: 1,
      subscriptionsGroupId: 1,
      subscriptionsDetails: 'string',
      subscriptionsValue: formData.value,
      isActive: true,
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
    }).then((result) => {
      if (result.isDismissed) {
        this._adminService.CreateSubscriptionPlan(body).subscribe(
          (res) => {
            if (res) {
              //Do your stuffs...
              this._toastr.success('Record saved successfully.')
              this.addSubscriptionPlanForm.reset()
              this.showLoader = false
              this.submitted = false
              this._router.navigate(['admin/subscriptions-plans'])
            }
          },
          (error) => {
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
   * Update Subscription Plan
   */
  updateSubsccriptionPlan() {
    let formData = this.addSubscriptionPlanForm.value
    const body = {
      id: 1,
      customerId: 1,
      subscriptionPlanName: 'string',
      description: 'string',
      currencyId: 1,
      validFrom: '2022-10-14T10:17:40.958Z',
      validTo: '2022-10-14T10:17:40.958Z',
      statusId: 1,
      subscriptionsGroupId: 1,
      subscriptionsDetails: 'string',
      subscriptionsValue: 'string',
      isActive: true,
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
    }).then((result) => {
      if (result.isDismissed) {
        this._adminService.UpdateSubscriptionPlan(body).subscribe(
          (res) => {
            if (res) {
              //Do your stuffs...
              this._toastr.success('Record update successfully.')
              this.addSubscriptionPlanForm.reset()
              this.showLoader = false
              this.submitted = false
              this._router.navigate(['admin/subscriptions-plans'])
            }
          },
          (error) => {
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
}
