import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryReturnComponent } from './deliveryReturn.component';

export const deliveryReturnroutes: Routes = [
  { path: '', component: DeliveryReturnComponent },
];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule],
// })
// export class NameRoutingModule { }

// export const routedComponents = [NameComponent];