import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import Swal from 'sweetalert2'
import { ToastrService } from 'ngx-toastr'
import { StorageService } from 'src/app/service/storage.service'
import { AdminService } from '../../admin.service'
import { elementAt } from 'rxjs'
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-add-pricing-plan',
  templateUrl: './add-pricing-plan.component.html',
  styleUrls: ['./add-pricing-plan.component.scss'],
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
  selectedConnectorId: any
  selectedCustomerId: any
  pricingList: any
  currencyList: any
  unitList: any

  CustomerList: any
  locationList: any
  chargerList: any
  selectedLocationId: any
  selectedChargerId: any
  locationIdResponse: any = []
  chargeboxidResponse: any = []
  customerData: any
  customerName: any
  customerId: any
  connectorTypeList: any

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
      Validators.maxLength(40),
    ]),
    description: new FormControl('', Validators.maxLength(250)),
    currencyCode: new FormControl('', Validators.required),
    validFrom: new FormControl('', Validators.required),
    validTo: new FormControl('', Validators.required),
    connectorType: new FormControl('', Validators.required),
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
    chargerId: new FormControl(''),

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
    // this.GetAllLevel()
    this.GetConnectorType()
    this.CustomerDDL()
    this.GetLocationName()

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
  // /**
  //  * Get all level
  //  */
  // GetAllLevel() {
  //   this._AdminService.GetAllLevel().subscribe((res: any) => {
  //     this.levelList = res.data
  //   })
  // }

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
   * @param event
   * @param id
   */
  selectConnectorType(event: any, id: any) {
    if (event.isUserInput) {
      this.selectedConnectorId = id
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
      this.toastr.error('Please fill mandatory fields.')
      return
    }
    let formData = this.pricingPlanFormGroup.value

    this.locationIdResponse.forEach((elem: any) => {
      let index = this.chargeboxidResponse.findIndex(
        (x: any) => x.locationId === elem,
      )
      if (index === -1) {
        this.chargeboxidResponse.push({
          locationId: elem,
          chargerId: 0,
        })
      }
    })

    const pBody = {
      userId: this.UserId,
      customerId: this.customerId,
      pricingPlanName: formData.pricingPlanName,
      description: formData.description,
      currencyId: parseInt(this.selectedCurrencyId),
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
      connectorId: parseInt(this.selectedConnectorId),
      priceTypeId: parseInt(this.selectedPriceTypeId),
      unitId: parseInt(this.selectedUnitId),
      price: parseInt(formData.price),
      parkingFee: parseInt(formData.parkingFee),
      // gracePeriod: parseInt(formData.gracePeriod),
      gracePeriod: formData.gracePeriod ? +formData.gracePeriod : 0,
      //transactionFees: parseInt(formData.transactionFees),
      transactionFees: formData.transactionFees ? +formData.transactionFees : 0,
      //salaryTax: parseInt(formData.salaryTax),
      tax: 0,
      // salesTax: parseInt(formData.salesTax),
      salesTax: formData.salesTax ? +formData.salesTax : 0,
      pricePlanLocationsMapperCommand: this.chargeboxidResponse,
      processPayment: true,
      priceSlot: true,
      isActive: true,
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
        this._AdminService.CreatePricePlan(pBody).subscribe(
          (res) => {
            if (res) {
              //Do your stuffs...
              this.toastr.success('Record saved successfully.')
              this.pricingPlanFormGroup.reset()
              // this.showLoader = false
              this.submitted = false
              this._router.navigate(['admin/pricing'])
            }
          },

          (error: any) => {
            if (error.status == 400) {
              if (error.error.statusCode == 200) {
                let errorMsg = error.error.statusMessage
                this.toastr.error(errorMsg)
                this.showLoader = false
              } else {
                let errorMsg = error.error.errors
                this.toastr.error(errorMsg)
                this.showLoader = false
              }
            }
          },
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

    this.locationIdResponse.forEach((elem: any) => {
      let index = this.chargeboxidResponse.findIndex(
        (x: any) => x.locationId === elem,
      )
      if (index === -1) {
        this.chargeboxidResponse.push({
          locationId: elem,
          chargerId: 0,
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
      connectorId: this.selectedConnectorId,
      priceTypeId: this.selectedPriceTypeId,
      unitId: this.selectedUnitId,
      price: formData.price,
      parkingFee: formData.parkingFee,
      gracePeriod: formData.gracePeriod ? +formData.gracePeriod : 0,
      //transactionFees: parseInt(formData.transactionFees),
      transactionFees: formData.transactionFees ? +formData.transactionFees : 0,
      tax:  0,
      // salesTax: parseInt(formData.salesTax),
      salesTax: formData.salesTax ? +formData.salesTax : 0,
      // gracePeriod: formData.gracePeriod,
      // transactionFees: formData.transactionFees,
      // salaryTax: formData.salaryTax,
      // salesTax: formData.salesTax,
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
    }).then((result) => {
      if (result.isDismissed) {
        this._AdminService.UpdatePricePlan(body).subscribe(
          (res) => {
            if (res) {
              //Do your stuffs...
              this.toastr.success('Record saved successfully.')
              this.pricingPlanFormGroup.reset()
              // this.showLoader = false
              this.submitted = false
              this._router.navigate(['admin/pricing'])
            }
          },

          (error: any) => {
            if (error.status == 400) {
              if (error.error.statusCode == 200) {
                let errorMsg = error.error.statusMessage
                this.toastr.error(errorMsg)
                this.showLoader = false
              } else {
                let errorMsg = error.error.errors
                this.toastr.error(errorMsg)
                this.showLoader = false
              }
            }
          },
        )
      }
    })
  }

  /**
   * Get price plan details by id
   * @param id
   */
  getPricePlanbyid(id: number) {
    this._AdminService.getPricePlanbyid(id).subscribe((res: any) => {
      if (res.data) {
        let pricingData = res.data
        // this.pricingPlanFormGroup.patchValue({ customerName: pricingData.customerId });
        if (pricingData.customerId) {
          // this.customerId = parseInt(pricingData.customerId)
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
          this.selectedCurrencyId = parseInt(pricingData.currencyCode)
          this.pricingPlanFormGroup.patchValue({
            currencyId: pricingData.currencyName,
          })
        }
        this.pricingPlanFormGroup.patchValue({
          validFrom: pricingData.validFrom,
        })
        this.pricingPlanFormGroup.patchValue({ validTo: pricingData.validTo })
        if (pricingData.connectorId) {
          this.selectedConnectorId = pricingData.connectorId
          this.pricingPlanFormGroup.patchValue({
            connectorType: pricingData.connectorType,
          })
        }
        if (pricingData.priceTypeId) {
          this.selectedPriceTypeId = pricingData.priceTypeId
          this.GetAllUnit(this.selectedPriceTypeId)
          this.pricingPlanFormGroup.patchValue({
            priceTypeId: pricingData.pricePlanName,
          })
        }
        if (pricingData.unitId) {
          this.selectedUnitId = pricingData.unitId
          this.pricingPlanFormGroup.patchValue({ unitId: pricingData.unitId })
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
        if (pricingData.processPayment) {
          this.pricingPlanFormGroup.patchValue({
            processPayment: pricingData.processPayment,
          })
        }
        if (pricingData.priceSlot) {
          this.pricingPlanFormGroup.patchValue({
            priceSlot: pricingData.priceSlot,
          })
        }
        // if(pricingData.isActive){
        //   this.addPricingForm.patchValue({isActive: pricingData.isActive})
        // }

        this.chargeboxidResponse = pricingData.pricePlanLocationsMapperobj

        let chargerArray: any[] = []
        this.chargeboxidResponse.forEach((elem: any) => {
          chargerArray.push(elem.chargerId)

          this.selectedChargerId = chargerArray
        })
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
        // val not found, pushing onto array
        this.locationIdResponse.push(id)
        this.getChargeboxIdByLocationsId(this.locationIdResponse)
      } else {
        this.locationIdResponse.splice(index, 1)
        this.getChargeboxIdByLocationsId(this.locationIdResponse)
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
  onSelectCharger(event: any, data: any) {
    if (event.isUserInput) {
      if (this.chargeboxidResponse.length > 0) {
        let index = this.chargeboxidResponse.findIndex(
          (x: any) => x.chargerId === data.id,
        )

        if (index == -1) {
          this.chargeboxidResponse.push({
            locationId: parseInt(data.locationId),
            chargerId: parseInt(data.id),
          })
        } else {
          // console.log('charger pop')

          this.chargeboxidResponse.splice(index, 1)
        }
      } else {
        this.chargeboxidResponse.push({
          locationId: parseInt(data.locationId),
          chargerId: parseInt(data.id),
        })
      }
    }
  }

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

    let checkDate = new Date(validTo)
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

  GetConnectorType() {
    const pBody = {
      userId: this.UserId,
    }
    this._AdminService.GetConnectorType(pBody).subscribe((res) => {
      this.connectorTypeList = res.data
    })
  }
}
