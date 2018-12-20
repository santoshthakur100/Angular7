import { Component, OnInit } from '@angular/core';
import { ProductDetailsService } from '../productDetails.service';
import { Cart } from '../../../store/cart.store';
import { UserService } from '../../../services/user.service';
import { APIConstants } from '../../../api/api.constants';
import { Constants } from '../../../api/constants';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  productDetail: any = []
  public userReviewDetails: any = []; public userReviewDetailsCopy: any = [];
  fiveStar: any = []; fourStar: any = []; threeStar: any = []; twoStar: any = []
  oneStar: any = []; avgStar: number; avgStarCount: any
  fiveStarCount: number; fourStarCount: number; threeStarCount: number; twoStarCount: number; oneStarCount: number
  today: any = Date(); diffDate: any = []; createdAt: any = Date(); totalDay: number;
  createAtdiffFromToday = <any>[]; user: any; totalReviews: number; IsPagingShow: Boolean = false;
  constructor(public productDetailsService: ProductDetailsService,
    private cart: Cart, private userService: UserService, private datePipe: DatePipe,  public activatedRoute: ActivatedRoute) { }
  productId: any;
  localAddRatingList: any;
  productList: any;

  ngOnInit() {
    this.totalReviews=0;
    this.avgStar=0;
    this.activatedRoute.params.subscribe((data) => {
      this.productId = data['id'];
      this.productId = JSON.parse(localStorage.getItem('productId'))
      let user = JSON.parse(localStorage.getItem('user'))
      this.getAllReview(this.productId);

      this.productDetail = this.productDetailsService.productDetails
      this.productDetailsService.productDetailsSubject.subscribe((data) => {
        this.productDetail = this.productDetailsService.productDetails;
        // console.log(this.productDetail);
      })

      //  this.userService.getUserReview(this.productId).subscribe((res: any) => {
      //          if (res.status == Constants.success) {
      //           this.userReviewDetails = res.data;
      //           }
      //   })
    })
  }
  getAllReview(productId) {
    this.createAtdiffFromToday = [];
        this.userService.getUserReview(this.productId).subscribe((response: any) => {
          if (response.status == Constants.success) {
            this.userReviewDetails = response.data;
            for (var i = 0; i < this.userReviewDetails.data.length; i++) {
    
              this.createAtdiffFromToday.push(this.dateDifferencefromCreatedAt(this.userReviewDetails.data[i].created_at));
              if (this.userReviewDetails.data[i].rating == 5) {
                this.fiveStar.push(this.userReviewDetails.data[i].rating);
              }
              else if (this.userReviewDetails.data[i].rating == 4) {
                this.fourStar.push(this.userReviewDetails.data[i].rating);
              }
              else if (this.userReviewDetails.data[i].rating == 3) {
                this.threeStar.push(this.userReviewDetails.data[i].rating);
              }
              else if (this.userReviewDetails.data[i].rating == 2) {
                this.twoStar.push(this.userReviewDetails.data[i].rating);
              }
              else if (this.userReviewDetails.data[i].rating == 1) {
                this.oneStar.push(this.userReviewDetails.data[i].rating);
              }
            
            }
            this.fiveStarCount = this.fiveStar.length;
            this.fourStarCount = this.fourStar.length;
            this.threeStarCount = this.threeStar.length;
            this.twoStarCount = this.twoStar.length;
            this.oneStarCount = this.oneStar.length;
         
            this.totalReviews = this.userReviewDetails.data.length;
            this.avgStarCount =((this.fiveStarCount * 5 + this.fourStarCount * 4 + this.threeStarCount * 3 + this.twoStarCount * 2 + this.oneStarCount * 1) / this.totalReviews ).toFixed(2);
            if(this.avgStarCount > 0){
              this.avgStar = this.avgStarCount;
            }  else{
              this.avgStar = 0;    // Bcoz here avgStar return NaN .
            }
            this.userReviewDetailsCopy = this.userReviewDetails;
            if( this.totalReviews) {
            this.IsPagingShow= true;
            }
          }
        })
      }
  dateDifferencefromCreatedAt(createDate) {
    this.today = this.datePipe.transform(new Date());
    this.createdAt = this.datePipe.transform(createDate);
    let diffDate = Date.parse(this.today) - Date.parse(this.createdAt);
    this.totalDay = diffDate / 1000 / 60 / 60 / 24;
    return (this.totalDay);
  }
    filterData(Rating) {
      
      if (Rating != undefined)
      {
        this.userReviewDetails = [];
       this.userReviewDetails = this.userReviewDetailsCopy;
      this.userReviewDetails.data = this.userReviewDetails.data.filter(x=> x.rating == Rating);
      // console.log( this.userReviewDetails);
      }
      else{
        alert('No Record found');
      }                      
   }
  //  ratingOne(rating){
  //   let user = JSON.parse(localStorage.getItem('user'));
  //   if ((user && user.role == 'guest') || (this.cart.loginData && this.cart.loginData.role == 'guest')) {
  //     this.addRatingForLocal(rating);
  //   } else {
  //     this.addRatingForUser(rating)
  //   }
  // }
  // addRatingForLocal(rating) {
  //   if(rating !== 0){
  //     this.productId =JSON.parse(localStorage.getItem('productId'));
  //     this.productList = this.productDetail.filter(product => product.id === this.productId);
  //     this.localAddRatingList = {
  //       "products": {
  //         "name": this.productList.name,
  //         "product_id": this.productList.id,
  //         "thumbnail": this.productList.thumbnail
  //       },
  //       "variations": {
  //         "id": this.productList.variations[0].id,
  //         "sku": this.productList.variations[0].sku,
  //         "price": this.productList.variations[0].price,
  //       },
  //       "id": this.productList.id,
  //       "Rating": rating,
  //      }
  //   }
  // }

  // addRatingForUser(rating){

  // }
}
