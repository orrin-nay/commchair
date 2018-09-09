import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-component-login',
  templateUrl: './component-login.component.html',
  styleUrls: ['./component-login.component.css']
})
export class ComponentLoginComponent implements OnInit {

  hide = true;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);


  constructor() { }

  ngOnInit() {
  }

}
