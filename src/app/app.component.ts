import { Component } from '@angular/core';
import { EventsService } from './services/events/events.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private eventsService: EventsService) {
    eventsService.getEvents().subscribe((events) => {
      this.events = events;
    });
   }
  mobileNavVisible = false;
  events: any = [];
  mobileToggle() {
    this.mobileNavVisible = ! this.mobileNavVisible;
    console.log(this.mobileNavVisible);
  }
}
