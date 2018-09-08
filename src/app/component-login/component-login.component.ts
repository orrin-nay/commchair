import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-component-login',
  templateUrl: './component-login.component.html',
  styleUrls: ['./component-login.component.css']
})
export class ComponentLoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  constructor() { }

  ngOnInit() {
  }

}
