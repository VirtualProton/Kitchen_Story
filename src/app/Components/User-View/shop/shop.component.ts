import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/products/product.service';
import { ProductDetails } from './product-details';
import { CartService } from 'src/app/Services/cart/cart.service';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  productList:any=[]
  Cart:any=[];
  cartCount:any =0;
  constructor(
    private productService:ProductService,
    private cartService : CartService
    ) { }

  ngOnInit(): void {
    this.getProductList()
  }

  getProductList(){
    this.productService.fetchProductList().subscribe((data:ProductDetails[])=>{
      console.log(data)
      this.productList= data
    });
  }


  addToCart(product:any){
  

    let cartDataNull = localStorage.getItem("localCart");
    if(cartDataNull == null){
      let storeDataGet:any=[];
      storeDataGet.push(product);
      localStorage.setItem('localCart', JSON.stringify(storeDataGet))
    }else{
      this.Cart=JSON.parse(localStorage.getItem("localCart") as string);
       this.Cart.push(product);
       localStorage.setItem('localCart',JSON.stringify(this.Cart))
    }
      this.cartCountFun();

  }

  cartCountFun(){
    var cartValue = JSON.parse(localStorage.getItem('localCart') as string);
    //this.cartCount=cartValue.length;
    this.cartService.cartSubject.next(cartValue);
   // console.log(this.cartCount)
  }
}
