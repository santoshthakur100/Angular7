import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
//import { HomeModule } from './pages/home/home.module';
import { PagesComponent } from './pages/pages.component'; 

export const appRoutes: Routes = [
  //{ path: '', component: AppComponent },
  {
    path: '',  
    loadChildren: 'app/pages/pages.module#PagesModule'
 
  }
 
];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule],
// })
// export class NameRoutingModule { }

// export const routedComponents = [NameComponent]; 
