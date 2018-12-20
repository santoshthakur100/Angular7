import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from './review.component';
import { ReviewRoutingModule } from './review.routing';

@NgModule({
  imports: [
    CommonModule,
    ReviewRoutingModule
  ],
  declarations: [ReviewComponent]
})
export class ReviewModule { }
