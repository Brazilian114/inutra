import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common'
import {Http, Headers, Response} from '@angular/http';
import { Utility } from '../../../helper/utility';
import { SaleOrderService } from '../../../services/saleorderservice';

@IonicPage(
  {name:'SaleOrderListPage',
  segment: 'SaleOrderList'}
)

@Component({
  selector: 'page-saleorderlist',
  templateUrl: 'saleorderlist.html',
  providers: [SaleOrderService]
})
export class SaleOrderListPage {
  hideMe:any = true;

  data_saleorder:any;

  oClient:string = "7LINE";
  oUsername:string = "";
  oUserGroup:string = "";
  oUserId:string = "";
  oSearch:string = "";
  date_time:any;
  items: any;
  constructor(public datepipe: DatePipe,private http: Http,public navCtrl: NavController, private utility: Utility, private storage: Storage, private saleorderServ: SaleOrderService) {
   
//this.ngOnInit()
 }  
  ionViewWillEnter(){
    this.doGetSalesOrders(this.oSearch);
    this.doGetStorage();
  }
  /*ngOnInit(){
    this.doGetSalesOrders(this.oSearch);
    this.doGetStorage();
  }*/
  initializeItems() {
    this.items = this.data_saleorder;   
    
  }
  /*
  doShowHide(){
    if(this.hideMe == false){
      this.hideMe = true;
    }else{
      this.hideMe = false;
    }
  }
*/

  gotoDetail(item){
    this.navCtrl.push("SaleOrderDetailsPage", { item: item });
  }
  AddSaleOrder(){
    this.navCtrl.push("AddSaleOrderPage");
  }
  doGetSalesOrders(oSearch){
   // this.utility.presentLoading();
    this.saleorderServ.GetSalesOrders(this.oClient, this.oUserId, oSearch, this.oUserGroup).then((res)=>{
      this.data_saleorder = res;
      
      console.log(this.data_saleorder);
      this.initializeItems();
      this.utility.finishLoding();
    })
  }
  /*
  doSearch(oSearch){
    this.doGetSalesOrders(oSearch);
  }*/
  /*SelectFilter(oSelectFilter){
    this.utility.presentLoading();
    this.saleorderServ.GetSalesOrdersKeyword(this.oClient, oSelectFilter).then((res)=>{
      this.data_saleorder = res;
      console.log(this.data_saleorder);
      this.utility.finishLoding();
    })
  }*/
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
  onInput(ev: any){
    this.initializeItems();
    
      
   let val = ev.target.value;
    if(val && val.trim() != ''){
      this.items = this.items.filter((item)=>{
        //console.log(item.dlvr_to["0"]);
        //console.log(item.status["0"]);
        return (item.status["0"].toLowerCase().indexOf(val.toLowerCase()) > -1 || item.order_no["0"].toLowerCase().indexOf(val.toLowerCase()) > -1  || item.customer["0"].toLowerCase().indexOf(val.toLowerCase()) > -1 ||  item.customer_name["0"].toLowerCase().indexOf(val.toLowerCase()) > -1);
         
      })
      
    }
  }
  doRefresh(refresher) {
    this.saleorderServ.GetSalesOrders(this.oClient, this.oUserId, this.oSearch, this.oUserGroup).then((res)=>{
      this.data_saleorder = res;
      
      console.log(this.data_saleorder);
      this.initializeItems();
      refresher.complete();
    });

  }
}