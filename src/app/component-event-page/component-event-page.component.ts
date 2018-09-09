import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events/events.service';
import{ HomeComponentComponent } from '../home-component/home-component.component'
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-component-event-page',
  templateUrl: './component-event-page.component.html',
  styleUrls: ['./component-event-page.component.css']
})
export class ComponentEventPageComponent implements OnInit {

	eventName : string;
	 eventDesc : string;
	 eventOrg : string;
	 eventId : string; 
  constructor(private route : ActivatedRoute, private eventServace : EventsService) { }

  ngOnInit() {
	  this.eventId = this.route.snapshot.paramMap.get("eventid");
	  console.log(this.eventId);
	  this.eventServace.getEvent(this.eventId).subscribe(event => {
		  this.eventName = event.name
		  this.eventOrg = event.organization
		  this.eventDesc = event.description
	  }); 
  }
  

}
