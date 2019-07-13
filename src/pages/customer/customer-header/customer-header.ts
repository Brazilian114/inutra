import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';

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

  oClient:string = "7LINE";
  oSearch:string = "";

  data_customer:any;

  hideMe:any = true;
  items: any;
  constructor(public navCtrl: NavController, private modalCtrl: ModalController, private utility: Utility, private customerServ: CustomerService) {

  } 
  ionViewWillEnter(){
    this.doGetCustomerDetails(this.oSearch);
  }
  initializeItems() {
    this.items = this.data_customer;
  }
  onInput(ev: any){
    this.initializeItems();
     console.log(this.items);
   let val = ev.target.value;
    if(val && val.trim() != ''){
      this.items = this.items.filter((item)=>{
        return (item.customer_name["0"].toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  doShowHide(){
    if(this.hideMe == false){
      this.hideMe = true;
    }else{
      this.hideMe = false;
    }
  }
  doGetCustomerDetails(oSearch){
    this.customerServ.GetCustomerDetails(this.oClient, oSearch).then((res)=>{
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
