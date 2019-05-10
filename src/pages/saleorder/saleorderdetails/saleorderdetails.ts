import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Utility } from '../../../helper/utility';

@IonicPage(
  {name:'SaleOrderDetailsPage',
  segment: 'SaleOrderDetails'}
)

@Component({
  selector: 'page-saleorderdetails',
  templateUrl: 'saleorderdetails.html'
})
export class SaleOrderDetailsPage {
  hideMe:any = true;
  data_item:any;
  
  oOrder_no:string = "";
  oCustomer:string = "";
  oCustomer_name:string = "";
  oAddress: string = "";

  constructor(public navCtrl: NavController, private utility: Utility, public navParams: NavParams) {
    this.data_item = navParams.get('item');
    console.log(this.data_item);
    
  }
  doShowHide(){
    if(this.hideMe == false){
      this.hideMe = true;
    }else{
      this.hideMe = false;
    }
  }
}
