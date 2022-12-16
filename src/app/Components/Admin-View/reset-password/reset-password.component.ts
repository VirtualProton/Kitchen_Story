import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/Services/Login/login.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  errMsg:any;
  resetForm:any;
  oldCredentail:any=[];
  constructor(
    private modalService:NgbModal,
    private _fb: FormBuilder,
    private router: Router,
    private loginService:LoginService
  ) { }

  ngOnInit(): void {
    this.initilizeForm();
  }

  initilizeForm(){
    this.resetForm = this._fb.group({
      oldPassword:[null,Validators.required],
      newPassword:[null,Validators.required],
      rePassword: [null,Validators.required]
    })
  }

  reset(){
    let formData = this.resetForm.value;
    let dataObj={
      email:localStorage.getItem("userid"),
      password:formData.newPassword
    }
    if(formData.newPassword == formData.rePassword){
      this.loginService.fetchAdmin(dataObj).subscribe(
        (res)=>{
          this.oldCredentail = res.body;
          console.log(this.oldCredentail)
          if(this.oldCredentail[0].password == formData.oldPassword){
            this.loginService.updateAdmin(dataObj).subscribe(
              (res)=>{
                this.router.navigate(['admin_login'])
              }
            )
          }else{
            this.errMsg = "Wrong Password"
          }
        }
      )
    }else{
      this.errMsg = "New Password and Re-Password doesn't match"
    }
  }

  navigateBack(){

  }

  get f1(){
    return this.resetForm.controls
  }

}
