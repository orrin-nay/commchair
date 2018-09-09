import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators, FormBuilder } from '@angular/forms';
import { EventsService } from '../services/events/events.service';
@Component({
  selector: 'app-component-event',
  templateUrl: './component-event.component.html',
  styleUrls: ['./component-event.component.css']
})
export class ComponentEventComponent implements OnInit {

  form: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventsService,
  ) { 
    this.form = this.formBuilder.group({
      name: ['', [
        Validators.required,
      ]],
      description: ['', [
        Validators.required,
      ]],
      organization: ['', [
        Validators.required,
      ]]
    })
  }

  ngOnInit() {
  }
  submit(form: NgForm) {
    let name = form.value.name;
    let description = form.value.description
    let organization = form.value.organization;

    this.eventService.createEvent(name, description, organization)
      .subscribe(e => console.log(e));
  }

}
