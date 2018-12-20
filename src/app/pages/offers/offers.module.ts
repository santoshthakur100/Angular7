import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersComponent } from './offers.component';
import { OffersRoutingModule } from './offers.routing';

@NgModule({
  imports: [
    CommonModule,
    OffersRoutingModule
  ],
  declarations: [OffersComponent]
})
export class OffersModule { }
