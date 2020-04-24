import { Component, OnInit, OnDestroy } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Plugins, Capacitor } from '@capacitor/core';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// // import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private authSub: Subscription;
  private previosAuthState = false;

  isAuthenticated: boolean;

  constructor(
    private platform: Platform,
    private authService: AuthService,
    private router: Router,
    public oktaAuth: OktaAuthService
  ) {
    
    // subscribe to authentication state changes
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
    );
    this.initializeApp();
  }

  login() {
    this.oktaAuth.loginRedirect('/tabs');
  }
  logout() {
    this.oktaAuth.logout('/login');
  }


  initializeApp() {
    this.platform.ready().then(() => {
      if(Capacitor.isPluginAvailable('SplashScreeen')) {
        Plugins.SplashScreen.hide();
      }
    });
    

  }

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    const userClaims = await this.oktaAuth.getUser().then(userClaims=> {
      console.log(userClaims.sub);
    })

    this.authSub = this.authService.userIsAuthenticated.subscribe(isAuth => {
      if(!isAuth && this.previosAuthState !== isAuth) {
        this.router.navigateByUrl('/index/welcome');
      }
      this.previosAuthState = isAuth; 
    })
  }

  onLogout() {
    this.authService.logout();
    
  }

  ngOnDestroy() {
    if(this.authSub) {
      this.authSub.unsubscribe();
    }
  }
}
