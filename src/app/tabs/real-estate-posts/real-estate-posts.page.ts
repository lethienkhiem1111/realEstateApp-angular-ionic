import { Component, OnInit } from '@angular/core';
import { SegmentChangeEventDetail } from '@ionic/core';
import { RealEstateService } from './real-estate.service';
import { PostsResponse } from './posts.interface';

@Component({
  selector: 'app-real-estate-posts',
  templateUrl: './real-estate-posts.page.html',
  styleUrls: ['./real-estate-posts.page.scss'],
})
export class RealEstatePostsPage implements OnInit {
  isLoading = false;
  constructor(private realEstateService: RealEstateService) { }
  loadPosts: PostsResponse[]
  timer: any;

  ngOnInit() {
    this.isLoading = true
    this.getPostList();
  }

  getPostList() {
    this.realEstateService.fetchPosts().subscribe(posts => {
        this.loadPosts = posts;
        console.log(this.loadPosts);
        this.isLoading = false;
      });

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
  }
  segmentChanged(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail.value);
  }
}
