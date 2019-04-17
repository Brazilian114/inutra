import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Utility } from '../../../helper/utility';

@IonicPage(
  {name:'SaleOrderDetailsPage',
  segment: 'SaleOrderDetails'}
)

@Component({
  selector: 'page-saleorderdetails',
  templateUrl: 'saleorderdetails.html'
})
export class SaleOrderDetailsPage {

  constructor(public navCtrl: NavController, private utility: Utility) {

  }

}
