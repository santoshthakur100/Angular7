import { LocalStorageService  } from 'ngx-webstorage';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ProductDetailsService } from './productDetails.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Constants } from '../../api/constants';

@Component({
  selector: 'app-productDetails',
  templateUrl: './productDetails.component.html',
  styleUrls: ['./productDetails.component.scss']
})

export class ProductDetailsComponent implements OnInit {

  productDetails: any;
  productId: any;
  public userReviewDetails: any = [];

  productDetailsTab:string;
  productCollectionTab:string;
 // productRecentTab:string;
  productReviewTab:string;
  productSizeTab:string;
  productDeliveryTab:string;

  constructor(public localStorageService: LocalStorageService,
    public router: Router,
    public productDetailsService: ProductDetailsService,
    private userService: UserService,
    public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // debugger;
    this.activatedRoute.params.subscribe((data) => {
      this.productId = data['id'];
      localStorage.setItem('productId', JSON.stringify(this.productId));
      this.userService.getProductDetails(this.productId).subscribe((response: any) => {
        if (response.status == Constants.success) {
          this.productDetails = response.data;
          this.productDetailsService.productDetails = response.data;
          this.productDetailsService.setRecentProduct(response.data);
          this.productDetailsService.productDetailsSubject.next();        
        }
      })
   });
   this.goToRoute('');
  }
  goToRoute(routePath?) {
    this.productDetailsTab="tablinks";
    this.productCollectionTab="tablinks";
    //this.productRecentTab="tablinks";
    this.productReviewTab="tablinks";
    this.productSizeTab="tablinks";
    this.productDeliveryTab="tablinks";

    if(routePath === undefined || routePath === null || routePath === '') {
      // debugger;
      this.productDetailsTab="tablinks active"; 
    } else if(routePath === 'collection'){
      this.productCollectionTab="tablinks active"; 
    // } else if(routePath === 'recently-viewed'){
    //   this.productRecentTab="tablinks active"; 
    // }
    } else if(routePath === 'review'){
      this.productReviewTab="tablinks active"; 
    } else if(routePath === 'size-chart'){
      this.productSizeTab="tablinks active"; 
    } else if(routePath === 'delivery-return'){
      this.productDeliveryTab="tablinks active"; 
    } else {
      this.productDetailsTab="tablinks active"; 
    }

    if (routePath && this.productId !== null){
      this.router.navigateByUrl('/product-details/' + this.productId + '/' + routePath);
     } else {
      this.router.navigateByUrl('/product-details/' + this.productId);
     }
  }
  
  recentItems() {
    this.localStorageService.retrieve('recenetProct')
  }

  ngAfterViewInit() {

    // $(".zoom_03").each(function () {
    //   var $this = $(this);
    //   var galery = $this.next().attr('id');
    //   $this.elevateZoom({
    //     gallery: galery,
    //     scrollZoom: "true",
    //     easing: "true",
    //     easingType: "zoomType",
    //     easingDuration: "2000",
    //     zoomType: "inner",
    //     cursor: "zoom-In",
    //     borderColour: "#eee",
    //     borderSize: "1",
    //     imageCrossfade: "true",
    //     zoomWindowFadeIn: "true",
    //     zoomWindowFadeOut: "true"
    //   })
    // });

    // $(".elevatezoom-gallery").on('click', function (e) {
    //   e.preventDefault();
    //   console.log("Item Clicked");
    //   $('.elevatezoom-gallery').removeClass('active');
    //   $(this).addClass('active');
    // });

    // document.getElementById("defaultOpen").click();


  }

  // openCity(evt, cityName) {
  //   var i, tabcontent, tablinks;
  //   tabcontent = document.getElementsByClassName("tabcontent");
  //   for (i = 0; i < tabcontent.length; i++) {
  //     tabcontent[i].style.display = "none";
  //     $(".zoomContainer").hide();
  //   }
  //   tablinks = document.getElementsByClassName("tablinks");
  //   for (i = 0; i < tablinks.length; i++) {
  //     tablinks[i].className = tablinks[i].className.replace(" active animated fadeIn", "");
  //   }
  //   document.getElementById(cityName).style.display = "block";

  //   var x = document.getElementById(cityName) === document.getElementById('product-details');
  //   if (x) {
  //     $(".zoomContainer").show();
  //   }
  //   evt.currentTarget.className += " active animated fadeIn";
  // }

}
