import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Utility } from '../../helper/utility';

@IonicPage(
  {name:'HomePage',
  segment: 'Home'}
)

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private utility: Utility, private storage: Storage) {

  }
  doProductHeaderPage(){
    this.utility.presentLoading();
    this.navCtrl.push("ProductHeaderPage")
    this.utility.finishLoding();
  }
  doCustomerHeaderPage(){
    this.utility.presentLoading();
    this.navCtrl.push("CustomerHeaderPage")
    this.utility.finishLoding();
  }
  doSaleOrderListPage(){
    this.utility.presentLoading();
    this.navCtrl.push("SaleOrderListPage")
    this.utility.finishLoding();
  }
  doSaleMenuPage(){
    this.utility.presentLoading();
    this.navCtrl.push("SaleMenuPage")
    this.utility.finishLoding();
  }
  doReportMenuPage(){
    this.utility.presentLoading();
    this.navCtrl.push("ReportMenuPage")
    this.utility.finishLoding();
  }
  doLogout(){
    this.storage.remove("_user");
    this.storage.remove("_userId");
    this.storage.remove("_userGroup");
    this.navCtrl.setRoot("LoginPage");
  }
}
