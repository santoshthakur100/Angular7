import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TestpageComponent } from './testpage.component';
import { testpageRoutes } from './testpage.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(testpageRoutes)
  ],
  declarations: [ TestpageComponent],
  exports: [ TestpageComponent]
})
export class TestpageModule { }

