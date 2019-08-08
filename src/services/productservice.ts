import 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as xml2js from "xml2js"

import { Storage } from '@ionic/storage';
@Injectable()
export class ProductService {
  public hostWebService:string;
  url:string;
  constructor(private http: Http, private storage: Storage){
    this.hostWebService = "http://192.168.1.252/RF-Service_GreenTimberland_zenstock/RFService.asmx";  
    this.storage.get('_url').then((res)=>{
      this.url = res;
      //this.hostWebService = "http://"+this.url+"/RF-Service_GreenTimberland_zenstock/RFService.asmx";     
    })
  }

  GetProductTop30(oClient,oKeyword) {
   let parameters='oClient='+oClient+'&oKeyword='+oKeyword;;
   return this.http.get(this.hostWebService +"/Get_Product_Top_30?"+parameters)
     .toPromise()
     .then(response =>
        {
           let a;
           xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
           a = result;
        });
           try {
              //return a.DataTable["diffgr:diffgram"].NewDataSet.Table; //explicitArray false
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table //explicitArray true
           }
           catch (e) {
             return [];
           }
        }
     );
  }  
  GetProductByKeyword(oClient, oKeyword) {
    let parameters='oClient='+oClient+'&oKeyword='+oKeyword;
    return this.http.get(this.hostWebService +"/Get_Product_By_Keyword?"+parameters)
      .toPromise()
      .then(response =>
        {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
        });
            try {
                //return a.DataTable["diffgr:diffgram"].NewDataSet.Table; //explicitArray false
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table //explicitArray true
            }
            catch (e) {
              return [];
            }
        }
      );
  }
  GetProductUom(oClient, oItemNo) {
    let parameters='oClient='+oClient+'&oItemNo='+oItemNo;
    return this.http.get(this.hostWebService +"/Get_Product_Uom?"+parameters)
      .toPromise()
      .then(response =>
        {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
        });
            try {
                //return a.DataTable["diffgr:diffgram"].NewDataSet.Table; //explicitArray false
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table //explicitArray true
            }
            catch (e) {
              return [];
            }
        }
      );
  }
  GetProductStock(oClient, oCustomer, oItemNo, oGrade, oLotNo, oBatchNo, oItemSize, oItemColor
    , oItemClass, oWarehouse, oZone, oItemPacking, oExpiryDate, oProdDate, oLocation, oPalletNo, oOiNo) {
    let parameters='oClient='+oClient+'&oCustomer='+oCustomer+'&oItemNo='+oItemNo+'&oGrade='+oGrade+'&oLotNo='+oLotNo+'&oBatchNo='+oBatchNo
    +'&oItemSize='+oItemSize+'&oItemColor='+oItemColor+'&oItemClass='+oItemClass+'&oWarehouse='+oWarehouse+'&oZone='+oZone
    +'&oItemPacking='+oItemPacking+'&oExpiryDate='+oExpiryDate+'&oProdDate='+oProdDate+'&oLocation='+oLocation
    +'&oPalletNo='+oPalletNo+'&oOiNo='+oOiNo;
    return this.http.get(this.hostWebService +"/Get_Product_Stock?"+parameters)
      .toPromise()
      .then(response =>
        {
            let a;
            xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
            a = result;
        });
            try {
                //return a.DataTable["diffgr:diffgram"].NewDataSet.Table; //explicitArray false
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table //explicitArray true
            }
            catch (e) {
              return [];
            }
        }
      );
  }
}
