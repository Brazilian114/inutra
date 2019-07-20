import 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NavController, LoadingController, ToastController, ModalController, Platform, AlertController, Content, IonicPage } from 'ionic-angular';
import * as xml2js from "xml2js"

import { Storage } from '@ionic/storage';
@Injectable()
export class SaleOrderService {
  public hostWebService:string;
  url:string;
  
  constructor(private toastCtrl: ToastController,private http: Http, private storage: Storage){
    this.hostWebService = "http://192.168.1.252/RF-Service_GreenTimberland_zenstock/RFService.asmx";
    this.storage.get('_url').then((res)=>{
      this.url = res;
      // this.hostWebService = "http://"+this.url+"/RF-Service_GreenTimberland_zenstock/RFService.asmx";     
    })
  }
  

  GetSalesOrders(oClient, oUserId, oKeyword, oUserGroup) {
    let parameters='oClient='+oClient+'&oUserId='+oUserId+'&oKeyword='+oKeyword+'&oUserGroup='+oUserGroup;
    return this.http.get(this.hostWebService +"/Get_Sales_Orders?"+parameters)
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

  GetVatDetails() {
    //let parameters='&oVat_id='+oVat_id+'&oDescription='+oDescription+'&oVat='+oVat;
    return this.http.get(this.hostWebService +"/Get_Vat_Details?")
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

  DeleteSoDetail( oClient, oOrder_no,  oLine_no) {
    let parameters='oClient='+oClient+'&oOrder_no='+oOrder_no+'&oLine_no='+oLine_no;
    return this.http.get(this.hostWebService +"/Delete_SoDetail?"+parameters)
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
  AddSalesOrders(oClient, oBook, oBranch, oOrderNo, oOrderType, oCustomer, oCustomerName, oOrderDate, oVat, oDiscountType, oDiscountRate, oDiscountType2
    , oDiscountRate2, oDiscountType3, oDiscountRate3, oTotalPrice, oDiscountedPrice, oNetPrice, oPoNo, oEtd, oIncludeVat, oRemarks, oTelephone, oFax
    , oContact, oDeliveryDate, oDeliveryCode, oDeliveryTo, oDeliveryStreet, oDeliveryBuilding, oDeliveryStreets3, oDeliveryTown, oDeliveryState
    , oDeliveryCountry, oDeliveryPostCode, oDueDate, oMaker, oPaymentTerm, oSalesCode, oSalesName, oBackorder, oReference, oOnpallet, oDO, oStandCost
    , oDepartment, oLoadDate) {
    let parameters='oClient='+oClient+'&oBook='+oBook+'&oBranch='+oBranch+'&oOrderNo='+oOrderNo
    +'&oOrderType='+oOrderType+'&oCustomer='+oCustomer+'&oCustomerName='+oCustomerName+'&oOrderDate='+oOrderDate
    +'&oVat='+oVat+'&oDiscountType='+oDiscountType+'&oDiscountRate='+oDiscountRate+'&oDiscountType2='+oDiscountType2
    +'&oDiscountRate2='+oDiscountRate2+'&oDiscountType3='+oDiscountType3+'&oDiscountRate3='+oDiscountRate3+'&oTotalPrice='+oTotalPrice
    +'&oDiscountedPrice='+oDiscountedPrice+'&oNetPrice='+oNetPrice+'&oPoNo='+oPoNo+'&oEtd='+oEtd+'&oIncludeVat='+oIncludeVat
    +'&oRemarks='+oRemarks+'&oTelephone='+oTelephone+'&oFax='+oFax+'&oContact='+oContact+'&oDeliveryDate='+oDeliveryDate+'&oDeliveryCode='+oDeliveryCode
    +'&oDeliveryTo='+oDeliveryTo+'&oDeliveryStreet='+oDeliveryStreet+'&oDeliveryBuilding='+oDeliveryBuilding+'&oDeliveryStreets3='+oDeliveryStreets3
    +'&oDeliveryTown='+oDeliveryTown+'&oDeliveryState='+oDeliveryState+'&oDeliveryCountry='+oDeliveryCountry+'&oDeliveryPostCode='+oDeliveryPostCode
    +'&oDueDate='+oDueDate+'&oMaker='+oMaker+'&oPaymentTerm='+oPaymentTerm+'&oSalesCode='+oSalesCode+'&oSalesName='+oSalesName+'&oBackorder='+oBackorder
    +'&oReference='+oReference+'&oOnpallet='+oOnpallet+'&oDO='+oDO+'&oStandCost='+oStandCost+'&oDepartment='+oDepartment+'&oLoadDate='+oLoadDate;
    return this.http.get(this.hostWebService +"/Add_SO_master?"+parameters)
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
  
  
  AddOrdersDetails(oClient, oMaker, oOrderNo, oOrderDate, oLineNo, oItemNo, oItemDescription, oUom, oQty, oUnitPrice, oAmount, oNetAmount, oRemarks
    , oDiscountType, oDiscountByLine, oDiscountUnit, oRealDiscount, oItemColor, oServicePrice, oStatus, oZone, oRate, oCustomer, oDiscount, oGrade, oUser_Defined) {
    
      let parameters='oClient='+oClient+'&oMaker='+oMaker+'&oOrderNo='+oOrderNo+'&oOrderDate='+oOrderDate
    +'&oLineNo='+oLineNo+'&oItemNo='+oItemNo+'&oItemDescription='+oItemDescription+'&oUom='+oUom
    +'&oQty='+oQty+'&oUnitPrice='+oUnitPrice+'&oAmount='+oAmount+'&oNetAmount='+oNetAmount
    +'&oRemarks='+oRemarks+'&oDiscountType='+oDiscountType+'&oDiscountByLine='+oDiscountByLine+'&oDiscountUnit='+oDiscountUnit
    +'&oRealDiscount='+oRealDiscount+'&oItemColor='+oItemColor+'&oServicePrice='+oServicePrice
    +'&oStatus='+oStatus+'&oZone='+oZone+'&oRate='+oRate+'&oCustomer='+oCustomer+'&oDiscount='+oDiscount+'&oGrade='+oGrade+'&oUser_Defined='+oUser_Defined;
    
    return this.http.get(this.hostWebService +"/Add_SO_Details?"+parameters)
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
  GetProductStock(oClient, oItemNo, oGrade, oLotNo, oBatchNo, oItemSize, oItemColor, oItemClass, oWarehouse, oZone, oItemPacking, oExpiryDate
    , oProdDate, oLocation, oPalletNo, oOiNo) {
    let parameters='oClient='+oClient+'&oItemNo='+oItemNo+'&oGrade='+oGrade+'&oLotNo='+oLotNo+'&oBatchNo='+oBatchNo+'&oItemSize='+oItemSize+'&oItemColor='+oItemColor
    +'&oItemClass='+oItemClass+'&oWarehouse='+oWarehouse+'&oZone='+oZone+'&oItemPacking='+oItemPacking+'&oExpiryDate='+oExpiryDate+'&oProdDate='+oProdDate
    +'&oLocation='+oLocation+'&oPalletNo='+oPalletNo+'&oOiNo='+oOiNo;
    return this.http.get(this.hostWebService +"/Get_Product_Stock?"+parameters)
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
  GetSalesOrdersKeyword(oClient, oKeyword) {
    let parameters='oClient='+oClient+'&oKeyword='+oKeyword;
    return this.http.get(this.hostWebService +"/Get_Sales_Orders_Keyword?"+parameters)
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
