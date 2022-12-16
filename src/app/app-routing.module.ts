import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminloginComponent } from './Components/Admin-View/adminlogin/adminlogin.component';
import { DashBoardComponent } from './Components/Admin-View/dash-board/dash-board.component';
import { OrdersComponent } from './Components/Admin-View/orders/orders.component';
import { ProductDetailsComponent } from './Components/Admin-View/product-details/product-details.component';
import { ResetPasswordComponent } from './Components/Admin-View/reset-password/reset-password.component';
import { CheckoutComponent } from './Components/User-View/checkout/checkout.component';
import { HomeComponent } from './Components/User-View/home/home.component';
import { LoginComponent } from './Components/User-View/login/login.component';
import { ShopComponent } from './Components/User-View/shop/shop.component';
import { AuthGuard } from './Guard/auth.guard';
import { HomeModule } from './Modules/home/home.module';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent,
  
  },
  {
    path:'admin_login',
    component:AdminloginComponent
  },
  {
     path:"user",
     loadChildren:()=> import("./Modules/home/home.module").then((m)=>m.HomeModule)
  },
  {
    path:"admin",
    loadChildren:()=> import("./Modules/admin-portal/admin-portal.module").then((m)=>m.AdminPortalModule)
  },
  {
    path:"",
    redirectTo:"/login",
    pathMatch:"full"
  },
  {
    path:"user/checkout",
    component:CheckoutComponent
  },
  {
    path:"**",
    redirectTo:'login'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
