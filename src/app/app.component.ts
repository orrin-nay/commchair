import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'commchair';

  constructor(private router: Router) {}

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
