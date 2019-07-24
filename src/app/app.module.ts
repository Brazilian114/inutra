import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { DatePipe } from '@angular/common'
import { GreenTimberlandZenStock } from './app.component';

import { Utility } from '../helper/utility';
import { HttpClientModule } from '@angular/common/http'
import { SaleOrderService } from '../services/saleorderservice';
import { ProductService } from '../services/productservice';
import { LoginService } from '../services/loginservice';
import { CustomerService } from '../services/customerservice';
import { SaleService } from '../services/salseservice';
import { ReportService } from '../services/reportservice';

@NgModule({
  declarations: [
    GreenTimberlandZenStock
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(GreenTimberlandZenStock,
      {
        platforms : {
          android : {
            backButtonText: 'ย้อนกลับ',
            backButtonIcon: 'ios-arrow-back',
            scrollPadding: false,
            modalEnter: 'modal-slide-in',
            modalLeave: 'modal-slide-out',
            // ,
            scrollAssist: false,    // Valid options appear to be [true, false]
            autoFocusAssist: false  // Valid options appear to be ['instant', 'delay', false]
          }
        }
      }),
    IonicStorageModule.forRoot(),
    HttpModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    GreenTimberlandZenStock
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Utility,
    // {provide: ErrorHandler, useClass: IonicErrorHandler},
    SaleOrderService,
    ProductService,
    LoginService,
    CustomerService,
    SaleService,
    ReportService,
    DatePipe
  ]
})
export class AppModule {}
