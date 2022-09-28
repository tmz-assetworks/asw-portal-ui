import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
  FormArray,
} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { StorageService } from 'src/app/service/storage.service'
import Swal from 'sweetalert2'
import { AdminService } from '../../admin.service'
import { MatCheckboxModule } from '@angular/material/checkbox'

@Component({
  selector: 'app-add-charger',
  templateUrl: './add-charger.component.html',
  styleUrls: ['./add-charger.component.scss'],
})
export class AddChargerComponent implements OnInit {
  isSaveBtn: boolean = true
  submitted = false
  registrationForm: any
  chargerTitle: string = 'Add Charger'
  isUpdateBtn: boolean = false

  UserId: string | null
  chargerboxId: any
  locationId: any
  makeMasterId: any
  protcol: string = '1.6J'
  protocolId: any
  dispenserStatusId: any
  chargerData: any
  getMake: any

  getModel: any
  getModem: any
  getRfidReader: any
  getPowerCabinet: any
  getLocation: any
  selectedLocation: any
  selectedMake: any
  selectedModel: any
  selectedModem: any
  selectedRfidReader: any
  selectedPowerCabinet: any
  getDispenserStatu: any
  selectedStatus: any
  selectedPad: any
  assetPad: any
  Modemlist: any
  seecledModem: any
  Pluglist: any
  selectedPluging: any
  connectorType: any
  selectedconnectorType: any
  showLoader: boolean = false

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _storageService: StorageService,
    private _toastr: ToastrService,
    private _adminService: AdminService,
  ) {
    this.UserId = this._storageService.getLocalData('user_id')
    this.chargerboxId = this._activatedRoute.snapshot.queryParams['id']
    let routePath = this._activatedRoute.snapshot.routeConfig?.path

    if (this.chargerboxId && routePath != 'view-chargers') {
      this.chargerTitle = 'Edit Charger'

      this.isUpdateBtn = true
      this.isSaveBtn = false
    } else if (this.chargerboxId && routePath == 'view-chargers') {
      this.chargerTitle = 'View Charger'

      this.isSaveBtn = false
      this.isUpdateBtn = false
      this.addChargerForm.disable()
    } else {
      this.chargerTitle = 'Add Charger'
      this.isSaveBtn = true
      this.isUpdateBtn = false
    }
  }

  ngOnInit() {
    // this.onSubmit();

    /**
     * call dropdown
     */
    this.GetConnectorType()
    this.GetModemDDL()
    this.GetAllModelData(this.UserId)
    this.GetAllLocation()
    this.GetAllMakeMaster()
    this.GetAllPadData(this.UserId)
    // this.GetAllModem();
    this.GetAllRFIdReaderData(this.UserId)
    this.GetPowerCabinetData()
    this.GetDispenserStatus(this.UserId)
    this.GetPlugType()
    //this.GetDispenserDetailsById(this.chargerId)
    setTimeout(() => {
      if (this.chargerboxId) {
        this.GetDispenserDetailsById(this.chargerboxId)
      }
    }, 2000)
  }

  addChargerForm = this._fb.group({
    assetId: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
    ]),
    chargeBoxId: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
    ]),
    locationId: new FormControl('', Validators.required),
    endPointUrl: new FormControl(''),
    firmwareVersion: new FormControl(''),
    makeMasterId: new FormControl('', Validators.required),
    modelId: new FormControl('', Validators.required),
    modemId: new FormControl('', Validators.required),
    rfidReaderId: new FormControl('', Validators.required),
    powerCabinetId: new FormControl('', [Validators.required]),
    protocolName: new FormControl('1.6J', Validators.required),
    dispenserStatusId: new FormControl('', Validators.required),
    hardwareSerialNumber: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
    ]),
    meterType: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9A-Z]{0,20}'),
    ]),
    multiplePorts: new FormControl(false),
    pingSchedule: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9A-Z]{0,20}'),
    ]),
    privateStation: new FormControl(false),
    readingSchedule: new FormControl('', [
      Validators.required,

      Validators.maxLength(20),
    ]),
    serialNumber: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
    ]),
    padId: new FormControl('', Validators.required),
    isActive: new FormControl(''),
    isAutomatic: new FormControl(false),
    portCommand: this._fb.array([], Validators.required),
  })

  addPortsRows(
    id: any,
    connectorId: any,
    connectorType: any,
    UserId: string,
    incrementalPower: any,
    status: any,
    maxPower: any,
    minPower: any,
    plugTypeId: any,
    portName: string,
    power: any,
  ): FormGroup {
    return new FormGroup({
      id: new FormControl(id ? id : 0, Validators.required),
      connectorId: new FormControl(connectorId, [
        Validators.required,
        Validators.pattern('[0-9]{0,10}'),
      ]),
      connectorType: new FormControl(connectorType, Validators.required),
      createdBy: new FormControl(UserId, Validators.required),
      incrementalPower: new FormControl(incrementalPower, [
        Validators.required,
        Validators.pattern('[0-9]{0,10}'),
      ]),
      isActive: new FormControl(status ? true : false),
      maxPower: new FormControl(maxPower, [
        Validators.required,
        Validators.pattern('[0-9]{0,10}'),
      ]),
      minPower: new FormControl(minPower, [
        Validators.required,
        Validators.pattern('[0-9]{0,10}'),
      ]),
      plugTypeId: new FormControl(plugTypeId, Validators.required),
      portName: new FormControl(portName, [
        Validators.required,
        Validators.maxLength(20),
      ]),
      power: new FormControl(power, [
        Validators.required,
        Validators.pattern('[0-9]{0,10}'),
      ]),
    })
  }

  /**
   * Add Charger
   */

  addCharger() {
    this.submitted = true
    if (this.addChargerForm.invalid) {
      this._toastr.error('Please fill mandatory fields.')
      return
    }
    let formData = this.addChargerForm.value

    const pBody = {
      // assetId: formData.assetId,
      // chargeBoxId: formData.chargeBoxId,
      // endPointUrl: formData.endPointUrl,
      // firmwareVersion: formData.firmwareVersion,
      // hardwareSerialNumber: formData.hardwareSerialNumber,
      // locationId: this.selectedLocation,
      // makeMasterId: this.selectedMake,
      // modelId: this.selectedModel,
      // modemId: this.seecledModem,
      // meterType: formData.meterType,
      // multiplePorts: formData.multiplePorts,
      // pingSchedule: formData.pingSchedule,
      // privateStation: formData.privateStation,
      // readingSchedule: formData.readingSchedule,
      // serialNumber: formData.serialNumber,
      // padId: this.selectedPad,
      // rfIdReaderId: this.selectedRfidReader,
      // powerCabinetId: this.selectedPowerCabinet,
      // dispenserStatusId: this.selectedStatus,
      // protocolName: formData.protocolName,
      // createdBy: this.UserId,
      // isActive: true,
      // isAutomatic: formData.isAutomatic,
      // portCommand: formData.portCommmand,

      assetId: formData.assetId,
      chargeBoxId: formData.chargeBoxId,
      endPointUrl: formData.endPointUrl,
      firmwareVersion: formData.firmwareVersion,
      hardwareSerialNumber: formData.hardwareSerialNumber,
      locationId: this.selectedLocation,
      makeMasterId: this.selectedMake,
      modelId: this.selectedModel,
      modemId: this.selectedModem,
      meterType: formData.meterType,
      multiplePorts: formData.multiplePortstrue,
      pingSchedule: formData.pingSchedule,
      privateStation: formData.privateStation,
      readingSchedule: formData.readingSchedule,
      serialNumber: formData.serialNumber,
      rfIdReaderId: this.selectedRfidReader,
      powerCabinetId: this.selectedPowerCabinet,
      padId: this.selectedPad,
      dispenserStatusId: this.selectedStatus,
      protocolName: formData.protocolName,
      createdBy: this.UserId,
      isActive: true,
      isAutomatic: formData.isAutomatic,
      portCommand: formData.portCommand,
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
        this._adminService.CreateDispenser(pBody).subscribe(
          (res) => {
            if (res) {
              //Do your stuffs...
              this._toastr.success('Record saved successfully.')
              this.addChargerForm.reset()
              this.showLoader = false
              this.submitted = false
              this._router.navigate(['admin/chargers'])
            }
          },

          (error: any) => {
            if (error.status == 400) {
              if (error.error.statusCode == 200) {
                let errorMsg = error.error.statusMessage
                this._toastr.error(errorMsg)
                this.showLoader = false
              } else {
                let errorMsg = error.error.errors
                this._toastr.error(errorMsg)
                this.showLoader = false
              }
            }
          },
        )
      }
    })
  }

  UpdateCharger() {
    this.submitted = true

    if (this.addChargerForm.invalid) {
      this._toastr.error('Please fill mandatory fields.')
      return
    }
    let formData = this.addChargerForm.value
    const body = {
      id: this.chargerboxId,
      assetId: formData.assetId,
      chargeBoxId: formData.chargeBoxId,
      locationId: formData.locationId,
      description: formData.description,
      endPointUrl: formData.endPointUrl,
      firmwareVersion: formData.firmwareVersion,
      makeMasterId: formData.makeMasterId,
      modelId: formData.modelId,
      modemId: formData.modemId,
      modifiedBy: this.UserId,
      rfIdReaderId: formData.rfidReaderId,
      powerCabinetId: formData.powerCabinetId,
      dispenserStatusId: formData.dispenserStatusId,
      protocolName: formData.protocolName,
      hardwareSerialNumber: formData.hardwareSerialNumber,
      meterType: formData.meterType,
      multiplePorts: formData.multiplePorts,
      pingSchedule: formData.pingSchedule,
      privateStation: formData.privateStation,
      readingSchedule: formData.readingSchedule,
      serialNumber: formData.serialNumber,
      padId: formData.padId,
      isActive: true,
      isAutomatic: formData.isAutomatic,
      updatePortCommand: formData.portCommand,
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
        this._adminService.updatedispenser(body).subscribe(
          (res) => {
            if (res) {
              //Do your stuffs...
              this._toastr.success('Record saved successfully.')
              this.addChargerForm.reset()
              this.showLoader = false
              this.submitted = false
              this._router.navigate(['admin/chargers'])
            }
          },

          (error: any) => {
            if (error.status == 400) {
              if (error.error.statusCode == 200) {
                let errorMsg = error.error.statusMessage
                this._toastr.error(errorMsg)
                this.showLoader = false
              } else {
                let errorMsg = error.error.errors
                this._toastr.error(errorMsg)
                this.showLoader = false
              }
            }
          },
        )
      }
    })
  }

  GetDispenserDetailsById(id: number) {
    this._adminService.GetDispenserDetailsById(id).subscribe((res: any) => {
      if (res.data) {
        this.chargerData = res.data[0]

        this.addChargerForm.patchValue({ assetId: this.chargerData.assetId })
        this.addChargerForm.patchValue({
          chargeBoxId: this.chargerData.chargeBoxId,
        })

        if (this.chargerData.locationName) {
          this.selectedLocation = this.chargerData.locationId

          this.addChargerForm.patchValue({
            location: this.chargerData.locationName,
          })
        }
        this.addChargerForm.patchValue({
          description: this.chargerData.description,
        })
        this.addChargerForm.patchValue({
          endPointUrl: this.chargerData.endPointUrl,
        })
        this.addChargerForm.patchValue({
          firmwareVersion: this.chargerData.firmwareVersion,
        })

        if (this.chargerData.make) {
          this.selectedMake = this.chargerData.makeMasterId

          this.addChargerForm.patchValue({
            make: this.chargerData.make,
          })
        }

        if (this.chargerData.model) {
          this.selectedModel = this.chargerData.modelId
          this.addChargerForm.patchValue({
            model: this.chargerData.model,
          })
        }

        if (this.chargerData.modemSerialNumber) {
          this.selectedModem = this.chargerData.modemId
          this.addChargerForm.patchValue({
            model: this.chargerData.modemSerialNumber,
          })
        }

        if (this.chargerData.padId) {
          this.selectedPad = this.chargerData.padId

          this.addChargerForm.patchValue({
            padId: this.chargerData.padName,
          })
        }
        if (this.chargerData.rfidReader) {
          this.selectedRfidReader = this.chargerData.rfidReaderId
          this.addChargerForm.patchValue({
            rfidReader: this.chargerData.rfidReader,
          })
        }

        if (this.chargerData.powerCabinetSerialNumber) {
          this.selectedPowerCabinet = this.chargerData.powerCabinetId

          this.addChargerForm.patchValue({
            powerCabinet: this.chargerData.powerCabinetSerialNumber,
          })
        }
        this.addChargerForm.patchValue({
          protocolName: this.chargerData.protocolName,
        })

        if (this.chargerData.status) {
          this.selectedStatus = this.chargerData.dispenserStatusId

          this.addChargerForm.patchValue({
            statu: this.chargerData.status,
          })
        }
        this.addChargerForm.patchValue({
          hardwareSerialNumber: this.chargerData.hardwareSerialNumber,
        })
        this.addChargerForm.patchValue({
          meterType: this.chargerData.meterType,
        })

        // this.addChargerForm.patchValue = this.chargerData.multiplePorts;
        this.addChargerForm.patchValue({
          multiplePorts: this.chargerData.multiplePorts,
        })
        //this.addChargerForm.patchValue({ multiplePorts: "" });

        this.addChargerForm.patchValue({
          pingSchedule: this.chargerData.pingSchedule,
        })
        // this.addChargerForm.patchValue = this.chargerData?.privateStation;
        this.addChargerForm.patchValue({
          privateStation: this.chargerData.privateStation,
        })
        this.addChargerForm.patchValue({
          readingSchedule: this.chargerData.readingSchedule,
        })
        this.addChargerForm.patchValue({
          serialNumber: this.chargerData.serialNumber,
        })
        this.addChargerForm.patchValue({
          isAutomatic: this.chargerData.isAutomatic,
        })
        // this.addChargerForm.patchValue = this.chargerData?.serialNumber;

        // this.addChargerForm.patchValue({ serialNumber: this.chargerData.serialNumber });
        const ports = this.chargerData?.portCommmand

        /**
         * PORTS
         */
        ports.forEach((elem: any) => {
          this.addPorts(
            this.addPortsRows(
              elem.portId,
              elem.connectorId,
              elem.connectorType,
              elem.createdBy,
              elem.incrementalPower,
              elem.isActive,
              elem.maxPower,
              elem.minPower,
              elem.plugTypeId,
              elem.portName,
              elem.power,
            ),
          )
        })
      }
    })
  }

  GetAllLocation() {
    this._adminService.GetAllLocation().subscribe((res: any) => {
      this.getLocation = res.data
    })
  }

  GetAllMakeMaster() {
    this._adminService.GetAllMakeMaster().subscribe((res: any) => {
      this.getMake = res.data
    })
  }

  GetAllModelData(UserId: any) {
    const body = {
      UserId: UserId,
    }
    this._adminService.GetAllModelData(body).subscribe((res: any) => {
      this.getModel = res.data
    })
  }

  GetAllRFIdReaderData(UserId: any) {
    const body = {
      UserId: UserId,
    }
    this._adminService.GetAllRFIdReaderData(body).subscribe((res: any) => {
      this.getRfidReader = res.data
    })
  }
  GetPowerCabinetData() {
    this._adminService.GetPowerCabinetData().subscribe((res: any) => {
      this.getPowerCabinet = res.data
    })
  }

  GetDispenserStatus(userId: any) {
    const pBody = {
      userId: 0,
    }

    this._adminService.GetDispenserStatus(pBody).subscribe((res: any) => {
      this.getDispenserStatu = res.data
    })
  }

  GetAllPadData(UserId: any) {
    const pBody = {
      userId: UserId,
    }
    this._adminService.GetAllPadData(pBody).subscribe((res: any) => {
      this.assetPad = res.data
    })
  }

  GetModemDDL() {
    const pBody = {
      userId: this.UserId,
    }
    this._adminService.GetModemDDL(pBody).subscribe((res: any) => {
      this.Modemlist = res.data
      console.log(this.Modemlist)
    })
  }

  GetPlugType() {
    const pBody = {
      userId: this.UserId,
    }
    this._adminService.GetPlugType(pBody).subscribe((res: any) => {
      this.Pluglist = res.data
    })
  }

  GetConnectorType() {
    const pBody = {
      userId: this.UserId,
    }
    this._adminService.GetConnectorType(pBody).subscribe((res) => {
      this.connectorType = res.data
    })
  }

  /**
   *
   */
  selectLocation(event: any, id: any) {
    this.selectedLocation = id
  }

  selectconnector(event: any, id: any) {
    this.selectedconnectorType = id
  }

  selectMake(event: any, id: any) {
    this.selectedMake = id
  }

  selectModel(event: any, id: any) {
    this.selectedModel = id
  }

  selectModem(event: any, id: any) {
    this.selectedModem = id
  }

  selectStatus(event: any, id: any) {
    this.selectedStatus = id
  }

  selectRfidReader(event: any, id: any) {
    this.selectedRfidReader = id
  }
  selectPowerCabinet(event: any, id: any) {
    this.selectedPowerCabinet = id
  }
  selectPad(event: any, id: any) {
    this.selectedPad = id
  }

  selectPluging(event: any, id: any) {
    this.selectedPluging = id
  }

  addPorts(fbGroup?: FormGroup): void {
    debugger
    ;(this.addChargerForm.get('portCommand') as FormArray).push(
      fbGroup ||
        this.addPortsRows(
          0,
          '',
          '',
          this.UserId || '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
        ),
    )
  }

  getPortFormControls(): any {
    return (this.addChargerForm.get('portCommand') as FormArray).controls
  }

  disableInputs() {
    ;(<FormArray>this.addChargerForm.get('portCommand')).controls.forEach(
      (control) => {
        control.disable()
      },
    )
  }
  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false
    }
    return true
  }

  // validation = {
  //     isEmailAddress:function('addChargerForm.assetId') {
  //         var pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //         return pattern.test(addChargerForm.assetId);  // returns a boolean
  //     }

  //   }
}
