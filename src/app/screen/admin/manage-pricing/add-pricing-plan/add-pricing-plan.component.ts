import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-add-pricing-plan',
  templateUrl: './add-pricing-plan.component.html',
  styleUrls: ['./add-pricing-plan.component.scss']
})
export class AddPricingPlanComponent implements OnInit {

  submitted = false
  registrationForm: any
  isSaveBtn:boolean =true;

  checked = true;
  indeterminate = true;
  labelPosition: 'before' | 'after' = 'after';
  disabled = true;

  addpricingTitle: string = 'Add Pricing Plan';

  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private toastr: ToastrService,
    private _storageService: StorageService
    )  {
      let IsPricingData = this._storageService.getSessionData('PricingData');
      let isSaveBtn = this._storageService.getSessionData('IsSaveBtn');
  
      if (IsPricingData && isSaveBtn=='true') {
        this.addpricingTitle = 'Edit Pricing Plan';
        this.isSaveBtn=true;
        this.setLocationData(IsPricingData);
      }else if(IsPricingData && isSaveBtn=='false'){
        this.addpricingTitle = 'View Pricing Plan';
        this.isSaveBtn=false
       this.addpricingform.disable()
      
      }else{
        this.addpricingTitle = 'Add Pricing Plan';
        this.isSaveBtn=true
      }
    }

    addpricingform = this.formBuilder.group({
    customername: new FormControl('', Validators.required),
    pricingplanname: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    description:new FormControl('',Validators.required),
    currencycode: new FormControl('', Validators.required),
    validfrom:new FormControl('',Validators.required),
    validto:new FormControl('',Validators.required),
    level:new FormControl('',Validators.required),
    pricetype:new FormControl('',Validators.required),
    unit:new FormControl('',Validators.required),
    price:new FormControl('', Validators.required),
    parkingfee:new FormControl('',Validators.required),
    graceperiod:new FormControl('',Validators.required),
    transaction:new FormControl('',Validators.required),
    taxprocessed:new FormControl('', Validators.required),
    salestax:new FormControl('',Validators.required),
    // phonenumber: new FormControl('', [
    //   Validators.required,
    //   Validators.minLength(8),
    // ]),
   
  })



/**
 * Set Form Value
 * @param data 
 */
 setLocationData(data: any) {
  this.addpricingform.patchValue({ customername: data.customername });
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
      console.log('Form data is ', this.addpricingform.value)
   
    
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


