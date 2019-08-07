import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Utility } from '../../../helper/utility';
import { SaleOrderService } from '../../../services/saleorderservice';
@IonicPage(
  {name:'AddSaleOrderPage',
  segment: 'AddSaleOrder'}
)

@Component({
  selector: 'page-addsaleorder',
  templateUrl: 'addsaleorder.html',
  providers: [SaleOrderService]
})
export class AddSaleOrderPage {
  hideMe:any = true;

  oUsername:string = "";
  oUserId:string = "";
  oUserGroup:string = "";
  
  oClient:string = "7LINE";
  oCustomer:string = "";
  oCustomer_name:string = "";
  oPayment_term:string = "";
  oType:string = "ADHOC";
  oDate:any = new Date().toISOString();
  oPayTerm:string = "";
  oSale:string = "";
  oDateSale:any = new Date().toISOString();
  oTotalPrice: any = 0.00;
  oStreet:string="";

  discount:any = 0.0;
  total_price:any = 0.0;
  pricePlusTax:any = 0.0;
  real_discount:any = 0.0;
  tax:any = 1.0;

  oVat1:string = "";
  oDiscount1:string = "";
  oCheckDiscount1:any = false;
  oDiscountType1:string = "";

  oVat2:string = "";
  oDiscount2:string = "";
  oCheckDiscount2:any = false;
  oDiscountType2:string = "";

  oVat3:string = "";
  oDiscount3:string = "";
  oCheckDiscount3:any = false;
  oDiscountType3:string = "";

  oVat_id:string;
  oDescription:string;
  oVat:string;
  oAddress:string = "";
  oBuilding:string = "";
  oRemark:string = "";

  data_customerparam:any;
  data_productparampayterm:any;
  data_productVat:any;
  data_productparamsale:any;

  data_customerdelivery:any;
  data_addsaleorder:any;
  data_addsaledetail:any;

  arrayItem:any = [];

  constructor(public navCtrl: NavController, private utility: Utility, public navParams: NavParams, public alertCtrl: AlertController
    , private storage: Storage, private saleorderServ: SaleOrderService, private modalCtrl: ModalController, public viewCtrl: ViewController) {
      this.doGetStorage();
     
      
  }
  ionViewWillEnter(){
    this.utility.presentLoading();
    this.doProductParamPayTerm();
    this.doGetVat();
    //this.doProductParamSale();
    this.utility.finishLoding();
  }
  doCustomerModal(){
    this.utility.presentLoading();
    let modal = this.modalCtrl.create("CustomerModalPage")
    modal.present();
    modal.onDidDismiss(data =>{
      console.log(data);
      
      
      if(data != undefined){
       this.oCustomer = data.customer;
       this.oCustomer_name = data.customer_name;
       this.oPayTerm = data.payment_term;
       this.oVat = data.vat;
       this.oAddress = data.street;
       this.oBuilding = data.building;
     
      
       if(this.oVat == "" || this.oVat == undefined){

          this.doGetVat();

       }
      }else{
       
      }
    });
    this.utility.finishLoding();
    //console.log(this.oVat1);
    
    
  }
  
  
  doShowHide(){
    if(this.hideMe == false){
      this.hideMe = true;
    }else{
      this.hideMe = false;
    }
  }
  
  doProductParamPayTerm(){
   
    this.saleorderServ.GetProductParam("PAY-TERM").then((res)=>{
      this.data_productparampayterm = res;
      if(this.oPayTerm.length <= 0){
        this.oPayTerm = "";
      }else{
        //this.oVat = this.data_productVat["2"].vat;
      console.log(this.data_productparampayterm);
    }
    })
  
  }
  
  doGetVat(){
    
    this.saleorderServ.GetVatDetails().then((res)=>{
      this.data_productVat = res;
     if(this.oPayTerm.length <= 0){
        this.oPayTerm = "";
     }else{
      this.oVat = this.data_productVat["2"].vat_id;
      //console.log(this.oVat);
      console.log(this.data_productVat);
      
     }
    })
    
  }
 
  /*
  doProductParamSale(){
    this.saleorderServ.GetProductParam("SALES CODE").then((res)=>{
      this.data_productparamsale = res;
      this.oSale = this.data_productparamsale["0"].param_code;
      console.log(this.data_productparamsale);
    })
  }*/
  doProductModal(){
    if(this.oCustomer == "" || this.oCustomer == undefined){
      this.utility.Alert("Warning","กรุณาเลือก Customer ก่อน");
    }else{
      this.utility.presentLoading();
      let modal = this.modalCtrl.create("AddProductPage", { oCustomer: this.oCustomer, arrayItem: this.arrayItem })
      modal.present();
      modal.onDidDismiss(data =>{
        if(data != undefined){
          this.arrayItem = data;
          console.log("addsessionAddsale", this.arrayItem);

          for(let i=0; i<this.arrayItem.length; i++){
            var uom = +this.arrayItem[i]["2"];
            var price = parseFloat(this.arrayItem[i]["5"]);
            console.log(price);
            var total = price * uom;
            console.log(total);
            
            this.oTotalPrice = +this.oTotalPrice + total;
            console.log(this.oTotalPrice);
            
          }
        }else{

        }
      });
      this.utility.finishLoding();
    }
  }
  
  removeItems(item){
    this.arrayItem.forEach((element, idex) => {
      if (element == item){
        this.arrayItem.splice(idex, 1);
      }
      
    });
  }


