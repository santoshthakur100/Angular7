import { Component, OnInit, ChangeDetectionStrategy, ApplicationRef, NgZone } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { Constants } from '../../../api/constants';
import { ProductDetailsService } from '../productDetails.service';
// import "assets/scripts/lib/jquery.flipster.min.js";
declare var $: any;
@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionComponent implements OnInit {
  productDetailCollection:Array<any>=[];
  productList: Array<any> = [];

 // productDetail= <any>[];
    constructor(public applicationRef:ApplicationRef,
    private _ngZone: NgZone, 
    public productDetailsService: ProductDetailsService) { }

  ngOnInit() {
    const productcollection = JSON.parse(localStorage.getItem('ProductCollection'))
    this.productDetailCollection = productcollection.in_collection;
  }

  ngAfterViewInit () {
    const flipContainer: any = $('.flipster'),
      flipItemContainer: any = flipContainer.find('.flip-items'),
      flipItem: any = flipContainer.find('li')

    flipContainer.flipster({
      itemContainer: flipItemContainer,
      itemSelector: flipItem,
      start: 0,
      style: 'carousel',
      spacing: -0.2,
      scrollwheel: true
    });

    // flipItemContainer.children().eq(3).remove();
    // flipItemContainer.append("<li style='background: red; padding: 4em 1em;'>Hi! I'm a new Item!</li>");
    // flipContainer.flipster('index');

  }

  // ngAfterContentInit () {

  // }
}
