import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Utility } from '../../../helper/utility';

@IonicPage(
  {name:'RptSaleOrderPage',
  segment: 'RptSaleOrder'}
)

@Component({
  selector: 'page-rpt-saleorder',
  templateUrl: 'rpt-saleorder.html'
})
export class RptSaleOrderPage {

  constructor(public navCtrl: NavController, private utility: Utility) {

  }
  doDetails(){
    this.navCtrl.push("RptSaleOrderDetailsPage");
  }
}
