import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Utility } from '../../../helper/utility';

@IonicPage(
  {name:'SaleReservationPage',
  segment: 'SaleReservation'}
)

@Component({
  selector: 'page-salereservation',
  templateUrl: 'salereservation.html'
})
export class SaleReservationPage {

  constructor(public navCtrl: NavController, private utility: Utility) {

  }

}
