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

    this.storage.get('_url').then((res)=>{
      this.url = res;
      this.hostWebService = "http://"+this.url+"/RF-Service_GreenTimberland/RFService.asmx";     
    })
  }

  GetProductTop30(oClient) {
   let parameters='oClient='+oClient;
   return this.http.get(this.hostWebService +"/Get_Product_Top_30?"+parameters)
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
  GetProductByKeyword(oClient, oKeyword) {
    let parameters='oClient='+oClient+'&oKeyword='+oKeyword;
    return this.http.get(this.hostWebService +"/Get_Product_By_Keyword?"+parameters)
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
  GetProductUom(oClient, oItemNo) {
    let parameters='oClient='+oClient+'&oItemNo='+oItemNo;
    return this.http.get(this.hostWebService +"/Get_Product_Uom?"+parameters)
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
  GetProductStock(oClient, oItemNo, oGrade, oLotNo, oBatchNo, oItemSize, oItemColor
    , oItemClass, oWarehouse, oZone, oItemPacking, oExpiryDate, oProdDate, oLocation, oPalletNo, oOiNo) {
    let parameters='oClient='+oClient+'&oItemNo='+oItemNo+'&oGrade='+oGrade+'&oLotNo='+oLotNo+'&oBatchNo='+oBatchNo
    +'&oItemSize='+oItemSize+'&oItemColor='+oItemColor+'&oItemClass='+oItemClass+'&oWarehouse='+oWarehouse+'&oZone='+oZone
    +'&oItemPacking='+oItemPacking+'&oExpiryDate='+oExpiryDate+'&oProdDate='+oProdDate+'&oLocation='+oLocation
    +'&oPalletNo='+oPalletNo+'&oOiNo='+oOiNo;
    return this.http.get(this.hostWebService +"/Get_Product_Stock?"+parameters)
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
