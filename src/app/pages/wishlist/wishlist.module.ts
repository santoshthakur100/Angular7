import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistComponent } from './wishlist.component';
import { WishlistRoutes } from './wishlist.routing';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, FormsModule,
    RouterModule.forChild(WishlistRoutes)
  ],
  declarations: [WishlistComponent]
})

export class WishlistModule { }
