import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import Swal from 'sweetalert2'
import { ToastrService } from 'ngx-toastr'
import { StorageService } from 'src/app/service/storage.service'
import { AdminService } from '../../admin.service'
import { of } from 'rxjs'
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-add-subscription',
  templateUrl: './add-subscription.component.html',
  styleUrls: ['./add-subscription.component.scss'],
})
export class AddSubscriptionComponent implements OnInit {
  datePipe = new DatePipe('en-US')
  UserId: string | null
  subsPlanId: any
  subscriptionData: any
  showLoader: boolean = false
  selectedCurrency: any
  selectedPriceType: any
  selectedUnit: any
  selectedCustomer: any
  selectedSubscriptionGroup: any
  CurrencyList: any
  isChecked: any
  CustomerList: any
  SubscriptionPlanList: any
  customerName: any
  ngOnInit(): void {
    this.getCustomerInfo(0)
    this.GetCurrencyCode()
    this.GetCustomers()
    this.GetSubscriptionGroup()
    this.GetPricePlanType()
    // this.GetUnits()
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
    subscriptionPlanName: new FormControl('', [
      Validators.required,
      Validators.maxLength(40),
    ]),
    subscriptionDetails: new FormControl('', Validators.maxLength(250)),
    currencyCode: new FormControl('', Validators.required),
    validfrom: new FormControl('', Validators.required),
    validto: new FormControl('', Validators.required),
    priceType: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    subGroup: new FormControl('0'),
    isActive: new FormControl(true),
    unit: new FormControl('', Validators.required),
  })

  /**
   *
   * @param id
   * Get Subscription Plans By ID
   */
  selectedCustomerName: any
  getSubsccriptionPlanById(id: number) {
    this._adminService.SubscriptionplanById(id).subscribe((res) => {
      this.subscriptionData = res.data[0]
      if (this.subscriptionData.customerId) {
        this.subscriptionData.customerId = this.customerId
        this.addSubscriptionPlanForm.patchValue({
          customerName: this.subscriptionData.customerName,
        })
      }
      this.addSubscriptionPlanForm.patchValue({
        subscriptionPlanName: this.subscriptionData.subscriptionPlanName,
      })
      this.addSubscriptionPlanForm.patchValue({
        subscriptionDetails: this.subscriptionData.subscriptionsDetails,
      })
      this.addSubscriptionPlanForm.patchValue({
        validfrom: this.subscriptionData.validFrom,
      })
      this.addSubscriptionPlanForm.patchValue({
        validto: this.subscriptionData.validTo,
      })
      this.addSubscriptionPlanForm.patchValue({
        price: this.subscriptionData.price,
      })
      if (this.subscriptionData.currencyId) {
        this.selectedCurrency = this.subscriptionData.currencyId
        this.addSubscriptionPlanForm.patchValue({
          currencyId: this.subscriptionData.currencyCode,
        })
      }
      if (this.subscriptionData.priceTypeId) {
        this.selectedPriceType = this.subscriptionData.priceTypeId
        this.GetUnits(this.selectedPriceType)
        // this.addSubscriptionPlanForm.patchValue({
        //   priceTypeId: this.subscriptionData.priceTypeName,
        // })
      }
      if (this.subscriptionData.subscriptionsGroupId) {
        this.selectedSubscriptionGroup = this.subscriptionData.subscriptionsGroupId
        this.addSubscriptionPlanForm.patchValue({
          subscriptionsGroupId: this.subscriptionData.subGroup,
        })
      }
      if (this.subscriptionData.isActive == false) {
        this.isChecked = this.subscriptionData.isActive
        this.addSubscriptionPlanForm.patchValue({
          isActive: this.subscriptionData.isActive,
        })
      }
      if (this.subscriptionData.unitId) {
        this.selectedUnit = this.subscriptionData.unitId
        this.addSubscriptionPlanForm.patchValue({
          unitId: this.subscriptionData.unitName,
        })
      }
    })
  }
  GetCurrencyCode() {
    const pBody = {
      userId: this.UserId,
    }
    this._adminService.GetCurrencyCode(pBody).subscribe((res: any) => {
      this.CurrencyList = res.data
    })
  }
  GetCustomers() {
    const pBody = {
      userId: this.UserId,
    }
    this._adminService.GetCustomers(pBody).subscribe((res: any) => {
      this.CustomerList = res.data
    })
  }
  GetPricePlanType() {
    this._adminService.GetAllPriceType().subscribe((res: any) => {
      this.SubscriptionPlanList = res.data
    })
  }
  SubscriptionGroupList: any
  GetSubscriptionGroup() {
    const pBody = {
      userId: this.UserId,
    }
    this._adminService.GetSubscriptionGroup(pBody).subscribe((res: any) => {
      this.SubscriptionGroupList = res.data
    })
  }
  UnitList: any
  GetUnits(id: any) {
    this._adminService.GetAllUnit(id).subscribe((res: any) => {
      this.UnitList = res.data
    })
  }
  customerData: any
  customerId: any
  getCustomerInfo(id: any) {
    this._adminService.Getcustomer(id).subscribe((res) => {
      if (res.data) {
        this.customerData = res.data[0]
        this.customerName = res.data[0].userName
        this.customerId = res.data[0].id
      }
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
      customerId: this.customerId,
      subscriptionPlanName: formData.subscriptionPlanName,
      currencyId: formData.currencyCode,
      validFrom: formData.validfrom
        ? this.datePipe.transform(
            formData.validfrom,
            'yyyy-MM-ddT' + this.getModifiedDate(),
          )
        : '',
      validTo: formData.validto
        ? this.datePipe.transform(
            formData.validto,
            'yyyy-MM-ddT' + this.getModifiedDate(),
          )
        : '',
      subscriptionsGroupId: formData.subGroup,
      subscriptionsDetails: formData.subscriptionDetails,
      price: formData.price,
      priceTypeId: formData.priceType,
      unitId: formData.unit,
      isActive: formData.isActive,
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
    this.submitted = true

    if (this.addSubscriptionPlanForm.invalid) {
      this._toastr.error('Please fill mandatory fields.')
      return
    }
    let formData = this.addSubscriptionPlanForm.value
    const body = {
      id: this.subsPlanId,
      customerId: this.customerId,
      subscriptionPlanName: formData.subscriptionPlanName,
      currencyId: formData.currencyCode,
      validFrom: formData.validfrom
        ? this.datePipe.transform(
            formData.validfrom,
            'yyyy-MM-ddT' + this.getModifiedDate(),
          )
        : '',
      validTo: formData.validto
        ? this.datePipe.transform(
            formData.validto,
            'yyyy-MM-ddT' + this.getModifiedDate(),
          )
        : '',
      subscriptionsGroupId: formData.subGroup,
      subscriptionsDetails: formData.subscriptionDetails,
      price: formData.price,
      priceTypeId: formData.priceType,
      unitId: formData.unit,
      modifiedBy: this.UserId,
      isActive: formData.isActive,
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
              // this.showLoader = false
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
  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false
    }
    return true
  }

  /**
   * date filter for valid to date
   * @param d
   * @returns
   */

  dateFilter = (d: any | null) => {
    let validFrom = this.addSubscriptionPlanForm.value.validfrom
    return d > validFrom
  }
  /**
   * Check valid from date
   * @param e
   * @returns
   */

  checkValidFrom(e: any) {
    let validFrom = this.addSubscriptionPlanForm.value.validfrom
    if (!validFrom) {
      this._toastr.error('Please select valid from date first.')
      this.addSubscriptionPlanForm.patchValue({ validto: '' })
      return
    }
  }
  selectType(event: any, id: any) {
    if (event.isUserInput) {
      this.selectedPriceType = id
      this.selectedUnit = ''
      this.GetUnits(this.selectedPriceType)
    }
  }

  getModifiedDate() {
    let date = new Date()
    let time = this.datePipe.transform(date, 'HH:mm:ss')
    return time
  }
}
