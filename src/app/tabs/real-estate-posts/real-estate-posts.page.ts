import { Component, OnInit } from '@angular/core';
import { SegmentChangeEventDetail } from '@ionic/core';
import { RealEstateService } from './real-estate.service';
import { PostsResponse } from './posts.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-real-estate-posts',
  templateUrl: './real-estate-posts.page.html',
  styleUrls: ['./real-estate-posts.page.scss'],
})
export class RealEstatePostsPage implements OnInit {
  private postsSub: Subscription;
  isLoading = false;
  constructor(private realEstateService: RealEstateService) { }
  loadPosts: PostsResponse[];
  listPosts: PostsResponse[];

  ngOnInit() {
    this.postsSub = this.realEstateService.posts.subscribe(posts => {
      this.loadPosts = posts;
      this.listPosts = this.loadPosts
      console.log(this.loadPosts);
    })
  }
  ionViewWillEnter() {
    this.isLoading = true
    this.realEstateService.fetchPosts().subscribe(() => {
    
      this.isLoading = false;
    });
  }
  // getPostList() {
  //   this.realEstateService.fetchPosts().subscribe(posts => {
  //       this.loadPosts = posts;
  //       console.log(this.loadPosts);
  //       this.isLoading = false;
  //     });

    // this.realEstateService.getRealEstateList().snapshotChanges().pipe(
    //   map(changes =>
    //     changes.map(c =>
    //       ({ key: c.payload.doc.id, ...c.payload.doc.data() })
    //     )
    //   )
    // ).subscribe(posts => {
    //   this.loadPosts = posts;
    //   console.log(this.loadPosts)
    //   this.isLoading = false;
    // });
  
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
