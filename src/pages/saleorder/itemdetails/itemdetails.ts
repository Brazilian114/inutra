import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Utility } from '../../../helper/utility';

@IonicPage(
  {name:'ItemDetailsPage',
  segment: 'ItemDetails'}
)

@Component({
  selector: 'page-itemdetails',
  templateUrl: 'itemdetails.html'
})
export class ItemDetailsPage {

  constructor(public navCtrl: NavController, private utility: Utility) {

  }

}
