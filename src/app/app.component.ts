import { Component } from '@angular/core';
import { EventsService } from './services/events/events.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private eventsService: EventsService, private router: Router) {
    eventsService.getEvents().subscribe((events) => {
      this.events = events;
    });
   }
  mobileNavVisible = false;
  events: any = [];
  mobileToggle() {
    this.mobileNavVisible = ! this.mobileNavVisible;
    console.log(this.mobileNavVisible);
  title = 'commchair';

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
