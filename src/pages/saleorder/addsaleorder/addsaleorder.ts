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
  hideMe:any = true;

  oClient:string = "001";
  oCustomer:string = "";
  oCustomer_name:string = "";
  oType:string = "";
  oDate:any = new Date().toISOString();
  oPayTerm:string = "";
  oSale:string = "";
  oDateSale:any = new Date().toISOString();

  oVat1:string = "";
  oDiscount1:string = "";
  oCheckDiscount1:any = false;
  oVat2:string = "";
  oDiscount2:string = "";
  oCheckDiscount2:any = false;
  oVat3:string = "";
  oDiscount3:string = "";
  oCheckDiscount3:any = false;

  oRemark:string = "";

  data_customerparam:any;
  data_productparampayterm:any;
  data_productparamsale:any;

  arrayItem:any = [];

  constructor(public navCtrl: NavController, private utility: Utility, public navParams: NavParams
    , private storage: Storage, private saleorderServ: SaleOrderService, private modalCtrl: ModalController) {

  }
  ionViewWillEnter(){
    this.utility.presentLoading();
    this.doProductParamPayTerm();
    this.doProductParamSale();
    this.utility.finishLoding();
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
  doShowHide(){
    if(this.hideMe == false){
      this.hideMe = true;
    }else{
      this.hideMe = false;
    }
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
    if(this.oCustomer == "" || this.oCustomer == undefined){
      this.utility.Alert("Warning","กรุณาเลือก Customer ก่อน");
    }else{
      this.utility.presentLoading();
      let modal = this.modalCtrl.create("AddProductPage", { oCustomer: this.oCustomer, arrayItem: this.arrayItem })
      modal.present();
      modal.onDidDismiss(data =>{
        if(data != undefined){
          this.arrayItem = data;
          console.log("addsessionAddsale", this.arrayItem);
        }else{
  
        }
      });
      this.utility.finishLoding();
    }
  }
  SaveSaleOrder(){
    
  }
  doChangeTypeVat1(oVat1){
    this.oVat1 = oVat1;
  }
  doChangeTypeVat2(oVat2){
    this.oVat2 = oVat2;
  }
  doChangeTypeVat3(oVat3){
    this.oVat3 = oVat3;
  }
  doChangeTextDiscount1(oDiscount1){
    this.oDiscount1 = oDiscount1;
  }
  doChangeTextDiscount2(oDiscount2){
    this.oDiscount2 = oDiscount2;
  }
  doChangeTextDiscount3(oDiscount3){
    this.oDiscount3 = oDiscount3;
  }
  doChangeDiscount1(oCheckDiscount1){
    this.oCheckDiscount1 = oCheckDiscount1;
  }
  doChangeDiscount2(oCheckDiscount2){
    this.oCheckDiscount2 = oCheckDiscount2;
  }
  doChangeDiscount3(oCheckDiscount3){
    this.oCheckDiscount3 = oCheckDiscount3;
  }
}