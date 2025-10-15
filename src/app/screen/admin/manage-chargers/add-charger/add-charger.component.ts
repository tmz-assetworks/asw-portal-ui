import { Component, OnInit } from '@angular/core'
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { StorageService } from 'src/app/service/storage.service'
import Swal from 'sweetalert2'
import { AdminService } from '../../admin.service'
import { CommonModule, DatePipe } from '@angular/common'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'


@Component({
  selector: 'app-add-charger',
  templateUrl: './add-charger.component.html',
  styleUrls: ['./add-charger.component.scss'],
  imports:[
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    SharedMaterialModule
  ]
})
export class AddChargerComponent implements OnInit {
  // DECLARE VARIABLES
  isSaveBtn: boolean = true
  submitted = false
  registrationForm: any
  chargerTitle: string = 'Add Charger'
  isUpdateBtn: boolean = false

  UserId: string | null
  ConnectorId: any = 1
  chargerboxId: any
  locationId: any
  makeMasterId: any
  protcol: string = '1.6J'
  protocolId: any
  // dispenserStatusId: any
  chargerData: any
  getMake: any

  getModel: any
  getModem: any
  getRfidReader: any
  getPowerCabinet: any
  getLocation: any = []
  selectedLocation: any
  // selectedMake: any
  // selectedModel: any
  selectedModem = 0
  selectedRfidReader = 0
  selectedPowerCabinet = 0
  selectedCable = 0
  selectedSwitch = 0
  getDispenserStatu: any
  selectedStatus: any
  selectedPad = 0
  assetPad: any
  Modemlist: any
  seecledModem: any
  Pluglist: any
  selectedPluging: any
  connectorType: any
  selectedconnectorType: any
  showLoader: boolean = false
  CableList: any

  SwitchList: any
  viewMode: boolean = false
  isPortAddBtn: boolean = false
  datePipe = new DatePipe('en-US')

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

    if (this.chargerboxId == undefined) {
      this.chargerboxId = 0
    }

