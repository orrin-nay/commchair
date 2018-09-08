import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'commchair';
	
	function toggle() {
				var element = document.getElementById("navCollapse");
				element.classList.toggle("visable");
			}
		
  
}
