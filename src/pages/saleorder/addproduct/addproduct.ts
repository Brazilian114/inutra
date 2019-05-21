import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, ModalController, NavParams, List } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Utility } from '../../../helper/utility';
import { SaleOrderService } from '../../../services/saleorderservice';

@IonicPage(
  {name:'AddProductPage',
  segment: 'AddProduct'}
)

@Component({
  selector: 'page-addproduct',
  templateUrl: 'addproduct.html'
})
export class AddProductPage {

  oClient:string = "001";
  oCustomer:string = "";
  isChecked:any = [];

  arrayItem:any = [];

  data_product:any;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public modalCtrl: ModalController
    , private utility: Utility, private saleorderServ: SaleOrderService, public navParams: NavParams) {
      this.oCustomer = navParams.get('oCustomer');
      console.log(this.oCustomer);
      this.arrayItem = navParams.get('arrayItem');
      console.log("array",this.arrayItem);
  }
  ionViewWillEnter(){
    this.doGetProduct();
  }
  checkItem(){
    console.log(this.isChecked);
    
  }
  doGetProduct(){
    this.saleorderServ.GetProduct(this.oClient).then((res)=>{
      this.data_product = res;
      console.log(this.data_product);
      
    })
  }
  doProductModal(item, isChecked){
    console.log(isChecked);
    console.log(this.isChecked);

    if(isChecked == true){
      this.utility.presentLoading();
      let modal = this.modalCtrl.create("ProductModalPage",{ item: item, oCustomer: this.oCustomer, arrayItem: this.arrayItem })
      modal.present();
      modal.onDidDismiss(data =>{
        if(data != undefined){
          this.arrayItem.push(data);
          console.log("addsession", this.arrayItem);
          
        }else{
  
        }
      });
      this.utility.finishLoding();
    }else{
      
    }

   
  }
  dismiss() {
    this.viewCtrl.dismiss(this.arrayItem);
  }
}
