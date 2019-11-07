import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ModalController,Content } from 'ionic-angular';

import { Utility } from '../../../helper/utility';
import { CustomerService } from '../../../services/customerservice';

@IonicPage(
  {name:'CustomerHeaderPage',
  segment: 'CustomerHeader'}
)

@Component({
  selector: 'page-customer-header',
  templateUrl: 'customer-header.html'
})
export class CustomerHeaderPage {
  @ViewChild(Content) pageTop: Content;
  public pageScroller(){
    this.pageTop.scrollToTop();
  }
  oClient:string = "INT";
  oSearch:string = "";
  oPrice1:string = "";
  oPrice2:string = "";
  data_customer:any;
  hasMoreData:any = true;
  hideMe:any = true;
  items= [];
  items2 = [];
  constructor(public navCtrl: NavController, private modalCtrl: ModalController, private utility: Utility, private customerServ: CustomerService) {

  } 
  ionViewWillEnter(){
    this.doGetCustomerDetails();
  }
  initializeItems() {
    this.items2 = this.data_customer;   
    for(let i = 0; i < 30; i++){
      this.items.push(this.items2[i]);
      }  
      console.log(this.items);
      
  }
/*
  doInfinite(ionInfinite) {
    console.log("Start Scroll");
      setTimeout(() => {      
       for(let i = 0; i < 30; i++){
         this.item2.push(this.data_customer[this.item2.length]);
         } 
        
        if (this.item2.length > this.data_customer.length) {
          ionInfinite.enable(false);
          this.hasMoreData = false;
        } else {
          ionInfinite.enable(true);
          this.hasMoreData = true;
        }
       
       console.log('End Scroll');      
       ionInfinite.complete();
       
         }, 500);  
      
   }*/

   onInput(ev: any){
    this.initializeItems();
     console.log(this.items);
     
   let val = ev.target.value;
    if(val && val.trim() != ''){
      this.items = this.items2.filter((item)=>{
        return (item.customer["0"].toLowerCase().indexOf(val.toLowerCase()) > -1 ||  item.customer_name["0"].toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }else{
      this.items = [];
      this.initializeItems();
      
    }
  }
  /*
  doShowHide(){
    if(this.hideMe == false){
      this.hideMe = true;
    }else{
      this.hideMe = false;
    }
  }*/
  doGetCustomerDetails(){
    this.customerServ.GetCustomerDetails(this.oClient).then((res)=>{
      this.data_customer = res;
      console.log(this.data_customer);    
      this.initializeItems();
    })
  }
  doDetails(item){ 
    this.utility.presentLoading();
    let modal = this.modalCtrl.create("CustomerDetailsPage",{ item: item })
    
    modal.present();
    this.utility.finishLoding();
  }
}
