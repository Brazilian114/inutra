import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Utility } from '../../../helper/utility';

@IonicPage(
  {name:'AddSaleOrderPage',
  segment: 'AddSaleOrder'}
)

@Component({
  selector: 'page-addsaleorder',
  templateUrl: 'addsaleorder.html'
})
export class AddSaleOrderPage {

  constructor(public navCtrl: NavController, private utility: Utility) {

  }

}
