import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/User-View/login/login.component';
import { HeaderComponent } from './Components/User-View/header/header.component';
import { AdminHeaderComponent } from './Components/Admin-View/header/header.component';
import { FooterComponent } from './Components/User-View/footer/footer.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './Components/User-View/home/home.component';
import { ShopComponent } from './Components/User-View/shop/shop.component';
import { MenuComponent } from './Components/User-View/menu/menu.component';
import { ContactComponent } from './Components/User-View/contact/contact.component';
import { AccountComponent } from './Components/User-View/account/account.component';
import { CartComponent } from './Components/User-View/cart/cart.component';
import { DashBoardComponent } from './Components/Admin-View/dash-board/dash-board.component';
import { ProductDetailsComponent } from './Components/Admin-View/product-details/product-details.component';
import { OrdersComponent } from './Components/Admin-View/orders/orders.component';
import { ResetPasswordComponent } from './Components/Admin-View/reset-password/reset-password.component';
import { AdminPortalComponent } from './Components/Admin-View/admin-portal/admin-portal.component';
import { CheckoutComponent } from './Components/User-View/checkout/checkout.component';
import { AdminloginComponent } from './Components/Admin-View/adminlogin/adminlogin.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ShopComponent,
    MenuComponent,
    ContactComponent,
    AccountComponent,
    CartComponent,
    DashBoardComponent,
    ProductDetailsComponent,
    OrdersComponent,
    ResetPasswordComponent,
    AdminPortalComponent,
    AdminHeaderComponent,
    CheckoutComponent,
    AdminloginComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
