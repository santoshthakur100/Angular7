import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { APIConstants } from '../api/api.constants'
import { Response } from '@angular/http'

@Injectable()

export class UserService {
    constructor(private http: HttpClient) { }

    signUp(data: any) {      
        return this.http.post<Response>(APIConstants.SIGNUP, data)
    }

    login(data: any){       
        return this.http.post<Response>(APIConstants.LOGIN, data)
    }

    forgetPassword(data: any) {
        return this.http.post<Response>(APIConstants.FORGOT_PASSWORD, data)
    }

    getFrontPageData(params: any){
        return this.http.get<Response>(APIConstants.FRONT_PAGE + params)
    }

    filter(price_range: any) {
        const href = APIConstants.FRONT_PAGE
        const requestUrl = `${href}?price_range=${price_range}`
        return this.http.get<Response>(requestUrl)
    }

    addCart(data: any) {
        return this.http.post<Response>(APIConstants.CART, data)
    }

    getCart() {
        return this.http.get<Response>(APIConstants.CART)
    }

    deleteCartItem(id: string) {
        return this.http.delete<Response>(APIConstants.CART + '/' + id)
    }

    getCategories() {
        return this.http.get<Response>(APIConstants.GET_CATEGORIES)
    }

    getProductVariant() {
        return this.http.get<Response>(APIConstants.VARIENT)
    }

    getProduct() {
        return this.http.get<Response>(APIConstants.GET_PRODUCT)
    }

    getProductDetails(id: string) {
        return this.http.get<Response>(APIConstants.GET_PRODUCT + '/' + id)
    }

    addToWishList(params: any) {
        return this.http.post<Response>(APIConstants.WISH_LIST, params)
    }

    getWishList() {
        return this.http.get<Response>(APIConstants.WISH_LIST)
    }

    deleteWishListItem(id: string) {
        return this.http.delete<Response>(APIConstants.WISH_LIST + '/' + id)
    }

    addToPersonalChangingRoom(params: any) {
        return this.http.post<Response>(APIConstants.ADD_TO_PCR, params)
    }

    getPersonalChangingRoomList() {
        return this.http.get<Response>(APIConstants.ADD_TO_PCR)
    }

    // Get api method for portal review
    getPortalReview() {
        return this.http.get<Response>(APIConstants.GET_PORTAL_REVIEW)
    } 
    // Post api method for portal review
    postPortalReview(data: any) {
        return this.http.post<Response>(APIConstants.GET_PORTAL_REVIEW, data)
    }

    // Get api method for user review
    getUserReview(id: string) {
        return this.http.get<Response>(APIConstants.GET_USER_REVIEW  + '/' + id)
    }
}