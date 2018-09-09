import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/users/user.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

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
  password = '';
  error = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  login() {
   const  email = this.emailFormControl.value;
   const  password = this.password;
   this.userService.login(email, password).subscribe((userInfo: any) => {
     if (userInfo.error) {
      this.error = userInfo.error;
      return;
     }
     console.log(userInfo);
     if (userInfo.token) {
      this.router.navigate(['register']);
     }
   });
  }

}
