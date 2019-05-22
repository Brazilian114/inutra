import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Utility } from '../../../helper/utility';
import { SaleOrderService } from '../../../services/saleorderservice';

@IonicPage(
  {name:'SaleOrderListPage',
  segment: 'SaleOrderList'}
)

@Component({
  selector: 'page-saleorderlist',
  templateUrl: 'saleorderlist.html',
  providers: [SaleOrderService]
})
export class SaleOrderListPage {
  hideMe:any = true;

  data_saleorder:any;

  oClient:string = "7LINE";
  oUsername:string = "";
  oUserGroup:string = "";
  oUserId:string = "";
  oKeyword:string = "";

  constructor(public navCtrl: NavController, private utility: Utility, private storage: Storage, private saleorderServ: SaleOrderService) {
   
    this.doGetStorage();
    
  }  
  ionViewWillEnter(){
    this.doGetSalesOrders(this.oKeyword);
  }
  doShowHide(){
    if(this.hideMe == false){
      this.hideMe = true;
    }else{
      this.hideMe = false;
    }
  }
  gotoDetail(item){
    this.navCtrl.push("SaleOrderDetailsPage", { item: item });
  }
  AddSaleOrder(){
    this.navCtrl.push("AddSaleOrderPage");
  }
  doGetSalesOrders(oKeyword){
    this.utility.presentLoading();
    this.saleorderServ.GetSalesOrders(this.oClient, this.oUserId, oKeyword, this.oUserGroup).then((res)=>{
      this.data_saleorder = res;
      console.log(this.data_saleorder);
      this.utility.finishLoding();
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
