import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userInfo: any;
  constructor(public oktaAuth: OktaAuthService) { }

  async ngOnInit() {
    const userClaims = await this.oktaAuth.getUser();

    // user name is exposed directly as property
    this.userInfo = userClaims;
    console.log(userClaims)
    this.getProfile();
    console.log('ioni')
  }
  ionViewWillEnter() {
    console.log('viewwill')
  }
  getProfile() {
    this.oktaAuth.getAccessToken().then(token => {
      console.log(token);
    })
  }
  logout() {
    this.oktaAuth.logout('/');
  }

}
