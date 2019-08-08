import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ReportDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage(
  {name:'ReportDetailPage',
  segment: 'ReportDetail'})
@Component({
  selector: 'page-report-detail',
  templateUrl: 'report-detail.html',
})
export class ReportDetailPage {

  data_item:any;
  client:string ="";
  item_no:string ="";
  grade:string ="";
  uom:string ="";
  qty_avail:string ="";
  



  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data_item = navParams.get('item');
    this.client = this.data_item.client;
    this.item_no = this.data_item.item_no;
    this.grade = this.data_item.grade;
    this.uom = this.data_item.uom;
    this.qty_avail = this.data_item.qty_avail;
    
    console.log(this.data_item);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportDetailPage');
  }

}
