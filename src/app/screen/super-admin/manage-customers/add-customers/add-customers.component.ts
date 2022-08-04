import { AfterViewInit, Component, OnInit } from '@angular/core'

import { FormBuilder, Validators } from '@angular/forms'
import { FormControl, FormGroup, Validator } from '@angular/forms'
import { Router } from '@angular/router'
import Swal from 'sweetalert2'

interface Food {
  value: string
  viewValue: string
}

@Component({
  selector: 'app-add-customers',
  templateUrl: './add-customers.component.html',
  styleUrls: ['./add-customers.component.scss'],
})
export class AddCustomersComponent implements OnInit {
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ]

  submitted = false
  registrationForm: any

  showAddCustomer: boolean | undefined
  showCustomersList: boolean | undefined

  constructor(private formBuilder: FormBuilder, private _router: Router) {}

  addCustomerProfile = this.formBuilder.group({
    username: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    emailid: new FormControl('', Validators.email),
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
      // confirmButtonAriaLabel: 'Thumbs up, great!',
    })
  }

  saveForm() {
    // console.log('Form data is ', this.addCustomerProfile.value)
  }

  // alertWithCancel (){

  //   Swal.fire('Do you want to cancel')

  //  }

  btnClick() {
    this._router.navigateByUrl('superadmin/customer/')
  }
}
