import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import Swal from 'sweetalert2'
import { ToastrService } from 'ngx-toastr'
import { StorageService } from 'src/app/service/storage.service'
import { AdminService } from '../../admin.service'
import { of } from 'rxjs'
import { CommonModule, DatePipe } from '@angular/common'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'
import { ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-add-subscription',
  templateUrl: './add-subscription.component.html',
  styleUrls: ['./add-subscription.component.scss'],
  imports:[
    CommonModule,
    RouterModule,
    SharedMaterialModule,
    ReactiveFormsModule
  ]
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
  showPriceUnitTitle=''
  isUnit:boolean=false
  selectedUnitId: any
  CurrencyList: any
  isChecked: any
  CustomerList: any
  SubscriptionPlanList: any
  customerName: any
  submitted = false
  isSaveBtn: boolean = true
  isUpdateBtn: boolean = false
  customerData: any
  customerId: any
  Title: string = 'Add Subscription Plan'
  ngOnInit(): void {
    /**
     * API Call
     */
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
      this.subscriptionPlanFormGroup.disable()
    } else {
      this.Title = 'Add Subscription Plan'
      this.isSaveBtn = true
      this.isUpdateBtn = false
    }
  }

  subscriptionPlanFormGroup = this.formBuilder.group({
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
        this.subscriptionPlanFormGroup.patchValue({
          customerName: this.subscriptionData.customerName,
        })
      }
      this.subscriptionPlanFormGroup.patchValue({
        subscriptionPlanName: this.subscriptionData.subscriptionPlanName,
      })
      this.subscriptionPlanFormGroup.patchValue({
        subscriptionDetails: this.subscriptionData.subscriptionsDetails,
      })
      this.subscriptionPlanFormGroup.patchValue({
        validfrom: this.subscriptionData.validFrom,
      })
      this.subscriptionPlanFormGroup.patchValue({
        validto: this.subscriptionData.validTo,
      })
      this.subscriptionPlanFormGroup.patchValue({
        price: this.subscriptionData.price,
      })
      if (this.subscriptionData.currencyId) {
        this.selectedCurrency = this.subscriptionData.currencyId
        this.subscriptionPlanFormGroup.patchValue({
          // currencyId: this.subscriptionData.currencyCode,
        })
      }
      if (this.subscriptionData.priceTypeId) {
        this.selectedPriceType = this.subscriptionData.priceTypeId
        this.GetUnits(this.selectedPriceType)
        // this.subscriptionPlanFormGroup.patchValue({
        //   priceTypeId: this.subscriptionData.priceTypeName,
        // })
      }
      if (this.subscriptionData.subscriptionsGroupId) {
        this.selectedSubscriptionGroup = this.subscriptionData.subscriptionsGroupId
        this.subscriptionPlanFormGroup.patchValue({
          // subscriptionsGroupId: this.subscriptionData.subGroup,
        })
      }
      if (this.subscriptionData.isActive == false) {
        this.isChecked = this.subscriptionData.isActive
        this.subscriptionPlanFormGroup.patchValue({
          isActive: this.subscriptionData.isActive,
        })
      }
      if (this.subscriptionData.unitId) {
        this.selectedUnit = this.subscriptionData.unitId
        this.subscriptionPlanFormGroup.patchValue({
          // unitId: this.subscriptionData.unitName,
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
   * Add subscription plan
   */
  saveSubscriptionPlan() {
    this.submitted = true
    if (this.subscriptionPlanFormGroup.invalid) {
      this._toastr.error('Please fill mandatory fields.')
      return
    }
    let formData = this.subscriptionPlanFormGroup.value
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
      allowOutsideClick: false,
      allowEscapeKey: false     
    }).then((result) => {
      if (result.isDismissed) {
        this._adminService.CreateSubscriptionPlan(body).subscribe(
          (res) => {
            if (res) {
              //Do your stuffs...
              this._toastr.success('Record saved successfully.')
              this.subscriptionPlanFormGroup.reset()
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
   * Update subscription plan
   */
  updateSubsccriptionPlan() {
    this.submitted = true

    if (this.subscriptionPlanFormGroup.invalid) {
      this._toastr.error('Please fill mandatory fields.')
      return
    }
    let formData = this.subscriptionPlanFormGroup.value
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
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isDismissed) {
        this._adminService.UpdateSubscriptionPlan(body).subscribe(
          (res) => {
            if (res) {
              //Do your stuffs...
              this._toastr.success('Record update successfully.')
              this.subscriptionPlanFormGroup.reset()
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

  /**
   * Number only
   * @param event
   * @returns
   */
  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false
    }
    return true
  }

  /**
   * Date filter
   * @param d
   * @returns
   */

  dateFilter = (d: any | null) => {
    let validFrom = this.subscriptionPlanFormGroup.value.validfrom
    return validFrom && d > validFrom
  }
  /**
   * Check valid from date
   * @param e
   * @returns
   */

  // checkValidFrom(e: any) {
  //   let validFrom = this.subscriptionPlanFormGroup.value.validfrom
  //   if (!validFrom) {
  //     this._toastr.error('Please select valid from date first.')
  //     this.subscriptionPlanFormGroup.patchValue({ validto: '' })
  //     return
  //   }
  // }
  checkStartDate() {
    const validFrom = this.subscriptionPlanFormGroup.value.validfrom;
    const validTo = this.subscriptionPlanFormGroup.value.validto;
    
    if (!validFrom || !validTo) {
      return;
    }
    
    if (validFrom > validTo) {
      this.subscriptionPlanFormGroup.patchValue({ validto: '' })
      return
    }
  }
  checkValidFrom() {
    let fromDate = this.subscriptionPlanFormGroup.value.validfrom
    if (!fromDate) {
      this._toastr.error('Please select From Date first.')
      this.subscriptionPlanFormGroup.patchValue({ validto: '' })
      return
    }
  }
  dateFilterForStart = (d: any | null) => {
    if (!d) {
      return false;
    }
    
    let selectedDate: any = this.datePipe.transform(
      d,
      'yyyy-MM-ddT' + this.getModifiedTime(),
    )

    let today = new Date()
    let todayDate: any = this.datePipe.transform(
      today,
      'yyyy-MM-ddT' + this.getModifiedTime(),
    )
    return selectedDate >= todayDate
  }
  dateFilterForEnd = (d: any | null) => {
    if (!d) {
      return false;
    }
    
    let selectedDate: any = this.datePipe.transform(
      d,
      'yyyy-MM-ddT' + this.getModifiedTime(),
    )

    let fromDate = this.subscriptionPlanFormGroup.value.validfrom
    if (!fromDate) {
      return false;
    }
    
    let validFromDate: any = this.datePipe.transform(
      fromDate,
      'yyyy-MM-ddT' + this.getModifiedTime(),
    )
    return selectedDate >= validFromDate
  }
  getModifiedTime() {
    let date = new Date()
    let time = this.datePipe.transform(date, 'HH:mm:ss')
    return time
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

  /**
   * Select unit
   * @param event
   * @param id
   */
  selectUnit(event: any, data: any) {
    if (event.isUserInput) {
      this.isUnit=true
      this.selectedUnitId = data.id,
      this.showPriceUnitTitle=data.unitName
    }
  }
}
