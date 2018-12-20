import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SizeChartComponent } from './sizeChart.component';

export const sizeChartRoutes: Routes = [
  {
    path: '', children: [
      { path: '', component: SizeChartComponent }
    ]
  },
];

