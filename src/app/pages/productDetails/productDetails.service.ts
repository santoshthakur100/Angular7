import { LocalStorageService } from 'ngx-webstorage';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { APIConstants } from '../../api/api.constants';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http'
@Injectable()
export class ProductDetailsService {

    constructor(public localStorageService: LocalStorageService,private http: HttpClient) {
        if (!this.localStorageService.retrieve('recentProduct')) {
             this.localStorageService.store('recentProduct',[]);
        }
    }
    productDetails: any;
    productDetailsSubject: Subject<any> = new Subject<any>();

    getRecentProduct() {
        return this.localStorageService.retrieve('recentProduct');
    }

    setRecentProduct(input) {

        let isProductExist: boolean = false;
        let recentProcutList: Array<any> = this.localStorageService.retrieve('recentProduct');
        recentProcutList.forEach((element) => {
            // alert(element.id);
            // alert(input.id);
            if (element.id == input.id) {
                isProductExist = true;
               // return;
            }
        })

        if (!isProductExist) {
            recentProcutList.push(input);
            // console.log(recentProcutList);
            this.localStorageService.store('recentProduct', recentProcutList);
        }
    }

   
}