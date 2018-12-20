import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderTrackingComponent } from './orderTracking.component';
import { otRoutes } from './orderTracking.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(otRoutes)
  ],
  declarations: [OrderTrackingComponent]
})

export class OrderTrackingModule { }
