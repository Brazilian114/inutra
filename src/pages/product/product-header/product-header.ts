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
  oClient:string = "7LINE";
  items: any;
  oSearch:string = "";
  constructor(public navCtrl: NavController, private utility: Utility, private storage: Storage, private productServ: ProductService) {
    
  }
  ionViewWillEnter(){
    this.getProductTop30(this.oSearch);
  }
  initializeItems() {
    this.items = this.data_product;   
   
  }
  /*doShowHide(){
    if(this.hideMe == false){
      this.hideMe = true;
    }else{
      this.hideMe = false;
    }
  }*/
  onInput(ev: any){
    this.initializeItems();
     console.log(this.items);
   let val = ev.target.value;
    if(val && val.trim() != ''){
      this.items = this.items.filter((item)=>{
        return (item.item_no["0"].toLowerCase().indexOf(val.toLowerCase()) > -1 ||  item.description["0"].toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  doDetails(item){
    this.utility.presentLoading();
    this.navCtrl.push("ProductDetailsPage",{ item: item })
    this.utility.finishLoding();
  }
  getProductTop30(oSearch){
    this.utility.presentLoading();
    this.productServ.GetProductTop30(this.oClient, oSearch).then((res)=>{
      this.data_product = res;
      console.log(this.data_product);
      this.initializeItems();
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
