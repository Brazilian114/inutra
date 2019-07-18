import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Utility } from '../../../helper/utility';
import { ReportService } from '../../../services/reportservice';

@IonicPage(
  {name:'RptStockPage',
  segment: 'RptStock'}
)

@Component({
  selector: 'page-rpt-stock',
  templateUrl: 'rpt-stock.html'
})
export class RptStockPage {
  oClient:string = "7LINE";
  oUsername:string = "";
  oUserGroup:string = "";
  oUserId:string = "";

  data_rpt_inventory:any;
  data_saleorderdetail:any;

  items: any;
  constructor(public navCtrl: NavController, private utility: Utility, private reportServ: ReportService, private storage: Storage) {
    this.doGetStorage();
    this.doGetRptInventoryMovement(this.oClient, "", "", "", "", "", "", "", "", "", "ITEM NO","");
  } 
  initializeItems() {
    this.items = this.data_rpt_inventory;
  }
  onInput(ev: any){
    this.initializeItems();
   let val = ev.target.value;
    if(val && val.trim() != ''){
      this.items = this.items.filter((item)=>{
        return (item.item_no["0"].toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  doGetRptInventoryMovement(oClient, oWarehouse, oZone, oItem_fr, oItem_to, oDescription, oLoc_fr, oLoc_to, oGroup, oGrade, oOrder_by, oCategory){
    this.reportServ.Rpt_inventory_movement(oClient, oWarehouse, oZone, oItem_fr, oItem_to, oDescription, oLoc_fr, oLoc_to, oGroup, oGrade, oOrder_by, oCategory).then((res)=>{
      this.data_rpt_inventory = res;
      console.log(this.data_rpt_inventory);
      this.initializeItems();
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
   doDetails(item){
    this.utility.presentLoading();
    this.navCtrl.push("ReportDetailPage",{ item: item })
    this.utility.finishLoding();
  }
}
