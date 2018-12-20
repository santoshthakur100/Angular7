import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as $ from 'jquery';

@Component({
  selector: 'app-aboutUs',
  templateUrl: './aboutUs.component.html',
  styleUrls: ['./aboutUs.component.scss']
})
export class AboutUsComponent implements OnInit {

  aboutList: Array<any> = [];
  productList: Array<any> = [];

  // public missionTab = true;
  // public designTab = false;

  public reviewsUsComponent: Boolean = false;
  public aboutUsComponent: Boolean = true;

  public missionContent = true;
  public designContent = false;
  // public active:Boolean = true;

  nav:true;
  navText: [
    "<i class='fa fa-chevron-left'></i>",
    "<i class='fa fa-chevron-right'></i>"
  ];

  constructor( public activatedRoute: ActivatedRoute) { }


  ngOnInit() {
debugger;
    this.activatedRoute.queryParams.subscribe(params => {
      debugger;
      let getFooterValue = params['footer'];
      if (getFooterValue === "True")
      {
        this.reviewsUsComponent = true;
        this.aboutUsComponent = false;
      }
      else {
        this.reviewsUsComponent = false;
        this.aboutUsComponent = true;
      }
  });

    this.aboutList = [
      {
        icon: 'icon-product-search',
        head: 'Easy product search',
        para: 'View our products by our Basic, Special and Luxury...',
        disc: 'View our products by our Basic, Special and Luxury ranges. We\'ve also included a price guide to help you find what better suits you and your budget.'
      },
      {
        icon: 'icon-trial-room',
        head: 'Try before you buy',
        para: 'Our Personal Changing Room is 100% secure with...',
        disc: 'Our Personal Changing Room is 100% secure with algorithms behind the scenes which work with the measurements you enter to help you try the products on with the help of our virtual assistant. It\'s simple, just complete your details to register and our assistant will guide you through the rest!'
      },
      {
        icon: 'icon-web-search',
        head: 'Hassle free browsing',
        para: 'We do all the work for you to pick out the products we...',
        disc: 'We do all the work for you to pick out the products we have available to you in your size. Once you register you can browse knowing that you will not get the disappointment of looking through hundreds of products which come in the wrong sizes.'
      },
      {
        icon: 'icon-costumer-care',
        head: 'Caring for our customers',
        para: 'We have a dedicated customer service team...',
        disc: 'We have a dedicated customer service team guaranteed to respond to your query within 24 hours. Click here for details.'
      },
      {
        icon: 'icon-return-policy',
        head: 'Return policy',
        para: 'We understand that not everything in online...',
        disc: 'We understand that not everything in online shopping comes to plan, which is why we have made it easy for you to return an unworn product back to us in 7 working days from the delivered date. For full Returns Policy details, please click here.'
      }
      // {
      //   icon: 'icon-rewad',
      //   head: 'Rewarding our members',
      //   para: 'As well as offering a tailored shopping experience, our...',
      //   disc: 'As well as offering a tailored shopping experience, our registered members will receive updates on the newest offers through our newsletter, and will be able to support us in our charity cause to earn reward points to spend towards Muahh purchases.'
      // }
    ]; 
  }

  ngAfterViewInit () {
    $( ".owl-prev").html('<i class="fa fa-chevron-left"></i>');
    $( ".owl-next").html('<i class="fa fa-chevron-right"></i>');
  }

  mission(tab, newValue) {
    // this.missionTab = newValue;
    // this.designTab = false;
    this.missionContent = true;
    this.designContent = false;
  }

  design(tab, newValue) {
    // this.designTab = newValue;
    // this.missionTab = false;
    this.designContent = true;
    this.missionContent = false;
  }

  aboutUsComponentFun(e, newValue){
    this.aboutUsComponent = true;
    this.reviewsUsComponent = false;
  }

  reviewsUsComponentFun(e, newValue){
    debugger;
    this.reviewsUsComponent = true;
    this.aboutUsComponent = false;
  }

}
