import { Component, OnInit } from '@angular/core'
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import Swal from 'sweetalert2'
import { ToastrService } from 'ngx-toastr'
import { StorageService } from 'src/app/service/storage.service'
import { AdminService } from '../../admin.service'
@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss'],
})
export class AddVehicleComponent implements OnInit {
  submitted = false

  isSaveBtn: boolean = true
  isUpdateBtn: boolean = false
  vehicleFormTitle: string = 'Add Vehicle'
  list: any
  vehicleId: any
  vehicleData: any
  modelYearlist: any = []
  // makeList: any
  // modelList: any
  isRFIDAddBtn: boolean = false
  showLoader: boolean = false
  UserId: string | null

  viewMode: boolean = false

  vehicleFormGroup = this.fb.group({
    vin: new FormControl('', [      
      Validators.pattern('[a-z0-9A-Z]{2,20}'),
      Validators.pattern('^[a-zA-Z0-9!@#$%^&*()/-]+$'),
    ]),
    modelyear: new FormControl(''),
    makeName: new FormControl('', [Validators.maxLength(40)]),
    modelName: new FormControl('', [Validators.maxLength(400)]),
    licencePlate: new FormControl('', Validators.maxLength(20)),
    unitNumber: new FormControl('',[Validators.required,Validators.maxLength(20)] ),
    department: new FormControl('', [Validators.maxLength(255)]),
    domicileLocation: new FormControl('', Validators.maxLength(25)),
    vehicleMacAddress: new FormControl('', Validators.maxLength(20)),
    rfidCardAssigned: this.fb.array(
      [this.addRFIDRows(0, '', true)],
      Validators.required,
    ),
  })

