import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'commchair';
  mobileNavVisible = false;
  mobileToggle() {
    this.mobileNavVisible = ! this.mobileNavVisible;
    console.log(this.mobileNavVisible);
  }
}
