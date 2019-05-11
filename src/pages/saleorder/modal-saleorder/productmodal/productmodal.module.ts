import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductModalPage } from './productmodal';

@NgModule({
  declarations: [
    ProductModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductModalPage),
  ],
})
export class ProductModalPageModule {}
