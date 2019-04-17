import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Utility } from '../../../helper/utility';

@IonicPage(
  {name:'RptProductPage',
  segment: 'RptProduct'}
)

@Component({
  selector: 'page-rpt-product',
  templateUrl: 'rpt-product.html'
})
export class RptProductPage {

  constructor(public navCtrl: NavController, private utility: Utility) {

  }

}
