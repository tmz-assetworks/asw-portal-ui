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
import { ReturnStatement } from '@angular/compiler'
@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss'],
})
export class AddVehicleComponent implements OnInit {
  submitted = false
  registrationForm: any
  isSaveBtn: boolean = true
  isUpdateBtn: boolean = false
  addvehicleTitle: string = 'Add Vehicle'
  list: any
  vehicleId: any
  vehicleData: any
  modelYearlist: any
  makeList: any
  modelList: any
  isRFIDAddBtn: boolean = false
  showLoader: boolean = false
  UserId: string | null

  selectedMakeId: any
  selectedModelId: any
  selectedYearId: any

  addVehicleForm = this.fb.group({
    vin: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9A-Z]{2,20}'),
      Validators.pattern('^[a-zA-Z0-9!@#$%^&*()]+$'),
    ]),
    modelyear: new FormControl('', Validators.required),
    make: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    licencePlate: new FormControl('', Validators.maxLength(20)),
    department: new FormControl('', [Validators.maxLength(255)]),
    domicileLocation: new FormControl('', Validators.maxLength(25)),
    vehicleMacAddress: new FormControl('', Validators.maxLength(20)),
    rfidCardAssigned: this.fb.array([], Validators.required),
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
      this.addvehicleTitle = 'Edit Vehicle'
      this.isUpdateBtn = true
      this.isSaveBtn = false
      this.isRFIDAddBtn = true
    } else if (this.vehicleId && routePath == 'view-vehicle') {
      this.addvehicleTitle = 'View Vehicle'
      // this.isRFIDAddBtn=false
      this.isSaveBtn = false
      this.isUpdateBtn = false
      this.addVehicleForm.disable()
    } else {
      this.addvehicleTitle = 'Add Vehicle'
      this.isSaveBtn = true
      this.isUpdateBtn = false
      this.isRFIDAddBtn = true
    }
  }

  addRFIDCardAssigned(fbGroup?: FormGroup): void {
    ;(this.addVehicleForm.get('rfidCardAssigned') as FormArray).push(
      fbGroup || this.addRFIDRows(0, '', null),
    )
  }

  removeRFIDCardAssigned(index: any) {
    ;(this.addVehicleForm.get('rfidCardAssigned') as FormArray).removeAt(index)
  }

  getRfidCardFormControls(): any {
    return (this.addVehicleForm.get('rfidCardAssigned') as FormArray).controls
  }

  ngOnInit() {
    /**
     * Call API
     */
    this.GetVehicleModelYearDDLList()
    this.GetVehicleMakeDDLList()
    this.GetVehicleModelDDLList()

    if (this.vehicleId) {
      this.GetAllVehicleById(this.vehicleId)
    }
  }

  /**
   * Add Vehicle
   */

  addVehicle() {
    this.submitted = true
    debugger

    console.log(this.addVehicleForm.get('rfidCardAssigned'))

    if (this.addVehicleForm.invalid) {
      this._toastr.error('Please fill mandatory fields.')
      return
    }
    let formData = this.addVehicleForm.value
    const body = {
      id: 0,
      vin: formData.vin,
      licencePlate: formData.licencePlate,
      department: formData.department,
      domicileLocation: formData.domicileLocation,
      vehicleMacAddress: formData.vehicleMacAddress,
      createdBy: this.UserId,
      vehicleModelYearid: this.selectedYearId,
      vehicleModelId: this.selectedModelId,
      vehicleMakeId: this.selectedMakeId,
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
            if (res) {
              //Do your stuffs...
              this._toastr.success('Record saved successfully.')
              this.addVehicleForm.reset()
              this.showLoader = false
              this.submitted = false
              this._router.navigate(['admin/vehicles'])
            }
          },
          (error) => {
            if (error.status == 400) {
              let errorMsg = error.error.errors
              this._toastr.error(JSON.stringify(errorMsg))
              // this.showLoader = false
            }
          },
        )
      }
    })
  }

  /**
   *
   * Update Vehicle
   */

  UpdateVehicle() {
    let formData = this.addVehicleForm.value
    const body = {
      id: this.vehicleId,
      vin: formData.vin,
      licencePlate: formData.licencePlate,
      department: formData.department,
      domicileLocation: formData.domicileLocation,
      vehicleMacAddress: formData.vehicleMacAddress,
      isActive: true,
      modifiedBy: this.UserId,
      vehicleModelYearid: this.selectedYearId,
      vehicleModelId: this.selectedModelId,
      vehicleMakeId: this.selectedMakeId,
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
            if (res) {
              //Do your stuffs...
              this._toastr.success('Record update successfully.')
              this.addVehicleForm.reset()
              this.showLoader = false
              this.submitted = false
              this._router.navigate(['admin/vehicles'])
            }
          },
          (error) => {
            if (error.status == 400) {
              let errorMsg = error.error.errors
              this._toastr.error(JSON.stringify(errorMsg))
              // this.showLoader = false
            }
          },
        )
      }
    })
  }

  /**
   * Get Vehicle By Id
   * @param id
   */

  GetAllVehicleById(id: number) {
    this._adminService.GetAllVehicleById(id).subscribe((res: any) => {
      this.vehicleData = res.data[0]
      this.addVehicleForm.patchValue({ vin: this.vehicleData.vin })

      this.addVehicleForm.patchValue({
        licencePlate: this.vehicleData.licencePlate,
      })
      this.addVehicleForm.patchValue({
        department: this.vehicleData.department,
      })
      this.addVehicleForm.patchValue({
        domicileLocation: this.vehicleData.domicileLocation,
      })
      this.addVehicleForm.patchValue({
        vehicleMacAddress: this.vehicleData.vehicleMacAddress,
      })

      if (this.vehicleData.vehicleModelYear) {
        this.selectedYearId = this.vehicleData.vehicleModelYearid

        this.addVehicleForm.patchValue({
          modelyear: this.vehicleData.vehicleModelYear,
        })
      }

      if (this.vehicleData.vehicleMakeName) {
        this.selectedMakeId = this.vehicleData.vehicleMakeId
        this.addVehicleForm.patchValue({
          make: this.vehicleData.vehicleMakeName,
        })
      }
      if (this.vehicleData.vehicleModelName) {
        this.selectedModelId = this.vehicleData.vehicleModelId
        this.addVehicleForm.patchValue({
          model: this.vehicleData.vehicleModelName,
        })
      }
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
       * RFOD
       */
      rfid.forEach((elem: any) => {
        debugger
        this.addRFIDCardAssigned(
          this.addRFIDRows(elem.id, elem.name, elem.isActive),
        )
      })
    })
  }

  /**
   *
   * Get Model Year List
   */
  GetVehicleModelYearDDLList() {
    this._adminService.GetVehicleModelYearDDLList().subscribe((res: any) => {
      this.modelYearlist = res.data
    })
  }
  /**
   *
   * Get Make List
   */
  GetVehicleMakeDDLList() {
    this._adminService.GetVehicleMakeDDLList().subscribe((res: any) => {
      this.makeList = res.data
    })
  }

  /**
   *
   * Get Model List
   */
  GetVehicleModelDDLList() {
    this._adminService.GetVehicleModelDDLList().subscribe((res: any) => {
      this.modelList = res.data
    })
  }

  /**
   * Select Make
   * @param event
   * @param id
   */
  selectMake(event: any, id: any) {
    if (event.isUserInput) {
      this.selectedMakeId = id
    }
  }

  /**
   * Select Model
   * @param event
   * @param id
   */
  selectModel(event: any, id: any) {
    if (event.isUserInput) {
      this.selectedModelId = id
    }
  }

  /**
   * Select Year
   * @param event
   * @param id
   */
  selectYear(event: any, id: any) {
    if (event.isUserInput) {
      this.selectedYearId = id
    }
  }
}
