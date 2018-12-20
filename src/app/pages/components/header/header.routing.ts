import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeaderComponent } from './header.component';

export const headerRoutes: Routes = [
  { path: '',component: HeaderComponent,
  children:[
   // { path: '', component: ProductDetailsComponent},
    { path: '', loadChildren: 'app/pages/components/header/header.module#HeaderModule'},
    { path: 'productlist', loadChildren: 'app/pages/components/productlist/productlist.module#ProductlistModule'},

  ] }
];