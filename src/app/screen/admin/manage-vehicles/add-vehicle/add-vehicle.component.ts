import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent implements OnInit {

  submitted = false
  registrationForm: any
  isSaveBtn:boolean =true;

  addvihicleTitle: string = 'Add Vehicle';

  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private toastr: ToastrService,
    private _storageService: StorageService
    )  {
      let IsVehicleData = this._storageService.getSessionData('VehicleData');
      let isSaveBtn = this._storageService.getSessionData('IsSaveBtn');
  
      if (IsVehicleData && isSaveBtn=='true') {
        this.addvihicleTitle = 'Edit Vehicle';
        this.isSaveBtn=true;
        this.setLocationData(IsVehicleData);
      }else if(IsVehicleData && isSaveBtn=='false'){
        this.addvihicleTitle = 'View Vehicle';
        this.isSaveBtn=false
       this.addvehicleform.disable()
      
      }else{
        this.addvihicleTitle = 'Add Vehicle';
        this.isSaveBtn=true
      }
    }

  addvehicleform = this.formBuilder.group({
    usernameid: new FormControl('', Validators.required),
    modelyearid: new FormControl('', Validators.required),
    makeid: new FormControl('', Validators.required),
    modelid:new FormControl('',Validators.required),
    licenceplate: new FormControl('', Validators.required),
    department:new FormControl('',Validators.required),
    domicilelocation:new FormControl('',Validators.required),
    VehicleMacAddress:new FormControl('',Validators.required),
    rfidcardassigned:new FormControl('',Validators.required),
    // phonenumber: new FormControl('', [
    //   Validators.required,
    //   Validators.minLength(8),
    // ]),
    // addressLine1: new FormControl('', Validators.required),
    // addressLine2: new FormControl('', Validators.required),
    // country: new FormControl('', Validators.required),
    // state: new FormControl('', Validators.required),
    // city: new FormControl('', Validators.required),
    // zipcode: new FormControl('', Validators.required),
  })



/**
 * Set Form Value
 * @param data 
 */
 setLocationData(data: any) {
  this.addvehicleform.patchValue({ usernameid: data.usernameid });
}


  type_lists = new FormControl('')
  alteration_types = [
    'Location A',
    'Location B',
    'Location C',
    'Location D',
    'Location E',
  ]
  ngOnInit(){
    // this.onSubmit();
  }

  alertWithSuccess() {
    Swal.fire({
       title: '<strong>Are you sure you want to confirm?</strong>',
       icon: 'success',
       showCloseButton: true,
       
       focusConfirm: true,
       confirmButtonText: '<span style="color:#0062A6">CANCEL</span>',
       confirmButtonColor:'#E6E8E9',
       
       cancelButtonColor:'#0062A6',
       cancelButtonText:' CONFIRM',
       showCancelButton: true,
      
     }).then((result) => {
      console.log(result,'RehanulHhhhhhhh');
      
      if (result.isDismissed) {
        this.toastr.success("Record has been registered on success.")
         //Do your stuffs...
         
      }
      console.log('Form data is ', this.addvehicleform.value)
   
    
      })
    
    
    }



   saveForm(){
    //alert("Your Record Succefully Save.")
    //console.log('Form data is ', this.addvehicleform.value)
  }
  btnClick(){
    this._router.navigateByUrl('admin/manage-operator/');
   }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }
}


