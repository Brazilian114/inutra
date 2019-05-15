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

  //Add Sale Order
  GetCustomerParam(oClient) {
    let parameters='oClient='+oClient;
    return this.http.get(this.hostWebService +"/Get_Customer_Param?"+parameters)
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
  GetProductParam(oReference) {
    let parameters='oReference='+oReference;
    return this.http.get(this.hostWebService +"/Get_Product_Param?"+parameters)
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
  GetCustomerDelivery(oClient, oCustomerId) {
    let parameters='oClient='+oClient+'&oCustomerId='+oCustomerId;
    return this.http.get(this.hostWebService +"/Get_Customer_Delivery?"+parameters)
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
  AddSalesOrders(oClient, oMaker, oBook, oBranch, oOrderNo, oCustomer, oCustomerName, oOrderDate, oVat, oDiscountType
    , oDiscountRate, oTotalPrice, oDiscountedPrice, oNetPrice, oPoNo, oEtd, oIncludeVat, oRemarks, oTelephone, oFax, oContact
    , oDeliveryCode, oDeliveryTo, oDeliveryStreet, oDeliveryBuilding, oDeliveryTown, oDeliveryState, oDeliveryCountry
    , oDeliveryPostCode, oOrderType, oDueDate, oPaymentTerm, oSalesName, oSalesCode) {
    let parameters='oClient='+oClient+'&oMaker='+oMaker+'&oBook='+oBook+'&oBranch='+oBranch
    +'&oOrderNo='+oOrderNo+'&oCustomer='+oCustomer+'&oCustomerName='+oCustomerName+'&oOrderDate='+oOrderDate
    +'&oVat='+oVat+'&oDiscountType='+oDiscountType+'&oDiscountRate='+oDiscountRate+'&oTotalPrice='+oTotalPrice
    +'&oDiscountedPrice='+oDiscountedPrice+'&oNetPrice='+oNetPrice+'&oPoNo='+oPoNo+'&oEtd='+oEtd
    +'&oIncludeVat='+oIncludeVat+'&oRemarks='+oRemarks+'&oTelephone='+oTelephone+'&oFax='+oFax+'&oContact='+oContact
    +'&oDeliveryCode='+oDeliveryCode+'&oDeliveryTo='+oDeliveryTo+'&oDeliveryStreet='+oDeliveryStreet
    +'&oDeliveryBuilding='+oDeliveryBuilding+'&oDeliveryTown='+oDeliveryTown+'&oDeliveryState='+oDeliveryState
    +'&oDeliveryCountry='+oDeliveryCountry+'&oDeliveryPostCode='+oDeliveryPostCode+'&oOrderType='+oOrderType
    +'&oDueDate='+oDueDate+'&oPaymentTerm='+oPaymentTerm+'&oSalesName='+oSalesName+'&oSalesCode='+oSalesCode;
    return this.http.get(this.hostWebService +"/Add_Sales_Orders?"+parameters)
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
  
  //Add Product
  GetProduct(oClient) {
    let parameters='oClient='+oClient;
    return this.http.get(this.hostWebService +"/Get_Product?"+parameters)
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
                // return a.DataTable["diffgr:diffgram"].NewDataSet.Table; //explicitArray false
                return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table //explicitArray true
            }
            catch (e) {
              return [];
            }
        }
      );
  } 
  GetZone(oUserId, oWarehouse) {
    let parameters='oUserId='+oUserId+'&oWarehouse='+oWarehouse;
    return this.http.get(this.hostWebService +"/Get_Zone?"+parameters)
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
  GetProductDefault(oClient, oItemNo) {
    let parameters='oClient='+oClient+'&oItemNo='+oItemNo;
    return this.http.get(this.hostWebService +"/Get_Product_Default?"+parameters)
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
  GetProductColor(oClient, oItemNo) {
    let parameters='oClient='+oClient+'&oItemNo='+oItemNo;
    return this.http.get(this.hostWebService +"/Get_Item_Color?"+parameters)
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
  GetLastSale(oClient, oItem_no, oCustomer) {
    let parameters='oClient='+oClient+'&oItem_no='+oItem_no+'&oCustomer='+oCustomer;
    return this.http.get(this.hostWebService +"/GetLastSale?"+parameters)
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
