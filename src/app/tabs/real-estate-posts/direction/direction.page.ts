import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-direction',
  templateUrl: './direction.page.html',
  styleUrls: ['./direction.page.scss'],
})
export class DirectionPage implements OnInit {
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  toSellHouse(){
    let navigationExtract: NavigationExtras = {
      queryParams: {
        cata: 'house'
      }
    }
    this.router.navigate(['tabs/real-estate-posts/new-post'], navigationExtract);
  }
  toRentHouse(){
    let navigationExtract: NavigationExtras = {
      queryParams: {
        cata: 'house'
      }
    }
    this.router.navigate(['tabs/real-estate-posts/new-post'], navigationExtract);
  }
  toSellLand(){
    let navigationExtract: NavigationExtras = {
      queryParams: {
        cata: 'sellLand'
      }
    }
    this.router.navigate(['tabs/real-estate-posts/new-post'], navigationExtract);
  }
  toMotelLeases(){
    let navigationExtract: NavigationExtras = {
      queryParams: {
        cata: 'motelLeases'
      }
    }
    this.router.navigate(['tabs/real-estate-posts/new-post'], navigationExtract);
  }

}
