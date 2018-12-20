import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductlistComponent } from './productlist.component';
import { ProductlistRoutingModule } from './productlist.routing';
import { ImageZoomModule} from 'angular2-image-zoom';
import { OwlModule } from 'ngx-owl-carousel';

@NgModule({
  imports: [
    CommonModule,
    ProductlistRoutingModule,
    ImageZoomModule,
    OwlModule
  ],
  declarations: [ProductlistComponent]
})

export class ProductlistModule { }