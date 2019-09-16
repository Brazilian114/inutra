import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ViewController,Content,AlertController, ModalController, NavParams, List } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Utility } from '../../../helper/utility';

import { SaleOrderService } from '../../../services/saleorderservice';
import { ProductService } from '../../../services/productservice';
/**
 * Generated class for the AddsaleorderdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage(
  {name:'AddSaleOrderDetailPage',
  segment: 'AddSaleOrderDetail'}
)

@Component({
  selector: 'page-addsaleorderdetail',
  templateUrl: 'addsaleorderdetail.html',
})
export class AddsaleorderdetailPage {
  @ViewChild(Content) pageTop: Content;
  public pageScroller(){
    this.pageTop.scrollToTop();
  }
  public sum_price2: any = [];
  oUsername:string = "";
  oUserId:string = "";
  oUserGroup:string = "";
  data_saleorderdetail:any;
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
  oTotalPrice2: any = 0.00;
  oStreet:string="";
  sum:any;
  amount:any;
  discount:any = 0.0;
  total_price:any = 0.0;
  pricePlusTax:any = 0.0;
  real_discount:any = 0.0;
  tax:any = 1.0;

  oVat1:string = "";
  oDiscount1:string = "";
  oCheckDiscount1:any = false;
  oDiscountType1:string = "";
  oSearch:string = "";
  oVat2:string = "";
  oDiscount2:string = "";
  oCheckDiscount2:any = false;
  oDiscountType2:string = "";
  oAmount:any;
  oVat3:string = "";
  oDiscount3:string = "";
  oCheckDiscount3:any = false;
  oDiscountType3:string = "";
  oSaleManCode:string="";
  oVat_id:string;
  oDescription:string;
  oVat:string;
  oAddress:string = "";
  oBuilding:string = "";
  oRemarks:string = "";
  oDueDate:string = "";
  oOrder_no:string = "";
  oDiscountType:string="";
  data_customerparam:any;
  data_productparampayterm:any;
  data_productVat:any;
  data_productparamsale:any;
  data_customerdelivery:any;
  data_addsaleorder:any;
  data_addsaledetail:any;
  data_item:any;
  date_time:any;
  items:any;
  arrayItem:any = [];
  data_product:any;
  constructor( private storage: Storage,public alertCtrl: AlertController,public navCtrl: NavController, public viewCtrl: ViewController, public modalCtrl: ModalController
    , private utility: Utility, private saleorderServ: SaleOrderService, private productServ: ProductService, public navParams: NavParams) {
   
      this.data_item = navParams.get('item');
      console.log(this.data_item);
      
      this.oOrder_no = this.data_item["0"].order_no;
      this.oSaleManCode = this.data_item["0"].salesman_code;
      //this.oDueDate = this.data_item.due_date;
      this.oRemarks = this.data_item["0"].remarks;
      this.oCustomer = this.data_item["0"].customer;
      this.oCustomer_name = this.data_item["0"].customer_name;
     // this.oAddress = this.data_item.dlvr_street + " " + this.data_item.dlvr_bldg;
    //this.oDiscountRate = this.data_item.discount_rate;
      this.oType = this.data_item["0"].order_type;
      this.oDiscountType = this.data_item["0"].discount_type;
     // this.date_time = this.data_item.create_date
      //this.oDate = this.data_item.create_date
      this.oVat = this.data_item["0"].vat_rate;
      this.oBuilding = this.data_item["0"].dlvr_bldg;
      this.oAddress = this.data_item["0"].dlvr_street;
      this.oUsername = this.data_item["0"].created_by;
      this.oPayTerm = this.data_item["0"].payment_term;
      this.oOrder_no = this.data_item["0"].order_no;
      this.oAmount = parseInt(this.data_item["0"].amount);
     
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AddsaleorderdetailPage');
  }
  ionViewWillEnter(){
    this.getProductTop30(this.oSearch)
    this.doGetStorage();
    //this.doGetProduct();
    //this.getProductByKeyword(this.oSearch)
   
  }
  initializeItems() {
    this.items = this.data_product;   
  }/*
  doGetProduct(){
    this.utility.presentLoading();
    this.saleorderServ.GetProduct(this.oClient).then((res)=>{
      this.data_product = res;
      
      console.log(this.data_product);
      this.utility.finishLoding();
    })
  }*/
  dismiss() {
  
      this.viewCtrl.dismiss();

   // this.viewCtrl.dismiss();
   /*
    this.saleorderServ.GetOrdersDetails(this.oClient, this.oUserId, this.oUserGroup, this.oOrder_no).then((res)=>{
      this.data_saleorderdetail = res;  
      this.viewCtrl.dismiss(this.data_saleorderdetail);
      //console.log(this.data_saleorderdetail);
      
    })*/

  }/*
  getProductByKeyword(oSearch){
    //this.utility.presentLoading();
    this.productServ.GetProductByKeyword(this.oClient, oSearch).then((res)=>{
      this.data_product = res;
      this.initializeItems();
      console.log(this.data_product); 
      //this.utility.finishLoding();    
    })
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
  doProductModal(item){
    this.utility.presentLoading();
    let modal = this.modalCtrl.create("ProductModalPage",{ item: item, oCustomer: this.oCustomer, arrayItem: this.arrayItem })
    modal.present();
    modal.onDidDismiss(data =>{
      if(data != undefined){
        this.arrayItem.push(data);
        console.log("addsession", this.arrayItem);

        let index = 0;
        for (let array of this.arrayItem) {
    
          index += parseInt(array["5"]);
          this.sum = index.toFixed(2);       
          } 
          console.log("sumAmount",this.sum);
          this.amount = this.oAmount + parseInt(this.sum)
          console.log("amount1",this.amount);
       
      }else{
        
      }
    });
    this.utility.finishLoding();
 
    
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
doGetStorage(){
  this.storage.get('_user').then((res)=>{
    this.oUsername = res;
  })  
  this.storage.get('_userId').then((res)=>{
    this.oUserId = res;
    console.log("userid",this.oUserId["0"]);
  })  
  this.storage.get('_userGroup').then((res)=>{
    this.oUserGroup = res;
  })  
}
doAddOrdersDetailsAsync(value) {
  console.log(value);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      this.saleorderServ.AddOrdersDetails(this.oClient, this.oUsername, this.oOrder_no, "", 0, this.arrayItem[value]["0"]
      , "", this.arrayItem[value]["3"], this.arrayItem[value]["2"],  this.arrayItem[value]["8"], this.arrayItem[value]["5"], this.arrayItem[value]["5"], this.arrayItem[value]["7"], "", "", "", "", "", "", ""
      , this.arrayItem[value]["1"], "", this.oCustomer, "", "", this.arrayItem[value]["10"]).then((res)=>{
        this.data_addsaledetail = res;
        console.log(this.data_addsaledetail);
        if(this.data_addsaledetail["0"].sqlstatus != "0"){
          this.utility.Alert(this.data_addsaledetail["0"].sqlmsg, this.data_addsaledetail["0"].sqlmsg2);
        }else{

        }
      })
      resolve(value);
    }, Math.floor(Math.random() * 3000));
  });
 
}
/*
doAddOrdersDetailsAsync(value) {
  console.log(value);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      this.saleorderServ.AddOrdersDetails(this.oClient, this.oUsername, this.oOrder_no, "", 0, this.arrayItem[value]["0"]
      , "", this.arrayItem[value]["3"], this.arrayItem[value]["2"],  this.arrayItem[value]["8"], this.arrayItem[value]["5"], this.arrayItem[value]["5"], this.arrayItem[value]["7"], "", "", "", "", "", "", ""
      , this.arrayItem[value]["1"], "", this.oCustomer, "", "", this.arrayItem[value]["10"]).then((res)=>{
        this.data_addsaledetail = res;
        console.log(this.data_addsaledetail);
        if(this.data_addsaledetail["0"].sqlstatus != "0"){
          this.utility.Alert(this.data_addsaledetail["0"].sqlmsg, this.data_addsaledetail["0"].sqlmsg2);
        }else{

        }
      })
      resolve(value);
    }, Math.floor(Math.random() * 1000));
  });
 
}
*/
/*
uploadDataArray(localDataArray: Array<any>): Promise<any> {
  let promiseChain: Promise<any> = Promise.resolve();
  localDataArray = localDataArray || [];
 
  localDataArray.forEach(localDataObject => {
   promiseChain = promiseChain.then(
    () => this.uploadDataObject(localDataObject)
   );
  });
 
  return promiseChain;
 }*/
