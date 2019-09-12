import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ModalController,AlertController, ViewController, NavParams } from 'ionic-angular';
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
  oCustomer:any;
  oCustomer2:any;
  oOrder_no:string = "";
  oPrice1:string = "";
  oPrice2:string = "";
  oParamCode:any;
  oUOM:any;
  oZone:any;
  oUnit:any;
  oCheckDiscount:boolean = false;
  oTotalPrice: any = 0.00;
  oAvailable:any;
  oFree:any;
  oUomQty:string = "";
  oPerCount:any;
  oUomSale:string = "";
  oQty:string = "";
  oPrice:string = "";
  oDiscount:string = "";
  oRemark:string = "";
  oSalman:string = "";
  oLineNo:string = "";
  oCustomer_name:string = "";
  oAddress:string = "";
  oDiscountRate:any;
  oDiscountType:string = "";
  oDueDate:string = "";
  oAmount:string = "";
  oNetAmount:string = "";
  oDlvr_code:string = "";
  oVat:any;
  oType:string = "ADHOC";
  oDate:any = new Date().toISOString();
  oPayTerm:string = "";
  oSale:string = "";
  oDateSale:any = new Date().toISOString();
  oBuilding:any;
  oUserdefined:any;
  date_time:any;
  amount:any;
  amount5:any;
  amount2:any;
  item: any;
  item2:any;
  data_customerparam:any;
  data_productuom:any;
  data_productdefault:any;
  data_productcolor:any;
  data_lastsale:any;
  data_productparam:any;
  data_zone:any;
  data_productstock:any;
  data_price:any;
  data_item:any;
  data_saleorderdetail:any;
  data_addsaledetail:any;
  data_return:any = [];
  arrayItem:any = [];
  data_customerdelivery:any;
  data_addsaleorder:any;
  constructor(public alertCtrl :AlertController,public navCtrl: NavController, private modalCtrl: ModalController, public viewCtrl: ViewController, private utility: Utility, public navParams: NavParams
    , private storage: Storage, private saleorderServ: SaleOrderService) {


      this.storage.get('_userId').then((res) => {
        this.oUsername = res;  
        //console.log(this.oUsername);
         
      });

      this.item = navParams.get('item');
      this.item2 = navParams.get('data_order');
      
      this.oCustomer2 = navParams.get('oCustomer');
      if(this.oCustomer = navParams.get('oCustomer') != "7LINE"){
        this.oCustomer = "ALL"
        }else{
        this.oCustomer = navParams.get('oCustomer');
        }
      
      this.oOrder_no = navParams.get('oOrder_no');
      
      
      console.log("product",this.item);  
      console.log("order",this.item2);
      this.amount5 = parseInt(this.item2["0"].amount) -  parseInt(this.item.amount);
      
      console.log("amount5",this.amount5);
     
      
      this.oItem_no = this.item.item_no;
      console.log(this.oItem_no);
      
      this.oDescription = this.item.item_description; 
      this.amount2 = this.item.amount;

      this.oLineNo = this.item2["0"].oLineNo;
    this.oOrder_no = this.item2["0"].order_no;
    //this.oAmount = this.data_item.amount;
    this.oVat = this.item2["0"].vat_rate;
    this.oRemark = this.item2["0"].remarks;
    this.oDueDate = this.item2["0"].due_date;
    //this.oCustomer2 = this.item2.customer;
    this.oCustomer_name = this.item2["0"].customer_name;
    this.oBuilding = this.item2["0"].dlvr_bldg
    this.oAddress = this.item2["0"].dlvr_street
    this.oDiscountRate = this.item2["0"].discount_rate;
    this.oDiscountType = this.item2["0"].discount_type;
    this.date_time =this.item2["0"].create_date;
    this.oSalman = this.item2["0"].salesman_code;
    console.log("osale",this.oSalman);
    
      //this.oQty = this.item.qty;   
      //this.oRemark = this.item.remarks
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
    this.doGetProductStock("",this.data_productuom["0"].item_packing);
  }

  doConfirm(oItem_no, oZone, oQty, oUOM, oParamCode, oPrice, oDiscount, oRemark, oUnit){
    
      var uom = parseFloat(oQty);
      var price = parseFloat(oUnit);
      console.log(price);
      var total = price * uom;
      console.log(total);
      console.log(this.amount5);
      
      /*if(total < this.amount2){
      this.amount = parseInt(this.item2.amount["0"]) - total;
      }else if(total > this.amount2){
      this.amount = parseInt(this.item2.amount["0"]) + total;
      }*/
      //if(total < this.amount2 || total > this.amount2){
        this.amount = this.amount5 + total;
     /* }else if(total = this.amount2){
        this.amount = this.amount2;
      }else{

      }*/
      console.log("amount",this.amount);

      this.oTotalPrice = +this.oTotalPrice + total;
      console.log("sum",this.oTotalPrice);
      
    if(oUnit != this.oPrice2){
      this.oUserdefined = "ไม่ประกอบสินค้า"
    }else{
      this.oUserdefined = "ประกอบสินค้า"
    }
    /*
    if(oUnit = this.oPrice2){
      oRemark = "ประกอบ"
    }else{

    }*/
 

  
    if(oUnit == undefined || oUnit == "0"){
      this.utility.Alert("Warning","กรุณาเลือกประเภทสินค้าในการจัดส่ง");
    }else if(oQty == undefined || oQty == "" || oQty <= 0){
      this.utility.Alert("Warning","กรุณาเพิ่มจำนวนสินค้าในการจัดส่ง");
    }else if(oQty > this.oAvailable){
      this.utility.Alert("Warning","จำนวนสินค้าเกินจำนวนในสต๊อก");
    }else{
      this.SaveSaleOrder()
      this.saleorderServ.AddOrdersDetails(this.oClient, this.oUsername, this.oOrder_no, "", this.item.line_no, oItem_no
      , "", oUOM, oQty, oUnit, this.oTotalPrice, this.oTotalPrice, oRemark, "", "", "", "", "", "", ""
      , oZone, "", this.oCustomer2, "", "", this.oUserdefined).then((res)=>{  
        this.data_addsaledetail = res;
        console.log(this.data_addsaledetail);
       /* if(this.data_addsaledetail["0"].sqlstatus != "0"){
          this.utility.Alert(this.data_addsaledetail["0"].sqlmsg, this.data_addsaledetail["0"].sqlmsg2);
        }else{
          this.utility.Alert(this.data_addsaledetail["0"].sqlmsg, this.data_addsaledetail["0"].sqlmsg2);
        }*/
      })
      this.viewCtrl.dismiss();
    }
  }
  
  SaveSaleOrder(){
 
        this.saleorderServ.GetCustomerDelivery(this.oClient,this.oCustomer).then((res)=>{
          this.data_customerdelivery = res;
          console.log(this.data_customerdelivery);
    
    
          // if(this.data_customerdelivery.length <= 0){
          //   this.utility.Alert("Warning", "ไม่พบ Customer Code");
          // }else{
            
            var Order_date = this.oDate.toString();
            var DueDate = this.oDateSale.toString();

            this.saleorderServ.AddSalesOrders(this.oClient, "01", "001", this.oOrder_no, this.oType, this.oCustomer2, this.oCustomer_name, Order_date, "0.00", "", "", ""
              , "", "", "", "", "", "", "", Order_date, "", this.oRemark, "", ""
              , "", DueDate, "", "",this.oAddress, this.oBuilding, "", "", ""
              , "", "", DueDate, this.oUsername, this.oPayTerm, this.oSalman, this.oSalman, "", "", "", "", Order_date
              , "", DueDate,this.amount,this.amount).then((res)=>{
              this.data_addsaleorder = res;
              console.log(this.data_addsaleorder);
              
              if(this.data_addsaleorder["0"].sqlstatus < "0"){
                this.utility.Alert("Winning", this.data_addsaleorder["0"].sqlmsg);
              }else{
              
                let alert = this.alertCtrl.create({
                  title: this.data_addsaleorder["0"].order_no,
                  subTitle: this.data_addsaleorder["0"].sqlmsg,
                  buttons: [ {
                      text: 'ตกลง',
                      handler: data => {
                        this.dismiss();
                      }
                    }]
                });
                alert.present();
              }
            })
          // }
        })
      
    
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
      console.log(this.data_zone);
      this.oZone = this.data_zone["0"].Zone["0"];
      
    })
  }
  doGetProductStock(oZone, oItemPacking){
    this.saleorderServ.GetProductStock(this.oClient,this.oCustomer, this.oItem_no, "", "", "", "", "", "", "", oZone, oItemPacking, "", "", "", "", "").then((res)=>{
      this.data_productstock = res;
      console.log("price",this.data_productstock);
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
        //console.log(this.oAvailable);
        
        this.oFree = free.toFixed();
        var price1 = +this.data_productstock["0"].price_assemble_no
        var price2 = +this.data_productstock["0"].price_assemble
        this.oPrice1 = price1.toFixed(2);
        this.oPrice2 = price2.toFixed(2);
        console.log(this.oPrice1);
        console.log(this.oPrice2);
        //this.oPrice = this.data_productstock["0"].unit_price["0"];
        // this.oPrice = price.toFixed();      
      }   
      /*if(this.oQty <= "0"){
        this.utility.Alert("Warning","กรุณาเพิ่มจำนวนสินค้าในการจัดส่ง");
      }else if(this.oQty > this.data_productstock["0"].qty_avail){
        this.utility.Alert("Warning","จำนวนสินค้าเกินจำนวนในสต๊อก");
      }*/   
    })
  }
  doClear(){
    this.oQty = "";
    this.oUnit = "";
    this.oRemark = "";
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
