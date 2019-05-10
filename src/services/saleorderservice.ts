import 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as xml2js from "xml2js"

import { Storage } from '@ionic/storage';
@Injectable()
export class SaleOrderService {
  public hostWebService:string;
  url:string;
  constructor(private http: Http, private storage: Storage){

    this.storage.get('_url').then((res)=>{
      this.url = res;
      this.hostWebService = "http://"+this.url+"/RF-Service_TeckThai/RFService.asmx";     
    })
  }

  GetSalesOrders(oClient, oUserId, oKeyword, oUserGroup) {
    let parameters='oClient='+oClient+'&oUserId='+oUserId+'&oKeyword='+oKeyword+'&oUserGroup='+oUserGroup;
    return this.http.get(this.hostWebService +"/Get_Sales_Orders?"+parameters)
      .toPromise()
      .then(response =>
        {
            let a;
            xml2js.parseString(response.text(),{explicitArray:false},function (err,result) {
            a = result;
        });
            try {
                return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
        }
      );
  }
  GetOrdersDetails(oClient, oUserId, oUserGroup, oOrderNo) {
    let parameters='oClient='+oClient+'&oUserId='+oUserId+'&oUserGroup='+oUserGroup+'&oOrderNo='+oOrderNo;
    return this.http.get(this.hostWebService +"/Get_Orders_Details?"+parameters)
      .toPromise()
      .then(response =>
        {
            let a;
            xml2js.parseString(response.text(),{explicitArray:false},function (err,result) {
            a = result;
        });
            try {
                return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
            }
            catch (e) {
              return [];
            }
        }
      );
  }
}
