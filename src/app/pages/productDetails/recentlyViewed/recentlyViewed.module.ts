import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RecentlyViewedComponent } from './recentlyViewed.component';
import { recenltyViewedroutes } from './recentlyViewed.routing';
import { ProductCumImageModule } from '../../components/productCumImage/productCumImage.module'; 
import { OwlModule } from 'ngx-owl-carousel';
@NgModule({
  imports: [
    CommonModule,
    OwlModule,
    RouterModule.forChild(recenltyViewedroutes),
    ProductCumImageModule
  ],
  declarations: [RecentlyViewedComponent]
})
export class RecentlyViewedModule { }
