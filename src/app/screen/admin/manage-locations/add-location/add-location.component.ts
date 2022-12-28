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
import { map, Observable, startWith } from 'rxjs'

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss'],
})
export class AddLocationComponent implements OnInit {
  submitted = false
  isSaveBtn: boolean = true
  locationInfoTitle: string = 'Location Information'
  selected = '7 AM to 8 PM'
  countryList: any
  countryId = 0
  stateList: any
  stateId = 0
  cityList: any
  isOpenAllWeek: boolean = false
  // isOpenAlldays: boolean =false
  locationStatusList: any
  locationStatusId = 0
  countryName = ''
  stateName = ''
  cityName = ''
  timeArr: any[] = []
  locationSchedule: any[] = []
  UserId: any
  locationRowData: any
  // departmentList: any
  isEdit = false
  locationId = 0
  id = 0
  locationAddressId = 0
  updatelocationSchedule: any
  selectValue = '0#select'
  selectcountryId = ''
  viewMode: boolean = false
  filteredTimeList: any
  timeList = [
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
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
   */ addLocationForm = this.formBuilder.group({
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
    departmentId: new FormControl('', Validators.required),
    contactPersonNumber: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    Latitude: new FormControl('', [Validators.pattern('[0-9.+-]+')]),
    Longitude: new FormControl('', [Validators.pattern('[0-9.+-]+')]),
    addressLine1: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
    ]),
    addressLine2: new FormControl('', [Validators.maxLength(255)]),
    Country: new FormControl(this.selectValue),
    State: new FormControl(this.selectValue),
    // City: new FormControl(this.selectValue),
    cityName: new FormControl('', Validators.required),
    zipcode: new FormControl('', [Validators.required]),
    totalcapacity: new FormControl('', Validators.pattern('[0-9]{1,15}')),
    utilityservice: new FormControl('', Validators.maxLength(200)),
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
      this.viewMode = true
    } else {
      this.locationInfoTitle = 'Add Location'
      this.viewMode = false
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
        ;(this.addLocationForm.get(
          'locationScheduleCommand',
        ) as FormArray).push(
          this.addLocationSchedule(day.id, day.day, '', '', false),
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

    // const day: any = [
    //   {
    //     day: 'Monday',
    //   },
    //   {
    //     day: 'Tuesday',
    //   },
    //   {
    //     day: 'Wednesday',
    //   },
    //   {
    //     day: 'Thursday',
    //   },
    //   {
    //     day: 'Friday',
    //   },
    //   {
    //     day: 'Saturday',
    //   },
    //   {
    //     day: 'Sunday',
    //   },
    // ];

    // day.forEach((day: any) => {
    //   var arrayControl = this.addLocationForm.get('locationScheduleCommand') as FormArray;
    //   this.filteredTimeList[day.id] = arrayControl.at(day.id).get('startTime').valueChanges.pipe(
    //     startWith(''),
    //     map((value) => (value && value.length >= 0 ? this._filter(value) : [])),
    //   )
    // });
  }

  private _filter(value: any): string[] {
    const filterValue = value.toLowerCase()
    return this.timeList.filter((option: any) => {
      return option.toLowerCase().includes(filterValue)
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
      this.locationRowData = res.data
      this.locationId = this.locationRowData.locationId
      this.id = this.locationRowData.id
      this.locationAddressId = this.locationRowData.locationAddressId
      this.updatelocationSchedule = this.locationRowData.locationSchedule
      this.locationSchedule = this.locationRowData.locationSchedule
      this.countryId = this.locationRowData.locationAddress.countryId
      this.stateId = this.locationRowData.locationAddress.stateId
      // this.cityId = this.locationRowData.locationAddress.cityId
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
      //this.locationSchedule = this.locationSchedule
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
      })
      // this._adminService.getListApi('department').subscribe((res) => {
      //   this.departmentList = res.data
      // })

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
        departmentId: this.locationRowData.departmentName,
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
        email: this.locationRowData.email,
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
        cityName: this.locationRowData.locationAddress.cityName,
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
          id: 0,
          day: 'Monday',
        },
        { id: 1, day: 'Tuesday' },
        { id: 2, day: 'Wednesday' },
        { id: 3, day: 'Thursday' },
        { id: 4, day: 'Friday' },
        { id: 5, day: 'Saturday' },
        { id: 6, day: 'Sunday' },
      ]
      // const day: any = [
      //   {
      //     day: 'Monday',
      //   },
      //   {
      //     day: 'Tuesday',
      //   },
      //   {
      //     day: 'Wednesday',
      //   },
      //   {
      //     day: 'Thursday',
      //   },
      //   {
      //     day: 'Friday',
      //   },
      //   {
      //     day: 'Saturday',
      //   },
      //   {
      //     day: 'Sunday',
      //   },
      // ];
      ;(this.locationSchedule.length ? this.locationSchedule : day).forEach(
        (day: any) => {
          ;(this.addLocationForm.get(
            'locationScheduleCommand',
          ) as FormArray).push(
            this.addLocationSchedule(
              day.id,
              day.day,
              day.startTime,
              day.endTime,
              day.isOpenAlldays,
            ),
          )
        },
      )
      // const days: any = [
      //   {
      //     id: 0,
      //     day: 'Monday',
      //   },
      //   { id: 1, day: 'Tuesday' },
      //   { id: 2, day: 'Wednesday' },
      //   { id: 3, day: 'Thursday' },
      //   { id: 4, day: 'Friday' },
      //   { id: 5, day: 'Saturday' },
      //   { id: 6, day: 'Sunday' },
      // ];

