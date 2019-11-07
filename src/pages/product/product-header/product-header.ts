import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController,Content } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Utility } from '../../../helper/utility';

import { ProductService } from '../../../services/productservice';
@IonicPage(
  {name:'ProductHeaderPage',
  segment: 'ProductHeader'}
)

@Component({
  selector: 'page-product-header',
  templateUrl: 'product-header.html',
  providers: [ProductService]
})
export class ProductHeaderPage {
  @ViewChild(Content) pageTop: Content;
  public pageScroller(){
    this.pageTop.scrollToTop();
  }
  hideMe:any = true;
  data_product:any;
  oClient:string = "INT";
  items:any;
  items2 = [];
  oSearch:string = "";
  flagSearch: boolean = false;
  constructor(public navCtrl: NavController, private utility: Utility, private storage: Storage, private productServ: ProductService) {
    
  }
  ionViewWillEnter(){
    //this.getProductByKeyword(this.oSearch);
    this.getProductTop30()


  }
  initializeItems() {
    this.items = this.data_product; 
   /* this.items2 = this.data_product; 
    for(let i = 0; i < 30; i++){
      this.items.push(this.items2[i]);
      } */
      console.log(this.items);
      
    }
  /*
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    if(this.items.length >= this.data_product.length){
      //infiniteScroll.enable(false);
      var sum
      sum = this.items.length  - this.data_product.length;
      console.log(sum);
      
      for (let i = 0; i < sum; i++) {
        this.items.push( this.data_product[this.items.length] );
      }
    }else{
    setTimeout(() => {
      for (let i = 0; i < 31; i++) {
        this.items.push( this.data_product[this.items.length] );
      }
        console.log(this.items.length);

    
      console.log('Async operation has ended');
      infiniteScroll.complete();

    }, 500);
  }
  }*/
  /*doShowHide(){
    if(this.hideMe == false){
      this.hideMe = true;
    }else{
      this.hideMe = false;
    }
  }*/
  onInput(ev: any){
    this.initializeItems();
    console.log(this.items2);
  let val = ev.target.value;
   if(val && val.trim() != ''){
     this.items = this.items.filter((item)=>{
       return (item.item_no["0"].toLowerCase().indexOf(val.toLowerCase()) > -1 ||  item.description["0"].toLowerCase().indexOf(val.toLowerCase()) > -1);
     })
     console.log(this.items);
     
   }
 }
  doDetails(item){
    this.utility.presentLoading();
    this.navCtrl.push("ProductDetailsPage",{ item: item })
    this.utility.finishLoding();
  }
  getProductTop30(){
    //this.utility.presentLoading();
    this.productServ.GetProductTop30(this.oClient).then((res)=>{
      this.data_product = res;
      console.log(this.data_product);
      this.initializeItems();
      this.utility.finishLoding();     
    })
  }
  
  getProductByKeyword(oKeyword){
    //this.utility.presentLoading();
    this.productServ.GetProductByKeyword(this.oClient, oKeyword).then((res)=>{
      this.data_product = res;
      console.log(this.data_product); 
      this.utility.finishLoding();    
    })
  }
}
