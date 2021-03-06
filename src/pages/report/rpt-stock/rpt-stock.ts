import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Content } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ProductService } from '../../../services/productservice';
import { Utility } from '../../../helper/utility';
import { ReportService } from '../../../services/reportservice';
import { AlertController } from 'ionic-angular';
@IonicPage(
  {name:'RptStockPage',
  segment: 'RptStock'}
)

@Component({
  selector: 'page-rpt-stock',
  templateUrl: 'rpt-stock.html'
})
export class RptStockPage {
  
  @ViewChild(Content) pageTop: Content;
  public pageScroller(){
    this.pageTop.scrollToTop();
  }
  public pagingEnabled: boolean = true;
  oClient:string = "INT";
  oGrade:string = "001";
  oUsername:string = "";
  oUserGroup:string = "";
  oUserId:string = "";
  newpost:any;
  startItem:any;
  endItem:any;
  hasMoreData:any="true";
  data_rpt_inventory:any;
  data_saleorderdetail:any;
  Rpt_inventory_movement:any;
  item2 = [];
  items= [];
  
  data_product:any;
  data_product_by_item:any
  oSearch:string="";
  constructor(public presentToast:AlertController ,public productServ:ProductService,public navCtrl: NavController, private utility: Utility, private reportServ: ReportService, private storage: Storage) {
   
  } 
  ionViewWillEnter(){
   // this.doGetStorage();
    this.getProductTop30();
    //this.doGetRptInventoryMovement(this.oClient, "", "", "", "", "", "", "", "",this.oGrade, "ITEM NO");
  }
  initializeItems() {
    this.items = this.data_product;
    //this.items = this.GetProductTop30;
    //console.log(this.items);
    
    /*
    for(let i = 0; i < 30; i++){
      this.items.push(this.data_rpt_inventory[this.items.length]);
      }  */
  }

  /*doInfinite(ionInfinite) {
    console.log("Start Scroll");
      setTimeout(() => {      
       for(let i = 0; i < 30; i++){
         this.item2.push(this.data_rpt_inventory[this.item2.length]);
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
      this.items = this.items.filter((item)=>{
        return (item.item_no["0"].toLowerCase().indexOf(val.toLowerCase()) > -1 || item.description["0"].toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  doGetRptInventoryMovement(oClient, oWarehouse, oZone, oItem_fr, oItem_to, oDescription, oLoc_fr, oLoc_to, oGroup, oGrade, oOrder_by){
    this.reportServ.Rpt_inventory_movement(oClient, oWarehouse, oZone, oItem_fr, oItem_to, oDescription, oLoc_fr, oLoc_to, oGroup, oGrade , oOrder_by).then((res)=>{
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
  getProductTop30(){
    this.utility.presentLoading();
    this.productServ.GetProductTop30(this.oClient).then((res)=>{
      this.data_product = res;
      console.log("data",this.data_product);
      this.initializeItems();
      this.utility.finishLoding();     
    })
  }
  
  GetProductStockByItem(startItem,endItem){
    
    if(startItem == undefined || startItem == "" || endItem == undefined || endItem == ""){
      this.utility.presentToast("กรุณาเลือก Item ให้ครบ", false, 'buttom');
    }else{
      this.utility.presentLoading();
    console.log(startItem,endItem);
    this.productServ.GetProductByItem(this.oClient,startItem,endItem).then((res)=>{
      this.data_product_by_item = res;
      console.log("product by item",this.data_product_by_item);
      //this.initializeItems();
      this.utility.finishLoding();  
       
    })
  }
   
  }
  clear(){
      this.startItem = ""
      this.endItem = ""
      this.data_product_by_item = [];
  }

   doDetails(item){
    this.utility.presentLoading();
    this.navCtrl.push("ReportDetailPage",{ item: item })
    this.utility.finishLoding();
  }


/*
doInfinite(e): Promise<any> {
  console.log("Begin async operation");
     return new Promise(resolve => {
     setTimeout(() => {
        this.authService.postData(this.userPostData, "feed").then(
        result => {
           this.resposeData = result;
           if (this.resposeData.feedData.length) {
              const newData = this.resposeData.feedData;
              this.userPostData.lastCreated = this.resposeData.feedData[newData.length - 1].created;
  
       for (let i = 0; i < newData.length; i++) {
          this.dataSet.push(newData[i]);
       }
  } else {
      this.noRecords = true;
       console.log("No user updates");
  }
  },
  err => {
  //Connection failed message
  }
  );
  resolve();
  }, 500);
  });
  }*/

/*
  doInfinite(ionInfinite) {
    console.log("Start Scroll");
      setTimeout(() => {      
       for(let i = 0; i < 30; i++){
         this.items.push(this.data_rpt_inventory[this.items.length]);
         } 
       console.log('End Scroll');      
       ionInfinite.complete();
         }, 500);  
   }*/
}
