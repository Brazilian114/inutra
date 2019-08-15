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
  //test:string ="";
  oUsername:string = "";
  oUserGroup:string = "";
  oUserId:string = "";
  //oStartDate: String = "2019/08/14";
  //oEndDate:   String =  "2019/08/14";
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
  sum2:any;
  car:any;
  public format: any = [];
  public sum_price: any = [];
  public sum_price2: any = [];
  latest_date:any;
  var_z:any;
  var_a:any;
  public format2: any = [];
  date_time:any;
  
  
  constructor( private reportServ: ReportService,public datepipe: DatePipe,public navCtrl: NavController, private utility: Utility, private saleServ: SaleService, private storage: Storage) {
    this.doGetStorage();
    
    this.doGetInvoiceGraph(this.oStartDate, this.oEndDate);
    //this.ngOnInit(this.oStartDate, this.oEndDate);
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
            this.sum = "0.00"
            
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
        if(this.dataInvoiceGraph[i].net_amount == undefined){
          this.sum_price = this.dataInvoiceGraph[i].amount      
        
        }else if(this.dataInvoiceGraph[i].discount_type == "percent"){
          
          var sum_discount = this.dataInvoiceGraph[i].amount * this.dataInvoiceGraph[i].discount_rate / 100
          this.sum_price = this.dataInvoiceGraph[i].amount - sum_discount
          this.sum_price2.push(this.sum_price);
        }else{
        this.oDiscount = parseInt(this.dataInvoiceGraph[i].discount_rate);
        this.sum_price = this.dataInvoiceGraph[i].amount -  this.oDiscount;
        this.sum_price2.push(this.sum_price);
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
