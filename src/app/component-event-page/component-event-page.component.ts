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

	private eventId : string; 
  constructor(private route : ActivatedRoute) { }

  ngOnInit() {
	  this.eventId = this.route.snapshot.paramMap.get("eventid");
  }
  

}
