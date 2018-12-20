
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReviewsComponent } from './reviews.component';
import { ReviewsRoutes } from './reviews.routing';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ReviewsRoutes)
  ],
  declarations: [ReviewsComponent]
})
 
export class ReviewsModule { }
