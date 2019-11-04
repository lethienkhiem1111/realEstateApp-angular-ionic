import { Component, OnInit } from '@angular/core';
import { SegmentChangeEventDetail } from '@ionic/core';

@Component({
  selector: 'app-real-estate-posts',
  templateUrl: './real-estate-posts.page.html',
  styleUrls: ['./real-estate-posts.page.scss'],
})
export class RealEstatePostsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  segmentChanged(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail.value);
  }
}
