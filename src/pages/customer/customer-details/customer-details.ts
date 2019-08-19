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
console.log(this.data_item);

    if(this.data_item.customer ==  undefined)
    this.oCustomer = "-";
    else
    this.oCustomer = this.data_item.customer;

    if(this.data_item.customer == undefined)
    this.oCustomer_name = "-";
    else
    this.oCustomer_name = this.data_item.customer_name;

    if(this.data_item.street == undefined)
    this.oStreet = "-";
    else
    this.oStreet = this.data_item.street;

    if(this.data_item.building == undefined)
    this.oBuilding = "";
    else
    this.oBuilding = this.data_item.building;

    if(this.data_item.fax == undefined || this.data_item.fax == "")
    this.oFax = "-";
    else
    this.oFax = this.data_item.fax;
    
    if(this.data_item.credit_value == undefined)
    this.oCredit = "-";
    else
    this.oCredit = this.data_item.credit_value;

    if(this.data_item.client == undefined)
    this.oClient = "-";
    else
    this.oClient = this.data_item.client;

    if(this.data_item.phone == undefined)
    this.oPhone = "-";
    else
    this.oPhone = this.data_item.phone;
 
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
