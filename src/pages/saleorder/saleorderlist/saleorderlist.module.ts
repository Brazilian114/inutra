import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaleOrderListPage } from './saleorderlist';

@NgModule({
  declarations: [
    SaleOrderListPage,
  ],
  imports: [
    IonicPageModule.forChild(SaleOrderListPage),
  ],
})
export class SaleOrderListPageModule {}
