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

}
