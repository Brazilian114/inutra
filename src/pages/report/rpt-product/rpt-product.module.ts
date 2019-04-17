import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RptProductPage } from './rpt-product';

@NgModule({
  declarations: [
    RptProductPage,
  ],
  imports: [
    IonicPageModule.forChild(RptProductPage),
  ],
})
export class RptProductPageModule {}
