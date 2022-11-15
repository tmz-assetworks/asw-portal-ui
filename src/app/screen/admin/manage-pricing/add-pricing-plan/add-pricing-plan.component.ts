import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import Swal from 'sweetalert2'
import { ToastrService } from 'ngx-toastr'
import { StorageService } from 'src/app/service/storage.service'

@Component({
  selector: 'app-add-pricing-plan',
  templateUrl: './add-pricing-plan.component.html',
  styleUrls: ['./add-pricing-plan.component.scss'],
})
export class AddPricingPlanComponent implements OnInit {
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

  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private toastr: ToastrService,
    private _storageService: StorageService,
    private _activatedRoute: ActivatedRoute,
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
      this.addpricingform.disable()
    } else {
      this.addpricingTitle = 'Add Pricing Plan'
      this.isSaveBtn = true
      this.isUpdateBtn = false
    }
  }

  addpricingform = this.formBuilder.group({
    customername: new FormControl('', Validators.required),
    pricingplanname: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    currencycode: new FormControl('', Validators.required),
    validfrom: new FormControl('', Validators.required),
    validto: new FormControl('', Validators.required),
    level: new FormControl('', Validators.required),
    pricetype: new FormControl('', Validators.required),
    unit: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    parkingfee: new FormControl('', Validators.required),
    graceperiod: new FormControl('', Validators.required),
    transaction: new FormControl('', Validators.required),
    taxprocessed: new FormControl('', Validators.required),
    salestax: new FormControl('', Validators.required),
    // phonenumber: new FormControl('', [
    //   Validators.required,
    //   Validators.minLength(8),
    // ]),
  })

  /**
   * Set Form Value
   * @param data
   */
  setLocationData(data: any) {
    this.addpricingform.patchValue({ customername: data.customername })
  }

  type_lists = new FormControl('')
  alteration_types = [
    'Location A',
    'Location B',
    'Location C',
    'Location D',
    'Location E',
  ]
  ngOnInit() {
    // this.onSubmit();
  }

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
        this.toastr.success('Record has been registered on success.')
      }
    })
  }

  btnClick() {
    this._router.navigateByUrl('admin/manage-operator/')
  }
}
