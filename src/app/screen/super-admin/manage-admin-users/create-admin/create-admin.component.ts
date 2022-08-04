import { FormBuilder, FormControl, Validators } from '@angular/forms'

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import Swal from 'sweetalert2'
import { Router } from '@angular/router'

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.scss'],
})
export class CreateAdminComponent implements OnInit {
  submitted = false
  registrationForm: any
  disableSelect = new FormControl(false)

  constructor(private formBuilder: FormBuilder, private _router: Router) {}
  // ngAfterViewInit(): void {
  //   throw new Error('Method not implemented.')
  // }

  addCustomerProfile = this.formBuilder.group({
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
    // this.onSubmit();
  }

  alertWithSuccess() {
    Swal.fire({
      title: '<strong>Are you sure you want to confirm?</strong>',
      icon: 'success',
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,

      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Close',
    })
  }

  saveForm() {
    // console.log('Form data is ', this.addCustomerProfile.value)
  }
  btnClick() {
    this._router.navigateByUrl('superadmin/admin/')
  }
}
