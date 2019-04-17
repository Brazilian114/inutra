import { Injectable } from '@angular/core';
import { Platform, ToastController, AlertController, LoadingController, Events } from 'ionic-angular';
import 'rxjs/Rx';
@Injectable()
export class Utility {

  loader:any;

  constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController){

  }

  Alert(title, subTitle){
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: [ {
          text: 'ตกลง',
          handler: data => {

          }
        }]
    });
    alert.present();
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
  presentLoading(){
    this.loader = this.loadingCtrl.create({
      content:"Loading...",
      duration:2000
  });
    this.loader.present().then(() => {});
  };
  finishLoding(){
    this.loader.dismiss();
  }

}
