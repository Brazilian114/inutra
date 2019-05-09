import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Utility } from '../../helper/utility';

import { LoginService } from '../../services/loginservice';

@IonicPage(
  {name:'LoginPage',
  segment: 'Login'}
)

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [LoginService]
})
export class LoginPage {

  url:string = '';
  data_logins:any;
  oUsername:string = '';
  oPassword:string = '';

  constructor(public navCtrl: NavController, private utility: Utility, private storage: Storage, private loginServ: LoginService) {

  }
  doLogin(oUsername, oPassword){
    if(oUsername == "") //---------------------------------Test เข้าสู่ระบบได้โดยไม่ Login------------------------------------------------------//
      this.navCtrl.setRoot("HomePage");
    else  //-------------------------------------------------------------------------------------------------------------------------------//
      this.storage.get('_url').then((res)=>{
        this.url = res;
        if(this.url != null){
          if(oUsername == "" || oUsername == undefined){
            this.utility.Alert('Error', 'กรุณากรอกชื่อผู้ใช้อีกครั้ง');
          }else if(oPassword == "" || oPassword == undefined){
            this.utility.Alert('Error', 'กรุณากรอกรหัสผ่านอีกครั้ง');
          }else{
            oUsername = oUsername.toUpperCase();
            oPassword = oPassword.toUpperCase();

            this.utility.presentLoading()
            this.loginServ.get_login(oUsername, oPassword).then((res)=>{
              this.data_logins = res;
              console.log(this.data_logins);

              if(this.data_logins['sqlstatus'] != '0'){
                this.utility.Alert('Error', 'กรุณากรอกชื่อผู้ใช้หรือรหัสผ่านอีกครั้ง');
              }else{
                this.storage.ready().then(() => {
                        this.storage.set('_user', oUsername)
                      })
                this.utility.finishLoding();
                this.navCtrl.setRoot("HomePage");
              }
            });
          }
        }else{
          this.utility.Alert('Error', 'You Not Set Web Service');
        }
      })
  }
  doSetting(){
    this.navCtrl.push("SettingPage");
  }
}
