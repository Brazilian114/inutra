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
  //test:string ="";
  oUsername:string = "";
  oUserGroup:string = "";
  oUserId:string = "";
  //oStartDate: String = "2019-07-26";
  //oEndDate:   String = "2019-07-26";
  oStartDate: String = new Date().toISOString().substring(0, 10);
  oEndDate: String = new Date().toISOString().substring(0, 10);
  oAmount: String = "";
  private lineChart: Chart;
  items:any;
  posts:any;
  var_x:any;
  var_y:any;
  dataInvoiceGraph:any;
  item:any;
  slic:string="";
  sum:any;
  
  sum2:any;
  car:any;
  public format: any = [];
  latest_date:any;
  var_z:any;
  var_a:any;
  public format2: any = [];
  date_time:any;
  
  
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
      if(this.dataInvoiceGraph.length <= 0 ){
            this.sum = "0"
          
      }else{
      console.log(this.dataInvoiceGraph);   
      this.oAmount = this.dataInvoiceGraph["0"].amount;
      this.date_time = this.dataInvoiceGraph["0"].invoice_date;     
      this.var_x = this.dataInvoiceGraph.map(data => data.amount)
      
      this.var_y = this.dataInvoiceGraph.map(data => data.invoice_date)
      var this_date =this.datepipe.transform(this.date_time, 'dd/MM/yyyy');
      
      for(let i=0;i<this.var_y.length;i++){
       
        this.format = this.datepipe.transform(this.var_y[i], 'HH.mm');       
        this.format2.push(this.format);

      }
         //console.log(this.var_y);
         //console.log(this.test5);

      let index = 0;
      for (let array of this.dataInvoiceGraph) {
        index += parseInt(array.amount);
        this.sum = index.toFixed(2);       
        
      }
/*
      let sum5=[];
      for (this.car of this.dataInvoiceGraph) {
        
        this.format = this.datepipe.transform(this.car.invoice_date, 'HH:mm:ss');
        sum5 = this.format;
        this.sum2 = sum5;
       
        this.test2.push(this.sum2);

      }
      
console.log(this.test2);*/
      

      this.lineChart = new Chart(this.lineCanvas.nativeElement, {
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
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 4,
              pointHoverRadius: 3,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 5,
              pointRadius: 1,
              pointHitRadius: 5,
              data: this.var_x,
              spanGaps: true
            }
          ]
        }
      });
    }
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
