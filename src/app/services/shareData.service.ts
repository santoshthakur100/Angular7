import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedDataService {

  private cartData = new BehaviorSubject([]);
  currentCart = this.cartData.asObservable();

  private data = new BehaviorSubject([]);
  loginData = this.data.asObservable();

  private wishlistData = new BehaviorSubject([]);
  wishlistValue = this.wishlistData.asObservable();

  constructor() { }

  changeCart(cart: any) {
    this.cartData.next(cart)
  }

  changeLoginData(item: any) {
    this.data.next(item)
  }

  changeWishlist(wishlist: any) {
    this.wishlistData.next(wishlist)
  }
}