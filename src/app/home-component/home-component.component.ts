import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events/events.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {
  constructor(private eventsService: EventsService) {
    eventsService.getEvents().subscribe(events => {
      this.events = events;
    });
    eventsService.createEvent('code at hackathon');
  }
  events: any = [];

  ngOnInit() {}
}
