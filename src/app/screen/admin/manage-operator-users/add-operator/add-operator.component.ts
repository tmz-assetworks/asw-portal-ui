import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-operator',
  templateUrl: './add-operator.component.html',
  styleUrls: ['./add-operator.component.scss'],
})
export class AddOperatorComponent implements OnInit {
  submitted = false
  registrationForm: any

  constructor(private formBuilder: FormBuilder) {}

  addOperatorProfile = this.formBuilder.group({
    username: new FormControl('', Validators.required),
    emailid: new FormControl('', Validators.email),
    dob: new FormControl('', Validators.required),
    phonenumber: new FormControl('', [
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
      title: '<strong>Are you Sure Want to Successfully !</strong>',

      icon: 'success',
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      footer:'',
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Close',
      confirmButtonAriaLabel: 'Thumbs up, great!',

    })
  }

   saveForm(){
    //alert("Your Record Succefully Save.")
    console.log('Form data is ', this.addOperatorProfile.value)
  }
  cancel() {}

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }
}


