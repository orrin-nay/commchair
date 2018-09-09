import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface JWT {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registerUser(firstName, lastName, email, phone, password) {
    fetch(environment.host + '/api/users/register',
    {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'no-cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          password
        }),
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(tokenJson) {
      localStorage.setItem('jwt-token', tokenJson.token);
      return {success: true };
    });
  }
  login(email, password) {
    return this.http.post<JWT>(environment.host + '/api/user/login', {
      email,
      password
    }).pipe((data) => {
      data.subscribe(userInfo => {
        if (userInfo) {
          if (userInfo.token) {
            localStorage.setItem('jwt-token', userInfo.token);
          }
        }
      });
      return data;
    });
  }
  logout() {
    localStorage.removeItem('jwt-token');
  }
  isUserLoggedIn(): boolean {
    return !!localStorage.getItem('jwt-token');
  }
}
