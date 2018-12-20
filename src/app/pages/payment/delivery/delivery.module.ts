import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryComponent } from './delivery.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DeliveryComponent],
  exports: [DeliveryComponent]
})
export class DeliveryModule { }
