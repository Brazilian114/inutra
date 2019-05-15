import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
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

  data_product:any;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, private utility: Utility, private saleorderServ: SaleOrderService) {

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
  doProductModal(){
    
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
