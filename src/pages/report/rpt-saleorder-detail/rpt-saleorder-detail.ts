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
  oDlvr_code:string="";
  //Header
  oOrder_no:string = "";
  oCustomer:string = "";
  oCustomer_name:string = "";
  oAddress:string = "";
  oDiscountRate:string = "";
  oDiscountType:string = "";
  oDueDate:string = "";
  oAmount:string = "";
  oNetAmount:any;
  oVat:any;
  oReference_no:string="";
  data_item:any;
  oCreate_date:any;
  sum:any;
  date_time:any;
  data_saleorderdetail:any;

  constructor(public datepipe: DatePipe,public navCtrl: NavController, private utility: Utility, private reportServ: ReportService, private saleorderServ: SaleOrderService
    , private storage: Storage, public navParams: NavParams) {
    this.data_item = navParams.get('item');
    console.log(this.data_item);
    this.oCreate_date = this.data_item.create_date;
    this.oOrder_no = this.data_item.order_no;
    //this.date_time =this.datepipe.transform(this.oCreate_date, 'dd/MM/yyyy');
    this.oDueDate = this.data_item.due_date;
    this.oRemarks = this.data_item.remarks;
    this.oCustomer = this.data_item.customer;
    this.oCustomer_name = this.data_item.customer_name;
    this.oAddress = this.data_item.dlvr_street + " " + this.data_item.dlvr_bldg;
    //this.oDiscountRate = this.data_item.discount_rate;
    
    this.oDiscountType = this.data_item.discount_type;
    //this.date_time =this.datepipe.transform(this.oCreate_date, 'dd/MM/yyyy');
    
    var str = this.data_item.reference_no;
    var rate = this.data_item.discount_rate;
    var amount = this.data_item.amount;
    this.oAmount = parseFloat(amount).toFixed(2);
    this.oDiscountRate = parseFloat(rate).toFixed(2);
    //var sum = amount - rate;
    //console.log(sum);
    var rate = this.data_item.discount_rate;
    var amount = this.data_item.amount;
    var sum;
      if(this.data_item.discount_type == "percent"){
      var sum_discount = amount * rate / 100
      sum = amount - sum_discount
      this.oDiscountRate = this.oDiscountRate+" %"
      }else{
      sum = amount - rate
      
      this.oDiscountRate = this.oDiscountRate+" ฿"
      }
      
      if(this.data_item.discount_rate || undefined)
      this.oDiscountRate == "0.00"
      else

      if(this.data_item.discount_rate == undefined || this.data_item.discount_rate == "")
      this.oDiscountRate = "0.00";
      else{
        this.oDiscountRate = this.oDiscountRate
      }
      
      /*if(str.length <= 9 )
      this.oReference_no =  "SO0"+this.data_item.reference_no
      else
      this.oReference_no = this.data_item.reference_no;*/
      
    if(this.data_item.amount == undefined)
      this.oAmount = "0.00";
    else
      this.oAmount = this.data_item.amount;

    if(this.data_item.net_amount == undefined)  
      this.oNetAmount = "0.00";
    else
      this.oNetAmount = sum.toFixed(2);

    if(this.data_item.vat_rate == undefined || this.data_item.vat_rate == "")
      this.oVat = "0.00";
    else
      var vat = this.data_item.vat_rate;
      this.oVat = parseFloat(vat).toFixed(0);

    if(this.data_item.remarks == "")
      this.oRemarks = "-";
    else
      this.oRemarks = this.data_item.remarks; 

      if(this.data_item.dlvr_bldg == "undefined" || this.data_item.dlvr_bldg == "")
      this.oDlvr_code = "";
    else
      this.oDlvr_code = this.data_item.dlvr_bldg;

    if(this.data_item.dlvr_street == "undefined" || this.data_item.dlvr_street == ""  )
      this.oAddress = "-";

    else
      this. oAddress = this.data_item.dlvr_street + " " + this.oDlvr_code;
      

  }
  ionViewWillEnter(){
    this.doGetOrdersDetails();
    
  }
  /*doShowHide(){
    if(this.hideMe == false){
      this.hideMe = true;
    }else{
      this.hideMe = false;
    }
  }*/
  doGetOrdersDetails(){
    this.saleorderServ.GetOrdersDetails(this.oClient, this.oUserId, this.oUserGroup,this.oOrder_no).then((res)=>{
      this.data_saleorderdetail = res;  
      console.log(this.data_saleorderdetail);
        
      if(this.data_saleorderdetail.length <=  0){
        this.hideMe = false;
        //this.hideMe2 = true;
        }else{
          this.hideMe = true;
          //this.hideMe2 = false;
        } 
      
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
