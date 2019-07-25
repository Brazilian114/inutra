import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common'
import { Utility } from '../../../helper/utility';
import { ReportService } from '../../../services/reportservice';
import { SaleOrderService } from '../../../services/saleorderservice';
@IonicPage(
  {name:'RptSaleOrderDetailsPage',
  segment: 'RptSaleOrderDetails'}
)

@Component({
  selector: 'page-rpt-saleorder-detail',
  templateUrl: 'rpt-saleorder-detail.html'
})
export class RptSaleOrderDetailsPage {
  hideMe:any = true;

  oClient:string = "7LINE";
  oUsername:string = "";
  oUserGroup:string = "";
  oUserId:string = "";
  oRemarks:string="";
  //Header
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
  oReference_no:string="";
  data_item:any;
  oCreate_date:any;
  date_time:any;
  data_saleorderdetail:any;

  constructor(public datepipe: DatePipe,public navCtrl: NavController, private utility: Utility, private reportServ: ReportService, private saleorderServ: SaleOrderService
    , private storage: Storage, public navParams: NavParams) {
    this.data_item = navParams.get('item');
    console.log(this.data_item);
    this.oCreate_date = this.data_item.create_date[0];
    this.oOrder_no = this.data_item.order_no;
    this.oReference_no =  this.data_item.reference_no
    this.oDueDate = this.data_item.due_date;
    this.oRemarks = this.data_item.remarks;
    this.oCustomer = this.data_item.customer;
    this.oCustomer_name = this.data_item.customer_name;
    this.oAddress = this.data_item.dlvr_street + " " + this.data_item.dlvr_bldg;
    this.oDiscountRate = this.data_item.discount_rate;
    this.oDiscountType = this.data_item.discount_type;
    this.date_time =this.datepipe.transform(this.oCreate_date, 'dd/MM/yyyy');
    
    
    if(this.data_item.amount == undefined)
      this.oAmount = "0";
    else
      this.oAmount = this.data_item.amount;

    if(this.data_item.net_amount == undefined)  
      this.oNetAmount = "0";
    else
      this.oNetAmount = this.data_item.net_amount;

      this.oVat = this.data_item.vat;
    if(this.data_item.remarks == "")
      this.oRemarks = "-";
    else
      this.oRemarks = this.data_item.remarks; 

  }
  ionViewWillEnter(){
    this.doGetOrdersDetails();
  }
  doShowHide(){
    if(this.hideMe == false){
      this.hideMe = true;
    }else{
      this.hideMe = false;
    }
  }
  doGetOrdersDetails(){
    this.saleorderServ.GetOrdersDetails(this.oClient, this.oUserId, this.oUserGroup, this.oReference_no).then((res)=>{
      this.data_saleorderdetail = res;  
      console.log(this.data_saleorderdetail);
      
    })
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
}
