import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, ViewController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Utility } from '../../../../helper/utility';
import { SaleOrderService } from '../../../../services/saleorderservice';
@IonicPage(
  {name:'ProductModalPage',
  segment: 'ProductModal'}
)

@Component({
  selector: 'page-productmodal',
  templateUrl: 'productmodal.html'
})
export class ProductModalPage {

  oClient:string = "001";
  oUsername:string = "";
  oItem_no:string = "";
  oDescription:string = "";
  oCustomer:string = "";

  oParamCode:any;
  oUOM:any;
  oZone:any;
  oUnit:any;
  oCheckDiscount:boolean = false;

  oAvailable:any;
  oFree:any;
  oUomQty:string = "";
  oPerCount:any;
  oUomSale:string = "";
  oQty:string = "";
  oPrice:string = "";
  oDiscount:string = "";
  oRemark:string = "";

  item: any;
  data_customerparam:any;
  data_productuom:any;
  data_productdefault:any;
  data_productcolor:any;
  data_lastsale:any;
  data_productparam:any;
  data_zone:any;
  data_productstock:any;

  data_return:any = [];
  arrayItem:any = [];
  constructor(public navCtrl: NavController, private modalCtrl: ModalController, public viewCtrl: ViewController, private utility: Utility, public navParams: NavParams
    , private storage: Storage, private saleorderServ: SaleOrderService) {
      this.storage.get('_userId').then((res) => {
        this.oUsername = res;   
      });
      this.item = navParams.get('item');
      this.oCustomer = navParams.get('oCustomer');

      this.oItem_no = this.item.item_no;
      this.oDescription = this.item.description;    
  }
  ionViewWillEnter(){
    this.doGetProductUom();
    this.doGetProductDefault();
    this.doGetProductColor();
    this.doGetLastSale();
    this.doGetProductParam();
    this.doGetZone();
  }
  ionViewDidEnter(){
    this.doGetProductStock(this.data_zone["0"].Zone, this.data_productuom["0"].item_packing);
  }
  doConfirm(oItem_no, oZone, oQty, oUOM, oParamCode, oPrice, oDiscount, oCheckDiscount, oRemark){
    this.data_return.push(oItem_no["0"]);
    this.data_return.push(oZone);
    this.data_return.push(oQty);
    this.data_return.push(oUOM);
    this.data_return.push(oParamCode);
    this.data_return.push(oPrice);
    this.data_return.push(oDiscount);
    this.data_return.push(oCheckDiscount);
    this.data_return.push(oRemark);

    console.log(this.data_return);
    this.viewCtrl.dismiss(this.data_return);
  }
  doGetProductUom(){
    this.saleorderServ.GetProductUom(this.oClient, this.item.item_no).then((res)=>{
      this.data_productuom = res;
      console.log(this.data_productuom); 
      this.oUOM = this.data_productuom["0"].item_packing["0"];
    })
  }
  doGetProductDefault(){
    this.saleorderServ.GetProductDefault(this.oClient, this.item.item_no).then((res)=>{
      this.data_productdefault = res;
      console.log(this.data_productdefault);
      
    })
  }
  doGetProductColor(){
    this.saleorderServ.GetProductColor(this.oClient, this.item.item_no).then((res)=>{
      this.data_productcolor = res;
      console.log(this.data_productcolor);
      
    })
  }
  doGetLastSale(){
    this.saleorderServ.GetLastSale(this.oClient, this.item.item_no, this.oCustomer).then((res)=>{
      this.data_lastsale = res;
      console.log("Last Sale",this.data_lastsale);
      if(this.data_lastsale.length <= 0){

      }else{
        // this.oPerCount = this.data_lastsale["0"].ราคาขายต่อหน่วย;
        this.oUomSale = this.data_lastsale["0"].หน่วยขาย;

        var percount = +this.data_lastsale["0"].ราคาขายต่อหน่วย;
        this.oPerCount = percount.toFixed();
      }
    })
  }
  doGetProductParam(){
    this.saleorderServ.GetProductParam("PRODUCT_RATE").then((res)=>{
      this.data_productparam = res;
      console.log(this.data_productparam);
      this.oParamCode = this.data_productparam["4"].param_code["0"];
      
    })
  }
  doGetZone(){
    this.saleorderServ.GetZone(this.oUsername, "").then((res)=>{
      this.data_zone = res;
      console.log(this.data_zone);
      this.oZone = this.data_zone["0"].Zone["0"];
      
    })
  }
  doGetProductStock(oZone, oItemPacking){
    this.saleorderServ.GetProductStock(this.oClient, this.oItem_no, "", "", "", "", "", "", "", oZone, oItemPacking, "", "", "", "", "").then((res)=>{
      this.data_productstock = res;
      console.log(this.data_productstock);
      if(this.data_productstock <= 0){

      }else{
        // this.oAvailable = this.data_productstock["0"].qty_avail;
        // this.oFree = this.data_productstock["0"].qty_free;
        this.oUomQty = this.data_productstock["0"].uom;

        var available = +this.data_productstock["0"].qty_avail;
        var free = +this.data_productstock["0"].qty_free;        
        var price = +this.data_productstock["0"].unit_price;

        this.oAvailable = available.toFixed();
        this.oFree = free.toFixed();
        this.oPrice = price.toFixed();
      }      
    })
  }
  doClear(){

  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
