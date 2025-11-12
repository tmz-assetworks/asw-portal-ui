import { Component, OnInit, ViewChild,ElementRef } from '@angular/core'
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { RouterModule } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { StorageService } from 'src/app/service/storage.service'
import Swal from 'sweetalert2'
import { AdminService } from '../../admin.service'
import {} from 'googlemaps'
import { Location,CommonModule } from '@angular/common'
import { map, Observable, startWith } from 'rxjs'
import { SharedMaterialModule } from 'src/app/shared/shared-material.module'

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss'],
  imports:[CommonModule,RouterModule,SharedMaterialModule,ReactiveFormsModule],
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
  telephoneNumber: string = ''
 marker!: google.maps.Marker

  timeListforStart = [
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
  timeListforEnd = [
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

  filteredStartTime: any
  filteredEndTime: any
  @ViewChild('addressInput') addressInput!: ElementRef<HTMLInputElement>;

  

  // ADD LOCATION FORM GROUP

  addLocationFormGroup = this.formBuilder.group({
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
    //Country: new FormControl(this.selectValue),
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
    // private _router: Router,
    // private _activatedRoute: ActivatedRoute,
    private _storageService: StorageService,
    private toastr: ToastrService,
    private _adminService: AdminService,
    // private _route: ActivatedRoute,
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
      this.addLocationFormGroup.disable()
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
        ;(this.addLocationFormGroup.get(
          'locationScheduleCommand',
        ) as FormArray).push(
          this.addLocationSchedule(day.id, day.day, '', '', false),
        )
      })
    }

    this.filteredStartTime = Observable
    this.filteredEndTime = Observable
  }

  ngOnInit() {
    // GET COUNTRIES
    this._adminService.getListApi('country').subscribe((res) => {
      this.countryList = res.data
    })

    // GET LOCATIONS

    this._adminService.getListApi('locationStatus').subscribe((res) => {
      this.locationStatusList = res.data
    })    
    
    

  }
  manageNameControlStart(index: any) {
    this.filteredStartTime[index] = (this.addLocationFormGroup.get(
      'locationScheduleCommand',
    ) as FormArray)
      .at(index)
      .get('startTime')
      ?.valueChanges.pipe(
        startWith(''),
        // map((value) => (typeof value === 'string' ? value : value)),
        map((value) => this._filterStartValue(value)),
      )
  }

  manageNameControlEnd(index: number) {
    this.filteredEndTime[index] = (this.addLocationFormGroup.get(
      'locationScheduleCommand',
    ) as FormArray)
      .at(index)
      .get('endTime')
      ?.valueChanges.pipe(
        startWith(''),
        // map((value) => (typeof value === 'string' ? value : value)),
        map((value) => this._filterEndValue(value)),
      )
  }

  // FILTER START VALUES

  private _filterStartValue(value: any) {
    const filterValue = value.toLowerCase()
    return this.timeListforStart.filter((option) =>
      option.toLowerCase().includes(filterValue),
    )
  }

  // FILTER END VALUES

  private _filterEndValue(value: any) {
    const filterValue = value.toLowerCase()
    return this.timeListforEnd.filter((option) =>
      option.toLowerCase().includes(filterValue),
    )
  }

  ngAfterViewInit() {
    const options: google.maps.places.AutocompleteOptions = {
      fields: ['formatted_address', 'geometry'],
      //componentRestrictions: { country: 'in' } // optional
    };

    const autocomplete = new google.maps.places.Autocomplete(
      this.addressInput.nativeElement,
      options
    );

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      this.handleAddressChange(place);
    });

    this.getReverseGeocodingData('36.2082629', '-113.737393', 5)
  }
  /**
   * SET FORM VALUE
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

      this.addLocationFormGroup.patchValue({
        LocationId: this.locationRowData.locationId,
      })
      this.addLocationFormGroup.patchValue({
        LocationName: this.locationRowData.locationName,
      })
      this.addLocationFormGroup.patchValue({
        locationStatus: this.locationRowData.locationStatusId.toString(),
      })
      this.addLocationFormGroup.patchValue({
        departmentId: this.locationRowData.departmentName,
      })
      this.addLocationFormGroup.patchValue({
        Description: this.locationRowData.description,
      })
      this.addLocationFormGroup.patchValue({
        contactPersonName: this.locationRowData.contactPersonName,
      })
      this.addLocationFormGroup.patchValue({
        contactPersonNumber: this.locationRowData.contactPersonNumber,
      })
      this.addLocationFormGroup.patchValue({
        email: this.locationRowData.email,
      })
      this.addLocationFormGroup.patchValue({
        Latitude: this.locationRowData.locationAddress.latitude,
      })
      this.addLocationFormGroup.patchValue({
        Longitude: this.locationRowData.locationAddress.longitude,
      })
      this.addLocationFormGroup.patchValue({
        addressLine1: this.locationRowData.locationAddress.addressLine1,
      })
      this.addLocationFormGroup.patchValue({
        addressLine2: this.locationRowData.locationAddress.addressLine2,
      })
      this.addLocationFormGroup.patchValue({
        Country:
          this.locationRowData.locationAddress.countryId == 0
            ? this.selectValue:this.locationRowData.locationAddress.countryId +
              '#' +
              this.locationRowData.locationAddress.countryName
      })
      this.addLocationFormGroup.patchValue({
        State:
          this.locationRowData.locationAddress.stateId == 0
            ? this.selectValue:this.locationRowData.locationAddress.stateId +
              '#' +
              this.locationRowData.locationAddress.stateName,
      })
      this.addLocationFormGroup.patchValue({
        cityName: this.locationRowData.locationAddress.cityName,
      })
      this.addLocationFormGroup.patchValue({
        zipcode: this.locationRowData.locationAddress.pinCode,
      })
      this.addLocationFormGroup.patchValue({
        totalcapacity: this.locationRowData.totalCapacity,
      })
      this.addLocationFormGroup.patchValue({
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
     
      ;(this.locationSchedule.length ? this.locationSchedule : day).forEach(
        (day: any) => {
          ;(this.addLocationFormGroup.get(
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
     
      let count = 0
      day.forEach((day: any) => {
        const isOpenAllDays =
          (this.addLocationFormGroup.get(
            'locationScheduleCommand',
          ) as FormArray).controls[day.id].value.isOpenAlldays === true

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
    let formField = this.addLocationFormGroup.value
    
    let ind = this.addLocationFormGroup.value?.locationScheduleCommand?.findIndex(
      (x: any) =>
        (x.startTime == '' && !x.isOpenAlldays) ||
        (x.endTime == '' && !x.isOpenAlldays),
    )

    // SHOW MESS FOR REQUIRED FIELDS
    if (
      formField.LocationId == '' ||
      formField.contactPersonNumber?.length == 0 ||
      formField.LocationName == '' ||
      formField.contactPersonNumber?.length == 0 ||
      formField.addressLine1 == '' ||
      formField.locationStatus == "0" ||
      formField.departmentId == "0" ||
      this.countryId == 0 ||
      this.stateId == 0 ||
      formField.zipcode == ''
    ) {
      this.toastr.error('Fill all mandatory fields')
      return
    } else if (ind !== -1) {
      this.toastr.error('Please select time')
      return
    } else if (this.addLocationFormGroup.status == 'INVALID') {
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
      longitude: formField.Longitude == '' ? 0:formField.Longitude,
      latitude: formField.Latitude == '' ? 0:formField.Latitude,
      addressLine1: formField.addressLine1,
      addressLine2: formField.addressLine2,
      // cityId: this.cityId,
      cityName: formField.cityName,
      countryName: this.countryName,
      countryId: this.countryId,
      stateId: this.stateId,
      stateName: this.stateName,
      pinCode: formField.zipcode,
      locationStatusId: formField.locationStatus ?? '0',
      // departmentId: parseInt(formField.departmentId),
      departmentName: formField.departmentId,
      totalCapacity: formField.totalcapacity,
      locationScheduleCommand: formField.locationScheduleCommand,
    }

    if (this.isEdit) {
      this.submitted = true
      let formField = this.addLocationFormGroup.value

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
        longitude: formField.Longitude == '' ? 0: formField.Longitude,
        latitude: formField.Latitude == '' ? 0:formField.Latitude,
        addressLine1: formField.addressLine1,
        addressLine2: formField.addressLine2,
        // cityId: this.cityId,
        // cityName: this.cityName !== 'select' ? this.cityName : '',
        cityName: formField.cityName,
        countryName: this.countryName == 'select' ? '' : this.countryName,
        countryId: this.countryId,
        stateId: this.stateId,
        stateName: this.stateName == 'select' ? '':this.stateName,
        pinCode: formField.zipcode,
        locationStatusId: formField?.locationStatus ?? '0',
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
           this.toastr.error(error.error.content)
        },
      })
    } else if (!this.isEdit) {
      this._adminService.CreateLocation(body).subscribe({
        next: (res) => {
          this.toastr.success(res.StatusMessage)
          this._location.back()
        },
        error: (error) => {
          this.toastr.error(error.error.StatusMessage)
        },
      })
    }
  }

  /**
   * ADD LOCATION
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
      allowOutsideClick: false,
      allowEscapeKey: false,
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
      
      if (this.countryId !== event.value.split('#')[0]) {
        // NEW COUNTRY IS SELECTED
        this.stateId = 0
        this.stateName = ''

        this.cityName = ''
        this.addLocationFormGroup.patchValue({ State: this.selectValue })
        // this.addLocationFormGroup.patchValue({ City: this.selectValue })
        this.stateList = []
      }
      this.countryId = Number.parseInt(event.value.split('#')[0])
      this.countryName = event.value.split('#')[1]
      // CALL STATE API
      this._adminService
        .getListApi('state', this.countryId)
        .subscribe((res) => {
          this.stateList = res.data
          if (this.countryId == 0) {
            // FOR NEW LOCATION
            this.addLocationFormGroup.patchValue({ State: this.selectValue })
            this.stateId = 0
            this.stateName = ''
          } else if (this.countryId > 0 && this.stateId > 0) {
            // FOR EDIT COUNTRY AND STATE BOTH ARE SELECTED
            this.addLocationFormGroup.patchValue({
              State: this.stateId + '#' + this.stateName,
            })
          } else if (this.countryId > 0 && this.stateId == 0) {
            // WHEN CHANGING COUNTRY
            this.addLocationFormGroup.patchValue({ State: this.selectValue })
          }
        })
    } else if (type == 'city') {
      if (this.stateId !== event.value.split('#')[0]) {
        // NEW STATE IS SELECTED
        // this.cityId = 0
        this.cityName = ''
      }
      this.stateId = event.value.split('#')[0]
      this.stateName = event.value.split('#')[1]
      // CALL STATE API
      // this._adminService
      //   .getListApi('city', 0, this.stateId)
      //   .subscribe((res) => {
      //     this.cityList = res.data
      //     if (this.stateId == 0) {
      //       // FOR NEW LOCATION
      //       this.addLocationFormGroup.patchValue({ City: this.selectValue })
      //       this.cityId = 0
      //       this.cityName = ''
      //     } else if (this.stateId > 0 && this.cityId > 0) {
      //       // FOR EDIT STATE AND CITY BOTH ARE SELECTED
      //       this.addLocationFormGroup.patchValue({
      //         State: this.stateId + '#' + this.stateName,
      //       })
      //       this.addLocationFormGroup.patchValue({
      //         City: this.cityId + '#' + this.cityName,
      //       })
      //     } else if (this.stateId > 0 && this.cityId == 0) {
      //       // WHEN CHANGING STATE
      //       this.addLocationFormGroup.patchValue({ City: this.selectValue })
      //       this.addLocationFormGroup.patchValue({
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

  handleAddressChange(address: google.maps.places.PlaceResult): void {
    
    if (!address.geometry?.location) {
      console.warn('No geometry for this place');
      return;
    }

    this.userAddress  = address.formatted_address ?? '';
    this.userLatitude = address.geometry.location.lat().toString();
    this.userLongitude = address.geometry.location.lng().toString();

    // SET VALUE IN FIELDS
    this.addLocationFormGroup.patchValue({
      Latitude:  this.userLatitude,
      Longitude: this.userLongitude
    });

    this.getReverseGeocodingData(this.userLatitude, this.userLongitude, 5);
  }
  onLocationSelected(location: any) {
    console.log('Coordinates selected:', location);
  }

  showLocation() {
    let lat:any = this.addLocationFormGroup.value.Latitude
    let long:any = this.addLocationFormGroup.value.Longitude
    if (lat !== '' && long !== '') {
      this.getReverseGeocodingData(lat.toString(), long.toString(), 15)
    }
  }

  handleEvent(lat: any, lng: any) {
  
    this.userLatitude = lat.toString()
    this.userLongitude = lng.toString()
    // SET VALUE IN FIELDS
    this.addLocationFormGroup.patchValue({ Latitude: this.userLatitude })
    this.addLocationFormGroup.patchValue({ Longitude: this.userLongitude })
  }


  // Reverse Geocoding

  getReverseGeocodingData(lat: string, lng: string, zoomNum: number) {

  const latlng = new google.maps.LatLng(Number.parseFloat(lat), Number.parseFloat(lng));
  const geocoder = new google.maps.Geocoder();

  geocoder.geocode({ location: latlng }, (results, status) => {
    if (status !== google.maps.GeocoderStatus.OK || !results[0]) {
      console.error('Geocoding failed:', status);
      return;
    }

    // Update address field
    this.userAddress = results[0].formatted_address;

    // Update form fields
    this.addLocationFormGroup.patchValue({
      Latitude: lat,
      Longitude: lng,
    });

    // Reset/Update map
    if (this.map) {
      this.map.setCenter(latlng);
      this.map.setZoom(zoomNum);
    } else {
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        center: latlng,
        zoom: zoomNum,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });
    }

    // 🟩 Changed logic starts here — single marker handling
    if (!this.marker) {   // 🟩 create marker only if not exists
      this.marker = new google.maps.Marker({
        position: latlng,
        map: this.map,
        draggable: true,
      });

      // 🟦 Listen for marker drag
      this.marker.addListener('dragend', () => {
        const newlat = this.marker.getPosition()?.lat() || 0;
        const newlng = this.marker.getPosition()?.lng() || 0;
        this.handleEvent(newlat, newlng);
      });

      // 🟦 Listen for map drag (center moved)
      this.map.addListener('dragend', () => {
        const newlat = this.map.getCenter()?.lat() || 0;
        const newlng = this.map.getCenter()?.lng() || 0;
        this.handleEvent(newlat, newlng);
      });

    } else {
      // 🟥 Instead of adding a new marker each time, update old one
      this.marker.setPosition(latlng);
      this.marker.setAnimation(google.maps.Animation.DROP);
    }
    // 🟩 Changed logic ends here
  });
}

  /**
   * Get Location Schedule Form Controls
   * @returns
   */

  getLocationScheduledFormControls() {
    return (this.addLocationFormGroup.get(
      'locationScheduleCommand',
    ) as FormArray).controls
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
      ;(this.addLocationFormGroup.get(
        'locationScheduleCommand',
      ) as FormArray).controls[index].patchValue({ isOpenAlldays: true }),
        (this.addLocationFormGroup.get(
          'locationScheduleCommand',
        ) as FormArray).controls[index].patchValue({ startTime: '' }),
        (this.addLocationFormGroup.get(
          'locationScheduleCommand',
        ) as FormArray).controls[index].patchValue({ endTime: '' })
    } else {
      this.isOpenAllWeek = false
      ;(this.addLocationFormGroup.get(
        'locationScheduleCommand',
      ) as FormArray).controls[index].patchValue({ isOpenAlldays: false })
    }
    // if(index){
    //   (this.addLocationFormGroup.get('locationScheduleCommand') as FormArray).controls[index].patchValue({ isOpenAlldays: true })
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
      for (let i = 0; i < day.length; i++) {
        const currentDay = day[i];
        const formArray = this.addLocationFormGroup.get('locationScheduleCommand') as FormArray;
        const isOpenAllDays = formArray.controls[currentDay.id].value.isOpenAlldays === true;
        
        if (isOpenAllDays) {
          count++;
        }
      }
      if (count == 7) {
        this.isOpenAllWeek = true
      }
    }
  }
  // ALL DAY OPEN 24 HOUR

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
        ;(this.addLocationFormGroup.get(
          'locationScheduleCommand',
        ) as FormArray).controls[day.id].patchValue({ isOpenAlldays: true }),
          (this.addLocationFormGroup.get(
            'locationScheduleCommand',
          ) as FormArray).controls[day.id].patchValue({ startTime: '' }),
          (this.addLocationFormGroup.get(
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
        ;(this.addLocationFormGroup.get(
          'locationScheduleCommand',
        ) as FormArray).controls[day.id].patchValue({ isOpenAlldays: false }),
          (this.addLocationFormGroup.get(
            'locationScheduleCommand',
          ) as FormArray).controls[day.id].patchValue({ startTime: '' }),
          (this.addLocationFormGroup.get(
            'locationScheduleCommand',
          ) as FormArray).controls[day.id].patchValue({ endTime: '' })
      })
    }
  }
  // WHEN START TIME IS CLOSED

  selectStartTime(event: any, index: number, time: any) {
    if (event.isUserInput && time == 'Closed') {
      ;(this.addLocationFormGroup.get(
        'locationScheduleCommand',
      ) as FormArray).controls[index].patchValue({ endTime: 'Closed' })
    } else if (
      event.isUserInput &&
      time != 'Closed' &&
      (this.addLocationFormGroup.get('locationScheduleCommand') as FormArray)
        .controls[index].value.endTime == 'Closed'
    ) {
      ;(this.addLocationFormGroup.get(
        'locationScheduleCommand',
      ) as FormArray).controls[index].patchValue({ endTime: '' })
    }
  }
  // INITIALIZE START VALUE

  initializeValueStart(event: any) {
    this.timeListforStart = [
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

    const days: any = [
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

    days.forEach((element: any) => {
      this.manageNameControlStart(element.id)
    })
  }
  // INITIALIZE END VALUE
  initializeValueEnd(event: any) {
    this.timeListforEnd = [
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

    const days: any = [
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

    days.forEach((element: any) => {
      this.manageNameControlEnd(element.id)
    })
  }

  // END TIME SELECT

  selectEndTime(event: any, index: number, time: any) {
    if (event.isUserInput && time == 'Closed') {
      ;(this.addLocationFormGroup.get(
        'locationScheduleCommand',
      ) as FormArray).controls[index].patchValue({ startTime: 'Closed' })
    } else if (
      event.isUserInput &&
      time != 'Closed' &&
      (this.addLocationFormGroup.get('locationScheduleCommand') as FormArray)
        .controls[index].value.startTime == 'Closed'
    ) {
      ;(this.addLocationFormGroup.get(
        'locationScheduleCommand',
      ) as FormArray).controls[index].patchValue({ startTime: '' })
    }
  }

  // END TIME IS CLOSED
  // selectEndTime(event: any, index: number, time: any){

  //  console.log( (this.addLocationFormGroup.get('locationScheduleCommand') as FormArray).controls[index].value.startTime);

  //   if (event.isUserInput && ((
  //     this.addLocationFormGroup.get('locationScheduleCommand') as FormArray
  //   ).controls[index].value.startTime=='Closed')) {

  //     if(time!='Closed'){
  //       (
  //         this.addLocationFormGroup.get('locationScheduleCommand') as FormArray
  //       ).controls[index].patchValue({ endTime: 'Closed' });
  //       return
  //     }

  //   //
  // }}
}