      // day.every((day: any) => {
      //   const isOpenAllDays =
      //     (this.addLocationForm.get('locationScheduleCommand') as FormArray)
      //       .controls[day.id].value.isOpenAlldays === true;

      //   if (isOpenAllDays) {
      //     this.isOpenAllWeek = true;
      //   }
      // });
      let count = 0
      day.forEach((day: any) => {
        const isOpenAllDays =
          (this.addLocationForm.get('locationScheduleCommand') as FormArray)
            .controls[day.id].value.isOpenAlldays === true

        if (isOpenAllDays == true) {
          count++
        }
      })
      if (count == 7) {
        this.isOpenAllWeek = true
      }

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
    let ind = this.addLocationForm.value.locationScheduleCommand.findIndex(
      (x: any) =>
        (x.startTime == '' && !x.isOpenAlldays) ||
        (x.endTime == '' && !x.isOpenAlldays),
    )

    // SHOW MESS FOR REQUIRED FIELDS
    if (
      formField.LocationId == '' ||
      formField.contactPersonNumber.length == 0 ||
      formField.LocationName == '' ||
      formField.contactPersonNumber.length == 0 ||
      formField.addressLine1 == '' ||
      formField.locationStatus == 0 ||
      formField.departmentId == 0 ||
      this.countryId == 0 ||
      this.stateId == 0 ||
      formField.zipcode == ''
    ) {
      this.toastr.error('Fill all mandatory fields')
      return
    } else if (ind !== -1) {
      this.toastr.error('Please select time')
      return
    } else if (this.addLocationForm.status == 'INVALID') {
      this.toastr.error('Please correct invalid fields')
      return
    }

    const body = {
      id: 0,
      userId: this.UserId,
      locationId: formField.LocationId,
      contactPersonName: formField.contactPersonName,
      contactPersonNumber: formField.contactPersonNumber,
      email: formField.email,
      utilityService: formField.utilityservice,
      description: formField.Description,
      locationName: formField.LocationName,
      longitude: formField.Longitude !== '' ? formField.Longitude : 0,
      latitude: formField.Latitude !== '' ? formField.Latitude : 0,
      addressLine1: formField.addressLine1,
      addressLine2: formField.addressLine2,
      // cityId: this.cityId,
      cityName: formField.cityName,
      countryName: this.countryName,
      countryId: this.countryId,
      stateId: this.stateId,
      stateName: this.stateName,
      pinCode: formField.zipcode,
      locationStatusId: parseInt(formField.locationStatus),
      // departmentId: parseInt(formField.departmentId),
      departmentName: formField.departmentId,
      totalCapacity: formField.totalcapacity,
      locationScheduleCommand: formField.locationScheduleCommand,
    }

