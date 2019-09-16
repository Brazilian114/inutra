import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ViewController,Content, ModalController, NavParams, List } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Utility } from '../../../helper/utility';

import { SaleOrderService } from '../../../services/saleorderservice';
import { ProductService } from '../../../services/productservice';

@IonicPage(
  {name:'AddProductPage',
  segment: 'AddProduct'}
)

@Component({
  selector: 'page-addproduct',
  templateUrl: 'addproduct.html'
})
export class AddProductPage {
  
  @ViewChild(Content) pageTop: Content;
  public pageScroller(){
    this.pageTop.scrollToTop();
  }
  oClient:string = "7LINE";
  oCustomer:string = "";
  isChecked:any = [];
  oTotalPrice: any = 0.00;
  public sum_price2: any = [];
  oSearch:string = "";
  arrayItem:any = [];
  item2 = [];
  data_product:any;
  items: any;
  data_return:any = [];
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public modalCtrl: ModalController
    , private utility: Utility, private saleorderServ: SaleOrderService, private productServ: ProductService, public navParams: NavParams) {
      this.oCustomer = navParams.get('oCustomer');
      console.log(this.oCustomer);
      this.arrayItem = navParams.get('arrayItem');
      console.log("array",this.arrayItem);
 
  }
  ionViewWillEnter(){
    this.getProductTop30(this.oSearch);
    //this.getProductByKeyword(this.oSearch)
  }
  initializeItems() {
    this.items = this.data_product;   
  }
  checkItem(){
    console.log(this.isChecked);
    
  }
  /*
  doGetProduct(oSearch){
    
    this.utility.presentLoading();
    this.saleorderServ.GetProduct(this.oClient).then((res)=>{
      this.data_product = res;
      
      console.log(this.data_product);
      this.utility.finishLoding();
    })
    this.utility.presentLoading();
    this.productServ.GetProductTop30(this.oClient, oSearch).then((res)=>{
      this.data_product = res;
      console.log(this.data_product);
      this.initializeItems();
      this.utility.finishLoding();     
    })
}*/

  onInput(ev: any){
    this.initializeItems();
     console.log(this.items);
   let val = ev.target.value;
    if(val && val.trim() != ''){
      this.items = this.items.filter((item)=>{
        return (item.item_no["0"].toLowerCase().indexOf(val.toLowerCase()) > -1 || item.description["0"].toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  doProductModal(item){
    this.utility.presentLoading();
    let modal = this.modalCtrl.create("ProductModalPage",{ item: item, oCustomer: this.oCustomer, arrayItem: this.arrayItem })
    modal.present();
    modal.onDidDismiss(data =>{
      if(data != undefined){
        this.arrayItem.push(data);
       
        let index = 0;
        for (let array of this.arrayItem) {
          console.log("addsession", array);
          index += parseInt(array["5"]);
          var total = index.toFixed(2);       
          } 
          console.log("sumAmount",total);
      
      }else{
        
      }
    });
    this.utility.finishLoding();
}
  doInfinite(ionInfinite) {
    console.log("Start Scroll");
      setTimeout(() => {      
       for(let i = 0; i < 30; i++){
         this.item2.push(this.data_product[this.item2.length]);
         } 
       console.log('End Scroll'); 
       
       ionInfinite.complete();
         }, 500);  
   }
/*
  doProductModal(item){
      this.utility.presentLoading();
      let modal = this.modalCtrl.create("ProductModalPage",{ item: item, oCustomer: this.oCustomer, arrayItem: this.arrayItem })
      modal.present();
      modal.onDidDismiss(data =>{
        if(data != undefined){
          this.arrayItem.push(data);
          console.log("addsession", this.arrayItem);
          // for(let i = 0; i <= this.arrayItem.length; i++){
          //   console.log(this.arrayItem[i][0]);
          // }
        }else{
          
        }
      });
      this.utility.finishLoding();
   
      
  }*/
  getProductTop30(oSearch){
    this.utility.presentLoading();
    this.productServ.GetProductTop30(this.oClient, oSearch).then((res)=>{
      this.data_product = res;
      console.log(this.data_product);
      this.initializeItems();
      this.utility.finishLoding();     
    })
  }
  SaveSaleOrder(){
    if(this.arrayItem.length <= 0)
    this.utility.Alert("Warning","กรุณาเพิ่มรายการสินค้า");
    else
    for(let i=0; i<this.arrayItem.length; i++){
     
      if(this.arrayItem[i]["2"] <= 0){
        alert("Not Zero")
      }else{
        this.viewCtrl.dismiss(this.arrayItem);
        }
    }
   
    
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  doListProductModal(){
    this.utility.presentLoading();
    let modal = this.modalCtrl.create("ListProductModalPage",{ arrayItem: this.arrayItem })
    modal.present();
    modal.onDidDismiss(data =>{
      if(data != undefined){
        // this.arrayItem.push(data);
        // console.log("addsession", this.arrayItem);
        // for(let i = 0; i <= this.arrayItem.length; i++){
        //   console.log(this.arrayItem[i][0]);
        // }
      }else{
        
      }
    });
    this.utility.finishLoding();
  }

  
}
