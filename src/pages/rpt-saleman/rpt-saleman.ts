import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the RptSalemanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage(
  {name:'RptSalemanPage',
  segment: 'RptSalemanPage'}
)
@Component({
  selector: 'page-rpt-saleman',
  templateUrl: 'rpt-saleman.html',
})
export class RptSalemanPage {
  oUsername:string = "";
  oUserGroup:string = "";
  oUserId:string = "";
  newpost:any;
  constructor(public storage:Storage,public navCtrl: NavController, public navParams: NavParams) {
 this.doGetStorage(); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RptSalemanPage');
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
