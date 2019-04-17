import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CirculationPage } from './circulation';

@NgModule({
  declarations: [
    CirculationPage,
  ],
  imports: [
    IonicPageModule.forChild(CirculationPage),
  ],
})
export class CirculationPageModule {}
