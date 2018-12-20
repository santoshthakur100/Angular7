import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AboutUsComponent } from './aboutUs.component';
import { OwlModule } from 'ngx-owl-carousel';
import { aboutUsRoutes } from './aboutUs.routing';
import { ReviewsComponent } from '../reviews/reviews.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,FormsModule,
    OwlModule,
    RouterModule.forChild(aboutUsRoutes)
    
  ],
  declarations: [ AboutUsComponent,ReviewsComponent ],
  exports:[ AboutUsComponent]
}) 
export class AboutUsModule { }
