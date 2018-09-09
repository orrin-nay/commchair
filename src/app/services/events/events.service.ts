import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface Event {
  name: string;
  ownerId: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(environment.host + '/api/events/getevents');
    // console.log(environment.host + '/api/events/getevents')
    // return fetch(environment.host + '/api/events/getevents',
    // {
    //   method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //     mode: 'no-cors', // no-cors, cors, *same-origin
    //     // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //     // credentials: 'same-origin', // include, same-origin, *omit
    //     // headers: {
    //     //     'Content-Type': 'application/json; charset=utf-8',
    //     //     // 'Content-Type': 'application/x-www-form-urlencoded',
    //     // },
    //     // redirect: 'follow', // manual, *follow, error
    //     // referrer: 'no-referrer', // no-referrer, *client
    // })
    // .then(function(response) {
    //   console.log(response)
    //   return response.json();
    // })
    // .then(function(events) {
    //   console.log("ddddddddd")
    //   return events;
    // });
  }

  createEvent(name: String): Observable<Event[]> {
    const jwt = localStorage.getItem('jwt-token');
    return this.http.get<Event[]>(environment.host + '/api/events/getevents');
    // return fetch(environment.host + '/api/events/createevent',
    // {
    //   method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //     mode: 'no-cors', // no-cors, cors, *same-origin
    //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //     credentials: 'same-origin', // include, same-origin, *omit
    //     headers: {
    //         'Content-Type': 'application/json; charset=utf-8',
    //         // 'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //     redirect: 'follow', // manual, *follow, error
    //     referrer: 'no-referrer', // no-referrer, *client
    //     body: JSON.stringify({
    //       name,
    //       jwt,
    //     }),
    // })
    // .then(function(response) {
    //   return response.json();
    // })
    // .then(function(events) {
    //   return events;
    // });
  }
}
