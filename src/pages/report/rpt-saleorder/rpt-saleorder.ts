import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController , Content} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common'
import { Utility } from '../../../helper/utility';
import { ReportService } from '../../../services/reportservice';

@IonicPage(
  {name:'RptSaleOrderPage',
  segment: 'RptSaleOrder'}
)

@Component({
  selector: 'page-rpt-saleorder',
  templateUrl: 'rpt-saleorder.html'
})
export class RptSaleOrderPage {
  
  @ViewChild(Content) pageTop: Content;
  public pageScroller(){
    this.pageTop.scrollToTop();
  }
  format2: any = [];
  var_y:any;
  oCreate_date:string = "";
  oClient:string = "7LINE";
  oUsername:string = "";
  oUserGroup:string = "";
  oUserId:string = "";
  oStartDate: String = new Date().toISOString().substring(0, 10);
  oEndDate: String = new Date().toISOString().substring(0, 10);
  oDateView:String = '';
  date_time:any;
  data_getsaleorder_bydate:any;
  data_saleorderdetail:any;
  item2 = [];
  items: any;
  constructor(public datepipe: DatePipe,public navCtrl: NavController, private utility: Utility, private reportServ: ReportService, private storage: Storage) {
    this.doGetStorage();
    this.oDateView = this.oStartDate + ' - ' + this.oEndDate;
    this.doGetSalesOrdersByDateRange("","");
    
    //this.date_time =this.datepipe.transform(this.oCreate_date, 'dd/MM/yyyy');
  }
  initializeItems() {
    this.items = this.data_getsaleorder_bydate;
    console.log(this.items);

   /* this.oCreate_date = this.items["0"].create_date;
    this.date_time =this.datepipe.transform(this.oCreate_date, 'dd/MM/yyyy');
    console.log(this.date_time);*/
    
    /*for(let i = 0; i < 30; i++){
      this.item2.push(this.data_getsaleorder_bydate[this.item2.length]);
      }*/
  }  /*

  doInfinite(ionInfinite) {
    console.log("Start Scroll");
      setTimeout(() => {      
       for(let i = 0; i < 30; i++){
         this.item2.push(this.data_getsaleorder_bydate[this.item2.length]);
         } 
       console.log('End Scroll');      
       ionInfinite.complete();
         }, 500);  
   }
  */
   onInput(ev: any){
    this.initializeItems();
   let val = ev.target.value;
    if(val && val.trim() != ''){
      this.data_getsaleorder_bydate = this.data_getsaleorder_bydate.filter((item)=>{
        return (item.order_no["0"].toLowerCase().indexOf(val.toLowerCase()) > -1 || item.status["0"].toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  doGetSalesOrdersByDateRange(oStartDate, oEndDate){
    this.reportServ.GetSalesOrdersByDateRange(this.oClient, this.oUserId, oStartDate, oEndDate, this.oUserGroup).then((res)=>{
      this.data_getsaleorder_bydate = res;
  
      console.log(this.data_getsaleorder_bydate);
      
      this.initializeItems();

    })
  }

  doDetails(item){
    this.navCtrl.push("RptSaleOrderDetailsPage", { item: item });
  }
  changeDate(oStartDate, oEndDate){
    this.oDateView = oStartDate + ' - ' + oEndDate;
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
