import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, ViewController } from 'ionic-angular';

@IonicPage(
  {name:'CustomerDetailsPage',
  segment: 'CustomerDetails'}
)

@Component({
  selector: 'page-customer-details',
  templateUrl: 'customer-details.html'
})
export class CustomerDetailsPage {

  constructor(public navCtrl: NavController, private modalCtrl: ModalController, public viewCtrl: ViewController) {

  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
