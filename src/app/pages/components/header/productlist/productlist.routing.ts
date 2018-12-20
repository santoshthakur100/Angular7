import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductlistComponent } from './productlist.component';

const routes: Routes = [
  { path: '', component: ProductlistComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductlistRoutingModule { }

export const routedComponents =[ProductlistComponent];