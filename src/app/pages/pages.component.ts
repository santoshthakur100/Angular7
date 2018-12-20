import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Constants } from '../api/constants';
import { Cart } from './../store/cart.store';

@Component({
    selector: 'pages',
    templateUrl: 'pages.component.html'
})

export class PagesComponent implements OnInit {
    constructor(public cart: Cart, public userService: UserService) { }
    ngOnInit() {
        this.getCart();
    }

    getCart() {
        this.userService.getCart().subscribe((response: any) => {
            if (response.status == Constants.success) {
                this.cart.cartData = response.data;
            }
        })
    }
}