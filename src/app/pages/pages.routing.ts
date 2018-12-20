import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';

export const pagesRoutes: Routes = [
  {
    path: '', component: PagesComponent, 
    children: [
      {
        path: '', loadChildren: 'app/pages/mainHome/mainHome.module#MainHomeModule'
      },
      {
        path: 'cart', loadChildren: 'app/pages/home/home.module#HomeModule'
      },
      {
        path: 'aboutus', loadChildren: 'app/pages/aboutUs/aboutUs.module#AboutUsModule'
      },
      {
        path: 'offers', loadChildren: 'app/pages/offers/offers.module#OffersModule'
      },
      {
        path: 'testpage', loadChildren: 'app/pages/testpage/testpage.module#TestpageModule'
      },
      {
        path: 'guides', loadChildren: 'app/pages/guides/guides.module#GuidesModule'
      },
      {
        path: 'product', loadChildren: 'app/pages/product/product.module#ProductModule'
      },
      {
        path: 'productlist', loadChildren: 'app/pages/components/header/productlist/productlist.module#ProductlistModule'
      },
      {
        path: 'product-details/:id', loadChildren: 'app/pages/productDetails/productDetails.module#ProductDetailsModule'
      },
      {
        path: 'offers', loadChildren: 'app/pages/offers/offers.module#OffersModule'
      },
      {
        path: 'payment', loadChildren: 'app/pages/payment/payment.module#PaymentModule'
      },
      {
        path: 'myaccount', loadChildren: 'app/pages/my-account/my-account.module#MyAccountModule'
      },
      {
        path: 'changing-room', loadChildren: 'app/pages/changingRoom/changingRoom.module#ChangingRoomModule'
      },
      {
        path: 'terms-condition', loadChildren: 'app/pages/components/termsConditions/termsConditions.module#TermsConditionsModule'
      },
      {
        path: 'ethical-trading', loadChildren: 'app/pages/ethicalTrading/ethicalTrading.module#EthicalTradingModule'
      },
      {
        path: 'career', loadChildren: 'app/pages/career/career.module#CareerModule'
      },
      {
        path: 'return', loadChildren: 'app/pages/return/return.module#ReturnModule'
      },
      {
        path: 'faq', loadChildren: 'app/pages/faq/faq.module#FaqModule'
      },
      {
        path: 'contact', loadChildren: 'app/pages/contact/contact.module#ContactModule'
      }, 
      {
        path: 'confirmation', loadChildren: 'app/pages/confirmation/confirmation.module#ConfirmationModule'
      },
      {
        path: 'reviews', loadChildren: 'app/pages/reviews/reviews.module#ReviewsModule'
      },
      {
        path: 'wishlist', loadChildren: 'app/pages/wishlist/wishlist.module#WishlistModule'
      },
      {
        path: 'delivery-information', loadChildren: 'app/pages/deliveryInformation/deliveryInformation.module#DeliveryInformationModule'
      },
      {
        path: 'order-tracking', loadChildren: 'app/pages/orderTracking/orderTracking.module#OrderTrackingModule'
      },
      {
        path: '**', redirectTo: ''

      }
    ]
  },
];

