import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SizeChartComponent } from './sizeChart.component';
import { RouterModule } from '@angular/router';
import { sizeChartRoutes } from './sizeChart.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(sizeChartRoutes)
  ],
  declarations: [SizeChartComponent],
  exports:[SizeChartComponent]
})
export class SizeChartModule { }
