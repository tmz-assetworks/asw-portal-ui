import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/service/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss'],
})
export class AddLocationComponent implements OnInit {

  isSaveBtn:boolean =true;
  locationInfoTitle: string = 'Location Information';
  selected = '7 AM to 8 PM';
  
/**
 * Add Location Information Form 
 */
  addLocationForm = this.formBuilder.group({
    LocationId: new FormControl('', Validators.required),
    LocationName: new FormControl('', Validators.required),
    locationStatus: new FormControl('', Validators.required),
    Description: new FormControl('', Validators.required),
    contactPersonName: new FormControl('', Validators.required),
    contactPersonNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    Latitude: new FormControl('', Validators.required),
    Longitude: new FormControl('', Validators.required),
    addressLine1: new FormControl('', Validators.required),
    addressLine2: new FormControl('', Validators.required),
    Country: new FormControl('', Validators.required),
    State: new FormControl('', Validators.required),
    City: new FormControl('', Validators.required),
    zipcode: new FormControl('', Validators.required),
    totalcapacity: new FormControl('', Validators.required),
    utilityservice: new FormControl('', Validators.required),
    dates: new FormControl('', Validators.required),
  });


  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _storageService: StorageService,
    private toastr: ToastrService
  ) {
    let IsLocationData = this._storageService.getSessionData('LocationData');
    let isSaveBtn = this._storageService.getSessionData('IsSaveBtn');


    if (IsLocationData && isSaveBtn=='true') {
      this.locationInfoTitle = 'Edit Location Information ';
      this.isSaveBtn=true;
      this.setLocationData(IsLocationData);
    }else if(IsLocationData && isSaveBtn=='false'){
      this.locationInfoTitle = 'View Location Information ';
      // this.setLocationData(IsLocationData);
      this.isSaveBtn=false
      // this.setToReadOnly(IsLocationData)

     this.addLocationForm.disable()
    
    }else{
      this.locationInfoTitle = 'Add Location ';
      this.isSaveBtn=true
    }
  }
  
  
  ngOnInit() {
   
  }
/**
 * Set Form Value
 * @param data 
 */
  setLocationData(data: any) {
    this.addLocationForm.patchValue({ LocationId: data.LocationId });
    this.addLocationForm.patchValue({ LocationName: data.LocationName });
    this.addLocationForm.patchValue({ LocationId: data.LocationId });
    this.addLocationForm.patchValue({ LocationId: data.LocationId });
    this.addLocationForm.patchValue({ LocationId: data.LocationId });
    this.addLocationForm.patchValue({ LocationId: data.LocationId });
    this.addLocationForm.patchValue({ LocationId: data.LocationId });
    this.addLocationForm.patchValue({ LocationId: data.LocationId });
    this.addLocationForm.patchValue({ LocationId: data.LocationId });
    this.addLocationForm.patchValue({ LocationId: data.LocationId });
    this.addLocationForm.patchValue({ LocationId: data.LocationId });
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
      console.log(result,'RehanulHhhhhhhh');
      
      if (result.isDismissed) {
        this.toastr.success("Record has been registered on success.")
         //Do your stuffs...
         
      }
   
    
      })

   }
    
  // toastercall(){
  //   this.toastr.success("Hello, I'm the toastr message.")
  // }
  
/**
 * Read Only mode
//  */
//  setToReadOnly(data:any){

// let locid=this.addLocationForm.controls['LocationId']
// locid.setValue(data.LocationId);
// locid.disable();
// locid.updateValueAndValidity();


//   }


   }
  