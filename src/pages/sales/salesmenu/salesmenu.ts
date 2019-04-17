import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Utility } from '../../../helper/utility';

@IonicPage(
  {name:'SaleMenuPage',
  segment: 'SaleMenu'}
)

@Component({
  selector: 'page-salesmenu',
  templateUrl: 'salesmenu.html'
})
export class SaleMenuPage {

  constructor(public navCtrl: NavController, private utility: Utility) {

  }
  doReservation(){
    this.navCtrl.push("SaleReservationPage");
  }
  doCirculation(){
    this.navCtrl.push("CirculationPage");
  }
}
