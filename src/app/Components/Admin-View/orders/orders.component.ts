import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/Services/Order/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  public searchText:any;
  public orders:any=[];
  constructor(
    private orderService:OrderService,
    public router:Router
  ) { }

  ngOnInit(): void {
    this.getOrderList();
  }

  navigateBack(){
    this.router.navigate(['admin/dashboard'])
  }

  getOrderList(){
    this.orderService.fecthOrders().subscribe(
      (res)=>{
        this.orders = res.body; 
      }
    )
  }
}
