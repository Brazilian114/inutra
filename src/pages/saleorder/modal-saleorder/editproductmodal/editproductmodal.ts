import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ModalController, ViewController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Utility } from '../../../../helper/utility';
import { SaleOrderService } from '../../../../services/saleorderservice';
@IonicPage(
  {name:'EditProductModalPage',
  segment: 'EditProductModal'}
)

@Component({
  selector: 'page-editproductmodal',
  templateUrl: 'editproductmodal.html'
})
export class EditProductModalPage {
  @ViewChild('focusQty') InputQty;

  oClient:string = "7LINE";
  oUsername:string = "";
  oItem_no:string = "";
  oDescription:string = "";
  oCustomer:string = "";
  oOrder_no:string = "";

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
  data_price:any;

  data_addsaledetail:any;
  data_return:any = [];
  arrayItem:any = [];
  constructor(public navCtrl: NavController, private modalCtrl: ModalController, public viewCtrl: ViewController, private utility: Utility, public navParams: NavParams
    , private storage: Storage, private saleorderServ: SaleOrderService) {
      this.storage.get('_userId').then((res) => {
        this.oUsername = res;   
      });
      this.item = navParams.get('item');
      this.oCustomer = navParams.get('oCustomer');
      this.oOrder_no = navParams.get('oOrder_no');

      console.log(this.item);     
      
      this.oItem_no = this.item.item_no;
      this.oDescription = this.item.description;    
      setTimeout(()=>{        
        this.InputQty.setFocus();
      },1000);
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
  doConfirm(oItem_no, oZone, oQty, oUOM, oParamCode, oPrice, oDiscount, oRemark, oUnit){
    if(oUnit == undefined || oUnit == "0"){
      this.utility.Alert("Warning","กรุณาเลือกประเภทสินค้าในการจัดส่ง");
    }else{
      this.saleorderServ.AddOrdersDetails(this.oClient, this.oUsername, this.oOrder_no, "", this.item.line_no, oItem_no
      , "", oUOM, oQty, "", "", "", oRemark, oUnit, "", "", "", "", "", ""
      , oZone, "", this.oCustomer, "", "").then((res)=>{
        this.data_addsaledetail = res;
        console.log(this.data_addsaledetail);
        if(this.data_addsaledetail["0"].sqlstatus != "0"){
          this.utility.Alert(this.data_addsaledetail["0"].sqlmsg, this.data_addsaledetail["0"].sqlmsg2);
        }else{
          this.utility.Alert(this.data_addsaledetail["0"].sqlmsg, this.data_addsaledetail["0"].sqlmsg2);
        }
      })
      this.viewCtrl.dismiss();
    }
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

        this.oPrice = this.data_productstock["0"].unit_price["0"];
        // this.oPrice = price.toFixed();      
      }      
    })
  }
  doClear(){

  }
  doAddOrdersDetailsAsync(value) {
    return new Promise((resolve) => {
      setTimeout(() => {

        resolve(value);
      }, Math.floor(Math.random() * 1000));
    });
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
