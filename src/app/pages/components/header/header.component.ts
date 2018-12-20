import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Cart } from '../../../store/cart.store';
import { LocalStorageService } from 'ngx-webstorage';
import * as $ from 'jquery';
import { UserService } from '../../../services/user.service';
import { FilterDataService } from '../../../services/filterData.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../login/login.component';
import { Router,NavigationExtras } from '@angular/router';
import { Constants } from '../../../api/constants';
import { SharedDataService } from '../../../services/shareData.service';
import { OrderModule } from 'ngx-order-pipe';

// import {MainHomeComponent} from '../../mainHome/mainHome.component';
interface HeaderFilter {
  priceRange?: string,
  category?: string,
};

@Component({
 // providers:[MainHomeComponent],
  selector: 'app-mainheader',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class HeaderComponent implements OnInit {
  productList: any
  isshowLoginModal: boolean = false;
  variant: any
  variantWithoutSize: any
  categories: any
  filterArray: Array<any> = []
  searchFilter: Array<any> = []
  sizeFilterResponse: Array<any> = []
  sizeFilter: Array<any> = []
  mainFilter: Array<any> = [
    { 'title': 'Essential', 'heading': 'Essential', 'value': 'essential', 'price': '£5 - £25', 'id': 'sectionA' },
    { 'title': 'Special', 'heading': 'Special', 'value': 'special', 'price': '£26 - £55', 'id': 'sectionB' },
    { 'title': 'Luxury', 'heading': 'Luxury', 'value': 'luxury', 'price': '£56 - £95', 'id': 'sectionC' },
    { 'title': 'All', 'heading': 'All', 'value': 'all', 'price': '', 'id': 'sectionAL' }
  ]
  standardSizes: Array<any> = [30, 32, 34, 36, 38, 40]
  headerfilter: HeaderFilter = {}
  headerVariant: Array<any> = []
  pcrNav: boolean
  isClearFilter: boolean = false;
  showWelcomeUser: string;
  constructor(public cart: Cart,
    public localStorageService: LocalStorageService,
    private userService: UserService,
    private filterDataService: FilterDataService,
    private sharedDataService: SharedDataService,
    private modalService: NgbModal,
    private router: Router
   ) { }

   

  ngOnInit() {
    debugger;
    if(this.cart.headerPath == 'changing-room') {
      this.pcrNav = true;
      //  below line commented by kamal reason -I don't know why these are used in ngOnInit 
  //  this.getProductList('')
  //   this.getPCRData()
  //   this.getwishList()
}
  let user = JSON.parse(localStorage.getItem('user'))
  if(user.role === 'guest') {
  this.showWelcomeUser = user.role;
  } else {
  this.showWelcomeUser = user.user_name;
  }
}
// UserSignOut()
// {
//   debugger;
//   alert( this.showWelcomeUser);
//   localStorage.removeItem('user');
//    this.showWelcomeUser = '';
//   alert( this.showWelcomeUser);
  
// }

  showLoginModal() {
    debugger;
    let currentUser = this.localStorageService.retrieve('user');
    if (!currentUser) {
      const modalRef = this.modalService.open(LoginComponent)
    }
  }

  closeModal() {
    this.isshowLoginModal = false;
  }

  noOfItemsInCart(cartData: any) {
    let count = 0
    if(cartData) {
      cartData.forEach(element => {
        count = count + element.qty
      }); 
    }
    return count
  }

  getProductList(queryString) {

    console.log('>>>>>>>>>>>>>>>>>>>>>>>>', this.userService);

    this.userService.getFrontPageData(queryString).subscribe((response: any) => {
      if (response.status == 'success') {
        this.variant = response.data.variants;
        this.variantWithoutSize = response.data.variants.filter(function (element, index, array) {
          return (element.name != 'Size');
        });
        this.categories = response.data.categories;
        this.categories.sort((a, b) => a.name < b.name ? '-1':'1');
         let FilterResponse = response.data.variants.filter(function (element, index, array) {
          return (element.name == 'Size');
        });
        this.sizeFilterResponse = FilterResponse.length > 0 ? FilterResponse[0] : [];
        for (var s in this.standardSizes) {
          let row: Array<any> = [];
          for (var i in this.sizeFilterResponse['variant_options']) {
            if (this.sizeFilterResponse['variant_options'][i]['name'].indexOf(this.standardSizes[s]) >= 0) {
              row.push(this.sizeFilterResponse['variant_options'][i]);
            }
            this.sizeFilter[this.standardSizes[s]] = row;
          }
        }
        this.filterDataService.changeData(queryString)
      }
    })
    this.isClearFilter = false;
  }

  getPCRData() {
    if (localStorage.getItem('user')) {
      let user = JSON.parse(localStorage.getItem('user'))
      if (user.role == 'guest' && localStorage.getItem('pcr|' + user.session_id)) {
        let pcrList = JSON.parse(localStorage.getItem('pcr|' + user.session_id))
        this.cart.pcrData = pcrList
      } else {
        this.userService.getPersonalChangingRoomList().subscribe((response: any) => {
          if (response.status == Constants.success) {
            this.cart.pcrData = response.data
          }
        })
      }
    }
  }

  getwishList() {
    if (localStorage.getItem('user')) {
      let user = JSON.parse(localStorage.getItem('user'))
      if (user.role == 'guest' && localStorage.getItem('wishlist|' + user.session_id)) {
        let wishList = JSON.parse(localStorage.getItem('wishlist|' + user.session_id))
        this.cart.wishListData = wishList
      } else {
        this.userService.getWishList().subscribe((response: any) => {
          if (response.status == Constants.success) {
            this.cart.wishListData = response.data
          }
        })
      }
    }
  }

  openCart() {
    $('.shopping-cart-component').removeClass('hide');
  }

  filter(price: any, level: any) {
    debugger;
    this.headerfilter.priceRange = price;
    this.headerfilter.category = '';
    this.headerVariant = [];
    this.parseQueryString();
    //this.router.navigate(['/']);
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "price": price,
        
      }
    };
    this.router.navigate(["/productlist"], navigationExtras);
    this.getProductList('');
    this.getPCRData();
    this.getwishList();
  }

  filterCategory(value: string) {
    debugger;
    this.headerfilter.category = value
    this.parseQueryString()
   // this.goToRoute();
  }

  filterVariant(value: string, type: string) {
    this.headerVariant[type] = value
    this.parseQueryString()
  }

  parseQueryString() {
    this.isClearFilter = true;
    let qString = '?'
    qString += this.headerfilter.category ? 'categories=' + this.headerfilter.category + '&' : ''
    qString += this.headerfilter.priceRange ? 'price_range=' + this.headerfilter.priceRange + '&' : ''
    if (Object.keys(this.headerVariant).length > 0) {
      qString += 'variation_option=' + (Object.values(this.headerVariant).join(','))
    }
    this.filterDataService.changeData(qString)
  }

  ngAfterViewInit() {
    
    $(".muahhTabSub-menu-label3-link").click(function (e) {
      e.preventDefault();
    });

    $('#searchPanelLink').click(function () {
      $('#searchPanel').slideToggle();
    })

    $('.muahhTabSub-menu-label3-link a').click(function () {
      var height = $('#myCarousel').height();
      $('html, body').animate({
        scrollTop: $("#section2").offset().top - 126
      }, 1000);
    });

    $("#sectionF").on('click', function () {
      $('.muahhTab').find('a').removeClass('active');
      $(this).addClass('active');
      $("#menuFilter").slideDown();
      $("#menuOne, #luxuryMenuBar, #specialMenuBar, #basicMenuBar, #menuOne").slideUp();
    })

    $("#sectionA, #sectionB, #sectionC").on('click', function () {
      $('.muahhTab').find('a').removeClass('active');
      $(this).addClass('active');
      $("#basicMenuBar, #luxuryMenuBar, #menuOne, #menuFilter, #submainSizeMenu").slideUp();
      $("#menuOne").slideDown();
      $("#colorSizeMenu").children().slideUp();
    })

    $(document).on('click', '#menuOne li', function (e) {
      let id = $(this).children('a').attr("cat-id");
      $('#level-2-list-' + id).siblings().not(this).slideUp();
      $('#level-2-list-' + id).slideDown();
      $("#basicMenuBar").slideDown();
    });

    $(document).on('click', '#submainSizeMenu li', function (e) {
      let size = $(this).children('a').attr("standard-size");
      $('#muahhSize-' + size).slideDown();
      $('#muahhSize-' + size).siblings().not(this).slideUp();
      $("#muahhColor").slideUp();
      $("#colorSizeMenu").slideDown();
    });

    $(document).on('click', '#menuFilter li', function (e) {
      let id = $(this).children('a').attr("variant-id");
      let variant = $(this).children('a').attr("data-link-alt");
      if (variant != 'Size') {
        $("#submainSizeMenu").slideUp();
        $('#level-2-filter-' + id).siblings().not(this).slideUp();
        $('#level-2-filter-' + id).slideDown();
      } else {
        $("#submainSizeMenu").slideDown();
        $("#colorSizeMenu").children().slideUp();
      }
    });
  }
  removeFilters(){
    debugger;
    this.categories = '';
    this.headerfilter.priceRange = '';
    this.headerfilter.category = '';
    this.headerVariant = [];
    this.isClearFilter = false;
    if(this.cart.headerPath == 'changing-room') {
      this.pcrNav = true;
    }
    this.categories = [];
    //  this.getProductList('')
    //  this.getPCRData()
    //  this.getwishList()
    $('.shopping-cart-component').addClass('hide');
  }


}
