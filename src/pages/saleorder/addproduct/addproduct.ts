import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, ModalController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Utility } from '../../../helper/utility';
import { SaleOrderService } from '../../../services/saleorderservice';

@IonicPage(
  {name:'AddProductPage',
  segment: 'AddProduct'}
)

@Component({
  selector: 'page-addproduct',
  templateUrl: 'addproduct.html',
  providers: [SaleOrderService]
})
export class AddProductPage {

  oClient:string = "001";
  oCustomer:string = "";
  data_product:any;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public modalCtrl: ModalController
    , private utility: Utility, private saleorderServ: SaleOrderService, public navParams: NavParams) {
      this.oCustomer = navParams.get('oCustomer');
      console.log(this.oCustomer);
      
  }
  ionViewWillEnter(){
    this.doGetProduct();
  }
  doGetProduct(){
    this.saleorderServ.GetProduct(this.oClient).then((res)=>{
      this.data_product = res;
      console.log(this.data_product);
      
    })
  }
  doProductModal(item){
    this.utility.presentLoading();
    let modal = this.modalCtrl.create("ProductModalPage",{ item: item, oCustomer: this.oCustomer })
    modal.present();
    modal.onDidDismiss(data =>{
      console.log(data);
      if(data != undefined){

      }else{

      }
    });
    this.utility.finishLoding();
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
