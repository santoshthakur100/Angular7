import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'payment-confirmOrder',
  templateUrl: './confirmOrder.component.html',
  styleUrls: ['./confirmOrder.component.css']
})
export class ConfirmOrderComponent implements OnInit {
  cartDetails: any =[];
  Qty:any; SubTotal: number;
  constructor() { }

  ngOnInit() {
  this.cartDetails = JSON.parse(localStorage.getItem('CartDetail'))
  this.SubTotal    = JSON.parse(localStorage.getItem('SubTotal'))
  }

}
