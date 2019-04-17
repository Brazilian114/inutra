import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemDetailsPage } from './itemdetails';

@NgModule({
  declarations: [
    ItemDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemDetailsPage),
  ],
})
export class ItemDetailsPageModule {}
