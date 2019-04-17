import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Utility } from '../../helper/utility';

@IonicPage(
  {name:'LoginPage',
  segment: 'Login'}
)

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, private utility: Utility) {

  }
  doLogin(oUsername, oPassword){
    this.navCtrl.setRoot("HomePage");
  }
}
