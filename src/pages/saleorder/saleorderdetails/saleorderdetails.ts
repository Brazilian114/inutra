import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Utility } from '../../../helper/utility';
import { SaleOrderService } from '../../../services/saleorderservice';

@IonicPage(
  {name:'SaleOrderDetailsPage',
  segment: 'SaleOrderDetails'}
)

@Component({
  selector: 'page-saleorderdetails',
  templateUrl: 'saleorderdetails.html',
  providers: [SaleOrderService]
})
export class SaleOrderDetailsPage {
  hideMe:any = true;
  data_item:any;
  data_saleorderdetail:any;

  oClient:string = "7LINE";
  oUsername:string = "";
  oUserGroup:string = "";
  oUserId:string = "";

  //Header
  oOrder_no:string = "";
  oCustomer:string = "";
  oCustomer_name:string = "";
  oAddress:string = "";
  oDiscountRate:string = "";
  oDiscountType:string = "";
  oDueDate:string = "";
  oAmount:string = "";
  oNetAmount:string = "";
  oVat:string = "";
  //Details



  constructor(public navCtrl: NavController, private utility: Utility, public navParams: NavParams, private storage: Storage, private saleorderServ: SaleOrderService) {
   
    this.doGetStorage();

    this.data_item = navParams.get('item');
    console.log(this.data_item);
    
    this.oOrder_no = this.data_item.order_no;
    this.oDueDate = this.data_item.due_date;
    this.oCustomer = this.data_item.customer;
    this.oCustomer_name = this.data_item.customer_name;
    this.oAddress = this.data_item.dlvr_street + " " + this.data_item.dlvr_bldg;
    this.oDiscountRate = this.data_item.discount_rate;
    this.oDiscountType = this.data_item.discount_type;
    this.oAmount = this.data_item.amount;
    this.oNetAmount = this.data_item.net_amount;
    this.oVat = this.data_item.vat;
  }
  ionViewWillEnter(){
    this.doGetOrdersDetails(this.oOrder_no);
  }
  doShowHide(){
    if(this.hideMe == false){
      this.hideMe = true;
    }else{
      this.hideMe = false;
    }
  }
  doGetOrdersDetails(oOrder_no){
    this.saleorderServ.GetOrdersDetails(this.oClient, this.oUserId, this.oUserGroup, oOrder_no).then((res)=>{
      this.data_saleorderdetail = res;  
    })
  }
  doGetStorage(){
    this.storage.get('_user').then((res)=>{
      this.oUsername = res;
    })  
    this.storage.get('_userId').then((res)=>{
      this.oUserId = res;
    })  
    this.storage.get('_userGroup').then((res)=>{
      this.oUserGroup = res;
    })  
  }
}
