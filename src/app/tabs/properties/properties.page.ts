import { Component, OnInit, ViewChild } from '@angular/core';
import { RealEstateService } from '../real-estate-posts/real-estate.service';
import { PostsResponse } from '../real-estate-posts/posts.interface';
import { SegmentChangeEventDetail } from '@ionic/core';
import { PropertiesService } from './properties.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.page.html',
  styleUrls: ['./properties.page.scss'],
})
export class PropertiesPage implements OnInit {
  isLoading = false;
  segmentCate: BehaviorSubject<string>;
  
  loadPosts: PostsResponse[];
  posts: Observable<any>;
  cata: string;
  // @ViewChild(IonSegment, {static: true}) segment: IonSegment;

  constructor(private propertiesService: PropertiesService) { }

  ngOnInit() {
    console.log('Ionit')
    // this.segment.value = 'news';
    this.isLoading = true
    
    this.getPostsByUserId();
  }

  getPostsByUserId() {
    this.propertiesService.fetchPostsByUserId().subscribe(posts => {
        this.loadPosts = posts;
        console.log(this.loadPosts);
        this.isLoading = false;
      });
    // this.posts = this.propertiesService.fetchPostsByUserId().pipe(tap(
    //   () => {
    //     this.isLoading = false;
    //   }
    // ))
  }

  segmentChanged(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail.value);
    this.isLoading = true
    console.log('event')
    if(event.detail.value && event.detail.value == 'news') {
      console.log('getPost')
      this.getPostsByUserId();
    }
  }
}
