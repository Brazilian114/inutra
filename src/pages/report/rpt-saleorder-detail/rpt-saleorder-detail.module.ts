import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RptSaleOrderDetailsPage } from './rpt-saleorder-detail';

@NgModule({
  declarations: [
    RptSaleOrderDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(RptSaleOrderDetailsPage),
  ],
})
export class RptSaleOrderDetailsPageModule {}
