import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, ViewController, NavParams } from 'ionic-angular';

@IonicPage(
  {name:'CustomerDetailsPage',
  segment: 'CustomerDetails'}
)

@Component({
  selector: 'page-customer-details',
  templateUrl: 'customer-details.html'
})
export class CustomerDetailsPage {

  data_item:any;

  oCustomer:string = "";
  oCustomer_name:string = "";
  oStreet:string = "";
  oBuilding:string = "";
  oFax:string = "";
  oCredit:string = "";
  oClient:string = "";
  oPhone:string = "";

  constructor(public navCtrl: NavController, private modalCtrl: ModalController, public viewCtrl: ViewController, public navParams: NavParams) {
    this.data_item = navParams.get('item');

    this.oCustomer = this.data_item.customer;
    this.oCustomer_name = this.data_item.customer_name;
    this.oStreet = this.data_item.street;
    this.oBuilding = this.data_item.building;
    this.oFax = this.data_item.fax;
    this.oCredit = this.data_item.credit_value;
    this.oClient = this.data_item.client;
    this.oPhone = this.data_item.phone;

  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
