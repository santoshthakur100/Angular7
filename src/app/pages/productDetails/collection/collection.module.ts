import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CollectionComponent } from './collection.component';
import { collectionroutes } from './collection.routing';
import { ProductCumImageModule } from '../../components/productCumImage/productCumImage.module';
import { OwlModule } from 'ngx-owl-carousel';
@NgModule({
  imports: [
    CommonModule,
    OwlModule,
    RouterModule.forChild(collectionroutes),
    ProductCumImageModule
  ],
  declarations: [CollectionComponent],
  exports: [CollectionComponent]

})
export class CollectionModule { }
