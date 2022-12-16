import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ADMIN_API_PATH, API_BASE_PATH, USER_API_PATH,  } from 'src/app/app.constant';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  adminapiPath = API_BASE_PATH+ADMIN_API_PATH;
  userapiPath = API_BASE_PATH+USER_API_PATH;
  constructor(private http:HttpClient) { }

  fetchAdmin(dataObj:any){
    let httpHeaders = new HttpHeaders({
      'Content-Type':'application/json'
    })
    let url = this.adminapiPath+"get_admin";
    return this.http.post(url,dataObj,{
        headers:httpHeaders,
        observe: 'response'
    })
  }

  updateAdmin(dataObj:any){
    let httpHeaders = new HttpHeaders({
      'Content-Type':'application/json'
    })
    let url = this.adminapiPath+"update_admin";
    return this.http.post(url,dataObj,{
        headers:httpHeaders,
        observe: 'response'
    })
  }

  fetchUser(dataObj:any){
    let httpHeaders = new HttpHeaders({
      'Content-Type':'application/json'
    })
    let url = this.userapiPath+"get_user";
    return this.http.post(url,dataObj,{
        headers:httpHeaders,
        observe: 'response'
    })
  }
}
