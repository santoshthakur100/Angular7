import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupName,  } from '@angular/forms';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  submitted: boolean;
  loginForm: FormGroup;
  addressForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      Dob: ['', Validators.required],
      Gender: ['', Validators.required],
      Email: ['', Validators.required],
      Cemail: ['', Validators.required],
      Password: ['', Validators.required],
      cPassword: ['', Validators.required]
      });
      
    this.addressForm = this.formBuilder.group({
      userName: ['', Validators.required],
      Address: ['', Validators.required],
      PhoneNo: ['', Validators.required]
    });
  }
  onSubmit() {
		debugger;
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        } else {
          let obj = {
            'FirstName': this.loginForm.value.firstName,
            'LastName': this.loginForm.value.lastName,
            'Dob': this.loginForm.value.Dob,
            'Gender': this.loginForm.value.Gender,
            'Email': this.loginForm.value.Email,
            'ConfirmEmail': this.loginForm.value.Cemail,
            'Password': this.loginForm.value.Password,
            'ConfirmPassword': this.loginForm.value.cPassword,
          }
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value))
        }
        if (this.addressForm.invalid) {
          return;
      } else {
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.addressForm.value))
      }
    }
    
    
}
