import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Utility } from '../../../helper/utility';

@IonicPage(
  {name:'ReportMenuPage',
  segment: 'ReportMenu'}
)

@Component({
  selector: 'page-reportmenu',
  templateUrl: 'reportmenu.html'
})
export class ReportMenuPage {

  constructor(public navCtrl: NavController, private utility: Utility) {

  }
  goReportSaleOrder(){
    this.navCtrl.push("RptSaleOrderPage");
  }
  goReportProduct(){
    this.navCtrl.push("RptProductPage");
  }
  goReportStock(){
    this.navCtrl.push("RptStockPage");
  }
  goReportSaleMan(){
    this.navCtrl.push("RptSalemanPage");
  }
}