SaveSaleOrder(){
  
    if(this.arrayItem.length <= 0){
      this.utility.Alert("Warning","กรุณาเลือกสินค้าก่อน");
    }else{
      this.saleorderServ.GetCustomerDelivery(this.oClient,this.oCustomer).then((res)=>{
        this.data_customerdelivery = res;
        console.log(this.data_customerdelivery);
  
  
        // if(this.data_customerdelivery.length <= 0){
        //   this.utility.Alert("Warning", "ไม่พบ Customer Code");
        // }else{

          var Order_date = this.oDate.toString();
          var DueDate = this.oDateSale.toString();

          this.saleorderServ.AddSalesOrders(this.oClient, "01", "001",this.oOrder_no, this.oType, this.oCustomer, this.oCustomer_name, Order_date, "0.00", "", "", ""
            , "", "", "", "", "", "", "", Order_date, "", this.oRemarks, "", ""
            , "", DueDate, "", "",this.oAddress, this.oBuilding, "", "", ""
            , "", "", DueDate, this.oUsername, this.oPayTerm, this.oUserId["0"], this.oUserId["0"], "", "", "", "", Order_date
            , "", DueDate,this.amount,this.amount).then((res)=>{
            this.data_addsaleorder = res;
            console.log(this.data_addsaleorder);
            
            if(this.data_addsaleorder["0"].sqlstatus < "0"){
              this.utility.Alert("Warning", this.data_addsaleorder["0"].sqlmsg);
            }else{
              for(let i=0; i < this.arrayItem.length; i++){
                this.doAddOrdersDetailsAsync(i) 
                //console.log(i);
                
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

/*
  SaveSaleOrder(){
  
      if(this.arrayItem.length <= 0){
        this.utility.Alert("Warning","กรุณาเลือกสินค้าก่อน");
      }else{
                for(let i=0; i < this.arrayItem.length; i++){
                  this.doAddOrdersDetailsAsync(i) 
                }
                let alert = this.alertCtrl.create({
                  title: this.oOrder_no,
                  subTitle: "Sales Order Updated",
                  buttons: [ {
                      text: 'ตกลง',
                      handler: item => {
                        this.dismiss();
                                           
                      }
                    }]
                });
              
                alert.present();              
              }
      
    
    }

  */
}

