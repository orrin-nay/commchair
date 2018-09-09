import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {
   }
   title = 'UCare';
  mobileNavVisible = false;
  mobileToggle() {
    this.mobileNavVisible = ! this.mobileNavVisible;
    console.log(this.mobileNavVisible);
  title = 'commchair';
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

  goLogin() {
    this.router.navigate(['login']);

  // mobileNavVisible = false;
  // mobileToggle() {
  //   this.mobileNavVisible = ! this.mobileNavVisible;
  //   console.log(this.mobileNavVisible);
  }
}
