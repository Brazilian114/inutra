import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { GreenTimberlandZenStock } from './app.component';

import { Utility } from '../helper/utility';

@NgModule({
  declarations: [
    GreenTimberlandZenStock
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(GreenTimberlandZenStock)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    GreenTimberlandZenStock
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Utility,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
