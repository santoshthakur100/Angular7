import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHomeComponent } from './mainHome.component';
import { MainHomeRoutingModule } from './mainHome.routing';
import { OwlModule } from 'ngx-owl-carousel';
import { Ng2Webstorage } from 'ngx-webstorage';

@NgModule({
  imports: [
    CommonModule,
    MainHomeRoutingModule,
    OwlModule,
    Ng2Webstorage
  ],
  declarations: [ MainHomeComponent ]
})

export class MainHomeModule { }
