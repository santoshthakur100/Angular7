import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router' 
import { ProductDetailsComponent } from './productDetails.component';
import { productDetailsRoutes } from './productDetails.routing';
import { ProductDetailsService } from './productDetails.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(productDetailsRoutes)
  ],
  declarations: [ProductDetailsComponent],
  providers:[ProductDetailsService]
})
export class ProductDetailsModule { }
