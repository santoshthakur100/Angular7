import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DeliveryInformationComponent } from './deliveryInformation.component';
import { diRoutes } from './deliveryInformation.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(diRoutes)
  ],
  declarations: [DeliveryInformationComponent]
})

export class DeliveryInformationModule { }
