import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams ,Content} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ReportService } from '../../services/reportservice';
/**
 * Generated class for the RptSalemanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage(
  {name:'RptPendingPage',
  segment: 'RptPendingPage'}
)
@Component({
  selector: 'page-rpt-pending',
  templateUrl: 'rpt-pending.html',
})
export class RptPendingPage {
  @ViewChild(Content) pageTop: Content;
  public pageScroller(){
    this.pageTop.scrollToTop();
  }
  oUsername:string = "";
  oUserGroup:string = "";
  oUserId:string = "";
  newpost:any;
  oClient:string = "7LINE";
  data_getsaleorder_bypending:any;
  items:any;
  constructor(public reportServ:ReportService,public storage:Storage,public navCtrl: NavController, public navParams: NavParams) {
 this.doGetStorage(); 
 this.doGetSalesOrdersByPending();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RptPendingPage');
  }
  initializeItems(){
  this.items = this.data_getsaleorder_bypending;
  }
  doGetSalesOrdersByPending(){
    this.reportServ.GetSalesOrdersByPending(this.oClient).then((res)=>{
      this.data_getsaleorder_bypending = res;
  
      console.log(this.data_getsaleorder_bypending);
      
      this.initializeItems();

    })
  }
  onInput(ev: any){
    this.initializeItems();
   let val = ev.target.value;
    if(val && val.trim() != ''){
      this.data_getsaleorder_bypending = this.data_getsaleorder_bypending.filter((item)=>{
        return (item.status["0"].toLowerCase().indexOf(val.toLowerCase()) > -1 || item.order_no["0"].toLowerCase().indexOf(val.toLowerCase()) > -1  || item.customer["0"].toLowerCase().indexOf(val.toLowerCase()) > -1 ||  item.customer_name["0"].toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }else{
      this.doGetSalesOrdersByPending();
    }
  }
  doDetails(item){
    this.navCtrl.push("RptSaleOrderDetailsPage", { item: item });
  }
  doGetStorage(){
    this.storage.get('_user').then((res)=>{
      this.oUsername = res;
      console.log(this.oUsername);
      
    })  
    this.storage.get('_userId').then((res)=>{
      this.oUserId = res;
    })  
    
    this.storage.get('_userGroup').then((res)=>{
      this.oUserGroup = res;
    })  
  }
}
