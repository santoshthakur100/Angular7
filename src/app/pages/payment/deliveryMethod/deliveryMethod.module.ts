import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryMethodComponent } from './deliveryMethod.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DeliveryMethodComponent],
  exports: [DeliveryMethodComponent]
})
export class DeliveryMethodModule { }
