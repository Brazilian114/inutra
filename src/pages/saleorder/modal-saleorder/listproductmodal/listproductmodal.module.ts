import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListProductModalPage } from './listproductmodal';

@NgModule({
  declarations: [
    ListProductModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ListProductModalPage),
  ],
})
export class ListProductModalPageModule {}
