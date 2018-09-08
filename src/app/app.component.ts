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

  goGallery() {
    this.router.navigate(['component-gallery/component-gallery.component.html']);
  }

  goLogin() {
    this.router.navigate(['component-login/component-login.component.html']);
  }
}
