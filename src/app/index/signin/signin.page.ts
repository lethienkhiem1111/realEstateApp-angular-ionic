import { Component, OnInit } from '@angular/core';
import { AuthService, AuthResponseData } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  isLogin = true;
  isLoading = false;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  private authentication(email: string, password: string) {
    this.isLoading = true;
    this.loadingCtrl.create({
      keyboardClose: true,
      message: 'Loging in...'
    }).then(loadingEl => {
      loadingEl.present();
      let authObs: Observable<AuthResponseData>;
      if(this.isLogin) {
        authObs = this.authService.login(email, password);
      } else {
        authObs = this.authService.signup(email, password);  
      }
      authObs.subscribe(resData => {
        console.log(resData);
        this.isLoading = false;
        loadingEl.dismiss();
        this.router.navigateByUrl('/tabs/real-estate-posts');
      }, errRes => {
        console.log(errRes);
        this.loadingCtrl.dismiss();
        const errCode = errRes.error.error.message;
        let message = 'Could not sign up, please try again';
        if(errCode === 'EMAIL_EXISTS') {
          message = 'This email address already exists!'
        } else if (errCode === 'EMAIL_NOT_FOUND') {
          message = 'Email not found'
        } else if(errCode === 'INVALID_PASSWORD') {
          message = 'Password is invalid'
        }
        this.showAlert(message)
      })
    })
  }

  onSubmit(form: NgForm) {
    if(!form.valid) {
      return
    }
    const email = form.value.email;
    const pwd = form.value.password;
  
    this.authentication(email, pwd);
    
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  private showAlert(message: string) {
    this.alertCtrl.create({
      header: 'Autheticate failed !',
      message: message,
      buttons: ['Okay']
    }).then(alertEl => {
      alertEl.present();
    })
  }

}
