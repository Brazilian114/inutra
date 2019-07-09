import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Utility } from '../../../helper/utility';
import { SaleService } from '../../../services/salseservice';

@IonicPage(
  {name:'SaleMenuPage',
  segment: 'SaleMenu'}
)

@Component({
  selector: 'page-salesmenu',
  templateUrl: 'salesmenu.html'
})
export class SaleMenuPage {

  oClient:string = "7LINE";
  oUsername:string = "";
  oUserGroup:string = "";
  oUserId:string = "";
  oStartDate: String = new Date().toISOString().substring(0, 10);
  oEndDate: String = new Date().toISOString().substring(0, 10);

  dataInvoiceGraph:any;

  constructor(public navCtrl: NavController, private utility: Utility, private saleServ: SaleService, private storage: Storage) {
    this.doGetStorage();

    this.doGetInvoiceGraph(this.oStartDate, this.oEndDate);
    
  }
  doReservation(){
    this.navCtrl.push("SaleReservationPage");
  }
  doCirculation(){
    this.navCtrl.push("CirculationPage");
  }
  doGetInvoiceGraph(oStartDate, oEndDate){
    this.saleServ.GetInvoiceGraph(this.oClient, this.oUserId, this.oUserGroup, oStartDate, oEndDate).then((res)=>{
      this.dataInvoiceGraph = res; 
      console.log(this.dataInvoiceGraph);    
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
