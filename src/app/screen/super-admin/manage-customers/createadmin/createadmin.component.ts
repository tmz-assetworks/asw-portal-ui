import { FormBuilder, FormControl, Validators } from '@angular/forms'

import { Component, OnInit } from '@angular/core'
import Swal from 'sweetalert2'
import { Router } from '@angular/router'

@Component({
  selector: 'app-createadmin',
  templateUrl: './createadmin.component.html',
  styleUrls: ['./createadmin.component.scss']
})
export class CreateadminComponent implements OnInit {

  
  constructor(private formBuilder: FormBuilder, private _router: Router) {}
  
  addAdminProfile = this.formBuilder.group({
    username: new FormControl('', Validators.required),
    DOB: new FormControl('', Validators.required),
    emailid: new FormControl('', Validators.email),
    organizationName: new FormControl('', Validators.email),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    addressLine1: new FormControl('', Validators.required),
    addressLine2: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    zipcode: new FormControl('', Validators.required),
  })

  ngOnInit() {
  }

  alertWithSuccess() {
    Swal.fire({
      title: '<strong>Are you sure you want to confirm?</strong>',
      icon: 'success',
      focusConfirm: true,
      confirmButtonText: ' <span style="color:#0062A6">CANCEL<span>',
      confirmButtonColor: '#E6E8E9',
      cancelButtonColor: '#0062A6',
      cancelButtonText: ' CONFIRM',
      showCancelButton: true,
     
    }).then((res) => {
    if(!res.isConfirmed) {
     // alert('confirm called');
      this.saveForm();
      } else if(res.isConfirmed) {
        // alert('cancel call');
       
      }
   })
  }

  saveForm() {
    // console.log('Form data is ', this.addCustomerProfile.value)
  }
  btnClick() {
    this._router.navigateByUrl('superadmin/customer/')
  }
}
