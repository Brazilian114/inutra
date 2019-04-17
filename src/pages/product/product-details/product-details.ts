import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage(
  {name:'ProductDetailsPage',
  segment: 'ProductDetails'}
)

@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html'
})
export class ProductDetailsPage {

  constructor(public navCtrl: NavController) {

  }

}
