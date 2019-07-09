import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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
  
  oClient:string = "7LINE";
  oUsername:string = "";
  oUserGroup:string = "";
  oUserId:string = "";
  oStartDate: String = new Date().toISOString().substring(0, 10);
  oEndDate: String = new Date().toISOString().substring(0, 10);
  oDateView:String = '';

  data_getsaleorder_bydate:any;

  constructor(public navCtrl: NavController, private utility: Utility, private reportServ: ReportService, private storage: Storage) {
    this.doGetStorage();
    this.oDateView = this.oStartDate + ' - ' + this.oEndDate;
  }
  doGetSalesOrdersByDateRange(oStartDate, oEndDate){
    this.reportServ.GetSalesOrdersByDateRange(this.oClient, this.oUserId, oStartDate, oEndDate, this.oUserGroup).then((res)=>{
      this.data_getsaleorder_bydate = res;
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
