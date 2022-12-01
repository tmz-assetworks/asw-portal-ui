import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
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
  datePipe = new DatePipe('en-US')
  submitted = false
  registrationForm: any
  isSaveBtn: boolean = true

  checked = true
  indeterminate = true
  labelPosition: 'before' | 'after' = 'after'
  disabled = true

  addpricingTitle: string = 'Add Pricing Plan'
  pricePlanId: any
  UserId: string | null
  isUpdateBtn: boolean = false
  showLoader: boolean = false
  selectedPriceTypeId: any
  selectedUnitId: any
  selectedCurrencyId: any
  selectedLevelId: any
  selectedCustomerId: any
  pricingList: any
  currencyList: any
  unitList: any
  levelList: any
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
      this.addpricingTitle = 'Edit Pricing Plan'
      this.isUpdateBtn = true
      this.isSaveBtn = false
    } else if (this.pricePlanId && routePath == 'view-pricing') {
      this.addpricingTitle = 'View Pricing Plan'
      this.isSaveBtn = false
      this.isUpdateBtn = false
      this.addPricingForm.disable()
    } else {
      this.addpricingTitle = 'Add Pricing Plan'
      this.isSaveBtn = true
      this.isUpdateBtn = false
    }
  }

  addPricingForm = this.formBuilder.group({
    customerN: new FormControl('', Validators.required),
    pricingPlanName: new FormControl('', [
      Validators.required,
      Validators.maxLength(40),
    ]),
    // location: new FormControl('', Validators.required),
    description: new FormControl('', Validators.maxLength(250)),
    currencyCode: new FormControl('', Validators.required),
    validFrom: new FormControl('', Validators.required),
    validTo: new FormControl('', Validators.required),
    levelRank: new FormControl('', Validators.required),
    priceTypeId: new FormControl('', Validators.required),
    unitName: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    processPayment: new FormControl(false),
    priceSlot: new FormControl(false),
    parkingFee: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
    ]),
    gracePeriod: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
    ]),
    transactionFees: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
    ]),
    salaryTax: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
    ]),
    salesTax: new FormControl('', [
      Validators.required,
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
    this.getCustomerInfo(0)
    this.GetAllPriceType()
    // this.GetAllUnit()
    this.GetAllCurrencyCode()
    this.GetAllLevel()
    this.CustomerDDL()
    this.GetLocationName()

    if (this.pricePlanId) {
      this.getPricePlanbyid(this.pricePlanId)
    }
  }

  GetCurrencyDDL() {
    this._AdminService.GetCurrencyDDL(this.UserId).subscribe((res: any) => {
      this.currencyList = res.data
    })
  }
  GetAllPriceType() {
    this._AdminService.GetAllPriceType().subscribe((res: any) => {
      this.pricingList = res.data
    })
  }
  GetAllUnit(id: any) {
    this._AdminService.GetAllUnit(id).subscribe((res: any) => {
      this.unitList = res.data
    })
  }
  GetAllCurrencyCode() {
    this._AdminService.GetAllCurrencyCode().subscribe((res: any) => {
      this.currencyList = res.data
    })
  }
  GetAllLevel() {
    this._AdminService.GetAllLevel().subscribe((res: any) => {
      this.levelList = res.data
    })
  }
  CustomerDDL() {
    this._AdminService.CustomerDDL().subscribe((res: any) => {
      this.CustomerList = res.data
    })
  }

  GetLocationName() {
    this._AdminService.GetLocationName().subscribe((res: any) => {
      this.locationList = res.data
    })
  }
  selecCustomerList(event: any, id: any) {
    if (event.isUserInput) {
      this.selectedCustomerId = id
    }
  }

  /**
   * Select Price Type
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

  // selectlocation(event:any, id:any){
  //   if(event.isUserInput) {
  //     this.selectedLocationId= id;
  //   }
  // }

  /**
   * Select Unit
   * @param event
   * @param id
   */
  selectUnit(event: any, id: any) {
    if (event.isUserInput) {
      this.selectedUnitId = id
    }
  }

  /**
   * Select Currency Code
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
  selectLevel(event: any, id: any) {
    if (event.isUserInput) {
      this.selectedLevelId = id
    }
  }

  /**
   * Set Form Value
   * @param data
   */
  // selectCustomer(event: any, id: any) {
  //   if (event.isUserInput) {
  //     this.selectedCustomerId = id;
  //   }
  // }

  /**
   * Create Price Plan
   * @returns
   */

  createPricePlan() {
    this.submitted = true
    if (this.addPricingForm.invalid) {
      this.toastr.error('Please fill mandatory fields.')
      return
    }
    let formData = this.addPricingForm.value

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
      levelId: parseInt(this.selectedLevelId),
      priceTypeId: parseInt(this.selectedPriceTypeId),
      unitId: parseInt(this.selectedUnitId),
      price: parseInt(formData.price),
      parkingFee: parseInt(formData.parkingFee),
      gracePeriod: parseInt(formData.gracePeriod),
      transactionFees: parseInt(formData.transactionFees),
      salaryTax: parseInt(formData.salaryTax),
      salesTax: parseInt(formData.salesTax),
      pricePlanLocationsMapperCommand: this.chargeboxidResponse,
      processPayment: formData.processPayment,
      priceSlot: formData.priceSlot,
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
              this.addPricingForm.reset()
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
   * Update Price Plan
   */

  updatePricePlan() {
    this.submitted = true
    if (this.addPricingForm.invalid) {
      this.toastr.error('Please fill mandatory fields.')
      return
    }

    let formData = this.addPricingForm.value

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
      levelId: this.selectedLevelId,
      priceTypeId: this.selectedPriceTypeId,
      unitId: this.selectedUnitId,
      price: formData.price,
      parkingFee: formData.parkingFee,
      gracePeriod: formData.gracePeriod,
      transactionFees: formData.transactionFees,
      salaryTax: formData.salaryTax,
      salesTax: formData.salesTax,
      processPayment: formData.processPayment,
      priceSlot: formData.priceSlot,
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
              this.addPricingForm.reset()
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
   * Get Price Plan By ID
   * @param id
   */
  getPricePlanbyid(id: number) {
    this._AdminService.getPricePlanbyid(id).subscribe((res: any) => {
      if (res.data) {
        let pricingData = res.data
        // this.addPricingForm.patchValue({ customerName: pricingData.customerId });
        if (pricingData.customerId) {
          // this.customerId = parseInt(pricingData.customerId)
          this.addPricingForm.patchValue({
            customerN: pricingData.customerName,
          })
        }
        this.addPricingForm.patchValue({
          pricingPlanName: pricingData.pricePlanName,
        })
        this.addPricingForm.patchValue({
          description: pricingData.description,
        })

        if (pricingData.currencyCode) {
          this.selectedCurrencyId = parseInt(pricingData.currencyCode)
          this.addPricingForm.patchValue({
            currencyId: pricingData.currencyName,
          })
        }
        this.addPricingForm.patchValue({ validFrom: pricingData.validFrom })
        this.addPricingForm.patchValue({ validTo: pricingData.validTo })
        if (pricingData.levelId) {
          this.selectedLevelId = pricingData.levelId
          this.addPricingForm.patchValue({ levelId: pricingData.levelId })
        }
        if (pricingData.priceTypeId) {
          this.selectedPriceTypeId = pricingData.priceTypeId
          this.GetAllUnit(this.selectedPriceTypeId)
          this.addPricingForm.patchValue({
            priceTypeId: pricingData.pricePlanName,
          })
        }
        if (pricingData.unitId) {
          this.selectedUnitId = pricingData.unitId
          this.addPricingForm.patchValue({ unitId: pricingData.unitId })
        }
        this.addPricingForm.patchValue({ price: pricingData.price })
        this.addPricingForm.patchValue({ parkingFee: pricingData.parkingFess })
        this.addPricingForm.patchValue({
          gracePeriod: pricingData.gracePeriod,
        })
        this.addPricingForm.patchValue({
          transactionFees: pricingData.transactionFess,
        })
        this.addPricingForm.patchValue({ salaryTax: pricingData.salaryTax })
        this.addPricingForm.patchValue({ salesTax: pricingData.salesTax })
        this.selectedLocationId = pricingData.locationIdResponse

        if (this.selectedLocationId) {
          this.getChargeboxIdByLocationsId(this.selectedLocationId)
          this.locationIdResponse = pricingData.locationIdResponse
        }
        if (pricingData.processPayment) {
          this.addPricingForm.patchValue({
            processPayment: pricingData.processPayment,
          })
        }
        if (pricingData.priceSlot) {
          this.addPricingForm.patchValue({
            priceSlot: pricingData.priceSlot,
          })
        }

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
    let validFrom = this.addPricingForm.value.validFrom
    if (!validFrom) {
      this.toastr.error('Please select valid from date first.')
      this.addPricingForm.patchValue({ validTo: '' })
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
    this.addPricingForm.patchValue({ validTo: '' })
    // }
  }
  /**
   * date filter for valid to date
   * @param d
   * @returns
   */

  dateFilterForStart = (d: any | null) => {
    let today = new Date()
    return d < today
  }
  dateFilterForEnd = (d: any | null) => {
    let validTo = this.addPricingForm.value.validFrom

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

        this.addPricingForm.patchValue({ customerN: this.customerName })
        this.customerId = res.data[0].id
      }
    })
  }

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
}
