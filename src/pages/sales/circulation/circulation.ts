import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Utility } from '../../../helper/utility';

@IonicPage(
  {name:'CirculationPage',
  segment: 'Circulation'}
)

@Component({
  selector: 'page-circulation',
  templateUrl: 'circulation.html'
})
export class CirculationPage {

  constructor(public navCtrl: NavController, private utility: Utility) {

  }

}
