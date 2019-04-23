import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Utility } from '../../../helper/utility';

@IonicPage(
  {name:'SaleOrderListPage',
  segment: 'SaleOrderList'}
)

@Component({
  selector: 'page-saleorderlist',
  templateUrl: 'saleorderlist.html'
})
export class SaleOrderListPage {
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
  gotoDetail(){
    this.navCtrl.push("SaleOrderDetailsPage");
  }
  AddSaleOrder(){
    this.navCtrl.push("AddSaleOrderPage");
  }
}
