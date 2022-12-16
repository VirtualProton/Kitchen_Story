    import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from 'src/app/Services/Order/order.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  deliveryDetailsForm:any;
  paymentDetailsForm:any;
  statusMsg:any;
  @ViewChild('myModal',{read:TemplateRef})
  myModal!:TemplateRef<any>;
  constructor(
    private modalService:NgbModal,
    private _fb: FormBuilder,
    private orderService:OrderService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initilizeForm();
  }
  initilizeForm(){
    this.deliveryDetailsForm = this._fb.group({
      fname:[null, Validators.required],
      contact:[null, Validators.required],
      email:[null, Validators.required],
      street:[null,Validators.required],
      city:[null,Validators.required],
      state:[null,Validators.required],
      zip:[null,Validators.required],
    })

    this.paymentDetailsForm = this._fb.group({
      cardNumber:[null,Validators.required],
      expiredDate:[null,Validators.required],
      cvv:[null,Validators.required],
      name:[null,Validators.required]
    })
  }

  placeOrder(ref:any){
    let formData =this.deliveryDetailsForm.value
    let itemListArry = JSON.parse(localStorage.getItem("localCart") as string);
    let itemList = null;
    let totalPrice = 0;
    for(let i = 0;i<itemListArry.length;i++){
      itemList =itemListArry[i].name+", "+itemList;
      totalPrice = totalPrice+itemListArry[i].price;
      console.log(itemListArry[i].name)
    }
    console.log(itemListArry.length)
    let data={
      orderItem:itemList,
      fname: formData.fname,
      contact: formData.contact,
      email:formData.email,
      address: formData.street+", "+formData.city+", "+formData.state+", "+formData.zip,
      tprice:totalPrice
    }
    this.orderService.addOrders(data).subscribe(
      (res)=>{
        if(res.status==200){
          this.statusMsg = res.body;
          this.closeModal();
          this.openForm(ref);
          localStorage.clear();
          this.router.navigate(['user/shop'])
        }}

    )
  }

  openModal(ref:any){
    this.modalService.open(ref,{
      backdrop:'static',
      keyboard:false
    });
  }
  openForm(ref?:any){
    this.openModal(ref)
  }
  closeModal(){
    this.modalService.dismissAll();
    this.resetForm();
  }
  resetForm(){
    this.paymentDetailsForm.reset();
  }
  get f1(){
    return this.paymentDetailsForm.controls
  }

  get f2(){
    return this.deliveryDetailsForm.controls
  }

  navigateBack(){
    this.router.navigate(['user/cart'])
  }
}
