import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../services/users/user.service';

@Component({
  selector: 'app-component-profile',
  templateUrl: './component-profile.component.html',
  styleUrls: ['./component-profile.component.css']
})
export class ComponentProfileComponent implements OnInit {

  user: User;
  constructor(private userService: UserService) {
    userService.getUserProfile().subscribe(userInfo => {
      this.user = userInfo;
    });
   }

  ngOnInit() {
    
  }

}
