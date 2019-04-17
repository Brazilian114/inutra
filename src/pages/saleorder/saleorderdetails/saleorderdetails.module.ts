import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaleOrderDetailsPage } from './saleorderdetails';

@NgModule({
  declarations: [
    SaleOrderDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(SaleOrderDetailsPage),
  ],
})
export class SaleOrderDetailsPageModule {}
