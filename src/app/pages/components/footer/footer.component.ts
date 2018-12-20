import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { UserService } from '../../../services/user.service';
import { Constants } from '../../../api/constants';
import * as $ from 'jquery'

@Component({
  selector: 'mainfooter',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FooterComponent implements OnInit {
  user: any;
  public cookiespolicy = false;
  public acceptCookie:boolean = false;
  public reviewDetails: any = [] ;
  getValue: string;
  fiveStar: any = []
  fourStar: any = []
  threeStar: any = []
  twoStar: any = []
  oneStar: any = []
  avgStar: number; totalReviews:number; avgStarCount: any
  fiveStarCount: number; fourStarCount: number; threeStarCount: number; twoStarCount: number; oneStarCount: number
  constructor(public cookies:CookieService, private userService: UserService) { }
  muahhurl = 'http://bkndmuahh.co.uk'
  ngOnInit() {
    this.getAllReview();
  //Get Cookies
  this.getValue = this.cookies.get('userDetailsCookie');



  if (this.getValue !== undefined )
  {
    this.acceptCookie = true;
  }
    $(window).scroll(function (event) {
      var lastScroll = 0;
      var st = $(this).scrollTop();
      if (st > lastScroll) {
        $("#muahhBottomBar").slideDown(500)
      } if (st == 0) {
        $("#muahhBottomBar").slideUp(500)
      }
      lastScroll = st;
    });
  }
  cookiesAccept(){
  //Set cookies
  // debugger; 
  let user = JSON.parse(localStorage.getItem('user'))
  this.cookies.put('userDetailsCookie', user.role)
  this.cookies.put('sessionIdCookie', user.session_id) 

  this.cookiespolicy = true;
  // alert(this.cookies.get('username')); TODO:Log in user
  }

  getAllReview() {

    this.userService.getPortalReview().subscribe((response: any) => {
      if (response.status == Constants.success) {
        this.reviewDetails = response.data;
        for (var i = 0; i < this.reviewDetails.data.length; i++) {
          //  this.diffDate.push(this.dateDifferencefromCreatedAt(this.reviewDetails.data[i].created_at)); 
          if (this.reviewDetails.data[i].rating == 5) {
            this.fiveStar.push(this.reviewDetails.data[i].rating);
          }
          else if (this.reviewDetails.data[i].rating == 4) {
            this.fourStar.push(this.reviewDetails.data[i].rating);
          }
          else if (this.reviewDetails.data[i].rating == 3) {
            this.threeStar.push(this.reviewDetails.data[i].rating);
          }
          else if (this.reviewDetails.data[i].rating == 2) {
            this.twoStar.push(this.reviewDetails.data[i].rating);
          }
          else if (this.reviewDetails.data[i].rating == 1) {
            this.oneStar.push(this.reviewDetails.data[i].rating);
          }
        }
        this.fiveStarCount = this.fiveStar.length;
        this.fourStarCount = this.fourStar.length;
        this.threeStarCount = this.threeStar.length;
        this.twoStarCount = this.twoStar.length;
        this.oneStarCount = this.oneStar.length;
        this.totalReviews = this.reviewDetails.data.length;
        this.avgStarCount =Math.round((this.fiveStarCount * 5 + this.fourStarCount * 4 + this.threeStarCount * 3 + this.twoStarCount * 2 + this.oneStarCount * 1) / this.totalReviews ).toFixed(2);
        if(this.avgStarCount > 0){
          this.avgStar = this.avgStarCount;
        }  else{
          this.avgStar = 0;    // Bcoz here avgStar return NaN .
        }
      }
    })
  }
}
