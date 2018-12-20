import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryReturnComponent } from './deliveryReturn.component';
import { DeliveryRetrunService } from './deliveryReturn.service';
import { RouterModule } from '@angular/router';
import { deliveryReturnroutes } from './deliveryReturn.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(deliveryReturnroutes)
  ],
  declarations: [DeliveryReturnComponent],
  exports:[DeliveryReturnComponent],
  providers: [DeliveryRetrunService]
})
export class DeliveryReturnModule { }
