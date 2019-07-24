import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { IonicPage, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Chart } from 'chart.js';
import { Utility } from '../../../helper/utility';
import { SaleService } from '../../../services/salseservice';
import { DatePipe } from '@angular/common'
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
  oClient:string = "7LINE";
  test:string ="";
  oUsername:string = "";
  oUserGroup:string = "";
  oUserId:string = "";
  //oStartDate: String = "";
  //oEndDate: String = "";
  //oStartDate: String = "2019-07-22";
  //oEndDate: String = "2019-07-22";
  oStartDate: String = new Date().toISOString().substring(0, 10);
  oEndDate: String = new Date().toISOString().substring(0, 10);
  oAmount: String = "";
  private barChart: Chart;
  private doughnutChart: Chart;
  private lineChart: Chart;
  items:any;
  posts:any;
  var_x:any;
  var_y:any;
  dataInvoiceGraph:any;
  item:any;
  slic:string="";
  sum:any;
  number1:any;
  number2:any;
  number3:any;
  date1:any;
  date2:any;
  date3:any;
  slice1:any;
  //latest_date:any;
  
  constructor(public datepipe: DatePipe,public navCtrl: NavController, private utility: Utility, private saleServ: SaleService, private storage: Storage) {
    this.doGetStorage();

    this.doGetInvoiceGraph(this.oStartDate, this.oEndDate);
    //this.ngOnInit(this.oStartDate, this.oEndDate);
  }
  doReservation(){
    this.navCtrl.push("SaleReservationPage");
  }
 
  doCirculation(){
    this.navCtrl.push("CirculationPage");
  }
  doGetInvoiceGraph(oStartDate, oEndDate){
    this.saleServ.GetInvoiceGraph(this.oClient, this.oUserId, this.oUserGroup, oStartDate, oEndDate).then((res)=>{
      this.dataInvoiceGraph = res; 
      console.log(this.dataInvoiceGraph);   
      this.oAmount = this.dataInvoiceGraph["0"].amount;
      this.test = this.dataInvoiceGraph["0"].invoice_date;
      
      this.var_x = this.dataInvoiceGraph.map(data => data.amount)
      
      this.var_y = this.dataInvoiceGraph.map(data => data.invoice_date)
      //var x1 = this.var_x["0"];
      //var x2 = this.var_x["1"];
      //var x3 = this.var_x["2"];
      this.number1 = parseInt(this.var_x["0"]);
      this.number2 = parseInt(this.var_x["1"]);
      this.number3 = parseInt(this.var_x["2"]);
      this.sum = this.number1 + this.number2 + this.number3
      this.date1 = this.var_y["0"]["0"];
      this.date2 = this.var_y["1"]["0"];
      this.date3 = this.var_y["2"]["0"];
      var number3 = parseInt(this.var_x["2"]);
      let i;
      /*
      for(i = 0; i < this.var_x.length ; i++ ){
        this.number1 = parseInt(this.var_x);
      this.sum = this.number1[i];
      }*/
      console.log(this.var_y);
      
      console.log(this.sum);
      console.log(this.date1);
      //var removed = this.var_y.trim(2, 0, "water");  
      var latest_date =this.datepipe.transform(this.test, 'dd-MM-yyyy');
      //var date = this.var_y.next.format('YYYY-MM-DD');
      //this.var_y = new Date().getTime()
      //this.var_y = this.dataInvoiceGraph.map(data => data.start_date)
      console.log(latest_date);
      //console.log(x1);
      
      
      //console.log(removed);
      
      var slice1 = this.date1.slice(11, this.date1.length-6);
      var slic2 = this.date2.slice(11, this.date2.length-6);
      var slic3 = this.date3.slice(11, this.date3.length-6);
      //var slic4 = this.date3.slice(11, this.date3.length-6);
     // console.log(this.slice1 +" "+ slic2 +" "+ slic3);
      
      
      
      //console.log(date);
      
      this.lineChart = new Chart(this.lineCanvas.nativeElement, {
        type: "line",
        data: {
          labels:  [slice1,slic2,slic3],
          datasets: [
            {
              label: "ยอดขายวันที่ "+latest_date,
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 3,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: this.var_x,
              spanGaps: true
            }
          ]
        }
      });
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

  
  
  
}
