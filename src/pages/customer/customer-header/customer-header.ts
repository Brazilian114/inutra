import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Utility } from '../../../helper/utility';

@IonicPage(
  {name:'CustomerHeaderPage',
  segment: 'CustomerHeader'}
)

@Component({
  selector: 'page-customer-header',
  templateUrl: 'customer-header.html'
})
export class CustomerHeaderPage {
  hideMe:any = false;
  constructor(public navCtrl: NavController, private utility: Utility) {

  }
  doShowHide(){
    if(this.hideMe == false){
      this.hideMe = true;
    }else{
      this.hideMe = false;
    }
  }

  doDetails(){
    this.utility.presentLoading();
    this.navCtrl.push("CustomerDetailsPage")
    this.utility.finishLoding();
  }
}
