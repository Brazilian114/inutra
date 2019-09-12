import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductService } from '../../services/productservice';
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

  data_productuom:any;
  data_productstock:any;

  oQty_Avail:string = "";
  oUom:string = "";
  oPrice:string = "";

  oItem_Qty:string = "";
  oItem_Uom:string = "";
  oPrice1:string = "";
  oPrice2:string = "";
  oClient:string = "7LINE";
  oItemNo:string = ""; 
  oGrade:string = "001"; 
  oQty_Free:string = ""; 
  oLotNo:string = ""; 
  oBatchNo:string = ""; 
  oItemSize:string = ""; 
  oItemColor:string = "";
  oItemClass:string = "";
  oWarehouse:string = "";
  oZone:string = "";
  oItemPacking:string = "";
  oExpiryDate:string = "";
  oProdDate:string = ""; 
  oLocation:string = ""; 
  oPalletNo:string = "";
  oOiNo:string = "";


  constructor(private productServ: ProductService,public navCtrl: NavController, public navParams: NavParams) {
    this.data_item = navParams.get('item');
    this.client = this.data_item.client;
    this.item_no = this.data_item.item_no;
    this.grade = this.data_item.default_grade;
    this.uom = this.data_item.uom;
    this.qty_avail = this.data_item.qty_avail;
    
    console.log(this.data_item);
    this.doGetProductStock();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportDetailPage');
  }
  doGetProductStock(){
    this.productServ.GetProductStock(this.oClient,"ALL", this.data_item.item_no, this.oGrade, this.oLotNo, this.oBatchNo, this.oItemSize
      , this.oItemColor, this.oItemClass, this.oWarehouse, this.oZone, this.oItemPacking, this.oExpiryDate, this.oProdDate
      , this.oLocation, this.oPalletNo, this.oOiNo).then((res)=>{
      this.data_productstock = res;
      console.log(this.data_productstock);
   
      if(this.data_productstock.length <= 0){
        this.oQty_Avail = "0.00";
        this.oUom = "PCS";
        this.oPrice = "0.00";
        
      }else{
        var qty_avail = +this.data_productstock["0"].qty_avail
        this.oQty_Avail = qty_avail.toFixed(0);
        var qty_free = +this.data_productstock["0"].qty_free
        this.oQty_Free = qty_free.toFixed(0);
        this.oUom = this.data_productstock["0"].uom;
        this.oPrice = this.data_productstock["0"].unit_price;
       
      }
      if(this.data_productstock["0"].price_assemble == undefined || this.data_productstock["0"].price_assemble_no == undefined ){
        this.oPrice1 = "-";
        this.oPrice2 = "-";
    
      }else{
       
        var price1 = +this.data_productstock["0"].price_assemble_no
        var price2 = +this.data_productstock["0"].price_assemble
        this.oPrice1 = price1.toFixed(2)+" ฿";
        this.oPrice2 = price2.toFixed(2)+" ฿";
      }  
      
    })
  }
}