  doGetCustomerDelivery(){
    this.saleorderServ.GetCustomerDelivery(this.oClient,this.oCustomer).then((res)=>{
      this.data_customerdelivery = res;
      console.log(this.data_customerdelivery);
    })
  } 
  doChangeTypeVat1(oVat1){
    this.oVat1 = oVat1;
  }
  doChangeTypeVat2(oVat2){
    this.oVat2 = oVat2;
  }
  doChangeTypeVat3(oVat3){
    this.oVat3 = oVat3;
  }
  doChangeTextDiscount1(oDiscount1){
    this.oDiscount1 = oDiscount1;
  }
  doChangeTextDiscount2(oDiscount2){
    this.oDiscount2 = oDiscount2;
  }
  doChangeTextDiscount3(oDiscount3){
    this.oDiscount3 = oDiscount3;
  }
  doChangeDiscount1(oCheckDiscount1){
    this.oCheckDiscount1 = oCheckDiscount1;
    if(oCheckDiscount1 == true){
      this.oDiscountType1 = "percent"
    }else{
      this.oDiscountType1 = "net"
    }
  }
  doChangeDiscount2(oCheckDiscount2){
    this.oCheckDiscount2 = oCheckDiscount2;
    if(oCheckDiscount2 == true){
      this.oDiscountType2 = "percent"
    }else{
      this.oDiscountType2 = "net"
    }
  }
  doChangeDiscount3(oCheckDiscount3){
    this.oCheckDiscount3 = oCheckDiscount3;
    if(oCheckDiscount3 == true){
      this.oDiscountType3 = "percent"
    }else{
      this.oDiscountType3 = "net"
    }
  }
  doGetStorage(){
    this.storage.get('_user').then((res)=>{
      this.oUsername = res;
    })  
    this.storage.get('_userId').then((res)=>{
      this.oUserId = res;
      //console.log(this.oUserId["0"]);
    })  
    this.storage.get('_userGroup').then((res)=>{
      this.oUserGroup = res;
    })  
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

  doAddOrdersDetailsAsync(value) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.saleorderServ.AddOrdersDetails(this.oClient, this.oUsername, this.data_addsaleorder["0"].order_no, "", 0, this.arrayItem[value]["0"]
        , "", this.arrayItem[value]["3"], this.arrayItem[value]["2"], "", "", "", this.arrayItem[value]["7"], "", "", "", "", "", "", ""
        , this.arrayItem[value]["1"], "", this.oCustomer, "", "", this.arrayItem[value]["8"]).then((res)=>{
          this.data_addsaledetail = res;
          console.log(this.data_addsaledetail);
          if(this.data_addsaledetail["0"].sqlstatus > 0){
            this.utility.Alert("Order Winning"+this.data_addsaledetail["0"].sqlmsg, this.data_addsaledetail["0"].sqlmsg2);
          }else{

          }
        })
        resolve(value);
      }, Math.floor(Math.random() * 1000));
    });
   
  }
  SaveSaleOrder(oCustomer_name, oDate, oVat, oDiscount1, oDateSale, oRemark, oType, oPayTerm, oUserId){
    if(this.oCustomer == "" || this.oCustomer == undefined){
      this.utility.Alert("Warning","กรุณาเลือก Customer ก่อน");
    }else if(oCustomer_name == "" || oCustomer_name == undefined){
      this.utility.Alert("Warning","กรุณาเลือก Customer ก่อน");
    }else if(oType == "" || oType == undefined){
      this.utility.Alert("Warning","กรุณาเลือก Type");
    }else if(oPayTerm == "" || oPayTerm == undefined){
      this.utility.Alert("Warning","กรุณาเลือกการชำระเงิน");
    }else if(oVat == "" || oVat == undefined){
      this.utility.Alert("Warning","กรุณาเลือก Vat");
    }else{
      if(this.arrayItem.length <= 0){
        this.utility.Alert("Warning","กรุณาเลือกสินค้าก่อน");
      }else{
        this.saleorderServ.GetCustomerDelivery(this.oClient,this.oCustomer).then((res)=>{
          this.data_customerdelivery = res;
          console.log(this.data_customerdelivery);
    
    
          // if(this.data_customerdelivery.length <= 0){
          //   this.utility.Alert("Warning", "ไม่พบ Customer Code");
          // }else{

            var Order_date = oDate.toString();
            var DueDate = oDateSale.toString();
           
            
    
            this.saleorderServ.AddSalesOrders(this.oClient, "01", "001", "", oType, this.oCustomer, oCustomer_name, Order_date, oVat, "", "", ""
              , "", "", "", "", "", "", "", Order_date, "", oRemark, "", ""
              , "", DueDate, "", "",this.oAddress, this.oBuilding, "", "", ""
              , "", "", DueDate, this.oUsername, oPayTerm, this.oUserId["0"], this.oUserId["0"], "", "", "", "", Order_date
              , "", DueDate).then((res)=>{
              this.data_addsaleorder = res;
              console.log(this.data_addsaleorder);
              
              if(this.data_addsaleorder["0"].sqlstatus > 0){
                this.utility.Alert("Winning", this.data_addsaleorder["0"].sqlmsg);
              }else{
                for(let i=0; i < this.arrayItem.length; i++){
                  this.doAddOrdersDetailsAsync(i) 
                }
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
    }
  }
  // test() {
  //   let i;
  //   let promises = [];
    
  //   for (i = 0; i < 5; ++i) {
  //     promises.push(this.doSomethingAsync(i));
  //   }
    
  //   Promise.all(promises)
  //       .then((results) => {
  //         console.log("All done", results);
  //       })
  //       .catch((e) => {
  //           // Handle errors here
  //       });
  // }
}

