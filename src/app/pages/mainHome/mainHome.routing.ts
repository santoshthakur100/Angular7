import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainHomeComponent } from './mainHome.component';


const routes: Routes = [
  { path: '', component: MainHomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainHomeRoutingModule { }

export const routedComponents = [MainHomeComponent];