import { Component, OnInit, ViewChild } from '@angular/core'
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { ToastrService } from 'ngx-toastr'
import { StorageService } from 'src/app/service/storage.service'
import Swal from 'sweetalert2'
import { AdminService } from '../../admin.service'
import {} from 'googlemaps'
import { Location } from '@angular/common'

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss'],
})
export class AddLocationComponent implements OnInit {
  isSaveBtn: boolean = true
  locationInfoTitle: string = 'Location Information'
  selected = '7 AM to 8 PM'
  countryList: any
  countryId = 0
  stateList: any
  stateId = 0
  cityList: any
  cityId = 0
  locationStatusList: any
  locationStatusId = 0
  countryName = ''
  stateName = ''
  cityName = ''
  timeArr: any[] = []
  locationSchedule: any[] = []
  UserId: any
  locationRowData: any
  departmentList: any
  isEdit = false
  locationId = 0
  id = 0
  locationAddressId = 0
  updatelocationSchedule: any
  selectValue = '0#select'
  selectcountryId = ''

  timeList = [
    '00:00',
    '1:00',
    '2:00',
    '3:00',
    '4:00',
    '5:00',
    '6:00',
    '7:00',
    '8:00',
    '9:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
    'Closed',
  ]

  days = [
    'Monday',
    'Tuseday',
    'Wednesday',
    'Thrusday',
    'Friday',
    'Saturday',
    'Sunday',
  ]

