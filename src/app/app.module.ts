import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {
  OKTA_CONFIG,
  OktaAuthModule
} from '@okta/okta-angular';
const oktaConfig = {
  issuer: 'https://dev-377192.okta.com/oauth2/default',
  clientId: '0oa1n780ckvv7xl2L357',
  redirectUri: 'http://localhost:8100/implicit/callback'
}
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, HttpClientModule, OktaAuthModule, AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,AngularFirestore,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: OKTA_CONFIG, useValue: oktaConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
