import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductDetailsComponent } from './productDetails.component';

export const productDetailsRoutes: Routes = [
  { path: '',component: ProductDetailsComponent,
  children:[
   // { path: '', component: ProductDetailsComponent},
    { path: '', loadChildren: 'app/pages/productDetails/product/product.module#ProductModule'},
    { path: 'size-chart', loadChildren: 'app/pages/productDetails/sizeChart/sizeChart.module#SizeChartModule'},
    { path: 'delivery-return', loadChildren: 'app/pages/productDetails/deliveryReturn/deliveryReturn.module#DeliveryReturnModule'},
    { path: 'collection', loadChildren: 'app/pages/productDetails/collection/collection.module#CollectionModule'},
    { path: 'recently-viewed', loadChildren: 'app/pages/productDetails/recentlyViewed/recentlyViewed.module#RecentlyViewedModule'},
    { path: 'review', loadChildren: 'app/pages/productDetails/review/review.module#ReviewModule'},
 

  ] }
];

