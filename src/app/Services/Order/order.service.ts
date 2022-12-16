import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_PATH, ORDER_LIST_API_PATH } from 'src/app/app.constant';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  apiPath = API_BASE_PATH+ORDER_LIST_API_PATH;

  constructor(private http:HttpClient) { }

  fecthOrders(){
    let httpHeaders = new HttpHeaders({
      'Content-Type':'application/json'
    })
    let url = this.apiPath+"get_all_orders";
    return this.http.get(url,{
        headers:httpHeaders,
        observe: 'response'
    })
  }
  addOrders(dataObj:any){
    let httpHeaders = new HttpHeaders({
      'Content-Type':'application/json'
    })
    let url = this.apiPath+"add_orders";
    return this.http.post(url,dataObj,{
        headers:httpHeaders,
        observe: 'response'
    })
  }
}
