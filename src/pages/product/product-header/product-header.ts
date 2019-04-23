import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Utility } from '../../../helper/utility';

@IonicPage(
  {name:'ProductHeaderPage',
  segment: 'ProductHeader'}
)

@Component({
  selector: 'page-product-header',
  templateUrl: 'product-header.html'
})
export class ProductHeaderPage {
  hideMe:any = true;
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
    this.navCtrl.push("ProductDetailsPage")
    this.utility.finishLoding();
  }
}
