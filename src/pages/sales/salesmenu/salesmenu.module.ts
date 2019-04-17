import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaleMenuPage } from './salesmenu';

@NgModule({
  declarations: [
    SaleMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(SaleMenuPage),
  ],
})
export class SaleMenuPageModule {}
