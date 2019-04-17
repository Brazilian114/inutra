import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerHeaderPage } from './customer-header';

@NgModule({
  declarations: [
    CustomerHeaderPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerHeaderPage),
  ],
})
export class CustomerHeaderPageModule {}
