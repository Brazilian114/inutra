import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController,Content } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common'
import {Http, Headers, Response} from '@angular/http';
import { Utility } from '../../../helper/utility';
import { SaleOrderService } from '../../../services/saleorderservice';
import { CustomerService } from '../../../services/customerservice';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';

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
  @ViewChild(Content) pageTop: Content;
  public pageScroller(){
    this.pageTop.scrollToTop();
  }
  hideMe:any = true;
  myInput:any;
  data_saleorder:any;
  oKeyword:any;
  oClient:string = "INT";
  oUsername:string = "";
  oUserGroup:string = "";
  oUserId:string = "";
  oSearch:string = "";
  dataCustomer:any;
  date_time:any;
  items = [];
  items2 = [];
  constructor(public customServ: CustomerService,public datepipe: DatePipe,private http: Http,public navCtrl: NavController, private utility: Utility, private storage: Storage, private saleorderServ: SaleOrderService) {
   
//this.ngOnInit()
 }  
  ionViewWillEnter(){
    this.doGetSalesOrders();
    this.doGetStorage();
  }
  /*ngOnInit(){
    this.doGetSalesOrders(this.oSearch);
    this.doGetStorage();
  }*/
  initializeItems() {
    this.items2 = this.data_saleorder;   
    for(let i = 0; i < 30; i++){
      this.items.push(this.items2[i]);
      }  
      console.log(this.items);
      
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
   // this.navCtrl.push("SaleOrderDetailsPage", { item: item });
    this.navCtrl.push("SaleOrderDetailsPage",{item : item}).then(()=>{
      this.navCtrl.getActive().onDidDismiss(data =>{
        this.myInput = "";
        this.items = [];
        this.initializeItems(); 
      })
    })
  }
  AddSaleOrder(){
    this.navCtrl.push("AddSaleOrderPage");
  }
  doGetSalesOrders(){
   // this.utility.presentLoading();
    this.saleorderServ.GetSalesOrders(this.oClient).then((res)=>{
      this.data_saleorder = res;
      
      console.log("dataOrder",this.data_saleorder);
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
    //this.initializeItems();
    
      
   let val = ev.target.value;
    if(val && val.trim() != ''){
      this.items = this.items2.filter((item)=>{
        //console.log(item.dlvr_to["0"]);
        //console.log(item.status["0"]);
        return (item.status["0"].toLowerCase().indexOf(val.toLowerCase()) > -1 || item.order_no["0"].toLowerCase().indexOf(val.toLowerCase()) > -1  || item.customer["0"].toLowerCase().indexOf(val.toLowerCase()) > -1 ||  item.customer_name["0"].toLowerCase().indexOf(val.toLowerCase()) > -1);
         
      })
      
    }else{
      this.items = [];
      this.initializeItems();
    }
  }
  doRefresh(refresher) {
    this.saleorderServ.GetSalesOrders(this.oClient).then((res)=>{
      this.data_saleorder = res;
      
      console.log(this.data_saleorder);
      this.initializeItems();
      refresher.complete();
    });

  }
}