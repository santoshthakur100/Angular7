import { Component, OnInit } from '@angular/core'
import * as $ from 'jquery';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { SharedDataService } from '../../../services/shareData.service';
import { Constants } from '../../../api/constants';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../login/login.component';
import { Cart } from '../../../store/cart.store';

@Component({
    selector: 'app-cart-window',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {
    cart: Array<any> =[];
    cartLength: number = 0;
    user: any;
    totalAmount: number
    localCart: Array<any> = [];
    name:string;
    Color:string;
    Size:string;
    qty:string;
    price:number;
    product_id:string;
    constructor(private userService: UserService,
        private router: Router,
        private sharedCartData: SharedDataService,
        private modalService: NgbModal,
        private cartService: Cart) { }

    ngOnInit() {
        debugger;
        this.sharedCartData.currentCart.subscribe((sharedData: any) => {
            debugger;
            this.cart = sharedData;
            //  this.name=   this.cart[0].products.name;
            //  this.Color = sharedData[0].products.default_variant_options[1].name;
            //  this.Size= sharedData[0].products.default_variant_options[0].name;
            //  this.product_id=sharedData[0].product_id;
            //  this.qty=sharedData[0].products.qty;
            // this.price = sharedData[0].products.variations.price;
            this.cartService.cartData = this.cart;
            this.totalAmount = this.getTotalAmount(this.cart);
            this.cartLength = this.cart.length;           
        });
        this.user = JSON.parse(localStorage.getItem('user')); 
        if (this.user && this.user.role == 'guest') {
            this.cart = JSON.parse(localStorage.getItem(this.user.session_id))
            this.cartService.cartData = this.cart
            this.totalAmount = this.getTotalAmount(this.cart);
            this.cartLength = this.cart.length;
        } else {
            this.getCart()
            this.sharedCartData.currentCart.subscribe((sharedData: any) => {
                debugger;
                this.cart = sharedData;
                this.cartService.cartData = this.cart;
                this.totalAmount = this.getTotalAmount(this.cart);
                this.cartLength = this.cart.length;
               // this.name=  sharedData[0].products.name;
                // this.Color = this.cart.products.default_variant_options[1].name;
                // this.Size= this.cart.products.default_variant_options[0].name;
                // this.qty=this.cart.products.qty;
                // this.price = this.cart.products.variations.price;
            })
        }

       // console.log('Cart Data ---->', JSON.stringify(this.cart));

    }

     getCart() {
        this.userService.getCart().subscribe((response: any) => {
            if (response.status == Constants.success) {
                debugger
                this.cart = response.data
                this.cartService.cartData = this.cart
                this.totalAmount = this.getTotalAmount(this.cart);
                this.cartLength = this.cart.length;
               
            }
        })
    }

    increaseItemQty(product: any) {
        if ((this.user && this.user.role == 'guest') || (this.cartService.loginData && this.cartService.loginData.role == 'guest')) {
            let user = JSON.parse(localStorage.getItem('user'))
            let localCart = JSON.parse(localStorage.getItem(user.session_id))
            let item = localCart.filter((data: any) => data.id == product.id)
            if (item.length > 0) {
                item[0].qty++
              //  let i = item[0]
              //  localCart = localCart.filter(value => value.id != product.id)
              //  localCart.push(item[0])
                localStorage.setItem(user.session_id, JSON.stringify(localCart))
                this.cart = localCart
                this.cartService.cartData = this.cart
                this.totalAmount = this.getTotalAmount(this.cart);
                this.cartLength = this.cart.length;
            }
        } else {
            var obj = {
                "product_id": product.product_id,
                "variation_id": product.variations.id,
                "qty": 1,
                "donation": 0,

            };
            this.addCartToForUser(obj)
        }
    }

    decreaseItemQty(product: any) {
        if ((this.user && this.user.role == 'guest') || (this.cartService.loginData && this.cartService.loginData.role == 'guest')) {
            let user = JSON.parse(localStorage.getItem('user'))
            let localCart = JSON.parse(localStorage.getItem(user.session_id))
            let item = localCart.filter((data: any) => data.id == product.id)
            if (item.length > 0 && item[0].qty > 1) {
                item[0].qty--
              //  let i = item[0]
              //  localCart = localCart.filter(value => value.id != product.id)
              //  localCart.push(i)
                localStorage.setItem(user.session_id, JSON.stringify(localCart))
                this.cart = localCart
                this.cartService.cartData = this.cart
                this.totalAmount = this.getTotalAmount(this.cart);
                this.cartLength = this.cart.length;
            } else this.removeCartItem(product)
        } else {
            var obj = {
                "product_id": product.product_id,
                "variation_id": product.variations.id,
                "qty": -1,
                "donation": 0,
            };
            this.addCartToForUser(obj)
        }
    }

    addCartToForUser(product) {
        this.userService.addCart(product).subscribe((data: any) => {
            if (data.status == Constants.success) {
                this.userService.getCart().subscribe((data: any) => {
                    if (data.status == Constants.success) {
                        this.cartService.cartData = data.data;
                        this.sharedCartData.changeCart(data.data)
                    }
                })
            }
        })
    }

    removeCartItem(product: any) {
        if ((this.user && this.user.role == 'guest') || (this.cartService.loginData && this.cartService.loginData.role == 'guest')) {
            let user = JSON.parse(localStorage.getItem('user'))
            let localCart = JSON.parse(localStorage.getItem(user.session_id))
            localCart = localCart.filter(value => value.id != product.id)
            localStorage.setItem(user.session_id, JSON.stringify(localCart))
            this.cart = localCart
            this.cartService.cartData = this.cart
            this.totalAmount = this.getTotalAmount(this.cart)
            this.cartLength = this.cart.length;
        } else {
            let id = product.variation_id
            this.userService.deleteCartItem(id).subscribe((response: any) => {
                if (response.status == Constants.success) {
                    this.cart = this.cart.filter((filterValue: any) => filterValue.variation_id != id)
                    this.cartService.cartData = this.cart
                    this.totalAmount = this.getTotalAmount(this.cart);
                    this.cartLength = this.cart.length;
                }
            })
        }
    }

    getTotalAmount(cart: any) {
        this.totalAmount = 0
        if (cart) {
            cart.forEach(element => {
                this.totalAmount = this.totalAmount + (element.qty * element.variations.price)
            });
        }
        return this.totalAmount
    }

    openLoginModal() {
        const modalRef = this.modalService.open(LoginComponent);
        modalRef.result.then(() => {
            this.getCart()
            this.closeCart()
        })
    }

    moveToCheckout() {
        $('.shopping-cart-component').addClass('hide');
        this.router.navigate(['/payment'])
        localStorage.setItem('CartDetail', JSON.stringify(this.cart));
        localStorage.setItem('SubTotal', JSON.stringify(this.totalAmount));
    }

    closeCart() {
        $('.shopping-cart-component').addClass('hide');
    }
}