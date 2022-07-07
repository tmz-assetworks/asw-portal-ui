import { FormBuilder, FormControl, Validators } from '@angular/forms'

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.scss'],
})
export class CreateAdminComponent implements OnInit {
  submitted = false
  registrationForm: any
  disableSelect = new FormControl(false)

  constructor(private formBuilder: FormBuilder) {}
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
  //  simpleAlert(){
  //   Swal.fire('Hello world!');
  // }

  alertWithSuccess() {
    Swal.fire({
      title: '<strong>Are you Sure Want to Successfully !</strong>',

      icon: 'success',
     
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
     
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Close',
      confirmButtonAriaLabel: 'Thumbs up, great!',

    })
  }

  // confirmBox(){
  //   Swal.fire({
  //     title: 'Are you sure want to remove?',
  //     text: 'You will not be able to recover this file!',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes, delete it!',
  //     cancelButtonText: 'No, keep it'
  //   }).then((result) => {
  //     if (result.value) {
  //       Swal.fire(
  //         'Deleted!',
  //         'Your imaginary file has been deleted.',
  //         'success'
  //       )
  //     }
  // else if (result.dismiss === Swal.DismissReason.cancel) {
  //   Swal.fire(
  //     'Cancelled',
  //     'Your imaginary file is safe :)',
  //     'error'
  //   )
  // }
  // })
  //

  saveForm() {
    console.log('Form data is ', this.addCustomerProfile.value)
  }
  cancel() {}

  //  ngAfterViewInit() {
  //    // this.dataSource.paginator = this.paginator;
  //  }
}
