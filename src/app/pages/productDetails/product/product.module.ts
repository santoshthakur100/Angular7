import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductRoutingModule } from './product.routing';
import {ImageZoomModule} from 'angular2-image-zoom';
import { OwlModule } from 'ngx-owl-carousel';
import { ProductCumImageModule } from '../../components/productCumImage/productCumImage.module';

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    ImageZoomModule,
    OwlModule,
    ProductCumImageModule
  ],
  declarations: [ProductComponent]
})

export class ProductModule { }