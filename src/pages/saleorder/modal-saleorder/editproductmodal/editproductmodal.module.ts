import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditProductModalPage } from './editproductmodal';

@NgModule({
  declarations: [
    EditProductModalPage,
  ],
  imports: [
    IonicPageModule.forChild(EditProductModalPage),
  ],
})
export class EditProductModalPageModule {}
