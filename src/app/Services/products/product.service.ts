import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_PATH, PRODUCT_LIST_API_PATH } from 'src/app/app.constant';
import { ProductDetails } from 'src/app/Components/User-View/shop/product-details';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiPath = API_BASE_PATH+PRODUCT_LIST_API_PATH;

  constructor(private http:HttpClient) { }

  fetchProductList():Observable<ProductDetails[]>{
    let url = this.apiPath+"get_all_products";
    return this.http.get<ProductDetails[]>(`${url}`)
  }

  addProduct(dataObj:any){
    let httpHeaders = new HttpHeaders({
      'Content-Type':'application/json'
    })
    let url = this.apiPath+"add_products";
    return this.http.post(url,dataObj,{
        headers:httpHeaders,
        observe: 'response'
    })
  }

  updateProduct(dataObj:any){
    let httpHeaders = new HttpHeaders({
      'Content-Type':'application/json'
    })
    let url = this.apiPath+"update_products";
    return this.http.post(url,dataObj,{
      headers:httpHeaders,
      observe: 'response'
  })
  }
  deleteProduct(dataObj:any){
    let httpHeaders = new HttpHeaders({
      'Content-Type':'application/json'
    })
    let url = this.apiPath+"delete_products";
    return this.http.post(url,dataObj,{
        headers:httpHeaders,
        observe: 'response'
    })
  }
}
