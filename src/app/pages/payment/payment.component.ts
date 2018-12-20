import { LocalStorageService } from 'ngx-webstorage';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  paymentModuleObject = {
    'account': true,
    'checkout': true,
    'delivery': true,
    'deliveryMethod': true,
    'confirmOrder': true
  };


  constructor(public localStorageService: LocalStorageService) { }

  ngOnInit() {
    if (this.localStorageService.retrieve('user')) {
     // this.paymentModuleObject.checkout = false;
     // this.paymentModuleObject.account = true;
    }
  }

  openTab(input) {
    for (let key in this.paymentModuleObject) {
     // this.paymentModuleObject[key] = false;
    }
   // this.paymentModuleObject[input] = true;
    // console.log(this.paymentModuleObject);
  }



}
