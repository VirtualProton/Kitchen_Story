import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Services/cart/cart.service';
import { ShopComponent } from '../shop/shop.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartItemCount:any=0;
  cartItem:any=[];
  constructor(private cartService:CartService) {
     this.cartService.cartSubject.subscribe((data)=>{
      this.cartItemCount= data.length
      // console.log(this.cartItem)
     })
   }

  ngOnInit(): void {
    this.cartItemFun()
  }

  cartItemFun(){
    this.cartItem= JSON.parse(localStorage.getItem('localCart') as string);
    this.cartItemCount = this.cartItem.length
    // console.log(this.cartItemCount)
  }
}
