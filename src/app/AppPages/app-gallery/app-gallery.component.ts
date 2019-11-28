 import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

 @Component({
   selector: 'app-app-gallery',
   templateUrl: './app-gallery.component.html',
   styleUrls: ['./app-gallery.component.css']
 })
 export class AppGalleryComponent implements OnInit {
  
//    sI = 0;
//    imagePath:string;
//    sliderArray:string[] = [
//     'assets/Gallery/recep.jpg',
//     'assets/Gallery/sang.jpg',
//     'assets/Gallery/hal.jpg'
//    ];
images = [1, 2, 3, 4, 5, 6, 7].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);

paused = false;
unpauseOnArrow = false;
pauseOnIndicator = false;
pauseOnHover = true;

@ViewChild('carousel', {static : true}) carousel: NgbCarousel;

   constructor() { }

   ngOnInit() {
   }
  
   togglePaused() {
     if (this.paused) {
       this.carousel.cycle();
     } else {
       this.carousel.pause();
     }
     this.paused = !this.paused;
   }
 
   onSlide(slideEvent: NgbSlideEvent) {
     if (this.unpauseOnArrow && slideEvent.paused &&
       (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
       this.togglePaused();
     }
     if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
       this.togglePaused();
     }
   }
   

 }


