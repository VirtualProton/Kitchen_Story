import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPortalComponent } from 'src/app/Components/Admin-View/admin-portal/admin-portal.component';
import { DashBoardComponent } from 'src/app/Components/Admin-View/dash-board/dash-board.component';
import { OrdersComponent } from 'src/app/Components/Admin-View/orders/orders.component';
import { ProductDetailsComponent } from 'src/app/Components/Admin-View/product-details/product-details.component';
import { ResetPasswordComponent } from 'src/app/Components/Admin-View/reset-password/reset-password.component';

const routes: Routes = [
  {
    path:"",component:AdminPortalComponent,
    children:[
      {path:"products",component:ProductDetailsComponent},
      {path:"orders",component:OrdersComponent},
      {path:"reset",component:ResetPasswordComponent},
      {path:"dashboard",component:DashBoardComponent},
      {path:'', redirectTo:'/dashboard', pathMatch:'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPortalRoutingModule { }
