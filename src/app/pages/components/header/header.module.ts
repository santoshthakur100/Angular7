import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MobxAngularModule } from 'mobx-angular';
import { RouterModule } from '@angular/router';
import { Ng2Webstorage } from 'ngx-webstorage';
import { OrderModule } from 'ngx-order-pipe';
// import { ProductlistComponent } from '
// import {headerRoutes} from './header.routing';
// import { ProductlistComponent } from './productlist/productlist.component';

@NgModule({
  imports: [
    CommonModule,
    MobxAngularModule,
    RouterModule,
    Ng2Webstorage,OrderModule
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})

export class HeaderModule { }
