import { ProductDetailsService } from './../productDetails.service';
import { Component, NgZone, ApplicationRef } from '@angular/core';
import { Cart } from '../../../store/cart.store';
import { UserService } from '../../../services/user.service';
import { Constants } from '../../../api/constants';
import { SharedDataService } from '../../../services/shareData.service';
import { ActivatedRoute, Router } from '@angular/router';
import { containerStart } from '@angular/core/src/render3/instructions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../login/login.component';
import { LocalStorage } from 'ngx-webstorage';

declare var $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  progress: number = 0;
  label: string;
  productDetails: any;
  localCart: any = [];
  localWishList: any = [];
  localPCRData: any = [];
  Quantity: number = 1;
  productId: any;
  localAddcartList: any;
  localAddwishList: any;
  galleryImages = <any>[];
  ColorList = <any>[];
  public userReviewDetails: any = [];
  reviewCount: number; totalReviews: number;
  fiveStar: any = []; fourStar: any = []; threeStar: any = [];
  oneStar: any = []; avgStar: number; twoStar: any = []
  fiveStarCount: number; fourStarCount: number; threeStarCount: number;
  twoStarCount: number; oneStarCount: number; userDetail: any; avgStarCount: any;
  constructor(public applicationRef: ApplicationRef,
    private _ngZone: NgZone,
    private cart: Cart,
    private sharedDataService: SharedDataService,
    private userService: UserService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private modalService: NgbModal,
    public productDetailsService: ProductDetailsService) {
      debugger;
    this.productDetails = this.productDetailsService.productDetails;
    this.productDetailsService.productDetailsSubject.subscribe((data) => {
      this.productDetails = null;
      debugger;
      this.productDetails = this.productDetailsService.productDetails;
      localStorage.setItem('ProductCollection', JSON.stringify(this.productDetails))
      this.Quantity = 1;
      this.ColorList = [];
    })
  }
  ngOnInit() {
    debugger;
    this.userDetail = JSON.parse(localStorage.getItem('user'))
    this.activatedRoute.params.subscribe((data) => {
      this.productId = data['id'];
     
    this.userService.getUserReview(this.productId).subscribe((res: any) => {
      if (res.status == Constants.success) {
        this.userReviewDetails = res.data;
        this.reviewCount = this.userReviewDetails.data.length;
        for (var i = 0; i < this.userReviewDetails.data.length; i++) {
    
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
        this.avgStarCount = Math.round((this.fiveStarCount * 5 + this.fourStarCount * 4 + this.threeStarCount * 3 + this.twoStarCount * 2 + this.oneStarCount * 1) / this.totalReviews );
            if(this.avgStarCount > 0){
              this.avgStar = this.avgStarCount;
            } else {
              this.avgStar = 0;    // Bcoz here avgStar return NaN .
            }
           }
       })
    })
   
  }

  galleryImage(){
    debugger;
    for(let i=0 ; i< this.productDetails.gallery.length ; i++){
      if(this.productDetails.gallery.length > 0) {
        debugger;
        this.galleryImages.push(this.productDetails.gallery[i].image)
      }
    }
  }
  changeZoomImage(imagePath) {
    this.productDetails.thumbnail = imagePath;
    this.applicationRef.tick();
  }




  GetColorList(productDetail) {
    this.ColorList = [];
    for (let i = 0; i < productDetail.variations.length; i++) {
      for (let j = 0; j < productDetail.variations[i].variant_options.length; j++) {
        if (productDetail.variants[0].id === productDetail.variations[i].variant_options[j].variant_id && productDetail.variants[0].type === 'color') {
          this.ColorList.push({ product_id: productDetail.variations[i].product_id, variationId: productDetail.variations[i].id, name: productDetail.variations[i].variant_options[j].name });
        }//if(){
        // for size code make new array for size
        //}
      }
      // if (productDetail.variants[0].id === productDetail.variations[i].variant_options[1].variant_id && productDetail.variants[0].type === 'color') {
      //   this.ColorList.push({product_id:productDetail.variations[i].product_id, variationId:productDetail.variations[i].id, name:productDetail.variations[i].variant_options[1].name});
      // }

    }
  }

  GetImageWithColor(colorname, variationId, product_id) {
    const GetVariantList = this.productDetails.variations.filter(val => val.product_id === product_id && val.id === variationId);
    if (GetVariantList[0].product_id != null && GetVariantList[0].id !== null) {
      this.productDetails.thumbnail = GetVariantList[0].image;
      this.productDetails.gallery = GetVariantList[0].variation_images;
      this.applicationRef.tick();
    }

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

  goToRoute(routePath?) {
    if (this.userDetail === null || this.userDetail.role === 'guest')
    {   
           const modalRef = this.modalService.open(LoginComponent)

    }
    if (routePath) {
      this.productId = JSON.parse(localStorage.getItem('productId'));
      this.router.navigateByUrl('/product-details/' + this.productId + '/' + routePath);
    } else {
      this.router.navigateByUrl('/product-details/' + this.productId);
    }
  }

  // listGallery(gallery) {
  //   debugger;
  //   gallery = gallery.map(function (element) {
  //     return element.thumbnail
  //   });
  //   return gallery
  // }

  // Loop inside the Angular zone
  // so the UI DOES refresh after each setTimeout cycle
  // processWithinAngularZone() {
  //   this.label = 'inside';
  //   this.progress = 0;
  //   this._increaseProgress(() => console.log('Inside Done!'));
  // }

  // // Loop inside the Angular zone
  // // so the UI DOES refresh after each setTimeout cycle
  processWithinAngularZone() {
    this.label = 'inside';
    this.progress = 0;
    this._increaseProgress(() => console.log('Inside Done!'));
    // console.log('Outside Doneasdfasdf!');
  }

  // // Loop outside of the Angular zone
  // // so the UI DOES NOT refresh after each setTimeout cycle
  processOutsideOfAngularZone() {
    this.label = 'outside';
    this.progress = 0;
    this._ngZone.runOutsideAngular(() => {
      this._increaseProgress(() => {
        // reenter the Angular zone and display done
        this._ngZone.run(() => {
          // console.log('Outside Done!');
        });
      });
    });
  }

  _increaseProgress(doneCallback: () => void) {
    this.progress += 1;
    // console.log(`Current progress: ${this.progress}%`);

    if (this.progress < 100) {
      // console.log('Outside Done!');
      window.setTimeout(() => this._increaseProgress(doneCallback), 10);
    } else {
      // console.log('Outside Done! 0000');
      doneCallback();
    }
  }

  ngAfterViewInit() {
    const colorLink: any = $('#colorLink');
    colorLink.click(function () {
      $('#colorObj').slideToggle();
    });

    $('#colorObj li').each(function () {
      $(this).click(function (e) {
        alert(e.target.children[0].title);
        console.dir(e.target.children[0].title);
      });
    });

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
  qtyAddToCart(productItem) {
    this.addToCart(productItem);
  }

  addToCart(productItem) {
    debugger;
    let user = JSON.parse(localStorage.getItem('user'))
    if ((user && user.role == 'guest') || (this.cart.loginData && this.cart.loginData.role == 'guest')) {
      this.addCartForLocal(productItem)
    } else {
      var obj = {
        "product_id": productItem.id,
        "variation_id": productItem.variations[0].id,
        "qty": this.Quantity,
        "Color": 'white',
        "Size":'32A'
        // "Color": productItem.default_variant_options[0].name,
        // "Size":productItem.default_variant_options[1].name,
        // "donation": this.charity
      };
      this.addCartForUser(obj);
    }
    $('.shopping-cart-component').removeClass('hide');
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
    if (this.Quantity > 1) {
      this.localAddcartList = {
        "products": {
          "name": productItem.name,
          "product_id": productItem.id,
          "thumbnail": productItem.thumbnaill,
          "Color": 'white',
          "Size":'32A'
          // "Color": productItem.default_variant_options[0].name,
          // "Size":productItem.default_variant_options[1].name,

        },
        "variations": {
          "id": productItem.variations[0].id,
          "sku": productItem.variations[0].sku,
          "price": productItem.variations[0].price,
        },
        "id": productItem.id,
        "qty": this.Quantity,
        // "donation": this.charity
      }
    } else {
      this.localAddcartList = {
        "products": {
          "name": productItem.name,
          "product_id": productItem.id,
          "thumbnail": productItem.thumbnail,
          "Color": 'white',
          "Size":'32A'
          // "Color": productItem.default_variant_options[0].name,
          // "Size":productItem.default_variant_options[1].name,
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
    }
    let user = JSON.parse(localStorage.getItem('user'))
    this.localCart = JSON.parse(localStorage.getItem(user.session_id))
    if (this.localCart == null) {
      localStorage.setItem(user.session_id, JSON.stringify([this.localAddcartList]))
    } else {
      let item = this.localCart.filter((data: any) => data.id == productItem.id)
      if (item.length > 0) {
        item[0].qty = item[0].qty + this.Quantity;
        let i = item[0]
        this.localCart = this.localCart.filter(value => value.id != productItem.id)
        this.localCart.push(i)
      } else {
        this.localCart.push(this.localAddcartList);
      }
      localStorage.setItem(user.session_id, JSON.stringify(this.localCart));
    }
    this.cart.cartData = JSON.parse(localStorage.getItem(user.session_id));
    this.sharedDataService.changeCart(JSON.parse(localStorage.getItem(user.session_id)));
   
  }

  addToWishList(product: any) {
    let user = JSON.parse(localStorage.getItem('user'))
    if ((user && user.role == 'guest') || (this.cart.loginData && this.cart.loginData.role == 'guest')) {
      this.addWishListForLocal(product)
    } else {
      this.addWishListForUser(product)
    }
  }

  // home page add item to wishlist
  addWishListForLocal(product: any) {
    debugger;
    let user = JSON.parse(localStorage.getItem('user'))
    let id = 'wishlist|' + user.session_id
    this.localWishList = JSON.parse(localStorage.getItem(id))
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
      "variation_id": product.variations[0].id,
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
    let user = JSON.parse(localStorage.getItem('user'));
    if ((user && user.role == 'guest') || (this.cart.loginData && this.cart.loginData.role == 'guest')) {
      this.addChangingRoomForLocal(product);
    } else {
      this.addChangingRoomForUser(product);
    }
  }

  addChangingRoomForLocal(product: any) {
    let user = JSON.parse(localStorage.getItem('user'));
    let id = 'pcr|' + user.session_id;
    this.localPCRData = JSON.parse(localStorage.getItem(id));
    if (this.localPCRData == null) {
      localStorage.setItem(id, JSON.stringify([product]));
      this.localPCRData = JSON.parse(localStorage.getItem(id));
    } else {
      let item = this.localPCRData.filter((data: any) => data.id == product.id);
      if (item.length > 0) {
        this.localPCRData = this.localPCRData;
      } else {
        this.localPCRData.push(product);
      }
      localStorage.setItem(id, JSON.stringify(this.localPCRData));
    }
    this.cart.pcrData = this.localPCRData;
  }

  addChangingRoomForUser(product: any) {

  }

}

