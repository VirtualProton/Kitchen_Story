import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/Services/products/product.service';
import { ProductDetails } from '../../User-View/shop/product-details';
import { UploadfileService } from 'src/app/Services/UploadFile/uploadfile.service';
// import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  public product_details:any=[];
  public ProductDetailsForm:any;
  public deleteObj:any;
  public statusMsg:any;
  public searchText:any;
  public formData:FormData =new FormData()
  public img:any="";
  private id:any;
  p:number =1;
  public fileToUpload: File | null = null;
  editFormFlag:any=false;
  @ViewChild('alertModal',{static:false})
  alertModal!:ElementRef;
  @ViewChild('confirmModal',{static:false})
  confirmModal!:ElementRef;
  @ViewChild('myModal',{read: TemplateRef})
  myModal!:TemplateRef<any>;
  constructor( 
    private productService:ProductService,
    private uploadfileService:UploadfileService,
    private modalService:NgbModal,
    private _fb: FormBuilder,
    public router:Router
    ) { }

  ngOnInit(): void {
    this.fetchProductDetails();
    this.initilizeForm()
  }
  fetchProductDetails(){
    this.productService.fetchProductList().subscribe((data:ProductDetails[])=>{
      this.product_details= data;
    })
  }
  initilizeForm(){
    this.ProductDetailsForm = this._fb.group({
      name:[null, Validators.required],
      category:[null, Validators.required],
      type:[null, Validators.required],
      price:[0,Validators.required],
    })
  }

  addProductDetails(e:any){
    let formData = this.ProductDetailsForm.value;
    let data={
      name:formData.name,
      category:formData.category,
      type:formData.type,
      price:formData.price,
      img: this.img
    }
    this.productService.addProduct(data).subscribe(
      (res)=>{
        if(res.status==200){
          this.statusMsg = "Product added successfully";
          this.fetchProductDetails();
          this.closeModal();
          this.resetForm()
          //this.openModal(this.alertModal)
        }
      },(err)=>{
        this.statusMsg = err.error.message;
        this.closeModal();
        this.resetForm();
        //this.openModal(this.alertModal)
      }
    )
  }

  updateProductDetails(e:any){
    let formValue =this.ProductDetailsForm.value;
    let updateObj={
      id: this.id,
      name:formValue.name,
      category:formValue.category,
      type:formValue.type,
      price:formValue.price,
      img: this.img
    } 
    this.productService.updateProduct(updateObj).subscribe(
      (res)=>{
        if(res.status==200){
          this.statusMsg = "Product updated successfully";
          this.fetchProductDetails();
          this.closeModal();
          this.resetForm()
          //this.openModal(this.alertModal)
        }
      },(err)=>{
        this.statusMsg = err.error.message;
        this.closeModal();
        this.resetForm();
        //this.openModal(this.alertModal)
      }
    )
  }

  deleteProduct(e:any){
    this.productService.deleteProduct(e).subscribe(
      (res)=>{
          console.log(res)
          this.fetchProductDetails();
      }
    )
  }

  openModal(ref:any){
    this.modalService.open(ref,{
      backdrop:'static',
      keyboard:false,
      // windowClass:'custom-modal'
    });
  }

  openFrom(mod:any,refobj?:any, ref?:any){
    this.img="";
    this.editFormFlag= false;
    this.openModal(ref)
    if(mod=="edit"){
      this.id = refobj.id;
      this.editFormFlag=true
      this.ProductDetailsForm.patchValue(refobj)
    }
  }

  closeModal(){
    this.modalService.dismissAll();
    this.resetForm();
  }

  resetForm(){
    this.ProductDetailsForm.reset()
    this.editFormFlag=false;
  }

  get f(){
    return this.ProductDetailsForm.controls
  }

  onselectfile(e:any){
      let file!:File;
      file = e.target.files[0];
     this.formData.append("file",file);
     let v = this.formData.get("file")
     console.log(v);
  }

  uploadFlie():void{
    this.uploadfileService.uploadFile(this.formData).subscribe(
      (res)=>{
        this.img ="http://localhost:4200/assets/img/"+res.body.response;
      }
    )
  }

  navigateBack(){
    this.router.navigate(['admin/dashboard'])
  }
}
