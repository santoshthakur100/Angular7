import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FaqComponent } from './faq.component';
import { FaqRoutes } from './faq.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(FaqRoutes)
  ],
  declarations: [FaqComponent]
})

export class FaqModule { }
