import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GuidesComponent } from './guides.component';
import { guidesRoutes } from './guides.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(guidesRoutes)
  ],
  declarations: [GuidesComponent]
})

export class GuidesModule { }
