import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Constants } from '../../api/constants';
import { Cart } from '../../store/cart.store';
import { SharedDataService } from '../../services/shareData.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { int } from 'babylonjs';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  wishList: any
  WishListLength: number = 0;
  user: any
  localCart: any
  Quantity: number = 1;
  Qty: Array<any> = [];
  constructor(private userService: UserService,
    public router: Router,
      private sharedDataService: SharedDataService,
      private cart: Cart) { }



  ngOnInit() {
    debugger
    if(localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'))
      if(this.user.role == 'guest' && localStorage.getItem('wishlist|' + this.user.session_id)) {
        this.wishList = JSON.parse(localStorage.getItem('wishlist|' + this.user.session_id));
        debugger;
        this.WishListLength = this.wishList.length;
        this.cart.wishListData = this.wishList
        debugger;
        // console.log(this.cart.wishListData);
      } else {
        this.getWishList()
      }
    }
  }

  getWishList() {
    debugger;
    this.userService.getWishList().subscribe((response: any) => {
      if(response.status == Constants.success) {
         debugger;
        this.wishList = response.data
        this.WishListLength = this.wishList.length;
        this.cart.wishListData = response.data
      }
    })
  }

  getPCRData() {
    if (localStorage.getItem('user')) {
      let user = JSON.parse(localStorage.getItem('user'))
      if (user.role == 'guest' && localStorage.getItem('pcr|' + user.session_id)) {
        let pcrList = JSON.parse(localStorage.getItem('pcr|' + user.session_id))
        this.cart.pcrData = pcrList
      } else {
        // this.userService.getWishList().subscribe((response: any) => {
        //   if (response.status == Constants.success) {
        //     this.cart.pcrData = response.data
        //   }
        // })
      }
    }
  }
  editWishListItem(id: string){
    this.router.navigateByUrl('/product-details/' + id);
  }


  removeWishListItem(id: string) {
    if(localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'))
      if(this.user.role == 'guest' && localStorage.getItem('wishlist|' + this.user.session_id)) {
        this.wishList = JSON.parse(localStorage.getItem('wishlist|' + this.user.session_id))
        this.wishList = this.wishList.filter((filterData: any) => filterData.id != id)
        localStorage.setItem('wishlist|' + this.user.session_id, JSON.stringify(this.wishList))
        this.cart.wishListData = this.wishList
        this.WishListLength = this.wishList.length;
      } else {
        this.userService.deleteWishListItem(id).subscribe((response: any) => {
          if(response.status == Constants.success) {
            this.wishList = this.wishList.filter((filterData: any) => filterData.id != id)
            this.cart.wishListData = this.wishList
            this.WishListLength = this.wishList.length;
          }
        })
      }
    }
  }
  qtyAddToCart(productItem) {
    this.addToCart(productItem);
  }

  addToCart(productItem) {
    let user = JSON.parse(localStorage.getItem('user'))
    if ((user && user.role == 'guest') || (this.cart.loginData && this.cart.loginData.role == 'guest')) {
      this.addCartForLocal(productItem)
    } else {
      var obj = {
        "product_id": productItem.product_id,
        "variation_id": productItem.variation_id,
        "qty": this.Quantity,
        "donation": 0
      };
      this.addCartForUser(obj, productItem.id)
    }
  }

  addCartForUser(product, id) {
    this.removeWishListItem(id)
    this.userService.addCart(product).subscribe((response: any) => {
      if (response.status == Constants.success) {
        this.userService.getCart().subscribe((response: any) => {
          if (response.status == Constants.success) {
            this.cart.cartData = response.data;
            this.sharedDataService.changeCart(response.data)
          }
        })
      }
    })
  }

  addCartForLocal(productItem) {
    this.removeWishListItem(productItem.id)
    let obj = {
      "products": {
        "name": productItem.name,
        "product_id": productItem.id,
        "thumbnail": productItem.thumbnail
      },
      "variations": {
        "id": productItem.variations[0].id,
        "sku": productItem.variations[0].sku,
        "price": productItem.variations[0].price,
      },
      "id": productItem.id,
      "qty":this.Quantity,
      "donation": 0
    }
    let user = JSON.parse(localStorage.getItem('user'))
    this.localCart = JSON.parse(localStorage.getItem(user.session_id))
    if (this.localCart == null) {
      localStorage.setItem(user.session_id, JSON.stringify([obj]))
    } else {
      let item = this.localCart.filter((data: any) => data.id == productItem.id)
      if (item.length > 0) {
        item[0].qty = item[0].qty + this.Quantity;
        let i = item[0]
        this.localCart = this.localCart.filter(value => value.id != productItem.id)
        this.localCart.push(i)
      } else {
        this.localCart.push(obj)
      }
      localStorage.setItem(user.session_id, JSON.stringify(this.localCart))
    }
    this.cart.cartData = JSON.parse(localStorage.getItem(user.session_id))
    this.sharedDataService.changeCart(JSON.parse(localStorage.getItem(user.session_id)))
  }

  IncrementValue(Quantity) {

    if (Quantity <= 9 && Quantity >= 1) {
      this.Quantity = this.Quantity + 1;
    }

  }
  DecrementValue(Quantity) {

    if (Quantity <= 10 && Quantity > 1) {
      this.Quantity = this.Quantity - 1;
    }
  }  
}
export interface Options{
  key:  number;
  value: string;
}
