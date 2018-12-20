import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { pagesRoutes } from './pages.routing';
import { FooterModule } from './components/footer/footer.module';
 import { HeaderModule } from './components/header/header.module';
// import {ProductListModule} from './product-list/product-list.module';
import { CommonModule } from '@angular/common';
import { CartModule } from './components/cart/cart.module';
import { CartComponent } from './components/cart/cart.component';
import { PersonalChangingRoomModule } from './components/personalChangingRoomHeader/personalChangingRoomHeader.module';
// import { ProductListComponent } from './product-list/product-list.component';
import { OwlModule } from 'ngx-owl-carousel';
import { Ng2Webstorage } from 'ngx-webstorage';



@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(pagesRoutes),
        HeaderModule,
        FooterModule,
        PersonalChangingRoomModule,
        CartModule,OwlModule,Ng2Webstorage
    ],
    exports: [CartModule],
    declarations: [PagesComponent, CartComponent]
})

export class PagesModule { }
