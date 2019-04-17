import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddSaleOrderPage } from './addsaleorder';

@NgModule({
  declarations: [
    AddSaleOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(AddSaleOrderPage),
  ],
})
export class AddSaleOrderPageModule {}
