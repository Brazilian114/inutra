import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Content } 
from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Utility } from '../../../helper/utility';
import { ProductService } from '../../../services/productservice';
import { CustomerService } from '../../../services/customerservice';

@IonicPage(
  {name:'ProductDetailsPage',
  segment: 'ProductDetails'}
)

@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html'
})
export class ProductDetailsPage {
  @ViewChild(Content) pageTop: Content;
  public pageScroller(){
    this.pageTop.scrollToTop();
  }

  data_item:any;
  data_productuom:any;
  data_productstock:any;

  oQty_Avail:any;
  oUom:string = "";
  oPrice:string = "";

  oItem_Qty:string = "";
  oItem_Uom:string = "";
  num1:any;
  num2:any;
  oAmount1:number;
  oAmount2:number;
  oClient:string = "7LINE";
  oItemNo:string = ""; 
  oGrade:string = "001"; 
  oQty_Free:string = ""; 
  oLotNo:string = ""; 
  oBatchNo:string = ""; 
  oItemSize:string = ""; 
  oItemColor:string = "";
  oItemClass:string = "";
  oWarehouse:string = "";
  oZone:string = "";
  oQoh:string = "";
  qty:any;
  oItemPacking:string = "";
  oExpiryDate:string = "";
  oProdDate:string = ""; 
  oLocation:string = ""; 
  oPalletNo:string = "";
  oOiNo:string = "";
  constructor(public customerServ: CustomerService,public navCtrl: NavController, public navParams: NavParams, private utility: Utility, private storage: Storage, private productServ: ProductService) {
    this.data_item = navParams.get('item');
    console.log(this.data_item);
    if(this.data_item.qty_avail == undefined || this.data_item.qty_avail == "")
    this.oQty_Avail = "-";
    else
    this.oQty_Avail = this.data_item.qty_avail;  

    if(this.data_item.uom == undefined || this.data_item.uom == "")
    this.oUom = "-";
    else
    this.oUom = this.data_item.uom
  }
  
  ionViewWillEnter(){
 
    //this.doGetProductUom();
    //this.doGetProductStock();
   
  }
/*  doGetProductUom(){
    
    this.productServ.GetProductUom(this.oClient, this.data_item.item_no).then((res)=>{
      this.data_productuom = res;
      console.log(this.data_productuom);  
       if(this.data_productuom.length <= 0){
         this.oItem_Qty = "0.00";
         this.oItem_Uom = "PCS";
      }else{
        this.oItem_Qty = this.data_productuom["0"].item_qty;
        this.oItem_Uom = this.data_productuom["0"].item_uom;
        
      
    })
  }}*/ 
  /*
  doGetProductStock(){
   this.utility.presentLoading();
    this.productServ.GetProductStock(this.oClient,"ALL", this.data_item.item_no,"001", this.oLotNo, this.oBatchNo, this.oItemSize
      , this.oItemColor, this.oItemClass, this.oWarehouse, this.oZone, this.oItemPacking, this.oExpiryDate, this.oProdDate
      , this.oLocation, this.oPalletNo, this.oOiNo).then((res)=>{
      this.data_productstock = res;
      this.utility.finishLoding();
      console.log(this.data_productstock);
   
      if(this.data_productstock.length <= 0){
        this.oQty_Avail = 0
        this.oUom = "PCS";
        this.oPrice = "0.00";
        this.oQoh = "0.00";
      }else{
        
        var qty_avail = +this.data_productstock["0"].qty_avail["0"]
        this.qty = qty_avail.toFixed(0);
        this.oQty_Avail = this.qty;
        var qty_free = +this.data_productstock["0"].qty_free
        this.oQty_Free = qty_free.toFixed(0);
        this.oUom = this.data_productstock["0"].uom;
        this.oPrice = this.data_productstock["0"].unit_price;
        this.oQoh = this.data_productstock["0"].qoh;
        
      }
      if(this.data_productstock["0"].price == undefined || this.data_productstock["0"].price_2 == undefined ){
        this.oAmount1 = 0
        this.oAmount2 = 0
      }else{
        
        var price1 = +this.data_productstock["0"].price["0"]
        var price2 = +this.data_productstock["0"].price_2["0"]
        this.num1 = price1.toFixed(2);
        this.num2 = price2.toFixed(2);
        this.oAmount1 = this.num1
        this.oAmount2 = this.num2;
      
      }  
      
    })
    
    }*/
}
