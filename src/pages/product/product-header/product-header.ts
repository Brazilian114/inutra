import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Utility } from '../../../helper/utility';

import { ProductService } from '../../../services/productservice';
@IonicPage(
  {name:'ProductHeaderPage',
  segment: 'ProductHeader'}
)

@Component({
  selector: 'page-product-header',
  templateUrl: 'product-header.html',
  providers: [ProductService]
})
export class ProductHeaderPage {
  hideMe:any = true;
  data_product:any;
  oClient:string = "001";

  constructor(public navCtrl: NavController, private utility: Utility, private storage: Storage, private productServ: ProductService) {
    
  }
  ionViewWillEnter(){
    this.getProductTop30();
  }
  doShowHide(){
    if(this.hideMe == false){
      this.hideMe = true;
    }else{
      this.hideMe = false;
    }
  }
  doDetails(item){
    this.utility.presentLoading();
    this.navCtrl.push("ProductDetailsPage",{ item: item })
    this.utility.finishLoding();
  }
  getProductTop30(){
    this.utility.presentLoading();
    this.productServ.GetProductTop30(this.oClient).then((res)=>{
      this.data_product = res;
      console.log(this.data_product);
      this.utility.finishLoding();     
    })
  }
  getProductByKeyword(oKeyword){
    this.utility.presentLoading();
    this.productServ.GetProductByKeyword(this.oClient, oKeyword).then((res)=>{
      this.data_product = res;
      console.log(this.data_product); 
      this.utility.finishLoding();    
    })
  }
}
