import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { RealEstateService } from '../real-estate.service';
import { RealEstatePost } from '../rlestePost.model';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.page.html',
  styleUrls: ['./detail-post.page.scss'],
})
export class DetailPostPage implements OnInit {

  postRE: RealEstatePost;
  postREId: string;
  catalog: string;
  isLoading = false;

  constructor(
    private realEstateService: RealEstateService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController) { }

  ngOnInit() {
    this.isLoading = true;
    this.activatedRoute.paramMap.subscribe(
      (param) => {
        if (!param.get('rpostId') && !param.get('catalog')) {
          this.navCtrl.navigateBack('/tabs/real-estate-posts');
          return
        }
        this.postREId = param.get('rpostId');
        this.catalog = param.get('catalog');
        console.log(this.postREId)
        this.realEstateService.getPost(this.postREId, this.catalog).subscribe(post => {
          this.postRE = post;  
          console.log(this.postRE)
          this.isLoading = false;      
        })
  }
    )
  }

}
