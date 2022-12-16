import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  accessToken:any;
  isLoginPage = false;
  constructor(
    private http:HttpClient,
    private router: Router
  ) { }

  isAuthenticated(){
    if(localStorage.getItem('ks_token')==null){
      return false;
    }else{
      return true;
    }
  }

  logout(){
    localStorage.removeItem("ks_token")
    this.router.navigate(['./login'])
  }

  validateLogin(info:any){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    let url = ""
    return this.http.post(url,info,{
      headers: headers,
      observe:'response'
    })
  }

  errorResponse(err:HttpErrorResponse){
    if(err.error instanceof Error){
      console.log("A error occured:", err.error.message);
    }else{
      console.log('Backend returned status code:', err.status);
      console.log('response body', err.error);
    }
  }
}
