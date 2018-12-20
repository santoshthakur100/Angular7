import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmOrderComponent } from './confirmOrder.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ConfirmOrderComponent],
  exports: [ConfirmOrderComponent]
})
export class ConfirmOrderModule { }
