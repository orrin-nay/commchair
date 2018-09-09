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
  
  currentPage = "home";
  
  goHome() {
    this.currentPage = "home";
	this.router.navigate(['']);
  }
  goRegister() {
	this.currentPage = "register";
    this.router.navigate(['register']);
  }
  goGallery() {
	this.currentPage = "gallery";
    this.router.navigate(['gallery']);
  }
  goEvent() {
	this.currentPage = "event";
    this.router.navigate(['event']);
  }

  goLogin() {
	this.currentPage = "login";
    this.router.navigate(['login']);
  }
  
  goLogout(){
	this.currentPage = "logout";
	this.userService.logout();
	this.router.navigate(['']);
  }
  goProfile(){
	this.	currentPage = "profile";
    this.router.navigate(['profile']);
  }
  

  mobileNavVisible = false;
  mobileToggle() {
	this.mobileNavVisible = ! this.mobileNavVisible;
	console.log(this.mobileNavVisible);
  }

}