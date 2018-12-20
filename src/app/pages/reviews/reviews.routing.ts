// import { Routes, RouterModule } from '@angular/router';

// const routes: Routes = [
//   {  },
// ];

// export const ReviewsRoutes = RouterModule.forChild(routes);
 

import { Routes } from '@angular/router';
import { ReviewsComponent } from './reviews.component';

export const ReviewsRoutes: Routes = [
  {
  	path: '',
  	component: ReviewsComponent
  }
];