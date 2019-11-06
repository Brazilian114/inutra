import { Component, ViewChild  } from '@angular/core';
import { NavController, LoadingController, ToastController, ModalController, Platform, Content, IonicPage ,ViewController,NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { Utility } from '../../../helper/utility';
import { SaleOrderService } from '../../../services/saleorderservice';
import { DatePipe } from '@angular/common'
@IonicPage(
  {name:'SaleOrderDetailsPage',
  segment: 'SaleOrderDetails'}
)

@Component({
  selector: 'page-saleorderdetails',
  templateUrl: 'saleorderdetails.html',
  providers: [SaleOrderService]
})
export class SaleOrderDetailsPage {
  @ViewChild('focusQty') InputQty;
  hideMe:any = true;
  hideMe2:any = false;
  data_item:any;
  data_saleorderdetail:any;

  loader:any;
  oClient:string = "INT";
  oUsername:string = "";
  oUserGroup:string = "";
  oUserId:string = "";
  data_customerdelivery:any;
  arrayItem:any = [];
  
  oType:string = "ADHOC";
  oDate:any = new Date().toISOString();
  oPayTerm:string = "";
  oSale:string = "";
  oDateSale:any = new Date().toISOString();
  oTotalPrice: any = 0.00;
  data_productVat:any;
  //Header
  oLineNo:string = "";
  oOrder_no:string = "";
  oCustomer:string = "";
  oCustomer_name:string = "";
  oAddress:string = "";
  oStreet:string="";
  oDiscountRate:any;
  oDiscountType:any;
  oDueDate:string = "";
  oAmount:string = "";
  oNetAmount:any;
  oDlvr_code:string = "";
  oVat:any;
  amount:any;
  amount2:any;
  count:any;
  oCreate_date:string = "";
  oRemark:string="";
  //Details
  oSalman:any;
  date_time:any;
  data_addsaleorder:any;
  data_addsaledetail:any;
  data_deletedetail:any;
  oDiscount1:any;
  oDiscount2:any;
  ovat2:any = "123456"
  data_saleorder:any;
  items:any;
  oDiscount_rate:any;
  oDiscount_rate2:any;
  oDiscount_rate3:any;
  oDiscount_type:any;
  oDiscount_type2:any;
  oDiscount_type3:any;
  sum_discount1:any;
  sum_discount2:any;
  sum_discount3:any;
  oStatus:any
  a1:any;
  a2:any;
  constructor( public loadingCtrl: LoadingController,public datepipe: DatePipe,private toastCtrl: ToastController,public viewCtrl: ViewController,public alertCtrl: AlertController,public navCtrl: NavController, private utility: Utility, public navParams: NavParams, private storage: Storage
    , private saleorderServ: SaleOrderService, public modalCtrl: ModalController) {
   
    //this.doGetStorage();
    
    this.data_item = navParams.get('item');
    
    console.log(this.data_item);
    //this.oCreate_date = this.data_item.create_date[0];
    //this.oLineNo = this.data_item.oLineNo;
    this.oOrder_no = this.data_item.order_no;
    //this.oAmount = this.data_item.amount;
    this.oVat = this.data_item.vat_rate;
    this.oRemark = this.data_item.remarks;
    this.oDueDate = this.data_item.due_date;
    this.oCustomer = this.data_item.customer;
    this.oCustomer_name = this.data_item.customer_name;
    this.oStatus = this.data_item.status
    //this.oDiscountRate = this.data_item.discount_rate;
    //this.oDiscountType = this.data_item.discount_type;
    this.date_time =this.data_item.create_date;
/*
 if(this.data_item.amount == undefined)  
 this.oAmount = "0.00";
else
 this.oAmount = this.data_item.amount;

    
*/    this.oStreet = this.data_item.dlvr_street;
      this.oSalman = this.data_item.salesman_code;
      this.oDiscount_rate = this.data_item.discount_rate;   
      this.oDiscount_type = this.data_item.discount_type;
      this.oDiscount_rate2 = this.data_item.discount_rate_2;   
      this.oDiscount_type2 = this.data_item.discount_type_2;
      this.oDiscount_rate3 = this.data_item.discount_rate_3;   
      this.oDiscount_type3 = this.data_item.discount_type_3;
      
      

    if(this.data_item.net_amount == undefined)  
      this.oNetAmount = "0.00";
    else
      this.oNetAmount = this.data_item.net_amount;


    if(this.data_item.remarks == "")
      this.oRemark = "-";
    else 
      this.oRemark = this.data_item.remarks;

    if(this.data_item.dlvr_bldg == "undefined" || this.data_item.dlvr_bldg == "")
      this.oDlvr_code = "";
    else
      this.oDlvr_code = this.data_item.dlvr_bldg;

    if(this.data_item.dlvr_street == "undefined" || this.data_item.dlvr_street == ""  )
      this.oAddress = "-";

    else
      this. oAddress = this.data_item.dlvr_street + " " + this.oDlvr_code;

      
  }

  ionViewWillLeave() {
    this.storage.remove('_oLine');
  }
  ionViewWillEnter(){
    this.doGetOrdersDetails(this.oOrder_no);
    //this.doGetVat();
    this.doGetSalesOrders();
    //this.UpdateSaleOrder();
  }
  initializeItems() {
    this.items = this.data_saleorder;   
  }
  doGetSalesOrders(){
    this.utility.presentLoading();
     this.saleorderServ.GetSalesOrders(this.oClient).then((res)=>{
       this.data_saleorder = res;
       
       console.log("sale_order ",this.data_saleorder);
       //console.log("amount",this.data_saleorder["0"].amount);
       this.initializeItems();
       this.utility.finishLoding()
     })
   }
  doProductModal(){
     // this.doGetSalesOrders();
      //this.utility.presentLoading();
      this.initializeItems();
      let modal = this.modalCtrl.create("AddSaleOrderDetailPage", { item:this.items ,count:this.count })
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
          this.doGetOrdersDetails(this.oOrder_no);
          this.doGetSalesOrders();
        }
      });
      this.utility.finishLoding();
  }
  
 /* doShowHide(){
    if(this.hideMe == false){
      this.hideMe = true;
    }else{
      this.hideMe = false;
    }
  }*/
  doGetOrdersDetails(oOrder_no){
    this.saleorderServ.GetOrdersDetails(this.oClient, oOrder_no).then((res)=>{
      this.data_saleorderdetail = res;  
      this.count = this.data_saleorderdetail.length;
      console.log("order",this.data_saleorderdetail);
      //console.log("amount",this.data_saleorderdetail.amount);
      
       
      if(this.data_saleorderdetail.length <=  0){
      this.hideMe = false;
      this.hideMe2 = true;
      }else{
        this.hideMe = true;
        this.hideMe2 = false;
      } 
      
      /*
      if(this.data_saleorderdetail["0"].amount == undefined)
      this.oAmount = "0.00";
    else
      this.oAmount = this.data_saleorderdetail["0"].amount;

      if(this.data_saleorderdetail["0"].net_amount == undefined)
      this.oNetAmount = "0.00";  
    else
      this.oNetAmount = this.data_saleorderdetail["0"].net_amount;

      this.oDiscount1 = parseInt(this.oAmount)
      this.oDiscount2 = parseInt(this.oNetAmount)*/
      
      //console.log(this.oDiscount1);
      
      /*if(this.data_deletedetail["0"].discount_rate == undefined) 
        this.oDiscountRate = "0.00";
      else  */
/*
      this.oDiscountRate = this.oDiscount1 - this.oDiscount2;
       this.oDiscountRate = this.oDiscountRate.toFixed(2);*/
        
        
     // console.log(this.oDiscountRate);
      
   
    })
  }
  doGetVat(){
    
    this.saleorderServ.GetVatDetails().then((res)=>{
      this.data_productVat = res;
     
      
      
       // this.oVat = this.data_productVat[this.oVat.toFixed(0)].vat
        
      console.log(this.data_productVat);
      
     // console.log(this.oVat);
     
    })
    
  }
 
  doEditProduct(item){
    this.utility.presentLoading();
    this.initializeItems();
      let modal = this.modalCtrl.create("EditProductModalPage",{ item: item, oCustomer: this.oCustomer, oOrder_no: this.oOrder_no, data_order:this.items})
      modal.present();
      modal.onDidDismiss(data =>{

        
          this.loader = this.loadingCtrl.create({
            content:"Loading...",
            duration:2500
  
        });
          this.loader.present().then(() => {});
      
        setTimeout(()=>{        
        
        if(data != undefined){
          this.doGetOrdersDetails(this.oOrder_no);
          console.log("log1",this.oOrder_no);
          
          
        }else{        
          this.doGetOrdersDetails(this.oOrder_no);
          console.log("log2",this.oOrder_no);
        }
        this.doGetOrdersDetails(this.oOrder_no);
        this.saleorderServ.GetSalesOrders(this.oClient).then((res)=>{
          this.data_saleorder = res;
          
          console.log("sale_order ",this.data_saleorder);
          console.log("amount",this.data_saleorder["0"].amount);
        })

      },2500);
      
      });
      this.utility.finishLoding();

  }
  doGetStorage(){
    this.storage.get('_user').then((res)=>{
      this.oUsername = res;
    })  
    this.storage.get('_userId').then((res)=>{
      this.oUserId = res;
    })  
    this.storage.get('_userGroup').then((res)=>{
      this.oUserGroup = res;
    })  
  }
 
  dismiss() {
    this.viewCtrl.dismiss();
  }

  presentToast(key, showCloseButton, position: string) {
    const toast = this.toastCtrl.create({
      message: key,
      showCloseButton: showCloseButton,
      closeButtonText: 'Ok',
      duration: 2000,
      position : position
    });
    toast.present();
  }
  
  doDelete(item){
    this.amount2 = parseInt(this.data_saleorder["0"].amount) - parseInt(item.amount)
    //this.amount2 = parseInt(this.amount2);
    if(this.amount2 <= 0){
      this.amount = 0.00
     
    }else{
      this.amount = this.amount2
     
    }
    
    console.log(this.amount2);
    console.log(this.amount);
    
    const confirm = this.alertCtrl.create({
      title: 'ลบรายการสินค้า?',
      message: 'คุณต้องการที่จะลบรายการสินค้า?',
      buttons: [
        {
          text: 'ยกเลิก',
          handler: () => {
            this.navCtrl.push(SaleOrderDetailsPage);
            //this.viewCtrl.dismiss();
            console.log('Disagree clicked');
          }
        },
        {
          text: 'ตกลง',
          handler: () => {
           
            if(this.oDiscount_type == "percent"){
              var disrate1 = parseFloat(this.amount) * this.oDiscount_rate / 100
              this.sum_discount1 = parseFloat(this.amount) -  disrate1;
              } else{
                this.sum_discount1 =  parseFloat(this.amount) - parseFloat(this.oDiscount_rate)
              }
              
              if(this.oDiscount_type2 == "percent"){
                var dis_rate2 = this.sum_discount1 * this.oDiscount_rate2 / 100
                this.sum_discount2 = this.sum_discount1 -  dis_rate2;
              }else{
                this.sum_discount2 =  parseFloat(this.sum_discount1) - parseFloat(this.oDiscount_rate2)
              }
              
              if(this.oDiscount_type3 == "percent"){
                var dis_rate3 = this.sum_discount2 * this.oDiscount_rate3 / 100
                this.sum_discount3 = this.sum_discount2 -  dis_rate3;
              }else{
                this.sum_discount3 =  parseFloat(this.sum_discount2) - parseFloat(this.oDiscount_rate3)                
              } 
           
            var sum
            var sum_dis = this.amount -  this.sum_discount3;
            sum = this.sum_discount3;
            console.log("ลด1",this.sum_discount1);
            console.log("ลด2",this.sum_discount2);
            console.log("ราคาสุทธิ",this.sum_discount3);
            console.log("ส่วนลดรวม",sum_dis.toFixed(2));
            this.oDiscountRate = sum_dis.toFixed(2);
            console.log(this.oDiscountRate);
          
            console.log("amount",this.amount);
           
            this.SaveSaleOrder(this.amount, item,this.sum_discount3)
            this.doGetOrdersDetails(this.oOrder_no);
       
          }
         
        }
        
      ]
    }); 
    confirm.present();
    }
    SaveSaleOrder(amount, item,netMaount){
    
      this.saleorderServ.GetCustomerDelivery(this.oClient,this.oCustomer).then((res)=>{
        this.data_customerdelivery = res;
        console.log(this.data_customerdelivery);
  
        // if(this.data_customerdelivery.length <= 0){
        //   this.utility.Alert("Warning", "ไม่พบ Customer Code");
        // }else{
          
          var Order_date = this.oDate.toString();
          var DueDate = this.oDateSale.toString();
  
          this.saleorderServ.AddSalesOrders(this.oClient, "01", "001", this.oOrder_no, this.oType, this.oCustomer, this.oCustomer_name, Order_date, this.oVat, this.oDiscount_type, this.oDiscount_rate, this.oDiscount_type2
            ,  this.oDiscount_rate2, this.oDiscount_type3, this.oDiscount_rate3, "", "", "", "", Order_date, "", this.oRemark, "", ""
            , "", DueDate, "", "",this.oStreet, this.oDlvr_code, "", "", ""
            , "", "", DueDate, this.oUsername, this.oPayTerm, this.oSalman, this.oSalman, "", "", "", "", Order_date
            , "", DueDate,amount,netMaount,this.oStatus).then((res)=>{
            this.data_addsaleorder = res;
            console.log(this.data_addsaleorder);
            

            this.saleorderServ.DeleteSoDetail(this.oClient,item.order_no,item.line_no).then((res)=>{
              let data_r_delete = res;
                //console.log("delete",data_r_delete);
                this.presentToast("ลบรายการสินค้าแล้ว", false, 'middle');
             
            this.saleorderServ.GetOrdersDetails(this.oClient,this.oOrder_no).then((res)=>{
                  this.data_saleorderdetail = res;  
                  //this.count = this.data_saleorderdetail.length;
                  console.log("order",this.data_saleorderdetail);                 
                })
                this.saleorderServ.GetSalesOrders(this.oClient).then((res)=>{
                  this.data_saleorder = res;
                  console.log("amount",this.data_saleorder["0"].amount);
                 // console.log("sale_order ",this.data_saleorder);
                                   
                });              
                this.doGetSalesOrders();
              })
          })
       
      })

    }

    UpdateSaleOrder(){
      this.initializeItems();
      //console.log("amount2",this.items["0"].net_amount);
          
      const confirm = this.alertCtrl.create({
      title: 'ยืนยันใบสั่งขาย?',
      message: 'คุณต้องการที่จะยืนยันใบสั่งขาย คุณจะไม่สามรถแก้ไขรายการสินค้าได้อีก?',
      buttons: [
        {
          text: 'ยกเลิก',
          handler: () => {
            this.navCtrl.push(SaleOrderDetailsPage);
            //this.viewCtrl.dismiss();
            console.log('Disagree clicked');
          }
        },
        {
          text: 'ตกลง',
          handler: () => {
      this.saleorderServ.GetCustomerDelivery(this.oClient,this.oCustomer).then((res)=>{
        this.data_customerdelivery = res;
        console.log(this.data_customerdelivery);
  
        // if(this.data_customerdelivery.length <= 0){
        //   this.utility.Alert("Warning", "ไม่พบ Customer Code");
        // }else{

          var Order_date = this.oDate.toString();
          var DueDate = this.oDateSale.toString();
  
          this.saleorderServ.AddSalesOrders(this.oClient, "01", "001", this.oOrder_no, this.oType, this.oCustomer, this.oCustomer_name, Order_date, this.oVat, this.oDiscount_type, this.oDiscount_rate, this.oDiscount_type2
            ,  this.oDiscount_rate2, this.oDiscount_type3, this.oDiscount_rate3, "", "", "", "", Order_date, "", this.oRemark, "", ""
            , "", DueDate, "", "",this.oStreet, this.oDlvr_code, "", "", ""
            , "", "", DueDate, this.oUsername, this.oPayTerm, this.oSalman, this.oSalman, "", "", "", "", Order_date
            , "", DueDate,this.items["0"].amount,this.items["0"].net_amount,"DATA ENTRY").then((res)=>{
            this.data_addsaleorder = res;
            console.log(this.data_addsaleorder);
            //this.viewCtrl.dismiss();
            this.presentToast("ยืนยันใบสั่งขายเรียบร้อย", false, 'middle');
           /* this.saleorderServ.DeleteSoDetail(this.oClient,item.order_no,item.line_no).then((res)=>{
              let data_r_delete = res;
                //console.log("delete",data_r_delete);
                this.presentToast("ลบรายการสินค้าแล้ว", false, 'middle');
             
            this.saleorderServ.GetOrdersDetails(this.oClient, this.oUserId, this.oUserGroup, this.oOrder_no).then((res)=>{
                  this.data_saleorderdetail = res;  
                  //this.count = this.data_saleorderdetail.length;
                  console.log("order",this.data_saleorderdetail);                 
                })
                this.saleorderServ.GetSalesOrders(this.oClient,"", this.oOrder_no, "").then((res)=>{
                  this.data_saleorder = res;
                  console.log("amount",this.data_saleorder["0"].amount);
                 // console.log("sale_order ",this.data_saleorder);
                                   
                });             
                this.doGetSalesOrders();
              }) */
              })
            
            })
          }
        }
      ]
    })
    confirm.present();
  }

  }
