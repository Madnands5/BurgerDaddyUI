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
  orderList = [];
  orderIncompleteList = [];
  menu: any | never = [];
  Total: number = 0;
  ngOnInit(): void {
    this.getMenu();
    this.getOrders();
    setInterval(() => {
      this.getOrders();
    }, 5000);
  }
  getOrders() {
    this.http
      .get<any[]>('https://burderdaddy.onrender.com/view-all-orders')
      .subscribe({
        next: (value: any) => {
          this.orderList = value;
          this.Total = 0;
          this.orderList.map((m: any) => {
            console.log(m);
            console.log(this.Total);
            this.Total = this.Total + parseInt(m[4]);
          });
        },
        error: (err: any) => {},
      });
    this.http
      .get<any[]>('https://burderdaddy.onrender.com/view-incomplete-orders')
      .subscribe({
        next: (value: any) => {
          this.orderIncompleteList = value;
        },
        error: (err: any) => {},
      });
  }
  getMenu() {
    this.http.get<any[]>('https://burderdaddy.onrender.com/getMenu').subscribe({
      next: (value: any) => {
        value.map((m: any) => {
          m[2] = 0;
        });
        this.menu = value;
      },
      error: (err: any) => {},
    });
  }
  completed(item: any) {
    this.http
      .post<any[]>(
        'https://burderdaddy.onrender.com/order-completed/' + item[0],
        {}
      )
      .subscribe({
        next: (value: any) => {
          this.toastr.success(value);
        },
        error: (err: any) => {
          this.toastr.success(err);
        },
      });
  }

  toggle() {
    this.showMenu = !this.showMenu;
    if (this.showMenu) {
      this.getMenu();
    }
  }
  decreaseCount(item: any) {
    if (this.menu[item][2] >= 1) {
      this.menu[item][2]--;
    }
  }
  increaseCount(item: any) {
    if (this.menu[item][2] < 100) {
      this.menu[item][2]++;
    }
  }

  placeOrder() {
    let order = {
      order: '',
      status: 'Pending',
      payment: 'Yes',
      total: 0,
    };
    this.menu.map((m: any) => {
      if (m[2] > 0) {
        order.order += m[2] + ' ' + m[0] + ',';
        order.total += m[1] * m[2];
      }
    });
    this.http
      .post<any[]>(
        'https://burderdaddy.onrender.com/create-order/' +
          order.order +
          '/' +
          order.status +
          '/' +
          order.payment +
          '/' +
          order.total,
        {}
      )
      .subscribe({
        next: (value: any) => {
          this.toastr.success(value);
          this.showMenu = false;
        },
        error: (err: any) => {
          this.toastr.success(err);
          this.showMenu = false;
        },
      });
  }
}
