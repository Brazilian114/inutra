import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { IonicPage, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Chart } from 'chart.js';
import { Utility } from '../../../helper/utility';
import { SaleService } from '../../../services/salseservice';
import { DatePipe } from '@angular/common'
import { ReportService } from '../../../services/reportservice';
@IonicPage(
  {name:'SaleMenuPage',
  segment: 'SaleMenu'}
)

@Component({
  selector: 'page-salesmenu',
  templateUrl: 'salesmenu.html'
})
export class SaleMenuPage{
  @ViewChild("barCanvas") barCanvas: ElementRef;
  @ViewChild("doughnutCanvas") doughnutCanvas: ElementRef;
  @ViewChild("lineCanvas") lineCanvas: ElementRef;
  
  private barChart: Chart;
  private doughnutChart: Chart;
  private lineChart: Chart;
  oClient:string = "7LINE";
  select:any;
  sumAmount:number;
  //test:string ="";
  oUsername:string = "";
  oUserGroup:string = "";
  oUserId:string = "";
  //oStartDate: String = "2019/08/20";
  //oEndDate:   String =  "2019/08/20";
  oStartDate: String = new Date().toISOString().substring(0, 10);
  oEndDate: String = new Date().toISOString().substring(0, 10);
  //oStartDate: String="";
  //oEndDate: String="";
  oAmount:any;
  oDiscount:any;
  items:any;
  posts:any;
  var_x:any;
  var_y:any;
  dataInvoiceGraph:any;
  item:any;
  slic:string="";
  sum:any;
  data_getsaleorder_bydate:any;
  data_saleorderdetail:any;
  sum_discount1:any;
  sum_discount2:any;
  sum_discount3:any;
  sum2:any;
  car:any;
  public format: any = [];
  public sum_price: any = [];
  public sum_price2: any = [];
  public sum_vat: any = [];
  public sum_amount: any = [];
  latest_date:any;
  var_z:any;
  var_a:any;
  public format2: any = [];
  date_time:any;
  
  
  constructor( private reportServ: ReportService,public datepipe: DatePipe,public navCtrl: NavController, private utility: Utility, private saleServ: SaleService, private storage: Storage) {
    
    this.reportServ.GetSalesOrdersByDateRange(this.oClient, this.oUserId, this.oStartDate, this.oEndDate, this.oUserGroup);
  }
  ionViewWillEnter(){
    this.doGetStorage();
    this.reportServ.GetSalesOrdersByDateRange(this.oClient, this.oUserId, this.oStartDate, this.oEndDate, this.oUserGroup);
    this.doGetInvoiceGraph(this.oStartDate, this.oEndDate);
  }
  initializeItems() {
    this.items = this.dataInvoiceGraph;
  }
  doReservation(){
    this.navCtrl.push("SaleReservationPage");
  }
 
  doCirculation(){
    this.navCtrl.push("CirculationPage");
  }
  


  doGetInvoiceGraph(oStartDate, oEndDate) {
    this.reportServ.GetSalesOrdersByDateRange(this.oClient, this.oUserId, oStartDate, oEndDate, this.oUserGroup).then((res)=>{
      this.dataInvoiceGraph = res;

      if(this.dataInvoiceGraph.length <= 0 ){
            this.sumAmount = 0.00;
            
      }else{
      console.log(this.dataInvoiceGraph);   
      
      this.date_time = this.dataInvoiceGraph["0"].last_update;     
      this.oAmount = this.dataInvoiceGraph.amount;
      this.var_y = this.dataInvoiceGraph.map(data => data.last_update)
      var this_date = this.datepipe.transform(this.oStartDate, 'dd/MM/yyyy');

      for(let i=0;i<this.var_y.length;i++){
        if(this.dataInvoiceGraph[i].net_amount == undefined){
          //this.dataInvoiceGraph[i].amount = ["0.00"];
        }else{
        this.format = this.datepipe.transform(this.var_y[i], 'HH.mm');       
        this.format2.push(this.format);
        }   
      }
   // console.log(this.format2);

      for(let i=0;i<this.dataInvoiceGraph.length;i++){
        if(this.dataInvoiceGraph[i].discount_type == "percent"){
          var rate1 = this.dataInvoiceGraph[i].amount * this.dataInvoiceGraph[i].discount_rate / 100
          this.sum_discount1 = this.dataInvoiceGraph[i].amount -  rate1;
          } else{
            this.sum_discount1 =  parseFloat(this.dataInvoiceGraph[i].amount) - parseFloat(this.dataInvoiceGraph[i].discount_rate)
          }
          
          if(this.dataInvoiceGraph[i].discount_type_2 == "percent"){
            var rate2 = this.sum_discount1 * this.dataInvoiceGraph[i].discount_rate_2 / 100
            this.sum_discount2 = this.sum_discount1 -  rate2;
          }else{
            this.sum_discount2 =  parseFloat(this.sum_discount1) - parseFloat(this.dataInvoiceGraph[i].discount_rate_2)
          }
          
          if(this.dataInvoiceGraph[i].discount_type_3 == "percent"){
            var rate2 = this.sum_discount2 * this.dataInvoiceGraph[i].discount_rate_3 / 100
            this.sum_discount3 = this.sum_discount2 -  rate2;
          }else{
            this.sum_discount3 =  parseFloat(this.sum_discount2) - parseFloat(this.dataInvoiceGraph[i].discount_rate_3)
          }
          
          //var sum_rate = this.sum_discount1 + this.sum_discount2 + this.sum_discount3
          //onsole.log(sum_rate);

        if(this.dataInvoiceGraph[i].net_amount == undefined){
          this.sum_price = this.dataInvoiceGraph[i].amount      
        
        }else{
        //this.oDiscount = parseInt(this.dataInvoiceGraph[i].discount_rate);
        this.sum_price = this.sum_discount3;
        this.sum_vat = this.sum_price * this.dataInvoiceGraph[i].vat_rate / 100
        this.sum_amount =  parseFloat(this.sum_price + this.sum_vat).toFixed(2);
        this.sum_price2.push(this.sum_amount);
        }
      } 
      
      console.log(this.sum_price2);
     
     
         //console.log(this.var_y);
         //console.log(this.test5);

      let index = 0;
      for (let array of this.sum_price2) {
    
        index += parseInt(array);
        this.sum = index.toFixed(2);       
        } 
     this.sumAmount = this.sum;
      //console.log(this.sum);

      this.lineChart  = new Chart(this.lineCanvas.nativeElement, {
        type: "line",
        data: {
          labels: this.format2,
          datasets: [
            {
              label: "ยอดขายวันที่ "+ this_date,
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: "butt",
              borderDash: [ ],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 0,
              pointHoverRadius: 3,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 5,
              pointRadius: 1,
              pointHitRadius: 5,
              data: this.sum_price2,
              spanGaps: true
            }
          ]
          
        }
      });
    
    }
    })
    return true;

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
}
