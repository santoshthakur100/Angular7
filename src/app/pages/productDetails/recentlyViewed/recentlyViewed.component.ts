import { ProductDetailsService } from './../productDetails.service';
import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import "../../../../../node_modules/owl.carousel/dist/assets/owl.carousel.css";

@Component({
  selector: 'app-recentlyViewed',
  templateUrl: './recentlyViewed.component.html',
  styleUrls: ['./recentlyViewed.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class RecentlyViewedComponent implements OnInit {

  recentProductViewed:Array<any>=[];
  constructor(public productDetailsService:ProductDetailsService) { }

  ngOnInit() {
    this.recentProductViewed=this.productDetailsService.getRecentProduct();
  }
}
