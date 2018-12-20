import { Cart } from './../../store/cart.store';
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import * as $ from 'jquery';
import { LocalStorageService } from 'ngx-webstorage';
import { Constants } from '../../api/constants';
import { UserService } from '../../services/user.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedDataService } from '../../services/shareData.service';
import { AlertService } from '../../services/alert.service';
import {CookieService} from 'angular2-cookie/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  termsAndCondition: boolean = false;
  isMainContainer: boolean = false;
  public loginErrMsg = null;
  public signupErrMsg = null;
  signUpForm: FormGroup;
  loginForm: FormGroup;
  localCart: any
  wishList: any
  forgetPasswordForm: FormGroup;
  isShowLoginContainer: boolean = false;
  public Formdata:any=[];
  constructor(public cart: Cart,
    public cd: ChangeDetectorRef,
    public localStorageService: LocalStorageService,
    private userService: UserService,
    public formBuilder: FormBuilder,
    private activeService: NgbActiveModal,
    private alertService: AlertService,
    private sharedCartData: SharedDataService,
    private _cookieService: CookieService) {

    this.signUpForm = this.formBuilder.group({
      email: [null, Validators.email],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      user_name: ['', Validators.required],
      password: ['', Validators.required],
      gender: ['', Validators.required],
      agree: [null, Validators.required]
    });

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', [Validators.required]]
    });

    this.forgetPasswordForm = new FormGroup({})
    this.forgetPasswordForm.addControl('email', new FormControl('', [Validators.email]))
    this.forgetPasswordForm.addControl('confirmEmail', new FormControl('', [Validators.compose([Validators.email, this.matchEmail.bind(this)])]))
    if(_cookieService.get('remember')){
      this.Formdata.username=this._cookieService.get('username');
      this.Formdata.password=this._cookieService.get('password');
      this.Formdata.rememberme=this._cookieService.get('remember');
   }
  }


  showForgetPassword() {
    this.isMainContainer = false;
    this.isShowLoginContainer = true;
  }

  forgetPassword() {
    let obj = {
      email: this.forgetPasswordForm.controls['email'].value
    }
    this.userService.forgetPassword(obj).subscribe((response: any) => {
      if (response.status == Constants.success) {
      }
    });
  }

  ngOnInit() {
 debugger;

    if (localStorage.getItem('user')) {
      let user = JSON.parse(localStorage.getItem('user'))
      if (user.role == 'guest') {
        this.localCart = JSON.parse(localStorage.getItem(user.session_id))
      }
      if(user.role == 'guest' && localStorage.getItem('wishlist|' + user.session_id)) {
        this.wishList = JSON.parse(localStorage.getItem('wishlist|' + user.session_id))
      }
    }
    else{
     this.loginAsGuest();
    }
   // this.isMainContainer = true; //comment after discussed 
  } 

  signUp() {
        var $submitButton = $('button.animationBtn');
        $submitButton.addClass("spinner");
        $submitButton.prop("disabled", true);
        this.signupErrMsg = null;
    let obj = {
      'email': this.signUpForm.value.email,
      'first_name': this.signUpForm.value.first_name,
      'last_name': this.signUpForm.value.last_name,
      'user_name': this.signUpForm.value.user_name,
      'password': this.loginForm.value.password,
      'gender': this.signUpForm.value.gender,
      'agree': this.signUpForm.value.agree,
      'cart': this.localCart,
      'wishlist': this.wishList
    }
    this.userService.signUp(obj).subscribe((response: any) => {
      if (response.status == Constants.success) {
        this.closeLoginModal()
      }
      if (response.status == Constants.failure) {
        this.signupErrMsg = response.error.message[0];
        this.cd.markForCheck();
          $('button.animationBtn').removeClass("spinner");
          $submitButton.prop("disabled", false);
      }
    });
  }
  // add code for key enter for login date: 30 sept 2018 by kamal bisht
  onKeydown(event) {
    if (event.key === "Enter" && event.keyCode === 13) {
     this.login();
    }
  }
  login() {
    // debugger;
    this.loginErrMsg = null;
    var $loginButton = $('button.animationBtnnew');
        $loginButton.addClass("spinnernext");
        $loginButton.prop("disabled", true);
        if(this.loginForm.value.rememberme !==true){
        this._cookieService.put('username',this.loginForm.value.email);
        this._cookieService.put('password',this.loginForm.value.password);
        this._cookieService.put('remember',this.loginForm.value.rememberme);
        }
    let obj = {
      'email': this.loginForm.value.email,
      'password': this.loginForm.value.password,
      'cart': (this.localCart)? this.localCart : [],
      'wishlist': (this.wishList)? this.wishList: []
    }
    this.userService.login(obj).subscribe((response: any) => {
      // debugger;
      if (response.status == Constants.success) {
        if (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).session_id) {
          // debugger;
          this.removeLocalCart();
        }
        this.cart.loginData = response.data;
        localStorage.setItem('user', JSON.stringify(response.data));
        this.sharedCartData.changeLoginData(response.data);
        this.userService.getCart().subscribe((response: any) => {
          if (response.status == Constants.success) {
            this.sharedCartData.changeCart(response.data);
            this.cart.cartData = response.data;
          } else {
            this.alertService.error(response.error.message);
          }
        });
        this.userService.getWishList().subscribe((response: any) => {
          if(response.status == Constants.success) {
            this.cart.wishListData = response.data;
          }
        });
        this.closeLoginModal()
      }
      if (response.status == Constants.failure) {
        this.loginErrMsg = response.error.message[0];
         $loginButton.removeClass("spinnernext");
        $loginButton.prop("disabled", false);
        this.cd.markForCheck();
      }
    });
  }

  removeLocalCart() {
    localStorage.removeItem(JSON.parse(localStorage.getItem('user')).session_id);
  }

  loginAsGuest() {
     var $submitButton = $('button.animationBtn');
    let id = {
      'session_id': Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      'role': 'guest'
    }
     $('button.animationBtn').addClass("spinner");
    // $submitButton.prop("disabled", false);
   //this.closeLoginModal()
    this.cart.loginData = id;
    localStorage.setItem('user', JSON.stringify(id));
    this.cart.cartData = [];
  }

  closeLoginModal() {
    this.activeService.close();
  }

  matchEmail(fieldControl: FormControl) {
    return fieldControl.value === this.forgetPasswordForm.get('email').value ? null : {NotEqual: true}
  }

  openPopup() {
    this.termsAndCondition = true;
    this.isMainContainer = false;
  }

  closeTCModal() {
    this.termsAndCondition = false;
    this.isMainContainer = false;
  }
}