    if (this.chargerboxId && routePath != 'view-chargers') {
      this.chargerTitle = 'Edit Charger'
      this.isUpdateBtn = true
      this.isSaveBtn = false
      this.viewMode = false
      this.isPortAddBtn = true
    } else if (this.chargerboxId && routePath == 'view-chargers') {
      this.chargerTitle = 'View Charger'
      this.isSaveBtn = false
      this.isUpdateBtn = false
      this.addChargerFormGroup.disable()
      this.viewMode = true
      this.isPortAddBtn = false
    } else {
      this.chargerTitle = 'Add Charger'
      this.isSaveBtn = true
      this.isUpdateBtn = false
      this.viewMode = false
      this.isPortAddBtn = true
    }
  }

  ngOnInit() {
    // API CALL
    this.GetSwitchGearDropDown(this.chargerboxId)
    this.GetCableDropDown(this.UserId, this.chargerboxId)
    this.GetConnectorType()
    this.GetModemDDL(this.UserId, this.chargerboxId)
    this.GetAllLocation()
    this.GetAllPadData(this.UserId, this.chargerboxId)

    this.GetAllRFIdReaderData(this.UserId, this.chargerboxId)
    this.GetPowerCabinetData(this.chargerboxId)

    this.GetPlugType()

    setTimeout(() => {
      if (this.chargerboxId) {
        this.GetDispenserDetailsById(this.chargerboxId)
      }

      let value = this._storageService.getSessionData('addChargerLocation')

      // CHECK IS USER REDIRECTED FROM LOCATION

      if (value) {
        let addChargerLocation = JSON.parse(value)

        if (addChargerLocation) {
          this.selectedLocation = addChargerLocation.id;

          this.addChargerFormGroup.patchValue({
            locationId: addChargerLocation.locationName,
          })
        }
      }
    }, 2000)
    setTimeout(() => {
        this.addChargerFormGroup.get('isActive')?.valueChanges.subscribe((value: boolean | null) => {
        if (value) {
          this.onIsActiveUnchecked(); // Call your function when unchecked
        }
      });
    }, 4000)

  }
  // ADD CHARGER FORM GROUP

  addChargerFormGroup = this._fb.group({
    assetId: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
    ]),
    chargeBoxId: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
    simCardMSIDN: new FormControl(''),
    locationId: new FormControl('', Validators.required),
    endPointUrl: new FormControl(''),
    firmwareVersion: new FormControl(''),
    makeMasterId: new FormControl('', Validators.required),
    modelId: new FormControl('', Validators.required),
    modemId: new FormControl('0'),
    switchGearId: new FormControl('0'),
    rfidReaderId: new FormControl('0'),
    powerCabinetId: new FormControl('0'),
    protocolName: new FormControl('1.6J', Validators.required),
    // dispenserStatusId: new FormControl('', Validators.required),
    hardwareSerialNumber: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
    meterType: new FormControl('', [Validators.pattern('[a-z0-9A-Z]{0,20}')]),
    // multiplePorts: new FormControl(false),
    pingSchedule: new FormControl('', [
      Validators.pattern('[a-z0-9A-Z]{0,20}'),
    ]),
    privateStation: new FormControl(true),
    readingSchedule: new FormControl('', [Validators.maxLength(20)]),
    // serialNumber: new FormControl('', [
    //   Validators.required,
    //   Validators.maxLength(20),
    // ]),
    oemOrderNumber: new FormControl('',[Validators.required,Validators.maxLength(100)]),
    padId: new FormControl('0'),
    cableId: new FormControl('0'),
    installationDate: new FormControl('', Validators.required),
    isActive: new FormControl(true, Validators.required),
    deactivationDate: new FormControl(''),
    latitude: new FormControl('', [Validators.pattern('[0-9.+-]+')]),
    longitude: new FormControl('', [Validators.pattern('[0-9.+-]+')]),
    // isAutomatic: new FormControl(false),
    portCommand: this._fb.array(
      [this.addPortsRows(0, 1, '', '', '', true, '', '', '', '', '')],
      Validators.required,
    ),
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
      createdBy: new FormControl(
        this._storageService.getLocalData('user_id'),
        Validators.required,
      ),
      incrementalPower: new FormControl(incrementalPower, [
        Validators.required,
        // Validators.pattern('[0-9].[0-9]{0,10}'),
      ]),
      isActive: new FormControl(status ? true : false),
      maxPower: new FormControl(maxPower, [
        Validators.required,
        // Validators.pattern('[0-9].[0-9]{0,10}'),
      ]),
      minPower: new FormControl(minPower, [
        Validators.required,
        //Validators.pattern('[0-9].[0-9]{0,10}'),
      ]),
      plugTypeId: new FormControl(plugTypeId, Validators.required),
      portName: new FormControl(portName, [
        Validators.required,
        Validators.maxLength(20),
      ]),
      power: new FormControl(power, [
        Validators.required,
        // Validators.pattern('[0-9].[0-9]{0,10}'),
      ]),
    })
  }

  // ADD CHARGER
  addCharger() {
    this.submitted = true
    if (this.addChargerFormGroup.invalid) {
      this._toastr.error('Please fill mandatory fields.')
      return
    }
    let isChecked = this.addChargerFormGroup.get('isActive')?.value;
    if (isChecked == false) {
      
      this._toastr.error(
        'Connector id must be different. Please enter other connector id.',
      )
      return
    }

    let portCmdArray = (this.addChargerFormGroup.get(
      'portCommand',
    ) as FormArray).controls

    let isUnique = this.isUnique(portCmdArray)

    if (isUnique == false) {
      this._toastr.error(
        'Connector id must be different. Please enter other connector id.',
      )
      return
    }

    let formData = this.addChargerFormGroup.value

    const pBody = {
      assetId: formData.assetId,
      simCardMSIDN:formData.simCardMSIDN,
      chargeBoxId: formData.chargeBoxId,
      endPointUrl: formData.endPointUrl,
      firmwareVersion: formData.firmwareVersion,
      hardwareSerialNumber: formData.hardwareSerialNumber,
      locationId: this.selectedLocation,
      makeName: formData.makeMasterId,
      modelName: formData.modelId,
      modemId: this.selectedModem,
      switchGearId: this.selectedSwitch,
      meterType: formData.meterType,
      // multiplePorts: formData.multiplePorts,
      pingSchedule: formData.pingSchedule,
      fleetStation: formData.privateStation,
      readingSchedule: formData.readingSchedule,
      // serialNumber: formData.serialNumber,
      rfIdReaderId: this.selectedRfidReader,
      powerCabinetId: this.selectedPowerCabinet,
      padId: this.selectedPad,
      cableId: this.selectedCable,
      // dispenserStatusId: this.selectedStatus,
      protocolName: formData.protocolName,
      installationDate: this.datePipe.transform(
        formData.installationDate,
        'yyyy-MM-ddT' + this.getModifiedTime(),
      ),
      deactivationDate: this.datePipe.transform(
        formData.deactivationDate,
        'yyyy-MM-ddT' + this.getModifiedTime(),
      ),
      createdBy: this.UserId,
      isActive: formData.isActive,
      // isAutomatic: formData.isAutomatic,
      portCommand: formData.portCommand,
      oemOrderNumber: formData.oemOrderNumber,
      latitude: formData.latitude ? formData.latitude : null,
      longitude: formData.longitude ? formData.longitude : null,
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
        this._adminService.CreateDispenser(pBody).subscribe(
          (res) => {
            if (res) {
              //Do your stuffs...
              this._toastr.success('Record saved successfully.')
              this.addChargerFormGroup.reset()
              this.showLoader = false
              this.submitted = false
              this._router.navigate(['admin/chargers'])
            }
          },

          (error: any) => {
            if (error.status == 400) {
              if (error.error.statusCode == 400) {
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

  // UPDATE CHARGER

  UpdateCharger() {
    this.submitted = true

    if (this.addChargerFormGroup.invalid) {
      this._toastr.error('Please fill mandatory fields.')
      return
    }
    let portCmdArray = (this.addChargerFormGroup.get(
      'portCommand',
    ) as FormArray).controls

    let isUnique = this.isUnique(portCmdArray)

    if (isUnique == false) {
      this._toastr.error(
        'Connector id must be different. Please enter other connector id.',
      )
      return
    }

    let formData = this.addChargerFormGroup.value
    const body = {
      id: this.chargerboxId,
      simCardMSIDN:formData.simCardMSIDN,
      assetId: formData.assetId,
      chargeBoxId: formData.chargeBoxId,
      locationId: formData.locationId,

      // description: formData.description,
      endPointUrl: formData.endPointUrl,
      firmwareVersion: formData.firmwareVersion,
      makeName: formData.makeMasterId,
      modelName: formData.modelId,
      modemId: formData.modemId,
      switchGearId: formData.switchGearId,
      modifiedBy: this.UserId,
      rfIdReaderId: formData.rfidReaderId,
      powerCabinetId: formData.powerCabinetId,
      // dispenserStatusId: formData.dispenserStatusId,
      protocolName: formData.protocolName,
      installationDate: this.datePipe.transform(
        formData.installationDate,
        'yyyy-MM-ddT' + this.getModifiedTime(),
      ),
      deactivationDate: this.datePipe.transform(
        formData.deactivationDate,
        'yyyy-MM-ddT' + this.getModifiedTime(),
      ),
      hardwareSerialNumber: formData.hardwareSerialNumber,
      meterType: formData.meterType,
      // multiplePorts: formData.multiplePorts,
      pingSchedule: formData.pingSchedule,
      fleetStation: formData.privateStation,
      readingSchedule: formData.readingSchedule,
      // serialNumber: formData.serialNumber,
      padId: formData.padId,
      cableId: formData.cableId,
      isActive: formData.isActive,
      // isAutomatic: formData.isAutomatic,
      updatePortCommand: formData.portCommand,
      oemOrderNumber: formData.oemOrderNumber,
      latitude: formData.latitude ? formData.latitude : null,
      longitude: formData.longitude ? formData.longitude : null,      
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
        this._adminService.Updatedispenser(body).subscribe(
          (res) => {
            if (res) {
              //Do your stuffs...
              this._toastr.success('Record saved successfully.')
              this.addChargerFormGroup.reset()
              this.showLoader = false
              this.submitted = false
              this._router.navigate(['admin/chargers'])
            }
          },
          (error: any) => {
            if (error.status == 400) {
              if (error.error.statusCode == 400) {
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
  /**
   * CHECK UNIQUE VALUE
   * @param arr
   * @returns
   */

  isUnique(arr: any) {
    let tmpArr: any[] = []
    for (var obj in arr) {
      if (!tmpArr.includes(arr[obj].value.connectorId)) {
        tmpArr.push(arr[obj].value.connectorId)
      } else {
        return false // Duplicate value for connector id found
      }
    }
    return true // No duplicate values found for connector id
  }

  // GET DISPENSER DETAILS BY ID
  GetDispenserDetailsById(id: number) {
    this._adminService.GetDispenserDetailsById(id).subscribe((res: any) => {
      if (res.data) {
        this.chargerData = res.data[0]

        this.addChargerFormGroup.patchValue({
          assetId: this.chargerData.assetId,
        })
        this.addChargerFormGroup.patchValue({
          chargeBoxId: this.chargerData.chargeBoxId,
        })
        this.addChargerFormGroup.patchValue({
          simCardMSIDN: this.chargerData.simCardMSIDN,
        })

        if (this.chargerData.locationName) {
          this.selectedLocation = this.chargerData.locationId

          this.addChargerFormGroup.patchValue({
            locationId: this.chargerData.locationName,
          })
        }
        
        // this.addChargerFormGroup.patchValue({
        //  description: this.chargerData.description,
        // })
        this.addChargerFormGroup.patchValue({
          endPointUrl: this.chargerData.endPointUrl,
        })
        this.addChargerFormGroup.patchValue({
          firmwareVersion: this.chargerData.firmwareVersion,
        })

        this.addChargerFormGroup.patchValue({
          makeMasterId: this.chargerData.makeName,
        })

        this.addChargerFormGroup.patchValue({
          modelId: this.chargerData.modelName,
        })

        if (this.chargerData.modemId) {
          this.selectedModem = this.chargerData.modemId
          this.addChargerFormGroup.patchValue({
            modemId: this.chargerData.modemSerialNumber,
          })
        }

        if (this.chargerData.switchGearId) {
          this.selectedSwitch = this.chargerData.switchGearId
          this.addChargerFormGroup.patchValue({
            switchGearId: this.chargerData.switchGearName,
          })
        }

        if (this.chargerData.padId != 0) {
          this.selectedPad = this.chargerData.padId

          this.addChargerFormGroup.patchValue({
            padId: this.chargerData.padName,
          })
        }

        if (this.chargerData.cableId) {
          this.selectedCable = this.chargerData.cableId

          this.addChargerFormGroup.patchValue({
            cableId: this.chargerData.cableSerialNumber,
          })
        }


        if (this.chargerData.powerCabinetSerialNumber) {
          this.selectedPowerCabinet = this.chargerData.powerCabinetId

        }
        this.addChargerFormGroup.patchValue({
          protocolName: this.chargerData.protocolName,
        })
        this.addChargerFormGroup.patchValue({
          installationDate: this.chargerData.installationDate,
        })
        this.addChargerFormGroup.patchValue({
          deactivationDate: this.chargerData.deactivationDate,
        })
        this.addChargerFormGroup.patchValue({
          oemOrderNumber: this.chargerData.oemOrderNumber,
        })
        this.addChargerFormGroup.patchValue({
          latitude: this.chargerData.latitude,
        })
        this.addChargerFormGroup.patchValue({
          longitude: this.chargerData.longitude,
        })
        this.addChargerFormGroup.patchValue({
          isActive: this.chargerData.isActive,
        })

        // if (this.chargerData.status) {
        //   this.selectedStatus = this.chargerData.dispenserStatusId

        //   this.addChargerFormGroup.patchValue({
        //     statu: this.chargerData.status,
        //   })
        // }
        this.addChargerFormGroup.patchValue({
          hardwareSerialNumber: this.chargerData.hardwareSerialNumber,
        })
        this.addChargerFormGroup.patchValue({
          meterType: this.chargerData.meterType,
        })

        // this.addChargerFormGroup.patchValue = this.chargerData.multiplePorts;
        // this.addChargerFormGroup.patchValue({
        //   multiplePorts: this.chargerData.multiplePorts,
        // })
        //this.addChargerFormGroup.patchValue({ multiplePorts: "" });

        this.addChargerFormGroup.patchValue({
          pingSchedule: this.chargerData.pingSchedule,
        })
        // this.addChargerFormGroup.patchValue = this.chargerData?.privateStation;
        this.addChargerFormGroup.patchValue({
          privateStation: this.chargerData.fleetStation,
        })
        this.addChargerFormGroup.patchValue({
          readingSchedule: this.chargerData.readingSchedule,
        })
        // this.addChargerFormGroup.patchValue({
        //   serialNumber: this.chargerData.serialNumber,
        // })
        // this.addChargerFormGroup.patchValue({
        //   isAutomatic: this.chargerData.isAutomatic,
        // })
        // this.addChargerFormGroup.patchValue = this.chargerData?.serialNumber;

        // this.addChargerFormGroup.patchValue({ serialNumber: this.chargerData.serialNumber });

        this.removePortAssigned(0)
        const ports = this.chargerData?.portCommmand

        let portlen = this.chargerData?.portCommmand.length
        /**
         * PORTS
         */
        ports.forEach((elem: any) => {
          this.addPorts(
            this.addPortsRows(
              elem.portId,
              this.ConnectorId,
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
        this.ConnectorId = portlen
      }
    })
  }

  GetAllLocation() {
    this._adminService.GetAllLocation().subscribe((res: any) => {
      this.getLocation = res.data
    })
  }

  GetAllRFIdReaderData(UserId: any, dispenserId: any) {
    const body = {
      UserId: UserId,
      dispenserId: +dispenserId,
    }
    this._adminService.GetAllRFIdReaderData(body).subscribe((res: any) => {
      this.getRfidReader = res.data
    })
  }
  GetPowerCabinetData(dispenserId: any) {
    this._adminService
      .GetPowerCabinetData(dispenserId)
      .subscribe((res: any) => {
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

  GetAllPadData(UserId: any, dispenserId: any) {
    const pBody = {
      userId: UserId,
      dispenserId: +dispenserId,
    }
    this._adminService.GetAllPadData(pBody).subscribe((res: any) => {
      this.assetPad = res.data
    })
  }

  GetModemDDL(UserId: any, dispenserId: any) {
    const pBody = {
      userId: UserId,
      dispenserId: +dispenserId,
    }
    this._adminService.GetModemDDL(pBody).subscribe((res: any) => {
      this.Modemlist = res.data
    })
  }

  GetCableDropDown(UserId: any, dispenserId: any) {
    const pBody = {
      userId: UserId,
      dispenserId: +dispenserId,
    }
    this._adminService.GetCableDropDown(pBody).subscribe((res: any) => {
      this.CableList = res.data
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
  GetSwitchGearDropDown(dispenserId: any) {
    const pBody = {
      userId: this.UserId,
      dispenserId: +dispenserId,
    }
    this._adminService.GetSwitchGearDropDown(pBody).subscribe((res: any) => {
      this.SwitchList = res.data
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
  onIsActiveUnchecked(): void {
  this.addChargerFormGroup.get('deactivationDate')?.setValue(null);
}

  /**
   * Select Location
   * @param event
   * @param id
   */
  selectLocation(event: any, id: any) {
    this.selectedLocation = id
  }

  selectconnector(event: any, id: any) {
    this.selectedconnectorType = id
  }

  selectModem(event: any, data: any) {
    if (event.isUserInput) {
      if (data.isActive == false) {
        this._toastr.error(
          'Selected modem is not available.Please select other modem.',
        )
        this.selectedModem = 0

        return
      }
      this.selectedModem = data.id
    }
  }
  selectSwitch(event: any, id: any) {
    this.selectedSwitch = id
  }
  selectStatus(event: any, id: any) {
    this.selectedStatus = id
  }

  selectRfidReader(event: any, data: any) {
    if (event.isUserInput) {
      if (data.isActive == false) {
        this._toastr.error(
          'Selected rfid reader is not available.Please select other rfid reader.',
        )
        this.selectedRfidReader = 0

        return
      }
      this.selectedRfidReader = data.id
    }
  }
  selectPowerCabinet(event: any, data: any) {
    if (event.isUserInput) {
      if (data.isActive == false) {
        this._toastr.error(
          'Selected power cabinet is not available.Please select other power cabinet.',
        )

        this.selectedPowerCabinet = 0

        return
      }
      this.selectedPowerCabinet = data.id
    }
  }
  selectPad(event: any, data: any) {
    if (event.isUserInput) {
      if (data.isActive == false) {
        this._toastr.error(
          'Selected pad is not available.Please select other pad.',
        )

        this.selectedPad = 0

        return
      }
      this.selectedPad = data.id
    }
  }

  selectCable(event: any, data: any) {
    if (event.isUserInput) {
      if (data.isActive == false) {
        this._toastr.error(
          'Selected cable is not available.Please select other cable.',
        )

        this.selectedCable = 0

        return
      }
      this.selectedCable = data.id
    }
  }

  selectPluging(event: any, id: any) {
    if (event.isUserInput) {
      this.selectedPluging = id
    }
  }
  addPorts(fbGroup?: FormGroup): void {
    this.ConnectorId = this.ConnectorId + 1
    ;(this.addChargerFormGroup.get('portCommand') as FormArray).push(
      fbGroup ||
        this.addPortsRows(
          0,
          this.ConnectorId,
          '',
          this.UserId || '',
          '',
          true,
          '',
          '',
          '',
          '',
          '',
        ),
    )
  }

  getPortFormControls(): any {
    return (this.addChargerFormGroup.get('portCommand') as FormArray).controls
  }

  disableInputs() {
    ;(<FormArray>this.addChargerFormGroup.get('portCommand')).controls.forEach(
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

  //NUMBER WITH DECIMAL ONLY
  numberWithDecimalOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false
    }
    return true
  }

  omit_special_char(event: any) {
    let k = event.charCode //         k = event.keyCode;  (Both can be used)
    return (
      (k > 64 && k < 91) ||
      (k > 96 && k < 123) ||
      k == 8 ||
      k == 32 ||
      k == 45 ||
      (k >= 48 && k <= 57)
    )
  }

  /**
   *
   * @returns
   *
   * Get  modefied time
   */

  getModifiedTime() {
    let date = new Date()
    let time = this.datePipe.transform(date, 'HH:mm:ss')
    return time
  }

  removePortAssigned(index: any) {
    ;(this.addChargerFormGroup.get('portCommand') as FormArray).removeAt(index)
  }
}
