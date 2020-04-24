import { Component, OnInit, ViewChild } from '@angular/core';
import { RealEstateService } from '../real-estate-posts/real-estate.service';
import { PostsResponse } from '../real-estate-posts/posts.interface';
import { SegmentChangeEventDetail } from '@ionic/core';
import { PropertiesService } from './properties.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.page.html',
  styleUrls: ['./properties.page.scss'],
})
export class PropertiesPage implements OnInit {
  private postsSub: Subscription;
  isLoading = false;
  segmentCate: BehaviorSubject<string>;
  
  loadPosts: PostsResponse[];
  loadHouse: PostsResponse[];
  listPosts: any;
  selectedSegment: string;
  
  cata: string;
  // @ViewChild(IonSegment, {static: true}) segment: IonSegment;

  constructor(private propertiesService: PropertiesService) { }

  ngOnInit() {
    this.postsSub = this.propertiesService.posts.subscribe(posts => {
      this.loadPosts = posts;
      this.listPosts = this.loadPosts
      console.log(this.loadPosts);
    })
  }

  ionViewWillEnter() {
    this.selectedSegment = "news";
    this.isLoading = true
    this.propertiesService.fetchPostsByUserId().subscribe(() => {
    
      this.isLoading = false;
    });
  }

  // getPostsByUserId() {
  //   this.propertiesService.fetchPostsByUserId().subscribe(posts => {
  //       this.loadPosts = posts;
  //       console.log(this.loadPosts);
  //       this.isLoading = false;
  //     });
    // this.posts = this.propertiesService.fetchPostsByUserId().pipe(tap(
    //   () => {
    //     this.isLoading = false;
    //   }
    // ))
  // }

  segmentChanged(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log('event', event.detail.value);
    if(event.detail.value === 'news') {
      console.log('news')
      this.listPosts = this.loadPosts;
      console.log(this.listPosts)
    } else if(event.detail.value === 'house') {
      console.log('house')
      this.isLoading = true;
      this.listPosts = this.loadPosts.filter(
        post => post.catalog === 'house'
      )
      this.isLoading = false;
      console.log(this.listPosts)
    } else {
      console.log('land')
      this.listPosts = this.loadPosts.filter(
        post => post.catalog === 'land'
      )
      console.log(this.listPosts)
    }
  }

  ngOnDestroy(){
    if(this.postsSub) {  
      this.postsSub.unsubscribe();
    }
  }
}
