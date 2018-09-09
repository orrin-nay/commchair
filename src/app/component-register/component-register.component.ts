import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from '../services/users/user.service';

export class RegularErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
export class PasswordErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl|| invalidParent);
  }
}



@Component({
  selector: 'app-component-register',
  templateUrl: './component-register.component.html',
  styleUrls: ['./component-register.component.css']
})

export class ComponentRegisterComponent implements OnInit {
  passwordForm: FormGroup;
  password: string;
  passwordConf: string;
  passwordConfirmationForm: string;
  registerForm: FormGroup;
  regularMatcher = new RegularErrorStateMatcher();
  passwordMatcher = new PasswordErrorStateMatcher();
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
    ) { 
    this.registerForm = this.formBuilder.group({
      firstName: ['',[
        Validators.required,
      ]],
      lastName: ['',[
        Validators.required,
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
      ]],
      phone : ['', [
        Validators.required,
        Validators.pattern("/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g"),
      ]],
    }, 
    {
      validator: this.checkPhoneNumber,
    }),
    this.passwordForm = this.formBuilder.group(
      {
        password: ['', [
          Validators.required,
        ]],
        passwordConfirmation: [''],
      }, 
      {
        validator: this.checkPasswords,
      }
    )
    }
  
  ngOnInit() {
    console.log(this.registerForm.controls.firstNameFormControl);
    
  }
  checkPasswords (group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.passwordConfirmation.value;
    return pass === confirmPass ? null : {notSame: true};
  }
  checkPhoneNumber(group: FormGroup) {
    let phoneNumber = group.controls.phone.value;

    phoneNumber = phoneNumber.replace(/\D/g, '');

    let isValid = false;

    if (phoneNumber.length === 10) {
      isValid = true;
    }

    let returnValue = isValid ? null: {notValidPhone: true}
    return returnValue
  }
  submit() {
    let email = this.registerForm.value.email;
    let firstName = this.registerForm.value.firstName;
    let lastName = this.registerForm.value.lastName;
    let phone = this.registerForm.value.phone;
    this.userService.registerUser(firstName, lastName, email, phone, this.password)
      .subscribe(e => console.log(e));
    }

}
