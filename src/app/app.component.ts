import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class GreenTimberlandZenStock {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = "LoginPage";
  backButtonPressedOnceToExit:any;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private toastCtrl: ToastController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    platform.ready().then(() => {
      platform.registerBackButtonAction(() => {

        if (this.backButtonPressedOnceToExit) {
          platform.exitApp();          
        } else if (this.nav.canGoBack()) {
          this.nav.pop({});
        } else {
          this.presentToast('คลิกอีกครั้งเพื่อออกจากโปรแกรม', false, 'middle');
          this.backButtonPressedOnceToExit = true;
          setTimeout(() => {

            this.backButtonPressedOnceToExit = false;
          },2000)
        }
      });
    });

  }
  presentToast(key, showCloseButton, position: string) {
    const toast = this.toastCtrl.create({
      message: key,
      showCloseButton: showCloseButton,
      closeButtonText: 'Ok',
      duration: 2000,
      position : position
    });
    toast.present();
  }
}

