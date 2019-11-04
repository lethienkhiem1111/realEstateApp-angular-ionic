import { Component, OnInit, OnDestroy } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Plugins, Capacitor } from '@capacitor/core';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// // import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private authSub: Subscription;
  private previosAuthState = false;

  constructor(
    private platform: Platform,
    private authService: AuthService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if(Capacitor.isPluginAvailable('SplashScreeen')) {
        Plugins.SplashScreen.hide();
      }
    });
    

  }

  ngOnInit() {
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
