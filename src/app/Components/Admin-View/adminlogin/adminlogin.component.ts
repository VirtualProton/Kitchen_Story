import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/Services/app.service';
import { LoginService } from 'src/app/Services/Login/login.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.scss']
})
export class AdminloginComponent implements OnInit {
  loginForm:any;
  errMsg:any;
  constructor(
    private appService:AppService,
    private router: Router,
    private fb: FormBuilder,
    private route:ActivatedRoute,
    private loginService:LoginService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    this.loginForm = this.fb.group({
      email:[null,Validators.required],
      password:[null,Validators.required]
    })
  }
  validateLogin(){
    let data = this.loginForm.value;
    console.log(data);
    this.loginService.fetchAdmin(data).subscribe(
      (res)=>{
        let credential:any =res.body
        if(credential.length >0){
          if(credential[0].email == data.email && credential[0].password == data.password){
            localStorage.setItem("userid",credential[0].email)
            this.router.navigate(['admin/dashboard'])
          }else{
            this.errMsg = "User ID or Password is not correct"
          }
        }else{
          this.errMsg = "User ID or Password is not correct"
        }
      }
    )
   }
}
