import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContactComponent } from './contact.component';
import { ContactRoutes } from './contact.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ContactRoutes)
  ],
  declarations: [ContactComponent]
})

export class ContactModule { }
