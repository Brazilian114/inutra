import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, ViewController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Utility } from '../../../../helper/utility';
import { SaleOrderService } from '../../../../services/saleorderservice';
@IonicPage(
  {name:'CustomerModalPage',
  segment: 'CustomerModal'}
)

@Component({
  selector: 'page-customermodal',
  templateUrl: 'customermodal.html',
  providers: [SaleOrderService]
})
export class CustomerModalPage {
  oClient:string = "7LINE";
  items: any;
  data_customerparam:any;
  constructor(public navCtrl: NavController, private modalCtrl: ModalController, public viewCtrl: ViewController, private utility: Utility, public navParams: NavParams
    , private storage: Storage, private saleorderServ: SaleOrderService) {

  }
  ionViewWillEnter(){
    this.doGetCustomerParam();
  }
  doGetCustomerParam(){
    this.utility.presentLoading();
    this.saleorderServ.GetCustomerParam(this.oClient).then((res)=>{
      this.data_customerparam = res;
      console.log(this.data_customerparam);
      this.initializeItems();
      this.utility.finishLoding();  
    })
  }  
  initializeItems() { 
    this.items = this.data_customerparam;
  }
  onInput(ev: any){
    this.initializeItems();
    let val = ev.target.value;
    if(val && val.trim() != ''){
      this.items = this.items.filter((item)=>{
        return (item.customer_name["0"].toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  doSelectCustomer(customer, customer_name){
    let data = { 'customer': customer, 'customer_name': customer_name };
    this.viewCtrl.dismiss(data);
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
