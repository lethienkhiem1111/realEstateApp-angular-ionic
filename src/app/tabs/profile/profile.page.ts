import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile: any;
  constructor(public oktaAuth: OktaAuthService) { }

  ngOnInit() {
    this.getProfile();
  }
  getProfile() {
    this.oktaAuth.getUser().then(user => {
      console.log(user);
    })
  }
}
