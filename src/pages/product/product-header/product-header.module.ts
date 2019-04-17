import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductHeaderPage } from './product-header';

@NgModule({
  declarations: [
    ProductHeaderPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductHeaderPage),
  ],
})
export class ProductHeaderPageModule {}
