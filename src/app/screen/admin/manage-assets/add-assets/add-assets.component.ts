import { CommonModule, DatePipe } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'

import { ToastrService } from 'ngx-toastr'
import { StorageService } from 'src/app/service/storage.service'
import Swal from 'sweetalert2'

import { AdminService } from '../../admin.service'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'

@Component({
  selector: 'app-add-assets',
  templateUrl: './add-assets.component.html',
  styleUrls: ['./add-assets.component.scss'],
  imports:[
    RouterModule,
    SharedMaterialModule,
    CommonModule,
    ReactiveFormsModule
    ]
})
export class AddAssetsComponent implements OnInit {
  //Declare variables
  typeId: any
  showCableForm: boolean = false
  showModemForm: boolean = false
  showPadsForm: boolean = false
  showPowerCabinetForm: boolean = false
  showRFIDForm: boolean = false
  showSwitchGearForm: boolean = false
  showLoader: boolean = false
  UserId: string | null
  assetId: any
  title = 'Add Assets'
  isSave: boolean = true
  isUpdate: boolean = false
  submitted: boolean = false
  assetName: any
  selectedType: any
  locationList: any
  selectedLocation: any
  selectedStatus: any
  makeList: any
  modelList: any
  selectedMakeCable: any
  selectedModelCable: any
  selectedMakePowerCabinet: any
  selectedModelPowerCabinet: any
  selectedMakeRFID: any
  selectedModelRFID: any
  selectedMakeModem: any
  selectedModelModem: any
  selectedModemType: any
  datePipe = new DatePipe('en-US')
  modemTypeList: any = []

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _toastr: ToastrService,
    private _storageService: StorageService,
    private _activatedRoute: ActivatedRoute,
    private _adminService: AdminService,
  ) {
    this.UserId = this._storageService.getLocalData('user_id')
    this.assetId = this._activatedRoute.snapshot.queryParams['id']
    this.assetName = this._activatedRoute.snapshot.queryParams['type']
    let routePath = this._activatedRoute.snapshot.routeConfig?.path

    if (this.assetId && routePath != 'view-assets') {
      this.title = 'Edit Assets'
      this.isUpdate = true
      this.isSave = false
    } else if (this.assetId && routePath == 'view-assets') {
      this.title = 'View Assets'
      this.isSave = false
      this.addAssetsForm.disable()
    } else {
      this.title = 'Add Assets'
    }
  }

  assetType = [
    { id: 1, name: 'Cables' },
    { id: 2, name: 'Modem' },
    { id: 3, name: 'Pads' },
    { id: 4, name: 'PowerCabinet' },
    { id: 5, name: 'RFIDReaders' },
    { id: 6, name: 'SwitchGears' },
  ]

  statusList = [
    { id: 1, name: 'Commissioned' },
    { id: 2, name: 'DeCommissioned' },
    { id: 3, name: 'PreCommissioned' },
  ]

  /**
   * DECLARE FROM GROUP
   */
  addAssetsForm = this._fb.group({
    assetDetails: new FormGroup({
      AssetCategory: new FormControl('', Validators.required),
      SerialNumber: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
      ]),
      AssetID: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      Location: new FormControl('', Validators.required),
      Status: new FormControl('', Validators.required),
      IsActive: new FormControl(true, Validators.required),
    }),

    assetCableDetails: new FormGroup({
      Make: new FormControl('', Validators.required),
      Model: new FormControl('', Validators.required),
      WarrantyStart: new FormControl('', Validators.required),
      WarrantyEnd: new FormControl('', Validators.required),
      WarrantyDuration: new FormControl('', Validators.required),
    }),

    assetModemDetails: new FormGroup({
      Carrier: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      ImeiNumber: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      InstallationDate: new FormControl('', Validators.required),
      IpAddress: new FormControl('', [
        Validators.required,
        Validators.maxLength(25),
        Validators.pattern(
          `(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)`,
        ),
      ]),
      Make: new FormControl('', Validators.required),
      Model: new FormControl('', Validators.required),
      SimNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9]{0,20}$'),
      ]),
      ModemType: new FormControl('', [Validators.required]),
      WarrantyStart: new FormControl('', Validators.required),
      WarrantyEnd: new FormControl('', Validators.required),
      WarrantyDuration: new FormControl('', Validators.required),
    }),

    assetPadDetails: new FormGroup({
      InstallationDate: new FormControl('', Validators.required),
      PadName: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
      ]),
    }),

    assetPowerCabinetDetails: new FormGroup({
      BreakerRating: new FormControl('', [
        Validators.required,

        Validators.pattern('^[0-9]{0,5}$'),
      ]),
      DCPortQuantity: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{0,5}$'),
      ]),
      InstallationDate: new FormControl('', Validators.required),
      Make: new FormControl('', Validators.required),
      Model: new FormControl('', Validators.required),
      PeakCurrent: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{0,5}$'),
      ]),
      ServiceVolts: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{0,5}$'),
      ]),
      WarrantyStart: new FormControl('', Validators.required),
      WarrantyEnd: new FormControl('', Validators.required),
      WarrantyDuration: new FormControl('', Validators.required),
    }),

    assetRFIDReaderDetails: new FormGroup({
      CardReader: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
      ]),
      Make: new FormControl('', Validators.required),
      Model: new FormControl('', Validators.required),
      WarrantyStart: new FormControl('', Validators.required),
      WarrantyEnd: new FormControl('', Validators.required),
      WarrantyDuration: new FormControl('', Validators.required),
    }),

    assetSwitchGearDetails: new FormGroup({
      switchGearName: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
      ]),
    }),
  })
  ngOnInit(): void {
    /**
     * API Call
     */
    this.GetAllLocation() // CALL LOCATION API
    this.GetAllMakeMaster() // CALL MAKE API
    this.GetAllModelData(this.UserId) // CALL MODEL API
    this.GetAllModemTypeData() // CALL MODEM TYPE API

    if (this.assetName == 'Cables' && this.assetId) {
      this.typeId = 1
      this.showCableForm = true
      this.selectedType = this.assetName

      this.addAssetsForm['controls']['assetDetails'].patchValue({
        AssetCategory: this.assetName,
      })
      this.addAssetsForm.get('assetDetails.AssetCategory')?.disable()

      this.getCableDetailsById(this.assetId)
    } else if (this.assetName == 'Pads' && this.assetId) {
      this.typeId = 3
      this.showPadsForm = true
      this.selectedType = this.assetName
      this.addAssetsForm['controls']['assetDetails'].patchValue({
        AssetCategory: this.assetName,
      })
      this.addAssetsForm.get('assetDetails.AssetCategory')?.disable()

      this.getPadDetailsbyID(this.assetId)
    } else if (this.assetName == 'PowerCabinet' && this.assetId) {
      this.typeId = 4
      this.showPowerCabinetForm = true
      this.selectedType = this.assetName
      this.addAssetsForm['controls']['assetDetails'].patchValue({
        AssetCategory: this.assetName,
      })
      this.addAssetsForm.get('assetDetails.AssetCategory')?.disable()

      this.getPowerCabinetById(this.assetId)
    } else if (this.assetName == 'RFIDReaders' && this.assetId) {
      this.typeId = 5
      this.showRFIDForm = true
      this.selectedType = this.assetName
      this.addAssetsForm['controls']['assetDetails'].patchValue({
        AssetCategory: this.assetName,
      })
      this.addAssetsForm.get('assetDetails.AssetCategory')?.disable()

      this.getRfidReaderById(this.assetId)
    } else if (this.assetName == 'Modem' && this.assetId) {
      this.typeId = 2
      this.showModemForm = true
      this.selectedType = this.assetName
      this.addAssetsForm['controls']['assetDetails'].patchValue({
        AssetCategory: this.assetName,
      })
      this.addAssetsForm.get('assetDetails.AssetCategory')?.disable()

      this.getModemDetailsById(this.assetId)
    } else if (this.assetName == 'SwitchGears' && this.assetId) {
      this.typeId = 6
      this.showSwitchGearForm = true
      this.selectedType = this.assetName
      this.addAssetsForm['controls']['assetDetails'].patchValue({
        AssetCategory: this.assetName,
      })
      this.addAssetsForm.get('assetDetails.AssetCategory')?.disable()

      this.getSwitchGearDetailsById(this.assetId)
    }
  }

  /**
   * ASSET TYPE SELECT
   * @param e
   * @param type
   */

  selectType(e: any, id: number) {
    if (!e.isUserInput) {
      return
    }

    this.typeId = id
    if (this.typeId == 1) {
      this.showCableForm = true
      this.showModemForm = false
      this.showPadsForm = false
      this.showPowerCabinetForm = false
      this.showSwitchGearForm = false
      this.showRFIDForm = false
      this.submitted = false
      this.addAssetsForm['controls']['assetModemDetails'].reset()
      this.addAssetsForm['controls']['assetPadDetails'].reset()
      this.addAssetsForm['controls']['assetPowerCabinetDetails'].reset()
      this.addAssetsForm['controls']['assetRFIDReaderDetails'].reset()
      this.addAssetsForm['controls']['assetSwitchGearDetails'].reset()
    } else if (this.typeId == 2) {
      this.showCableForm = false
      this.showModemForm = true
      this.showPadsForm = false
      this.showPowerCabinetForm = false
      this.showSwitchGearForm = false
      this.showRFIDForm = false
      this.submitted = false
      this.addAssetsForm['controls']['assetCableDetails'].reset()
      this.addAssetsForm['controls']['assetPadDetails'].reset()
      this.addAssetsForm['controls']['assetPowerCabinetDetails'].reset()
      this.addAssetsForm['controls']['assetRFIDReaderDetails'].reset()
      this.addAssetsForm['controls']['assetSwitchGearDetails'].reset()
    } else if (this.typeId == 3) {
      this.showCableForm = false
      this.showModemForm = false
      this.showPadsForm = true
      this.showPowerCabinetForm = false
      this.showSwitchGearForm = false
      this.showRFIDForm = false
      this.submitted = false
      this.addAssetsForm['controls']['assetCableDetails'].reset()
      this.addAssetsForm['controls']['assetModemDetails'].reset()
      this.addAssetsForm['controls']['assetPowerCabinetDetails'].reset()
      this.addAssetsForm['controls']['assetRFIDReaderDetails'].reset()
      this.addAssetsForm['controls']['assetSwitchGearDetails'].reset()
    } else if (this.typeId == 4) {
      this.showCableForm = false
      this.showModemForm = false
      this.showPadsForm = false
      this.showPowerCabinetForm = true
      this.showSwitchGearForm = false
      this.showRFIDForm = false
      this.submitted = false

      this.addAssetsForm['controls']['assetCableDetails'].reset()
      this.addAssetsForm['controls']['assetModemDetails'].reset()
      this.addAssetsForm['controls']['assetPadDetails'].reset()
      this.addAssetsForm['controls']['assetRFIDReaderDetails'].reset()
      this.addAssetsForm['controls']['assetSwitchGearDetails'].reset()
    } else if (this.typeId == 6) {
      this.showCableForm = false
      this.showModemForm = false
      this.showPadsForm = false
      this.showPowerCabinetForm = false
      this.showRFIDForm = false
      this.showSwitchGearForm = true
      this.submitted = false
      this.addAssetsForm['controls']['assetCableDetails'].reset()
      this.addAssetsForm['controls']['assetModemDetails'].reset()
      this.addAssetsForm['controls']['assetPadDetails'].reset()
      this.addAssetsForm['controls']['assetRFIDReaderDetails'].reset()
      this.addAssetsForm['controls']['assetPowerCabinetDetails'].reset()
    } else {
      this.showCableForm = false
      this.showModemForm = false
      this.showPadsForm = false
      this.showPowerCabinetForm = false
      this.showRFIDForm = true
      this.showSwitchGearForm = false
      this.submitted = false
      this.addAssetsForm['controls']['assetCableDetails'].reset()
      this.addAssetsForm['controls']['assetModemDetails'].reset()
      this.addAssetsForm['controls']['assetPadDetails'].reset()
      this.addAssetsForm['controls']['assetPowerCabinetDetails'].reset()
      this.addAssetsForm['controls']['assetSwitchGearDetails'].reset()
    }
  }
  /**
   * ADD ASSETS
   */

  addAssets() {
    this.submitted = true
    if (!this.validateFormGroup('assetDetails', this.addAssetsForm.get('assetDetails'))) {
      return
    }

    if (this.typeId == 1) {
      this.createCable()
    } else if (this.typeId == 2) {
      this.createModem()
    } else if (this.typeId == 3) {
      this.createPad()
    } else if (this.typeId == 4) {
      this.createPowerCabinet()
    } else if (this.typeId == 5) {
      this.createRfIdReader()
    } else if (this.typeId == 6) {
      this.createSwitchGear()
    }
  }
  /**
   * UPDATE ASSETS
   */
  updateAssets() {
    this.submitted = true
    if (!this.validateFormGroup('assetDetails', this.addAssetsForm.get('assetDetails'))) {
      return
    }
    if (this.typeId == 1) {
      this.updateCable()
    } else if (this.typeId == 2) {
      this.updateModem()
    } else if (this.typeId == 3) {
      this.updatePad()
    } else if (this.typeId == 4) {
      this.updatePowerCabinet()
    } else if (this.typeId == 5) {
      this.updateRFIDReader()
    } else if (this.typeId == 6) {
      this.updateSwitchGear()
    }
  }

  /**
   * GET CABLE DATA BY ID
   */

  getCableDetailsById(id: any) {
    this._adminService.GetCableById(id).subscribe((res) => {
      if (res.data) {
        this.patchAssetDetails(res.data)
        this.patchMakeAndModel('assetCableDetails', res.data, 'makeMaster', 'model')
        this.patchWarrantyDetails('assetCableDetails', res.data)
      }
    })
  }

  /**
   * GET ALL LOCATIONS
   */

  GetAllLocation() {
    this._adminService.GetAllLocationName().subscribe((res) => {
      if (res.data) {
        this.locationList = res.data
      }
    })
  }
  /**
   *
   * @param id
   * SELECT LOCATION
   */
  selectLocation(event: any, id: any) {
    if (!event.isUserInput) {
      return
    }
    this.selectedLocation = id
  }

  /**
   *
   * @param id
   * SELECT STATUS
   */

  selectStatus(event: any, id: any) {
    if (!event.isUserInput) {
      return
    }
    this.selectedStatus = id
  }

  /**
   *
   * CREATE PAD
   */
  createPad() {
    if (!this.validateFormGroup('assetPadDetails', this.addAssetsForm.get('assetPadDetails'))) {
      return
    }
    const padRequestBody = this.buildPadRequestBody(this.addAssetsForm, false)

    this.showConfirmationDialog().then((result) => {
      if (result.isDismissed) {
        this._adminService.CreatePad(padRequestBody).subscribe(
          (res) => {
            if (res) {
              this.handleSuccess('Record saved successfully.')
            }
          },
          (error: any) => {
            this.handleError(error)
          },
        )
      }
    })
  }

  /**
   * Update pad details
   */

  updatePad() {
    if (!this.validateFormGroup('assetPadDetails', this.addAssetsForm.get('assetPadDetails'))) {
      return
    }
    const padRequestBody = this.buildPadRequestBody(this.addAssetsForm, true)

    this.showConfirmationDialog().then((result) => {
      if (result.isDismissed) {
        this._adminService.UpdatePad(padRequestBody).subscribe(
          (res) => {
            if (res) {
              this.handleSuccess('Record updated successfully.')
            }
          },
          (error: any) => {
            this.handleError(error)
          },
        )
      }
    })
  }

  /**
   * Create cable details
   */

  createCable() {
    const cableRequestBody = this.buildCableRequestBody(this.addAssetsForm, false)

    this.showConfirmationDialog().then((result) => {
      if (result.isDismissed) {
        this._adminService.CreateCable(cableRequestBody).subscribe(
          (res) => {
            if (res.statusCode == 200) {
              this.handleSuccess('Record saved successfully.')
            }
          },
          (error: any) => {
            this.handleError(error)
          },
        )
      }
    })
  }

  /**
   * Update cable details
   */

  updateCable() {
    if (!this.validateFormGroup('assetCableDetails', this.addAssetsForm.get('assetCableDetails'))) {
      return
    }
    const cableRequestBody = this.buildCableRequestBody(this.addAssetsForm, true)

    this.showConfirmationDialog().then((result) => {
      if (result.isDismissed) {
        this._adminService.UpdateCable(cableRequestBody).subscribe(
          (res) => {
            if (res) {
              this.handleSuccess('Record updated successfully.')
            }
          },
          (error: any) => {
            this.handleError(error)
          },
        )
      }
    })
  }

  /**
   * @param id
   * Get Pad details By ID
   */

  getPadDetailsbyID(id: number) {
    this._adminService.GetPadById(id).subscribe((res) => {
      if (res.data) {
        this.patchAssetDetails(res.data)
        ;(this.addAssetsForm['controls']['assetPadDetails'] as any).patchValue({
          InstallationDate: res.data.installationDate,
          PadName: res.data.padName,
        })
      }
    })
  }

  /**
   * @param data
   * Set asset details
   */
  setAssetsDetails(data: any) {
    this.patchAssetDetails(data)
  }

  /**
   * Calculate duration start
   */

  calDurationStart(event: any, type: string) {
    if (type == 'cable') {
      const endDate = this.addAssetsForm.value.assetCableDetails?.WarrantyEnd
      const startDate = event.value
      this.handleWarrantyStartDateChange('cable', startDate, endDate)
    } else if (type == 'power-cabinet') {
      const endDate = this.addAssetsForm.value.assetPowerCabinetDetails?.WarrantyEnd
      const startDate = event.value
      this.handleWarrantyStartDateChange('power-cabinet', startDate, endDate)
    } else if (type == 'rfid') {
      const endDate = this.addAssetsForm.value.assetRFIDReaderDetails?.WarrantyEnd
      const startDate = event.value
      this.handleWarrantyStartDateChange('rfid', startDate, endDate)
    } else if (type == 'modem') {
      const endDate = this.addAssetsForm.value.assetModemDetails?.WarrantyEnd
      const startDate = event.value
      this.handleWarrantyStartDateChange('modem', startDate, endDate)
    }
  }

  /**
   * Duration cal end
   * @param event
   * @param type
   * @returns
   */

  calDuration(event: any, type: string) {
    if (type == 'cable') {
      const startDate = this.addAssetsForm.value.assetCableDetails?.WarrantyStart
      const endDate = event.value
      this.handleWarrantyEndDateChange('cable', startDate, endDate)
    } else if (type == 'power-cabinet') {
      const startDate = this.addAssetsForm.value.assetPowerCabinetDetails?.WarrantyStart
      const endDate = event.value
      this.handleWarrantyEndDateChange('power-cabinet', startDate, endDate)
    } else if (type == 'rfid') {
      const startDate = this.addAssetsForm.value.assetRFIDReaderDetails?.WarrantyStart
      const endDate = event.value
      this.handleWarrantyEndDateChange('rfid', startDate, endDate)
    } else if (type == 'modem') {
      const startDate = this.addAssetsForm.value.assetModemDetails?.WarrantyStart
      const endDate = event.value
      this.handleWarrantyEndDateChange('modem', startDate, endDate)
    }
  }

  /**
   *
   * @param d
   * @returns
   * Date filter
   */

  dateFilter = (d: any | null) => {
    const warrantyStart = this.addAssetsForm.value.assetCableDetails?.WarrantyStart;
  return warrantyStart ? d >= warrantyStart : false;
  }
  /**
   * Get all make
   */

  GetAllMakeMaster() {
    this._adminService.GetAllMakeMaster().subscribe((res: any) => {
      this.makeList = res.data
    })
  }
  /**
   * Get all model data
   * @param UserId
   */

  GetAllModelData(UserId: any) {
    const body = {
      UserId: UserId,
    }
    this._adminService.GetAllModelData(body).subscribe((res: any) => {
      this.modelList = res.data
    })
  }

  /**
   * Get all modem type
   *
   */

  GetAllModemTypeData() {
    this._adminService.GetAllModemTypeData().subscribe((res: any) => {
      this.modemTypeList = res.data
    })
  }
  /**
   * Select cable make
   * @param id
   */
  selectMakeCable(event: any, id: number) {
    this.selectMakeOrModel(event, id, 'selectedMakeCable')
  }

  /**
   *Select cable model
   * @param id
   */

  selectModelCable(event: any, id: number) {
    this.selectMakeOrModel(event, id, 'selectedModelCable')
  }

  /**
   *
   * @returns
   * Create power cabinet details
   */

  createPowerCabinet() {
    if (!this.validateFormGroup('assetPowerCabinetDetails', this.addAssetsForm.get('assetPowerCabinetDetails'))) {
      return
    }
    const powerCabinetRequestBody = this.buildPowerCabinetRequestBody(this.addAssetsForm, false)

    this.showConfirmationDialog().then((result) => {
      if (result.isDismissed) {
        this._adminService.CreatePowerCabinet(powerCabinetRequestBody).subscribe(
          (res) => {
            if (res) {
              this.handleSuccess('Record saved successfully.')
            }
          },
          (error: any) => {
            this.handleError(error)
          },
        )
      }
    })
  }

  /**
   *
   * @returns
   * Update power cabinet details
   */

  updatePowerCabinet() {
    if (!this.validateFormGroup('assetPowerCabinetDetails', this.addAssetsForm.get('assetPowerCabinetDetails'))) {
      return
    }
    const powerCabinetRequestBody = this.buildPowerCabinetRequestBody(this.addAssetsForm, true)

    this.showConfirmationDialog().then((result) => {
      if (result.isDismissed) {
        this._adminService.UpdatePowerCabinet(powerCabinetRequestBody).subscribe(
          (res) => {
            if (res) {
              this.handleSuccess('Record updated successfully.')
            }
          },
          (error: any) => {
            this.handleError(error)
          },
        )
      }
    })
  }
  /**
   *
   * @param id
   * Get power cabinet details by ID
   */

  getPowerCabinetById(id: number) {
    this._adminService.GetPowerCabinetById(id).subscribe((res) => {
      if (res.data) {
        this.patchAssetDetails(res.data)
        ;(this.addAssetsForm['controls']['assetPowerCabinetDetails'] as any).patchValue({
          BreakerRating: res.data.breakerRating,
          DCPortQuantity: res.data.dcPortQuantityRating,
          InstallationDate: res.data.installationDate,
          PeakCurrent: res.data.peakCurrent,
          ServiceVolts: res.data.serviceVolts,
        })
        this.patchWarrantyDetails('assetPowerCabinetDetails', res.data)
        this.patchMakeAndModel('assetPowerCabinetDetails', res.data, 'makeMaster', 'model')
      }
    })
  }

  /**
   *
   * @param id
   * Select power cabinet make
   */
  selectMakePowerCabinet(event: any, id: any) {
    this.selectMakeOrModel(event, id, 'selectedMakePowerCabinet')
  }

  /**
   *
   * @param event
   * @param id
   * @returns
   *
   * Select power cabinet model
   */

  selectModelPowerCabinet(event: any, id: any) {
    this.selectMakeOrModel(event, id, 'selectedModelPowerCabinet')
  }

  /**
   *
   * @returns
   * Create RFID readers details
   */

  createRfIdReader() {
    if (!this.validateFormGroup('assetRFIDReaderDetails', this.addAssetsForm.get('assetRFIDReaderDetails'))) {
      return
    }
    const rfidReaderRequestBody = this.buildRfidReaderRequestBody(this.addAssetsForm, false)

    this.showConfirmationDialog().then((result) => {
      if (result.isDismissed) {
        this._adminService.AddRfIdReader(rfidReaderRequestBody).subscribe(
          (res) => {
            if (res) {
              this.handleSuccess('Record saved successfully.')
            }
          },
          (error: any) => {
            this.handleError(error)
          },
        )
      }
    })
  }

  /**
   *
   * @returns
   * Update RFID reader details
   */

  updateRFIDReader() {
    if (!this.validateFormGroup('assetRFIDReaderDetails', this.addAssetsForm.get('assetRFIDReaderDetails'))) {
      return
    }
    const rfidReaderRequestBody = this.buildRfidReaderRequestBody(this.addAssetsForm, true)

    this.showConfirmationDialog().then((result) => {
      if (result.isDismissed) {
        this._adminService.UpdateRfIdReader(rfidReaderRequestBody).subscribe(
          (res) => {
            if (res) {
              this.handleSuccess('Record updated successfully.')
            }
          },
          (error: any) => {
            this.handleError(error)
          },
        )
      }
    })
  }

  /**
   *
   * Get RFID readers by ID
   */

  getRfidReaderById(id: number) {
    this._adminService.GetRfIdReaderById(id).subscribe((res) => {
      if (res.data) {
        this.patchAssetDetails(res.data)
        ;(this.addAssetsForm['controls']['assetRFIDReaderDetails'] as any).patchValue({
          CardReader: res.data.cardReader,
        })
        this.patchWarrantyDetails('assetRFIDReaderDetails', res.data)
        this.patchMakeAndModel('assetRFIDReaderDetails', res.data, 'makeMaster', 'model')
      }
    })
  }

  /**
   * Select RFID make
   * @param id
   */
  selectMakeRFID(event: any, id: number) {
    this.selectMakeOrModel(event, id, 'selectedMakeRFID')
  }

  /**
   * Select RFID model
   * @param id
   */

  selectModelRFID(event: any, id: number) {
    this.selectMakeOrModel(event, id, 'selectedModelRFID')
  }

  /**
   *
   * @param event
   * @returns
   * Number only
   */

  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false
    }
    return true
  }

  /**
   * Select modem make
   * @param id
   */
  selectMakeModem(event: any, id: number) {
    this.selectMakeOrModel(event, id, 'selectedMakeModem')
  }

  /**
   * Select modem model
   * @param id
   */

  selectModelModem(event: any, id: number) {
    this.selectMakeOrModel(event, id, 'selectedModelModem')
  }

  /**
   * Select modem type
   * @param id
   */

  selectModemType(event: any, id: number) {
    this.selectMakeOrModel(event, id, 'selectedModemType')
  }

  /**
   *
   * @returns
   * Create modem
   */

  createModem() {
    if (!this.validateFormGroup('assetModemDetails', this.addAssetsForm.get('assetModemDetails'))) {
      return
    }
    const modemRequestBody = this.buildModemRequestBody(this.addAssetsForm, false)

    this.showConfirmationDialog().then((result) => {
      if (result.isDismissed) {
        this._adminService.CreateModem(modemRequestBody).subscribe(
          (res) => {
            if (res) {
              this.handleSuccess('Record saved successfully.')
            }
          },
          (error: any) => {
            this.handleError(error)
          },
        )
      }
    })
  }

  /**
   *
   * @param id
   * Get modem details by ID
   */

  getModemDetailsById(id: number) {
    this._adminService.GetModembyid(id).subscribe((res) => {
      if (res.data) {
        this.patchAssetDetails(res.data)
        ;(this.addAssetsForm['controls']['assetModemDetails'] as any).patchValue({
          Carrier: res.data.carrier,
          ImeiNumber: res.data.imeiNumber,
          InstallationDate: res.data.installationDate,
          IpAddress: res.data.ipAddress,
          SimNumber: res.data.simNumber,
        })
        this.patchWarrantyDetails('assetModemDetails', res.data)

        if (res.data.modemTypeName) {
          this.selectedModemType = res.data.modemTypeId
          ;(this.addAssetsForm['controls']['assetModemDetails'] as any).patchValue({
            ModemType: res.data.modemTypeId,
          })
        }

        this.patchMakeAndModel('assetModemDetails', res.data, 'makeMaster', 'model')
      }
    })
  }

  /**
   *
   * @returns
   * Update modem details
   */

  updateModem() {
    if (!this.validateFormGroup('assetModemDetails', this.addAssetsForm.get('assetModemDetails'))) {
      return
    }
    const modemRequestBody = this.buildModemRequestBody(this.addAssetsForm, true)

    this.showConfirmationDialog().then((result) => {
      if (result.isDismissed) {
        this._adminService.UpdateModem(modemRequestBody).subscribe(
          (res) => {
            if (res) {
              this.handleSuccess('Record updated successfully.')
            }
          },
          (error: any) => {
            this.handleError(error)
          },
        )
      }
    })
  }
  /**
   *
   * @param id
   * Get switch gear details by ID
   */
  getSwitchGearDetailsById(id: number) {
    this._adminService.GetSwitchGearById(id).subscribe((res) => {
      if (res.data) {
        this.patchAssetDetails(res.data)
        ;(this.addAssetsForm['controls']['assetSwitchGearDetails'] as any).patchValue({
          switchGearName: res.data.switchGearName,
        })
      }
    })
  }

  /**
   *
   * @returns
   * Create switch gear details
   */

  createSwitchGear() {
    if (!this.validateFormGroup('assetSwitchGearDetails', this.addAssetsForm.get('assetSwitchGearDetails'))) {
      return
    }
    const switchGearRequestBody = this.buildSwitchGearRequestBody(this.addAssetsForm, false)

    this.showConfirmationDialog().then((result) => {
      if (result.isDismissed) {
        this._adminService.CreateSwitchGear(switchGearRequestBody).subscribe(
          (res) => {
            if (res) {
              this.handleSuccess('Record saved successfully.')
            }
          },
          (error: any) => {
            this.handleError(error)
          },
        )
      }
    })
  }

  /**
   * @returns
   * Update switch gear details
   */

  updateSwitchGear() {
    if (!this.validateFormGroup('assetSwitchGearDetails', this.addAssetsForm.get('assetSwitchGearDetails'))) {
      return
    }
    const switchGearRequestBody = this.buildSwitchGearRequestBody(this.addAssetsForm, true)

    this.showConfirmationDialog().then((result) => {
      if (result.isDismissed) {
        this._adminService.UpdateSwitchGear(switchGearRequestBody).subscribe(
          (res) => {
            if (res) {
              this.handleSuccess('Record updated successfully.')
            }
          },
          (error: any) => {
            this.handleError(error)
          },
        )
      }
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
      (k >= 48 && k <= 57)
    )
  }
  checkInstallationDate(event: any, type: string) {
    if (type == 'power-cabinet') {
      let startDate = this.addAssetsForm.value.assetPowerCabinetDetails?.WarrantyStart
      let sDate = startDate ? new Date(startDate):null

      let endDate = this.addAssetsForm.value.assetPowerCabinetDetails?.WarrantyEnd
      let eDate = endDate ? new Date(endDate) : null

      if (!sDate || !eDate) {
        this._toastr.error(
          'Please select warranty start and warranty end date first.',
        )
        this.addAssetsForm['controls']['assetPowerCabinetDetails'].patchValue({
          InstallationDate: '',
        })
        return
      } else {
        let insDate = event.value
        if (!(insDate >= sDate && insDate < eDate)) {
          this._toastr.error(
            'Please select installation date greater than warranty start date and less than warrranty end date.',
          )
          this.addAssetsForm['controls']['assetPowerCabinetDetails'].patchValue(
            {
              InstallationDate: '',
            },
          )

          return
        }
      }
    } else if (type == 'modem') {
      let startDate = this.addAssetsForm.value.assetModemDetails?.WarrantyStart

      let sDate =  startDate ? new Date(startDate) : null

      let endDate = this.addAssetsForm.value.assetModemDetails?.WarrantyEnd

      let eDate = endDate ? new Date(endDate):null

      if (!sDate || !eDate) {
        this._toastr.error(
          'Please select warranty start and warranty end date first.',
        )
        this.addAssetsForm['controls']['assetModemDetails'].patchValue({
          InstallationDate: '',
        })
        return
      } else {
        let insDate = event.value
        if (!(insDate >= sDate && insDate < eDate)) {
          this._toastr.error(
            'Please select installation date greater than warranty start date and less than warrranty end date.',
          )
          this.addAssetsForm['controls']['assetModemDetails'].patchValue({
            InstallationDate: '',
          })

          return
        }
      }
    }
  }

  /**
   * @returns
   * Get modefied time
   */
  getModifiedTime() {
    let date = new Date()
    let time = this.datePipe.transform(date, 'HH:mm:ss')
    return time
  }

  /**
   * Common form validation method
   * @param formGroupName - Name of the form group to validate
   * @param formControl - The form group to validate
   * @returns boolean - true if valid, false if invalid
   */
  validateFormGroup(formGroupName: string, formControl: any): boolean {
    if (formControl?.invalid) {
      this._toastr.error('Please fill mandatory fields.')
      return false
    }
    return true
  }

  /**
   * Common success handler for all operations
   */
  handleSuccess(message: string) {
    this._toastr.success(message)
    this.addAssetsForm.reset()
    this.showLoader = false
    this.submitted = false
    this._router.navigate(['admin/assets'])
  }

  /**
   * Common error handler for all operations
   */
  handleError(error: any) {
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
  }

  /**
   * Common confirmation dialog configuration
   */
  showConfirmationDialog(): Promise<any> {
    return Swal.fire({
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
    })
  }

  /**
   * Common date transformation helper
   */
  transformDate(date: any): string {
    return this.datePipe.transform(date, 'yyyy-MM-ddT' + this.getModifiedTime()) || ''
  }

  /**
   * Generic duration calculation method
   */
  calculateDuration(startDate: any, endDate: any): string {
    if (!startDate || !endDate) {
      return ''
    }

    const start = new Date(startDate)
    const end = new Date(endDate)

    if (start > end) {
      return ''
    }

    const duration = Math.floor(
      (Date.UTC(end.getFullYear(), end.getMonth(), end.getDate()) -
        Date.UTC(start.getFullYear(), start.getMonth(), start.getDate())) /
        (1000 * 60 * 60 * 24)
    )

    return String(duration)
  }

  /**
   * Generic form patcher for asset details
   */
  patchAssetDetails(data: any) {
    this.addAssetsForm['controls']['assetDetails'].patchValue({
      SerialNumber: data.serialNumber,
      AssetID: data.assetId,
    })

    if (data.locationName) {
      this.selectedLocation = data.locationId
      this.addAssetsForm['controls']['assetDetails'].patchValue({
        Location: data.locationName,
      })
    }

    if (data.statusName) {
      this.selectedStatus = data.statusId
      this.addAssetsForm['controls']['assetDetails'].patchValue({
        Status: data.statusName,
      })
    }

    this.addAssetsForm['controls']['assetDetails'].patchValue({
      IsActive: data.isActive,
    })
  }

  /**
   * Generic method to patch warranty details
   */
  patchWarrantyDetails(formGroupName: keyof typeof this.addAssetsForm.controls, data: any) {
    (this.addAssetsForm['controls'][formGroupName] as any).patchValue({
      WarrantyStart: data.warrantyStartDate,
      WarrantyEnd: data.warrantyExpiryDate,
      WarrantyDuration: data.warrantyDuration,
    })
  }

  /**
   * Generic method to patch make and model
   */
  patchMakeAndModel(formGroupName: keyof typeof this.addAssetsForm.controls, data: any, makeField: string, modelField: string) {
    if (data[`${makeField}Name`]) {
      const makeProperty = `selectedMake${makeField}` as keyof this
      ;(this as any)[makeProperty] = data[`${makeField}Id`]
      ;(this.addAssetsForm['controls'][formGroupName] as any).patchValue({
        Make: data[`${makeField}Name`],
      })
    }

    if (data[`${modelField}Name`]) {
      const modelProperty = `selectedModel${modelField}` as keyof this
      ;(this as any)[modelProperty] = data[`${modelField}Id`]
      ;(this.addAssetsForm['controls'][formGroupName] as any).patchValue({
        Model: data[`${modelField}Name`],
      })
    }
  }

  /**
   * Generic selection method for make/model
   */
  selectMakeOrModel(event: any, id: number, propertyName: keyof this): void {
    if (!event.isUserInput) {
      return
    }
    ;(this as any)[propertyName] = id
  }

  /**
   * Generic method to build modem request body
   */
  buildModemRequestBody(data: any, isUpdate: boolean = false) {
    const baseBody = {
      assetId: data?.value?.assetDetails?.AssetID?.trim(),
      makeMasterId: this.selectedMakeModem,
      modelId: this.selectedModelModem,
      serialNumber: data.value.assetDetails?.SerialNumber?.trim(),
      isActive: data.value.assetDetails?.IsActive,
      statusId: this.selectedStatus,
      locationId: this.selectedLocation,
      carrier: data.value.assetModemDetails?.Carrier,
      installationDate: this.transformDate(data.value.assetModemDetails?.InstallationDate),
      simNumber: data.value.assetModemDetails?.SimNumber,
      modemTypeId: this.selectedModemType,
      imeiNumber: data.value.assetModemDetails?.ImeiNumber,
      ipAddress: data.value.assetModemDetails?.IpAddress,
      warrantyDuration: data.value.assetModemDetails?.WarrantyDuration,
      warrantyExpiryDate: this.transformDate(data.value.assetModemDetails?.WarrantyEnd),
      warrantyStartDate: this.transformDate(data.value.assetModemDetails?.WarrantyStart),
    }

    if (isUpdate) {
      return {
        id: this.assetId,
        ...baseBody,
        modifiedBy: this.UserId,
      }
    } else {
      return {
        ...baseBody,
        createdBy: this.UserId,
      }
    }
  }

  /**
   * Generic method to build cable request body
   */
  buildCableRequestBody(data: any, isUpdate: boolean = false) {
    const baseBody = {
      assetId: data.value.assetDetails?.AssetID?.trim(),
      serialNumber: data.value.assetDetails?.SerialNumber?.trim(),
      makeMasterId: this.selectedMakeCable,
      modelId: this.selectedModelCable,
      locationId: this.selectedLocation,
      statusId: this.selectedStatus,
      isActive: data.value.assetDetails?.IsActive,
      warrantyDuration: data.value.assetCableDetails?.WarrantyDuration,
      warrantyExpiryDate: this.transformDate(data.value.assetCableDetails?.WarrantyEnd),
      warrantyStartDate: this.transformDate(data.value.assetCableDetails?.WarrantyStart),
    }

    if (isUpdate) {
      return {
        id: this.assetId,
        ...baseBody,
        modifiedBy: this.UserId,
      }
    } else {
      return {
        ...baseBody,
        createdBy: this.UserId,
      }
    }
  }

  /**
   * Generic method to build pad request body
   */
  buildPadRequestBody(data: any, isUpdate: boolean = false) {
    const baseBody = {
      serialNumber: data.value.assetDetails?.SerialNumber?.trim(),
      assetId: data.value.assetDetails?.AssetID?.trim(),
      installationDate: this.transformDate(data.value.assetPadDetails?.InstallationDate),
      isActive: data.value.assetDetails?.IsActive,
      padName: data.value.assetPadDetails?.PadName,
      statusId: this.selectedStatus,
      locationId: this.selectedLocation,
    }

    if (isUpdate) {
      return {
        id: this.assetId,
        ...baseBody,
        modifiedBy: this.UserId,
      }
    } else {
      return {
        ...baseBody,
        createdBy: this.UserId,
      }
    }
  }

  /**
   * Generic method to build power cabinet request body
   */
  buildPowerCabinetRequestBody(data: any, isUpdate: boolean = false) {
    const baseBody = {
      assetId: data.value.assetDetails?.AssetID?.trim(),
      breakerRating: Number.parseInt(data.value.assetPowerCabinetDetails?.BreakerRating ?? '0'),
      dcPortQuantityRating: Number.parseInt(data.value.assetPowerCabinetDetails?.DCPortQuantity ?? '0'),
      installationDate: this.transformDate(data.value.assetPowerCabinetDetails?.InstallationDate),
      makeMasterId: this.selectedMakePowerCabinet,
      modelId: this.selectedModelPowerCabinet,
      peakCurrent: Number.parseInt(data.value.assetPowerCabinetDetails?.PeakCurrent ?? '0'),
      serialNumber: data.value.assetDetails?.SerialNumber?.trim(),
      serviceVolts: Number.parseInt(data.value.assetPowerCabinetDetails?.ServiceVolts ?? '0'),
      isActive: data.value.assetDetails?.IsActive,
      statusId: this.selectedStatus,
      locationId: this.selectedLocation,
      warrantyDuration: data.value.assetPowerCabinetDetails?.WarrantyDuration,
      warrantyExpiryDate: this.transformDate(data.value.assetPowerCabinetDetails?.WarrantyEnd),
      warrantyStartDate: this.transformDate(data.value.assetPowerCabinetDetails?.WarrantyStart),
    }

    if (isUpdate) {
      return {
        id: this.assetId,
        ...baseBody,
        modifiedBy: this.UserId,
      }
    } else {
      return {
        ...baseBody,
        createdBy: this.UserId,
      }
    }
  }

  /**
   * Generic method to build RFID reader request body
   */
  buildRfidReaderRequestBody(data: any, isUpdate: boolean = false) {
    const baseBody = {
      assetId: data.value.assetDetails?.AssetID?.trim(),
      makeMasterId: this.selectedMakeRFID,
      modelId: this.selectedModelRFID,
      serialNumber: data.value.assetDetails?.SerialNumber?.trim(),
      isActive: data.value.assetDetails?.IsActive,
      statusId: this.selectedStatus,
      locationId: this.selectedLocation,
      cardReader: data.value.assetRFIDReaderDetails?.CardReader,
      warrantyDuration: data.value.assetRFIDReaderDetails?.WarrantyDuration,
      warrantyExpiryDate: this.transformDate(data.value.assetRFIDReaderDetails?.WarrantyEnd),
      warrantyStartDate: this.transformDate(data.value.assetRFIDReaderDetails?.WarrantyStart),
    }

    if (isUpdate) {
      return {
        id: this.assetId,
        ...baseBody,
        modifiedBy: this.UserId,
      }
    } else {
      return {
        ...baseBody,
        createdBy: this.UserId,
      }
    }
  }

  /**
   * Generic method to build switch gear request body
   */
  buildSwitchGearRequestBody(data: any, isUpdate: boolean = false) {
    const baseBody = {
      assetId: data.value.assetDetails?.AssetID?.trim(),
      serialNumber: data.value.assetDetails?.SerialNumber?.trim(),
      isActive: data.value.assetDetails?.IsActive,
      statusId: this.selectedStatus,
      locationId: this.selectedLocation,
      switchGearName: data.value.assetSwitchGearDetails?.switchGearName,
    }

    if (isUpdate) {
      return {
        id: this.assetId,
        ...baseBody,
        modifiedBy: this.UserId,
      }
    } else {
      return {
        ...baseBody,
        createdBy: this.UserId,
      }
    }
  }

  /**
   * Generic method to handle warranty start date change for any asset type
   */
  handleWarrantyStartDateChange(assetType: string, startDate: any, endDate: any) {
    if (!endDate) return

    if (startDate > new Date(endDate)) {
      this._toastr.error('Please start date should be less than end date.')
      this.clearWarrantyFields(assetType)
    } else {
      const duration = this.calculateDuration(startDate, endDate)
      if (duration) {
        this.setWarrantyDuration(assetType, duration)
      }
    }
  }

  /**
   * Generic method to handle warranty end date change for any asset type
   */
  handleWarrantyEndDateChange(assetType: string, startDate: any, endDate: any) {
    if (!startDate) {
      this._toastr.error('Please Choose Start Date first.')
      this.clearWarrantyEndField(assetType)
      return
    }

    if (new Date(startDate) > endDate) {
      this._toastr.error('End date should be greater than start date.')
      this.clearWarrantyEndAndDurationFields(assetType)
    } else {
      const duration = this.calculateDuration(startDate, endDate)
      if (duration) {
        this.setWarrantyDuration(assetType, duration)
      }
    }
  }

  /**
   * Helper method to clear warranty fields based on asset type
   */
  clearWarrantyFields(assetType: string) {
    const formControl = this.getWarrantyFormControl(assetType)
    if (formControl) {
      formControl.patchValue({
        WarrantyEnd: '',
        WarrantyDuration: '',
      })
    }
  }

  /**
   * Helper method to clear only warranty end field
   */
  clearWarrantyEndField(assetType: string) {
    const formControl = this.getWarrantyFormControl(assetType)
    if (formControl) {
      formControl.patchValue({
        WarrantyEnd: '',
      })
    }
  }

  /**
   * Helper method to clear warranty end and duration fields
   */
  clearWarrantyEndAndDurationFields(assetType: string) {
    const formControl = this.getWarrantyFormControl(assetType)
    if (formControl) {
      formControl.patchValue({
        WarrantyEnd: '',
        WarrantyDuration: '',
      })
    }
  }

  /**
   * Helper method to set warranty duration
   */
  setWarrantyDuration(assetType: string, duration: string) {
    const formControl = this.getWarrantyFormControl(assetType)
    if (formControl) {
      formControl.patchValue({
        WarrantyDuration: duration,
      })
    }
  }

  /**
   * Helper method to get the correct form control based on asset type
   */
  getWarrantyFormControl(assetType: string): any {
    switch (assetType) {
      case 'cable':
        return this.addAssetsForm['controls']['assetCableDetails']
      case 'power-cabinet':
        return this.addAssetsForm['controls']['assetPowerCabinetDetails']
      case 'rfid':
        return this.addAssetsForm['controls']['assetRFIDReaderDetails']
      case 'modem':
        return this.addAssetsForm['controls']['assetModemDetails']
      default:
        return null
    }
  }
}
