import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Utility } from '../../../helper/utility';
import { SaleOrderService } from '../../../services/saleorderservice';
@IonicPage(
  {name:'AddSaleOrderPage',
  segment: 'AddSaleOrder'}
)

@Component({
  selector: 'page-addsaleorder',
  templateUrl: 'addsaleorder.html',
  providers: [SaleOrderService]
})
export class AddSaleOrderPage {

  oClient:string = "001";
  oCustomer:string = "";
  oCustomer_name:string = "";
  oType:string = "";
  oDate:any = new Date().toISOString();
  oPayTerm:string = "";
  oSale:string = "";
  oDateSale:any = new Date().toISOString();
  oVat:string = "";
  oDiscount:string = "";
  oCheckDiscount:any;
  oRemark:string = "";

  data_customerparam:any;
  data_productparampayterm:any;
  data_productparamsale:any;

  constructor(public navCtrl: NavController, private utility: Utility, public navParams: NavParams
    , private storage: Storage, private saleorderServ: SaleOrderService, private modalCtrl: ModalController) {

  }
  ionViewWillEnter(){
    this.doProductParamPayTerm();
    this.doProductParamSale();
  }
  doCustomerModal(){
    this.utility.presentLoading();
    let modal = this.modalCtrl.create("CustomerModalPage")
    modal.present();
    modal.onDidDismiss(data =>{
      console.log(data);
      if(data != undefined){
       this.oCustomer = data.customer;
       this.oCustomer_name = data.customer_name;
      }else{

      }
    });
    this.utility.finishLoding();
  }
  doProductParamPayTerm(){
    this.saleorderServ.GetProductParam("PAY-TERM").then((res)=>{
      this.data_productparampayterm = res;
      console.log(this.data_productparampayterm);      
    })
  }
  doProductParamSale(){
    this.saleorderServ.GetProductParam("SALES CODE").then((res)=>{
      this.data_productparamsale = res;
      console.log(this.data_productparamsale);      
    })
  }
  doProductModal(){
    this.utility.presentLoading();
    let modal = this.modalCtrl.create("AddProductPage")
    modal.present();
    modal.onDidDismiss(data =>{
      console.log(data);
      if(data != undefined){

      }else{

      }
    });
    this.utility.finishLoding();
  }
}