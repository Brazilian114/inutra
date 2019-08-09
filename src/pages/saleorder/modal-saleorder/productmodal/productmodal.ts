import { Component, ViewChild } from '@angular/core';
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
  @ViewChild('focusQty') InputQty;

  oClient:string = "7LINE";
  oUsername:string = "";
  oItem_no:string = "";
  oDescription:string = "";
  oCustomer:any;

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
  oPrice1:any;
  oPrice2:any;
  oDiscount:string = "";
  oRemark:string = "";
  oGrade:string="001";
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

  data_return:any = [];
  arrayItem:any = [];
  constructor(public navCtrl: NavController, private modalCtrl: ModalController, public viewCtrl: ViewController, private utility: Utility, public navParams: NavParams
    , private storage: Storage, private saleorderServ: SaleOrderService) {
      
      

      
        if(this.oCustomer = navParams.get('oCustomer') != "7LINE"){
        this.oCustomer = "ALL"
        }else{
        this.oCustomer = navParams.get('oCustomer');
        }
      this.storage.get('_userId').then((res) => {
        this.oUsername = res;   
      });
      this.item = navParams.get('item');
      //this.oCustomer = navParams.get('oCustomer');

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
    this.doGetProductStock("", this.data_productuom["0"].item_packing);
  }
  doConfirm(oItem_no, oZone, oQty, oUOM, oParamCode, oPrice, oDiscount, oRemark, oUnit){

    

    if(oUnit == undefined || oUnit == "0"){
      this.utility.Alert("Warning","กรุณาเลือกประเภทสินค้าในการจัดส่ง");
    }else if(oQty == undefined || oQty == "" || oQty <= 0){
      this.utility.Alert("Warning","กรุณาเพิ่มจำนวนสินค้าในการจัดส่ง");
    }else if(oQty > this.oAvailable){
      this.utility.Alert("Warning","จำนวนสินค้าเกินจำนวนในสต็อก");
    }else{
      this.data_return.push(oItem_no["0"]);
      this.data_return.push(oZone);
      this.data_return.push(oQty);
      this.data_return.push(oUOM);
      this.data_return.push(oParamCode);
      this.data_return.push(oPrice);
      this.data_return.push(oDiscount);
      this.data_return.push(oRemark);
      this.data_return.push(oUnit);
      this.data_return.push(this.oDescription.toString());

      console.log("return",this.data_return);
      this.viewCtrl.dismiss(this.data_return);
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
        this.oPerCount = 0;
        
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
      console.log("zone",this.data_zone);
      this.oZone = this.data_zone["0"].Zone["0"];
      
    })
  }
  doGetProductStock(oZone, oItemPacking){
    this.saleorderServ.GetProductStock(this.oClient,this.oCustomer, this.oItem_no, this.oGrade, "", "", "", "", "", "", oZone, oItemPacking, "", "", "", "", "").then((res)=>{
      this.data_productstock = res;
      console.log(this.data_productstock);
      if(this.data_productstock["0"].price_assemble == undefined){
        this.oPrice1 =0;
        this.oPrice2 =0;
      }else{
        var price1 = +this.data_productstock["0"].price_assemble_no
        var price2 = +this.data_productstock["0"].price_assemble
        this.oPrice1 = price1.toFixed(2);
        this.oPrice2 = price2.toFixed(2);
      }
      
      if(this.data_productstock.length <= 0){
        this.oAvailable = 0;
        this.oFree = 0;
       

      }else{
        // this.oAvailable = this.data_productstock["0"].qty_avail;
        // this.oFree = this.data_productstock["0"].qty_free;
        this.oUomQty = this.data_productstock["0"].uom;

        //var available = +this.data_productstock["0"].qty_avail;
        var free = +this.data_productstock["0"].qty_free;        
        //var price = +this.data_productstock["0"].unit_price;
        
        this.oAvailable = parseInt(this.data_productstock["0"].qty_avail);
        this.oFree = free.toFixed();

        //this.oPrice = this.data_productstock["0"].unit_price;
      
        // this.oPrice = price.toFixed();      
      }      
    })
  }
  doClear(){
      this.oQty = "";
      this.oUnit = "";
      this.oRemark = "";
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  
}
