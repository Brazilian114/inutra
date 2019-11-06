import 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as xml2js from "xml2js"

import { Storage } from '@ionic/storage';
@Injectable()
export class ReportService {
  public hostWebService:string;
  url:string;
  constructor(private http: Http, private storage: Storage){
     
    //this.getUrl() 
    this.hostWebService = "http://192.168.1.252/RF-Service_Inutra_zenstock/RFService.asmx"
    
   this.storage.get('_url').then((res)=>{
      this.url = res;
    console.log(res);
    
     // this.hostWebService = "http://"+this.url+"/RF-Service_Inutra_zenstock/RFService.asmx";     
    })
    //this.ngOnInit();
  }
  /*ngOnInit(){
    //this.hostWebService = "http://192.168.1.252/RF-Service_GreenTimberland_zenstock/RFService.asmx"
    this.storage.get('_url').then((res)=>{
      this.url = res;
      console.log(res);
      
       this.hostWebService = "http://"+this.url+"/RF-Service_Inutra_zenstock/RFService.asmx";    
      console.log(this.hostWebService);
        
    })
  }*/
  /*
  ionViewWillEnter(){
    this.storage.get('_url').then((res)=>{
      this.url = res;
       this.hostWebService = "http://"+this.url+"/RF-Service_GreenTimberland_zenstock/RFService.asmx";     
    })
  }
  ionViewDidEnter(){
    this.storage.get('_url').then((res)=>{
      this.url = res;
       this.hostWebService = "http://"+this.url+"/RF-Service_GreenTimberland_zenstock/RFService.asmx";     
    })
  }
  getUrl(){
    this.storage.get('_url').then((res)=>{
      this.url = res;
       this.hostWebService = "http://"+this.url+"/RF-Service_GreenTimberland_zenstock/RFService.asmx";     
    })
  }*/

//GET
//NEW
GetSalesOrdersByDateRange(oClient, oStartDate, oEndDate) {
  let parameters='oClient='+oClient+'&oStartDate='+oStartDate+'&oEndDate='+oEndDate;
  return this.http.get(this.hostWebService +"/Get_Sales_Orders_By_Date_Range?"+parameters)
    .toPromise()
    .then(response =>
      {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
      });
          try {
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table; //explicitArray false
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table //explicitArray true
          }
          catch (e) {
            return [];
          }
      }
    );
  } 
  GetSalesOrdersByPending(oClient) {
    let parameters='oClient='+oClient;
    return this.http.get(this.hostWebService +"/Get_Sales_Orders_By_Pending?"+parameters)
      .toPromise()
      .then(response =>
        {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
        });
            try {
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table; //explicitArray false
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table //explicitArray true
            }
            catch (e) {
              return [];
            }
        }
      );
    } 
  Rpt_inventory_movement(oClient, oWarehouse, oZone, oItem_fr, oItem_to, oDescription, oLoc_fr, oLoc_to, oGroup, oGrade, oOrder_by) {
    this.storage.get('_url').then((res)=>{
      this.url = res;
      this.hostWebService = "http://"+this.url+"/RF-Service_GreenTimberland_zenstock/RFService.asmx";  
    })
    let parameters='oClient='+oClient+'&oWarehouse='+oWarehouse+'&oZone='+oZone+'&oItem_fr='+oItem_fr+'&oItem_to='+oItem_to
    +'&oDescription='+oDescription+'&oLoc_fr='+oLoc_fr+'&oLoc_to='+oLoc_to+'&oGroup='+oGroup+'&oGrade='+oGrade+'&oOrder_by='+oOrder_by;
    return this.http.get(this.hostWebService +"/Rpt_inventory_movement?"+parameters)
      .toPromise()
      .then(response =>
        {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
        });
            try {
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table; //explicitArray false
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table //explicitArray true
            }
            catch (e) {
              return [];
            }
        }
      );
    } 
}
