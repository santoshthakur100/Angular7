import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReturnComponent } from './return.component';
import { ReturnRoutes } from './return.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ReturnRoutes)
  ],
  declarations: [ReturnComponent]
})

export class ReturnModule { }
