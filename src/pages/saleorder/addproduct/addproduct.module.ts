import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddProductPage } from './addproduct';

@NgModule({
  declarations: [
    AddProductPage,
  ],
  imports: [
    IonicPageModule.forChild(AddProductPage),
  ],
})
export class AddProductPageModule {}
