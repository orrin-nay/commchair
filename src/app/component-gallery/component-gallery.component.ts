import { NgImageSliderModule } from 'ng-image-slider';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-gallery',
  templateUrl: './component-gallery.component.html',
  styleUrls: ['./component-gallery.component.css']
})






export class ComponentGalleryComponent implements OnInit {



  constructor() {
	  }


	  imageObject: Array<object> = [{
        image: '../../assets/img/slider/1.jpg',
        thumbImage: '../../assets/img/slider/1.jpg'
    }, {
        image: '../../assets/img/slider/2.jpg',
        thumbImage: '../../assets/img/slider/2.jpg'
    }, {
        image: '../../assets/img/slider/3.jpg',
        thumbImage: '../../assets/img/slider/3.jpg'
    }, {
        image: '../../assets/img/slider/4.jpg',
        thumbImage: '../../assets/img/slider/4.jpg'
    }, {
        image: '../../assets/img/slider/5.jpg',
        thumbImage: '../../assets/img/slider/5.jpg'
    }, {
        image: '../../assets/img/slider/6.jpg',
        thumbImage: '../../assets/img/slider/6.jpg'
    }, {
        image: '../../assets/img/slider/7.jpg',
        thumbImage: '../../assets/img/slider/7.jpg'
    }
	
];
  
  ngOnInit() {
	  
	  
  }

}



