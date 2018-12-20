import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import { PaytmRoutingModule } from './payment.routing';
import { AccountModule } from './account/account.module';
import { DeliveryModule } from './delivery/delivery.module';
import { DeliveryMethodModule } from './deliveryMethod/deliveryMethod.module';
import { ConfirmOrderModule } from './confirmOrder/confirmOrder.module';
import { CheckoutModule } from './checkout/checkout.module';
@NgModule({
  imports: [
    CommonModule,
    PaytmRoutingModule,
    AccountModule,
    DeliveryMethodModule,
    DeliveryModule, 
    CheckoutModule,
    ConfirmOrderModule
  ],
  declarations: [PaymentComponent]
})
export class PaymentModule { }
