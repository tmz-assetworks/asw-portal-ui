import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import Swal from 'sweetalert2'
import { ToastrService } from 'ngx-toastr'
import { StorageService } from 'src/app/service/storage.service'
import { AdminService } from '../../admin.service'
import { elementAt } from 'rxjs'
import { CommonModule, DatePipe } from '@angular/common'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'
import { InputTooltipDirective } from 'src/app/shared/directive/input-tooltip.directive'

@Component({
  selector: 'app-add-pricing-plan',
  templateUrl: './add-pricing-plan.component.html',
  styleUrls: ['./add-pricing-plan.component.scss'],
  imports:[
    RouterModule,
    CommonModule,
    SharedMaterialModule,
    ReactiveFormsModule,
    InputTooltipDirective
  ]
})
export class AddPricingPlanComponent implements OnInit {
  /**
   * Declare varibles
   */
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
  title: string = 'Add Pricing Plan'
  pricePlanId: any
  UserId: string | null
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
    this.pricePlanId = this._activatedRoute.snapshot.queryParams['id']
    let routePath = this._activatedRoute.snapshot.routeConfig?.path

    if (this.pricePlanId && routePath == 'edit-pricing') {
      this.title = 'Edit Pricing Plan'
      this.isUpdateBtn = true
      this.isSaveBtn = false
    } else if (this.pricePlanId && routePath == 'view-pricing') {
      this.title = 'View Pricing Plan'
      this.isSaveBtn = false
      this.isUpdateBtn = false
      this.pricingPlanFormGroup.disable()
    } else {
      this.title = 'Add Pricing Plan'
      this.isSaveBtn = true
      this.isUpdateBtn = false
    }
  }
  /**
   * Price plan form group
   */

  pricingPlanFormGroup = this.formBuilder.group({
    customerN: new FormControl('', Validators.required),
    pricingPlanName: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
    description: new FormControl('', Validators.maxLength(500)),
    currencyCode: new FormControl('', Validators.required),
    validFrom: new FormControl('', Validators.required),
    validTo: new FormControl('', Validators.required),
    chargerTypeId: new FormControl('', Validators.required),
    priceTypeId: new FormControl('', Validators.required),
    unitName: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.maxLength(10)]),   
    parkingFee: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
    ]),
    gracePeriod: new FormControl('',[
      Validators.maxLength(10),
    ]),
    transactionFees: new FormControl('', [
      // Validators.required,
      Validators.maxLength(10),
    ]),
    
    salesTax: new FormControl('', [
      // Validators.required,
      Validators.maxLength(10),
    ]),
    locationId: new FormControl('', Validators.required),

    // chargeboxidResponse: new FormControl([], Validators.required),
    // pricePlanLocationsMapperCommand: [
    //   {
    //     locationId: [],
    //     chargerId: [],
    //   },
    // ],
  })

  // addLocationRows(locationId: any, chargerId: any): FormGroup {
  //   return new FormGroup({
  //     locationId: new FormControl(locationId),
  //     chargerId: new FormControl(chargerId),
  //   });
  // }

  ngOnInit() {
    /**
     * API call
     */
    this.getCustomerInfo(0)
    this.GetAllPriceType()
    // this.GetAllUnit()
    this.GetAllCurrencyCode()
    this.CustomerDDL()
    this.GetLocationName()
    this.GetPlugType()

    if (this.pricePlanId) {
      this.getPricePlanbyid(this.pricePlanId)
    }
  }
  /**
   * Get currency DDL
   */
  GetCurrencyDDL() {
    this._AdminService.GetCurrencyDDL(this.UserId).subscribe((res: any) => {
      this.currencyList = res.data
    })
  }
  /**
   * Get all price types
   */
  GetAllPriceType() {
    this._AdminService.GetAllPriceType().subscribe((res: any) => {
      this.pricingList = res.data
    })
  }
  /**
   * Get all units
   * @param id
   */
  GetAllUnit(id: any) {
    this._AdminService.GetAllUnit(id).subscribe((res: any) => {
      this.unitList = res.data
    })
  }
  /**
   * Get All currency code
   */
  GetAllCurrencyCode() {
    this._AdminService.GetAllCurrencyCode().subscribe((res: any) => {
      this.currencyList = res.data
    })
  }


  /**
   * Get customer DDL
   */
  CustomerDDL() {
    this._AdminService.CustomerDDL().subscribe((res: any) => {
      this.CustomerList = res.data
    })
  }

  /**
   * Get location name
   */
  GetLocationName() {
    this._AdminService.GetLocationName().subscribe((res: any) => {
      this.locationList = res.data
    })
  }
   GetPlugType() {
    const pBody = {
      userId: this.UserId,
    }
    this._AdminService.GetPlugType(pBody).subscribe((res: any) => {
      this.Pluglist = res.data
       this.Pluglist.unshift({ id: -1, plugTypeName: 'ALL' });
    })
  }

  /**
   * Select customer list
   * @param event
   * @param id
   */
  selectCustomerList(event: any, id: any) {
    if (event.isUserInput) {
      this.selectedCustomerId = id
    }
  }

  /**
   * Select price type
   * @param event
   * @param id
   */
  selectPriceType(event: any, id: any) {
    if (event.isUserInput) {
      this.selectedPriceTypeId = id
      this.selectedUnitId = ''
      this.GetAllUnit(this.selectedPriceTypeId)
    }
  }

  /**
   * Select unit
   * @param event
   * @param id
   */
  selectUnit(event: any, data: any) {
    if (event.isUserInput) {
      this.isUnit = true
      ;(this.selectedUnitId = data.id),
        (this.showPriceUnitTitle = data.unitName)
    }
  }

  /**
   * Select currency code
   * @param event
   * @param id
   */
  selectCurrencyCode(event: any, id: any) {
    if (event.isUserInput) {
      this.selectedCurrencyId = id
    }
  }
