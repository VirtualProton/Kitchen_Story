import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from 'src/app/Components/User-View/account/account.component';
import { CartComponent } from 'src/app/Components/User-View/cart/cart.component';
import { ContactComponent } from 'src/app/Components/User-View/contact/contact.component';
import { HomeComponent } from 'src/app/Components/User-View/home/home.component';
import { MenuComponent } from 'src/app/Components/User-View/menu/menu.component';
import { ShopComponent } from 'src/app/Components/User-View/shop/shop.component';

const routes: Routes = [
  {
    path:"", component:HomeComponent,
    children:[
      {path:'shop', component:ShopComponent},
      {path:'menu',component:MenuComponent},
      {path:'contact', component:ContactComponent},
      {path:'account',component:AccountComponent},
      {path:'cart',component:CartComponent},
      {path:'', redirectTo:'/user/shop', pathMatch:'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