    if (this.isEdit) {
      this.submitted = true
      let formField = this.addLocationForm.value

      const body = {
        id: this.id,
        userId: this.UserId,
        locationId: formField.LocationId,
        locationAddressId: this.locationAddressId,
        contactPersonName: formField.contactPersonName,
        contactPersonNumber: formField.contactPersonNumber,
        email: formField.email,
        utilityService: formField.utilityservice,
        description: formField.Description,
        locationName: formField.LocationName,
        longitude: formField.Longitude !== '' ? formField.Longitude : 0,
        latitude: formField.Latitude !== '' ? formField.Latitude : 0,
        addressLine1: formField.addressLine1,
        addressLine2: formField.addressLine2,
        // cityId: this.cityId,
        // cityName: this.cityName !== 'select' ? this.cityName : '',
        cityName: formField.cityName,
        countryName: this.countryName !== 'select' ? this.countryName : '',
        countryId: this.countryId,
        stateId: this.stateId,
        stateName: this.stateName !== 'select' ? this.stateName : '',
        pinCode: formField.zipcode,
        locationStatusId: parseInt(formField.locationStatus),
        // departmentId: parseInt(formField.departmentId),
        departmentName: formField.departmentId,
        totalCapacity: formField.totalcapacity,
        locationScheduleCommand: formField.locationScheduleCommand,
      }

      this._adminService.UpdateLocation(body).subscribe({
        next: (res) => {
          this.toastr.success('Record saved successfully')
          this._location.back()
        },
        error: (error) => {
          this.toastr.error('Fill all mandatory fields')
        },
      })
    } else if (!this.isEdit) {
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

        this.cityName = ''
        this.addLocationForm.patchValue({ State: this.selectValue })
        // this.addLocationForm.patchValue({ City: this.selectValue })
        this.stateList = []
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
          } else if (this.countryId > 0 && this.stateId == 0) {
            // WHEN CHANGING COUNTRY
            this.addLocationForm.patchValue({ State: this.selectValue })
          }
        })
    } else if (type == 'city') {
      if (this.stateId !== parseInt(event.value.split('#')[0])) {
        // NEW STATE IS SELECTED
        // this.cityId = 0
        this.cityName = ''
      }
      this.stateId = parseInt(event.value.split('#')[0])
      this.stateName = event.value.split('#')[1]
      // CALL STATE API
      // this._adminService
      //   .getListApi('city', 0, this.stateId)
      //   .subscribe((res) => {
      //     this.cityList = res.data
      //     if (this.stateId == 0) {
      //       // FOR NEW LOCATION
      //       this.addLocationForm.patchValue({ City: this.selectValue })
      //       this.cityId = 0
      //       this.cityName = ''
      //     } else if (this.stateId > 0 && this.cityId > 0) {
      //       // FOR EDIT STATE AND CITY BOTH ARE SELECTED
      //       this.addLocationForm.patchValue({
      //         State: this.stateId + '#' + this.stateName,
      //       })
      //       this.addLocationForm.patchValue({
      //         City: this.cityId + '#' + this.cityName,
      //       })
      //     } else if (this.stateId > 0 && this.cityId == 0) {
      //       // WHEN CHANGING STATE
      //       this.addLocationForm.patchValue({ City: this.selectValue })
      //       this.addLocationForm.patchValue({
      //         State: this.stateId + '#' + this.stateName,
      //       })
      //     }

      //   })
    }
    // else {
    //   // FOR CITY ID AND NAME
    //   this.cityId = parseInt(event.value.split('#')[0])
    //   this.cityName = event.value.split('#')[1]
    // }
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
    this.getReverseGeocodingData(this.userLatitude, this.userLongitude, 5)
  }

  showLocation() {
    let lat = this.addLocationForm.value.Latitude
    let long = this.addLocationForm.value.Longitude
    if (lat !== '' && long !== '') {
      this.getReverseGeocodingData(lat, long, 15)
    }
  }

  handleEvent(lat: any, lng: any) {
    this.userLatitude = lat
    this.userLongitude = lng
    // SET VALUE IN FIELDS
    this.addLocationForm.patchValue({ Latitude: this.userLatitude })
    this.addLocationForm.patchValue({ Longitude: this.userLongitude })
    this.getReverseGeocodingData(this.userLatitude, this.userLongitude, 5)
  }

  getReverseGeocodingData(lat: any, lng: any, zoomNum: number) {
    var latlng = new google.maps.LatLng(lat, lng)
    let map1: any
    // This is making the Geocode request
    var geocoder = new google.maps.Geocoder()
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status !== google.maps.GeocoderStatus.OK) {
        alert(status)
      }
      // This is checking to see if the Geoeode Status is OK before proceeding
      if (status == google.maps.GeocoderStatus.OK) {
        const mapProperties = {
          center: new google.maps.LatLng(lat, lng),
          zoom: zoomNum,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        }
        map1 = new google.maps.Map(this.mapElement.nativeElement, mapProperties)
        var marker = new google.maps.Marker({
          position: latlng,
          map: map1,
          draggable: true,
        })

        map1.addListener('dragend', () => {
          let newlat = map1.getCenter().lat()
          let newlng = map1.getCenter().lng()
          this.handleEvent(newlat, newlng)
        })
        marker.addListener('dragend', () => {
          let newlat = map1.getCenter().lat()
          let newlng = map1.getCenter().lng()
          this.handleEvent(newlat, newlng)
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
    defaultVal: any,
  ): FormGroup {
    return new FormGroup({
      id: new FormControl(dayId),
      day: new FormControl(day),
      startTime: new FormControl(start),
      endTime: new FormControl(end),
      isOpenAlldays: new FormControl(defaultVal),
    })
  }

  //dob filter
  dateFilter = (d: any | null) => {
    return d < new Date()
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

  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false
    }
    return true
  }

  telephoneNumber: string = ''

  phoneNumber(event: any) {
    const charCode = event.which ? event.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return
    }
    let filterValue = (event.target as HTMLInputElement).value
    this.telephoneNumber = filterValue
    if (this.telephoneNumber.length == 3) {
      this.telephoneNumber = '(' + this.telephoneNumber + ')' + ' '
    }
    if (this.telephoneNumber.length == 9) {
      this.telephoneNumber = this.telephoneNumber + '-'
    }
  }
  isOpenAllDays(e: any, index: number) {
    if (e.checked) {
      ;(this.addLocationForm.get(
        'locationScheduleCommand',
      ) as FormArray).controls[index].patchValue({ isOpenAlldays: true }),
        (this.addLocationForm.get(
          'locationScheduleCommand',
        ) as FormArray).controls[index].patchValue({ startTime: '' }),
        (this.addLocationForm.get(
          'locationScheduleCommand',
        ) as FormArray).controls[index].patchValue({ endTime: '' })
    } else {
      this.isOpenAllWeek = false
      ;(this.addLocationForm.get(
        'locationScheduleCommand',
      ) as FormArray).controls[index].patchValue({ isOpenAlldays: false })
    }
    // if(index){
    //   (this.addLocationForm.get('locationScheduleCommand') as FormArray).controls[index].patchValue({ isOpenAlldays: true })
    //     this.isOpenAllWeek=true
    // }
  }
  //TO CHECK ALL CHECK BOX IS TRUE
  verifyAllChecked(e: any, index: number) {
    if (e.checked) {
      const day: any = [
        {
          id: 0,
          day: 'Monday',
        },
        { id: 1, day: 'Tuesday' },
        { id: 2, day: 'Wednesday' },
        { id: 3, day: 'Thursday' },
        { id: 4, day: 'Friday' },
        { id: 5, day: 'Saturday' },
        { id: 6, day: 'Sunday' },
      ]
      let count = 0
      day.forEach((day: any) => {
        const isOpenAllDays =
          (this.addLocationForm.get('locationScheduleCommand') as FormArray)
            .controls[day.id].value.isOpenAlldays === true

        if (isOpenAllDays == true) {
          count++
        }
      })
      if (count == 7) {
        this.isOpenAllWeek = true
      }
    }
  }

  openAllWeek(e: any) {
    if (e.checked) {
      this.isOpenAllWeek = true
      const day: any = [
        {
          id: 0,
          day: 'Monday',
        },
        { id: 1, day: 'Tuesday' },
        { id: 2, day: 'Wednesday' },
        { id: 3, day: 'Thursday' },
        { id: 4, day: 'Friday' },
        { id: 5, day: 'Saturday' },
        { id: 6, day: 'Sunday' },
      ]

      day.forEach((day: any) => {
        ;(this.addLocationForm.get(
          'locationScheduleCommand',
        ) as FormArray).controls[day.id].patchValue({ isOpenAlldays: true }),
          (this.addLocationForm.get(
            'locationScheduleCommand',
          ) as FormArray).controls[day.id].patchValue({ startTime: '' }),
          (this.addLocationForm.get(
            'locationScheduleCommand',
          ) as FormArray).controls[day.id].patchValue({ endTime: '' })
      })
    } else {
      this.isOpenAllWeek = false
      const day: any = [
        {
          id: 0,
          day: 'Monday',
        },
        { id: 1, day: 'Tuesday' },
        { id: 2, day: 'Wednesday' },
        { id: 3, day: 'Thursday' },
        { id: 4, day: 'Friday' },
        { id: 5, day: 'Saturday' },
        { id: 6, day: 'Sunday' },
      ]
      day.forEach((day: any) => {
        ;(this.addLocationForm.get(
          'locationScheduleCommand',
        ) as FormArray).controls[day.id].patchValue({ isOpenAlldays: false }),
          (this.addLocationForm.get(
            'locationScheduleCommand',
          ) as FormArray).controls[day.id].patchValue({ startTime: '' }),
          (this.addLocationForm.get(
            'locationScheduleCommand',
          ) as FormArray).controls[day.id].patchValue({ endTime: '' })
      })
    }
  }
  // START TIME IS CLOSED
  selectStartTime(event: any, index: number, time: any) {
    if (event.isUserInput && time == 'Closed') {
      ;(this.addLocationForm.get(
        'locationScheduleCommand',
      ) as FormArray).controls[index].patchValue({ endTime: 'Closed' })
    } else if (
      event.isUserInput &&
      time != 'Closed' &&
      (this.addLocationForm.get('locationScheduleCommand') as FormArray)
        .controls[index].value.endTime == 'Closed'
    ) {
      ;(this.addLocationForm.get(
        'locationScheduleCommand',
      ) as FormArray).controls[index].patchValue({ endTime: '' })
    }
  }

  selectEndTime(event: any, index: number, time: any) {
    if (event.isUserInput && time == 'Closed') {
      ;(this.addLocationForm.get(
        'locationScheduleCommand',
      ) as FormArray).controls[index].patchValue({ startTime: 'Closed' })
    } else if (
      event.isUserInput &&
      time != 'Closed' &&
      (this.addLocationForm.get('locationScheduleCommand') as FormArray)
        .controls[index].value.startTime == 'Closed'
    ) {
      ;(this.addLocationForm.get(
        'locationScheduleCommand',
      ) as FormArray).controls[index].patchValue({ startTime: '' })
    }
  }
  // END TIME IS CLOSED
  // selectEndTime(event: any, index: number, time: any){

  //  console.log( (this.addLocationForm.get('locationScheduleCommand') as FormArray).controls[index].value.startTime);

  //   if (event.isUserInput && ((
  //     this.addLocationForm.get('locationScheduleCommand') as FormArray
  //   ).controls[index].value.startTime=='Closed')) {

  //     if(time!='Closed'){
  //       (
  //         this.addLocationForm.get('locationScheduleCommand') as FormArray
  //       ).controls[index].patchValue({ endTime: 'Closed' });
  //       return
  //     }

  //   //
  // }}

  removeFilter(event: any, timeList: any) {
    let isTimeList = this.timeList.find((elem: any) => {}) == timeList.value
    if (isTimeList) {
      this.timeList = timeList.value
    }
  }
}
