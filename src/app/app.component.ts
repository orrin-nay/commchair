import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { UserService } from './services/users/user.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router, public userService: UserService) {
   }
   
  loggedIn = this.userService.isUserLoggedIn();
  title = 'commchair';
  mobileNavVisible = false;
  mobileToggle() {
    this.mobileNavVisible = ! this.mobileNavVisible;
    console.log(this.mobileNavVisible);
  }
  goHome() {
    this.router.navigate(['']);
  }
  goRegister() {
    this.router.navigate(['register']);
  }
  goGallery() {
    this.router.navigate(['gallery']);
  }
  goEvent() {
    this.router.navigate(['event']);
  }

  goLogin() {
    this.router.navigate(['login']);
  }
  
  goLogout(){
	this.userService.logout();
	this.router.navigate(['']);
  }
  goProfile(){
    this.router.navigate(['profile']);
  }
	

  // mobileNavVisible = false;
  // mobileToggle() {
  //   this.mobileNavVisible = ! this.mobileNavVisible;
  //   console.log(this.mobileNavVisible);
}

