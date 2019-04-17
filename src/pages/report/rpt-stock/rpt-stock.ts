import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Utility } from '../../../helper/utility';

@IonicPage(
  {name:'RptStockPage',
  segment: 'RptStock'}
)

@Component({
  selector: 'page-rpt-stock',
  templateUrl: 'rpt-stock.html'
})
export class RptStockPage {

  constructor(public navCtrl: NavController, private utility: Utility) {

  }

}
