import { Component, OnInit } from '@angular/core'
import * as $ from 'jquery'
import { UserService } from '../../services/user.service';
import { Constants } from '../../api/constants';
import { Cart } from '../../store/cart.store';
import { Router } from '@angular/router';

@Component({
    selector: 'app-changing-room',
    templateUrl: './changingRoom.component.html',
    styleUrls: ['./changingRoom.component.scss']
})

export class ChangingRoomComponent implements OnInit {
    cartItems: any
    currentUser: any
    myItems: any
    myWishListItems: any
    myPCRData: any

    constructor(private userService: UserService,
        private cart: Cart,
        private router: Router) {
    }

    ngOnInit() {
        let path = this.router.url.split('/')[1]
        this.cart.headerPath = path
        this.currentUser = JSON.parse(localStorage.getItem('user'))
        this.getMyCart()
        this.getMyWishList()
        this.getMyPCRData()
        $('#changingRoon li').click(function () {
            $('#changingRoon li').removeClass('active');
            $(this).addClass('active');
        })

        $("#zoomChangingRoom").click(function () {
            $(this).hide();
            $("#closeChangingRoom").fadeIn();
            $(".changing-room-component").addClass("fixed animated bounceIn");
            $("#cubeBox").attr('id', 'cubeBox-pop');
        });

        $("#closeChangingRoom").click(function () {
            $(this).hide();
            $("#zoomChangingRoom").fadeIn();
            $(".changing-room-component").removeClass("fixed animated bounceIn");
            $("#cubeBox-pop").attr('id', 'cubeBox');
        })
    }

    ngOnDestroy() {
        this.cart.headerPath = 'xyz'
    }

    // functions related to cart
    getMyCart() {
        if (this.currentUser && this.currentUser.role == 'guest') {
            this.myLocalCart()
        } else if (this.currentUser) {
            this.myCart()
        }
    }

    myLocalCart() {
        this.cartItems = JSON.parse(localStorage.getItem(this.currentUser.session_id))
        this.cart.cartData = this.cartItems
    }

    myCart() {
        this.userService.getCart().subscribe((response: any) => {
            if (response.status == Constants.success) {
                this.cartItems = response.data
                this.cart.cartData = this.cartItems
            }
        })
    }

    // functions related to wishlist
    getMyWishList() {
        if (this.currentUser && this.currentUser.role == 'guest') {
            this.myLocalWishList()
        } else if (this.currentUser) {
            this.myWishList()
        }
    }

    myLocalWishList() {
        let id = 'wishlist|' + this.currentUser.session_id
        this.myWishListItems = JSON.parse(localStorage.getItem(id))
        this.cart.wishListData = this.myWishListItems
    }

    myWishList() {
        this.userService.getWishList().subscribe((response: any) => {
            if (response.status == Constants.success) {
                this.myWishListItems = response.data
                this.cart.wishListData = this.myWishListItems
            }
        })
    }

    // functions related to personal changing room
    getMyPCRData() {
        if (this.currentUser && this.currentUser.role == 'guest') {
            this.myLocalPCR()
        } else if (this.currentUser) {
            this.myPCR()
        }
    }

    myLocalPCR() {
        let id = 'pcr|' + this.currentUser.session_id
        this.myPCRData = JSON.parse(localStorage.getItem(id))
        this.cart.pcrData = this.myPCRData
    }

    myPCR() {

    }
}