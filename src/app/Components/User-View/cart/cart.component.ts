import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItem:any=[]
  cartlength:any = 0;
  totalPrice:any=0;
  constructor(
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getCartItem()
  }
  getCartItem(){
      this.cartItem = JSON.parse(localStorage.getItem('localCart') as string);
      for(let i=0; i<this.cartItem.length;i++){
        this.totalPrice = this.cartItem[i].price + this.totalPrice;
      }
      this.cartlength=this.cartItem.length;
  }

  removeItem(obj:any){
      for(let i =0;i<this.cartItem.length;i++){
        if(this.cartItem[i].name == obj.name){
          this.cartItem.splice("index",1)
        }
        this.cartService.cartSubject.next(this.cartItem);
        localStorage.setItem("localCart",JSON.stringify(this.cartItem));
        this.totalPrice=0;
        this.getCartItem();
      }
  }

  navigateBack(){
    this.router.navigate(['user/shop'])
  }
}
