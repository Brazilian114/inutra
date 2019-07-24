import 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as xml2js from "xml2js"

import { Storage } from '@ionic/storage';
@Injectable()
export class LoginService {
  public hostWebService:string;
  url:string;
  constructor(private http: Http, private storage: Storage){
    this.hostWebService = "http://192.168.1.252/RF-Service_GreenTimberland_zenstock/RFService.asmx";
    this.storage.get('_url').then((res)=>{
      this.url = res;
      //this.hostWebService = "http://"+this.url+"/RF-Service_GreenTimberland_zenstock/RFService.asmx";
    })
  }

//GET
//NEW
  get_login(Username,Password) {
    let parameters='oUsername='+Username+'&oPassword='+Password;
    return this.http.get(this.hostWebService +"/Check_Login?"+parameters)
      .toPromise()
      .then(response =>
        {
            let a;
            xml2js.parseString(response.text(), function (err,result) {
            a = result;
        });
            try {
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
            }
            catch (e) {
              return [];
            }
        }
      );
  }
}
