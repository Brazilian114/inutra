import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RptSaleOrderPage } from './rpt-saleorder';

@NgModule({
  declarations: [
    RptSaleOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(RptSaleOrderPage),
  ],
})
export class RptSaleOrderPageModule {}
