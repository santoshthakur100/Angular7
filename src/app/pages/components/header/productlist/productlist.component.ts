import { Cart } from '../../../../store/cart.store';    //'./../../store/cart.store';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import * as $ from 'jquery';
import "assets/scripts/lib/jquery.ripples.js";
import { LocalStorageService } from 'ngx-webstorage';
import { UserService } from '../../../../services/user.service';
import { SharedDataService } from '../../../../services/shareData.service';
import { Constants } from '../../../../api/constants';
import { FilterDataService } from '../../../../services/filterData.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../../login/login.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss']
})
export class ProductlistComponent implements OnInit {
  data: any
  prodList: boolean = false;
  productImages: Array<any> = [];
  mainProductImages: Array<any> = [];
  productList: Array<any> = [];
  userDetail: any;
  localWishList: Array<any> = [];
  localPCRData: Array<any> = []
  localCart: Array<any> = [];
  charity: number = 0
  isshowLoginModal: boolean = false;
  productSlider: Array<any> = [];
  scrollToProduct: any
  isProductList:Boolean;
  isBanner: Boolean;
  productListCopy: Array<any> = [];
  productListLoader: Boolean;
  productListData: Boolean;
  querystringParam:any;
  default_variant_options =<any>[];
  constructor(public cart: Cart, public cd: ChangeDetectorRef,
    public localStorageService: LocalStorageService,
    private userService: UserService,
    private modalService: NgbModal,
    private sharedDataService: SharedDataService,
    private filterDataService: FilterDataService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // this.isBanner =true;
    var value = "assets/muahh.svg"
    debugger;
    this.userDetail = JSON.parse(localStorage.getItem('user'));
    this.showLoginModal();
    this.getProductList('');  
    this.getwishList();
    this.getPCRData();
    this.productListLoader = true;
    this.productImages = [
      "assets/b1.jpg",
      "assets/b2.jpg",
      "assets/b3.jpg",
      "assets/b4.jpg"
    ];
    this.sharedDataService.currentCart.subscribe(message => message = message)
    this.filterDataService.currentData.subscribe(data => this.getProductList(data))
    $(".muahhSpyBar .spy").on('click', function (evt) {
      if (evt.target.hash !== '') {
        $('html, body').animate({ scrollTop: $(evt.target.hash).offset().top - 97 }, 1000);
        return false;
      }
    });
    setTimeout(() => {
      this.prodList = true
    }, 1000);

  }

  ngAfterViewInit() {
    // debugger;
    // $('.owl-carousel .owl-dot').hover(function () {
    //   debugger;
    //   $(this).click();
    // });
    
    this.sharedDataService.loginData.subscribe(data => this.userDetail = data)
    $('body').ripples({
      resolution: 512,
      dropRadius: 20,
      perturbance: 0.04,
    });

    if (typeof $.fn.ripples == 'function') {
      try {
        $('.ripple').ripples({
          resolution: 500,
          perturbance: 0.002,
          dropRadius: 10
        });
      } catch (e) {
        $('.error').show().text(e);
      }
    }

    // $('a.page-scroll').bind('click', function (event) {
    //   alert("product list");
    //   var $anchor = $(this);
    //   $('html, body').stop().animate({
    //     scrollTop: $($anchor.attr('href')).offset().top
    //   }, 1500, 'easeInOutExpo');
    //   event.preventDefault();
    // });

    
  }

  closeModal() {
    this.isshowLoginModal = false;
  }

  showLoginModal() {
    // debugger;
    let currentUser = localStorage.getItem('user');
    if (!currentUser) {
      const modalRef = this.modalService.open(LoginComponent)
    }
  }

  getProductList(value) {
    this.userService.getFrontPageData(value).subscribe((response: any) => {
      if (response.status == Constants.success) {
        debugger;
        this.productList=[];
        this.querystringParam = this.route.snapshot.queryParamMap.get('price');
        this.productList = response.data.products;
        this.cd.markForCheck();
        this.productListData = true;
        const splitprice = this.querystringParam.split('-');
        const minprice = parseInt(splitprice[0].split('£')[1].trim());
        const maxprice = parseInt(splitprice[1].split('£')[1].trim());
        this.productList =  this.productList.filter((data: any) => data.variations[0].price >= minprice && data.variations[0].price<= maxprice);
      }
      this.productListLoader= false;
    });
  }

