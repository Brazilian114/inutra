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
  data_item:any;
  data_saleorderdetail:any;


  oClient:string = "7LINE";
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

  //Header
  oLineNo:string = "";
  oOrder_no:string = "";
  oCustomer:string = "";
  oCustomer_name:string = "";
  oAddress:string = "";
  oDiscountRate:string = "";
  oDiscountType:string = "";
  oDueDate:string = "";
  oAmount:string = "";
  oNetAmount:string = "";
  oVat:string = "";
  oCreate_date:string = "";
  oRemark:string="";
  //Details
  date_time:any;
  data_addsaleorder:any;
  data_addsaledetail:any;
  data_deletedetail:any;


  constructor(public datepipe: DatePipe,private toastCtrl: ToastController,public viewCtrl: ViewController,public alertCtrl: AlertController,public navCtrl: NavController, private utility: Utility, public navParams: NavParams, private storage: Storage
    , private saleorderServ: SaleOrderService, public modalCtrl: ModalController) {
   
    this.doGetStorage();

    this.data_item = navParams.get('item');
    
    console.log(this.data_item);
    this.oCreate_date = this.data_item.create_date[0];
    this.oLineNo = this.data_item.oLineNo;
    this.oOrder_no = this.data_item.order_no;
    this.oRemark = this.data_item.remarks;
    this.oDueDate = this.data_item.due_date;
    this.oCustomer = this.data_item.customer;
    this.oCustomer_name = this.data_item.customer_name;
    this.oAddress = this.data_item.dlvr_street + " " + this.data_item.dlvr_bldg;
    this.oDiscountRate = this.data_item.discount_rate;
    this.oDiscountType = this.data_item.discount_type;
    this.date_time =this.datepipe.transform(this.oCreate_date, 'dd/MM/yyyy');
 //console.log(this.oLineNo);
 //console.log(this.date_time);
 
 
    if(this.data_item.amount == undefined)
      this.oAmount = "0.00";
    else
      this.oAmount = this.data_item.amount;

    if(this.data_item.net_amount == undefined)  
      this.oNetAmount = "0.00";
    else
      this.oNetAmount = this.data_item.net_amount;

    this.oVat = this.data_item.vat;

    if(this.data_item.remarks == "")
      this.oRemark = "-";
    else 
      this.oRemark = this.data_item.remarks;

    if(this.data_item.dlvr_street == "undefined" || this.data_item.dlvr_street == ""  )
      this.oAddress = "-";
    else
      this. oAddress = this.data_item.dlvr_street + " " + this.data_item.dlvr_bldg;
  }
  ionViewWillLeave() {
    this.storage.remove('_oLine');
  
  }
  ionViewWillEnter(){
    this.doGetOrdersDetails(this.oOrder_no);
  
  }
  doShowHide(){
    if(this.hideMe == false){
      this.hideMe = true;
    }else{
      this.hideMe = false;
    }
  }
  doGetOrdersDetails(oOrder_no){
    this.saleorderServ.GetOrdersDetails(this.oClient, this.oUserId, this.oUserGroup, oOrder_no).then((res)=>{
      this.data_saleorderdetail = res;  
      console.log(this.data_saleorderdetail);
      
    })
  }
  doEditProduct(item){
    this.utility.presentLoading();
      let modal = this.modalCtrl.create("EditProductModalPage",{ item: item, oCustomer: this.oCustomer, oOrder_no: this.oOrder_no })
      modal.present();
      modal.onDidDismiss(data =>{
        if(data != undefined){
          this.doGetOrdersDetails(this.oOrder_no);
        }else{        
          this.doGetOrdersDetails(this.oOrder_no);
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
  
  doConfirm(item){
    console.log(item);
    
    const confirm = this.alertCtrl.create({
      title: 'ลบรายการสินค้า?',
      message: 'คุณต้องการที่จะลบรายการสินค้า?',
      buttons: [
        {
          text: 'ยกเลิก',
          handler: () => {
            this.navCtrl.push(SaleOrderDetailsPage);
            console.log('Disagree clicked');
          }
        },
        {
          text: 'ตกลง',
          handler: () => {
      this.storage.get('_oLine').then((res)=>{
      this.oLineNo = res;
           
      this.saleorderServ.DeleteSoDetail(this.oClient,item.order_no,item.line_no).then((res)=>{
        let data_r_delete = res;
          console.log(data_r_delete);
          this.presentToast("ลบรายการแล้ว", false, 'bottom');
      this.saleorderServ.GetOrdersDetails(this.oClient, this.oUserId, this.oUserGroup, this.oOrder_no).then((res)=>{
            this.data_saleorderdetail = res;  
            console.log(this.data_saleorderdetail);
            
          })
         
         //this.data_addsaledetail = this.data_item;
        })
      })   
          }
         
        }
      ]
    });
    confirm.present();
    
    }
  
  

  }
