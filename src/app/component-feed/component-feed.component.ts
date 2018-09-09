import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events/events.service';

@Component({
  selector: 'app-component-feed',
  templateUrl: './component-feed.component.html',
  styleUrls: ['./component-feed.component.css']
})
export class ComponentFeedComponent implements OnInit {

  constructor(private eventsService: EventsService) {
    eventsService.getEvents().subscribe(events => {
      this.events = events;
    });
  }
  events: any = [];

  ngOnInit() {
  }

}
