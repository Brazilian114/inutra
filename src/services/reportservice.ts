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
  //this.hostWebService = "http://"+this.url+"/RF-Service_GreenTimberland_zenstock/RFService.asmx";
    this.storage.get('_url').then((res)=>{
      this.url = res;
      this.hostWebService = "http://"+this.url+"/RF-Service_GreenTimberland_zenstock/RFService.asmx";
    })
    
  }
  ngOnInit() {
  
     this.storage.get('_url').then((res)=>{
      this.url = res;
      this.hostWebService = "http://"+this.url+"/RF-Service_GreenTimberland_zenstock/RFService.asmx";
     })
}

//GET
//NEW
GetSalesOrdersByDateRange(oClient, oUserId, oStartDate, oEndDate, oUserGroup) {
  let parameters='oClient='+oClient+'&oUserId='+oUserId+'&oStartDate='+oStartDate+'&oEndDate='+oEndDate+'&oUserGroup='+oUserGroup;
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
  Rpt_inventory_movement(oClient, oWarehouse, oZone, oItem_fr, oItem_to, oDescription, oLoc_fr, oLoc_to, oGroup, oGrade, oOrder_by) {
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