  addRFIDRows(id: any, name: any, status: any): FormGroup {
    return new FormGroup({
      id: new FormControl(id ? id : 0),
      name: new FormControl(name, Validators.required),
      isActive: new FormControl(status ? true : false),
    })
  }

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _toastr: ToastrService,
    private _storageService: StorageService,
    private _adminService: AdminService,
    private _activatedRoute: ActivatedRoute,
  ) {
    this.UserId = this._storageService.getLocalData('user_id')
    this.vehicleId = this._activatedRoute.snapshot.queryParams['id']
    let routePath = this._activatedRoute.snapshot.routeConfig?.path

    if (this.vehicleId && routePath != 'view-vehicle') {
      this.vehicleFormTitle = 'Edit Vehicle'
      this.isUpdateBtn = true
      this.isSaveBtn = false
      this.isRFIDAddBtn = true
      this.viewMode = false
    } else if (this.vehicleId && routePath == 'view-vehicle') {
      this.vehicleFormTitle = 'View Vehicle'
      this.isSaveBtn = false
      this.isUpdateBtn = false
      this.vehicleFormGroup.disable()
      this.viewMode = true
    } else {
      this.vehicleFormTitle = 'Add Vehicle'
      this.isSaveBtn = true
      this.isUpdateBtn = false
      this.isRFIDAddBtn = true
      this.viewMode = false
    }
  }

  addRFIDCardAssigned(fbGroup?: FormGroup): void {
    ;(this.vehicleFormGroup.get('rfidCardAssigned') as FormArray).push(
      fbGroup || this.addRFIDRows(0, '', true),
    )
  }

  removeRFIDCardAssigned(index: any) {
    ;(this.vehicleFormGroup.get('rfidCardAssigned') as FormArray).removeAt(
      index,
    )
  }

  getRfidCardFormControls(): any {
    return (this.vehicleFormGroup.get('rfidCardAssigned') as FormArray).controls
  }

  ngOnInit() {
    /**
     * Call API
     */
    // this.GetVehicleModelYearDDLList()
    // this.GetVehicleMakeDDLList()
    // this.GetVehicleModelDDLList()
    let date = new Date()

    let currentYear = date.getFullYear()
    let minYear = currentYear - 20
    for (let i = currentYear; i >= minYear; i--) {
      this.modelYearlist.push(i)
    }

    // console.log(this.modelYearlist)

    if (this.vehicleId) {
      this.getVehicleDetailsById(this.vehicleId)
    }
  }

  /**
   * To add vehicle
   */

  addVehicle() {
    this.submitted = true

    if (this.vehicleFormGroup.invalid) {
      this._toastr.error('Please fill mandatory fields.')
      return
    }
    let formData = this.vehicleFormGroup.value
    const body = {
      vin: formData.vin,
      licencePlate: formData.licencePlate,
      unitNumber: formData.unitNumber,
      department: formData.department,
      domicileLocation: formData.domicileLocation,
      vehicleMacAddress: formData.vehicleMacAddress,
      createdBy: this.UserId,
      modelYear: formData.modelyear==""?null:+formData.modelyear,
      modelName: formData.modelName,
      makeName: formData.makeName,
      RfIdCardsAssigneds: formData.rfidCardAssigned,
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
        this._adminService.CreateVehicle(body).subscribe(
          (res) => {
            if (res.statusCode == 200) {
              //Do your stuffs...
              this._toastr.success('Record saved successfully.')
              this.vehicleFormGroup.reset()
              this.showLoader = false
              this.submitted = false
              this._router.navigate(['admin/vehicles'])
            } else {
              let errorMsg = res.statusMessage
              this._toastr.error(JSON.stringify(errorMsg))
              this.showLoader = false
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
   *
   * Update vehicle
   */

  UpdateVehicle() {
    this.submitted = true

    if (this.vehicleFormGroup.invalid) {
      this._toastr.error('Please fill mandatory fields.')
      return
    }
    let formData = this.vehicleFormGroup.value
    const body = {
      id: this.vehicleId,
      vin: formData.vin,
      licencePlate: formData.licencePlate,
      unitNumber: formData.unitNumber,
      department: formData.department,
      domicileLocation: formData.domicileLocation,
      vehicleMacAddress: formData.vehicleMacAddress,
      isActive: true,
      modifiedBy: this.UserId,
      modelYear: formData.modelyear==""?null:+formData.modelyear,
      modelName: formData.modelName,
      makeName: formData.makeName,
      rfIdCardsAssigneds: formData.rfidCardAssigned,
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
        this._adminService.UpdateVehicle(body).subscribe(
          (res) => {
            if (res.statusCode == 200) {
              //Do your stuffs...
              this._toastr.success('Record update successfully.')
              this.vehicleFormGroup.reset()
              this.showLoader = false
              this.submitted = false
              this._router.navigate(['admin/vehicles'])
            } else {
              let errorMsg = res.statusMessage
              this._toastr.error(JSON.stringify(errorMsg))
              this.showLoader = false
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
   * Get vehicle details by id
   * @param id
   */

  getVehicleDetailsById(id: number) {
    this._adminService.GetAllVehicleById(id).subscribe((res: any) => {
      this.vehicleData = res.data[0]
      this.vehicleFormGroup.patchValue({ vin: this.vehicleData.vin })

      this.vehicleFormGroup.patchValue({
        licencePlate: this.vehicleData.licencePlate,
      })
      this.vehicleFormGroup.patchValue({
        unitNumber: this.vehicleData.unitNumber,
      })
      this.vehicleFormGroup.patchValue({
        department: this.vehicleData.department,
      })
      this.vehicleFormGroup.patchValue({
        domicileLocation: this.vehicleData.domicileLocation,
      })
      this.vehicleFormGroup.patchValue({
        vehicleMacAddress: this.vehicleData.vehicleMacAddress,
      })

      this.vehicleFormGroup.patchValue({
        modelyear: this.vehicleData.modelYear==null?"":this.vehicleData.modelYear,
      })

      this.vehicleFormGroup.patchValue({
        makeName: this.vehicleData.makeName,
      })

      this.vehicleFormGroup.patchValue({
        modelName: this.vehicleData.modelName,
      })
      this.removeRFIDCardAssigned(0)
      const rfid = this.vehicleData?.vehicleRFIDIds
      // [
      //   {
      //     id: 1,
      //     name: 'test',
      //     isActive: true,
      //   },
      //   {
      //     id: 1,
      //     name: 'test',
      //     isActive: false,
      //   },
      // ]

      /**
       * RFID
       */
      rfid.forEach((elem: any) => {
        this.addRFIDCardAssigned(
          this.addRFIDRows(elem.id, elem.name, elem.isActive),
        )
      })
    })
  }

  /**
   *
   * @param event
   * @returns
   * Omit special characters
   */

  omit_special_char(event: any) {
    let k = event.charCode //         k = event.keyCode;  (Both can be used)
    return (
      (k > 64 && k < 91) ||
      (k > 96 && k < 123) ||
      k == 8 ||
      k == 32 ||
      k == 47 ||
      k == 45 ||
      (k >= 48 && k <= 57)
    )
  }
}