/**
   * Select Level
   * 
   * @param event
   * @param id
   */  
  selectChargerType(event: any, id: any) {
    if (event.isUserInput) {
      this.selectedChargerTypeId = id
    }
  }

  
  /**
   * Add price plan
   * @returns
   */
  gracePeriod = 0

  createPricePlan() {
    
    this.submitted = true
    if (this.pricingPlanFormGroup.invalid) {
      this.toastr.error('fields.')
      return
    }
    let formData = this.pricingPlanFormGroup.value;
    this.locationIdResponse.forEach((elem: any) => {
      let index = this.chargeboxidResponse.findIndex(
        (x: any) => x.locationId === elem,
      )
      if (index === -1) {
        this.chargeboxidResponse.push({
          locationId: elem,
        })
      }
    })

    const pBody = {
      userId: this.UserId,
      customerId: this.customerId,
      pricingPlanName: formData.pricingPlanName,
      description: formData.description,
      currencyId: Number.parseInt(this.selectedCurrencyId),
      validFrom: formData.validFrom
        ? this.datePipe.transform(
            formData.validFrom,
            'yyyy-MM-ddT' + this.getModifiedDate(),
          )
        : '',
      validTo: formData.validTo
        ? this.datePipe.transform(
            formData.validTo,
            'yyyy-MM-ddT' + this.getModifiedDate(),
          )
        : '',
      
      priceTypeId: this.selectedPriceTypeId,
      unitId: this.selectedUnitId,
      price: formData.price ? formData.price : 0,
      parkingFee: formData.parkingFee ? formData.parkingFee : 0,
      gracePeriod: formData.gracePeriod ? +formData.gracePeriod : 0,
      transactionFees: formData.transactionFees ? +formData.transactionFees : 0,
      tax: 0,
      salesTax: formData.salesTax ? +formData.salesTax : 0,
      pricePlanLocationsMapperCommand: this.chargeboxidResponse,
      processPayment: true,
      priceSlot: true,
      isActive: true,
      chargerTypeId: this.selectedChargerTypeId,
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
        this._AdminService.CreatePricePlan(pBody).subscribe(
          (res) => {
            if (res) {
             this.handleSuccess()
            }
          },
          (error: any) => this.handleError(error),
        )
      }
    })
  }

  /**
   * Update price plan
   */

  updatePricePlan() {
    this.submitted = true
    if (this.pricingPlanFormGroup.invalid) {
      this.toastr.error('Please fill mandatory fields.')
      return
    }

    let formData = this.pricingPlanFormGroup.value

    this.chargeboxidResponse = this.chargeboxidResponse.filter((x: any) =>
    this.locationIdResponse.includes(x.locationId)
  );
    this.locationIdResponse.forEach((elem: any) => {      
      let index = this.chargeboxidResponse.findIndex(
        (x: any) => x.locationId === elem,
      )
      if (index === -1) {
        this.chargeboxidResponse.push({
          locationId: elem,
        })
      }
    })
    const body = {
      id: this.pricePlanId,
      customerId: this.customerId,
      pricingPlanName: formData.pricingPlanName,
      description: formData.description,
      userId: this.UserId,
      currencyId: this.selectedCurrencyId,
      chargerTypeId: this.selectedChargerTypeId,
      validFrom: formData.validFrom
        ? this.datePipe.transform(
            formData.validFrom,
            'yyyy-MM-ddT' + this.getModifiedDate(),
          )
        : '',
      validTo: formData.validTo
        ? this.datePipe.transform(
            formData.validTo,
            'yyyy-MM-ddT' + this.getModifiedDate(),
          )
        : '',
      priceTypeId: this.selectedPriceTypeId,
      unitId: this.selectedUnitId,
      price: formData.price,
      parkingFee: formData.parkingFee,
      gracePeriod: formData.gracePeriod ? +formData.gracePeriod : 0,
      transactionFees: formData.transactionFees ? +formData.transactionFees : 0,
      tax:  0,
      salesTax: formData.salesTax ? +formData.salesTax : 0,
      processPayment: true,
      priceSlot: true,
      isActive: true,
      pricePlanLocationsMapperCommand: this.chargeboxidResponse,
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
        this._AdminService.UpdatePricePlan(body).subscribe(
          (res) => {
            if (res) {
              this.handleSuccess()
            }
          },
          (error: any) => this.handleError(error),
        )
      }
    })
  }
  /**
   * show success and error msg
   */
  private handleSuccess(): void {
  this.toastr.success('Record saved successfully.')
  this.pricingPlanFormGroup.reset()
  this.submitted = false
  this._router.navigate(['admin/pricing'])
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


  /**
   * Get price plan details by id
   * @param id
   */
  getPricePlanbyid(id: number) {
    this._AdminService.getPricePlanbyid(id).subscribe((res: any) => {
      if (res.data) {
        let pricingData = res.data;
        if (pricingData.customerId) {
          this.pricingPlanFormGroup.patchValue({
            customerN: pricingData.customerName,
          })
        }
        this.pricingPlanFormGroup.patchValue({
          pricingPlanName: pricingData.pricePlanName,
        })
        this.pricingPlanFormGroup.patchValue({
          description: pricingData.description,
        })

        if (pricingData.currencyCode) {
          this.selectedCurrencyId = Number.parseInt(pricingData.currencyCode);
          this.pricingPlanFormGroup.patchValue({
            currencyCode: pricingData.currencyName,
          })
        }
        if (pricingData.chargerTypeId) {
          this.selectedChargerTypeId = pricingData.chargerTypeId;
          this.pricingPlanFormGroup.patchValue({
            chargerTypeId: pricingData.chargerTypeId,
          })
        }
        this.pricingPlanFormGroup.patchValue({
          validFrom: pricingData.validFrom,
        })
        this.pricingPlanFormGroup.patchValue({ validTo: pricingData.validTo })
        
        if (pricingData.priceTypeId) {
          this.selectedPriceTypeId = pricingData.priceTypeId
          this.GetAllUnit(this.selectedPriceTypeId)
          this.pricingPlanFormGroup.patchValue({
            priceTypeId: pricingData.pricePlanName,
          })
        }
        if (pricingData.unitId) {
          this.selectedUnitId = pricingData.unitId
          this.pricingPlanFormGroup.patchValue({ unitName: pricingData.unitId })
        }
        this.pricingPlanFormGroup.patchValue({ price: pricingData.price })
        this.pricingPlanFormGroup.patchValue({
          parkingFee: pricingData.parkingFess,
        })
        if (pricingData.gracePeriod == 0) {
          this.pricingPlanFormGroup.patchValue({
            gracePeriod: '',
          })
        } else {
          this.pricingPlanFormGroup.patchValue({
            gracePeriod: pricingData.gracePeriod,
          })
        }

        if (pricingData.transactionFess == 0) {
          this.pricingPlanFormGroup.patchValue({
            transactionFees: '',
          })
        } else {
          this.pricingPlanFormGroup.patchValue({
            transactionFees: pricingData.transactionFess,
          })
        }

        

        if (pricingData.salesTax == 0) {
          this.pricingPlanFormGroup.patchValue({ salesTax: '' })
        } else {
          this.pricingPlanFormGroup.patchValue({
            salesTax: pricingData.salesTax,
          })
        }

        this.selectedLocationId = pricingData.locationIdResponse

        if (this.selectedLocationId) {
          this.getChargeboxIdByLocationsId(this.selectedLocationId)
          this.locationIdResponse = pricingData.locationIdResponse
        }
      
        this.chargeboxidResponse = pricingData.pricePlanLocationsMapperobj

        
      }
    })
  }

  /**
   * Select Location
   * @param event
   * @param id
   */
  onSelectLocation(event: any, id: any) {
    if (event.isUserInput) {
      var index = this.locationIdResponse.indexOf(id)
      if (index === -1) {
        this.locationIdResponse.push(id)
      } else {
        this.locationIdResponse.splice(index, 1)
      }
    }
  }

  /**
   * Get Charge Box Id by Location
   */
  getChargeboxIdByLocationsId(id: any) {
    const body = {
      locationIds: id,
    }
    this._AdminService
      .GetChargeboxIdByLocationsId(body)
      .subscribe((res: any) => {
        if (res.statusCode == 200 && res.data.legends != 0) {
          this.chargerList = res.data
        }
      })
  }
  /**
   * On select charger
   * @param event
   * @param data
   */
  

  /**
   * date filter for valid to date
   * @param d
   * @returns
   */

  // dateFilter = (d: any | null) => {
  //   let validFrom = this.addPricingForm.value.validFrom

  //   return d > validFrom
  // }
  /**
   * Check valid from date
   * @param e
   * @returns
   */

  checkValidFrom(e: any) {
    let validFrom = this.pricingPlanFormGroup.value.validFrom
    if (!validFrom) {
      this.toastr.error('Please select valid from date first.')
      this.pricingPlanFormGroup.patchValue({ validTo: '' })
      return
    }
  }
  /**
   * check start date validation
   */
  checkStartDate() {
    // if (
    //   this.addPricingForm.value.validFrom > this.addPricingForm.value.validTo
    // ) {
    this.pricingPlanFormGroup.patchValue({ validTo: '' })
    // }
  }

  /**
   * Date filter
   * @param d
   * @returns
   */

  dateFilterForStart = (d: any | null) => {
    let today = new Date()
    return d < today
  }
  dateFilterForEnd = (d: any | null) => {
    let validTo = this.pricingPlanFormGroup.value.validFrom

    let checkDate = validTo ? new Date(validTo) : new Date()
    return d > checkDate
  }

  numbersDecimalOnly(event: any) {
    let charCode = event.which ? event.which : event.keyCode
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
      return false
    return true
  }

  getCustomerInfo(id: any) {
    this._AdminService.Getcustomer(id).subscribe((res) => {
      if (res.data) {
        // this.selectedCustomerId = res.data[0].id
        this.customerData = res.data[0]
        this.customerName = res.data[0].userName

        this.pricingPlanFormGroup.patchValue({ customerN: this.customerName })
        this.customerId = res.data[0].id
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

  getModifiedDate() {
    let date = new Date()
    let time = this.datePipe.transform(date, 'HH:mm:ss')
    return time
  }
  // CONNECTOR TYPE
  
}
