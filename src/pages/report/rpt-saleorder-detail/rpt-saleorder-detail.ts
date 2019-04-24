import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Utility } from '../../../helper/utility';

@IonicPage(
  {name:'RptSaleOrderDetailsPage',
  segment: 'RptSaleOrderDetails'}
)

@Component({
  selector: 'page-rpt-saleorder-detail',
  templateUrl: 'rpt-saleorder-detail.html'
})
export class RptSaleOrderDetailsPage {
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
}
