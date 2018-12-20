import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Constants } from '../../api/constants';
import { tryParse } from 'selenium-webdriver/http';
import { APIConstants } from '../../api/api.constants';
import { DatePipe } from '@angular/common';
import { debug } from 'util';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  public reviewDetails: any = [] ; public  reviewDetailsCopy: any =[];
  fiveStar: any = [] ; fourStar: any = []; threeStar: any = []
  twoStar: any = []; oneStar: any = []; avgStar: any
  fiveStarCount: number; fourStarCount: number; threeStarCount: number; twoStarCount: number; oneStarCount: number
  today: any = Date(); diffDate: any = []; createdAt: any = Date(); totalDay: number;
  subject: string;  createAtdiffFromToday =<any>[];  message: any; stars: string = '1'; userDetail: any
  Data: any = []; user: any; totalReviews:number; IsPagingShow: Boolean = false; IsRegistered: Boolean = true
  constructor(private userService: UserService, private datePipe: DatePipe) { }
  ngOnInit() {
    // debugger;
    this.userDetail = JSON.parse(localStorage.getItem('user'))
    if (this.userDetail === null || this.userDetail.role === 'guest') {
      this.IsRegistered = false;

    }
    this.getAllReview();
  }

  getAllReview() {
    this.createAtdiffFromToday = [];
    this.userService.getPortalReview().subscribe((response: any) => {
      if (response.status == Constants.success) {

        this.reviewDetails = response.data;

        // console.log('Review page --- > ', JSON.stringify(this.reviewDetails));
        for (var i = 0; i < this.reviewDetails.data.length; i++) {

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
        this.reviewDetailsCopy.data = this.reviewDetails.data;
        this.avgStar = ((this.fiveStarCount * 5 + this.fourStarCount * 4 + this.threeStarCount * 3 + this.twoStarCount * 2 + this.oneStarCount * 1) / this.totalReviews).toFixed(2);
        if (this.totalReviews) {
          this.IsPagingShow = true;
        }
      }
    })
  }
  addReview() {
    // debugger                
    this.user = JSON.parse(localStorage.getItem('user'))
    this.Data = {
      'review': this.subject,
      'description': this.message,
      'rating': this.stars,
      'session': this.user.session_id,
      'oauth': APIConstants.OAUTH_TOKEN,
    }
    this.userService.postPortalReview(this.Data).subscribe((response: any) => {
      if (response.status == Constants.success) {
        this.userService.getPortalReview().subscribe((response: any) => {
          if (response.status == Constants.success) {
            this.reviewDetails = response.data;
          }
        })
      }
    })
  }
  roundValue(avgStar) {
    return Math.round(avgStar);
  }
  dateDifferencefromCreatedAt(createDate) {
    this.today = this.datePipe.transform(new Date());
    this.createdAt = this.datePipe.transform(createDate);
    let diffDate = Date.parse(this.today) - Date.parse(this.createdAt);
    this.totalDay = diffDate / 1000 / 60 / 60 / 24;
    return (this.totalDay);
  }
  filterData(Rating) {
// debugger;
    if (Rating != undefined) {
      this.reviewDetails.data = [];
      this.reviewDetails.data = this.reviewDetailsCopy.data;
      this.reviewDetails.data = this.reviewDetails.data.filter(x => x.rating == Rating);
      // console.log(this.reviewDetails);
    }
    else {
      alert('No Record found');
    }
  }
}
