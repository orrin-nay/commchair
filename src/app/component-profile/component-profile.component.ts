import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/users/user.service';

@Component({
  selector: 'app-component-profile',
  templateUrl: './component-profile.component.html',
  styleUrls: ['./component-profile.component.css']
})
export class ComponentProfileComponent implements OnInit {

  constructor(private userService: UserService) {
    
   }

  ngOnInit() {
  }

}
