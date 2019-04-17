import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaleReservationPage } from './salereservation';

@NgModule({
  declarations: [
    SaleReservationPage,
  ],
  imports: [
    IonicPageModule.forChild(SaleReservationPage),
  ],
})
export class SaleReservationPageModule {}
