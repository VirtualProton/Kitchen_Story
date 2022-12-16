import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_PATH, PRODUCT_LIST_API_PATH } from 'src/app/app.constant';

@Injectable({
  providedIn: 'root'
})
export class UploadfileService {
  apiPath = API_BASE_PATH+PRODUCT_LIST_API_PATH;

  constructor(private http:HttpClient) { }

  uploadFile(fileObj:FormData):Observable<any>{
    let httpHeaders = new HttpHeaders({
      // 'Content-Type':'multipart/form-data;boundary=simple boundary'
    })
    console.log(fileObj.get("file"))
    let url = this.apiPath+"upload";
    return this.http.post(url,fileObj,{
        headers:httpHeaders,
        observe: 'response'
    })
  }
  
}