  getwishList() {
    if (localStorage.getItem('user')) {
      let user = JSON.parse(localStorage.getItem('user'))
      if (user.role == 'guest' && localStorage.getItem('wishlist|' + user.session_id)) {
        let wishList = JSON.parse(localStorage.getItem('wishlist|' + user.session_id));
        this.cart.wishListData = wishList;
      } else {
        this.userService.getWishList().subscribe((response: any) => {
          if (response.status == Constants.success) {
            this.cart.wishListData = response.data;
          }
        })
      }
    }
  }

  getPCRData() {
    if (localStorage.getItem('user')) {
      let user = JSON.parse(localStorage.getItem('user'))
      if (user.role == 'guest' && localStorage.getItem('pcr|' + user.session_id)) {
        let pcrList = JSON.parse(localStorage.getItem('pcr|' + user.session_id))
        this.cart.pcrData = pcrList;  
      } else {
        // this.userService.getWishList().subscribe((response: any) => {
        //   if (response.status == Constants.success) {
        //     this.cart.pcrData = response.data
        //   }
        // })
      }
    }
  }

  listGallery(gallery, thumbnail) {
    gallery = gallery.map(function (element) {
      return element.image
    });
    gallery.unshift(thumbnail)
    return gallery
  }

  charityValue(event) {
    this.charity = event.target.value;
  }

  addToCart(productItem) {

    let user = JSON.parse(localStorage.getItem('user'));
    if ((user && user.role == 'guest') || (this.cart.loginData && this.cart.loginData.role == 'guest')) {
      this.addCartForLocal(productItem);
    } else {
      var obj = {
        "product_id": productItem.id,
        "variation_id": productItem.variations[0].id,
        "qty": 1,
        "donation": this.charity,
        "Color": productItem.default_variant_options[0].name,
        "Size":productItem.default_variant_options[1].name,
      };
      this.addCartForUser(obj);
    }
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
 debugger;
    let obj = {
      "products": {
        "name": productItem.name,
        "product_id": productItem.id,
        "thumbnail": productItem.thumbnail,
          "default_variant_options": productItem.default_variant_options  
      },
      "variations": {
        "id": productItem.variations[0].id,
        "sku": productItem.variations[0].sku,
        "price": productItem.variations[0].price,
      },
      "id": productItem.id,
      "qty": 1,
      "donation": this.charity
    }
    let user = JSON.parse(localStorage.getItem('user'));
    this.localCart = JSON.parse(localStorage.getItem(user.session_id));
    if (this.localCart == null) {
      localStorage.setItem(user.session_id, JSON.stringify([obj]));
    } else {
      let item = this.localCart.filter((data: any) => data.id == productItem.id);
      if (item.length > 0) {
        item[0].qty++;
        let i = item[0];
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
    let user = JSON.parse(localStorage.getItem('user'));
    if ((user && user.role == 'guest') || (this.cart.loginData && this.cart.loginData.role == 'guest')) {
      this.addWishListForLocal(product);
    } else {
      this.addWishListForUser(product);
    }
  }

  // home page add item to wishlist
  addWishListForLocal(product: any) {
    debugger;
    let user = JSON.parse(localStorage.getItem('user'));
    let id = 'wishlist|' + user.session_id;
    this.localWishList = JSON.parse(localStorage.getItem(id));
    if (this.localWishList == null) {
      localStorage.setItem(id, JSON.stringify([product]));
      this.localWishList = JSON.parse(localStorage.getItem(id));
    } else {
      let item = this.localWishList.filter((data: any) => data.id == product.id);
      if (item.length > 0) {
        this.localWishList = this.localWishList;
      } else {
        this.localWishList.push(product);
      }
      localStorage.setItem(id, JSON.stringify(this.localWishList));
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
            this.cart.wishListData = response.data
          }
        })
      }
    });
  }

  addToChangingRoom(product: any) {
    let user = JSON.parse(localStorage.getItem('user'))
    if ((user && user.role == 'guest') || (this.cart.loginData && this.cart.loginData.role == 'guest')) {
      this.addChangingRoomForLocal(product)
    } else {
      this.addChangingRoomForUser(product)
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
    let obj = {
      product_id: product.id,
      variation_id: product.variations[0].id
    }
    this.userService.addToPersonalChangingRoom(obj).subscribe((response: any) => {
      if (response.status == Constants.success) {
        this.cart.pcrData = response.data
      }
    });
  }

  ngOnDestroy(){
    // this.productListLoader = false;
  }

}
