import 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as xml2js from "xml2js"

import { Storage } from '@ionic/storage';
@Injectable()
export class CustomerService {
  public hostWebService:string;
  url:string;
  constructor(private http: Http, private storage: Storage){
   //this.getUrl();
   this.hostWebService = "http://192.168.1.252/RF-Service_Inutra_zenstock/RFService.asmx"
  // this.hostWebService = "http://203.154.174.129/RF-Service_Inutra_zenstock/RFService.asmx";    
   //this.ngOnInit();
   // this.ionViewWillEnter();
   this.storage.get('_url').then((res)=>{
    this.url = res;
    console.log(res);
    
     //this.hostWebService = "http://"+this.url+"/RF-Service_Inutra_zenstock/RFService.asmx";    
    console.log(this.hostWebService);
      
  })
  }
 /* ngOnInit(){
   // this.hostWebService = "http://192.168.1.252/RF-Service_GreenTimberland_zenstock/RFService.asmx"
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
      console.log(res);
       this.hostWebService = "http://"+this.url+"/RF-Service_GreenTimberland_zenstock/RFService.asmx";  
       console.log(this.hostWebService);   
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

  GetCustomerDetails(oClient) {
    
    let parameters='oClient='+oClient;
    return this.http.get(this.hostWebService +"/Get_Customer_Details?"+parameters)
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
  GetCustomerByKeyword(oClient,oKeyword) {
    
    let parameters='oClient='+oClient+'&oKeyword='+oKeyword;
    return this.http.get(this.hostWebService +"/Get_Customer_By_Keyword?"+parameters)
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
