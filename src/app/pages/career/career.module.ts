import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CareerComponent } from './career.component';
import { CareerRoutes } from './career.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CareerRoutes)
  ],
  declarations: [CareerComponent]
})

export class CareerModule { }
