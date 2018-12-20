import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Cart } from '../../../store/cart.store';
import { UserService } from '../../../services/user.service';
import { Constants } from '../../../api/constants';
import { SharedDataService } from '../../../services/shareData.service';
import { Router } from '@angular/router';
declare var $: any;
 
@Component({
  selector: 'comp-productCumImage',
  templateUrl: './productCumImage.component.html',
  styleUrls: ['./productCumImage.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductCumImageComponent implements OnInit {

  @Input() productName: string;
  @Input() productImagePath: string;
  @Input() productPrice: number;
  @Input() productDetail: any
  localCart: any = []
  localPCRData: any = []
  localWishList: any = []

  constructor(private cart: Cart,
    private router: Router,
    private userService: UserService,
    private sharedDataService: SharedDataService) { }

  ngOnInit() {
  }

  goToProductDetail(id: string) {
    this.router.navigate(['/product-details', id])
  }

  addToCart(productItem) {
    // debugger;
    let user = JSON.parse(localStorage.getItem('user'))
    if ((user && user.role == 'guest') || (this.cart.loginData && this.cart.loginData.role == 'guest')) {
      this.addCartForLocal(productItem)
    } else {
      var obj = {
        "product_id": productItem.id,
        "variation_id": productItem.variations[0].id,
        "qty": 1,
        // "donation": this.charity
      };
      this.addCartForUser(obj)
    }
    $('.shopping-cart-component').removeClass('hide');      // For Open popup on add to cart.
  }

  addCartForUser(product) {
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
    debugger
    let obj = {
      "products": {
        "name": productItem.name,
        "product_id": productItem.id,
        "thumbnail": productItem.thumbnail,
        "Size":productItem.default_variant_options[0].name,
        "Color":productItem.default_variant_options[1].name
      },
      "variations": {
        "id": productItem.variations[0].id,
        "sku": productItem.variations[0].sku,
        "price": productItem.variations[0].price,
      },
      "id": productItem.id,
      "qty": 1,
      // "donation": this.charity
    }
    let user = JSON.parse(localStorage.getItem('user'))
    this.localCart = JSON.parse(localStorage.getItem(user.session_id))
    if (this.localCart == null) {
      localStorage.setItem(user.session_id, JSON.stringify([obj]));
    } else {
      let item = this.localCart.filter((data: any) => data.id == productItem.id);
      if (item.length > 0) {
        item[0].qty++
        let i = item[0]
        this.localCart = this.localCart.filter(value => value.id != productItem.id);
        this.localCart.push(i);
      } else {
        this.localCart.push(obj);
      }
      localStorage.setItem(user.session_id, JSON.stringify(this.localCart));
    }
    this.cart.cartData = JSON.parse(localStorage.getItem(user.session_id));
    this.sharedDataService.changeCart(JSON.parse(localStorage.getItem(user.session_id)));
  }

  addToWishList(product: any) {
    let user = JSON.parse(localStorage.getItem('user'))
    if ((user && user.role == 'guest') || (this.cart.loginData && this.cart.loginData.role == 'guest')) {
      this.addWishListForLocal(product);
    } else {
      this.addWishListForUser(product);
    }
  }

  // home page add item to wishlist
  addWishListForLocal(product: any) {
    let user = JSON.parse(localStorage.getItem('user'))
    let id = 'wishlist|' + user.session_id
    this.localWishList = JSON.parse(localStorage.getItem(id))
    if (this.localWishList == null) {
      localStorage.setItem(id, JSON.stringify([product]))
      this.localWishList = JSON.parse(localStorage.getItem(id))
    } else {
      let item = this.localWishList.filter((data: any) => data.id == product.id);
      if (item.length > 0) {
        this.localWishList = this.localWishList;
      } else {
        this.localWishList.push(product);
      }
      localStorage.setItem(id, JSON.stringify(this.localWishList))
    }
    this.cart.wishListData = this.localWishList;
  }

  addWishListForUser(product: any) {
    let obj = {
      "product_id": product.id,
      "variation_id": product.variations[0].id
    }
    this.userService.addToWishList(obj).subscribe((response: any) => {
      if (response.status == Constants.success) {
        this.userService.getWishList().subscribe((response: any) => {
          if (response.status == Constants.success) {
            this.cart.wishListData = response.data;
          }
        })
      }
    })
  }

  addToChangingRoom(product: any) {
    let user = JSON.parse(localStorage.getItem('user'))
    if ((user && user.role == 'guest') || (this.cart.loginData && this.cart.loginData.role == 'guest')) {
      this.addChangingRoomForLocal(product);
    } else {
      this.addChangingRoomForUser(product);
    }
  }

  addChangingRoomForLocal(product: any) {
    let user = JSON.parse(localStorage.getItem('user'))
    let id = 'pcr|' + user.session_id
    this.localPCRData = JSON.parse(localStorage.getItem(id))
    if (this.localPCRData == null) {
      localStorage.setItem(id, JSON.stringify([product]))
      this.localPCRData = JSON.parse(localStorage.getItem(id))
    } else {
      let item = this.localPCRData.filter((data: any) => data.id == product.id)
      if (item.length > 0) {
        this.localPCRData = this.localPCRData
      } else {
        this.localPCRData.push(product)
      }
      localStorage.setItem(id, JSON.stringify(this.localPCRData))
    }
    this.cart.pcrData = this.localPCRData
  }

  addChangingRoomForUser(product: any) {

  }
}
