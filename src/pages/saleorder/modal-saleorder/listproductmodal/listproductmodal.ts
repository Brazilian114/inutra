import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ModalController, ViewController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Utility } from '../../../../helper/utility';
import { SaleOrderService } from '../../../../services/saleorderservice';
@IonicPage(
  {name:'ListProductModalPage',
  segment: 'ListProductModal'}
)

@Component({
  selector: 'page-listproductmodal',
  templateUrl: 'listproductmodal.html'
})
export class ListProductModalPage {

  oUsername:string = "";
  item: any;

  data_return:any = [];
  arrayItem:any = [];
  constructor(public navCtrl: NavController, private modalCtrl: ModalController, public viewCtrl: ViewController, private utility: Utility, public navParams: NavParams
    , private storage: Storage, private saleorderServ: SaleOrderService) {
      this.storage.get('_userId').then((res) => {
        this.oUsername = res;   
      });
      this.arrayItem = navParams.get("arrayItem");
      console.log(this.arrayItem);
      
  }
  ionViewWillEnter(){
  
  }
  ionViewDidEnter(){
   
  }
  removeItems(item){
    this.arrayItem.forEach((element, idex) => {
      if (element == item){
        this.arrayItem.splice(idex, 1);
      }    
    });
  }

  
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
