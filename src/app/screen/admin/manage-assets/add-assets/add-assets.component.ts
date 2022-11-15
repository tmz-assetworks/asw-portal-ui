import { DatePipe } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { ToastrService } from 'ngx-toastr'
import { StorageService } from 'src/app/service/storage.service'
import Swal from 'sweetalert2'

import { AdminService } from '../../admin.service'

@Component({
  selector: 'app-add-assets',
  templateUrl: './add-assets.component.html',
  styleUrls: ['./add-assets.component.scss'],
})
export class AddAssetsComponent implements OnInit {
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
  assetTitle = 'Add Assets'
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
      this.assetTitle = 'Edit Assets'
      this.isUpdate = true
      this.isSave = false
    } else if (this.assetId && routePath == 'view-assets') {
      this.assetTitle = 'View Assets'
      this.isSave = false
      this.addAssetsForm.disable()
    } else {
      this.assetTitle = 'Add Assets'
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

  modemTypeList = [
    { id: 1, name: 'modemtype1' },
    { id: 2, name: 'modemtype2' },
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
      IsActive: new FormControl(false, Validators.required),
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
    this.GetAllLocation() // CALL LOCATION API
    this.GetAllMakeMaster() // CALL MAKE API
    this.GetAllModelData(this.UserId) // CALL MODEL API

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
    if (this.addAssetsForm.get('assetDetails')?.invalid) {
      this._toastr.error('Please fill mandatory fields.')
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
    if (this.addAssetsForm.get('assetDetails')?.invalid) {
      this._toastr.error('Please fill mandatory fields.')
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
        this.setAssetsDetails(res.data)

        if (res.data.makeMasterId) {
          this.selectedMakeCable = res.data.makeMasterId
          this.addAssetsForm['controls']['assetCableDetails'].patchValue({
            Make: res.data.makeMasterName,
          })
        }
        if (res.data.modelName) {
          this.selectedModelCable = res.data.modelId
          this.addAssetsForm['controls']['assetCableDetails'].patchValue({
            Model: res.data.modelName,
          })
        }

        this.addAssetsForm['controls']['assetCableDetails'].patchValue({
          WarrantyStart: res.data.warrantyStartDate,
        })
        this.addAssetsForm['controls']['assetCableDetails'].patchValue({
          WarrantyEnd: res.data.warrantyExpiryDate,
        })
        this.addAssetsForm['controls']['assetCableDetails'].patchValue({
          WarrantyDuration: res.data.warrantyDuration,
        })
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
    if (this.addAssetsForm.get('assetPadDetails')?.invalid) {
      this._toastr.error('Please fill mandatory fields.')
      return
    }
    let data = this.addAssetsForm
    const pBody = {
      serialNumber: data.value.assetDetails.SerialNumber.trim(),
      assetId: data.value.assetDetails.AssetID.trim(),
      createdBy: this.UserId,
      installationDate: data.value.assetPadDetails.InstallationDate,
      isActive: data.value.assetDetails.IsActive,
      padName: data.value.assetPadDetails.PadName,
      statusId: this.selectedStatus,
      locationId: this.selectedLocation,
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
        this._adminService.CreatePad(pBody).subscribe(
          (res) => {
            if (res) {
              //Do your stuffs...
              this._toastr.success('Record saved successfully.')
              this.addAssetsForm.reset()
              this.showLoader = false
              this.submitted = false
              this._router.navigate(['admin/assets'])
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
  /**
   * UPDATE PADS
   */

  updatePad() {
    if (this.addAssetsForm.get('assetPadDetails')?.invalid) {
      this._toastr.error('Please fill mandatory fields.')
      return
    }
    let data = this.addAssetsForm
    const pBody = {
      id: this.assetId,
      serialNumber: data.value.assetDetails.SerialNumber.trim(),
      assetId: data.value.assetDetails.AssetID.trim(),
      modifiedBy: this.UserId,
      installationDate: data.value.assetPadDetails.InstallationDate,
      isActive: data.value.assetDetails.IsActive,
      padName: data.value.assetPadDetails.PadName,
      statusId: this.selectedStatus,
      locationId: this.selectedLocation,
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
        this._adminService.UpdatePad(pBody).subscribe(
          (res) => {
            if (res) {
              //Do your stuffs...
              this._toastr.success('Record updated successfully.')
              this.addAssetsForm.reset()
              this.showLoader = false
              this.submitted = false
              this._router.navigate(['admin/assets'])
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

  /**
   * CREATE CABLES
   */

  createCable() {
    let data = this.addAssetsForm
    const pBody = {
      assetId: data.value.assetDetails.AssetID.trim(),
      serialNumber: data.value.assetDetails.SerialNumber.trim(),
      makeMasterId: this.selectedMakeCable,
      modelId: this.selectedModelCable,
      locationId: this.selectedLocation,
      statusId: this.selectedStatus,
      isActive: data.value.assetDetails.IsActive,
      warrantyDuration: data.value.assetCableDetails.WarrantyDuration,
      warrantyExpiryDate: this.datePipe.transform(
        data.value.assetCableDetails.WarrantyEnd,
        'yyyy-MM-ddThh:mm:ss',
      ),
      warrantyStartDate: this.datePipe.transform(
        data.value.assetCableDetails.WarrantyStart,
        'yyyy-MM-ddThh:mm:ss',
      ),
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
    }).then((result) => {
      if (result.isDismissed) {
        this._adminService.CreateCable(pBody).subscribe(
          (res) => {
            if (res.statusCode == 200) {
              //Do your stuffs...
              this._toastr.success('Record saved successfully.')
              this.addAssetsForm.reset()
              this.showLoader = false
              this.submitted = false
              this._router.navigate(['admin/assets'])
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

  /**
   * UPDATE CABLE
   */

  updateCable() {
    if (this.addAssetsForm.get('assetCableDetails')?.invalid) {
      this._toastr.error('Please fill mandatory fields.')
      return
    }
    let data = this.addAssetsForm
    const pBody = {
      id: this.assetId,
      assetId: data.value.assetDetails.AssetID.trim(),
      serialNumber: data.value.assetDetails.SerialNumber.trim(),
      makeMasterId: this.selectedMakeCable,
      modelId: this.selectedModelCable,
      locationId: this.selectedLocation,
      statusId: this.selectedStatus,
      isActive: data.value.assetDetails.IsActive,
      warrantyDuration: data.value.assetCableDetails.WarrantyDuration,
      warrantyExpiryDate: this.datePipe.transform(
        data.value.assetCableDetails.WarrantyEnd,
        'yyyy-MM-ddThh:mm:ss',
      ),
      warrantyStartDate: this.datePipe.transform(
        data.value.assetCableDetails.WarrantyStart,
        'yyyy-MM-ddThh:mm:ss',
      ),
      modifiedBy: this.UserId,
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
        this._adminService.UpdateCable(pBody).subscribe(
          (res) => {
            if (res) {
              //Do your stuffs...
              this._toastr.success('Record updated successfully.')
              this.addAssetsForm.reset()
              this.showLoader = false
              this.submitted = false
              this._router.navigate(['admin/assets'])
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

  /**
   *
   * @param id
   * GET PADS DATA BY ID
   */

  getPadDetailsbyID(id: number) {
    this._adminService.GetPadById(id).subscribe((res) => {
      if (res.data) {
        this.setAssetsDetails(res.data)
        this.addAssetsForm['controls']['assetPadDetails'].patchValue({
          InstallationDate: res.data.installationDate,
        })
        this.addAssetsForm['controls']['assetPadDetails'].patchValue({
          PadName: res.data.padName,
        })
      }
    })
  }
  /**
   *
   * @param data
   * SET ASSET DETAILS
   */
  setAssetsDetails(data: any) {
    // this.addAssetsForm['controls']['assetDetails'].patchValue({
    //   AssetCategory: data.type,
    // })
    this.addAssetsForm['controls']['assetDetails'].patchValue({
      SerialNumber: data.serialNumber,
    })
    this.addAssetsForm['controls']['assetDetails'].patchValue({
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
   * CALCULATE DURATION CABLE wARRANTY START
   */

  calDurationStart(event: any, type: string) {
    if (type == 'cable') {
      let endDate = this.addAssetsForm.value.assetCableDetails.WarrantyEnd

      let startDate = event.value

      let edate = new Date(endDate)

      if (endDate) {
        if (startDate > edate) {
          this._toastr.error('Please start date should be less than end date.')
          this.addAssetsForm['controls']['assetCableDetails'].patchValue({
            WarrantyEnd: '',
          })
          this.addAssetsForm['controls']['assetCableDetails'].patchValue({
            WarrantyDuration: '',
          })
        } else {
          let duration = Math.floor(
            (Date.UTC(edate.getFullYear(), edate.getMonth(), edate.getDate()) -
              Date.UTC(
                startDate.getFullYear(),
                startDate.getMonth(),
                startDate.getDate(),
              )) /
              (1000 * 60 * 60 * 24),
          )
          this.addAssetsForm['controls']['assetCableDetails'].patchValue({
            WarrantyDuration: duration,
          })
        }
      }
    } else if (type == 'power-cabinet') {
      let endDate = this.addAssetsForm.value.assetPowerCabinetDetails
        .WarrantyEnd

      let startDate = event.value

      let edate = new Date(endDate)

      if (endDate) {
        if (startDate > edate) {
          this._toastr.error('Please start date should be less than end date.')
          this.addAssetsForm['controls']['assetPowerCabinetDetails'].patchValue(
            {
              WarrantyEnd: '',
            },
          )
          this.addAssetsForm['controls']['assetPowerCabinetDetails'].patchValue(
            {
              WarrantyDuration: '',
            },
          )
        } else {
          let duration = Math.floor(
            (Date.UTC(edate.getFullYear(), edate.getMonth(), edate.getDate()) -
              Date.UTC(
                startDate.getFullYear(),
                startDate.getMonth(),
                startDate.getDate(),
              )) /
              (1000 * 60 * 60 * 24),
          )
          this.addAssetsForm['controls']['assetPowerCabinetDetails'].patchValue(
            {
              WarrantyDuration: duration,
            },
          )
        }
      }
    } else if (type == 'rfid') {
      let endDate = this.addAssetsForm.value.assetRFIDReaderDetails.WarrantyEnd

      let startDate = event.value

      let edate = new Date(endDate)

      if (endDate) {
        if (startDate > edate) {
          this._toastr.error('Please start date should be less than end date.')
          this.addAssetsForm['controls']['assetRFIDReaderDetails'].patchValue({
            WarrantyEnd: '',
          })
          this.addAssetsForm['controls']['assetRFIDReaderDetails'].patchValue({
            WarrantyDuration: '',
          })
        } else {
          let duration = Math.floor(
            (Date.UTC(edate.getFullYear(), edate.getMonth(), edate.getDate()) -
              Date.UTC(
                startDate.getFullYear(),
                startDate.getMonth(),
                startDate.getDate(),
              )) /
              (1000 * 60 * 60 * 24),
          )
          this.addAssetsForm['controls']['assetRFIDReaderDetails'].patchValue({
            WarrantyDuration: duration,
          })
        }
      }
    } else if (type == 'modem') {
      let endDate = this.addAssetsForm.value.assetModemDetails.WarrantyEnd

      let startDate = event.value

      let edate = new Date(endDate)

      if (endDate) {
        if (startDate > edate) {
          this._toastr.error('Please start date should be less than end date.')
          this.addAssetsForm['controls']['assetModemDetails'].patchValue({
            WarrantyEnd: '',
          })
          this.addAssetsForm['controls']['assetModemDetails'].patchValue({
            WarrantyDuration: '',
          })
        } else {
          let duration = Math.floor(
            (Date.UTC(edate.getFullYear(), edate.getMonth(), edate.getDate()) -
              Date.UTC(
                startDate.getFullYear(),
                startDate.getMonth(),
                startDate.getDate(),
              )) /
              (1000 * 60 * 60 * 24),
          )
          this.addAssetsForm['controls']['assetModemDetails'].patchValue({
            WarrantyDuration: duration,
          })
        }
      }
    }
  }

  /**
   * CALULATE DURATION CABLE wARRANTY END
   */
  calDuration(event: any, type: string) {
    if (type == 'cable') {
      let startDate = this.addAssetsForm.value.assetCableDetails.WarrantyStart

      let endDate = event.value

      let sdate = new Date(startDate)

      if (!startDate) {
        this._toastr.error('Please Choose Start Date first.')

        this.addAssetsForm['controls']['assetCableDetails'].patchValue({
          WarrantyEnd: '',
        })
        return
      }
      if (sdate > endDate) {
        this._toastr.error('End date should be greater than start date.')
        this.addAssetsForm['controls']['assetCableDetails'].patchValue({
          WarrantyEnd: '',
        })
        this.addAssetsForm['controls']['assetCableDetails'].patchValue({
          WarrantyDuration: '',
        })
      } else {
        let duration = Math.floor(
          (Date.UTC(
            endDate.getFullYear(),
            endDate.getMonth(),
            endDate.getDate(),
          ) -
            Date.UTC(sdate.getFullYear(), sdate.getMonth(), sdate.getDate())) /
            (1000 * 60 * 60 * 24),
        )
        this.addAssetsForm['controls']['assetCableDetails'].patchValue({
          WarrantyDuration: duration,
        })
      }
    } else if (type == 'power-cabinet') {
      let startDate = this.addAssetsForm.value.assetPowerCabinetDetails
        .WarrantyStart

      let endDate = event.value

      let sdate = new Date(startDate)

      if (!sdate) {
        this._toastr.error('Please Choose Start Date first.')

        this.addAssetsForm['controls']['assetPowerCabinetDetails'].patchValue({
          WarrantyEnd: '',
        })
        return
      }

      if (sdate > endDate) {
        this._toastr.error('Please end date should be greater than start date.')
        this.addAssetsForm['controls']['assetPowerCabinetDetails'].patchValue({
          WarrantyEnd: '',
        })
        this.addAssetsForm['controls']['assetPowerCabinetDetails'].patchValue({
          WarrantyDuration: '',
        })
      } else {
        let duration = Math.floor(
          (Date.UTC(
            endDate.getFullYear(),
            endDate.getMonth(),
            endDate.getDate(),
          ) -
            Date.UTC(sdate.getFullYear(), sdate.getMonth(), sdate.getDate())) /
            (1000 * 60 * 60 * 24),
        )
        this.addAssetsForm['controls']['assetPowerCabinetDetails'].patchValue({
          WarrantyDuration: duration,
        })
      }
    } else if (type == 'rfid') {
      let startDate = this.addAssetsForm.value.assetRFIDReaderDetails
        .WarrantyStart

      let endDate = event.value

      let sdate = new Date(startDate)

      if (!sdate) {
        this._toastr.error('Please Choose Start Date first.')

        this.addAssetsForm['controls']['assetRFIDReaderDetails'].patchValue({
          WarrantyEnd: '',
        })
        return
      }
      if (sdate > endDate) {
        this._toastr.error('End date should be greater than start date.')
        this.addAssetsForm['controls']['assetRFIDReaderDetails'].patchValue({
          WarrantyEnd: '',
        })
        this.addAssetsForm['controls']['assetRFIDReaderDetails'].patchValue({
          WarrantyDuration: '',
        })
      } else {
        let duration = Math.floor(
          (Date.UTC(
            endDate.getFullYear(),
            endDate.getMonth(),
            endDate.getDate(),
          ) -
            Date.UTC(sdate.getFullYear(), sdate.getMonth(), sdate.getDate())) /
            (1000 * 60 * 60 * 24),
        )
        this.addAssetsForm['controls']['assetRFIDReaderDetails'].patchValue({
          WarrantyDuration: duration,
        })
      }
    } else if (type == 'modem') {
      let startDate = this.addAssetsForm.value.assetModemDetails.WarrantyStart

      let endDate = event.value
      let sdate = new Date(startDate)

      if (!sdate) {
        this._toastr.error('Please Choose Start Date first.')

        this.addAssetsForm['controls']['assetModemDetails'].patchValue({
          WarrantyEnd: '',
        })
        return
      }

      if (sdate > endDate) {
        this._toastr.error('End date should be greater than start date.')
        this.addAssetsForm['controls']['assetModemDetails'].patchValue({
          WarrantyEnd: '',
        })
        this.addAssetsForm['controls']['assetModemDetails'].patchValue({
          WarrantyDuration: '',
        })
      } else {
        let duration = Math.floor(
          (Date.UTC(
            endDate.getFullYear(),
            endDate.getMonth(),
            endDate.getDate(),
          ) -
            Date.UTC(sdate.getFullYear(), sdate.getMonth(), sdate.getDate())) /
            (1000 * 60 * 60 * 24),
        )
        this.addAssetsForm['controls']['assetModemDetails'].patchValue({
          WarrantyDuration: duration,
        })
      }
    }
  }
  //DATE FILTER CABLE
  dateFilter = (d: any | null) => {
    // const date = new Date();
    // date.setDate(date.getDate() - 30);
    return d >= this.addAssetsForm.value.assetCableDetails.WarrantyStart
  }
  /**
   * GET ALL MAKE
   */

  GetAllMakeMaster() {
    this._adminService.GetAllMakeMaster().subscribe((res: any) => {
      this.makeList = res.data
    })
  }
  /**
   * GET ALL MODEL_LIST
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
   * SELECT MAKE CABLE
   * @param id
   */
  selectMakeCable(event: any, id: number) {
    if (!event.isUserInput) {
      return
    }
    this.selectedMakeCable = id
  }

  /**
   * SELECT MODEL CABLE
   * @param id
   */

  selectModelCable(event: any, id: number) {
    if (!event.isUserInput) {
      return
    }
    this.selectedModelCable = id
  }

  //CREATE POWER CABINET

  createPowerCabinet() {
    if (this.addAssetsForm.get('assetPowerCabinetDetails')?.invalid) {
      this._toastr.error('Please fill mandatory fields.')
      return
    }
    let data = this.addAssetsForm
    const pBody = {
      assetId: data.value.assetDetails.AssetID.trim(),
      breakerRating: parseInt(
        data.value.assetPowerCabinetDetails.BreakerRating,
      ),
      createdBy: this.UserId,
      dcPortQuantityRating: parseInt(
        data.value.assetPowerCabinetDetails.DCPortQuantity,
      ),
      installationDate: data.value.assetPowerCabinetDetails.InstallationDate,
      makeMasterId: this.selectedMakePowerCabinet,
      modelId: this.selectedModelPowerCabinet,
      peakCurrent: parseInt(data.value.assetPowerCabinetDetails.PeakCurrent),
      serialNumber: data.value.assetDetails.SerialNumber.trim(),
      serviceVolts: parseInt(data.value.assetPowerCabinetDetails.ServiceVolts),
      isActive: data.value.assetDetails.IsActive,
      statusId: this.selectedStatus,
      locationId: this.selectedLocation,
      warrantyDuration: data.value.assetPowerCabinetDetails.WarrantyDuration,
      warrantyExpiryDate: this.datePipe.transform(
        data.value.assetPowerCabinetDetails.WarrantyEnd,
        'yyyy-MM-ddThh:mm:ss',
      ),
      warrantyStartDate: this.datePipe.transform(
        data.value.assetPowerCabinetDetails.WarrantyStart,
        'yyyy-MM-ddThh:mm:ss',
      ),
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
        this._adminService.CreatePowerCabinet(pBody).subscribe(
          (res) => {
            if (res) {
              //Do your stuffs...
              this._toastr.success('Record saved successfully.')
              this.addAssetsForm.reset()
              this.showLoader = false
              this.submitted = false
              this._router.navigate(['admin/assets'])
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
  // UPDATE POWER CABINET

  updatePowerCabinet() {
    if (this.addAssetsForm.get('assetPowerCabinetDetails')?.invalid) {
      this._toastr.error('Please fill mandatory fields.')
      return
    }
    let data = this.addAssetsForm
    const pBody = {
      id: this.assetId,
      assetId: data.value.assetDetails.AssetID.trim(),
      breakerRating: parseInt(
        data.value.assetPowerCabinetDetails.BreakerRating,
      ),
      createdBy: this.UserId,
      dcPortQuantityRating: parseInt(
        data.value.assetPowerCabinetDetails.DCPortQuantity,
      ),
      installationDate: this.datePipe.transform(
        data.value.assetPowerCabinetDetails.InstallationDate,
        'yyyy-MM-ddThh:mm:ss',
      ),
      makeMasterId: this.selectedMakePowerCabinet,
      modelId: this.selectedModelPowerCabinet,
      peakCurrent: parseInt(data.value.assetPowerCabinetDetails.PeakCurrent),
      serialNumber: data.value.assetDetails.SerialNumber.trim(),
      serviceVolts: parseInt(data.value.assetPowerCabinetDetails.ServiceVolts),
      isActive: data.value.assetDetails.IsActive,
      statusId: this.selectedStatus,
      locationId: this.selectedLocation,
      warrantyDuration: data.value.assetPowerCabinetDetails.WarrantyDuration,
      warrantyExpiryDate: this.datePipe.transform(
        data.value.assetPowerCabinetDetails.WarrantyEnd,
        'yyyy-MM-ddThh:mm:ss',
      ),
      warrantyStartDate: this.datePipe.transform(
        data.value.assetPowerCabinetDetails.WarrantyStart,
        'yyyy-MM-ddThh:mm:ss',
      ),
      modifiedBy: this.UserId,
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
        this._adminService.UpdatePowerCabinet(pBody).subscribe(
          (res) => {
            if (res) {
              //Do your stuffs...
              this._toastr.success('Record updated successfully.')
              this.addAssetsForm.reset()
              this.showLoader = false
              this.submitted = false
              this._router.navigate(['admin/assets'])
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
  //Get POWER CABINET BY ID

  getPowerCabinetById(id: number) {
    this._adminService.GetPowerCabinetById(id).subscribe((res) => {
      if (res.data) {
        this.setAssetsDetails(res.data)
        this.addAssetsForm['controls']['assetPowerCabinetDetails'].patchValue({
          BreakerRating: res.data.breakerRating,
        })
        this.addAssetsForm['controls']['assetPowerCabinetDetails'].patchValue({
          DCPortQuantity: res.data.dcPortQuantityRating,
        })

        this.addAssetsForm['controls']['assetPowerCabinetDetails'].patchValue({
          InstallationDate: res.data.installationDate,
        })
        this.addAssetsForm['controls']['assetPowerCabinetDetails'].patchValue({
          PeakCurrent: res.data.peakCurrent,
        })
        this.addAssetsForm['controls']['assetPowerCabinetDetails'].patchValue({
          ServiceVolts: res.data.serviceVolts,
        })
        this.addAssetsForm['controls']['assetPowerCabinetDetails'].patchValue({
          WarrantyStart: res.data.warrantyStartDate,
        })
        this.addAssetsForm['controls']['assetPowerCabinetDetails'].patchValue({
          WarrantyEnd: res.data.warrantyExpiryDate,
        })
        this.addAssetsForm['controls']['assetPowerCabinetDetails'].patchValue({
          WarrantyDuration: res.data.warrantyDuration,
        })

        if (res.data.modelName) {
          this.selectedModelPowerCabinet = res.data.modelId
          this.addAssetsForm['controls']['assetPowerCabinetDetails'].patchValue(
            {
              Model: res.data.modelName,
            },
          )
        }
        if (res.data.makeMasterName) {
          this.selectedMakePowerCabinet = res.data.makeMasterId
          this.addAssetsForm['controls']['assetPowerCabinetDetails'].patchValue(
            {
              Make: res.data.makeMasterName,
            },
          )
        }
      }
    })
  }

  /**
   *
   * @param id
   * SELECT POWER CABINET
   */
  selectMakePowerCabinet(event: any, id: any) {
    if (!event.isUserInput) {
      return
    }
    this.selectedMakePowerCabinet = id
  }

  selectModelPowerCabinet(event: any, id: any) {
    if (!event.isUserInput) {
      return
    }
    this.selectedModelPowerCabinet = id
  }

  //CREATE RFID READER

  createRfIdReader() {
    if (this.addAssetsForm.get('assetRFIDReaderDetails')?.invalid) {
      this._toastr.error('Please fill mandatory fields.')
      return
    }
    let data = this.addAssetsForm
    const pBody = {
      assetId: data.value.assetDetails.AssetID.trim(),
      makeMasterId: this.selectedMakeRFID,
      modelId: this.selectedModelRFID,
      serialNumber: data.value.assetDetails.SerialNumber.trim(),
      isActive: data.value.assetDetails.IsActive,
      statusId: this.selectedStatus,
      locationId: this.selectedLocation,
      cardReader: data.value.assetRFIDReaderDetails.CardReader,
      warrantyDuration: data.value.assetRFIDReaderDetails.WarrantyDuration,
      warrantyExpiryDate: this.datePipe.transform(
        data.value.assetRFIDReaderDetails.WarrantyEnd,
        'yyyy-MM-ddThh:mm:ss',
      ),
      warrantyStartDate: this.datePipe.transform(
        data.value.assetRFIDReaderDetails.WarrantyStart,
        'yyyy-MM-ddThh:mm:ss',
      ),
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
    }).then((result) => {
      if (result.isDismissed) {
        this._adminService.AddRfIdReader(pBody).subscribe(
          (res) => {
            if (res) {
              //Do your stuffs...
              this._toastr.success('Record saved successfully.')
              this.addAssetsForm.reset()
              this.showLoader = false
              this.submitted = false
              this._router.navigate(['admin/assets'])
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

  // UPDATE RFID READER

  updateRFIDReader() {
    if (this.addAssetsForm.get('assetRFIDReaderDetails')?.invalid) {
      this._toastr.error('Please fill mandatory fields.')
      return
    }
    let data = this.addAssetsForm
    const pBody = {
      id: this.assetId,
      assetId: data.value.assetDetails.AssetID.trim(),
      makeMasterId: this.selectedMakeRFID,
      modelId: this.selectedModelRFID,
      serialNumber: data.value.assetDetails.SerialNumber.trim(),
      isActive: data.value.assetDetails.IsActive,
      statusId: this.selectedStatus,
      locationId: this.selectedLocation,
      cardReader: data.value.assetRFIDReaderDetails.CardReader,
      warrantyDuration: data.value.assetRFIDReaderDetails.WarrantyDuration,
      warrantyExpiryDate: this.datePipe.transform(
        data.value.assetRFIDReaderDetails.WarrantyEnd,
        'yyyy-MM-ddThh:mm:ss',
      ),
      warrantyStartDate: this.datePipe.transform(
        data.value.assetRFIDReaderDetails.WarrantyStart,
        'yyyy-MM-ddThh:mm:ss',
      ),
      modifiedBy: this.UserId,
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
        this._adminService.UpdateRfIdReader(pBody).subscribe(
          (res) => {
            if (res) {
              //Do your stuffs...
              this._toastr.success('Record updated successfully.')
              this.addAssetsForm.reset()
              this.showLoader = false
              this.submitted = false
              this._router.navigate(['admin/assets'])
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

  // GET RFID READER

  getRfidReaderById(id: number) {
    this._adminService.GetRfIdReaderById(id).subscribe((res) => {
      if (res.data) {
        this.setAssetsDetails(res.data)
        this.addAssetsForm['controls']['assetRFIDReaderDetails'].patchValue({
          CardReader: res.data.cardReader,
        })
        this.addAssetsForm['controls']['assetRFIDReaderDetails'].patchValue({
          WarrantyStart: res.data.warrantyStartDate,
        })
        this.addAssetsForm['controls']['assetRFIDReaderDetails'].patchValue({
          WarrantyEnd: res.data.warrantyExpiryDate,
        })
        this.addAssetsForm['controls']['assetRFIDReaderDetails'].patchValue({
          WarrantyDuration: res.data.warrantyDuration,
        })

        if (res.data.modelName) {
          this.selectedModelRFID = res.data.modelId
          this.addAssetsForm['controls']['assetRFIDReaderDetails'].patchValue({
            Model: res.data.modelName,
          })
        }
        if (res.data.makeMasterName) {
          this.selectedMakeRFID = res.data.makeMasterId
          this.addAssetsForm['controls']['assetRFIDReaderDetails'].patchValue({
            Make: res.data.makeMasterName,
          })
        }
      }
    })
  }

  /**
   * SELECT MAKE RFID
   * @param id
   */
  selectMakeRFID(event: any, id: number) {
    if (!event.isUserInput) {
      return
    }
    this.selectedMakeRFID = id
  }

  /**
   * SELECT MODEL RFID
   * @param id
   */

  selectModelRFID(event: any, id: number) {
    if (!event.isUserInput) {
      return
    }
    this.selectedModelRFID = id
  }

  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false
    }
    return true
  }

  /**
   * SELECT MAKE MODEM
   * @param id
   */
  selectMakeModem(event: any, id: number) {
    if (!event.isUserInput) {
      return
    }
    this.selectedMakeModem = id
  }

  /**
   * SELECT MODEL MODEM
   * @param id
   */

  selectModelModem(event: any, id: number) {
    if (!event.isUserInput) {
      return
    }
    this.selectedModelModem = id
  }

  /**
   * SELECT MODEL TYPE
   * @param id
   */

  selectModemType(event: any, id: number) {
    if (!event.isUserInput) {
      return
    }
    this.selectedModemType = id
  }
  //CREATE MODEM

  createModem() {
    if (this.addAssetsForm.get('assetModemDetails')?.invalid) {
      this._toastr.error('Please fill mandatory fields.')
      return
    }
    let data = this.addAssetsForm
    const pBody = {
      assetId: data.value.assetDetails.AssetID.trim(),
      makeMasterId: this.selectedMakeModem,
      modelId: this.selectedModelModem,
      serialNumber: data.value.assetDetails.SerialNumber.trim(),
      isActive: data.value.assetDetails.IsActive,
      statusId: this.selectedStatus,
      locationId: this.selectedLocation,
      carrier: data.value.assetModemDetails.Carrier,
      installationDate: this.datePipe.transform(
        data.value.assetModemDetails.InstallationDate,
        'yyyy-MM-ddT00:00:00',
      ),
      simNumber: data.value.assetModemDetails.SimNumber,
      modemTypeId: this.selectedModemType,
      imeiNumber: data.value.assetModemDetails.ImeiNumber,
      ipAddress: data.value.assetModemDetails.IpAddress,
      warrantyDuration: data.value.assetModemDetails.WarrantyDuration,
      warrantyExpiryDate: this.datePipe.transform(
        data.value.assetModemDetails.WarrantyEnd,
        'yyyy-MM-ddThh:mm:ss',
      ),
      warrantyStartDate: this.datePipe.transform(
        data.value.assetModemDetails.WarrantyStart,
        'yyyy-MM-ddThh:mm:ss',
      ),
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
    }).then((result) => {
      if (result.isDismissed) {
        this._adminService.CreateModem(pBody).subscribe(
          (res) => {
            if (res) {
              //Do your stuffs...
              this._toastr.success('Record saved successfully.')
              this.addAssetsForm.reset()
              this.showLoader = false
              this.submitted = false
              this._router.navigate(['admin/assets'])
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

  // GET MODEM DETAILS BY ID

  getModemDetailsById(id: number) {
    this._adminService.GetModembyid(id).subscribe((res) => {
      if (res.data) {
        this.setAssetsDetails(res.data)
        this.addAssetsForm['controls']['assetModemDetails'].patchValue({
          Carrier: res.data.carrier,
        })
        this.addAssetsForm['controls']['assetModemDetails'].patchValue({
          ImeiNumber: res.data.imeiNumber,
        })

        this.addAssetsForm['controls']['assetModemDetails'].patchValue({
          InstallationDate: res.data.installationDate,
        })
        this.addAssetsForm['controls']['assetModemDetails'].patchValue({
          IpAddress: res.data.ipAddress,
        })

        this.addAssetsForm['controls']['assetModemDetails'].patchValue({
          SimNumber: res.data.simNumber,
        })

        this.addAssetsForm['controls']['assetModemDetails'].patchValue({
          WarrantyStart: res.data.warrantyStartDate,
        })
        this.addAssetsForm['controls']['assetModemDetails'].patchValue({
          WarrantyEnd: res.data.warrantyExpiryDate,
        })
        this.addAssetsForm['controls']['assetModemDetails'].patchValue({
          WarrantyDuration: res.data.warrantyDuration,
        })

        if (res.data.modemTypeName) {
          this.selectedModemType = res.data.modemTypeId
          this.addAssetsForm['controls']['assetModemDetails'].patchValue({
            ModemType: res.data.modemTypeId,
          })
        }

        if (res.data.modelName) {
          this.selectedModelModem = res.data.modelId
          this.addAssetsForm['controls']['assetModemDetails'].patchValue({
            Model: res.data.modelName,
          })
        }
        if (res.data.makeMasterName) {
          this.selectedMakeModem = res.data.makeMasterId
          this.addAssetsForm['controls']['assetModemDetails'].patchValue({
            Make: res.data.makeMasterName,
          })
        }
      }
    })
  }

  // UPDATE MODEM

  updateModem() {
    if (this.addAssetsForm.get('assetModemDetails')?.invalid) {
      this._toastr.error('Please fill mandatory fields.')
      return
    }
    let data = this.addAssetsForm
    const pBody = {
      id: this.assetId,
      assetId: data.value.assetDetails.AssetID.trim(),
      makeMasterId: this.selectedMakeModem,
      modelId: this.selectedModelModem,
      serialNumber: data.value.assetDetails.SerialNumber.trim(),
      isActive: data.value.assetDetails.IsActive,
      statusId: this.selectedStatus,
      locationId: this.selectedLocation,
      carrier: data.value.assetModemDetails.Carrier,
      installationDate: this.datePipe.transform(
        data.value.assetModemDetails.InstallationDate,
        'yyyy-MM-ddT00:00:00',
      ),
      simNumber: data.value.assetModemDetails.SimNumber,
      modemTypeId: this.selectedModemType,
      imeiNumber: data.value.assetModemDetails.ImeiNumber,
      ipAddress: data.value.assetModemDetails.IpAddress,
      warrantyDuration: data.value.assetModemDetails.WarrantyDuration,
      warrantyExpiryDate: this.datePipe.transform(
        data.value.assetModemDetails.WarrantyEnd,
        'yyyy-MM-ddThh:mm:ss',
      ),
      warrantyStartDate: this.datePipe.transform(
        data.value.assetModemDetails.WarrantyStart,
        'yyyy-MM-ddThh:mm:ss',
      ),
      modifiedBy: this.UserId,
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
        this._adminService.UpdateModem(pBody).subscribe(
          (res) => {
            if (res) {
              //Do your stuffs...
              this._toastr.success('Record updated successfully.')
              this.addAssetsForm.reset()
              this.showLoader = false
              this.submitted = false
              this._router.navigate(['admin/assets'])
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
  /**
   *
   * @param id
   * Get Switch Gear details by ID
   */
  getSwitchGearDetailsById(id: number) {
    // const pBody = {
    //   switchGearId: +id,
    // }
    this._adminService.GetSwitchGearById(id).subscribe((res) => {
      if (res.data) {
        this.setAssetsDetails(res.data)
        this.addAssetsForm['controls']['assetSwitchGearDetails'].patchValue({
          switchGearName: res.data.switchGearName,
        })
      }
    })
  }

  //CREATE SWITCH GEAR

  createSwitchGear() {
    if (this.addAssetsForm.get('assetSwitchGearDetails')?.invalid) {
      this._toastr.error('Please fill mandatory fields.')
      return
    }
    let data = this.addAssetsForm
    const pBody = {
      assetId: data.value.assetDetails.AssetID.trim(),
      serialNumber: data.value.assetDetails.SerialNumber.trim(),
      isActive: data.value.assetDetails.IsActive,
      statusId: this.selectedStatus,
      locationId: this.selectedLocation,
      switchGearName: data.value.assetSwitchGearDetails.switchGearName,
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
    }).then((result) => {
      if (result.isDismissed) {
        this._adminService.CreateSwitchGear(pBody).subscribe(
          (res) => {
            if (res) {
              //Do your stuffs...
              this._toastr.success('Record saved successfully.')
              this.addAssetsForm.reset()
              this.showLoader = false
              this.submitted = false
              this._router.navigate(['admin/assets'])
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

  // UPDATE SWITCH GEAR

  updateSwitchGear() {
    if (this.addAssetsForm.get('assetSwitchGearDetails')?.invalid) {
      this._toastr.error('Please fill mandatory fields.')
      return
    }
    let data = this.addAssetsForm
    const pBody = {
      id: this.assetId,
      assetId: data.value.assetDetails.AssetID.trim(),
      serialNumber: data.value.assetDetails.SerialNumber.trim(),
      isActive: data.value.assetDetails.IsActive,
      statusId: this.selectedStatus,
      locationId: this.selectedLocation,
      switchGearName: data.value.assetSwitchGearDetails.switchGearName,
      modifiedBy: this.UserId,
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
        this._adminService.UpdateSwitchGear(pBody).subscribe(
          (res) => {
            if (res) {
              //Do your stuffs...
              this._toastr.success('Record updated successfully.')
              this.addAssetsForm.reset()
              this.showLoader = false
              this.submitted = false
              this._router.navigate(['admin/assets'])
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
      let startDate = this.addAssetsForm.value.assetPowerCabinetDetails
        .WarrantyStart
      let sDate = new Date(startDate)

      let endDate = this.addAssetsForm.value.assetPowerCabinetDetails
        .WarrantyEnd
      let eDate = new Date(endDate)

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
      let startDate = this.addAssetsForm.value.assetModemDetails.WarrantyStart

      let sDate = new Date(startDate)

      let endDate = this.addAssetsForm.value.assetModemDetails.WarrantyEnd

      let eDate = new Date(endDate)

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
}