  @ViewChild('map') mapElement: any
  map: google.maps.Map | any
  /**
   * Add Location Information Form
   *
   */ //   ^[^\s].+[a-zA-Z]+[a-zA-Z]+$
   // '^-?([1-8]?[1-9]|[1-9]0)\\.{1}\\d{1,6}'
  addLocationForm = this.formBuilder.group({
    LocationId: new FormControl('', [
      Validators.required,
     Validators.pattern('[a-zA-Z0-9 ]+'),
   // Validators.pattern('[^\s].+[a-zA-Z]+[a-zA-Z]+$')
    ]),
    LocationName: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9 ]+'),
    ]),
    locationStatus: new FormControl('0', Validators.required),
    Description: new FormControl(''),
    contactPersonName: new FormControl('', [
      Validators.pattern('[a-zA-Z ]{2,25}'),
    ]),
    departmentId: new FormControl('0', Validators.required),
    contactPersonNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{10,15}'),
    ]),
    Latitude: new FormControl('',[Validators.pattern('[0-9.+-]+')]),
    Longitude: new FormControl('',[Validators.pattern('[0-9.+-]+')]),
    addressLine1: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
    ]),
    addressLine2: new FormControl(''),
    Country: new FormControl(this.selectValue),
    State: new FormControl(this.selectValue),
    City: new FormControl(this.selectValue),
    zipcode: new FormControl('', [Validators.pattern('[0-9]{6}')]),
    totalcapacity: new FormControl('',[Validators.pattern('[0-9]+')]),
    utilityservice: new FormControl(''),
    locationScheduleCommand: this.formBuilder.array([]),
  })

  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _storageService: StorageService,
    private toastr: ToastrService,
    private _adminService: AdminService,
    private _route: ActivatedRoute,
    private _location: Location,
  ) {
    this.isEdit = false
    this.UserId = this._storageService.getLocalData('user_id')

    let IsLocationData = this._storageService.getSessionData('LocationData')
    // console.log(IsLocationData,"location data")
    let isSaveBtn = this._storageService.getSessionData('IsSaveBtn')

    if (IsLocationData && isSaveBtn == 'true') {
      this.locationInfoTitle = 'Edit Location Information'
      this.isSaveBtn = true
      this.isEdit = true
      this.setLocationData(JSON.parse(IsLocationData))
    } else if (IsLocationData && isSaveBtn == 'false') {
      this.locationInfoTitle = 'View Location Information'
      this.isSaveBtn = false
      this.isEdit = false
      this.setLocationData(JSON.parse(IsLocationData))
      this.addLocationForm.disable()
    } else {
      this.locationInfoTitle = 'Add Location'
      this.isSaveBtn = true
      const day: any = [
        {
          day: 'Monday',
        },
        {
          day: 'Tuesday',
        },
        {
          day: 'Wednesday',
        },
        {
          day: 'Thursday',
        },
        {
          day: 'Friday',
        },
        {
          day: 'Saturday',
        },
        {
          day: 'Sunday',
        },
      ]
      day.forEach((day: any) => {
        (this.addLocationForm.get(
          'locationScheduleCommand',
        ) as FormArray).push(
          this.addLocationSchedule(day.id, day.day, day.startTime, day.endTime),
        )
      })
    }
  }

  ngOnInit() {
    // GET COUNTRIES
    this._adminService.getListApi('country').subscribe((res) => {
      this.countryList = res.data
    })

    this._adminService.getListApi('locationStatus').subscribe((res) => {
      this.locationStatusList = res.data
    })
    this._adminService.getListApi('department').subscribe((res) => {
      this.departmentList = res.data
    })
  }

  ngAfterViewInit() {
    this.getReverseGeocodingData(36.2082629, -113.737393, 5)
  }
  /**
   * Set Form Value
   * @param data
   */

  setLocationData(data: any) {
    const body = {}
    this._adminService.getListApi('location', data.id).subscribe((res) => {
      // console.log(res)

      this.locationRowData = res.data
      this.locationId = this.locationRowData.locationId
      this.id = this.locationRowData.id
      this.locationAddressId = this.locationRowData.locationAddressId
      this.updatelocationSchedule = this.locationRowData.locationSchedule
      this.locationSchedule = this.locationRowData.locationSchedule
      this.countryId = this.locationRowData.locationAddress.countryId
      this.stateId = this.locationRowData.locationAddress.stateId
      this.cityId = this.locationRowData.locationAddress.cityId
      this.cityName = this.locationRowData.locationAddress.cityName

      // ADD ID WITH LOCATION locationSchedule
      for (let i = 0; i < this.updatelocationSchedule.length; i++) {
        let ind = this.locationSchedule.findIndex(
          (x) => x.day == this.updatelocationSchedule[i].day,
        )
        if (ind >= 0) {
          this.locationSchedule[ind].id = this.updatelocationSchedule[i].id
        }
      }
      this.locationSchedule = this.locationSchedule
      // alert(this.locationRowData.locationStatus.id + this.locationRowData.locationStatus.locationStatusName);
      this.getSelected(
        {
          value:
            this.locationRowData.locationAddress.countryId +
            '#' +
            this.locationRowData.locationAddress.countryName,
        },
        'state',
      )
      this.getSelected(
        {
          value:
            this.locationRowData.locationAddress.stateId +
            '#' +
            this.locationRowData.locationAddress.stateName,
        },
        'city',
      )
      this._adminService.getListApi('locationStatus').subscribe((res) => {
        this.locationStatusList = res.data
        //console.log(this.locationStatusList)
      })
      this._adminService.getListApi('department').subscribe((res) => {
        this.departmentList = res.data
      })

      this.addLocationForm.patchValue({
        LocationId: this.locationRowData.locationId,
      })
      this.addLocationForm.patchValue({
        LocationName: this.locationRowData.locationName,
      })
      this.addLocationForm.patchValue({
        locationStatus: this.locationRowData.locationStatusId.toString(),
      })
      this.addLocationForm.patchValue({
        departmentId: this.locationRowData.departmentId.toString(),
      })
      this.addLocationForm.patchValue({
        Description: this.locationRowData.description,
      })
      this.addLocationForm.patchValue({
        contactPersonName: this.locationRowData.contactPersonName,
      })
      this.addLocationForm.patchValue({
        contactPersonNumber: this.locationRowData.contactPersonNumber,
      })
      this.addLocationForm.patchValue({
        Latitude: this.locationRowData.locationAddress.latitude,
      })
      this.addLocationForm.patchValue({
        Longitude: this.locationRowData.locationAddress.longitude,
      })
      this.addLocationForm.patchValue({
        addressLine1: this.locationRowData.locationAddress.addressLine1,
      })
      this.addLocationForm.patchValue({
        addressLine2: this.locationRowData.locationAddress.addressLine2,
      })
      this.addLocationForm.patchValue({
        Country:
          this.locationRowData.locationAddress.countryId !== 0
            ? this.locationRowData.locationAddress.countryId +
              '#' +
              this.locationRowData.locationAddress.countryName
            : this.selectValue,
      })
      this.addLocationForm.patchValue({
        State:
          this.locationRowData.locationAddress.stateId !== 0
            ? this.locationRowData.locationAddress.stateId +
              '#' +
              this.locationRowData.locationAddress.stateName
            : this.selectValue,
      })
      this.addLocationForm.patchValue({
        City:
          this.locationRowData.locationAddress.cityId !== 0
            ? this.locationRowData.locationAddress.cityId +
              '#' +
              this.locationRowData.locationAddress.cityName
            : this.selectValue,
      })
      this.addLocationForm.patchValue({
        zipcode: this.locationRowData.locationAddress.pinCode,
      })
      this.addLocationForm.patchValue({
        totalcapacity: this.locationRowData.totalCapacity,
      })
      this.addLocationForm.patchValue({
        utilityservice: this.locationRowData.utilityService,
      })
      const day: any = [
        {
          day: 'Monday',
        },
        {
          day: 'Tuesday',
        },
        {
          day: 'Wednesday',
        },
        {
          day: 'Thursday',
        },
        {
          day: 'Friday',
        },
        {
          day: 'Saturday',
        },
        {
          day: 'Sunday',
        },
      ]
      ;(this.locationSchedule.length ? this.locationSchedule : day).forEach(
        (day: any) => {
         (this.addLocationForm.get(
            'locationScheduleCommand',
          ) as FormArray).push(
            this.addLocationSchedule(
              day.id,
              day.day,
              day.startTime,
              day.endTime,
            ),
          )
        },
      )

      // console.log(this.stateList)

      if (
        this.locationRowData.locationAddress.latitude !== 0 &&
        this.locationRowData.locationAddress.longitude !== 0
      ) {
        this.getReverseGeocodingData(
          this.locationRowData.locationAddress.latitude,
          this.locationRowData.locationAddress.longitude,
          15,
        )
      }
    })
  }

  addChargerDetails() {
    
    let formField = this.addLocationForm.value

   // console.log(this.addLocationForm);
  let ind = this.addLocationForm.value.locationScheduleCommand.findIndex((x: any)=>x.startTime == null || x.endTime == null)
    
    // SHOW MESS FOR REQUIRED FIELDS
    if (
      formField.LocationId == '' ||
      formField.contactPersonNumber.length == 0 ||
      formField.LocationName == '' ||
      formField.contactPersonNumber.length == 0 ||
      formField.addressLine1 == '' ||
      formField.locationStatus == 0 ||
      formField.departmentId == 0 || this.countryId == 0 || this.stateId == 0 || this.cityId == 0 || formField.zipcode == ''
      || ind !== -1
    ) {
      this.toastr.error('Fill all mandatory fields')
      return
    }
else if(this.addLocationForm.status == "INVALID") {
  this.toastr.error('Please correct invalid fields')
  return
}
    // console.log(this.locationSchedule);

    const body = {
      id: 0,
      userId: this.UserId,
      locationId: formField.LocationId,
      contactPersonName: formField.contactPersonName,
      contactPersonNumber: formField.contactPersonNumber,
      utilityService: formField.utilityservice,
      description: formField.Description,
      locationName: formField.LocationName,
      longitude:
        formField.Longitude !== '' ? JSON.parse(formField.Longitude) : 0,
      latitude: formField.Latitude !== '' ? JSON.parse(formField.Latitude) : 0,
      addressLine1: formField.addressLine1,
      addressLine2: formField.addressLine2,
      cityId: this.cityId,
      cityName: this.cityName,
      countryName: this.countryName,
      countryId: this.countryId,
      stateId: this.stateId,
      stateName: this.stateName,
      pinCode: formField.zipcode,
      locationStatusId: parseInt(formField.locationStatus),
      departmentId: parseInt(formField.departmentId),
      totalCapacity: formField.totalcapacity,
      locationScheduleCommand: formField.locationScheduleCommand,
    }

    if (this.isEdit) {
      let formField = this.addLocationForm.value

      const body = {
        id: this.id,
        userId: this.UserId,
        locationId: formField.LocationId,
        locationAddressId: this.locationAddressId,
        contactPersonName: formField.contactPersonName,
        contactPersonNumber: formField.contactPersonNumber,
        utilityService: formField.utilityservice,
        description: formField.Description,
        locationName: formField.LocationName,
        longitude: formField.Longitude !== '' ? formField.Longitude : 0,
        latitude: formField.Latitude !== '' ? formField.Latitude : 0,
        addressLine1: formField.addressLine1,
        addressLine2: formField.addressLine2,
        cityId: this.cityId,
        cityName: this.cityName !== 'select' ? this.cityName : '',
        countryName: this.countryName !== 'select' ? this.countryName : '',
        countryId: this.countryId,
        stateId: this.stateId,
        stateName: this.stateName !== 'select' ? this.stateName : '',
        pinCode: formField.zipcode,
        locationStatusId: parseInt(formField.locationStatus),
        departmentId: parseInt(formField.departmentId),
        totalCapacity: formField.totalcapacity,
        locationScheduleCommand: formField.locationScheduleCommand,
      }
      // console.log(body)
      // return
      this._adminService.updateLocation(body).subscribe({
        next: (res) => {
          this.toastr.success('Record saved successfully')
          this._location.back()
        },
        error: (error) => {
          this.toastr.error('Fill all mandatory fields')
        },
      })
    } else if (!this.isEdit) {
      // console.log(body)
      // return
      this._adminService.CreateLocation(body).subscribe({
        next: (res) => {
          this.toastr.success(res.StatusMessage)
          this._location.back()
        },
        error: (error) => {
          this.toastr.error('Fill all mandatory fields')
        },
      })
    }
  }

  /**
   * Add Location
   * @param data
   */

  addLocation() {
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
        // this.toastr.success("Record has been registered on success.")
        //Do your stuffs...
        this.addChargerDetails()
      }
    })
  }

  getSelected(event: any, type: string) {
    if (type == 'state') {
      if (this.countryId !== parseInt(event.value.split('#')[0])) {
        // NEW COUNTRY IS SELECTED
        this.stateId = 0
        this.stateName = ''
        this.cityId = 0
        this.cityName = ''
        this.addLocationForm.patchValue({ State: this.selectValue })
        this.addLocationForm.patchValue({ City: this.selectValue })
        this.stateList = []
        this.cityList = []
      }
      this.countryId = parseInt(event.value.split('#')[0])
      this.countryName = event.value.split('#')[1]
      // CALL STATE API
      this._adminService
        .getListApi('state', this.countryId)
        .subscribe((res) => {
          this.stateList = res.data
          if (this.countryId == 0) {
            // FOR NEW LOCATION
            this.addLocationForm.patchValue({ State: this.selectValue })
            this.stateId = 0
            this.stateName = ''
          } else if (this.countryId > 0 && this.stateId > 0) {
            // FOR EDIT COUNTRY AND STATE BOTH ARE SELECTED
            this.addLocationForm.patchValue({
              State: this.stateId + '#' + this.stateName,
            })
          } else if (
            this.countryId > 0 &&
            this.stateId > 0 &&
            this.cityId > 0
          ) {
            // FOR EDIT COUNTRY AND STATE BOTH ARE SELECTED
            this.addLocationForm.patchValue({
              City: this.cityId + '#' + this.cityName,
            })
          } else if (this.countryId > 0 && this.stateId == 0) {
            // WHEN CHANGING COUNTRY
            this.addLocationForm.patchValue({ State: this.selectValue })
          }
        })
    } else if (type == 'city') {
      if (this.stateId !== parseInt(event.value.split('#')[0])) {
        // NEW STATE IS SELECTED
        this.cityId = 0
        this.cityName = ''
      }
      this.stateId = parseInt(event.value.split('#')[0])
      this.stateName = event.value.split('#')[1]
      // CALL STATE API
      this._adminService
        .getListApi('city', 0, this.stateId)
        .subscribe((res) => {
          this.cityList = res.data
          if (this.stateId == 0) {
            // FOR NEW LOCATION
            this.addLocationForm.patchValue({ City: this.selectValue })
            this.cityId = 0
            this.cityName = ''
          } else if (this.stateId > 0 && this.cityId > 0) {
            // FOR EDIT STATE AND CITY BOTH ARE SELECTED
            this.addLocationForm.patchValue({
              State: this.stateId + '#' + this.stateName,
            })
            this.addLocationForm.patchValue({
              City: this.cityId + '#' + this.cityName,
            })
          } else if (this.stateId > 0 && this.cityId == 0) {
            // WHEN CHANGING STATE
            this.addLocationForm.patchValue({ City: this.selectValue })
            this.addLocationForm.patchValue({
              State: this.stateId + '#' + this.stateName,
            })
          }
          /* this.addLocationForm.patchValue({City: this.selectValue})
         this.cityId = 0
         this.cityName = '' */
        })
    } else {
      // FOR CITY ID AND NAME
      this.cityId = parseInt(event.value.split('#')[0])
      this.cityName = event.value.split('#')[1]
    }
  }
  userAddress: string = ''
  userLatitude: string = ''
  userLongitude: string = ''
  handleAddressChange(address: any) {
    this.userAddress = address.formatted_address
    this.userLatitude = address.geometry.location.lat()
    this.userLongitude = address.geometry.location.lng()
    // SET VALUE IN FIELDS
    this.addLocationForm.patchValue({ Latitude: this.userLatitude })
    this.addLocationForm.patchValue({ Longitude: this.userLongitude })
    this.getReverseGeocodingData(this.userLatitude, this.userLongitude, 15)
  }

  showLocation() {
    let lat = this.addLocationForm.value.Latitude
    let long = this.addLocationForm.value.Longitude
    if (lat !== '' && long !== '') {
      this.getReverseGeocodingData(lat, long, 15)
    }
  }

  getReverseGeocodingData(lat: any, lng: any, zoomNum: number) {
    var latlng = new google.maps.LatLng(lat, lng)
    // This is making the Geocode request
    var geocoder = new google.maps.Geocoder()
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status !== google.maps.GeocoderStatus.OK) {
        alert(status)
      }
      // This is checking to see if the Geoeode Status is OK before proceeding
      if (status == google.maps.GeocoderStatus.OK) {
        // console.log(results);
        //  var address = results[0].formatted_address;
        const mapProperties = {
          center: new google.maps.LatLng(lat, lng),
          zoom: zoomNum,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        }
        var map1 = new google.maps.Map(
          this.mapElement.nativeElement,
          mapProperties,
        )
        var marker = new google.maps.Marker({
          position: latlng,
          map: map1,
        })
      }
    })
  }

  /**
   * Get Location Schedule Form Controls
   * @returns
   */

  getLocationScheduledFormControls() {
    return (this.addLocationForm.get('locationScheduleCommand') as FormArray)
      .controls
  }
  /**
   *
   * @param day
   * @param start
   * @param end
   * @returns
   */
  addLocationSchedule(
    dayId: number | null,
    day: any,
    start: any,
    end: any,
  ): FormGroup {
    return new FormGroup({
      id: new FormControl(dayId),
      day: new FormControl(day),
      startTime: new FormControl(start),
      endTime: new FormControl(end),
    })
  }
}
