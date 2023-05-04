import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ordersorders',
  templateUrl: './ordersorders.component.html',
  styleUrls: ['./ordersorders.component.scss'],
})
export class OrdersordersComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private router: Router
  ) {}
  showMenu = false;
  showAll = true;
  orderList: any = [];
  orderIncompleteList: any = [];
  menu: any | never = [];
  Total: number = 0;
  OrderTotal: number = 0;
  ngOnInit(): void {
    this.getMenu();
    this.getOrders();
    setInterval(() => {
      this.getOrders();
    }, 30000);
  }
  getOrders() {
    this.http
      .get<any[]>('https://burderdaddy.onrender.com/order/today')
      .subscribe({
        next: (value: any) => {
          this.orderList = value;
          this.Total = 0;
          this.orderList.map((m: any) => {
            this.Total = this.Total + parseInt(m.total);
          });
        },
        error: (err: any) => {
          this.toastr.error(err);
        },
      });
    this.http
      .get<any[]>('https://burderdaddy.onrender.com/order/incomplete')
      .subscribe({
        next: (value: any) => {
          this.orderIncompleteList = value;
        },
        error: (err: any) => {
          this.toastr.error(err);
        },
      });
  }
  getMenu() {
    this.http.get<any[]>('https://burderdaddy.onrender.com/menu').subscribe({
      next: (value: any) => {
        value.map((m: any) => {
          m.qty = 0;
        });
        this.menu = value;
      },
      error: (err: any) => {
        this.toastr.error(err);
      },
    });
  }
  completed(item: any) {
    this.http
      .post<any[]>(
        'https://burderdaddy.onrender.com/order-completed/' + item._id,
        {}
      )
      .subscribe({
        next: (value: any) => {
          this.toastr.success(value);
          this.getOrders();
        },
        error: (err: any) => {
          this.toastr.error(err);
        },
      });
  }

  toggle() {
    this.showMenu = !this.showMenu;
    this.getMenu();
    this.OrderTotal = 0;
  }
  decreaseCount(i: any) {
    if (this.menu[i].qty >= 1 && typeof this.menu[i].qty == 'number') {
      this.menu[i].qty--;
      this.OrderTotal -= this.menu[i].cost;
    }
  }
  increaseCount(i: any) {
    if (this.menu[i].qty < 100 && typeof this.menu[i].qty == 'number') {
      this.menu[i].qty++;
      this.OrderTotal += this.menu[i].cost;
    }
  }

  placeOrder() {
    let order: any = {
      order_items: [],
      total: 800,
    };
    this.menu.map((m: any) => {
      if (m.qty > 0) {
        order.order_items.push({
          item: m.name,
          variant: '-',
          cost: m.cost,
          count: m.qty,
        });
      }
    });
    order.total = this.OrderTotal;
    order.status = 'Pending';
    this.http
      .post<any[]>('https://burderdaddy.onrender.com/order', order)
      .subscribe({
        next: (value: any) => {
          console.log(value);
          this.toastr.success(value);
          this.showMenu = false;
          this.getOrders();
        },
        error: (err: any) => {
          this.toastr.error(err);
          console.log(err);
          this.showMenu = false;
        },
      });
  }
}
