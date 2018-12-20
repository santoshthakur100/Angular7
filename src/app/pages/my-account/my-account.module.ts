import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MyAccountComponent } from './my-account.component';
import { MyAccountRoutingModule } from './my-account.routing';

@NgModule({
  imports: [
    CommonModule,   
    ReactiveFormsModule,
    MyAccountRoutingModule
  ],
  declarations: [MyAccountComponent],
  exports: []
})
export class MyAccountModule { }


